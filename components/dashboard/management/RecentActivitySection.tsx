import React from 'react';
import { View, Text } from 'react-native';
import { RecentActivityItem } from '../shared/types';
import { RecentActivityCard } from '../shared/RecentActivityCard';
import { FileQuestion } from 'lucide-react-native'; // For empty state

interface RecentActivitySectionProps {
  activities: RecentActivityItem[];
}

export function RecentActivitySection({ activities }: RecentActivitySectionProps) {
  return (
    <View className="mb-6 px-1">
      <Text className="text-lg font-semibold text-slate-800 mb-2">
        Aktivitas Terbaru
      </Text>
      {activities && activities.length > 0 ? (
        <View className="bg-white rounded-xl shadow-lg border border-slate-100 p-3">
          {activities.map((activity, index) => (
            <RecentActivityCard
              key={activity.id}
              item={activity}
              isLastItem={index === activities.length - 1}
            />
          ))}
        </View>
      ) : (
        <View className="bg-white rounded-xl shadow-lg border border-slate-100 p-6 items-center justify-center min-h-[120px]">
          <FileQuestion size={36} color="#94a3b8" className="mb-3" />
          <Text className="text-sm text-slate-500 text-center">
            Tidak ada aktivitas terbaru untuk ditampilkan.
          </Text>
        </View>
      )}
    </View>
  );
}

RecentActivitySection.displayName = 'RecentActivitySection';
