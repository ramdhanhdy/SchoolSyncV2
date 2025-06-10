import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Clock } from 'lucide-react-native';
import { PrayerTime } from './types';
import { LinearGradient } from 'expo-linear-gradient';

interface PrayerTimesProps {
  prayerTimes: PrayerTime[];
}

export function PrayerTimes({ prayerTimes }: PrayerTimesProps) {
  return (
    <View className="flex-1">
      {/* Top gradient border */}
      <LinearGradient
        colors={['#3b82f6', '#60a5fa']} 
        className="h-1 rounded-t-2xl"
      />
      <View className="bg-white rounded-b-2xl p-4 shadow-md border-x border-b border-slate-100">
        <View className="flex-row items-center mb-3">
          <Clock size={20} color="#3b82f6" />
          <Text className="text-sm font-medium text-slate-900 ml-2">
            Jadwal Sholat Hari Ini
          </Text>
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="-mx-1"
        >
          <View className="flex-row space-x-3">
            {prayerTimes.map((prayer, index) => (
              <View
                key={index}
                className={`px-3 py-2 rounded-lg min-w-[70px] items-center shadow-sm ${
                  prayer.isCurrent
                    ? 'bg-blue-500 border border-blue-400'
                    : prayer.isNext
                    ? 'bg-blue-100 border border-blue-200'
                    : 'bg-slate-50 border border-slate-200'
                }`}
              >
                <Text
                  className={`text-xs font-medium ${
                    prayer.isCurrent
                      ? 'text-white'
                      : prayer.isNext
                      ? 'text-blue-700'
                      : 'text-slate-700'
                  }`}
                >
                  {prayer.name}
                </Text>
                <Text
                  className={`text-sm font-semibold mt-1 ${
                    prayer.isCurrent
                      ? 'text-white'
                      : prayer.isNext
                      ? 'text-blue-800'
                      : 'text-slate-800'
                  }`}
                >
                  {prayer.time}
                </Text>
                {prayer.isCurrent && (
                  <View className="w-2 h-2 bg-white rounded-full mt-1" />
                )}
              </View>
            ))}
          </View>
        </ScrollView>
        
        {/* Current/Next Prayer Indicator */}
        <View className="mt-3 pt-3 border-t border-slate-100">
          {prayerTimes.find(p => p.isCurrent) && (
            <Text className="text-xs text-blue-600">
              Waktu sholat {prayerTimes.find(p => p.isCurrent)?.name} sedang berlangsung
            </Text>
          )}
          {prayerTimes.find(p => p.isNext) && !prayerTimes.find(p => p.isCurrent) && (
            <Text className="text-xs text-blue-600">
              Sholat berikutnya: {prayerTimes.find(p => p.isNext)?.name} pukul {prayerTimes.find(p => p.isNext)?.time}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
}