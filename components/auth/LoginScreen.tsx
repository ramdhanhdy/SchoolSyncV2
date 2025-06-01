import React, { useState } from 'react';
import {
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/authStore';
import { router } from 'expo-router';
import { Button, ButtonText, ButtonSpinner } from '../ui/button';
import { Input, InputField } from '../ui/input';
import { Card } from '../ui/card';
import ModernBackground from '../ui/ModernBackground';

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
    <ModernBackground variant="auth">
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <ScrollView 
            contentContainerStyle={{ flexGrow: 1, padding: 20 }}
            keyboardShouldPersistTaps="handled"
          >
            {/* Header */}
            <View className="mb-10 mt-6">
              <Text className="text-4xl font-bold text-typography-900 mb-4">
                Selamat Datang
              </Text>
              <Text className="text-lg text-typography-600 leading-7">
                Masuk ke akun SchoolSync Anda untuk mengelola pesantren
              </Text>
            </View>

            {/* Form Card */}
            <Card variant="elevated" size="lg" className="p-6 bg-white shadow-lg">
              {/* Email Input */}
              <View className="mb-6">
                <Text className="text-base font-semibold text-typography-900 mb-3">
                  Email
                </Text>
              <Input
                  variant="outline"
                  size="lg"
                  isDisabled={loading}
                  isInvalid={email ? !validateEmail(email) : undefined}
                  className="bg-background-50 border-border-300"
                >
                  <InputField
                    placeholder="Masukkan email Anda"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    className="text-typography-900"
                  />
                </Input>
                {email && !validateEmail(email) && (
                  <Text className="text-sm text-error-600 mt-2">
                    Format email tidak valid
                  </Text>
                )}
              </View>

              {/* Password Input */}
              <View className="mb-6">
                <Text className="text-base font-semibold text-typography-900 mb-3">
                  Password
                </Text>
                <Input
                  variant="outline"
                  size="lg"
                  isDisabled={loading}
                  className="bg-background-50 border-border-300"
                >
                 <InputField
                   placeholder="Masukkan password Anda"
                   value={password}
                   onChangeText={setPassword}
                   secureTextEntry={true}
                   autoCapitalize="none"
                   autoCorrect={false}
                   className="text-typography-900"
                 />
               </Input>
             </View>

             {/* Forgot Password Link */}
             <View className="mb-8">
               <Button
                 variant="link"
                 size="sm"
                 onPress={onNavigateToForgotPassword}
                 isDisabled={loading}
                 className="self-end"
               >
                 <ButtonText className="text-primary-600 text-sm">
                   Lupa Password?
                 </ButtonText>
               </Button>
             </View>

             {/* Login Button */}
             <Button
               size="xl"
               variant="solid"
               action="primary"
               isDisabled={!isFormValid || loading}
               onPress={handleLogin}
               className="mb-8"
             >
               {loading && <ButtonSpinner className="mr-2" />}
               <ButtonText className="font-semibold">Masuk</ButtonText>
             </Button>

             {/* Divider */}
             <View className="flex-row items-center mb-8">
               <View className="flex-1 h-px bg-border-300" />
               <Text className="mx-4 text-sm text-typography-500">atau</Text>
               <View className="flex-1 h-px bg-border-300" />
             </View>

             {/* Sign Up Link */}
             <View className="flex-row justify-center items-center">
               <Text className="text-base text-typography-600">Belum punya akun? </Text>
               <Button
                 variant="link"
                 size="sm"
                 onPress={onNavigateToSignUp}
                 isDisabled={loading}
                 className="p-0"
               >
                 <ButtonText className="text-primary-600 font-semibold text-base">
                   Daftar di sini
                 </ButtonText>
               </Button>
             </View>
             </Card>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ModernBackground>
  );
}