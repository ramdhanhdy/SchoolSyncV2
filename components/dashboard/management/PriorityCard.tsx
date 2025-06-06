import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AlertTriangle, AlertCircle, CheckCircle, Clock } from 'lucide-react-native';
import { PriorityItem } from '../shared/types';

interface PriorityCardProps {
  item: PriorityItem;
}

export function PriorityCard({ item }: PriorityCardProps) {
  const getConfig = () => {
    switch (item.type) {
      case 'urgent':
        return {
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          iconColor: '#DC2626',
          textColor: 'text-red-800',
          subtitleColor: 'text-red-600',
          buttonColor: 'bg-red-600',
          icon: <AlertTriangle size={20} color="#DC2626" />,
        };
      case 'warning':
        return {
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          iconColor: '#D97706',
          textColor: 'text-yellow-800',
          subtitleColor: 'text-yellow-600',
          buttonColor: 'bg-yellow-600',
          icon: <AlertCircle size={20} color="#D97706" />,
        };
      case 'success':
        return {
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          iconColor: '#059669',
          textColor: 'text-green-800',
          subtitleColor: 'text-green-600',
          buttonColor: 'bg-green-600',
          icon: <CheckCircle size={20} color="#059669" />,
        };
      default:
        return {
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          iconColor: '#6B7280',
          textColor: 'text-gray-800',
          subtitleColor: 'text-gray-600',
          buttonColor: 'bg-gray-600',
          icon: <AlertCircle size={20} color="#6B7280" />,
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
    <View className={`${config.bgColor} ${config.borderColor} border rounded-xl p-4 mb-3`}>
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
          <TouchableOpacity
            onPress={item.onAction}
            className={`${config.buttonColor} px-3 py-2 rounded-lg ml-3`}
          >
            <Text className="text-white text-xs font-medium">
              {item.actionLabel}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

// Add displayName for debugging
PriorityCard.displayName = 'PriorityCard';