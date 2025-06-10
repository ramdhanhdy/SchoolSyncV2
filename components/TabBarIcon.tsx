import React from 'react';
import { StyleSheet, View } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';

export const TabBarIcon = (props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
  focused?: boolean;
}) => {
  const { focused = false } = props;
  
  return (
    <View style={styles.container}>
      {focused ? (
        <LinearGradient 
          colors={['#3b82f6', '#60a5fa']} 
          style={styles.activeIndicator} 
          start={{x: 0, y: 0}} 
          end={{x: 1, y: 0}}
        />
      ) : null}
      <FontAwesome 
        size={24} 
        style={styles.tabBarIcon} 
        {...props} 
        color={focused ? '#3b82f6' : props.color} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 8,
  },
  tabBarIcon: {
    marginBottom: -3,
  },
  activeIndicator: {
    height: 3,
    width: 20,
    borderRadius: 4,
    position: 'absolute',
    top: 0,
  },
});
