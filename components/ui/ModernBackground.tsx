import React from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Circle, Path } from 'react-native-svg';

interface ModernBackgroundProps {
  children: React.ReactNode;
  variant?: 'default' | 'auth' | 'minimal';
}

export default function ModernBackground({ 
  children, 
  variant = 'default' 
}: ModernBackgroundProps) {
  const renderBackgroundElements = () => {
    switch (variant) {
      case 'auth':
        return (
          <Svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: -1,
            }}
            width="100%"
            height="100%"
            viewBox="0 0 400 800"
          >
            <Defs>
              <LinearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#667eea" stopOpacity={0.1} />
                <Stop offset="50%" stopColor="#764ba2" stopOpacity={0.05} />
                <Stop offset="100%" stopColor="#f093fb" stopOpacity={0.1} />
              </LinearGradient>
              <LinearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#667eea" stopOpacity={0.15} />
                <Stop offset="100%" stopColor="#764ba2" stopOpacity={0.05} />
              </LinearGradient>
            </Defs>
            
            {/* Background gradient */}
            <Path
              d="M0,0 L400,0 L400,800 L0,800 Z"
              fill="url(#bgGradient)"
            />
            
            {/* Floating geometric elements */}
            <Circle
              cx="80"
              cy="120"
              r="40"
              fill="url(#circleGradient)"
            />
            <Circle
              cx="320"
              cy="200"
              r="25"
              fill="url(#circleGradient)"
            />
            <Circle
              cx="60"
              cy="600"
              r="30"
              fill="url(#circleGradient)"
            />
            <Circle
              cx="350"
              cy="650"
              r="35"
              fill="url(#circleGradient)"
            />
            
            {/* Abstract shapes */}
            <Path
              d="M-50,300 Q100,250 200,300 T400,320 L400,400 Q300,380 200,400 T-50,380 Z"
              fill="url(#circleGradient)"
            />
          </Svg>
        );
      
      case 'minimal':
        return (
          <View 
            className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50" 
            style={{ zIndex: -1 }}
          />
        );
      
      default:
        return (
          <View 
            className="absolute inset-0 bg-gradient-to-br from-background-0 to-background-50" 
            style={{ zIndex: -1 }}
          />
        );
    }
  };

  return (
    <View className="flex-1 relative">
      {renderBackgroundElements()}
      {children}
    </View>
  );
}