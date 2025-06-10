import React from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Plus } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ActionButton } from '../../common/ActionButton';

interface FloatingActionButtonProps {
  onPress: () => void;
}

export function FloatingActionButton({ onPress }: FloatingActionButtonProps) {
  const animation = React.useRef(new Animated.Value(1)).current;
  
  const handlePressIn = () => {
    Animated.spring(animation, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };
  
  const handlePressOut = () => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  
  const animatedStyle = {
    transform: [
      { scale: animation }
    ]
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.buttonContainer, animatedStyle]}>
        <TouchableOpacity
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={0.8}
          style={styles.touchable}
        >
          <LinearGradient
            colors={['#3b82f6', '#60a5fa']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.gradient}
          >
            <Plus size={28} color="#ffffff" strokeWidth={2.5} />
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    zIndex: 10,
  },
  buttonContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    shadowColor: '#1e293b',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
    overflow: 'hidden',
  },
  touchable: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  }
});
