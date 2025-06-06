import React from 'react';
import { ScrollView, View, RefreshControl } from 'react-native';
import { DashboardHeader } from '../shared/DashboardHeader';
import { WeatherWidget } from '../shared/WeatherWidget';
import { PrayerTimes } from '../shared/PrayerTimes';
import { DashboardData } from '../shared/types';

interface StudentDashboardProps {
  data: DashboardData;
  onRefresh?: () => void;
  refreshing?: boolean;
}

export function Dashboard({ 
  data, 
  onRefresh,
  refreshing = false 
}: StudentDashboardProps) {
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
        {/* Weather and Prayer Times Row */}
        <View className="flex-row gap-4 mb-6">
          <View className="flex-1">
            <WeatherWidget weather={data.weather} />
          </View>
          <View className="flex-1">
            <PrayerTimes prayerTimes={data.prayerTimes} />
          </View>
        </View>
        
        {/* Student-specific content will be added here */}
        {/* TODO: Add student-specific components like:
            - Class Schedule
            - Assignment Due Dates
            - Grades Overview
            - Attendance Record
            - Announcements
        */}
      </View>
    </ScrollView>
  );
}