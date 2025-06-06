import React from 'react';
import { View, Text } from 'react-native';
import { Cloud, Droplets, MapPin } from 'lucide-react-native';
import { WeatherData } from './types';

interface WeatherWidgetProps {
  weather: WeatherData;
}

export function WeatherWidget({ weather }: WeatherWidgetProps) {
  // Function to determine the weather icon based on condition
  const getWeatherIcon = () => {
    // This would be expanded with more conditions and appropriate icons
    // For now, just using a cloud icon as placeholder
    return <Cloud size={28} color="#1B5E20" />;
  };

  return (
    <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <View className="flex-row items-center justify-between">
        <View>
          <Text className="text-sm font-medium text-gray-500">Cuaca Saat Ini</Text>
          <View className="flex-row items-center mt-1">
            <MapPin size={12} color="#6B7280" />
            <Text className="text-xs text-gray-500 ml-1">{weather.location}</Text>
          </View>
        </View>
        {getWeatherIcon()}
      </View>
      
      <View className="mt-3">
        <Text className="text-3xl font-bold text-gray-900">
          {weather.temperature}°C
        </Text>
        <Text className="text-sm text-gray-600 mt-1">
          {weather.condition}
        </Text>
      </View>
      
      <View className="flex-row items-center mt-3">
        <Droplets size={16} color="#3B82F6" />
        <Text className="text-xs text-gray-600 ml-1">
          Kelembaban: {weather.humidity}%
        </Text>
      </View>
    </View>
  );
}