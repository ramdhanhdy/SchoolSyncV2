# Simplify Onboarding Experience

## Background and Motivation

**Date:** 2025-06-04
**Requested by:** User
**Priority:** Medium

### Current State
The current onboarding process has multiple steps that collect extensive information:
1. Basic Info Step: Collects full name, phone number, and position
2. School Info Step: Collects school name, type, address, city, province, and student count
3. Plan Selection Step: User selects subscription plan
4. Teacher Invite Step: User can invite teachers
5. Welcome Step: Final confirmation

### Problem Statement
The current onboarding experience is too intrusive and lengthy, potentially causing user drop-off. Users are required to provide extensive information upfront that could be collected later or made optional.

### Desired Outcome
Simplify the onboarding experience by:
- Combining "Informasi Dasar" and "Informasi Sekolah" into a single page
- Removing phone number field from basic info
- Removing school address and province fields
- Only collecting essential information: full name and school name
- Making the process less intimidating and faster to complete

## Key Challenges and Analysis

### Technical Challenges
1. **Data Structure Updates**: Need to modify OnboardingData interface to make removed fields optional
2. **Component Consolidation**: Merge BasicInfoStep and SchoolInfoStep into a single component
3. **Validation Logic**: Simplify validation to only check required fields (full name and school name)
4. **Step Navigation**: Reduce total steps from 5 to 4 (or potentially 3 if further simplified)
5. **Database Schema**: Ensure removed fields can be null/optional in the database

### UX Considerations
1. **Progressive Disclosure**: Allow users to add more details later in their profile
2. **Completion Incentives**: Consider showing completion percentage for optional fields
3. **Onboarding Flow**: Maintain smooth transition between remaining steps

### Compliance Considerations
1. **Data Minimization**: Aligns with privacy best practices by collecting only essential data
2. **Indonesian Localization**: Maintain proper Bahasa Indonesia throughout
3. **Islamic Values**: Ensure simplified flow still respects cultural context

## High-level Task Breakdown

### Branch Name
`feature/simplify-onboarding-experience`

### Task List

**T1: Create Feature Branch**
- [ ] Create new branch `feature/simplify-onboarding-experience` from main
- [ ] Verify branch creation and switch to it
- **Success Criteria:** Branch exists and is active

**T2: Update OnboardingData Interface**
- [ ] Modify OnboardingData interface to make phone, address, city, province, and studentCount optional
- [ ] Update type definitions to reflect optional fields
- [ ] Ensure backward compatibility with existing code
- **Success Criteria:** TypeScript compilation succeeds with updated interface

**T3: Create Combined Basic and School Info Component**
- [ ] Create new component `CombinedInfoStep.tsx` in `components/onboarding/`
- [ ] Implement form with only full name and school name fields
- [ ] Add proper validation for required fields only
- [ ] Include proper Indonesian labels and placeholders
- [ ] Add accessibility attributes following project standards
- **Success Criteria:** Component renders correctly with proper validation

**T4: Update Onboarding Flow**
- [ ] Modify `app/auth/onboarding/index.tsx` to use new combined component
- [ ] Update step navigation to reflect reduced step count
- [ ] Remove references to old BasicInfoStep and SchoolInfoStep
- [ ] Update TOTAL_STEPS constant
- **Success Criteria:** Onboarding flow works with new component and correct step count

**T5: Update Default Values and Validation**
- [ ] Set appropriate default values for removed fields
- [ ] Update form validation logic to only require full name and school name
- [ ] Ensure optional fields don't cause validation errors
- **Success Criteria:** Form validation works correctly with simplified requirements

**T6: Test and Verify**
- [ ] Test complete onboarding flow from start to finish
- [ ] Verify data is saved correctly with optional fields as null/empty
- [ ] Test form validation with various input scenarios
- [ ] Verify UI/UX improvements and reduced friction
- **Success Criteria:** Onboarding completes successfully with simplified data collection

**T7: Clean Up Unused Components**
- [ ] Remove or archive old BasicInfoStep.tsx and SchoolInfoStep.tsx files
- [ ] Update any imports or references to removed components
- [ ] Clean up unused constants and validation functions
- **Success Criteria:** No unused code remains, all imports resolve correctly

**T8: Documentation and Commit**
- [ ] Update component documentation
- [ ] Add comments explaining the simplified approach
- [ ] Commit changes with proper conventional commit message
- [ ] Push branch and create draft PR
- **Success Criteria:** Changes are properly documented and committed

## Project Status Board

### In Progress
- [ ] T1: Create Feature Branch

### Pending
- [ ] T2: Update OnboardingData Interface
- [ ] T3: Create Combined Basic and School Info Component
- [ ] T4: Update Onboarding Flow
- [ ] T5: Update Default Values and Validation
- [ ] T6: Test and Verify
- [ ] T7: Clean Up Unused Components
- [ ] T8: Documentation and Commit

### Completed
- None yet

## Current Status / Progress Tracking

**Current Phase:** Planning Complete
**Next Action:** Begin T1 - Create Feature Branch
**Blockers:** None identified

## Executor's Feedback or Assistance Requests

*This section will be updated by the Executor during implementation.*

## Lessons Learned

*This section will be updated as the implementation progresses.*

## Acceptance Criteria

1. **Simplified Form**: Onboarding only collects full name and school name
2. **Single Page**: Basic info and school info are combined into one step
3. **Reduced Friction**: Phone number, address, city, and province fields are removed
4. **Proper Validation**: Only required fields (full name and school name) are validated
5. **Indonesian Localization**: All text remains in proper Bahasa Indonesia
6. **Accessibility**: All form elements have proper accessibility attributes
7. **Data Integrity**: Optional fields are handled gracefully in the database
8. **Flow Continuity**: Remaining onboarding steps work seamlessly
9. **Code Quality**: Clean, well-documented code following project standards
10. **Testing**: Complete onboarding flow works end-to-end

## Technical Notes

### Files to Modify
- `app/auth/onboarding/index.tsx` - Main onboarding flow
- `components/onboarding/` - Create new CombinedInfoStep component
- Remove/archive `BasicInfoStep.tsx` and `SchoolInfoStep.tsx`

### Key Considerations
- Maintain backward compatibility where possible
- Follow project's TypeScript and React Native standards
- Ensure proper error handling and user feedback
- Consider future extensibility for optional field collection