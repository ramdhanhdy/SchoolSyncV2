# Implementation Plan: Polish Management Home Screen UI (Based on HTML Wireframe)

## 1. Background and Motivation

The user has provided a detailed HTML wireframe (`docs/wireframes/managementhomescreen.html`) for the Management Home Screen. The goal is to implement this design, which features a "Premium Blue Aesthetic," to replace or significantly update the existing management dashboard UI. This plan outlines the steps to translate the HTML wireframe into functional React Native components within the SchoolSyncV2 application.

## 2. Key Challenges and Analysis

- **HTML/CSS to React Native Translation**: The primary challenge is accurately translating the HTML structure and CSS styling into React Native components and styles. This includes layout (Flexbox, Grid), typography, colors, gradients, shadows, and responsive considerations for a mobile screen.
- **Component Reusability**: Identify opportunities to create reusable components for elements like cards, list items, buttons, and widgets.
- **Data Integration**: While the wireframe provides static data, the implementation should be structured to easily integrate with dynamic data sources later.
- **Iconography**: The wireframe uses text/emoji for icons (e.g., 🕌, 🔔, 🔴). These will need to be mapped to a suitable icon library (e.g., Expo Vector Icons) or custom SVG icons.
- **Theme Adherence**: Ensure the "Premium Blue Theme" is consistently applied across all elements as defined in the wireframe's CSS (gradients, specific color codes like `#3b82f6`).

## 3. Branch Name

`feature/polish-management-home-screen` (Using existing branch)

## 4. High-level Task Breakdown

**T0: Setup and Initial Branch Creation**
- **Description**: Continue working on the existing branch `feature/polish-management-home-screen`.
- **Success Criteria**: Current branch confirmed as `feature/polish-management-home-screen`. Local environment is set up on this branch.

**T1: Implement Main Screen Structure and Styling**
- **Description**: Create the main container component for the Management Home Screen. Implement the overall layout, background, and scrolling behavior as per `phone-wireframe` and `main-content` styles in the HTML.
- **Success Criteria**: A scrollable screen container is in place, matching the basic dimensions and background of the wireframe.

**T2: Implement Status Bar**
- **Description**: Replicate the status bar with time and system icons.
- **Success Criteria**: Status bar appears at the top with correct styling and placeholder content, matching the `.status-bar` style.

**T3: Implement Header Section**
- **Description**: Develop the header component including:
    - School Info (Name, Location)
    - Header Actions (Notification Icon with badge, User Icon)
    - Greeting Message (User Name, Date/Time)
    - Trial Banner (Title, Days Remaining, Progress Bar, Checklist)
- **Styling**: Match `.header`, `.header-content`, `.header-top`, `.school-info`, `.header-actions`, `.notification-badge`, `.badge`, `.greeting`, `.trial-banner` styles.
- **Success Criteria**: Header section is fully implemented with all sub-components and styling matching the wireframe. Icons are replaced with appropriate library icons.

**T4: Implement Contextual Widgets Section**
- **Description**: Develop the Weather Widget and Prayer Times Widget.
    - **Weather Widget**: Location, temperature, condition, icon.
    - **Prayer Widget**: Title, prayer times grid (Subuh, Dzuhur, Ashar), highlight current prayer.
- **Styling**: Match `.contextual-widgets`, `.weather-widget`, `.prayer-widget` styles.
- **Success Criteria**: Both widgets are implemented and styled according to the wireframe. Icons are used.

**T5: Implement Snapshot Section**
- **Description**: Develop the "Snapshot Hari Ini" section with a grid of 4 snapshot cards.
    - Each card: Title, Trend Badge, Main Value, Subtitle.
    - Cards: Santri, Kehadiran, Keuangan, Guru.
- **Styling**: Match `.snapshot-section`, `.section-title`, `.snapshot-grid`, `.snapshot-card`, `.trend-badge` styles.
- **Success Criteria**: Snapshot grid with 4 cards is implemented, styled, and displays static data as per the wireframe.

