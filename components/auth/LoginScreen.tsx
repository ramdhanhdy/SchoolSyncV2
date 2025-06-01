import React, { useState } from 'react';
import {
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/authStore';
import { router } from 'expo-router';
import { Button, ButtonText, ButtonSpinner } from '../ui/button';
import { Input, InputField } from '../ui/input';

interface LoginScreenProps {
  onNavigateToSignUp?: () => void;
  onNavigateToForgotPassword?: () => void;
}

export default function LoginScreen({ 
  onNavigateToSignUp, 
  onNavigateToForgotPassword 
}: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  
  const { signIn, loading, error, clearError } = useAuthStore();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Mohon isi email dan password');
      return;
    }

    const result = await signIn(email.trim().toLowerCase(), password);
    
    if (result.success) {
      // Navigation will be handled by auth state change
      router.replace('/(drawer)');
    } else {
      Alert.alert('Login Gagal', result.error || 'Terjadi kesalahan saat login');
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormValid = email.trim() && password.trim() && validateEmail(email);

  React.useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
      clearError();
    }
  }, [error, clearError]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView 
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingVertical: 40 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View className="mb-12 mt-8">
            <Text className="text-3xl font-bold text-typography-900 mb-3">
              Welcome Back
            </Text>
            <Text className="text-base text-typography-600 mb-8">
              Sign in to your account to continue
            </Text>
          </View>

          {/* Form Fields */}
          <View className="mb-8">
                {/* Email Input */}
                <View className="mb-6">
                  <Text className="text-sm font-medium text-typography-900 mb-2">
                    Email
                  </Text>
                  <Input
                    variant="outline"
                    size="md"
                    isDisabled={loading}
                    isInvalid={email ? !validateEmail(email) : undefined}
                    className="bg-background-0 border-border-300 rounded-md"
                  >
                    <InputField
                      placeholder="abc@gmail.com"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                      className="text-typography-900 text-sm"
                    />
                  </Input>
                </View>

                {/* Password Input */}
                <View className="mb-4">
                  <Text className="text-sm font-medium text-typography-900 mb-2">
                    Password
                  </Text>
                  <Input
                    variant="outline"
                    size="md"
                    isDisabled={loading}
                    className="bg-background-0 border-border-300 rounded-md"
                  >
                    <InputField
                      placeholder="Enter password"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                      autoCorrect={false}
                      className="text-typography-900 text-sm flex-1"
                    />
                    <TouchableOpacity 
                      onPress={() => setShowPassword(!showPassword)}
                      className="px-3 py-2"
                    >
                      <Text className="text-typography-500 text-xs">
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                      </Text>
                    </TouchableOpacity>
                  </Input>
                </View>

                {/* Remember Me and Forgot Password */}
                <View className="flex-row justify-between items-center mb-6">
                  <View className="flex-row items-center">
                    <TouchableOpacity 
                      onPress={() => setRememberMe(!rememberMe)}
                      className="flex-row items-center"
                    >
                      <View className={`w-4 h-4 rounded border mr-2 items-center justify-center ${
                        rememberMe ? 'bg-primary-600 border-primary-600' : 'border-border-300'
                      }`}>
                        {rememberMe && (
                          <Text className="text-white text-xs">✓</Text>
                        )}
                      </View>
                      <Text className="text-sm text-typography-900">
                        Remember me
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity onPress={onNavigateToForgotPassword}>
                    <Text className="text-sm text-primary-600">
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                </View>
          </View>

          {/* Login Button */}
          <Button
            size="lg"
            variant="solid"
            action="primary"
            isDisabled={!isFormValid || loading}
            onPress={handleLogin}
            className="mb-8 rounded-xl h-14"
          >
            {loading && <ButtonSpinner className="mr-2" />}
            <ButtonText className="font-semibold text-base">
              Sign In
            </ButtonText>
          </Button>

          {/* Divider */}
          <View className="flex-row items-center mb-8">
            <View className="flex-1 h-px bg-border-200" />
            <Text className="mx-4 text-sm text-typography-500">or continue with</Text>
            <View className="flex-1 h-px bg-border-200" />
          </View>

          {/* Social Login Buttons */}
          <View className="flex-row justify-center space-x-4 mb-12">
            <TouchableOpacity className="w-12 h-12 rounded-xl bg-background-100 items-center justify-center border border-border-200">
              <Text className="text-lg">G</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-12 h-12 rounded-xl bg-background-100 items-center justify-center border border-border-200">
              <Text className="text-lg">🍎</Text>
            </TouchableOpacity>
            <TouchableOpacity className="w-12 h-12 rounded-xl bg-background-100 items-center justify-center border border-border-200">
              <Text className="text-lg">📱</Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <View className="flex-row justify-center items-center mt-auto">
            <Text className="text-base text-typography-600 mr-2">
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={onNavigateToSignUp}>
              <Text className="text-base text-primary-600 font-semibold">
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}