import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Bell, MapPin } from 'lucide-react-native';
import { SchoolInfo, UserInfo, TrialStatus } from './types';

interface DashboardHeaderProps {
  school: SchoolInfo;
  user: UserInfo;
  trial: TrialStatus;
  notificationCount?: number;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
}

export function DashboardHeader({
  school,
  user,
  trial,
  notificationCount = 0,
  onNotificationPress,
  onProfilePress,
}: DashboardHeaderProps) {
  const getCurrentGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Assalamualaikum, Selamat Pagi';
    if (hour < 15) return 'Assalamualaikum, Selamat Siang';
    if (hour < 18) return 'Assalamualaikum, Selamat Sore';
    return 'Assalamualaikum, Selamat Malam';
  };

  const getCurrentDate = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return now.toLocaleDateString('id-ID', options);
  };

  const getTrialProgress = () => {
    return ((trial.totalDays - trial.daysRemaining) / trial.totalDays) * 100;
  };

  return (
    <View className="bg-white px-5 pt-12 pb-5">
      {/* Status Bar Spacer */}
      <View className="h-6" />
      
      {/* Header Row */}
      <View className="flex-row items-center justify-between mb-4">
        {/* School Info */}
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-900">{school.name}</Text>
          <View className="flex-row items-center mt-1">
            <MapPin size={14} color="#6B7280" />
            <Text className="text-sm text-gray-600 ml-1">{school.location}</Text>
          </View>
        </View>
        
        {/* Notification and Profile */}
        <View className="flex-row items-center space-x-3">
          <TouchableOpacity
            onPress={onNotificationPress}
            className="relative p-2"
          >
            <Bell size={24} color="#374151" />
            {notificationCount > 0 && (
              <View className="absolute -top-1 -right-1 bg-red-500 rounded-full min-w-[18px] h-[18px] items-center justify-center">
                <Text className="text-white text-xs font-medium">
                  {notificationCount > 99 ? '99+' : notificationCount}
                </Text>
              </View>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={onProfilePress}
            className="w-10 h-10 bg-green-100 rounded-full items-center justify-center"
          >
            <Text className="text-green-700 font-semibold text-lg">
              {user.name.charAt(0).toUpperCase()}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Greeting and Date */}
      <View className="mb-4">
        <Text className="text-base text-gray-900 font-medium">
          {getCurrentGreeting()}
        </Text>
        <Text className="text-sm text-gray-600 mt-1">
          {getCurrentDate()}
        </Text>
      </View>
      
      {/* Trial Status Banner */}
      {trial.isActive && (
        <View className="bg-orange-50 border border-orange-200 rounded-lg p-3">
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-orange-800 font-medium text-sm">
              Masa Uji Coba Aktif
            </Text>
            <Text className="text-orange-600 text-sm font-medium">
              {trial.daysRemaining} hari tersisa
            </Text>
          </View>
          
          {/* Progress Bar */}
          <View className="bg-orange-200 h-2 rounded-full overflow-hidden">
            <View
              className="bg-orange-500 h-full rounded-full"
              style={{ width: `${getTrialProgress()}%` }}
            />
          </View>
          
          <Text className="text-orange-700 text-xs mt-2">
            Nikmati semua fitur premium selama masa uji coba
          </Text>
        </View>
      )}
    </View>
  );
}