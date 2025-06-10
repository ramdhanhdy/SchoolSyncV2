import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet,
  View,
  TouchableOpacityProps,
  ActivityIndicator
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

export type ActionButtonVariant = 'primary' | 'secondary' | 'outline' | 'glass';
export type ActionButtonSize = 'sm' | 'md' | 'lg' | 'fab';

interface ActionButtonProps extends TouchableOpacityProps {
  label?: string;
  variant?: ActionButtonVariant;
  size?: ActionButtonSize;
  icon?: React.ReactNode;
  isLoading?: boolean;
  fullWidth?: boolean;
}

export function ActionButton({
  label,
  variant = 'primary',
  size = 'md',
  icon,
  isLoading = false,
  fullWidth = false,
  style,
  ...props
}: ActionButtonProps) {
  
  const getGradientColors = () => {
    switch (variant) {
      case 'primary':
        return ['#3b82f6', '#60a5fa'];
      case 'secondary':
        return ['#64748b', '#94a3b8'];
      case 'outline':
      case 'glass':
        return ['transparent', 'transparent'];
      default:
        return ['#3b82f6', '#60a5fa'];
    }
  };
  
  const renderButton = () => {
    // For glass morphism effect
    if (variant === 'glass') {
      return (
        <View style={[
          styles.container,
          styles[`container_${size}`],
          fullWidth && styles.fullWidth,
          style
        ]}>
          <BlurView 
            intensity={50} 
            tint="light"
            style={[styles.blurContainer, styles[`container_${size}`]]}
          >
            <View style={styles.contentContainer}>
              {isLoading ? (
                <ActivityIndicator color="#ffffff" size="small" />
              ) : (
                <>
                  {icon && <View style={styles.iconContainer}>{icon}</View>}
                  {label && (
                    <Text style={[
                      styles.label, 
                      styles[`label_${size}`],
                      { color: '#3b82f6' }
                    ]}>
                      {label}
                    </Text>
                  )}
                </>
              )}
            </View>
          </BlurView>
        </View>
      );
    }
    
    // For outline variant
    if (variant === 'outline') {
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          disabled={isLoading}
          style={[
            styles.container,
            styles[`container_${size}`],
            { borderColor: '#3b82f6', borderWidth: 1.5 },
            fullWidth && styles.fullWidth,
            style
          ]}
          {...props}
        >
          <View style={styles.contentContainer}>
            {isLoading ? (
              <ActivityIndicator color="#3b82f6" size="small" />
            ) : (
              <>
                {icon && <View style={styles.iconContainer}>{icon}</View>}
                {label && (
                  <Text style={[
                    styles.label, 
                    styles[`label_${size}`],
                    { color: '#3b82f6' }
                  ]}>
                    {label}
                  </Text>
                )}
              </>
            )}
          </View>
        </TouchableOpacity>
      );
    }
    
    // For primary and secondary variants with gradient
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={isLoading}
        style={[
          styles.container,
          styles[`container_${size}`],
          fullWidth && styles.fullWidth,
          style
        ]}
        {...props}
      >
        <LinearGradient
          colors={getGradientColors() as any}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={[styles.gradient, styles[`container_${size}`]]}
        >
          <View style={styles.contentContainer}>
            {isLoading ? (
              <ActivityIndicator color="#ffffff" size="small" />
            ) : (
              <>
                {icon && <View style={styles.iconContainer}>{icon}</View>}
                {label && (
                  <Text style={[
                    styles.label, 
                    styles[`label_${size}`],
                  ]}>
                    {label}
                  </Text>
                )}
              </>
            )}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return renderButton();
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#1e293b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  container_sm: {
    height: 36,
    paddingHorizontal: 12,
  },
  container_md: {
    height: 44,
    paddingHorizontal: 16,
  },
  container_lg: {
    height: 54,
    paddingHorizontal: 20,
  },
  container_fab: {
    height: 60,
    width: 60,
    borderRadius: 30,
    paddingHorizontal: 0,
  },
  fullWidth: {
    width: '100%',
  },
  gradient: {
    flex: 1,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  iconContainer: {
    marginRight: 8,
  },
  label: {
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
  },
  label_sm: {
    fontSize: 13,
  },
  label_md: {
    fontSize: 15,
  },
  label_lg: {
    fontSize: 17,
  },
  label_fab: {
    fontSize: 15,
  },
  blurContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    overflow: 'hidden',
  },
});
