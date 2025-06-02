# Implementation Plan: Fix Profile Load Error (PGRST116) After Registration

**Branch Name:** `bugfix/profile-load-pgrst116`

## 1. Background and Motivation

After implementing the Supabase Auth Database Integration, we've encountered an issue where newly registered users receive a `PGRST116` error ("JSON object requested, multiple (or no) rows returned") when attempting to load their profile immediately after registration. This error occurs because the client-side `loadUserProfile` function is querying the profile before the database trigger (`on_auth_user_created`) has completed creating the new profile row, or due to RLS policy issues preventing the newly registered user from seeing their own profile.

## 2. Key Challenges and Analysis

*   **Race Condition**: The core issue is a timing/race condition between the client-side profile loading and the server-side trigger execution.
*   **Role Hierarchy**: Only management users should perform direct sign-up. Other roles (teachers, students, parents) are added hierarchically through the UI.
*   **RLS Policy Circular Dependencies**: We discovered that some RLS policies were creating circular dependencies by using helper functions that themselves query the users table.
*   **Client-Side Retry Strategy**: Implementing a robust retry mechanism in the client to handle potential delays in profile availability.

## 3. High-level Task Breakdown

*   **T1: Create Feature Branch**
    *   Create a new branch `bugfix/profile-load-pgrst116` from the latest `master`.
    *   **Success Criteria**: Branch created and checked out.

*   **T2: Enhance `handle_new_user` Trigger for Robustness**
    *   Review the `handle_new_user` trigger function for any potential silent failure points or unhandled exceptions.
    *   Update the default role to 'management' since only management users should perform direct sign-up.
    *   Add explicit error handling and transaction management to ensure the profile is committed before returning.
    *   **Success Criteria**: Trigger function updated with better error handling and correct default role.
    *   **Success Criteria**: Trigger function reviewed and potentially updated for better error handling and reliability. Database logs show clear success or failure of trigger execution during testing.

*   **T3: Fix RLS Policies to Avoid Circular Dependencies**
    *   Identify and fix RLS policies that create circular dependencies.
    *   Simplify the RLS policies to ensure new users can always access their own profiles.
    *   Remove helper functions that query the users table from within RLS policies.
    *   **Success Criteria**: RLS policies updated to avoid circular dependencies and infinite recursion errors.

*   **T4: Implement Resilient Profile Loading in `authStore.ts`**
    *   Modify the `loadUserProfile` function to implement a retry mechanism with appropriate delay.
    *   Add specific error handling for the `PGRST116` error code.
    *   Implement comprehensive logging to track retry attempts and success/failure.
    *   Add special handling for new management users to ensure smooth onboarding.
    *   **Success Criteria**: Client-side code successfully retries profile loading when the profile is not immediately available, with appropriate timeout and error handling.

*   **T5: Test Registration Flow**
    *   Create a test script to simulate user registration and profile loading.
    *   Test the full registration flow to ensure that profiles are correctly created and loaded.
    *   Verify that the retry mechanism works as expected.
    *   **Success Criteria**: New users can register and their profiles are loaded successfully, with no `PGRST116` errors visible to the end user.

*   **T6: Update Documentation**
    *   Document the changes made and the lessons learned in `docs/LESSONS_LEARNED.md`.
    *   **Success Criteria**: Documentation updated with clear explanation of the issue and solution.

*   **T7: Merge and Deploy**
    *   Create a pull request for the bugfix branch.
    *   Merge the pull request into `master` after review.
    *   **Success Criteria**: Changes merged into `master` and deployed to production.

## 4. Project Status Board

- [x] T1: Create Feature Branch
- [x] T2: Enhance `handle_new_user` Trigger for Robustness
- [x] T3: Fix RLS Policies to Avoid Circular Dependencies
- [x] T4: Implement Resilient Profile Loading in `authStore.ts`
- [x] T5: Test Registration Flow
- [ ] T6: Update Documentation
- [ ] T7: Merge and Deploy

## 5. Executor's Feedback or Assistance Requests

During implementation, we discovered several important insights:

1. The default role for new sign-ups should be 'management', not 'student', as only management users should perform direct sign-up.

2. We encountered an infinite recursion error in the RLS policies due to circular dependencies. The RLS policies were using helper functions like `get_my_role()` and `get_my_school_id()` that themselves query the users table, creating a circular reference.

3. We had to simplify the RLS policies to ensure that new users can always access their own profiles without circular dependencies.

4. The client-side retry mechanism needed to be more robust, with better logging and special handling for new management users.

5. Testing with the Supabase JavaScript client revealed that email confirmation might be required for new registrations, which affects how we test the solution.

## 6. Lessons Learned

1. **RLS Policy Design**: When designing RLS policies, be careful about circular dependencies. Avoid using helper functions that query the same table the policy is protecting.

2. **Role-Based Registration**: Our application has a hierarchical user model where only management users should perform direct sign-up. Other roles are added through the UI by users higher in the hierarchy.

3. **Client-Side Resilience**: Implement robust retry mechanisms in client-side code to handle potential delays in database operations, especially when dealing with triggers and RLS policies.

4. **Comprehensive Logging**: Add detailed logging throughout the authentication and profile loading process to help diagnose issues in production.

5. **Testing Authentication Flows**: When testing authentication flows, be aware of email confirmation requirements and other Supabase Auth settings that might affect the registration process.
