import { Stack } from 'expo-router';
import { View, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '~/components/ui/card';
import { Button, ButtonText } from '~/components/ui/button';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
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

          {/* Quick Actions */}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-typography-900 mb-3">
              Aksi Cepat
            </Text>
            <View className="gap-3">
              <Button variant="outline" size="lg">
                <ButtonText>Kelola Data Santri</ButtonText>
              </Button>
              <Button variant="outline" size="lg">
                <ButtonText>Lihat Jadwal Pelajaran</ButtonText>
              </Button>
              <Button variant="outline" size="lg">
                <ButtonText>Laporan Keuangan</ButtonText>
              </Button>
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
