import React from 'react';
import { ScrollView, View, RefreshControl, Text } from 'react-native';
import { DashboardHeader } from '../shared/DashboardHeader';
import { SnapshotGrid } from './SnapshotGrid';
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
      <View className="px-5 pb-6">
        {/* Stats Snapshot Grid */}
        <View className="mb-6">
          <SnapshotGrid stats={data.stats} />
        </View>
        
        {/* Prayer Times Section */}
        <View className="mb-6">
          <PrayerTimes prayerTimes={data.prayerTimes} />
        </View>
        
        {/* Priority Items Section */}
        {priorityItems.length > 0 && (
          <View className="mb-6">
            <View className="flex-1">
              {/* Top gradient border */}
              <LinearGradient
                colors={['#3b82f6', '#60a5fa']} 
                className="h-1 rounded-t-2xl"
              />
              <View className="bg-white rounded-b-2xl p-4 shadow-md border-x border-b border-slate-100">
                <View className="flex-row items-center justify-between mb-4">
                  <View className="flex-row items-center">
                    <LinearGradient
                      colors={['#3b82f6', '#60a5fa']}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      className="w-1 h-6 rounded-full mr-2"
                    />
                    <View>
                      <Text className="text-lg font-bold text-slate-900">
                        Perhatian Khusus
                      </Text>
                      <Text className="text-sm text-slate-600">
                        {priorityItems.length} item memerlukan perhatian
                      </Text>
                    </View>
                  </View>
                </View>
                
                <View>
                  {priorityItems.map((item) => (
                    <PriorityCard key={item.id} item={item} />
                  ))}
                </View>
              </View>
            </View>
          </View>
        )}
        
        {/* Quick Actions Section */}
        <View className="mb-6">
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
  SnapshotGrid,
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