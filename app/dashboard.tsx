import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { ManagementDashboard } from '../components/dashboard';

export default function Dashboard() {
  const router = useRouter();

  // Mock data for the management dashboard
  const mockData = {
    totalStudents: 1234,
    totalTeachers: 89,
    totalClasses: 45,
    pendingTasks: 12,
    recentActivities: [
      'New student registration: Ahmed Al-Rashid',
      'Class schedule updated for Grade 10-A', 
      'Monthly report generated',
      'Teacher meeting scheduled for tomorrow'
    ]
  };

  const mockPriorityItems = [
    {
      id: '1',
      title: 'Review Student Applications',
      description: '15 new applications pending review',
      priority: 'high' as const,
      dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      category: 'admissions' as const
    },
    {
      id: '2', 
      title: 'Prepare Monthly Report',
      description: 'Academic performance summary due',
      priority: 'medium' as const,
      dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      category: 'reports' as const
    },
    {
      id: '3',
      title: 'Schedule Parent Meetings',
      description: 'Quarterly parent-teacher conferences',
      priority: 'low' as const,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 1 week
      category: 'meetings' as const
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
        data={mockData}
        priorityItems={mockPriorityItems}
        quickActions={mockQuickActions}
        onRefresh={handleRefresh}
      />
    </>
  );
}