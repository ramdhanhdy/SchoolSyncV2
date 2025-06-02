# Lessons Learned - SchoolSync Development

*Last Updated: June 2, 2025*

This document tracks issues encountered during the SchoolSync mobile app development and their solutions for future reference.

## 📱 React Native & Expo Issues

### Issue #1: Metro Bundler - Node.js Module Import Error

**Date:** December 2024  
**Severity:** High  
**Platform:** Android Build

#### Problem Description
```
Android Bundling failed
The package at "node_modules\ws\lib\stream.js" attempted to import the Node standard library module "stream".
It failed because the native React runtime does not include the Node standard library.
```

#### Root Cause
- Supabase's `realtime-js` package dependency (`ws`) attempts to import Node.js standard library modules
- React Native doesn't include Node.js standard library modules
- This is a known compatibility issue between Expo and Supabase packages

#### Solution
Disable package exports configuration in Metro bundler:

```javascript
// metro.config.js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add this line to fix the issue
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
```

#### References
- [Supabase Realtime Issue #415](https://github.com/supabase/realtime-js/issues/415)
- [Expo Metro Config Documentation](https://docs.expo.dev/workflow/using-libraries/#using-third-party-libraries)

#### Prevention
- Always check package compatibility with React Native before adding dependencies
- Test builds on multiple platforms early in development
- Monitor Expo and Supabase compatibility updates

---

## 🔐 Authentication & Database

### Issue #2: Supabase Auth Schema and User Profiles

**Date:** June 2025  
**Severity:** Medium  
**Platform:** Database Architecture

#### Problem Description
Supabase stores authentication users in a separate `auth` schema, which is hidden by default in the dashboard. This can lead to confusion when implementing user profiles, as the auth users are not visible in the default public schema.

#### Solution
Implemented a proper user profile system with these components:

1. Created a `public.users` table that extends `auth.users` with profile fields:
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    -- Additional profile fields
    school_id UUID REFERENCES schools(id) ON DELETE CASCADE,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    role user_role NOT NULL,
    -- Other fields...
);
```

2. Added a database trigger to auto-create profiles when users sign up:
```sql
CREATE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'student'::user_role)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

3. Updated client code to load user profiles after authentication:
```typescript
// In signUp function
if (data.user) {
  set({ user: data.user, session: data.session });
  await get().loadUserProfile(); // Load profile after signup
  return { success: true };
}
```

#### Best Practices
- Always create a separate profile table in the public schema linked to auth.users
- Use database triggers to automatically create/update profiles
- Implement proper RLS policies on the profile table
- Ensure client code loads profiles after authentication events

### Issue #3: Supabase RLS Policy Configuration

**Date:** December 2024  
**Severity:** Medium  
**Platform:** Database Security

#### Problem Description
Initial database setup without proper Row Level Security (RLS) policies could lead to data access issues.

#### Solution
Implemented comprehensive RLS policies for all tables:

```sql
-- Example: Schools table RLS policy
CREATE POLICY "Users can view their own school" ON schools
  FOR SELECT USING (
    id IN (
      SELECT school_id FROM users WHERE id = auth.uid()
    )
  );
```

#### Best Practices
- Always enable RLS on all tables containing sensitive data
- Test policies with different user roles
- Document policy logic for team understanding

### Issue #4: PGRST116 Error After User Registration

**Date:** June 2025  
**Severity:** High  
**Platform:** Authentication Flow

#### Problem Description
After implementing the Supabase Auth Database Integration, newly registered users encountered a `PGRST116` error ("JSON object requested, multiple (or no) rows returned") when attempting to load their profile immediately after registration. This occurred because the client-side `loadUserProfile` function was querying the profile before the database trigger (`on_auth_user_created`) had completed creating the new profile row, or due to RLS policy issues preventing the newly registered user from seeing their own profile.

#### Root Cause Analysis
- **Race Condition**: Timing issue between client-side profile loading and server-side trigger execution
- **RLS Policy Circular Dependencies**: Some RLS policies were creating circular dependencies by using helper functions that themselves query the users table
- **Role Hierarchy Mismatch**: The default role in the trigger function was set to 'student', but only management users should perform direct sign-up

#### Solution
1. **Enhanced Database Trigger**:
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  existing_user_count INTEGER;
  default_role TEXT := 'management'; -- Changed from 'student' to 'management'
  user_role_value TEXT;
  profile_id UUID;
BEGIN
  -- Get role from metadata or use default management role
  user_role_value := COALESCE(NEW.raw_user_meta_data->>'role', default_role);
  
  -- Insert the user profile
  INSERT INTO public.users (...) VALUES (...) RETURNING id INTO profile_id;
  
  -- Force the transaction to commit by performing a read operation
  PERFORM 1 FROM public.users WHERE id = profile_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

