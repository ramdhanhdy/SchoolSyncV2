import React from 'react';
import { View, Text } from 'react-native';
import { Cloud, Droplets, MapPin } from 'lucide-react-native';
import { WeatherData } from './types';
import { LinearGradient } from 'expo-linear-gradient';

interface WeatherWidgetProps {
  weather: WeatherData;
}

export function WeatherWidget({ weather }: WeatherWidgetProps) {
  // Function to determine the weather icon based on condition
  const getWeatherIcon = () => {
    // This would be expanded with more conditions and appropriate icons
    // For now, just using a cloud icon as placeholder
    return <Cloud size={28} color="#3b82f6" />;
  };

  return (
    <View className="flex-1 mb-4">
      {/* Top gradient border */}
      <LinearGradient
        colors={['#3b82f6', '#60a5fa']} 
        className="h-1 rounded-t-2xl"
      />
      <View className="bg-white rounded-b-2xl p-4 shadow-md border-x border-b border-slate-100">
        <View className="flex-row items-center justify-between">
          <View>
            <Text className="text-sm font-medium text-slate-700">Cuaca Saat Ini</Text>
            <View className="flex-row items-center mt-1">
              <MapPin size={12} color="#64748b" />
              <Text className="text-xs text-slate-500 ml-1">{weather.location}</Text>
            </View>
          </View>
          {getWeatherIcon()}
        </View>
        
        <View className="mt-3">
          {/* Temperature with gradient text */}
          <LinearGradient
            colors={['#3b82f6', '#60a5fa']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            className="self-start rounded-md px-1"
          >
            <Text className="text-3xl font-bold text-white">
              {weather.temperature}°C
            </Text>
          </LinearGradient>
          <Text className="text-sm text-slate-600 mt-1">
            {weather.condition}
          </Text>
        </View>
        
        <View className="flex-row items-center mt-3 bg-blue-50 rounded-lg p-2">
          <Droplets size={16} color="#3b82f6" />
          <Text className="text-xs text-slate-700 ml-1">
            Kelembaban: <Text className="font-semibold text-blue-600">{weather.humidity}%</Text>
          </Text>
        </View>
      </View>
    </View>
  );
}