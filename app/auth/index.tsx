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
  const { user, session, profile, initialize } = useAuthStore();

  useEffect(() => {
    // Initialize auth store
    initialize();
  }, [initialize]);

  useEffect(() => {
    // Redirect based on user authentication and onboarding status
    if (user && session) {
      // Check if user has completed onboarding (has a school_id)
      if (profile?.school_id) {
        router.replace('/dashboard');
      } else {
        // User is authenticated but hasn't completed onboarding
        router.replace('/auth/onboarding');
      }
    }
  }, [user, session, profile]);

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