**T6: Implement Priority Section**
- **Description**: Develop the "Prioritas Hari Ini" list with priority cards.
    - Each card: Icon, Title, Time, Description, Action Button (optional).
    - Differentiate cards by urgency (urgent, warning, success) using border colors and background gradients.
- **Styling**: Match `.priority-section`, `.priority-list`, `.priority-card` (and its variants) styles.
- **Success Criteria**: Priority list with examples of urgent, warning, and success cards is implemented and styled.

**T7: Implement Quick Actions Section**
- **Description**: Develop the "Aksi Cepat" section with a grid of 4 quick action items.
    - Each item: Icon, Label.
    - Actions: Tambah Guru, Reports, Settings, Help.
- **Styling**: Match `.quick-actions-section`, `.quick-actions-grid`, `.quick-action` styles.
- **Success Criteria**: Quick actions grid is implemented and styled.

**T8: Implement Recent Activity Section**
- **Description**: Develop the "Aktivitas Terbaru" list with activity cards.
    - Each card: Icon, Title, Time, Description.
- **Styling**: Match `.activity-section`, `.activity-list`, `.activity-card` styles.
- **Success Criteria**: Recent activity list with example cards is implemented and styled.

**T9: Implement Floating Action Button (FAB)**
- **Description**: Implement the FAB with a '+' icon.
- **Styling**: Match `.floating-action` styles.
- **Success Criteria**: FAB is present, styled, and positioned correctly.

**T10: Implement Bottom Navigation Bar**
- **Description**: Develop the bottom navigation bar with 5 navigation items.
    - Each item: Icon, Label. Active state styling.
    - Items: Beranda, Santri, Keuangan, Laporan, Keamanan.
- **Styling**: Match `.bottom-nav`, `.nav-item`, `.nav-icon` styles.
- **Success Criteria**: Bottom navigation bar is implemented, styled, and the 'Beranda' item is marked active.

**T11: Component Integration and Final Review**
- **Description**: Integrate all developed components into the main Management Home Screen. Perform a thorough review against the HTML wireframe to ensure visual fidelity and completeness.
- **Success Criteria**: The complete screen matches the HTML wireframe. All elements are present and correctly styled. The screen is scrollable and responsive on a typical phone screen size.

**T12: Documentation and Code Cleanup**
- **Description**: Add necessary comments, prop-types (if using JavaScript) or TypeScript types, and ensure code follows project conventions.
- **Success Criteria**: Code is clean, well-documented, and adheres to project standards.

## 5. Project Status Board

- [x] **T0: Setup and Initial Branch Creation** (Using existing branch `feature/polish-management-home-screen`)
- [x] **T1: Implement Main Screen Structure and Styling**
- [x] **T2: Implement Status Bar**
- [x] **T3: Implement Header Section**
- [x] **T4: Implement Contextual Widgets Section**
- [x] **T5: Implement Snapshot Section**
- [x] **T6: Implement Priority Section**
- [x] **T7: Implement Quick Actions Section**
- [x] **T8: Implement Recent Activity Section**
- [x] **T9: Implement Floating Action Button (FAB)**
- [x] **T10: Implement Bottom Navigation Bar**
- [x] **T11: Component Integration and Final Review**
- [x] **T12: Documentation and Code Cleanup**

## 6. Executor's Feedback or Assistance Requests

