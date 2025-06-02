import { Stack, useRouter } from 'expo-router';
import { View, ScrollView, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '~/components/ui/card';
import { Button, ButtonText } from '~/components/ui/button';

export default function Dashboard() {
  const router = useRouter();

  const navigationCards = [
    {
      title: 'Kelola Data Santri',
      description: 'Tambah, edit, dan kelola data santri',
      icon: '👥',
      onPress: () => {
        // TODO: Navigate to santri management
        console.log('Navigate to santri management');
      },
    },
    {
      title: 'Jadwal Pelajaran',
      description: 'Lihat dan kelola jadwal pelajaran',
      icon: '📅',
      onPress: () => {
        // TODO: Navigate to schedule management
        console.log('Navigate to schedule management');
      },
    },
    {
      title: 'Laporan Keuangan',
      description: 'Kelola keuangan dan laporan',
      icon: '💰',
      onPress: () => {
        // TODO: Navigate to financial reports
        console.log('Navigate to financial reports');
      },
    },
    {
      title: 'Tab Sections',
      description: 'Akses fitur tab navigation',
      icon: '📱',
      onPress: () => {
        router.push('/(tabs)');
      },
    },
  ];

  return (
    <>
      <Stack.Screen options={{ title: 'Dashboard' }} />
      <SafeAreaView className="flex-1 bg-background">
        <ScrollView className="flex-1 p-4">
          {/* Welcome Header */}
          <View className="mb-6">
            <Text className="text-2xl font-bold text-typography-900 mb-2">
              Dashboard SchoolSync
            </Text>
            <Text className="text-base text-typography-600">
              Selamat datang di sistem manajemen pesantren
            </Text>
          </View>

          {/* Quick Stats Cards */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-typography-900 mb-3">
              Statistik Cepat
            </Text>
            <View className="flex-row flex-wrap gap-3">
              <Card className="flex-1 min-w-[150px] p-4">
                <Text className="text-2xl font-bold text-primary-600 mb-1">
                  150
                </Text>
                <Text className="text-sm text-typography-600">
                  Total Santri
                </Text>
              </Card>
              <Card className="flex-1 min-w-[150px] p-4">
                <Text className="text-2xl font-bold text-success-600 mb-1">
                  25
                </Text>
                <Text className="text-sm text-typography-600">
                  Ustadz/Ustadzah
                </Text>
              </Card>
            </View>
          </View>

          {/* Navigation Menu Cards */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-typography-900 mb-3">
              Menu Navigasi
            </Text>
            <View className="gap-3">
              {navigationCards.map((card, index) => (
                <Pressable key={index} onPress={card.onPress}>
                  <Card className="p-4 border border-outline-200 active:bg-background-50">
                    <View className="flex-row items-center">
                      <Text className="text-2xl mr-3">{card.icon}</Text>
                      <View className="flex-1">
                        <Text className="text-base font-semibold text-typography-900 mb-1">
                          {card.title}
                        </Text>
                        <Text className="text-sm text-typography-600">
                          {card.description}
                        </Text>
                      </View>
                      <Text className="text-typography-400 text-lg">›</Text>
                    </View>
                  </Card>
                </Pressable>
              ))}
            </View>
          </View>

          {/* Recent Activity */}
          <View>
            <Text className="text-lg font-semibold text-typography-900 mb-3">
              Aktivitas Terbaru
            </Text>
            <Card className="p-4">
              <Text className="text-sm text-typography-600 mb-2">
                Belum ada aktivitas terbaru
              </Text>
              <Text className="text-xs text-typography-500">
                Aktivitas akan muncul di sini setelah Anda mulai menggunakan sistem
              </Text>
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}