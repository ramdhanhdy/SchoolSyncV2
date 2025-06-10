import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Bell, MapPin, User } from 'lucide-react-native';
import { SchoolInfo, UserInfo, TrialStatus } from './types';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

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
    if (hour < 12) return `Assalamualaikum, Selamat Pagi ${user.name}!`;
    if (hour < 15) return `Assalamualaikum, Selamat Siang ${user.name}!`;
    if (hour < 18) return `Assalamualaikum, Selamat Sore ${user.name}!`;
    return `Assalamualaikum, Selamat Malam ${user.name}!`;
  };

  const getCurrentDate = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return `${now.toLocaleDateString('id-ID', options)} - ${now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB`;
  };

  const getTrialProgress = () => {
    return ((trial.totalDays - trial.daysRemaining) / trial.totalDays) * 100;
  };

  return (
    <LinearGradient
      colors={['#1e3a8a', '#3b82f6']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="px-5 pt-12 pb-5"
    >
      {/* Status Bar Spacer */}
      <View className="h-6" />
      
      {/* Header Row */}
      <View className="flex-row items-center justify-between mb-4">
        {/* School Info */}
        <View className="flex-1">
          <Text className="text-lg font-bold text-slate-50">{school.name}</Text>
          <View className="flex-row items-center mt-1">
            <MapPin size={14} color="#94a3b8" />
            <Text className="text-sm text-slate-300 ml-1">{school.location}</Text>
          </View>
        </View>
        
        {/* Notification and Profile */}
        <View className="flex-row items-center space-x-3">
          <TouchableOpacity
            onPress={onNotificationPress}
            className="relative p-2"
          >
            <Bell size={24} color="#f8fafc" />
            {notificationCount > 0 && (
              <BlurView intensity={80} tint="light" className="absolute -top-1 -right-1 bg-red-500/80 rounded-full min-w-[18px] h-[18px] items-center justify-center overflow-hidden border border-red-400/30">
                <Text className="text-white text-xs font-medium">
                  {notificationCount > 99 ? '99+' : notificationCount}
                </Text>
              </BlurView>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={onProfilePress}
            className="w-10 h-10 bg-blue-500 rounded-full items-center justify-center border-2 border-blue-400"
          >
            <User size={24} color="#f8fafc" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Greeting and Date */}
      <View className="mb-4">
        <Text className="text-base text-slate-50 font-medium">
          {getCurrentGreeting()}
        </Text>
        <Text className="text-sm text-slate-300 mt-1">
          {getCurrentDate()}
        </Text>
      </View>
      
      {/* Trial Status Banner */}
      {trial.isActive && (
        <BlurView intensity={30} tint="light" className="overflow-hidden rounded-lg border border-blue-300/30">
          <LinearGradient
            colors={['rgba(59, 130, 246, 0.2)', 'rgba(96, 165, 250, 0.15)']}
            className="p-3 rounded-lg"
          >
            <View className="flex-row items-center justify-between mb-2">
              <Text className="text-slate-50 font-medium text-sm">
                TRIAL STATUS
              </Text>
              <Text className="text-blue-200 text-sm font-medium">
                {trial.daysRemaining} hari tersisa
              </Text>
            </View>
            
            {/* Progress Bar */}
            <View className="bg-blue-900/30 h-2 rounded-full overflow-hidden">
              <LinearGradient
                colors={['#3b82f6', '#60a5fa']} 
                className="h-full rounded-full"
                style={{ width: `${getTrialProgress()}%` }}
              />
            </View>
            
            <Text className="text-slate-200 text-xs mt-2">
              Nikmati semua fitur premium selama masa uji coba
            </Text>
          </LinearGradient>
        </BlurView>
      )}
    </LinearGradient>
  );
}