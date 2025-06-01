import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/authStore';
import { router } from 'expo-router';
import { Button, ButtonSpinner } from '~/components/ui/button';
import { Input, InputField } from '~/components/ui/input';
import { Card } from '~/components/ui/card';
import ModernBackground from '../ui/ModernBackground';
import { Ionicons } from '@expo/vector-icons';

interface SignUpScreenProps {
  onNavigateToLogin?: () => void;
}

export default function SignUpScreen({ onNavigateToLogin }: SignUpScreenProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  
  const { signUp, loading, error, clearError } = useAuthStore();

  const handleSignUp = async () => {
    // Validation
    if (!formData.email.trim() || !validateEmail(formData.email)) {
      Alert.alert('Error', 'Mohon isi email yang valid');
      return;
    }

    if (!formData.password || formData.password.length < 6) {
      Alert.alert('Error', 'Password minimal 6 karakter');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Konfirmasi password tidak cocok');
      return;
    }

    if (!acceptedTerms) {
      Alert.alert('Error', 'Mohon setujui syarat dan ketentuan');
      return;
    }

    const result = await signUp(
      formData.email.trim().toLowerCase(),
      formData.password,
      {
        role: 'management',
      }
    );
    
    if (result.success) {
      Alert.alert(
        'Registrasi Berhasil',
        'Silakan cek email Anda untuk verifikasi akun',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/auth/onboarding'),
          },
        ]
      );
    } else {
      Alert.alert('Registrasi Gagal', result.error || 'Terjadi kesalahan saat registrasi');
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = 
    formData.email.trim() &&
    validateEmail(formData.email) &&
    formData.password.length >= 6 &&
    formData.password === formData.confirmPassword &&
    acceptedTerms;

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
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 20 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Header */}
            <View className="mb-10 mt-6">
              <Text className="text-4xl font-bold text-typography-900 mb-4">
                Buat Akun Baru
              </Text>
              <Text className="text-lg text-typography-600 leading-7">
                Buat akun dengan email dan password. Informasi lainnya akan dilengkapi setelah pendaftaran.
              </Text>
            </View>

            {/* Main Card */}
            <Card variant="elevated" size="lg" className="p-6 bg-white shadow-lg mb-6">
              <View className="space-y-6">
                 {/* Email Input */}
                 <View>
                   <Text className="text-base font-semibold text-typography-900 mb-3">
                     Email *
                   </Text>
                   <Input variant="outline" size="lg" className="bg-background-50 border-border-300">
                     <InputField
                       placeholder="nama@email.com"
                       value={formData.email}
                       onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                       keyboardType="email-address"
                       autoCapitalize="none"
                       autoCorrect={false}
                       className="text-typography-900"
                     />
                   </Input>
                   {formData.email && !validateEmail(formData.email) && (
                     <Text className="text-sm text-error-600 mt-2">
                       Format email tidak valid
                     </Text>
                   )}
                 </View>

                 {/* Password Input */}
                 <View>
                   <Text className="text-base font-semibold text-typography-900 mb-3">
                     Password *
                   </Text>
                   <Input variant="outline" size="lg" className="bg-background-50 border-border-300">
                     <InputField
                       placeholder="Minimal 6 karakter"
                       value={formData.password}
                       onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
                       secureTextEntry
                       className="text-typography-900"
                     />
                   </Input>
                   {formData.password && !validatePassword(formData.password) && (
                     <Text className="text-sm text-error-600 mt-2">
                       Password minimal 6 karakter
                     </Text>
                   )}
                 </View>

                 {/* Confirm Password Input */}
                 <View>
                   <Text className="text-base font-semibold text-typography-900 mb-3">
                     Konfirmasi Password *
                   </Text>
                   <Input variant="outline" size="lg" className="bg-background-50 border-border-300">
                     <InputField
                       placeholder="Ulangi password"
                       value={formData.confirmPassword}
                       onChangeText={(text) => setFormData(prev => ({ ...prev, confirmPassword: text }))}
                       secureTextEntry
                       className="text-typography-900"
                     />
                   </Input>
                   {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                     <Text className="text-sm text-error-600 mt-2">
                       Password tidak cocok
                     </Text>
                   )}
                 </View>

                 {/* Terms and Conditions */}
                 <View className="flex-row items-start space-x-3 mt-2">
                   <TouchableOpacity
                     onPress={() => setAcceptedTerms(!acceptedTerms)}
                     className="mt-1"
                   >
                     <View className={`w-5 h-5 border-2 rounded ${acceptedTerms ? 'bg-primary-500 border-primary-500' : 'border-border-400'} items-center justify-center`}>
                       {acceptedTerms && (
                         <Ionicons name="checkmark" size={12} color="white" />
                       )}
                     </View>
                   </TouchableOpacity>
                   <Text className="text-sm text-typography-600 flex-1 leading-6">
                     Saya menyetujui{' '}
                     <Text className="text-primary-600 font-semibold">
                       Syarat dan Ketentuan
                     </Text>
                     {' '}serta{' '}
                     <Text className="text-primary-600 font-semibold">
                       Kebijakan Privasi
                     </Text>
                     {' '}SchoolSync
                   </Text>
                 </View>

                 {/* Sign Up Button */}
                 <Button
                   size="lg"
                   className="bg-primary-500 mt-8 py-4"
                   onPress={handleSignUp}
                   disabled={!isFormValid || loading}
                 >
                   <Text className="text-white font-semibold text-lg">
                     {loading ? 'Mendaftar...' : 'Daftar Sekarang'}
                   </Text>
                 </Button>

                 {/* Login Link */}
                 <View className="items-center mt-8">
                   <Text className="text-typography-600 text-base">
                     Sudah punya akun?{' '}
                     <Text
                       className="text-primary-600 font-semibold"
                       onPress={onNavigateToLogin}
                     >
                       Masuk di sini
                     </Text>
                   </Text>
                 </View>
              </View>
            </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </ModernBackground>
  );
}