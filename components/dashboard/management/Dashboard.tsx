import React from 'react';
import { ScrollView, View, RefreshControl, Text } from 'react-native';
import { DashboardHeader } from '../shared/DashboardHeader';
import { PrayerTimes } from '../shared/PrayerTimes';
import { PriorityCard } from './PriorityCard';
import { QuickActions } from './QuickActions';
import { FloatingActionButton } from './FloatingActionButton';
import { DashboardData, PriorityItem, QuickAction } from '../shared/types';
import { LinearGradient } from 'expo-linear-gradient';

interface DashboardProps {
  data: DashboardData;
  priorityItems?: PriorityItem[];
  quickActions?: QuickAction[];
  onRefresh?: () => void;
  refreshing?: boolean;
}

export function Dashboard({ 
  data, 
  priorityItems = [], 
  quickActions,
  onRefresh,
  refreshing = false 
}: DashboardProps) {
  const handleAddNew = () => {
    console.log('Add new item pressed');
  };
  return (
    <View className="flex-1 bg-slate-50">
      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={
          onRefresh ? (
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#3b82f6']}
              tintColor="#3b82f6"
            />
          ) : undefined
        }
      >
      {/* Header Section */}
      <DashboardHeader 
        school={data.school}
        user={data.user}
        trial={data.trial}
      />
      
      {/* Main Content */}
      <View className="px-4 pb-28"> {/* Adjusted horizontal padding for better alignment */}
        {/* Prayer Times Section - First section now */}
        <View className="mb-12"> {/* Further increased margin for better separation */}
          <PrayerTimes prayerTimes={data.prayerTimes} />
        </View>
        
        {/* Priority Items Section */}
        {priorityItems.length > 0 && (
          <View className="mb-12"> {/* Further increased margin for better separation */}
            <View className="flex-1">
              {/* Top gradient border */}
              <LinearGradient
                colors={['#3b82f6', '#60a5fa']} 
                className="h-1.5 rounded-t-2xl"
              />
              <View className="bg-white rounded-b-2xl p-5 shadow-md border-x border-b border-slate-100"> {/* Increased padding */}
                <View className="flex-row items-center justify-between mb-5"> {/* Increased margin */}
                  <View>
                    <Text className="text-sm text-slate-600">
                      {priorityItems.length} item memerlukan perhatian
                    </Text>
                  </View>
                </View>
                
                <View className="space-y-3"> {/* Added consistent spacing between priority cards */}
                  {priorityItems.map((item) => (
                    <PriorityCard key={item.id} item={item} />
                  ))}
                </View>
              </View>
            </View>
          </View>
        )}
        
        {/* Quick Actions Section */}
        <View className="mb-12"> {/* Further increased margin for better separation */}
          <QuickActions actions={quickActions} />
        </View>
      </View>
      </ScrollView>
      
      {/* Floating Action Button */}
      <FloatingActionButton onPress={handleAddNew} />
    </View>
  );
}

// Add displayName for debugging
Dashboard.displayName = 'ManagementDashboard';

// Export individual components for flexibility
export {
  DashboardHeader,
  PrayerTimes,
  PriorityCard,
  QuickActions,
};

// Export types
export type {
  DashboardData,
  SchoolInfo,
  UserInfo,
  DashboardStats,
  PriorityItem,
  ActivityItem,
  WeatherData,
  PrayerTime,
  TrialStatus,
  QuickAction,
  SnapshotCardProps,
} from '../shared/types';