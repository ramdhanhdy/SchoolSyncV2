// Dashboard component types and interfaces

export interface SchoolInfo {
  name: string;
  location: string;
  logo?: string;
}

export interface UserInfo {
  name: string;
  role: string;
  avatar?: string;
}

export interface DashboardStats {
  students: {
    total: number;
    trend: number;
    newToday: number;
  };
  attendance: {
    percentage: number;
    present: number;
    total: number;
    trend: number;
  };
  financial: {
    collectionRate: number;
    trend: number;
  };
  teachers: {
    online: number;
    total: number;
  };
}

export interface PriorityItem {
  id: string;
  type: 'urgent' | 'warning' | 'success';
  title: string;
  description: string;
  timestamp: Date;
  actionLabel?: string;
  onAction?: () => void;
}

export interface ActivityItem {
  id: string;
  type: 'student' | 'teacher' | 'financial' | 'system';
  title: string;
  description: string;
  timestamp: Date;
  user?: string;
}

export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  location: string;
  icon: string;
}

export interface PrayerTime {
  name: string;
  time: string;
  isCurrent?: boolean;
  isNext?: boolean;
}

export interface TrialStatus {
  isActive: boolean;
  daysRemaining: number;
  totalDays: number;
  features: string[];
}

export interface DashboardData {
  school: SchoolInfo;
  user: UserInfo;
  stats: DashboardStats;
  priorities: PriorityItem[];
  activities: ActivityItem[];
  weather: WeatherData;
  prayerTimes: PrayerTime[];
  trial: TrialStatus;
  recentActivities: RecentActivityItem[];
}

export interface RecentActivityItem {
  id: string;
  icon: string; // Lucide icon name
  description: string;
  timestamp: Date; // Using Date for easier formatting
  category?: string; // e.g., 'payment', 'announcement', 'attendance'
  iconColor?: string; // Optional: for icon foreground color
  iconBgColor?: string; // Optional: for icon background circle color
}

export interface QuickAction {
  id: string;
  title: string;
  icon: string;
  onPress: () => void;
  color?: string;
  subtitle?: string;
}

export interface SnapshotCardProps {
  title: string;
  value: string | number;
  trend?: number;
  subtitle?: string;
  icon?: string;
  color?: string;
}