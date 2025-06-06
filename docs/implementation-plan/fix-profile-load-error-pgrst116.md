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

- [x] T1: Create Feature Branch
- [x] T2: Enhance `handle_new_user` Trigger for Robustness
- [x]### T2: Review RLS Policies for `schools` Table and `createSchool` LogicCircular Dependencies
- [x] T4: Implement Resilient Profile Loading in `authStore.ts`
- [x] T5: Test Registration Flow
- [x] T6: Update Documentation
- [ ] T7: Merge and Deploy

## 5. Executor's Feedback or Assistance Requests

During implementation, we discovered several important insights:

1. The default role for new sign-ups should be 'management', not 'student', as only management users should perform direct sign-up.

2. We encountered an infinite recursion error in the RLS policies due to circular dependencies. The RLS policies were using helper functions like `get_my_role()` and `get_my_school_id()` that themselves query the users table, creating a circular- **RLS Policies**: Review Row Level Security policies on the `schools` table. Ensure the authenticated user has permission to read the school row associated with their `profile.school_id`. This is a common cause for `.single()` returning 0 rows even if the data exists.

4. The client-side retry mechanism needed to be more robust, with better logging and special handling for new management users.

5. Testing with the Supabase JavaScript client revealed that email confirmation might be required for new registrations, which affects how we test the solution.

{{ ... }}

## 6. Lessons Learned

1. **RLS Policy Design**: When designing RLS policies, be careful about circular dependencies. Avoid using helper functions that query the same table the policy is protecting.

2. **Role-Based Registration**: Our application has a hierarchical user model where only management users should perform direct sign-up. Other roles are added through the UI by users higher in the hierarchy.

3. **Client-Side Resilience**: Implement robust retry mechanisms in client-side code to handle potential delays in database operations, especially when dealing with triggers and RLS policies.

4. **Comprehensive Logging**: Add detailed logging throughout the authentication and profile loading process to help diagnose issues in production.

5. **Testing Authentication Flows**: When testing authentication flows, be aware of email confirmation requirements and other Supabase Auth settings that might affect the registration process.
