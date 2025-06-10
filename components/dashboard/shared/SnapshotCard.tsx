import React from 'react';
import { View, Text } from 'react-native';
import * as LucideIcons from 'lucide-react-native';
import { SnapshotCardProps } from './types'; // Assuming types.ts is in the same folder

// Helper to get icon component by name, with a fallback
const Icon = ({ name, ...props }: { name: string } & LucideIcons.LucideProps) => {
  const LucideIconComponent = LucideIcons[name as keyof typeof LucideIcons] as React.ElementType;
  if (!LucideIconComponent) {
    return <LucideIcons.HelpCircle {...props} />; // Default icon
  }
  return <LucideIconComponent {...props} />;
};

export function SnapshotCard({
  title,
  value,
  trend,
  subtitle,
  icon = "HelpCircle", // Default icon if not provided
  color, // e.g., "blue", "green", "amber", "purple"
}: SnapshotCardProps) {
  const trendColor = trend && trend > 0 ? 'text-green-600' : trend && trend < 0 ? 'text-red-600' : 'text-slate-500';
  const trendSign = trend && trend > 0 ? '+' : '';

  let iconBgClass = 'bg-slate-100'; // Tailwind class for background
  let iconColorString = '#475569';   // Hex or named color for icon foreground

  if (color) {
    switch (color.toLowerCase()) {
      case 'blue':
        iconBgClass = 'bg-blue-100';    // Tailwind: #dbeafe
        iconColorString = '#2563eb';    // Tailwind: blue-600
        break;
      case 'green':
        iconBgClass = 'bg-green-100';   // Tailwind: #dcfce7
        iconColorString = '#16a34a';    // Tailwind: green-600
        break;
      case 'amber':
        iconBgClass = 'bg-amber-100'; // Tailwind: #fef3c7
        iconColorString = '#d97706';    // Tailwind: amber-600
        break;
      case 'purple':
        iconBgClass = 'bg-purple-100';  // Tailwind: #e9d5ff
        iconColorString = '#7e22ce';    // Tailwind: purple-600
        break;
      // Add more color cases as needed
    }
  }

  return (
    <View className="bg-white p-3.5 rounded-xl shadow-lg border border-slate-100 flex-1 min-w-[150px]"> {/* min-w for better wrapping */}
      <View className="flex-row items-start space-x-3">
        <View className={`w-10 h-10 rounded-lg items-center justify-center ${iconBgClass}`}>
          <Icon name={icon} size={22} color={iconColorString} />
        </View>
        <View className="flex-1">
          <Text className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">{title}</Text>
          <View className="flex-row items-baseline mt-0.5">
            <Text className="text-xl font-bold text-slate-800">{value}</Text>
            {trend !== undefined && trend !== null && ( // Check for null as well
              <Text className={`text-xs font-semibold ml-1.5 ${trendColor}`}>
                ({trendSign}{trend}%)
              </Text>
            )}
          </View>
          {subtitle && (
            <Text className="text-[11px] text-slate-500 mt-0.5">{subtitle}</Text>
          )}
        </View>
      </View>
    </View>
  );
}

SnapshotCard.displayName = 'SnapshotCard';
