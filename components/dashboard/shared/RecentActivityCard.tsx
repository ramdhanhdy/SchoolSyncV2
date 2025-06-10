import React from 'react';
import { View, Text } from 'react-native';
import * as LucideIcons from 'lucide-react-native';
import { RecentActivityItem } from './types';

interface RecentActivityCardProps {
  item: RecentActivityItem;
  isLastItem: boolean;
}

// Helper to get icon component by name, with a fallback
const Icon = ({ name, ...props }: { name: string } & LucideIcons.LucideProps) => {
  const LucideIconComponent = LucideIcons[name as keyof typeof LucideIcons] as React.ElementType;
  if (!LucideIconComponent) {
    return <LucideIcons.HelpCircle {...props} />; // Default icon
  }
  return <LucideIconComponent {...props} />;
};

const formatTimestamp = (timestamp: Date): string => {
  const now = new Date();
  const diffSeconds = Math.round((now.getTime() - timestamp.getTime()) / 1000);
  const diffMinutes = Math.round(diffSeconds / 60);
  const diffHours = Math.round(diffMinutes / 60);
  const diffDays = Math.round(diffHours / 24);

  if (diffSeconds < 5) return 'Baru saja';
  if (diffMinutes < 1) return `${diffSeconds} dtk lalu`;
  if (diffHours < 1) return `${diffMinutes} mnt lalu`;
  if (diffDays < 1) return `${diffHours} jam lalu`;
  if (diffDays < 7) return `${diffDays} hr lalu`;
  return timestamp.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
};

export function RecentActivityCard({ item, isLastItem }: RecentActivityCardProps) {
  const iconName = item.icon || 'HelpCircle';
  const iconColor = item.iconColor || '#64748B'; // Default slate-500
  const iconBgColor = item.iconBgColor || 'bg-slate-100'; // Default slate-100

  return (
    <View className="flex-row items-start py-3">
      {/* Icon and Connector Line Column */}
      <View className="items-center mr-4">
        <View className={`w-9 h-9 rounded-full items-center justify-center ${iconBgColor}`}>
          <Icon name={iconName} size={18} color={iconColor} />
        </View>
        {!isLastItem && (
          <View className="w-0.5 flex-1 bg-slate-200 mt-1" />
        )}
      </View>

      {/* Text Content Column */}
      <View className="flex-1 pt-1">
        <Text className="text-sm text-slate-700 leading-snug">
          {item.description}
        </Text>
        <Text className="text-xs text-slate-500 mt-0.5">
          {formatTimestamp(item.timestamp)}
        </Text>
      </View>
    </View>
  );
}

RecentActivityCard.displayName = 'RecentActivityCard';
