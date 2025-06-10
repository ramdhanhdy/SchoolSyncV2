import React from 'react';
import { View, Text } from 'react-native';
import { Cloudy, Droplets, MapPin } from 'lucide-react-native';
import { WeatherData } from './types';
import { LinearGradient } from 'expo-linear-gradient';

interface WeatherWidgetProps {
  weather: WeatherData;
}

export function WeatherWidget({ weather }: WeatherWidgetProps) {
  return (
    <View className="bg-sky-100 p-4 rounded-lg shadow-md flex-1 mb-4">
      {/* Location */}
      <View className="flex-row items-center mb-3">
        <MapPin size={16} color="#0ea5e9" /> {/* Slightly brighter blue for icon */}
        <Text className="text-sm font-semibold text-slate-700 ml-1.5">{weather.location}</Text>
      </View>

      {/* Weather Details: Temperature and Condition */}
      <View className="flex-row items-center justify-between mb-3">
        <Text className="text-3xl font-bold text-slate-800">{weather.temperature}°C</Text>
        <View className="flex-row items-center bg-white/50 px-2 py-1 rounded-full">
          <Text className="text-sm text-slate-700 mr-1.5">{weather.condition}</Text>
          {/* Conditionally render icon or use a specific one based on weather.condition */}
          {weather.condition === "Berawan" && <Cloudy size={20} color="#3b82f6" />}
          {/* Add other conditions and icons as needed, e.g., Sun, CloudRain etc. */}
        </View>
      </View>

      {/* Humidity */}
      <View className="flex-row items-center">
        <Droplets size={14} color="#0ea5e9" />
        <Text className="text-xs text-slate-700 ml-1.5">
          Kelembapan: <Text className="font-semibold text-slate-800">{weather.humidity}%</Text>
        </Text>
      </View>
    </View>
  );
}