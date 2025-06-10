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
          bgColor: 'bg-red-100',
          borderColor: 'border-red-200',
          iconColor: '#ef4444', // red-500
          textColor: 'text-red-900',
          subtitleColor: 'text-red-700',
          gradientColors: ['#ef4444', '#f87171'],
          icon: <AlertTriangle size={20} color="#ef4444" />,
        };
      case 'warning':
        return {
          bgColor: 'bg-amber-100',
          borderColor: 'border-amber-200',
          iconColor: '#f59e0b', // amber-500
          textColor: 'text-amber-900',
          subtitleColor: 'text-amber-700',
          gradientColors: ['#f59e0b', '#fbbf24'],
          icon: <AlertCircle size={20} color="#f59e0b" />,
        };
      case 'success':
        return {
          bgColor: 'bg-emerald-100',
          borderColor: 'border-emerald-200',
          iconColor: '#10b981', // emerald-500
          textColor: 'text-emerald-900',
          subtitleColor: 'text-emerald-700',
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
    <View className={`${config.bgColor} ${config.borderColor} border rounded-2xl p-5 mb-4 shadow-md`}>
      <View className="flex-row items-start justify-between">
        <View className="flex-1">
          <View className="flex-row items-center mb-3">
            <View className="w-8 h-8 rounded-full items-center justify-center mr-3">
              {config.icon}
            </View>
            <Text className={`${config.textColor} font-bold text-base flex-1 leading-5`}>
              {item.title}
            </Text>
          </View>
          
          <Text className={`${config.subtitleColor} text-sm mb-4 leading-5`}>
            {item.description}
          </Text>
          
          <View className="flex-row items-center">
            <Clock size={14} color={config.iconColor} />
            <Text className={`${config.subtitleColor} text-xs ml-2 font-medium`}>
              {formatTimestamp(item.timestamp)}
            </Text>
          </View>
        </View>
        
        {item.actionLabel && item.onAction && (
          <TouchableOpacity onPress={item.onAction} activeOpacity={0.8}>
            <View className="ml-4 overflow-hidden rounded-xl shadow-lg">
              <LinearGradient
                colors={config.gradientColors as any}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                className="px-4 py-3"
              >
                <Text className="text-white text-sm font-semibold">
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