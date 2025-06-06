import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { Dashboard as ManagementDashboard } from '../components/dashboard/management/Dashboard';

export default function Dashboard() {
  const router = useRouter();

  // Mock data for the management dashboard
  const mockDashboardData: any = {
    school: {
      name: 'Sekolah Impian',
      location: 'Kota Pelajar',
      // Add other SchoolInfo fields if necessary for other components
    },
    user: {
      name: 'Pengguna Sekolah',
      role: 'Administrator', // Added role
      // Add other UserInfo fields if necessary for other components
    },
    trial: {
      isActive: true,
      daysRemaining: 14,
      totalDays: 30,
      features: ['Feature A', 'Feature B'], // Added features array
      // Add other TrialStatus fields if necessary
    },
    stats: {
      students: {
        total: 1234,
        trend: 5, // Example trend
        newToday: 10, // Example new today
      },
      teachers: {
        total: 89,
        online: 75, // Example online
      },
      attendance: {
        percentage: 95,
        present: 1172,
        total: 1234,
        trend: 2, // Example trend
      },
      financial: {
        collectionRate: 88,
        trend: -1, // Example trend
      },
      // totalClasses: 45, // Removed as it's not in DashboardStats type, will re-evaluate if needed
    },
    weather: {
      temperature: 28,
      condition: 'Cerah Berawan',
      icon: '02d', // Renamed iconCode to icon
      humidity: 60, // Added humidity
      location: 'Kota Pelajar', // Added location
      // Add other WeatherData fields if necessary
    },
    prayerTimes: [
      { name: 'Fajr', time: '04:45' },
      { name: 'Dhuhr', time: '12:05' },
      { name: 'Asr', time: '15:30' },
      { name: 'Maghrib', time: '18:00' },
      { name: 'Isha', time: '19:15' },
    ],
    pendingTasks: 12,
    recentActivities: [
      'New student registration: Ahmed Al-Rashid',
      'Class schedule updated for Grade 10-A', 
      'Monthly report generated',
      'Teacher meeting scheduled for tomorrow'
    ],
    activities: [] // Added empty activities array to satisfy DashboardData type
  };

  const mockPriorityItems = [
    {
      id: '1',
      title: 'Review Student Applications',
      description: '15 new applications pending review',
      type: 'urgent' as const, // Changed from priority: 'high', removed category
      timestamp: new Date(Date.now() + 24 * 60 * 60 * 1000) // Renamed from dueDate
    },
    {
      id: '2',
      title: 'Prepare Monthly Report',
      description: 'Academic performance summary due',
      type: 'warning' as const, // Changed from priority: 'medium', removed category
      timestamp: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) // Renamed from dueDate
    },
    {
      id: '3',
      title: 'Schedule Parent Meetings',
      description: 'Quarterly parent-teacher conferences',
      type: 'success' as const, // Changed from priority: 'low', removed category. Consider 'info' if more appropriate.
      timestamp: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // Renamed from dueDate
    }
  ];

  const mockQuickActions = [
    {
      id: '1',
      title: 'Add Student',
      icon: 'person-add' as const,
      onPress: () => console.log('Navigate to add student')
    },
    {
      id: '2',
      title: 'Create Class',
      icon: 'library' as const, 
      onPress: () => console.log('Navigate to create class')
    },
    {
      id: '3',
      title: 'Send Message',
      icon: 'mail' as const,
      onPress: () => console.log('Navigate to messages')
    },
    {
      id: '4',
      title: 'View Reports',
      icon: 'bar-chart' as const,
      onPress: () => console.log('Navigate to reports')
    }
  ];

  const handleRefresh = async () => {
    // TODO: Implement actual data refresh
    console.log('Refreshing dashboard data...');
  };

  return (
    <>
      <Stack.Screen 
        options={{
          title: 'Dashboard',
          headerShown: true,
        }} 
      />
      
      <ManagementDashboard
        data={mockDashboardData}
        priorityItems={mockPriorityItems}
        quickActions={mockQuickActions}
        onRefresh={handleRefresh}
      />
    </>
  );
}