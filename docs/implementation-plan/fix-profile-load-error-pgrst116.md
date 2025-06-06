# Implementation Plan: Fix Profile Load Error (PGRST116) After Registration

**Branch Name:** `bugfix/profile-load-pgrst116`

## 1. Background and Motivation

After This document outlines the plan to fix the `PGRST116` error. Previously, this error was encountered during profile loading. The USER has now reported it occurs when loading school data *after* the profile has loaded, specifically manifesting as "Error loading school data: {\"code\": \"PGRST116\", \"details\": \"The result contains 0 rows\", ...}". This happens even if the `school_id` is confirmed to exist in the Supabase table.

The error message "JSON object requested, multiple (or no) rows returned" indicates that a Supabase query expecting a single row (e.g., using `.single()`) did not receive exactly one row. registration.- The error occurs when trying to load school data, likely within `authStore.ts`, after the user profile has successfully loaded. The `profile.school_id` is available, but fetching the school record using this ID fails.base trigger (`on_auth_user_created`) has completed creating### T1: Verify `profile.school_id` and `loadSchool` Query in `authStore.ts` to RLS policy issues preventing the newly registered user from seeing their own profile.

## 2. Key Challenges and Analysis

*   **Race Condition**: The core issue is a timing/race condition between the client-side profile loading and the server-side trigger execution.
*   **Role Hierarchy**: Only management users should perform direct sign-up. Other roles (teachers, students, parents) are added hierarchically through the UI.
*   **Newly Enabled RLS**: The USER has just enabled Row Level Security (RLS) on the `schools` table. This is a strong indicator that the `PGRST116` error (0 rows returned) is due to missing or misconfigured SELECT policies for authenticated users on this table.
{{ ... }}
    *   Identify and fix RLS policies that create circular dependencies.
    *   Simplify the RLS policies to ensure new users can always access their own profiles.
    *   Remove helper functions that query the users table from within RLS policies.
    *   **Success Criteria**: RLS policies updated to avoid circular dependencies and infinite recursion errors.

*   **T4: Implement Resilient1.  **Add Logging**: In `authStore.ts`, locate the function responsible for loading school data (let's assume it's part of `loadUserProfile` or a dedicated `loadSchool` function called after profile loading). Add `console.log` statements to output:
    *   The `profile` object after it's loaded, specifically `profile.school_id`.
    *   The exact `school_id` value being used in the Supabase query for the `schools` table.he `PGRST116` error code.
    *   Implement comprehensive logging to track retry attempts and success/failure.
    *   Add special handling for new management users to ensure smooth onboarding.
    *   **Success Criteria**: Client-side code successfully retries profile loading when the profile is not immediately available, with appropriate timeout and error handling.

*   **T5: Test Registration Flow**
    *   Create a test script to simulate user### T3: Debug `completeOnboarding` and Profile Stateding.
    *   Test the full registration flow to ensure that profiles are correctly created and loaded.
    *   Verify that the retry mechanism works as expected.
    *   **Success Criteria**: New users can register and their profiles are loaded successfully, with no `PGRST116` errors visible to the end user.

*   **T6: Update Documentation**
{{ ... }}

## 4. Project Status Board

- [x] **T0: Create Feature Branch (`bugfix/pgrst116-school-load`)**
    - *Status*: Done
- [ ] **T1: Verify `profile.school_id` and `loadSchool` Query in `authStore.ts`**
    - *Status*: Skipped (RLS issue was primary suspect and confirmed)
    - *Details*: Add logging to confirm `school_id` and query construction.
- [x] **T2: Review RLS Policies for `schools` Table and `createSchool` Logic**
    - *Status*: Done
    - *Details*: Confirmed RLS enabled on `public.schools` with no existing policies. Created a `SELECT` policy to allow authenticated users to read their linked school. Policy: `CREATE POLICY "Allow authenticated users to read their own school" ON public.schools FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM public.users WHERE ((public.users.id = auth.uid()) AND (public.users.school_id = public.schools.id))))`.
- [ ] **T3: Debug `completeOnboarding` and Profile State**
    - *Status*: Skipped (RLS issue was primary suspect and confirmed)
    - *Details*: Trace `completeOnboarding` in `app/auth/onboarding/index.tsx`. Verify `profile.school_id` set and profile state before dashboard navigation.
- [x] **T4: Implement Fixes and Test**
    - *Status*: Done (Fix was applying RLS policy. User confirmed application works.)
    - *Details*: Apply code/policy changes. Test onboarding to dashboard flow.
- [x] **T5: Test Registration Flow**
    - *Status*: Done
    - *Details*: Create a test script to simulate user registration and verify profile loading.
- [x] **T6: Update Documentation**
    - *Status*: Done
    - *Details*: Update documentation to reflect changes and lessons learned.
- [x] **T7: Merge and Deploy**
    - *Status*: Done
    - *Details*: Merge feature branch into main and deploy to production.

## 5. Executor's Feedback or Assistance Requests

- The `PGRST116` error ("JSON object requested, multiple (or no) rows returned") was successfully resolved.
- The root cause was that Row Level Security (RLS) had been enabled on the `public.schools` table in Supabase, but no `SELECT` policies were defined. This caused all queries to the table to return 0 rows for authenticated users.
- A new RLS policy named "Allow authenticated users to read their own school" was created for the `SELECT` command on `public.schools`, applicable to the `authenticated` role. The `USING` expression `(EXISTS (SELECT 1 FROM public.users WHERE ((public.users.id = auth.uid()) AND (public.users.school_id = public.schools.id))))` now allows users to fetch their associated school data.
- This was confirmed by querying `pg_policies` before and after applying the new policy using Supabase MCP tools.

## 6. Lessons Learned

- When RLS is enabled on a Supabase table, it defaults to "deny all" access. Explicit policies for `SELECT`, `INSERT`, `UPDATE`, `DELETE` must be created for the intended roles.
- The `PGRST116` error from Supabase, indicating 0 rows returned when one was expected (via `.single()`), is a strong indicator of RLS issues if RLS has been recently enabled or modified.
- Supabase MCP tools (`mcp4_execute_sql`) can be effectively used to query database catalogs (like `pg_policies`) and apply DDL statements like `CREATE POLICY` directly, which is useful for diagnosing and fixing RLS issues remotely.
- Implement robust retry mechanisms in client-side code to handle potential delays in database operations, especially when dealing with triggers and RLS policies.

5. **Testing Authentication Flows**: When testing authentication flows, be aware of email confirmation requirements and other Supabase Auth settings that might affect the registration process.
