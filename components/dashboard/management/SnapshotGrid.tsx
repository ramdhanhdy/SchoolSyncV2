import React from 'react';
import { View, Text } from 'react-native';
import { Users, UserCheck, DollarSign, GraduationCap, TrendingUp, TrendingDown } from 'lucide-react-native';
import { DashboardStats } from '../shared/types';

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
    <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex-1">
      <View className="flex-row items-center justify-between mb-3">
        <View className={`w-10 h-10 rounded-lg items-center justify-center ${color}`}>
          {icon}
        </View>
        {trend !== undefined && (
          <View className="flex-row items-center">
            {getTrendIcon()}
            <Text className={`text-xs font-medium ml-1 ${getTrendColor()}`}>
              {trend > 0 ? '+' : ''}{trend}%
            </Text>
          </View>
        )}
      </View>
      
      <Text className="text-2xl font-bold text-gray-900 mb-1">
        {value}
      </Text>
      
      <Text className="text-sm text-gray-600 mb-1">
        {title}
      </Text>
      
      {subtitle && (
        <Text className="text-xs text-gray-500">
          {subtitle}
        </Text>
      )}
    </View>
  );
}

// Add displayName for debugging
SnapshotCard.displayName = 'SnapshotCard';

export function SnapshotGrid({ stats }: SnapshotGridProps) {
  return (
    <View className="px-5">
      <Text className="text-lg font-bold text-gray-900 mb-4">
        Ringkasan Hari Ini
      </Text>
      
      {/* First Row */}
      <View className="flex-row space-x-3 mb-3">
        <SnapshotCard
          title="Total Santri"
          value={stats.students.total}
          trend={stats.students.trend}
          subtitle={`+${stats.students.newToday} hari ini`}
          icon={<Users size={20} color="white" />}
          color="bg-blue-500"
        />
        
        <SnapshotCard
          title="Kehadiran"
          value={`${stats.attendance.percentage}%`}
          trend={stats.attendance.trend}
          subtitle={`${stats.attendance.present}/${stats.attendance.total} hadir`}
          icon={<UserCheck size={20} color="white" />}
          color="bg-green-500"
        />
      </View>
      
      {/* Second Row */}
      <View className="flex-row space-x-3">
        <SnapshotCard
          title="Keuangan"
          value={`${stats.financial.collectionRate}%`}
          trend={stats.financial.trend}
          subtitle="Tingkat penagihan"
          icon={<DollarSign size={20} color="white" />}
          color="bg-yellow-500"
        />
        
        <SnapshotCard
          title="Ustadz Online"
          value={`${stats.teachers.online}/${stats.teachers.total}`}
          subtitle="Sedang aktif"
          icon={<GraduationCap size={20} color="white" />}
          color="bg-purple-500"
        />
      </View>
    </View>
  );
}

// Add displayName for debugging
SnapshotGrid.displayName = 'SnapshotGrid';