2. **Simplified RLS Policies**:
```sql
-- Drop helper functions that cause recursion
DROP FUNCTION IF EXISTS public.get_my_role();
DROP FUNCTION IF EXISTS public.get_my_school_id();

-- Create simple, non-recursive RLS policies
CREATE POLICY "Users can view own profile"
ON public.users
FOR SELECT
TO public
USING (id = auth.uid());
```

3. **Resilient Client-Side Profile Loading**:
```typescript
loadUserProfile: async () => {
  try {
    const { user } = get();
    if (!user) return;

    set({ loading: true });
    
    let fetchedProfile: UserProfile | null = null;
    let lastProfileError: any = null;
    const maxRetries = 5;
    const retryDelay = 1000; // 1 second delay between retries

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      console.log(`Profile load attempt ${attempt}/${maxRetries}...`);
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        // Only retry if it's the PGRST116 error (profile not found)
        if (error.code === 'PGRST116' && attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, retryDelay));
        } else {
          break;
        }
      } else {
        fetchedProfile = data;
        break;
      }
    }

    // Handle special case for new management users
    if (!fetchedProfile && user.user_metadata?.role === 'management') {
      console.log('New management user detected. Profile will be created by database trigger.');
    }
    
    // Continue with normal flow if profile was found
    if (fetchedProfile) {
      set({ profile: fetchedProfile });
      // Load additional data as needed...
    }

    set({ loading: false });
  } catch (error) {
    console.error('Unexpected error in loadUserProfile:', error);
    set({ loading: false });
  }
}
```

#### Best Practices
- **RLS Policy Design**: Avoid circular dependencies in RLS policies. Don't use helper functions that query the same table the policy is protecting.
- **Role-Based Registration**: Understand your application's user hierarchy model. In our case, only management users should perform direct sign-up.
- **Client-Side Resilience**: Implement robust retry mechanisms for operations that may be affected by database triggers or RLS policies.
- **Comprehensive Logging**: Add detailed logging throughout authentication flows to help diagnose issues in production.
- **Transaction Management**: Be aware of how PostgreSQL handles transactions in triggers and ensure data is committed before client queries.

---

## 🎨 UI/UX Development

### Issue #4: TypeScript Interface Mismatches

**Date:** December 2024  
**Severity:** Low  
**Platform:** Development

#### Problem Description
Mismatched interfaces between onboarding components and data store caused TypeScript errors.

#### Solution
- Standardized interface definitions in central store
- Updated component props to match store interfaces
- Used consistent naming conventions across components

#### Prevention
- Define interfaces in a central location
- Use TypeScript strict mode
- Regular interface audits during development

---

## 📦 Package Management

### Issue #5: Dependency Version Conflicts

**Date:** December 2024  
**Severity:** Medium  
**Platform:** Development Environment

#### Problem Description
Potential conflicts between Expo SDK version and third-party packages.

#### Solution
- Use Expo-compatible versions of packages
- Check Expo documentation for recommended packages
- Test thoroughly after package updates

#### Best Practices
- Pin dependency versions in package.json
- Use `expo install` for Expo-compatible packages
- Regular dependency audits

---

## 🚀 Development Workflow

### Best Practices Learned

1. **Environment Setup**
   - Always use `.env` files for configuration
   - Never commit sensitive keys to repository
   - Use different environments for development/production

2. **Code Organization**
   - Separate concerns (auth, UI, business logic)
   - Use consistent file naming conventions
   - Implement proper TypeScript typing

3. **Testing Strategy**
   - Test on multiple platforms early
   - Use development builds for testing native features
   - Implement proper error handling and logging

4. **Database Design**
   - Plan schema carefully before implementation
   - Use proper foreign key relationships
   - Implement comprehensive RLS policies

---

## 🔄 Future Improvements

### Technical Debt
- [ ] Implement comprehensive error boundary components
- [ ] Add proper loading states for all async operations
- [ ] Implement offline data synchronization
- [ ] Add comprehensive unit and integration tests

### Performance Optimizations
- [ ] Implement lazy loading for large lists
- [ ] Optimize image loading and caching
- [ ] Add proper memoization for expensive computations

### Security Enhancements
- [ ] Implement proper input validation
- [ ] Add rate limiting for API calls
- [ ] Implement proper session management

---

## 📝 Notes for Team

- Always update this document when encountering new issues
- Include reproduction steps for complex issues
- Document workarounds for known limitations
- Share solutions with the team immediately

---

**Last Updated:** June 2025  
**Contributors:** Development Team