*(Executor to fill this section during implementation)*
- **T0 Complete**: Continued on existing branch `feature/polish-management-home-screen`. Committed initial plan updates and staged UI changes (Commit: a57d5f8).
- **T1 Complete**: Updated `Dashboard.tsx` main `ScrollView` to have a `bg-white` background, aligning with the wireframe's main content area styling.
- **T2 Complete**: Added `<StatusBar style="dark" backgroundColor="#f0f4f8" translucent={false} />` to `Dashboard.tsx` to match wireframe's status bar appearance.
- **T3 Complete**: Updated `DashboardHeader.tsx` with new gradient, icon changes (User icon, red notification badge), and enhanced greeting/date messages to match wireframe.
- **T4 Complete**: Updated `PrayerTimes.tsx` styling (current prayer highlight, removed icon). Refactored `WeatherWidget.tsx` to match wireframe (layout, styling, icons) and integrated it into `Dashboard.tsx` alongside `PrayerTimes` in a row. Fixed `WeatherData` type issues.
- **T5 Complete**: Created `SnapshotCard.tsx` component for displaying individual stats with icons, trends, and theming. Integrated this into `Dashboard.tsx` by adding a new section that maps `data.stats` to `SnapshotCard` components, arranged in a 2-column grid.
- **T6 Complete**: Updated `PriorityCard.tsx` styling to align with wireframe color specifications for urgent, warning, and success types (backgrounds, text colors) and removed the icon's separate background circle.
- **T7 Complete**: Refactored `QuickActions.tsx`. Changed `QuickActionButton` to display as a circular icon button with a solid background color (from `action.color`) and a label underneath. Modified the main `QuickActions` component to use a horizontal `ScrollView` to display these buttons, matching the wireframe layout. Ensured all icon color logic in `getIcon` uses the passed parameter.
- **T8 Complete**: Defined `RecentActivityItem` type in `types.ts`. Created `RecentActivityCard.tsx` to display individual activity items with icons, descriptions, timestamps, and a vertical connector line. Created `RecentActivitySection.tsx` to list these cards with a title and empty state. Integrated `RecentActivitySection` into `Dashboard.tsx` with placeholder data.
- **T9 Complete**: Reviewed `FloatingActionButton.tsx`. Updated the `LinearGradient` colors to `['#1e3a8a', '#3b82f6']` to match the premium blue theme used in the header, aligning with the wireframe's aesthetic. Other aspects like icon, shape, and shadow were already satisfactory.
- **T10 Complete**: Created `BottomNavigationBar.tsx` component in `components/` (due to issues creating it in `components/navigation/`). The component displays navigation items with icons and labels, highlights the active route, and uses `StyleSheet` for styling. It's designed to be ready for integration with a navigation library, fulfilling the UI implementation aspect of the task.
- **T11 Complete**: Reviewed `Dashboard.tsx` for overall structure, section order, props, visual cohesion (theme, gradients, shadows, spacing, icons), and conceptual interactivity. Confirmed alignment with wireframes. Ensured key new/modified components (`SnapshotCard`, `PriorityCard`, `QuickActions`, `RecentActivityCard`, `RecentActivitySection`, `FloatingActionButton`, `BottomNavigationBar`) have `displayName` set. The dashboard screen is well-integrated and visually consistent.
- **T12 Complete**: Added `displayName` to `Dashboard` and `BottomNavigationBar` components. Reviewed all created/modified components for this task for code comments, unused code, and consistency. Updated `docs/LESSONS_LEARNED.md` with a note about file creation issues in new subdirectories.

## 7. Lessons Learned

*(To be filled as challenges are overcome or insights are gained)*
- Using a detailed HTML wireframe significantly clarifies UI requirements.

- Using a consistent color palette across components (the premium blue palette) creates visual harmony across the interface.
- Breaking down the UI enhancements by component type (headers, cards, action elements) allows for systematic implementation and consistent styling across the app.
- Gradient text effects require specific handling - in some cases using LinearGradient with a text component and appropriate styling, in others using color properties directly.
- Creating reusable components like ActionButton helps maintain UI consistency and accelerates development of new features.
- Adding subtle animations to interactive elements (like the FloatingActionButton) enhances the premium feel of the UI without compromising performance.
- Using a combination of shadows, rounded corners, and gradients creates a sense of depth and elevation that makes the UI feel more sophisticated.
- The premium blue aesthetic works best when applied with restraint - using it for key interactive elements and accent borders rather than large background areas.
