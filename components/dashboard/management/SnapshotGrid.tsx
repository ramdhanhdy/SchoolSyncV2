import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Users, UserCheck, DollarSign, GraduationCap, TrendingUp, TrendingDown } from 'lucide-react-native';
import { DashboardStats } from '../shared/types';
import { LinearGradient } from 'expo-linear-gradient';

interface SnapshotGridProps {
  stats: DashboardStats;
}

interface SnapshotCardProps {
  title: string;
  value: string | number;
  trend?: number;
  subtitle?: string;
  icon: React.ReactNode;
  color: string;
}

function SnapshotCard({ title, value, trend, subtitle, icon, color }: SnapshotCardProps) {
  const getTrendIcon = () => {
    if (trend === undefined) return null;
    if (trend > 0) return <TrendingUp size={14} color="#059669" />;
    if (trend < 0) return <TrendingDown size={14} color="#DC2626" />;
    return null;
  };

  const getTrendColor = () => {
    if (trend === undefined) return 'text-gray-500';
    if (trend > 0) return 'text-green-600';
    if (trend < 0) return 'text-red-600';
    return 'text-gray-500';
  };

  return (
    <View className="flex-1">
      {/* Top gradient border */}
      <LinearGradient
        colors={['#3b82f6', '#60a5fa']} 
        className="h-1 rounded-t-2xl"
      />
      <View className="bg-white rounded-b-2xl p-4 shadow-md border-x border-b border-slate-100 pt-5">
        <View className="flex-row items-center justify-between mb-3">
          <View className={`w-10 h-10 rounded-lg items-center justify-center ${color}`}>
            {icon}
          </View>
          {trend !== undefined && (
            <LinearGradient
              colors={trend > 0 ? ['#10b981', '#34d399'] : ['#ef4444', '#f87171']} 
              className="px-2 py-1 rounded-full shadow-sm"
            >
              <View className="flex-row items-center">
                {getTrendIcon()}
                <Text className="text-xs font-medium ml-1 text-white">
                  {trend > 0 ? '+' : ''}{trend}%
                </Text>
              </View>
            </LinearGradient>
          )}
        </View>
        
        <LinearGradient
          colors={['#3b82f6', '#60a5fa']} 
          className="mb-1"
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text className="text-2xl font-bold text-transparent bg-clip-text">
            {value}
          </Text>
        </LinearGradient>
        
        <Text className="text-sm text-slate-700 mb-1 font-medium">
          {title}
        </Text>
        
        {subtitle && (
          <Text className="text-xs text-slate-500">
            {subtitle}
          </Text>
        )}
      </View>
    </View>
  );
}

// Add displayName for debugging
SnapshotCard.displayName = 'SnapshotCard';

export function SnapshotGrid({ stats }: SnapshotGridProps) {
  return (
    <View className="px-0">
      <View className="px-5">
        <View className="flex-row items-center mb-4">
          <LinearGradient
            colors={['#3b82f6', '#60a5fa']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            className="w-1 h-6 rounded-full mr-2"
          />
          <Text className="text-lg font-bold text-slate-900">
            Ringkasan Hari Ini
          </Text>
        </View>
      </View>
      
      {/* Cards - Full Width, Scrollable Horizontally */}
      <View className="mb-3">
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={{ paddingHorizontal: 20 }}
          className="-mx-0"
        >
          <View className="flex-row space-x-3 py-1">
            <View className="w-[200px]">
              <SnapshotCard
                title="Total Santri"
                value={stats.students.total}
                trend={stats.students.trend}
                subtitle={`+${stats.students.newToday} hari ini`}
                icon={<Users size={20} color="white" />}
                color="bg-blue-500"
              />
            </View>
            
            <View className="w-[200px]">
              <SnapshotCard
                title="Kehadiran"
                value={`${stats.attendance.percentage}%`}
                trend={stats.attendance.trend}
                subtitle={`${stats.attendance.present}/${stats.attendance.total} hadir`}
                icon={<UserCheck size={20} color="white" />}
                color="bg-green-500"
              />
            </View>
            
            <View className="w-[200px]">
              <SnapshotCard
                title="Keuangan"
                value={`${stats.financial.collectionRate}%`}
                trend={stats.financial.trend}
                subtitle="Tingkat penagihan"
                icon={<DollarSign size={20} color="white" />}
                color="bg-yellow-500"
              />
            </View>
            
            <View className="w-[200px]">
              <SnapshotCard
                title="Ustadz Online"
                value={`${stats.teachers.online}/${stats.teachers.total}`}
                subtitle="Sedang aktif"
                icon={<GraduationCap size={20} color="white" />}
                color="bg-purple-500"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

// Add displayName for debugging
SnapshotGrid.displayName = 'SnapshotGrid';