import '../global.css';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { GluestackUIProvider } from '../components/ui/gluestack-ui-provider';

export const unstable_settings = {
  // Start with auth flow instead of drawer
  initialRouteName: 'auth/index',
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GluestackUIProvider mode="system">
        <Stack>
          <Stack.Screen name="auth" options={{ headerShown: false }} />
          <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ title: 'Modal', presentation: 'modal' }} />
        </Stack>
      </GluestackUIProvider>
    </GestureHandlerRootView>
  );
}
