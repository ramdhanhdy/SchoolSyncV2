import React from 'react';
import { ScrollView, View, RefreshControl, Text } from 'react-native';
import { DashboardHeader } from '../shared/DashboardHeader';
import { SnapshotGrid } from './SnapshotGrid';
import { WeatherWidget } from '../shared/WeatherWidget';
import { PrayerTimes } from '../shared/PrayerTimes';
import { PriorityCard } from './PriorityCard';
import { QuickActions } from './QuickActions';
import { DashboardData, PriorityItem, QuickAction } from '../shared/types';

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
  return (
    <ScrollView 
      className="flex-1 bg-gray-50"
      showsVerticalScrollIndicator={false}
      refreshControl={
        onRefresh ? (
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#1B5E20']}
            tintColor="#1B5E20"
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
        
        {/* Islamic Context Section */}
        <View className="mb-6">
          <View className="flex-row space-x-4">
            {/* Weather Widget */}
            <View className="flex-1">
              <WeatherWidget weather={data.weather} />
            </View>
            
            {/* Prayer Times */}
            <View className="flex-1">
              <PrayerTimes prayerTimes={data.prayerTimes} />
            </View>
          </View>
        </View>
        
        {/* Priority Items Section */}
        {priorityItems.length > 0 && (
          <View className="mb-6">
            <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <View className="flex-row items-center justify-between mb-4">
                <View>
                  <Text className="text-lg font-bold text-gray-900">
                    Perhatian Khusus
                  </Text>
                  <Text className="text-sm text-gray-600">
                    {priorityItems.length} item memerlukan perhatian
                  </Text>
                </View>
              </View>
              
              <View>
                {priorityItems.map((item) => (
                  <PriorityCard key={item.id} item={item} />
                ))}
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
  );
}

// Add displayName for debugging
Dashboard.displayName = 'ManagementDashboard';

// Export individual components for flexibility
export {
  DashboardHeader,
  SnapshotGrid,
  WeatherWidget,
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