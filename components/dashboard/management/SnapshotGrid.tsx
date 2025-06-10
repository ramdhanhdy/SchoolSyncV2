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
    if (trend > 0) return <TrendingUp size={12} color="#ffffff" />;
    if (trend < 0) return <TrendingDown size={12} color="#ffffff" />;
    return null;
  };

  const getTrendColor = () => {
    if (trend === undefined) return 'text-gray-500';
    if (trend > 0) return 'text-green-600';
    if (trend < 0) return 'text-red-600';
    return 'text-gray-500';
  };

  return (
    <View style={{
      shadowColor: '#1e293b',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      height: 150, // Fixed height for all cards
      width: '100%', // Take full width of parent container
    }}>
      {/* Top gradient border */}
      <LinearGradient
        colors={['#3b82f6', '#60a5fa']} 
        className="h-1.5 rounded-t-2xl"
      />
      <View className="bg-white rounded-b-2xl p-4 border-x border-b border-slate-100 justify-between flex-1">
        <View className="flex-row items-center justify-between mb-3">
          <View className={`w-10 h-10 rounded-xl items-center justify-center ${color}`}>
            {icon}
          </View>
          {trend !== undefined && (
            <LinearGradient
              colors={trend > 0 ? ['#10b981', '#34d399'] : ['#ef4444', '#f87171']} 
              className="px-2 py-1 rounded-lg shadow-sm"
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
        
        {/* Use LinearGradient for value text to enhance premium feel */}
        <View>
          <LinearGradient
            colors={['#3b82f6', '#60a5fa']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            className="self-start rounded-md px-1"
          >
            <Text className="text-2xl font-bold text-white">
              {value}
            </Text>
          </LinearGradient>
        </View>
        
        <View className="mt-2">
          <Text className="text-sm text-slate-700 font-medium">
            {title}
          </Text>
          
          {subtitle && (
            <Text className="text-xs text-slate-500 mt-1">
              {subtitle}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}

// Add displayName for debugging
SnapshotCard.displayName = 'SnapshotCard';

export function SnapshotGrid({ stats }: SnapshotGridProps) {
  // Fixed card width for consistency across all screen sizes
  const CARD_WIDTH = 160; // Wider cards for better readability
  
  return (
    <View className="w-full">
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ 
          paddingLeft: 16, // Align with section title padding
          paddingRight: 16,
          gap: 16, // Consistent spacing between cards
          paddingBottom: 8, // Add bottom padding to show shadows properly
        }}
      >
        {/* Each card now has identical width and consistent spacing */}
        <View style={{ width: CARD_WIDTH }}>
          <SnapshotCard
            title="Total Santri"
            value={stats.students.total}
            trend={stats.students.trend}
            subtitle={`+${stats.students.newToday} hari ini`}
            icon={<Users size={20} color="#ffffff" />}
            color="bg-blue-500"
          />
        </View>
        
        <View style={{ width: CARD_WIDTH }}>
          <SnapshotCard
            title="Kehadiran"
            value={`${stats.attendance.percentage}%`}
            trend={stats.attendance.trend}
            subtitle={`${stats.attendance.present}/${stats.attendance.total} hadir`}
            icon={<UserCheck size={20} color="#ffffff" />}
            color="bg-green-500"
          />
        </View>
        
        <View style={{ width: CARD_WIDTH }}>
          <SnapshotCard
            title="Keuangan"
            value={`${stats.financial.collectionRate}%`}
            trend={stats.financial.trend}
            subtitle="Tingkat penagihan"
            icon={<DollarSign size={20} color="#ffffff" />}
            color="bg-amber-500"
          />
        </View>
        
        <View style={{ width: CARD_WIDTH }}>
          <SnapshotCard
            title="Ustadz Online"
            value={`${stats.teachers.online}/${stats.teachers.total}`}
            subtitle="Sedang aktif"
            icon={<GraduationCap size={20} color="#ffffff" />}
            color="bg-purple-500"
          />
        </View>
      </ScrollView>
    </View>
  );
}

// Add displayName for debugging
SnapshotGrid.displayName = 'SnapshotGrid';