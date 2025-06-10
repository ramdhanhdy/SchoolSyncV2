import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View, RefreshControl, Text } from 'react-native';
import { DashboardHeader } from '../shared/DashboardHeader';
import { PrayerTimes } from '../shared/PrayerTimes';
import { WeatherWidget } from '../shared/WeatherWidget';
import { SnapshotCard } from '../shared/SnapshotCard';
import { PriorityCard } from './PriorityCard';
import { QuickActions } from './QuickActions';
import { RecentActivitySection } from './RecentActivitySection';
import { FloatingActionButton } from './FloatingActionButton';
import { DashboardData, PriorityItem, QuickAction, WeatherData, SnapshotCardProps, RecentActivityItem } from '../shared/types';
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
  const weatherData: WeatherData = {
    location: "Bogor, ID",
    temperature: 29,
    condition: "Berawan",
    humidity: 65,
    icon: "Cloudy", // Added to satisfy WeatherData type
  };

  const snapshotCardsData: SnapshotCardProps[] = [
    {
      title: "Total Santri",
      value: data.stats.students.total,
      trend: data.stats.students.trend,
      subtitle: `${data.stats.students.newToday} baru hari ini`,
      icon: "Users",
      color: "blue",
    },
    {
      title: "Kehadiran",
      value: `${data.stats.attendance.percentage}%`,
      trend: data.stats.attendance.trend,
      subtitle: `${data.stats.attendance.present}/${data.stats.attendance.total} hadir`,
      icon: "UserCheck", // Changed from CheckCircle2 for relevance
      color: "green",
    },
    {
      title: "Keuangan",
      value: `${data.stats.financial.collectionRate}%`,
      trend: data.stats.financial.trend,
      subtitle: "Tingkat Kolektabilitas",
      icon: "TrendingUp", // Or Wallet, Banknote
      color: "amber",
    },
    {
      title: "Guru Aktif",
      value: `${data.stats.teachers.online}/${data.stats.teachers.total}`,
      // No trend for teachers in current data structure
      subtitle: "Online / Total Terdaftar",
      icon: "UserCog", // Or Briefcase
      color: "purple",
    },
  ];

  const recentActivitiesData: RecentActivityItem[] = [
    {
      id: '1',
      icon: 'DollarSign',
      description: 'Pembayaran SPP oleh wali santri Ahmad (Kelas XA) sebesar Rp500.000 telah dikonfirmasi.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      category: 'payment',
      iconColor: '#16a34a', 
      iconBgColor: 'bg-green-100',
    },
    {
      id: '2',
      icon: 'Megaphone',
      description: 'Pengumuman: Kegiatan Belajar Mengajar diliburkan pada tanggal 17 Juni 2024.',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      category: 'announcement',
      iconColor: '#2563eb',
      iconBgColor: 'bg-blue-100',
    },
    {
      id: '3',
      icon: 'UserCheck',
      description: 'Absensi Ustadz Abdullah (Fiqih Kelas XI) telah tercatat hadir.',
      timestamp: new Date(Date.now() - 22 * 60 * 60 * 1000), // 22 hours ago
      category: 'attendance',
      iconColor: '#7c3aed', 
      iconBgColor: 'bg-purple-100',
    },
    {
      id: '4',
      icon: 'BookOpenText',
      description: 'Materi baru "Bab 5: Zakat" untuk Fiqih Kelas X telah ditambahkan oleh Ustadzah Fatimah.',
      timestamp: new Date(Date.now() - 1.5 * 24 * 60 * 60 * 1000), // 1.5 days ago
      category: 'academic',
      iconColor: '#db2777',
      iconBgColor: 'bg-pink-100',
    }
  ];
  const handleAddNew = () => {
    console.log('Add new item pressed');
  };
  return (
    <View className="flex-1 bg-slate-50">
      <StatusBar style="dark" backgroundColor="#f0f4f8" translucent={false} />
      <ScrollView 
        className="flex-1 bg-white"
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
        {/* Contextual Widgets Section */}
        <View className="flex-row space-x-4 mb-6">
          <WeatherWidget weather={weatherData} />
          <PrayerTimes prayerTimes={data.prayerTimes} />
        </View>

        {/* Snapshot Section */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-slate-800 mb-3">Sekilas Info Hari Ini</Text>
          <View className="flex-row flex-wrap -mx-2"> {/* Use negative margin to counteract card padding/margin if needed or use gap */}
            {snapshotCardsData.map((card, index) => (
              <View key={index} className="w-1/2 px-2 mb-4">
                <SnapshotCard {...card} />
              </View>
            ))}
          </View>
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

        {/* Recent Activity Section */}
        <RecentActivitySection activities={recentActivitiesData} />

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