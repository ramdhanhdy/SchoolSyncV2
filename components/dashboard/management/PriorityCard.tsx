import React from 'react';
import { View, Text, TouchableOpacity, ColorValue } from 'react-native';
import { AlertTriangle, AlertCircle, CheckCircle, Clock } from 'lucide-react-native';
import { PriorityItem } from '../shared/types';
import { LinearGradient } from 'expo-linear-gradient';

interface PriorityCardProps {
  item: PriorityItem;
}

interface ConfigType {
  bgColor: string;
  borderColor: string;
  iconColor: string;
  textColor: string;
  subtitleColor: string;
  gradientColors: string[];
  icon: React.ReactNode;
}

export function PriorityCard({ item }: PriorityCardProps) {
  const getConfig = (): ConfigType => {
    switch (item.type) {
      case 'urgent':
        return {
          bgColor: 'bg-red-50',
          borderColor: 'border-red-100',
          iconColor: '#ef4444',
          textColor: 'text-red-800',
          subtitleColor: 'text-red-600',
          gradientColors: ['#ef4444', '#f87171'],
          icon: <AlertTriangle size={20} color="#ef4444" />,
        };
      case 'warning':
        return {
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-100',
          iconColor: '#f59e0b',
          textColor: 'text-amber-800',
          subtitleColor: 'text-amber-600',
          gradientColors: ['#f59e0b', '#fbbf24'],
          icon: <AlertCircle size={20} color="#f59e0b" />,
        };
      case 'success':
        return {
          bgColor: 'bg-emerald-50',
          borderColor: 'border-emerald-100',
          iconColor: '#10b981',
          textColor: 'text-emerald-800',
          subtitleColor: 'text-emerald-600',
          gradientColors: ['#10b981', '#34d399'],
          icon: <CheckCircle size={20} color="#10b981" />,
        };
      default:
        return {
          bgColor: 'bg-slate-50',
          borderColor: 'border-slate-100',
          iconColor: '#64748b',
          textColor: 'text-slate-800',
          subtitleColor: 'text-slate-600',
          gradientColors: ['#3b82f6', '#60a5fa'],
          icon: <AlertCircle size={20} color="#64748b" />,
        };
    }
  };

  const config = getConfig();

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) {
      return `${minutes} menit yang lalu`;
    } else if (hours < 24) {
      return `${hours} jam yang lalu`;
    } else {
      return `${days} hari yang lalu`;
    }
  };

  return (
    <View className={`${config.bgColor} ${config.borderColor} border rounded-2xl p-4 mb-3 shadow-sm`}>
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <View className="flex-row items-center mb-2">
            {config.icon}
            <Text className={`${config.textColor} font-semibold text-sm ml-2 flex-1`}>
              {item.title}
            </Text>
          </View>
          
          <Text className={`${config.subtitleColor} text-sm mb-3`}>
            {item.description}
          </Text>
          
          <View className="flex-row items-center">
            <Clock size={12} color={config.iconColor} />
            <Text className={`${config.subtitleColor} text-xs ml-1`}>
              {formatTimestamp(item.timestamp)}
            </Text>
          </View>
        </View>
        
        {item.actionLabel && item.onAction && (
          <TouchableOpacity onPress={item.onAction}>
            <View className="ml-3 overflow-hidden rounded-lg shadow-sm">
              <LinearGradient
                colors={config.gradientColors as any}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                className="px-3 py-2"
              >
                <Text className="text-white text-xs font-medium">
                  {item.actionLabel}
                </Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// Add displayName for debugging
PriorityCard.displayName = 'PriorityCard';