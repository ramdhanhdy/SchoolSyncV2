# Implementation Plan: Fix Onboarding Loop

## 1. Branch Name
`fix/onboarding-loop`

## 2. Background and Motivation
Users, particularly those with the 'management' role and the "remember me" option enabled, are consistently redirected to the onboarding screens even after completing the onboarding process multiple times. This creates a frustrating user experience and prevents them from accessing the main application.

## 3. Key Challenges and Analysis
- **State Management:** Understanding how the application tracks whether a user has completed onboarding. This could involve local storage, a database flag, or session state.
- **"Remember Me" Interaction:** Investigating how the "remember me" functionality and session restoration logic interact with the onboarding status. It's possible that session restoration doesn't correctly load or respect the onboarding completion flag.
- **Navigation Logic:** Analyzing the application's navigation control flow, especially the logic that decides whether to show the onboarding screens or the main application dashboard.
- **Role-Specific Behavior:** Checking if the issue is specific to the 'management' role or if it affects other roles as well.

## 4. High-level Task Breakdown
- [x] 1. Create a feature branch named `fix/onboarding-loop` off the `master` branch.
- [x] 2. **Investigate Onboarding Status Management:**
    - [x] 2.1. Identify where and how the application sets the "onboarding complete" status (implicitly via profile/school creation).
    - [x] 2.2. Determine how this status is stored (in Supabase `users` table via `full_name` and `school_id`).
    - [x] 2.3. Verify how this status is read when the app loads or a user session is restored (via `initialize` and `loadUserProfile` in `authStore.ts`).
    - [x] 2.4. Add logging around these areas to trace the flow (logging added to `authStore.ts`).
    - **Success Criteria:** Clear understanding of the onboarding status lifecycle. Logging in place for further analysis.
- [ ] 3. **Analyze Session Restoration and "Remember Me":**
    - [ ] 3.1. Examine the code responsible for "remember me" and automatic login/session restoration.
    - [ ] 3.2. Check if the onboarding status is correctly retrieved and considered during this process.
    - **Success Criteria:** Identify if session restoration correctly loads and uses the onboarding status.
- [ ] 4. **Review Navigation Logic:**
    - [ ] 4.1. Trace the code that handles initial app navigation (e.g., in a root navigator or app entry point).
    - [ ] 4.2. Understand the conditions that lead to showing the onboarding flow versus the main app.
    - [ ] 4.3. Specifically look at how `profile.school_id` and other profile/onboarding flags are used in navigation decisions, referencing `MEMORY[e0f2f42c-17c3-4e0b-93cc-37a46be9eb22]` which mentions `profile.school_id` being potentially problematic in `authStore.ts`.
    - **Success Criteria:** Pinpoint the exact conditional logic that incorrectly routes users to onboarding.
- [ ] 5. **Pinpoint Root Cause and Propose Solution:**
    - [ ] 5.1. Based on findings from tasks 2-4, determine the exact reason for the loop.
    - [ ] 5.2. Formulate a specific code change to fix the issue.
    - **Success Criteria:** A clear hypothesis for the bug and a proposed fix.
- [ ] 6. **Implement and Test Fix:**
    - [ ] 6.1. Apply the code changes.
    - [ ] 6.2. Test thoroughly:
        - New user onboarding.
        - Existing user login (with and without "remember me").
        - Specifically test the 'management' role.
        - Test after clearing app data/cache.
    - **Success Criteria:** Onboarding is shown only once; subsequent logins (especially with "remember me") go directly to the main app.
- [ ] 7. **Code Review and Refinement:**
    - [ ] 7.1. Review the changes for clarity, efficiency, and potential side effects.
    - [ ] 7.2. Ensure no new linting issues are introduced (referencing `MEMORY[72362d63-0e06-4ad4-9d41-1dca0dc66ca2]` about ESLint config).
    - **Success Criteria:** Code is clean, well-documented, and adheres to project standards.
- [ ] 8. **Update Documentation (if necessary):**
    - [ ] 8.1. If changes affect how onboarding status is handled or configured, update relevant developer or user documentation.
    - **Success Criteria:** Documentation is up-to-date.
- [ ] 9. **Commit and Push Changes:**
    - [ ] 9.1. Commit the fix with a clear message.
    - [ ] 9.2. Push the branch to the remote repository.
    - **Success Criteria:** Changes are saved and shared.

## 5. Project Status Board
- [x] **Task 1:** Create feature branch `fix/onboarding-loop`
- [x] **Task 2:** Investigate Onboarding Status Management (Logging Added)
- [x] **Task 3:** Analyze Session Restoration and "Remember Me" (Logs analyzed, data loads correctly)
- [x] **Task 4:** Review Navigation Logic (Reviewed `app/auth/index.tsx`, race condition identified and resolved)
- [x] **Task 5:** Pinpoint Root Cause and Propose Solution (Race condition in `app/auth/index.tsx` identified as root cause. Fix implemented using `loading` state and comprehensive checks in navigation `useEffect`.)
- [x] **Task 6:** Implement and Test Fix (Fix implemented in `app/auth/index.tsx` and confirmed by USER to resolve the onboarding loop.)
- [x] **Task 7:** Code Review and Refinement (Removed debug console logs from `store/authStore.ts` and `app/auth/index.tsx`.)
- [x] **Task 8:** Update Documentation (Added entry to `docs/LESSONS_LEARNED.md` about the race condition and fix.)
- [x] **Task 9:** Commit and Push Changes (Changes committed and pushed to `fix/onboarding-loop` branch.)

## 6. Current Status / Progress Tracking
*(To be updated by Executor)*
- **2025-06-09:** Planning phase complete. Branch `fix/onboarding-loop` created from `master`.
- **2025-06-09:** Task 2: Investigated onboarding status management. Found it's implicit via profile & school data in `authStore.ts`. Added extensive logging to `initialize` and `loadUserProfile` in `authStore.ts` to trace session restoration and data loading.
- **2025-06-09:** Task 3: Analyzed session restoration logs. Confirmed `authStore` loads session, profile, and school data correctly.
- **2025-06-09:** Task 4 & 5: Reviewed navigation logic in `app/auth/index.tsx`. Identified a race condition as the likely root cause for the onboarding loop. Implemented a fix by incorporating the `loading` state from `authStore` into the navigation `useEffect` and ensuring all necessary data (`profile.full_name`, `profile.school_id`, `school.id`) is present before redirecting to the dashboard. Added detailed logging to `app/auth/index.tsx` for verification.
- **2025-06-09:** Task 6: User confirmed that the implemented fix in `app/auth/index.tsx` has successfully resolved the onboarding loop issue.
- **2025-06-09:** Task 7: Code review and refinement completed. Debug console logs added for this task were removed from `store/authStore.ts` and `app/auth/index.tsx`.
- **2025-06-09:** Task 8: Documentation updated. Added a new entry to `docs/LESSONS_LEARNED.md` detailing the onboarding loop race condition, its root cause, and the implemented solution.
- **2025-06-09:** Task 9: All changes related to the fix, logging removal, and documentation updates have been committed to the `fix/onboarding-loop` branch and pushed to the remote repository.

## 7. Executor's Feedback or Assistance Requests
*(To be filled by Executor if issues arise or clarification is needed)*

## 8. Lessons Learned
*(To be filled as insights are gained)*
