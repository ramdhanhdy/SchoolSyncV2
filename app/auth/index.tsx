import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { router } from 'expo-router';
import { useAuthStore } from '../../store/authStore';
import LoginScreen from '../../components/auth/LoginScreen';
import SignUpScreen from '../../components/auth/SignUpScreen';
import ForgotPasswordScreen from '../../components/auth/ForgotPasswordScreen';

type AuthScreen = 'login' | 'signup' | 'forgot-password';

export default function AuthIndex() {
  const [currentScreen, setCurrentScreen] = useState<AuthScreen>('login');
  const { user, session, profile, school, loading, initialize } = useAuthStore();

  useEffect(() => {
    // Initialize auth store
    initialize();
  }, [initialize]);

  useEffect(() => {
        // Only proceed if auth initialization is complete
    if (loading) {
            return; 
    }

    if (user && session) {
      if (profile?.full_name && profile?.school_id && school?.id) {
        // User is authenticated, profile is loaded with name and school_id, and school data is loaded
                router.replace('/dashboard');
      } else if (profile?.full_name && !profile?.school_id) {
        // User is authenticated, profile loaded, but no school_id (implies onboarding needed)
        // This also covers cases where school_id might exist but school object itself hasn't loaded yet, though 'loading' should ideally prevent this.
                router.replace('/auth/onboarding');
      } else if (!profile && user && session) {
        // User authenticated, but profile hasn't loaded (or failed).
                router.replace('/auth/onboarding');
      } else {
        // User not fully authenticated or profile/school is missing critical info for dashboard.
        // Stays on the current auth screen (login/signup) if no other condition met.
              }
    } else {
      // No user or session, stay on auth screen (login/signup)
          }
  }, [user, session, profile, school, loading, router, initialize]);

  const handleNavigateToSignUp = () => {
    setCurrentScreen('signup');
  };

  const handleNavigateToLogin = () => {
    setCurrentScreen('login');
  };

  const handleNavigateToForgotPassword = () => {
    setCurrentScreen('forgot-password');
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <LoginScreen
            onNavigateToSignUp={handleNavigateToSignUp}
            onNavigateToForgotPassword={handleNavigateToForgotPassword}
          />
        );
      case 'signup':
        return (
          <SignUpScreen
            onNavigateToLogin={handleNavigateToLogin}
          />
        );
      case 'forgot-password':
        return (
          <ForgotPasswordScreen
            onNavigateToLogin={handleNavigateToLogin}
          />
        );
      default:
        return (
          <LoginScreen
            onNavigateToSignUp={handleNavigateToSignUp}
            onNavigateToForgotPassword={handleNavigateToForgotPassword}
          />
        );
    }
  };

  return (
    <View className="flex-1">
      {renderCurrentScreen()}
    </View>
  );
}