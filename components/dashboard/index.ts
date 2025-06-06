// Role-based Dashboard Components
export { Dashboard as ManagementDashboard } from './management';
export { TeacherDashboard } from './teacher';
export { ParentDashboard } from './parent';
export { StudentDashboard } from './student';

// Shared Components
export { DashboardHeader, WeatherWidget, PrayerTimes } from './shared';

// Management-specific Components
export { SnapshotGrid, PriorityCard, QuickActions } from './management';

// Types
export * from './shared/types';