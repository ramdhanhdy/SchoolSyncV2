import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Clock } from 'lucide-react-native';
import { PrayerTime } from './types';

interface PrayerTimesProps {
  prayerTimes: PrayerTime[];
}

export function PrayerTimes({ prayerTimes }: PrayerTimesProps) {
  return (
    <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <View className="flex-row items-center mb-3">
        <Clock size={20} color="#1B5E20" />
        <Text className="text-sm font-medium text-gray-900 ml-2">
          Jadwal Sholat
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
              className={`px-3 py-2 rounded-lg min-w-[70px] items-center ${
                prayer.isCurrent
                  ? 'bg-green-100 border border-green-300'
                  : prayer.isNext
                  ? 'bg-orange-50 border border-orange-200'
                  : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <Text
                className={`text-xs font-medium ${
                  prayer.isCurrent
                    ? 'text-green-800'
                    : prayer.isNext
                    ? 'text-orange-700'
                    : 'text-gray-600'
                }`}
              >
                {prayer.name}
              </Text>
              <Text
                className={`text-sm font-semibold mt-1 ${
                  prayer.isCurrent
                    ? 'text-green-900'
                    : prayer.isNext
                    ? 'text-orange-800'
                    : 'text-gray-800'
                }`}
              >
                {prayer.time}
              </Text>
              {prayer.isCurrent && (
                <View className="w-2 h-2 bg-green-500 rounded-full mt-1" />
              )}
            </View>
          ))}
        </View>
      </ScrollView>
      
      {/* Current/Next Prayer Indicator */}
      <View className="mt-3 pt-3 border-t border-gray-100">
        {prayerTimes.find(p => p.isCurrent) && (
          <Text className="text-xs text-green-700">
            Waktu sholat {prayerTimes.find(p => p.isCurrent)?.name} sedang berlangsung
          </Text>
        )}
        {prayerTimes.find(p => p.isNext) && !prayerTimes.find(p => p.isCurrent) && (
          <Text className="text-xs text-orange-700">
            Sholat berikutnya: {prayerTimes.find(p => p.isNext)?.name} pukul {prayerTimes.find(p => p.isNext)?.time}
          </Text>
        )}
      </View>
    </View>
  );
}