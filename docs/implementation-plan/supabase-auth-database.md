# Supabase Auth Database Sync

## Background and Motivation
The app can successfully sign-up users and these users appear in the **Auth → Users** section of the Supabase dashboard.
However, when looking at **Database → Tables**, the user cannot see any schema or table that relates to these accounts.
This is confusing and blocks any future work that requires a user-profile table (e.g., storing display names, avatars, roles, etc.).

Supabase automatically stores authentication records in the `auth` schema, while the **Database** screen defaults to the `public` schema.
We need to (a) verify that the default `auth` tables are present, (b) decide what additional tables we want (usually a `profiles` table in `public`), and (c) create them via migration so they show up in the dashboard and can be queried from the app.

## Key Challenges and Analysis
* New Supabase users often overlook that the **auth** schema is separate from **public**.
* The dashboard UI hides other schemas unless explicitly selected.
* We must design the extra user-profile table: minimal fields, FK to `auth.users`, RLS policy.
* Ensure migrations are idempotent and committed to source control.
* Coordinate Expo (React Native) client to upsert profile data after sign-up.

## High-level Task Breakdown
- [ ] **T1 – Verify existing `auth` schema**
  • Open Supabase → Database → **auth** schema and confirm `users`, `refresh_tokens`, etc. exist.
  • Success = `auth.users` table visible.
- [x] **T2 – Clarify required user-profile fields**
  • Based on the schema draft, we'll use the `users` table design from line 144.
  • Fields: id (UUID, PK, refs auth.users), school_id, email, full_name, phone, role (user_role enum), avatar_url, teacher_id, parent_id, student_id, is_active, last_login_at, invited_by, invited_at, activated_at, created_at, updated_at.
  • Success = Fields confirmed from schema draft.
- [x] **T3 – Create migration for `public.users` table**
  • Created tables: `schools`, `users` (profile table), and `user_role` enum type.
  • Enabled RLS with policies for users to manage their own profiles and admins to manage school users.
  • Success = Tables appear under `public`, migrations applied.
- [x] **T4 – Seed/Back-fill existing users into `users` table**
  • Created migration to insert rows for all existing auth users.
  • Added trigger to automatically create profile for new signups.
  • Success = All auth users have corresponding entries in the `public.users` table.
- [x] **T5 – Update client code to upsert profile after registration / sign-in**
  • Updated the `signUp` function in `authStore.ts` to call `loadUserProfile()` after successful registration.
  • This ensures the client loads the profile created by our database trigger.
  • Success = Client code now properly handles profile loading after registration.
- [x] **T6 – Smoke test end-to-end**
  • Verified existing users in `auth.users` have corresponding entries in `public.users`.
  • Confirmed RLS policies are correctly applied to the `users` table.
  • Success = Both tables populated, RLS enforced.
- [x] **T7 – Documentation & Lessons Learned**
  • Updated `docs/LESSONS_LEARNED.md` with detailed information about Supabase auth schema and user profiles.
  • Added best practices for implementing user profiles with Supabase auth.
  • Success = Documentation updated for future reference.

## Project Status Board
- [x] T1 – Verify `auth` schema (Executor) - Completed on 2025-06-02
- [x] T2 – Clarify fields (Executor) - Completed on 2025-06-02
- [x] T3 – Migration created (Executor) - Completed on 2025-06-02
- [x] T4 – Seed existing users (Executor) - Completed on 2025-06-02
- [x] T5 – Update client code (Executor) - Completed on 2025-06-02
- [x] T6 – Smoke test (Executor) - Completed on 2025-06-02
- [x] T7 – Docs updated (Executor) - Completed on 2025-06-02

## Executor's Feedback or Assistance Requests

### Final Implementation Summary (2025-06-02)

All tasks have been successfully completed for the Supabase Auth Database Integration:

1. **Verified Auth Schema**: Confirmed that Supabase stores authentication users in the `auth` schema with tables like `auth.users`.

2. **Created User Profile Schema**: Implemented a `public.users` table that extends `auth.users` with profile fields as per the schema draft, including school_id, email, full_name, role, etc.

3. **Implemented RLS Policies**: Set up Row Level Security policies to ensure users can only access appropriate data:
   - Users can view/update their own profiles
   - Admins can view/update all users in their school
   - Teachers can view students in their school

4. **Created Database Trigger**: Implemented a trigger to automatically create a profile in `public.users` when a new user signs up in `auth.users`.

5. **Seeded Existing Users**: Migrated existing auth users into the `public.users` table.

6. **Updated Client Code**: Modified the `signUp` function in `authStore.ts` to load user profiles after registration.

7. **Smoke Tested**: Verified that existing users have profiles and RLS policies are working correctly.

8. **Updated Documentation**: Added detailed information about Supabase auth schema and user profiles to `docs/LESSONS_LEARNED.md`.

The implementation successfully bridges the gap between Supabase authentication and our application's user profile system, ensuring that all authenticated users have corresponding profile records with appropriate access controls.
T1 Complete: Verified that the `auth` schema exists in the SchoolSyncV2 project and contains 16 tables including the critical `users` table. This confirms that authentication is working correctly at the database level. The issue is that these tables are not visible in the default Database view because that view only shows the `public` schema by default.

T2-T4 Complete: Based on the schema draft, I've implemented the database structure following the design in lines 144-175. Created:
1. `user_role` enum type with roles like student, teacher, etc.
2. `schools` table as a foundation for multi-tenancy
3. `users` table that extends auth.users with profile information
4. RLS policies to ensure proper data access control
5. A trigger to automatically create profiles for new signups
6. Migration to seed existing auth users into the profiles table

Next steps: We need to update the client code to properly handle profile creation/updates during registration and login.

## Lessons Learned
_(populate as we progress)_
