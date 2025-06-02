import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/authStore';
import { router } from 'expo-router';
import { Button, ButtonText } from '../ui/button';
import { Input, InputField } from '../ui/input';
import { Card } from '../ui/card';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

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
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const { signIn, loading, error, clearError } = useAuthStore();

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Entry animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Floating animation for decorative elements
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -10,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Mohon isi email dan password');
      return;
    }

    const result = await signIn(email.trim().toLowerCase(), password);

    if (result.success) {
      // Success animation before navigation
      Animated.timing(scaleAnim, {
        toValue: 0.95,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        router.replace('/(drawer)');
      });
    } else {
      // Error shake animation
      Animated.sequence([
        Animated.timing(slideAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: -10, duration: 50, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 10, duration: 50, useNativeDriver: true }),
        Animated.timing(slideAnim, { toValue: 0, duration: 50, useNativeDriver: true }),
      ]).start();
      
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
    <View className="flex-1 bg-white">
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ position: 'absolute', width, height }}
      />
      
      {/* Animated Background Elements */}
      <Animated.View
        style={{
          position: 'absolute',
          top: -100,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: 100,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          transform: [{ translateY: floatAnim }],
        }}
      />
      <Animated.View
        style={{
          position: 'absolute',
          bottom: -80,
          left: -80,
          width: 250,
          height: 250,
          borderRadius: 125,
          backgroundColor: 'rgba(255, 255, 255, 0.08)',
          transform: [{ translateY: floatAnim }],
        }}
      />

      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [
                  { translateY: slideAnim },
                  { scale: scaleAnim }
                ],
              }}
            >
              {/* Logo Section */}
              <View className="items-center mb-8">
                <View className="w-28 h-28 bg-white/20 rounded-full items-center justify-center mb-4 backdrop-blur-lg">
                  <Ionicons name="school" size={50} color="white" />
                </View>
                <Text className="text-3xl font-bold text-white mb-2">SchoolSync</Text>
                <Text className="text-white/80 text-center">
                  Sistem Manajemen Pesantren Digital
                </Text>
              </View>

              {/* Login Card */}
              <BlurView intensity={30} tint="light" className="rounded-3xl overflow-hidden">
                <View className="bg-white/10 p-8">
                  <Text className="text-2xl font-bold text-white mb-8 text-center">
                    Masuk ke Akun Anda
                  </Text>

                  {/* Email Input */}
                  <View className="mb-6">
                    <Text className="text-white/90 text-sm font-medium mb-2 ml-1">
                      Email
                    </Text>
                    <View className={`bg-white/20 rounded-2xl border ${
                      focusedField === 'email' ? 'border-white/50' : 'border-white/20'
                    }`}>
                      <View className="flex-row items-center px-4">
                        <Ionicons 
                          name="mail-outline" 
                          size={20} 
                          color="rgba(255,255,255,0.7)" 
                        />
                        <InputField
                          className="flex-1 py-4 px-3 text-white placeholder:text-white/50"
                          placeholder="nama@email.com"
                          value={email}
                          onChangeText={setEmail}
                          keyboardType="email-address"
                          autoCapitalize="none"
                          autoCorrect={false}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                        />
                      </View>
                    </View>
                    {email && !validateEmail(email) && (
                      <Text className="text-red-300 text-xs mt-2 ml-1">
                        Format email tidak valid
                      </Text>
                    )}
                  </View>

                  {/* Password Input */}
                  <View className="mb-8">
                    <Text className="text-white/90 text-sm font-medium mb-2 ml-1">
                      Password
                    </Text>
                    <View className={`bg-white/20 rounded-2xl border ${
                      focusedField === 'password' ? 'border-white/50' : 'border-white/20'
                    }`}>
                      <View className="flex-row items-center px-4">
                        <Ionicons 
                          name="lock-closed-outline" 
                          size={20} 
                          color="rgba(255,255,255,0.7)" 
                        />
                        <InputField
                          className="flex-1 py-4 px-3 text-white placeholder:text-white/50"
                          placeholder="Masukkan password"
                          value={password}
                          onChangeText={setPassword}
                          secureTextEntry={!showPassword}
                          autoCapitalize="none"
                          autoCorrect={false}
                          onFocus={() => setFocusedField('password')}
                          onBlur={() => setFocusedField(null)}
                        />
                        <TouchableOpacity
                          onPress={() => setShowPassword(!showPassword)}
                          className="p-2"
                        >
                          <Ionicons
                            name={showPassword ? "eye-off-outline" : "eye-outline"}
                            size={20}
                            color="rgba(255,255,255,0.7)"
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>

                  {/* Forgot Password Link */}
                  <TouchableOpacity
                    onPress={onNavigateToForgotPassword}
                    className="mb-8 self-end"
                  >
                    <Text className="text-white/80 text-sm">
                      Lupa Password?
                    </Text>
                  </TouchableOpacity>

                  {/* Login Button */}
                  <TouchableOpacity
                    onPress={handleLogin}
                    disabled={!isFormValid || loading}
                    className={`py-4 rounded-2xl ${
                      isFormValid && !loading 
                        ? 'bg-white' 
                        : 'bg-white/50'
                    }`}
                    activeOpacity={0.8}
                  >
                    <Text className={`text-center font-semibold text-lg ${
                      isFormValid && !loading 
                        ? 'text-purple-600' 
                        : 'text-purple-400'
                    }`}>
                      {loading ? 'Memproses...' : 'Masuk'}
                    </Text>
                  </TouchableOpacity>

                  {/* Divider */}
                  <View className="flex-row items-center my-8">
                    <View className="flex-1 h-px bg-white/20" />
                    <Text className="mx-4 text-white/60 text-sm">atau</Text>
                    <View className="flex-1 h-px bg-white/20" />
                  </View>

                  {/* Sign Up Link */}
                  <View className="flex-row justify-center items-center">
                    <Text className="text-white/80">Belum punya akun? </Text>
                    <TouchableOpacity onPress={onNavigateToSignUp}>
                      <Text className="text-white font-semibold">
                        Daftar Sekarang
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </BlurView>

              {/* Bottom decorative text */}
              <Text className="text-white/60 text-xs text-center mt-8">
                Dengan masuk, Anda menyetujui Syarat & Ketentuan kami
              </Text>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}