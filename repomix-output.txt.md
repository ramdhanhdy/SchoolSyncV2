This file is a merged representation of a subset of the codebase, containing files not matching ignore patterns, combined into a single document by Repomix.
The content has been processed where comments have been removed.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching these patterns are excluded: migrations/**, .next/**, .repomix/**, *.env, *.env.local, .eslintrc.json, .gitignore, node_modules/**, *.pdf, /.venv, /.repomix, /__pycache__, /.vscode, *.csv, *.log., unused/, *.md, *.txt, /.venv/, .venv/**, package-lock.json, *.db, prd.md, tsconfig.tsbuildinfo, *.md, *.nprmc, .gitignore, .trae, .repomix
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Code comments have been removed from supported file types
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
.expo/devices.json
.expo/README.md
.expo/types/router.d.ts
.npmrc
android/.gitignore
android/app/build.gradle
android/app/proguard-rules.pro
android/app/src/debug/AndroidManifest.xml
android/app/src/main/AndroidManifest.xml
android/app/src/main/java/com/schoolsyncv2/app/MainActivity.kt
android/app/src/main/java/com/schoolsyncv2/app/MainApplication.kt
android/app/src/main/res/drawable/ic_launcher_background.xml
android/app/src/main/res/drawable/rn_edit_text_material.xml
android/app/src/main/res/mipmap-anydpi-v26/ic_launcher_round.xml
android/app/src/main/res/mipmap-anydpi-v26/ic_launcher.xml
android/app/src/main/res/values-night/colors.xml
android/app/src/main/res/values/colors.xml
android/app/src/main/res/values/strings.xml
android/app/src/main/res/values/styles.xml
android/build.gradle
android/gradle.properties
android/gradle/wrapper/gradle-wrapper.properties
android/gradlew
android/gradlew.bat
android/settings.gradle
app-env.d.ts
app.json
app/_layout.tsx
app/(drawer)/_layout.tsx
app/(drawer)/(tabs)/_layout.tsx
app/(drawer)/(tabs)/index.tsx
app/(drawer)/(tabs)/two.tsx
app/(drawer)/index.tsx
app/+html.tsx
app/+not-found.tsx
app/auth/_layout.tsx
app/auth/index.tsx
app/auth/onboarding/index.tsx
app/index.tsx
app/modal.tsx
babel.config.js
cesconfig.json
components/auth/ForgotPasswordScreen.tsx
components/auth/LoginScreen.tsx
components/auth/SignUpScreen.tsx
components/Button.tsx
components/Container.tsx
components/EditScreenInfo.tsx
components/HeaderButton.tsx
components/onboarding/BasicInfoStep.tsx
components/onboarding/PlanSelectionStep.tsx
components/onboarding/SchoolInfoStep.tsx
components/onboarding/TeacherInviteStep.tsx
components/onboarding/WelcomeStep.tsx
components/ScreenContent.tsx
components/TabBarIcon.tsx
components/ui/button/index.tsx
components/ui/card/index.tsx
components/ui/card/index.web.tsx
components/ui/card/styles.tsx
components/ui/gluestack-ui-provider/config.ts
components/ui/gluestack-ui-provider/index.tsx
components/ui/gluestack-ui-provider/index.web.tsx
components/ui/gluestack-ui-provider/script.ts
components/ui/input/index.tsx
components/ui/ModernBackground.tsx
database/schema.sql
docs/prd_management_role
eslint.config.js
expo-env.d.ts
global.css
gluestack-ui.config.json
metro.config.js
nativewind-env.d.ts
package.json
prettier.config.js
store/authStore.ts
store/store.ts
tailwind.config.js
tsconfig.json
utils/supabase.ts
```

# Files




## File: app/auth/_layout.tsx
````typescript
import React from 'react';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="onboarding/index" />
    </Stack>
  );
}
````

## File: app/auth/index.tsx
````typescript
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
  const { user, session, initialize } = useAuthStore();

  useEffect(() => {

    initialize();
  }, [initialize]);

  useEffect(() => {

    if (user && session) {

      if (user.school_id) {
        router.replace('/(drawer)');
      } else {

        router.replace('/auth/onboarding');
      }
    }
  }, [user, session]);

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
````

## File: app/auth/onboarding/index.tsx
````typescript
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  BackHandler,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useAuthStore } from '../../../store/authStore';
import BasicInfoStep from '../../../components/onboarding/BasicInfoStep';
import SchoolInfoStep from '../../../components/onboarding/SchoolInfoStep';
import PlanSelectionStep from '../../../components/onboarding/PlanSelectionStep';
import TeacherInviteStep from '../../../components/onboarding/TeacherInviteStep';
import WelcomeStep from '../../../components/onboarding/WelcomeStep';

export interface OnboardingData {

  fullName: string;
  phone: string;
  position: string;


  schoolName: string;
  schoolType: string;
  address: string;
  city: string;
  province: string;
  studentCount: number;


  selectedPlan: 'starter' | 'professional' | 'enterprise';


  teacherInvites: Array<{
    name: string;
    email: string;
    subject?: string;
  }>;
}

const TOTAL_STEPS = 5;

export default function OnboardingIndex() {
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    fullName: '',
    phone: '',
    position: '',
    schoolName: '',
    schoolType: '',
    address: '',
    city: '',
    province: '',
    studentCount: 50,
    selectedPlan: 'starter',
    teacherInvites: [],
  });

  const { user, profile, updateProfile, createSchool, loading } = useAuthStore();

  useEffect(() => {

    if (!user) {
      router.replace('/auth');
      return;
    }


    if (profile) {
      setOnboardingData(prev => ({
        ...prev,
        fullName: profile.full_name || '',
        phone: profile.phone || '',
      }));
    }
  }, [user, profile]);

  useEffect(() => {
    // Handle Android back button
    const backAction = () => {
      if (currentStep > 1) {
        handlePrevious();
        return true;
      } else {
        Alert.alert(
          'Keluar dari Onboarding',
          'Apakah Anda yakin ingin keluar? Progress akan hilang.',
          [
            { text: 'Batal', style: 'cancel' },
            { text: 'Keluar', onPress: () => router.replace('/auth') },
          ]
        );
        return true;
      }
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [currentStep]);

  const updateOnboardingData = (updates: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = async () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
    } else {

      await completeOnboarding();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const completeOnboarding = async () => {
    try {

      await updateProfile({
        full_name: onboardingData.fullName,
        phone: onboardingData.phone,
      });


      const schoolResult = await createSchool({
        name: onboardingData.schoolName,
        type: onboardingData.schoolType,
        address: onboardingData.address,
        city: onboardingData.city,
        province: onboardingData.province,
        student_count_estimate: onboardingData.studentCount,
      });

      if (schoolResult.success) {



        Alert.alert(
          'Selamat!',
          'Akun SchoolSync Anda telah berhasil dibuat. Selamat datang!',
          [
            {
              text: 'Mulai Menggunakan',
              onPress: () => router.replace('/(drawer)'),
            },
          ]
        );
      } else {
        Alert.alert('Error', schoolResult.error || 'Gagal membuat sekolah');
      }
    } catch (error) {
      console.error('Onboarding completion error:', error);
      Alert.alert('Error', 'Terjadi kesalahan saat menyelesaikan onboarding');
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicInfoStep
            data={onboardingData}
            onUpdate={updateOnboardingData}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <SchoolInfoStep
            data={onboardingData}
            onUpdate={updateOnboardingData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 3:
        return (
          <PlanSelectionStep
            data={onboardingData}
            onUpdate={updateOnboardingData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 4:
        return (
          <TeacherInviteStep
            data={onboardingData}
            onUpdate={updateOnboardingData}
            onNext={handleNext}
            onPrevious={handlePrevious}
          />
        );
      case 5:
        return (
          <WelcomeStep
            data={onboardingData}
            onComplete={completeOnboarding}
            onPrevious={handlePrevious}
            loading={loading}
          />
        );
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Informasi Dasar';
      case 2: return 'Informasi Sekolah';
      case 3: return 'Pilih Paket';
      case 4: return 'Undang Guru';
      case 5: return 'Selamat Datang';
      default: return '';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Progress Header */}
      <View style={styles.header}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${(currentStep / TOTAL_STEPS) * 100}%` }
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {currentStep} dari {TOTAL_STEPS}
          </Text>
        </View>

        <Text style={styles.stepTitle}>{getStepTitle()}</Text>

        {currentStep > 1 && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={handlePrevious}
          >
            <Text style={styles.backButtonText}>← Kembali</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Step Content */}
      <View style={styles.content}>
        {renderStep()}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 8,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
});
````

## File: app/index.tsx
````typescript
import { Redirect } from 'expo-router';


export default function Index() {
  return <Redirect href="/auth" />;
}
````

## File: components/auth/ForgotPasswordScreen.tsx
````typescript
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/authStore';

interface ForgotPasswordScreenProps {
  onNavigateToLogin?: () => void;
}

export default function ForgotPasswordScreen({ onNavigateToLogin }: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  const { resetPassword, loading, error, clearError } = useAuthStore();

  const handleResetPassword = async () => {
    if (!email.trim() || !validateEmail(email)) {
      Alert.alert('Error', 'Mohon isi email yang valid');
      return;
    }

    const result = await resetPassword(email.trim().toLowerCase());

    if (result.success) {
      setIsEmailSent(true);
      Alert.alert(
        'Email Terkirim',
        'Kami telah mengirimkan link reset password ke email Anda. Silakan cek inbox dan folder spam.',
        [
          {
            text: 'OK',
            onPress: () => {},
          },
        ]
      );
    } else {
      Alert.alert('Gagal', result.error || 'Terjadi kesalahan saat mengirim email reset password');
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFormValid = email.trim() && validateEmail(email);

  React.useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
      clearError();
    }
  }, [error, clearError]);

  if (isEmailSent) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.successContainer}>
          <View style={styles.successIcon}>
            <Text style={styles.successIconText}>📧</Text>
          </View>

          <Text style={styles.successTitle}>Email Terkirim!</Text>

          <Text style={styles.successMessage}>
            Kami telah mengirimkan link reset password ke:
          </Text>

          <Text style={styles.emailText}>{email}</Text>

          <Text style={styles.instructionText}>
            Silakan cek inbox email Anda dan ikuti instruksi untuk mereset password.
            Jika tidak menemukan email, cek juga folder spam.
          </Text>

          <View style={styles.actionButtons}>
            <TouchableOpacity
              style={styles.resendButton}
              onPress={() => {
                setIsEmailSent(false);
                handleResetPassword();
              }}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#3b82f6" size="small" />
              ) : (
                <Text style={styles.resendButtonText}>Kirim Ulang</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backButton}
              onPress={onNavigateToLogin}
            >
              <Text style={styles.backButtonText}>Kembali ke Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {}
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>🔒</Text>
            </View>

            <Text style={styles.title}>Lupa Password?</Text>
            <Text style={styles.subtitle}>
              Masukkan email Anda dan kami akan mengirimkan link untuk mereset password
            </Text>
          </View>

          {}
          <View style={styles.form}>
            {}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[
                  styles.input,
                  email && !validateEmail(email) && styles.inputError
                ]}
                placeholder="Masukkan email Anda"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!loading}
                autoFocus
              />
              {email && !validateEmail(email) && (
                <Text style={styles.errorText}>Format email tidak valid</Text>
              )}
            </View>

            {}
            <TouchableOpacity
              style={[
                styles.resetButton,
                (!isFormValid || loading) && styles.resetButtonDisabled
              ]}
              onPress={handleResetPassword}
              disabled={!isFormValid || loading}
            >
              {loading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={styles.resetButtonText}>Kirim Link Reset</Text>
              )}
            </TouchableOpacity>

            {}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={onNavigateToLogin}
              disabled={loading}
            >
              <Text style={styles.loginButtonText}>← Kembali ke Login</Text>
            </TouchableOpacity>
          </View>

          {}
          <View style={styles.infoContainer}>
            <Text style={styles.infoTitle}>Tidak menerima email?</Text>
            <Text style={styles.infoText}>
              • Cek folder spam atau junk mail{"\n"}
              • Pastikan email yang dimasukkan benar{"\n"}
              • Tunggu beberapa menit, email mungkin tertunda
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  iconText: {
    fontSize: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
  },
  form: {
    flex: 1,
  },
  inputContainer: {
    marginBottom: 32,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: 'white',
    color: '#1f2937',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    marginTop: 4,
  },
  resetButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#3b82f6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  resetButtonDisabled: {
    backgroundColor: '#9ca3af',
    shadowOpacity: 0,
    elevation: 0,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  loginButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  loginButtonText: {
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: '500',
  },
  infoContainer: {
    marginTop: 40,
    padding: 20,
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },

  successContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#dcfce7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
  },
  successIconText: {
    fontSize: 40,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 8,
  },
  emailText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3b82f6',
    textAlign: 'center',
    marginBottom: 24,
  },
  instructionText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 40,
  },
  actionButtons: {
    width: '100%',
    gap: 16,
  },
  resendButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  resendButtonText: {
    color: '#3b82f6',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
````

## File: components/auth/LoginScreen.tsx
````typescript
import React, { useState } from 'react';
import {
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/authStore';
import { router } from 'expo-router';
import { Button, ButtonText, ButtonSpinner } from '../ui/button';
import { Input, InputField } from '../ui/input';
import { Card } from '../ui/card';
import { Text } from 'react-native';
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
  const [showPassword, setShowPassword] = useState(false);

  const { signIn, loading, error, clearError } = useAuthStore();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Mohon isi email dan password');
      return;
    }

    const result = await signIn(email.trim().toLowerCase(), password);

    if (result.success) {

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
            {}
            <View className="mb-10 mt-6">
              <Text className="text-4xl font-bold text-typography-900 mb-4">
                Selamat Datang
              </Text>
              <Text className="text-lg text-typography-600 leading-7">
                Masuk ke akun SchoolSync Anda untuk mengelola pesantren
              </Text>
            </View>

            {}
            <Card variant="elevated" size="lg" className="p-6 bg-white shadow-lg">
              {}
              <View className="mb-6">
                <Text className="text-base font-semibold text-typography-900 mb-3">
                  Email
                </Text>
              <Input
                  variant="outline"
                  size="lg"
                  isDisabled={loading}
                  isInvalid={email && !validateEmail(email)}
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

              {}
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
                   secureTextEntry={!showPassword}
                   autoCapitalize="none"
                   autoCorrect={false}
                   className="text-typography-900"
                 />
               </Input>
             </View>

             {}
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

             {}
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

             {}
             <View className="flex-row items-center mb-8">
               <View className="flex-1 h-px bg-border-300" />
               <Text className="mx-4 text-sm text-typography-500">atau</Text>
               <View className="flex-1 h-px bg-border-300" />
             </View>

             {}
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
````

## File: components/auth/SignUpScreen.tsx
````typescript
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
import { Button, ButtonText, ButtonSpinner } from '~/components/ui/button';
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
            {}
            <View className="mb-10 mt-6">
              <Text className="text-4xl font-bold text-typography-900 mb-4">
                Buat Akun Baru
              </Text>
              <Text className="text-lg text-typography-600 leading-7">
                Buat akun dengan email dan password. Informasi lainnya akan dilengkapi setelah pendaftaran.
              </Text>
            </View>

            {}
            <Card variant="elevated" size="lg" className="p-6 bg-white shadow-lg mb-6">
              <View className="space-y-6">
                 {}
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

                 {}
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

                 {}
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

                 {}
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

                 {}
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

                 {}
                 <View className="items-center mt-8">
                   <Text className="text-typography-600 text-base">
                     Sudah punya akun?{' '}
                     <Text
                       className="text-primary-600 font-semibold"
                       onPress={() => router.push('/auth/login')}
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
````

## File: components/onboarding/BasicInfoStep.tsx
````typescript
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { OnboardingData } from '../../app/auth/onboarding';

interface BasicInfoStepProps {
  data: OnboardingData;
  onUpdate: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
}

const POSITION_OPTIONS = [
  'Kepala Sekolah',
  'Wakil Kepala Sekolah',
  'Kepala Tata Usaha',
  'Wakil Kepala Bidang',
  'Pengurus Yayasan',
  'Lainnya',
];

export default function BasicInfoStep({ data, onUpdate, onNext }: BasicInfoStepProps) {
  const [showPositionDropdown, setShowPositionDropdown] = useState(false);
  const [customPosition, setCustomPosition] = useState('');

  const validatePhone = (phone: string) => {
    // Indonesian phone number validation
    const phoneRegex = /^(\+62|62|0)[0-9]{9,13}$/;
    return phoneRegex.test(phone.replace(/[\s-]/g, ''));
  };

  const handleNext = () => {
    // Validation
    if (!data.fullName.trim()) {
      Alert.alert('Error', 'Mohon isi nama lengkap');
      return;
    }

    if (!data.phone.trim() || !validatePhone(data.phone)) {
      Alert.alert('Error', 'Mohon isi nomor telepon yang valid');
      return;
    }

    if (!data.position.trim()) {
      Alert.alert('Error', 'Mohon pilih posisi/jabatan');
      return;
    }

    onNext();
  };

  const handlePositionSelect = (position: string) => {
    if (position === 'Lainnya') {
      setShowPositionDropdown(false);

    } else {
      onUpdate({ position });
      setShowPositionDropdown(false);
      setCustomPosition('');
    }
  };

  const handleCustomPositionSubmit = () => {
    if (customPosition.trim()) {
      onUpdate({ position: customPosition.trim() });
      setCustomPosition('');
    }
  };

  const isFormValid =
    data.fullName.trim() &&
    data.phone.trim() &&
    validatePhone(data.phone) &&
    data.position.trim();

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Informasi Dasar</Text>
          <Text style={styles.subtitle}>
            Kami perlu mengetahui beberapa informasi dasar tentang Anda
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Full Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nama Lengkap *</Text>
            <TextInput
              style={styles.input}
              placeholder="Masukkan nama lengkap Anda"
              value={data.fullName}
              onChangeText={(value) => onUpdate({ fullName: value })}
              autoCapitalize="words"
              autoCorrect={false}
            />
          </View>

          {/* Phone */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nomor Telepon *</Text>
            <TextInput
              style={[
                styles.input,
                data.phone && !validatePhone(data.phone) && styles.inputError
              ]}
              placeholder="Contoh: 08123456789"
              value={data.phone}
              onChangeText={(value) => onUpdate({ phone: value })}
              keyboardType="phone-pad"
              autoCorrect={false}
            />
            {data.phone && !validatePhone(data.phone) && (
              <Text style={styles.errorText}>Format nomor telepon tidak valid</Text>
            )}
          </View>

          {/* Position */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Posisi/Jabatan *</Text>

            {/* Position Selector */}
            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setShowPositionDropdown(!showPositionDropdown)}
            >
              <Text style={[
                styles.dropdownButtonText,
                !data.position && styles.placeholderText
              ]}>
                {data.position || 'Pilih posisi/jabatan Anda'}
              </Text>
              <Text style={styles.dropdownArrow}>
                {showPositionDropdown ? '▲' : '▼'}
              </Text>
            </TouchableOpacity>

            {}
            {showPositionDropdown && (
              <View style={styles.dropdown}>
                {POSITION_OPTIONS.map((position, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dropdownOption,
                      data.position === position && styles.dropdownOptionSelected
                    ]}
                    onPress={() => handlePositionSelect(position)}
                  >
                    <Text style={[
                      styles.dropdownOptionText,
                      data.position === position && styles.dropdownOptionTextSelected
                    ]}>
                      {position}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {}
            {data.position === 'Lainnya' || (!POSITION_OPTIONS.includes(data.position) && data.position) ? (
              <View style={styles.customPositionContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Masukkan posisi/jabatan Anda"
                  value={data.position === 'Lainnya' ? customPosition : data.position}
                  onChangeText={(value) => {
                    if (data.position === 'Lainnya') {
                      setCustomPosition(value);
                    } else {
                      onUpdate({ position: value });
                    }
                  }}
                  onSubmitEditing={handleCustomPositionSubmit}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
                {data.position === 'Lainnya' && (
                  <TouchableOpacity
                    style={styles.submitCustomButton}
                    onPress={handleCustomPositionSubmit}
                  >
                    <Text style={styles.submitCustomButtonText}>✓</Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : null}
          </View>

          {}
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>💡 Mengapa kami memerlukan informasi ini?</Text>
            <Text style={styles.infoText}>
              Informasi ini membantu kami menyesuaikan pengalaman SchoolSync dengan kebutuhan dan peran Anda di pesantren.
            </Text>
          </View>
        </View>

        {}
        <TouchableOpacity
          style={[
            styles.nextButton,
            !isFormValid && styles.nextButtonDisabled
          ]}
          onPress={handleNext}
          disabled={!isFormValid}
        >
          <Text style={styles.nextButtonText}>Lanjutkan</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 24,
  },
  form: {
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: 'white',
    color: '#1f2937',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    marginTop: 4,
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#1f2937',
    flex: 1,
  },
  placeholderText: {
    color: '#9ca3af',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#6b7280',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    backgroundColor: 'white',
    marginTop: 4,
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  dropdownOptionSelected: {
    backgroundColor: '#dbeafe',
  },
  dropdownOptionText: {
    fontSize: 16,
    color: '#1f2937',
  },
  dropdownOptionTextSelected: {
    color: '#3b82f6',
    fontWeight: '500',
  },
  customPositionContainer: {
    marginTop: 8,
    position: 'relative',
  },
  submitCustomButton: {
    position: 'absolute',
    right: 12,
    top: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitCustomButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  nextButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  nextButtonDisabled: {
    backgroundColor: '#9ca3af',
    shadowOpacity: 0,
    elevation: 0,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
````

## File: components/onboarding/PlanSelectionStep.tsx
````typescript
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { OnboardingData } from '../../app/auth/onboarding';
import { Card } from '~/components/ui/card';
import { Button, ButtonText } from '~/components/ui/button';
import ModernBackground from '../ui/ModernBackground';
import { Ionicons } from '@expo/vector-icons';

interface PlanSelectionStepProps {
  data: OnboardingData;
  onUpdate: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  id: 'starter' | 'professional' | 'enterprise';
  name: string;
  price: string;
  period: string;
  description: string;
  features: PlanFeature[];
  popular?: boolean;
  trialDays?: number;
}

const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 'Gratis',
    period: '30 hari',
    description: 'Cocok untuk pesantren kecil yang baru memulai digitalisasi',
    trialDays: 30,
    features: [
      { text: 'Hingga 50 santri', included: true },
      { text: 'Hingga 5 guru', included: true },
      { text: 'Manajemen absensi dasar', included: true },
      { text: 'Laporan bulanan', included: true },
      { text: 'Support email', included: true },
      { text: 'Manajemen nilai', included: false },
      { text: 'Komunikasi orang tua', included: false },
      { text: 'Laporan real-time', included: false },
      { text: 'API akses', included: false },
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    price: 'Rp 299.000',
    period: '/bulan',
    description: 'Solusi lengkap untuk pesantren menengah',
    popular: true,
    features: [
      { text: 'Hingga 500 santri', included: true },
      { text: 'Guru tidak terbatas', included: true },
      { text: 'Manajemen absensi lengkap', included: true },
      { text: 'Manajemen nilai', included: true },
      { text: 'Komunikasi orang tua', included: true },
      { text: 'Laporan real-time', included: true },
      { text: 'Support prioritas', included: true },
      { text: 'Backup otomatis', included: true },
      { text: 'API akses', included: false },
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 'Rp 799.000',
    period: '/bulan',
    description: 'Untuk pesantren besar dengan kebutuhan khusus',
    features: [
      { text: 'Santri tidak terbatas', included: true },
      { text: 'Guru tidak terbatas', included: true },
      { text: 'Semua fitur Professional', included: true },
      { text: 'API akses penuh', included: true },
      { text: 'Integrasi custom', included: true },
      { text: 'Dedicated support', included: true },
      { text: 'Training tim', included: true },
      { text: 'Multi-campus', included: true },
      { text: 'White-label option', included: true },
    ],
  },
];

export default function PlanSelectionStep({ data, onUpdate, onNext, onBack }: PlanSelectionStepProps) {
  const [selectedPlan, setSelectedPlan] = useState<string>(data.selectedPlan || '');

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    onUpdate({ selectedPlan: planId });
  };

  const handleNext = () => {
    if (!selectedPlan) {
      Alert.alert('Error', 'Mohon pilih paket berlangganan');
      return;
    }

    onNext();
  };

  const getRecommendedPlan = () => {
    const studentCount = parseInt(data.studentCount || '0');
    if (studentCount <= 50) return 'starter';
    if (studentCount <= 500) return 'professional';
    return 'enterprise';
  };

  const recommendedPlan = getRecommendedPlan();

  return (
    <ModernBackground>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 py-8">
          {}
          <View className="items-center mb-8">
            <View className="w-16 h-16 bg-primary-100 rounded-full items-center justify-center mb-4">
              <Ionicons name="diamond" size={32} color="#667eea" />
            </View>
            <Text className="text-2xl font-bold text-gray-800 text-center mb-2">
              Pilih Paket Berlangganan
            </Text>
            <Text className="text-base text-gray-600 text-center leading-6">
              Pilih paket yang sesuai dengan kebutuhan pesantren Anda
            </Text>
          </View>

           {}
           <Card variant="glassmorphism" size="md" className="mb-6 border-l-4 border-l-amber-500">
             <View className="p-4">
               <View className="flex-row items-center mb-2">
                 <Ionicons name="bulb" size={16} color="#f59e0b" />
                 <Text className="text-sm font-semibold text-amber-700 ml-2">
                   Rekomendasi untuk Anda
                 </Text>
               </View>
               <Text className="text-sm text-amber-700 leading-5">
                 Berdasarkan {data.studentCount} santri, kami merekomendasikan paket{' '}
                 <Text className="font-semibold">
                   {PLANS.find(p => p.id === recommendedPlan)?.name}
                 </Text>
               </Text>
             </View>
           </Card>

           {}
           <View className="space-y-4 mb-6">
             {PLANS.map((plan) => (
               <TouchableOpacity
                 key={plan.id}
                 onPress={() => handlePlanSelect(plan.id)}
                 activeOpacity={0.8}
               >
                 <Card
                   variant="glassmorphism"
                   size="lg"
                   className={`relative ${
                     selectedPlan === plan.id
                       ? 'border-2 border-primary-500'
                       : 'border border-white/20'
                   } ${
                     plan.popular ? 'border-emerald-500' : ''
                   }`}
                 >
                   <View className="p-5">
                     {}
                     {plan.popular && (
                       <View className="absolute -top-3 left-4 bg-emerald-500 px-3 py-1 rounded-full">
                         <Text className="text-xs font-bold text-white">
                           PALING POPULER
                         </Text>
                       </View>
                     )}

                     {}
                     {plan.id === recommendedPlan && !plan.popular && (
                       <View className="absolute -top-3 left-4 bg-amber-500 px-3 py-1 rounded-full">
                         <Text className="text-xs font-bold text-white">
                           DIREKOMENDASIKAN
                         </Text>
                       </View>
                     )}

                     {}
                     <View className="mb-4">
                       <Text className="text-xl font-bold text-gray-800 mb-2">
                         {plan.name}
                       </Text>
                       <View className="flex-row items-baseline mb-2">
                         <Text className="text-2xl font-bold text-primary-600">
                           {plan.price}
                         </Text>
                         <Text className="text-sm text-gray-600 ml-1">
                           {plan.period}
                         </Text>
                       </View>
                       <Text className="text-sm text-gray-600 leading-5">
                         {plan.description}
                       </Text>
                     </View>

                     {}
                     {plan.trialDays && (
                       <View className="bg-emerald-50 px-3 py-2 rounded-lg mb-4">
                         <View className="flex-row items-center">
                           <Ionicons name="gift" size={16} color="#10b981" />
                           <Text className="text-sm font-medium text-emerald-700 ml-2">
                             Gratis {plan.trialDays} hari
                           </Text>
                         </View>
                       </View>
                     )}

                     {}
                     <View className="space-y-3 mb-4">
                       {plan.features.map((feature, index) => (
                         <View key={index} className="flex-row items-center">
                           <View className={`w-5 h-5 rounded-full items-center justify-center mr-3 ${
                             feature.included ? 'bg-emerald-100' : 'bg-gray-100'
                           }`}>
                             <Ionicons
                               name={feature.included ? 'checkmark' : 'close'}
                               size={12}
                               color={feature.included ? '#10b981' : '#6b7280'}
                             />
                           </View>
                           <Text className={`text-sm flex-1 ${
                             feature.included ? 'text-gray-700' : 'text-gray-400'
                           }`}>
                             {feature.text}
                           </Text>
                         </View>
                       ))}
                     </View>

                     {}
                     {selectedPlan === plan.id && (
                       <View className="bg-primary-100 px-3 py-2 rounded-lg">
                         <View className="flex-row items-center justify-center">
                           <Ionicons name="checkmark-circle" size={16} color="#667eea" />
                           <Text className="text-sm font-medium text-primary-700 ml-2">
                             Dipilih
                           </Text>
                         </View>
                       </View>
                     )}
                   </View>
                 </Card>
               </TouchableOpacity>
          ))}
        </View>

           {}
           <Card variant="glassmorphism" size="md" className="mb-8">
             <View className="p-4">
               <View className="flex-row items-center mb-3">
                 <Ionicons name="information-circle" size={20} color="#667eea" />
                 <Text className="text-base font-semibold text-gray-800 ml-2">
                   Informasi Penting
                 </Text>
               </View>
               <View className="space-y-2">
                 <View className="flex-row items-start">
                   <Text className="text-primary-600 mr-2">•</Text>
                   <Text className="text-sm text-gray-700 flex-1">
                     Anda dapat mengubah paket kapan saja
                   </Text>
                 </View>
                 <View className="flex-row items-start">
                   <Text className="text-primary-600 mr-2">•</Text>
                   <Text className="text-sm text-gray-700 flex-1">
                     Semua paket termasuk backup data otomatis
                   </Text>
                 </View>
                 <View className="flex-row items-start">
                   <Text className="text-primary-600 mr-2">•</Text>
                   <Text className="text-sm text-gray-700 flex-1">
                     Tidak ada biaya setup atau instalasi
                   </Text>
                 </View>
                 <View className="flex-row items-start">
                   <Text className="text-primary-600 mr-2">•</Text>
                   <Text className="text-sm text-gray-700 flex-1">
                     Pembayaran dapat dilakukan bulanan atau tahunan
                   </Text>
                 </View>
               </View>
             </View>
           </Card>

           {}
           <View className="flex-row space-x-4">
             <Button
               variant="outline"
               size="lg"
               className="flex-1"
               onPress={onBack}
             >
               <ButtonText className="text-gray-700">
                 Kembali
               </ButtonText>
             </Button>

             <Button
               variant="solid"
               size="lg"
               className="flex-1"
               onPress={handleNext}
               isDisabled={!selectedPlan}
             >
               <ButtonText className="text-white font-semibold">
                 Lanjutkan
               </ButtonText>
             </Button>
           </View>
         </View>
       </ScrollView>
     </ModernBackground>
   );
}
````

## File: components/onboarding/SchoolInfoStep.tsx
````typescript
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { OnboardingData } from '../../app/auth/onboarding';

interface SchoolInfoStepProps {
  data: OnboardingData;
  onUpdate: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const SCHOOL_TYPES = [
  'Pesantren Modern',
  'Pesantren Salaf',
  'Pesantren Terpadu',
  'Madrasah Diniyah',
  'Pondok Pesantren',
  'Lainnya',
];

const PROVINCES = [
  'Aceh',
  'Sumatera Utara',
  'Sumatera Barat',
  'Riau',
  'Kepulauan Riau',
  'Jambi',
  'Sumatera Selatan',
  'Bangka Belitung',
  'Bengkulu',
  'Lampung',
  'DKI Jakarta',
  'Jawa Barat',
  'Jawa Tengah',
  'DI Yogyakarta',
  'Jawa Timur',
  'Banten',
  'Bali',
  'Nusa Tenggara Barat',
  'Nusa Tenggara Timur',
  'Kalimantan Barat',
  'Kalimantan Tengah',
  'Kalimantan Selatan',
  'Kalimantan Timur',
  'Kalimantan Utara',
  'Sulawesi Utara',
  'Sulawesi Tengah',
  'Sulawesi Selatan',
  'Sulawesi Tenggara',
  'Gorontalo',
  'Sulawesi Barat',
  'Maluku',
  'Maluku Utara',
  'Papua',
  'Papua Barat',
  'Papua Selatan',
  'Papua Tengah',
  'Papua Pegunungan',
  'Papua Barat Daya',
];

export default function SchoolInfoStep({ data, onUpdate, onNext, onBack }: SchoolInfoStepProps) {
  const [showSchoolTypeDropdown, setShowSchoolTypeDropdown] = useState(false);
  const [showProvinceDropdown, setShowProvinceDropdown] = useState(false);
  const [customSchoolType, setCustomSchoolType] = useState('');

  const validateStudentCount = (count: string) => {
    const num = parseInt(count);
    return !isNaN(num) && num > 0 && num <= 10000;
  };

  const handleNext = () => {
    // Validation
    if (!data.schoolName.trim()) {
      Alert.alert('Error', 'Mohon isi nama pesantren');
      return;
    }

    if (!data.schoolType.trim()) {
      Alert.alert('Error', 'Mohon pilih jenis pesantren');
      return;
    }

    if (!data.address.trim()) {
      Alert.alert('Error', 'Mohon isi alamat pesantren');
      return;
    }

    if (!data.city.trim()) {
      Alert.alert('Error', 'Mohon isi kota/kabupaten');
      return;
    }

    if (!data.province.trim()) {
      Alert.alert('Error', 'Mohon pilih provinsi');
      return;
    }

    if (!data.studentCount.trim() || !validateStudentCount(data.studentCount)) {
      Alert.alert('Error', 'Mohon isi jumlah santri yang valid (1-10000)');
      return;
    }

    onNext();
  };

  const handleSchoolTypeSelect = (type: string) => {
    if (type === 'Lainnya') {
      setShowSchoolTypeDropdown(false);

    } else {
      onUpdate({ schoolType: type });
      setShowSchoolTypeDropdown(false);
      setCustomSchoolType('');
    }
  };

  const handleCustomSchoolTypeSubmit = () => {
    if (customSchoolType.trim()) {
      onUpdate({ schoolType: customSchoolType.trim() });
      setCustomSchoolType('');
    }
  };

  const handleProvinceSelect = (province: string) => {
    onUpdate({ province });
    setShowProvinceDropdown(false);
  };

  const isFormValid =
    data.schoolName.trim() &&
    data.schoolType.trim() &&
    data.address.trim() &&
    data.city.trim() &&
    data.province.trim() &&
    data.studentCount.trim() &&
    validateStudentCount(data.studentCount);

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Informasi Pesantren</Text>
          <Text style={styles.subtitle}>
            Berikan informasi tentang pesantren yang Anda kelola
          </Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* School Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nama Pesantren *</Text>
            <TextInput
              style={styles.input}
              placeholder="Contoh: Pondok Pesantren Al-Hikmah"
              value={data.schoolName}
              onChangeText={(value) => onUpdate({ schoolName: value })}
              autoCapitalize="words"
              autoCorrect={false}
            />
          </View>

          {/* School Type */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Jenis Pesantren *</Text>

            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setShowSchoolTypeDropdown(!showSchoolTypeDropdown)}
            >
              <Text style={[
                styles.dropdownButtonText,
                !data.schoolType && styles.placeholderText
              ]}>
                {data.schoolType || 'Pilih jenis pesantren'}
              </Text>
              <Text style={styles.dropdownArrow}>
                {showSchoolTypeDropdown ? '▲' : '▼'}
              </Text>
            </TouchableOpacity>

            {showSchoolTypeDropdown && (
              <View style={styles.dropdown}>
                {SCHOOL_TYPES.map((type, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dropdownOption,
                      data.schoolType === type && styles.dropdownOptionSelected
                    ]}
                    onPress={() => handleSchoolTypeSelect(type)}
                  >
                    <Text style={[
                      styles.dropdownOptionText,
                      data.schoolType === type && styles.dropdownOptionTextSelected
                    ]}>
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {}
            {data.schoolType === 'Lainnya' || (!SCHOOL_TYPES.includes(data.schoolType) && data.schoolType) ? (
              <View style={styles.customInputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Masukkan jenis pesantren"
                  value={data.schoolType === 'Lainnya' ? customSchoolType : data.schoolType}
                  onChangeText={(value) => {
                    if (data.schoolType === 'Lainnya') {
                      setCustomSchoolType(value);
                    } else {
                      onUpdate({ schoolType: value });
                    }
                  }}
                  onSubmitEditing={handleCustomSchoolTypeSubmit}
                  autoCapitalize="words"
                  autoCorrect={false}
                />
                {data.schoolType === 'Lainnya' && (
                  <TouchableOpacity
                    style={styles.submitCustomButton}
                    onPress={handleCustomSchoolTypeSubmit}
                  >
                    <Text style={styles.submitCustomButtonText}>✓</Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : null}
          </View>

          {}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Alamat Lengkap *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Jl. Raya Pesantren No. 123, Desa Santri"
              value={data.address}
              onChangeText={(value) => onUpdate({ address: value })}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
              autoCapitalize="words"
            />
          </View>

          {}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Kota/Kabupaten *</Text>
            <TextInput
              style={styles.input}
              placeholder="Contoh: Bogor"
              value={data.city}
              onChangeText={(value) => onUpdate({ city: value })}
              autoCapitalize="words"
              autoCorrect={false}
            />
          </View>

          {}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Provinsi *</Text>

            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setShowProvinceDropdown(!showProvinceDropdown)}
            >
              <Text style={[
                styles.dropdownButtonText,
                !data.province && styles.placeholderText
              ]}>
                {data.province || 'Pilih provinsi'}
              </Text>
              <Text style={styles.dropdownArrow}>
                {showProvinceDropdown ? '▲' : '▼'}
              </Text>
            </TouchableOpacity>

            {showProvinceDropdown && (
              <ScrollView style={styles.dropdown} nestedScrollEnabled>
                {PROVINCES.map((province, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.dropdownOption,
                      data.province === province && styles.dropdownOptionSelected
                    ]}
                    onPress={() => handleProvinceSelect(province)}
                  >
                    <Text style={[
                      styles.dropdownOptionText,
                      data.province === province && styles.dropdownOptionTextSelected
                    ]}>
                      {province}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>

          {}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Jumlah Santri *</Text>
            <TextInput
              style={[
                styles.input,
                data.studentCount && !validateStudentCount(data.studentCount) && styles.inputError
              ]}
              placeholder="Contoh: 150"
              value={data.studentCount}
              onChangeText={(value) => onUpdate({ studentCount: value })}
              keyboardType="numeric"
              autoCorrect={false}
            />
            {data.studentCount && !validateStudentCount(data.studentCount) && (
              <Text style={styles.errorText}>Jumlah santri harus antara 1-10000</Text>
            )}
          </View>

          {}
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>🏫 Informasi Pesantren</Text>
            <Text style={styles.infoText}>
              Data ini akan digunakan untuk menyesuaikan fitur SchoolSync dengan karakteristik pesantren Anda dan membantu dalam pelaporan.
            </Text>
          </View>
        </View>

        {}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>Kembali</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.nextButton,
              !isFormValid && styles.nextButtonDisabled
            ]}
            onPress={handleNext}
            disabled={!isFormValid}
          >
            <Text style={styles.nextButtonText}>Lanjutkan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 24,
  },
  form: {
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: 'white',
    color: '#1f2937',
  },
  textArea: {
    height: 80,
    paddingTop: 14,
  },
  inputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 14,
    marginTop: 4,
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#1f2937',
    flex: 1,
  },
  placeholderText: {
    color: '#9ca3af',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#6b7280',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    backgroundColor: 'white',
    marginTop: 4,
    maxHeight: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  dropdownOptionSelected: {
    backgroundColor: '#dbeafe',
  },
  dropdownOptionText: {
    fontSize: 16,
    color: '#1f2937',
  },
  dropdownOptionTextSelected: {
    color: '#3b82f6',
    fontWeight: '500',
  },
  customInputContainer: {
    marginTop: 8,
    position: 'relative',
  },
  submitCustomButton: {
    position: 'absolute',
    right: 12,
    top: 12,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitCustomButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  backButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#6b7280',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    flex: 2,
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  nextButtonDisabled: {
    backgroundColor: '#9ca3af',
    shadowOpacity: 0,
    elevation: 0,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
````

## File: components/onboarding/TeacherInviteStep.tsx
````typescript
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  FlatList,
} from 'react-native';
import { OnboardingData } from '../../app/auth/onboarding';

interface TeacherInviteStepProps {
  data: OnboardingData;
  onUpdate: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
  onBack: () => void;
}

interface TeacherInvite {
  id: string;
  name: string;
  email: string;
  subject?: string;
}

const COMMON_SUBJECTS = [
  'Bahasa Arab',
  'Al-Quran',
  'Hadits',
  'Fiqh',
  'Aqidah',
  'Akhlaq',
  'Sejarah Islam',
  'Bahasa Indonesia',
  'Matematika',
  'IPA',
  'IPS',
  'Bahasa Inggris',
  'Olahraga',
  'Seni',
  'Lainnya',
];

export default function TeacherInviteStep({ data, onUpdate, onNext, onBack }: TeacherInviteStepProps) {
  const [teachers, setTeachers] = useState<TeacherInvite[]>(data.teacherInvites || []);
  const [newTeacher, setNewTeacher] = useState({ name: '', email: '', subject: '' });
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const addTeacher = () => {
    if (!newTeacher.name.trim()) {
      Alert.alert('Error', 'Mohon isi nama guru');
      return;
    }

    if (!newTeacher.email.trim() || !validateEmail(newTeacher.email)) {
      Alert.alert('Error', 'Mohon isi email yang valid');
      return;
    }


    if (teachers.some(t => t.email.toLowerCase() === newTeacher.email.toLowerCase())) {
      Alert.alert('Error', 'Email sudah digunakan');
      return;
    }

    const teacher: TeacherInvite = {
      id: generateId(),
      name: newTeacher.name.trim(),
      email: newTeacher.email.trim().toLowerCase(),
      subject: newTeacher.subject.trim() || undefined,
    };

    const updatedTeachers = [...teachers, teacher];
    setTeachers(updatedTeachers);
    onUpdate({ teacherInvites: updatedTeachers });
    setNewTeacher({ name: '', email: '', subject: '' });
  };

  const removeTeacher = (id: string) => {
    Alert.alert(
      'Hapus Guru',
      'Apakah Anda yakin ingin menghapus guru ini?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => {
            const updatedTeachers = teachers.filter(t => t.id !== id);
            setTeachers(updatedTeachers);
            onUpdate({ teacherInvites: updatedTeachers });
          },
        },
      ]
    );
  };

  const updateTeacher = (id: string, updates: Partial<TeacherInvite>) => {
    const updatedTeachers = teachers.map(t =>
      t.id === id ? { ...t, ...updates } : t
    );
    setTeachers(updatedTeachers);
    onUpdate({ teacherInvites: updatedTeachers });
  };

  const handleSubjectSelect = (subject: string) => {
    setNewTeacher({ ...newTeacher, subject });
    setShowSubjectDropdown(false);
  };

  const handleNext = () => {

    onNext();
  };

  const renderTeacherItem = ({ item }: { item: TeacherInvite }) => (
    <View style={styles.teacherCard}>
      <View style={styles.teacherInfo}>
        <Text style={styles.teacherName}>{item.name}</Text>
        <Text style={styles.teacherEmail}>{item.email}</Text>
        {item.subject && (
          <Text style={styles.teacherSubject}>📚 {item.subject}</Text>
        )}
      </View>
      <View style={styles.teacherActions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setEditingTeacher(editingTeacher === item.id ? null : item.id)}
        >
          <Text style={styles.editButtonText}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => removeTeacher(item.id)}
        >
          <Text style={styles.deleteButtonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.content}>
        {}
        <View style={styles.header}>
          <Text style={styles.title}>Undang Guru</Text>
          <Text style={styles.subtitle}>
            Undang guru-guru untuk bergabung dengan SchoolSync (opsional)
          </Text>
        </View>

        {}
        <View style={styles.addTeacherSection}>
          <Text style={styles.sectionTitle}>Tambah Guru Baru</Text>

          {}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nama Guru</Text>
            <TextInput
              style={styles.input}
              placeholder="Contoh: Ustadz Ahmad"
              value={newTeacher.name}
              onChangeText={(value) => setNewTeacher({ ...newTeacher, name: value })}
              autoCapitalize="words"
              autoCorrect={false}
            />
          </View>

          {}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={[
                styles.input,
                newTeacher.email && !validateEmail(newTeacher.email) && styles.inputError
              ]}
              placeholder="contoh@email.com"
              value={newTeacher.email}
              onChangeText={(value) => setNewTeacher({ ...newTeacher, email: value })}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {newTeacher.email && !validateEmail(newTeacher.email) && (
              <Text style={styles.errorText}>Format email tidak valid</Text>
            )}
          </View>

          {}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mata Pelajaran (Opsional)</Text>

            <TouchableOpacity
              style={styles.dropdownButton}
              onPress={() => setShowSubjectDropdown(!showSubjectDropdown)}
            >
              <Text style={[
                styles.dropdownButtonText,
                !newTeacher.subject && styles.placeholderText
              ]}>
                {newTeacher.subject || 'Pilih mata pelajaran'}
              </Text>
              <Text style={styles.dropdownArrow}>
                {showSubjectDropdown ? '▲' : '▼'}
              </Text>
            </TouchableOpacity>

            {showSubjectDropdown && (
              <View style={styles.dropdown}>
                {COMMON_SUBJECTS.map((subject, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.dropdownOption}
                    onPress={() => handleSubjectSelect(subject)}
                  >
                    <Text style={styles.dropdownOptionText}>{subject}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {}
          <TouchableOpacity
            style={[
              styles.addButton,
              (!newTeacher.name.trim() || !validateEmail(newTeacher.email)) && styles.addButtonDisabled
            ]}
            onPress={addTeacher}
            disabled={!newTeacher.name.trim() || !validateEmail(newTeacher.email)}
          >
            <Text style={styles.addButtonText}>+ Tambah Guru</Text>
          </TouchableOpacity>
        </View>

        {}
        {teachers.length > 0 && (
          <View style={styles.teachersSection}>
            <Text style={styles.sectionTitle}>
              Guru yang Akan Diundang ({teachers.length})
            </Text>

            <FlatList
              data={teachers}
              renderItem={renderTeacherItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}

        {}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>📧 Tentang Undangan Guru</Text>
          <Text style={styles.infoText}>
            • Guru akan menerima email undangan untuk bergabung{"\n"}
            • Mereka dapat mengatur password sendiri{"\n"}
            • Anda dapat menambah guru lain kapan saja nanti{"\n"}
            • Langkah ini bersifat opsional dan dapat dilewati
          </Text>
        </View>

        {}
        {teachers.length === 0 && (
          <View style={styles.skipSection}>
            <Text style={styles.skipText}>
              Tidak ada guru yang ingin diundang sekarang? Tidak masalah!
            </Text>
            <Text style={styles.skipSubtext}>
              Anda dapat mengundang guru kapan saja dari dashboard nanti.
            </Text>
          </View>
        )}

        {}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backButtonText}>Kembali</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {teachers.length > 0 ? 'Kirim Undangan' : 'Lewati'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    lineHeight: 24,
  },
  addTeacherSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: 'white',
    color: '#1f2937',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#1f2937',
    flex: 1,
  },
  placeholderText: {
    color: '#9ca3af',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#6b7280',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: 'white',
    marginTop: 4,
    maxHeight: 150,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownOption: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  dropdownOptionText: {
    fontSize: 14,
    color: '#1f2937',
  },
  addButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonDisabled: {
    backgroundColor: '#9ca3af',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  teachersSection: {
    marginBottom: 32,
  },
  teacherCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  teacherInfo: {
    flex: 1,
  },
  teacherName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  teacherEmail: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  teacherSubject: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: '500',
  },
  teacherActions: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#f3f4f6',
  },
  editButtonText: {
    fontSize: 16,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 6,
    backgroundColor: '#fef2f2',
  },
  deleteButtonText: {
    fontSize: 16,
  },
  infoBox: {
    backgroundColor: '#f0f9ff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  skipSection: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  skipText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
    marginBottom: 4,
  },
  skipSubtext: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  backButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#6b7280',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    flex: 2,
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#3b82f6',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
````

## File: components/onboarding/WelcomeStep.tsx
````typescript
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { OnboardingData } from '../../app/auth/onboarding';

interface WelcomeStepProps {
  data: OnboardingData;
  onComplete: () => void;
}

const { width } = Dimensions.get('window');

export default function WelcomeStep({ data, onComplete }: WelcomeStepProps) {
  const getSelectedPlanName = () => {
    const planNames = {
      starter: 'Starter',
      professional: 'Professional',
      enterprise: 'Enterprise',
    };
    return planNames[data.selectedPlan as keyof typeof planNames] || 'Tidak diketahui';
  };

  const getNextSteps = () => {
    const steps = [
      {
        icon: '👥',
        title: 'Undang Guru Lainnya',
        description: 'Tambahkan lebih banyak guru ke sistem dari dashboard',
      },
      {
        icon: '👨‍🎓',
        title: 'Tambah Data Santri',
        description: 'Input data santri dan atur kelas mereka',
      },
      {
        icon: '📚',
        title: 'Atur Mata Pelajaran',
        description: 'Konfigurasi mata pelajaran dan jadwal',
      },
      {
        icon: '📊',
        title: 'Mulai Absensi',
        description: 'Gunakan fitur absensi untuk tracking kehadiran',
      },
    ];

    return steps;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {}
        <View style={styles.successSection}>
          <View style={styles.successIcon}>
            <Text style={styles.successEmoji}>🎉</Text>
          </View>
          <Text style={styles.successTitle}>Selamat!</Text>
          <Text style={styles.successSubtitle}>
            Akun SchoolSync untuk {data.schoolName} berhasil dibuat
          </Text>
        </View>

        {}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Ringkasan Setup</Text>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Pesantren:</Text>
            <Text style={styles.summaryValue}>{data.schoolName}</Text>
          </View>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Lokasi:</Text>
            <Text style={styles.summaryValue}>{data.city}, {data.province}</Text>
          </View>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Jumlah Santri:</Text>
            <Text style={styles.summaryValue}>{data.studentCount} santri</Text>
          </View>

          <View style={styles.summaryItem}>
            <Text style={styles.summaryLabel}>Paket:</Text>
            <Text style={styles.summaryValue}>{getSelectedPlanName()}</Text>
          </View>

          {data.teacherInvites && data.teacherInvites.length > 0 && (
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Guru Diundang:</Text>
              <Text style={styles.summaryValue}>{data.teacherInvites.length} guru</Text>
            </View>
          )}
        </View>

        {}
        <View style={styles.nextStepsSection}>
          <Text style={styles.nextStepsTitle}>Langkah Selanjutnya</Text>
          <Text style={styles.nextStepsSubtitle}>
            Berikut adalah hal-hal yang dapat Anda lakukan untuk memulai:
          </Text>

          {getNextSteps().map((step, index) => (
            <View key={index} style={styles.stepCard}>
              <View style={styles.stepIcon}>
                <Text style={styles.stepEmoji}>{step.icon}</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDescription}>{step.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {}
        <View style={styles.featuresSection}>
          <Text style={styles.featuresTitle}>Fitur yang Tersedia</Text>

          <View style={styles.featureGrid}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📋</Text>
              <Text style={styles.featureText}>Absensi Digital</Text>
            </View>

            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📊</Text>
              <Text style={styles.featureText}>Laporan Real-time</Text>
            </View>

            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>👨‍👩‍👧‍👦</Text>
              <Text style={styles.featureText}>Komunikasi Ortu</Text>
            </View>

            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🎯</Text>
              <Text style={styles.featureText}>Manajemen Nilai</Text>
            </View>
          </View>
        </View>

        {}
        <View style={styles.supportSection}>
          <Text style={styles.supportTitle}>Butuh Bantuan?</Text>
          <Text style={styles.supportText}>
            Tim support kami siap membantu Anda 24/7. Hubungi kami melalui:
          </Text>

          <View style={styles.supportOptions}>
            <View style={styles.supportOption}>
              <Text style={styles.supportIcon}>📧</Text>
              <Text style={styles.supportLabel}>support@schoolsync.id</Text>
            </View>

            <View style={styles.supportOption}>
              <Text style={styles.supportIcon}>💬</Text>
              <Text style={styles.supportLabel}>Live Chat di Dashboard</Text>
            </View>

            <View style={styles.supportOption}>
              <Text style={styles.supportIcon}>📱</Text>
              <Text style={styles.supportLabel}>WhatsApp: +62 812-3456-7890</Text>
            </View>
          </View>
        </View>

        {}
        <TouchableOpacity style={styles.completeButton} onPress={onComplete}>
          <Text style={styles.completeButtonText}>Mulai Menggunakan SchoolSync</Text>
        </TouchableOpacity>

        {}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Terima kasih telah mempercayai SchoolSync untuk digitalisasi pesantren Anda! 🙏
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  successSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#dcfce7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  successEmoji: {
    fontSize: 40,
  },
  successTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
  },
  summaryCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 14,
    color: '#1e293b',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  nextStepsSection: {
    marginBottom: 24,
  },
  nextStepsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  nextStepsSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
    lineHeight: 20,
  },
  stepCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  stepIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0f9ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  stepEmoji: {
    fontSize: 24,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  featuresSection: {
    marginBottom: 24,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: (width - 60) / 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    textAlign: 'center',
  },
  supportSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  supportTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  supportText: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
    lineHeight: 20,
  },
  supportOptions: {
    gap: 12,
  },
  supportOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  supportIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  supportLabel: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  completeButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#3b82f6',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  completeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  footerText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
    fontStyle: 'italic',
  },
});
````

## File: components/ui/button/index.tsx
````typescript
'use client';
import React from 'react';
import { createButton } from '@gluestack-ui/button';
import { tva } from '@gluestack-ui/nativewind-utils/tva';
import {
  withStyleContext,
  useStyleContext,
} from '@gluestack-ui/nativewind-utils/withStyleContext';
import { cssInterop } from 'nativewind';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import type { VariantProps } from '@gluestack-ui/nativewind-utils';
import { PrimitiveIcon, UIIcon } from '@gluestack-ui/icon';

const SCOPE = 'BUTTON';

const Root = withStyleContext(Pressable, SCOPE);

const UIButton = createButton({
  Root: Root,
  Text,
  Group: View,
  Spinner: ActivityIndicator,
  Icon: UIIcon,
});

cssInterop(PrimitiveIcon, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      height: true,
      width: true,
      fill: true,
      color: 'classNameColor',
      stroke: true,
    },
  },
});

const buttonStyle = tva({
  base: 'group/button rounded bg-primary-500 flex-row items-center justify-center data-[focus-visible=true]:web:outline-none data-[focus-visible=true]:web:ring-2 data-[disabled=true]:opacity-40 gap-2 transition-all duration-200 data-[active=true]:scale-[0.98]',
  variants: {
    action: {
      primary:
          'bg-gradient-to-r from-primary-500 to-primary-600 data-[hover=true]:from-primary-600 data-[hover=true]:to-primary-700 data-[active=true]:from-primary-700 data-[active=true]:to-primary-800 border-primary-300 data-[hover=true]:border-primary-400 data-[active=true]:border-primary-500 data-[focus-visible=true]:web:ring-indicator-info',
      secondary:
        'bg-secondary-500 border-secondary-300 data-[hover=true]:bg-secondary-600 data-[hover=true]:border-secondary-400 data-[active=true]:bg-secondary-700 data-[active=true]:border-secondary-700 data-[focus-visible=true]:web:ring-indicator-info',
      positive:
        'bg-success-500 border-success-300 data-[hover=true]:bg-success-600 data-[hover=true]:border-success-400 data-[active=true]:bg-success-700 data-[active=true]:border-success-500 data-[focus-visible=true]:web:ring-indicator-info',
      negative:
        'bg-error-500 border-error-300 data-[hover=true]:bg-error-600 data-[hover=true]:border-error-400 data-[active=true]:bg-error-700 data-[active=true]:border-error-500 data-[focus-visible=true]:web:ring-indicator-info',
      default:
        'bg-transparent data-[hover=true]:bg-background-50 data-[active=true]:bg-transparent',
    },
    variant: {
      link: 'px-0',
      outline:
        'bg-transparent border data-[hover=true]:bg-background-50 data-[active=true]:bg-transparent',
      solid: '',
    },

    size: {
      xs: 'px-3.5 h-8',
      sm: 'px-4 h-9',
      md: 'px-5 h-10',
      lg: 'px-6 h-11',
      xl: 'px-7 h-12',
    },
  },
  compoundVariants: [
    {
      action: 'primary',
      variant: 'link',
      class:
        'px-0 bg-transparent data-[hover=true]:bg-transparent data-[active=true]:bg-transparent',
    },
    {
      action: 'secondary',
      variant: 'link',
      class:
        'px-0 bg-transparent data-[hover=true]:bg-transparent data-[active=true]:bg-transparent',
    },
    {
      action: 'positive',
      variant: 'link',
      class:
        'px-0 bg-transparent data-[hover=true]:bg-transparent data-[active=true]:bg-transparent',
    },
    {
      action: 'negative',
      variant: 'link',
      class:
        'px-0 bg-transparent data-[hover=true]:bg-transparent data-[active=true]:bg-transparent',
    },
    {
      action: 'primary',
      variant: 'outline',
      class:
        'bg-transparent data-[hover=true]:bg-background-50 data-[active=true]:bg-transparent',
    },
    {
      action: 'secondary',
      variant: 'outline',
      class:
        'bg-transparent data-[hover=true]:bg-background-50 data-[active=true]:bg-transparent',
    },
    {
      action: 'positive',
      variant: 'outline',
      class:
        'bg-transparent data-[hover=true]:bg-background-50 data-[active=true]:bg-transparent',
    },
    {
      action: 'negative',
      variant: 'outline',
      class:
        'bg-transparent data-[hover=true]:bg-background-50 data-[active=true]:bg-transparent',
    },
  ],
});

const buttonTextStyle = tva({
  base: 'text-typography-0 font-semibold web:select-none',
  parentVariants: {
    action: {
      primary:
        'text-primary-600 data-[hover=true]:text-primary-600 data-[active=true]:text-primary-700',
      secondary:
        'text-typography-500 data-[hover=true]:text-typography-600 data-[active=true]:text-typography-700',
      positive:
        'text-success-600 data-[hover=true]:text-success-600 data-[active=true]:text-success-700',
      negative:
        'text-error-600 data-[hover=true]:text-error-600 data-[active=true]:text-error-700',
    },
    variant: {
      link: 'data-[hover=true]:underline data-[active=true]:underline',
      outline: '',
      solid:
        'text-typography-0 data-[hover=true]:text-typography-0 data-[active=true]:text-typography-0',
    },
    size: {
      xs: 'text-xs',
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
  },
  parentCompoundVariants: [
    {
      variant: 'solid',
      action: 'primary',
      class:
        'text-typography-0 data-[hover=true]:text-typography-0 data-[active=true]:text-typography-0',
    },
    {
      variant: 'solid',
      action: 'secondary',
      class:
        'text-typography-800 data-[hover=true]:text-typography-800 data-[active=true]:text-typography-800',
    },
    {
      variant: 'solid',
      action: 'positive',
      class:
        'text-typography-0 data-[hover=true]:text-typography-0 data-[active=true]:text-typography-0',
    },
    {
      variant: 'solid',
      action: 'negative',
      class:
        'text-typography-0 data-[hover=true]:text-typography-0 data-[active=true]:text-typography-0',
    },
    {
      variant: 'outline',
      action: 'primary',
      class:
        'text-primary-500 data-[hover=true]:text-primary-500 data-[active=true]:text-primary-500',
    },
    {
      variant: 'outline',
      action: 'secondary',
      class:
        'text-typography-500 data-[hover=true]:text-primary-600 data-[active=true]:text-typography-700',
    },
    {
      variant: 'outline',
      action: 'positive',
      class:
        'text-primary-500 data-[hover=true]:text-primary-500 data-[active=true]:text-primary-500',
    },
    {
      variant: 'outline',
      action: 'negative',
      class:
        'text-primary-500 data-[hover=true]:text-primary-500 data-[active=true]:text-primary-500',
    },
  ],
});

const buttonIconStyle = tva({
  base: 'fill-none',
  parentVariants: {
    variant: {
      link: 'data-[hover=true]:underline data-[active=true]:underline',
      outline: '',
      solid:
        'text-typography-0 data-[hover=true]:text-typography-0 data-[active=true]:text-typography-0',
    },
    size: {
      xs: 'h-3.5 w-3.5',
      sm: 'h-4 w-4',
      md: 'h-[18px] w-[18px]',
      lg: 'h-[18px] w-[18px]',
      xl: 'h-5 w-5',
    },
    action: {
      primary:
        'text-primary-600 data-[hover=true]:text-primary-600 data-[active=true]:text-primary-700',
      secondary:
        'text-typography-500 data-[hover=true]:text-typography-600 data-[active=true]:text-typography-700',
      positive:
        'text-success-600 data-[hover=true]:text-success-600 data-[active=true]:text-success-700',

      negative:
        'text-error-600 data-[hover=true]:text-error-600 data-[active=true]:text-error-700',
    },
  },
  parentCompoundVariants: [
    {
      variant: 'solid',
      action: 'primary',
      class:
        'text-typography-0 data-[hover=true]:text-typography-0 data-[active=true]:text-typography-0',
    },
    {
      variant: 'solid',
      action: 'secondary',
      class:
        'text-typography-800 data-[hover=true]:text-typography-800 data-[active=true]:text-typography-800',
    },
    {
      variant: 'solid',
      action: 'positive',
      class:
        'text-typography-0 data-[hover=true]:text-typography-0 data-[active=true]:text-typography-0',
    },
    {
      variant: 'solid',
      action: 'negative',
      class:
        'text-typography-0 data-[hover=true]:text-typography-0 data-[active=true]:text-typography-0',
    },
  ],
});

const buttonGroupStyle = tva({
  base: '',
  variants: {
    space: {
      'xs': 'gap-1',
      'sm': 'gap-2',
      'md': 'gap-3',
      'lg': 'gap-4',
      'xl': 'gap-5',
      '2xl': 'gap-6',
      '3xl': 'gap-7',
      '4xl': 'gap-8',
    },
    isAttached: {
      true: 'gap-0',
    },
    flexDirection: {
      'row': 'flex-row',
      'column': 'flex-col',
      'row-reverse': 'flex-row-reverse',
      'column-reverse': 'flex-col-reverse',
    },
  },
});

type IButtonProps = Omit<
  React.ComponentPropsWithoutRef<typeof UIButton>,
  'context'
> &
  VariantProps<typeof buttonStyle> & { className?: string };

const Button = React.forwardRef<
  React.ComponentRef<typeof UIButton>,
  IButtonProps
>(function Button(
  { className, variant = 'solid', size = 'md', action = 'primary', ...props },
  ref
) {
  return (
    <UIButton
      ref={ref}
      {...props}
      className={buttonStyle({ variant, size, action, class: className })}
      context={{ variant, size, action }}
    />
  );
});

type IButtonTextProps = React.ComponentPropsWithoutRef<typeof UIButton.Text> &
  VariantProps<typeof buttonTextStyle> & { className?: string };

const ButtonText = React.forwardRef<
  React.ComponentRef<typeof UIButton.Text>,
  IButtonTextProps
>(function ButtonText({ className, variant, size, action, ...props }, ref) {
  const {
    variant: parentVariant,
    size: parentSize,
    action: parentAction,
  } = useStyleContext(SCOPE);

  return (
    <UIButton.Text
      ref={ref}
      {...props}
      className={buttonTextStyle({
        parentVariants: {
          variant: parentVariant,
          size: parentSize,
          action: parentAction,
        },
        variant,
        size,
        action,
        class: className,
      })}
    />
  );
});

const ButtonSpinner = UIButton.Spinner;

type IButtonIcon = React.ComponentPropsWithoutRef<typeof UIButton.Icon> &
  VariantProps<typeof buttonIconStyle> & {
    className?: string | undefined;
    as?: React.ElementType;
    height?: number;
    width?: number;
  };

const ButtonIcon = React.forwardRef<
  React.ComponentRef<typeof UIButton.Icon>,
  IButtonIcon
>(function ButtonIcon({ className, size, ...props }, ref) {
  const {
    variant: parentVariant,
    size: parentSize,
    action: parentAction,
  } = useStyleContext(SCOPE);

  if (typeof size === 'number') {
    return (
      <UIButton.Icon
        ref={ref}
        {...props}
        className={buttonIconStyle({ class: className })}
        size={size}
      />
    );
  } else if (
    (props.height !== undefined || props.width !== undefined) &&
    size === undefined
  ) {
    return (
      <UIButton.Icon
        ref={ref}
        {...props}
        className={buttonIconStyle({ class: className })}
      />
    );
  }
  return (
    <UIButton.Icon
      {...props}
      className={buttonIconStyle({
        parentVariants: {
          size: parentSize,
          variant: parentVariant,
          action: parentAction,
        },
        size,
        class: className,
      })}
      ref={ref}
    />
  );
});

type IButtonGroupProps = React.ComponentPropsWithoutRef<typeof UIButton.Group> &
  VariantProps<typeof buttonGroupStyle>;

const ButtonGroup = React.forwardRef<
  React.ComponentRef<typeof UIButton.Group>,
  IButtonGroupProps
>(function ButtonGroup(
  {
    className,
    space = 'md',
    isAttached = false,
    flexDirection = 'column',
    ...props
  },
  ref
) {
  return (
    <UIButton.Group
      className={buttonGroupStyle({
        class: className,
        space,
        isAttached,
        flexDirection,
      })}
      {...props}
      ref={ref}
    />
  );
});

Button.displayName = 'Button';
ButtonText.displayName = 'ButtonText';
ButtonSpinner.displayName = 'ButtonSpinner';
ButtonIcon.displayName = 'ButtonIcon';
ButtonGroup.displayName = 'ButtonGroup';

export { Button, ButtonText, ButtonSpinner, ButtonIcon, ButtonGroup };
````

## File: components/ui/card/index.tsx
````typescript
import React from 'react';
import type { VariantProps } from '@gluestack-ui/nativewind-utils';
import { View, ViewProps } from 'react-native';
import { cardStyle } from './styles';

type ICardProps = ViewProps &
  VariantProps<typeof cardStyle> & { className?: string };

const Card = React.forwardRef<React.ComponentRef<typeof View>, ICardProps>(
  function Card(
    { className, size = 'md', variant = 'elevated', ...props },
    ref
  ) {
    return (
      <View
        className={cardStyle({ size, variant, class: className })}
        {...props}
        ref={ref}
      />
    );
  }
);

Card.displayName = 'Card';

export { Card };
````

## File: components/ui/card/index.web.tsx
````typescript
import React from 'react';
import { cardStyle } from './styles';
import type { VariantProps } from '@gluestack-ui/nativewind-utils';

type ICardProps = React.ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof cardStyle>;

const Card = React.forwardRef<HTMLDivElement, ICardProps>(function Card(
  { className, size = 'md', variant = 'elevated', ...props },
  ref
) {
  return (
    <div
      className={cardStyle({ size, variant, class: className })}
      {...props}
      ref={ref}
    />
  );
});

Card.displayName = 'Card';

export { Card };
````

## File: components/ui/card/styles.tsx
````typescript
import { tva } from '@gluestack-ui/nativewind-utils/tva';
import { isWeb } from '@gluestack-ui/nativewind-utils/IsWeb';
const baseStyle = isWeb ? 'flex flex-col relative z-0' : '';

export const cardStyle = tva({
  base: baseStyle,
  variants: {
    size: {
      sm: 'p-3 rounded',
      md: 'p-4 rounded-md',
      lg: 'p-6 rounded-xl',
    },
    variant: {
      elevated: 'bg-background-0',
      outline: 'border border-outline-200 ',
      ghost: 'rounded-none',
      filled: 'bg-background-50',
      glassmorphism: 'bg-white/10 backdrop-blur-md border border-white/20',
    },
  },
});
````

## File: components/ui/gluestack-ui-provider/config.ts
````typescript
'use client';
import { vars } from 'nativewind';

export const config = {
  light: vars({
    '--color-primary-0': '179 179 179',
    '--color-primary-50': '153 153 153',
    '--color-primary-100': '128 128 128',
    '--color-primary-200': '115 115 115',
    '--color-primary-300': '102 102 102',
    '--color-primary-400': '82 82 82',
    '--color-primary-500': '51 51 51',
    '--color-primary-600': '41 41 41',
    '--color-primary-700': '31 31 31',
    '--color-primary-800': '13 13 13',
    '--color-primary-900': '10 10 10',
    '--color-primary-950': '8 8 8',


    '--color-secondary-0': '253 253 253',
    '--color-secondary-50': '251 251 251',
    '--color-secondary-100': '246 246 246',
    '--color-secondary-200': '242 242 242',
    '--color-secondary-300': '237 237 237',
    '--color-secondary-400': '230 230 231',
    '--color-secondary-500': '217 217 219',
    '--color-secondary-600': '198 199 199',
    '--color-secondary-700': '189 189 189',
    '--color-secondary-800': '177 177 177',
    '--color-secondary-900': '165 164 164',
    '--color-secondary-950': '157 157 157',


    '--color-tertiary-0': '255 250 245',
    '--color-tertiary-50': '255 242 229',
    '--color-tertiary-100': '255 233 213',
    '--color-tertiary-200': '254 209 170',
    '--color-tertiary-300': '253 180 116',
    '--color-tertiary-400': '251 157 75',
    '--color-tertiary-500': '231 129 40',
    '--color-tertiary-600': '215 117 31',
    '--color-tertiary-700': '180 98 26',
    '--color-tertiary-800': '130 73 23',
    '--color-tertiary-900': '108 61 19',
    '--color-tertiary-950': '84 49 18',


    '--color-error-0': '254 233 233',
    '--color-error-50': '254 226 226',
    '--color-error-100': '254 202 202',
    '--color-error-200': '252 165 165',
    '--color-error-300': '248 113 113',
    '--color-error-400': '239 68 68',
    '--color-error-500': '230 53 53',
    '--color-error-600': '220 38 38',
    '--color-error-700': '185 28 28',
    '--color-error-800': '153 27 27',
    '--color-error-900': '127 29 29',
    '--color-error-950': '83 19 19',


    '--color-success-0': '228 255 244',
    '--color-success-50': '202 255 232',
    '--color-success-100': '162 241 192',
    '--color-success-200': '132 211 162',
    '--color-success-300': '102 181 132',
    '--color-success-400': '72 151 102',
    '--color-success-500': '52 131 82',
    '--color-success-600': '42 121 72',
    '--color-success-700': '32 111 62',
    '--color-success-800': '22 101 52',
    '--color-success-900': '20 83 45',
    '--color-success-950': '27 50 36',


    '--color-warning-0': '255 249 245',
    '--color-warning-50': '255 244 236',
    '--color-warning-100': '255 231 213',
    '--color-warning-200': '254 205 170',
    '--color-warning-300': '253 173 116',
    '--color-warning-400': '251 149 75',
    '--color-warning-500': '231 120 40',
    '--color-warning-600': '215 108 31',
    '--color-warning-700': '180 90 26',
    '--color-warning-800': '130 68 23',
    '--color-warning-900': '108 56 19',
    '--color-warning-950': '84 45 18',


    '--color-info-0': '236 248 254',
    '--color-info-50': '199 235 252',
    '--color-info-100': '162 221 250',
    '--color-info-200': '124 207 248',
    '--color-info-300': '87 194 246',
    '--color-info-400': '50 180 244',
    '--color-info-500': '13 166 242',
    '--color-info-600': '11 141 205',
    '--color-info-700': '9 115 168',
    '--color-info-800': '7 90 131',
    '--color-info-900': '5 64 93',
    '--color-info-950': '3 38 56',


    '--color-typography-0': '254 254 255',
    '--color-typography-50': '245 245 245',
    '--color-typography-100': '229 229 229',
    '--color-typography-200': '219 219 220',
    '--color-typography-300': '212 212 212',
    '--color-typography-400': '163 163 163',
    '--color-typography-500': '140 140 140',
    '--color-typography-600': '115 115 115',
    '--color-typography-700': '82 82 82',
    '--color-typography-800': '64 64 64',
    '--color-typography-900': '38 38 39',
    '--color-typography-950': '23 23 23',


    '--color-outline-0': '253 254 254',
    '--color-outline-50': '243 243 243',
    '--color-outline-100': '230 230 230',
    '--color-outline-200': '221 220 219',
    '--color-outline-300': '211 211 211',
    '--color-outline-400': '165 163 163',
    '--color-outline-500': '140 141 141',
    '--color-outline-600': '115 116 116',
    '--color-outline-700': '83 82 82',
    '--color-outline-800': '65 65 65',
    '--color-outline-900': '39 38 36',
    '--color-outline-950': '26 23 23',


    '--color-background-0': '255 255 255',
    '--color-background-50': '246 246 246',
    '--color-background-100': '242 241 241',
    '--color-background-200': '220 219 219',
    '--color-background-300': '213 212 212',
    '--color-background-400': '162 163 163',
    '--color-background-500': '142 142 142',
    '--color-background-600': '116 116 116',
    '--color-background-700': '83 82 82',
    '--color-background-800': '65 64 64',
    '--color-background-900': '39 38 37',
    '--color-background-950': '18 18 18',


    '--color-background-error': '254 241 241',
    '--color-background-warning': '255 243 234',
    '--color-background-success': '237 252 242',
    '--color-background-muted': '247 248 247',
    '--color-background-info': '235 248 254',


    '--color-indicator-primary': '55 55 55',
    '--color-indicator-info': '83 153 236',
    '--color-indicator-error': '185 28 28',
  }),
  dark: vars({
    '--color-primary-0': '166 166 166',
    '--color-primary-50': '175 175 175',
    '--color-primary-100': '186 186 186',
    '--color-primary-200': '197 197 197',
    '--color-primary-300': '212 212 212',
    '--color-primary-400': '221 221 221',
    '--color-primary-500': '230 230 230',
    '--color-primary-600': '240 240 240',
    '--color-primary-700': '250 250 250',
    '--color-primary-800': '253 253 253',
    '--color-primary-900': '254 249 249',
    '--color-primary-950': '253 252 252',


    '--color-secondary-0': '20 20 20',
    '--color-secondary-50': '23 23 23',
    '--color-secondary-100': '31 31 31',
    '--color-secondary-200': '39 39 39',
    '--color-secondary-300': '44 44 44',
    '--color-secondary-400': '56 57 57',
    '--color-secondary-500': '63 64 64',
    '--color-secondary-600': '86 86 86',
    '--color-secondary-700': '110 110 110',
    '--color-secondary-800': '135 135 135',
    '--color-secondary-900': '150 150 150',
    '--color-secondary-950': '164 164 164',


    '--color-tertiary-0': '84 49 18',
    '--color-tertiary-50': '108 61 19',
    '--color-tertiary-100': '130 73 23',
    '--color-tertiary-200': '180 98 26',
    '--color-tertiary-300': '215 117 31',
    '--color-tertiary-400': '231 129 40',
    '--color-tertiary-500': '251 157 75',
    '--color-tertiary-600': '253 180 116',
    '--color-tertiary-700': '254 209 170',
    '--color-tertiary-800': '255 233 213',
    '--color-tertiary-900': '255 242 229',
    '--color-tertiary-950': '255 250 245',


    '--color-error-0': '83 19 19',
    '--color-error-50': '127 29 29',
    '--color-error-100': '153 27 27',
    '--color-error-200': '185 28 28',
    '--color-error-300': '220 38 38',
    '--color-error-400': '230 53 53',
    '--color-error-500': '239 68 68',
    '--color-error-600': '249 97 96',
    '--color-error-700': '229 91 90',
    '--color-error-800': '254 202 202',
    '--color-error-900': '254 226 226',
    '--color-error-950': '254 233 233',


    '--color-success-0': '27 50 36',
    '--color-success-50': '20 83 45',
    '--color-success-100': '22 101 52',
    '--color-success-200': '32 111 62',
    '--color-success-300': '42 121 72',
    '--color-success-400': '52 131 82',
    '--color-success-500': '72 151 102',
    '--color-success-600': '102 181 132',
    '--color-success-700': '132 211 162',
    '--color-success-800': '162 241 192',
    '--color-success-900': '202 255 232',
    '--color-success-950': '228 255 244',


    '--color-warning-0': '84 45 18',
    '--color-warning-50': '108 56 19',
    '--color-warning-100': '130 68 23',
    '--color-warning-200': '180 90 26',
    '--color-warning-300': '215 108 31',
    '--color-warning-400': '231 120 40',
    '--color-warning-500': '251 149 75',
    '--color-warning-600': '253 173 116',
    '--color-warning-700': '254 205 170',
    '--color-warning-800': '255 231 213',
    '--color-warning-900': '255 244 237',
    '--color-warning-950': '255 249 245',


    '--color-info-0': '3 38 56',
    '--color-info-50': '5 64 93',
    '--color-info-100': '7 90 131',
    '--color-info-200': '9 115 168',
    '--color-info-300': '11 141 205',
    '--color-info-400': '13 166 242',
    '--color-info-500': '50 180 244',
    '--color-info-600': '87 194 246',
    '--color-info-700': '124 207 248',
    '--color-info-800': '162 221 250',
    '--color-info-900': '199 235 252',
    '--color-info-950': '236 248 254',


    '--color-typography-0': '23 23 23',
    '--color-typography-50': '38 38 39',
    '--color-typography-100': '64 64 64',
    '--color-typography-200': '82 82 82',
    '--color-typography-300': '115 115 115',
    '--color-typography-400': '140 140 140',
    '--color-typography-500': '163 163 163',
    '--color-typography-600': '212 212 212',
    '--color-typography-700': '219 219 220',
    '--color-typography-800': '229 229 229',
    '--color-typography-900': '245 245 245',
    '--color-typography-950': '254 254 255',


    '--color-outline-0': '26 23 23',
    '--color-outline-50': '39 38 36',
    '--color-outline-100': '65 65 65',
    '--color-outline-200': '83 82 82',
    '--color-outline-300': '115 116 116',
    '--color-outline-400': '140 141 141',
    '--color-outline-500': '165 163 163',
    '--color-outline-600': '211 211 211',
    '--color-outline-700': '221 220 219',
    '--color-outline-800': '230 230 230',
    '--color-outline-900': '243 243 243',
    '--color-outline-950': '253 254 254',


    '--color-background-0': '18 18 18',
    '--color-background-50': '39 38 37',
    '--color-background-100': '65 64 64',
    '--color-background-200': '83 82 82',
    '--color-background-300': '116 116 116',
    '--color-background-400': '142 142 142',
    '--color-background-500': '162 163 163',
    '--color-background-600': '213 212 212',
    '--color-background-700': '229 228 228',
    '--color-background-800': '242 241 241',
    '--color-background-900': '246 246 246',
    '--color-background-950': '255 255 255',


    '--color-background-error': '66 43 43',
    '--color-background-warning': '65 47 35',
    '--color-background-success': '28 43 33',
    '--color-background-muted': '51 51 51',
    '--color-background-info': '26 40 46',


    '--color-indicator-primary': '247 247 247',
    '--color-indicator-info': '161 199 245',
    '--color-indicator-error': '232 70 69',
  }),
};
````

## File: components/ui/gluestack-ui-provider/index.tsx
````typescript
import React, { useEffect } from 'react';
import { config } from './config';
import { View, ViewProps } from 'react-native';
import { OverlayProvider } from '@gluestack-ui/overlay';
import { ToastProvider } from '@gluestack-ui/toast';
import { useColorScheme } from 'nativewind';

export type ModeType = 'light' | 'dark' | 'system';

export function GluestackUIProvider({
  mode = 'light',
  ...props
}: {
  mode?: ModeType;
  children?: React.ReactNode;
  style?: ViewProps['style'];
}) {
  const { colorScheme, setColorScheme } = useColorScheme();

  useEffect(() => {
    setColorScheme(mode);

  }, [mode]);

  return (
    <View
      style={[
        config[colorScheme!],
        { flex: 1, height: '100%', width: '100%' },
        props.style,
      ]}
    >
      <OverlayProvider>
        <ToastProvider>{props.children}</ToastProvider>
      </OverlayProvider>
    </View>
  );
}
````

## File: components/ui/gluestack-ui-provider/index.web.tsx
````typescript
'use client';
import React, { useEffect, useLayoutEffect } from 'react';
import { config } from './config';
import { OverlayProvider } from '@gluestack-ui/overlay';
import { ToastProvider } from '@gluestack-ui/toast';
import { setFlushStyles } from '@gluestack-ui/nativewind-utils/flush';
import { script } from './script';

export type ModeType = 'light' | 'dark' | 'system';

const variableStyleTagId = 'nativewind-style';
const createStyle = (styleTagId: string) => {
  const style = document.createElement('style');
  style.id = styleTagId;
  style.appendChild(document.createTextNode(''));
  return style;
};

export const useSafeLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export function GluestackUIProvider({
  mode = 'light',
  ...props
}: {
  mode?: ModeType;
  children?: React.ReactNode;
}) {
  let cssVariablesWithMode = ``;
  Object.keys(config).forEach((configKey) => {
    cssVariablesWithMode +=
      configKey === 'dark' ? `\n .dark {\n ` : `\n:root {\n`;
    const cssVariables = Object.keys(
      config[configKey as keyof typeof config]
    ).reduce((acc: string, curr: string) => {
      acc += `${curr}:${config[configKey as keyof typeof config][curr]}; `;
      return acc;
    }, '');
    cssVariablesWithMode += `${cssVariables} \n}`;
  });

  setFlushStyles(cssVariablesWithMode);

  const handleMediaQuery = React.useCallback((e: MediaQueryListEvent) => {
    script(e.matches ? 'dark' : 'light');
  }, []);

  useSafeLayoutEffect(() => {
    if (mode !== 'system') {
      const documentElement = document.documentElement;
      if (documentElement) {
        documentElement.classList.add(mode);
        documentElement.classList.remove(mode === 'light' ? 'dark' : 'light');
        documentElement.style.colorScheme = mode;
      }
    }
  }, [mode]);

  useSafeLayoutEffect(() => {
    if (mode !== 'system') return;
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    media.addListener(handleMediaQuery);

    return () => media.removeListener(handleMediaQuery);
  }, [handleMediaQuery]);

  useSafeLayoutEffect(() => {
    if (typeof window !== 'undefined') {
      const documentElement = document.documentElement;
      if (documentElement) {
        const head = documentElement.querySelector('head');
        let style = head?.querySelector(`[id='${variableStyleTagId}']`);
        if (!style) {
          style = createStyle(variableStyleTagId);
          style.innerHTML = cssVariablesWithMode;
          if (head) head.appendChild(style);
        }
      }
    }
  }, []);

  return (
    <>
      <script
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: `(${script.toString()})('${mode}')`,
        }}
      />
      <OverlayProvider>
        <ToastProvider>{props.children}</ToastProvider>
      </OverlayProvider>
    </>
  );
}
````

## File: components/ui/gluestack-ui-provider/script.ts
````typescript
export const script = (mode: string) => {
  const documentElement = document.documentElement;

  function getSystemColorMode() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  try {
    const isSystem = mode === 'system';
    const theme = isSystem ? getSystemColorMode() : mode;
    documentElement.classList.remove(theme === 'light' ? 'dark' : 'light');
    documentElement.classList.add(theme);
    documentElement.style.colorScheme = theme;
  } catch (e) {
    console.error(e);
  }
};
````

## File: components/ui/input/index.tsx
````typescript
'use client';
import React from 'react';
import { createInput } from '@gluestack-ui/input';
import { View, Pressable, TextInput } from 'react-native';
import { tva } from '@gluestack-ui/nativewind-utils/tva';
import {
  withStyleContext,
  useStyleContext,
} from '@gluestack-ui/nativewind-utils/withStyleContext';
import { cssInterop } from 'nativewind';
import type { VariantProps } from '@gluestack-ui/nativewind-utils';
import { PrimitiveIcon, UIIcon } from '@gluestack-ui/icon';

const SCOPE = 'INPUT';

const UIInput = createInput({
  Root: withStyleContext(View, SCOPE),
  Icon: UIIcon,
  Slot: Pressable,
  Input: TextInput,
});

cssInterop(PrimitiveIcon, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      height: true,
      width: true,
      fill: true,
      color: 'classNameColor',
      stroke: true,
    },
  },
});

const inputStyle = tva({
  base: 'border-background-300 flex-row overflow-hidden content-center data-[hover=true]:border-outline-400 data-[focus=true]:border-primary-700 data-[focus=true]:hover:border-primary-700 data-[disabled=true]:opacity-40 data-[disabled=true]:hover:border-background-300 items-center transition-all duration-200',

  variants: {
    size: {
      xl: 'h-12',
      lg: 'h-11',
      md: 'h-10',
      sm: 'h-9',
    },

    variant: {
      underlined:
        'rounded-none border-b data-[invalid=true]:border-b-2 data-[invalid=true]:border-error-700 data-[invalid=true]:hover:border-error-700 data-[invalid=true]:data-[focus=true]:border-error-700 data-[invalid=true]:data-[focus=true]:hover:border-error-700 data-[invalid=true]:data-[disabled=true]:hover:border-error-700',

      outline:
        'rounded border data-[invalid=true]:border-error-700 data-[invalid=true]:hover:border-error-700 data-[invalid=true]:data-[focus=true]:border-error-700 data-[invalid=true]:data-[focus=true]:hover:border-error-700 data-[invalid=true]:data-[disabled=true]:hover:border-error-700 data-[focus=true]:web:ring-1 data-[focus=true]:web:ring-inset data-[focus=true]:web:ring-indicator-primary data-[invalid=true]:web:ring-1 data-[invalid=true]:web:ring-inset data-[invalid=true]:web:ring-indicator-error data-[invalid=true]:data-[focus=true]:hover:web:ring-1 data-[invalid=true]:data-[focus=true]:hover:web:ring-inset data-[invalid=true]:data-[focus=true]:hover:web:ring-indicator-error data-[invalid=true]:data-[disabled=true]:hover:web:ring-1 data-[invalid=true]:data-[disabled=true]:hover:web:ring-inset data-[invalid=true]:data-[disabled=true]:hover:web:ring-indicator-error',

      rounded:
        'rounded-full border data-[invalid=true]:border-error-700 data-[invalid=true]:hover:border-error-700 data-[invalid=true]:data-[focus=true]:border-error-700 data-[invalid=true]:data-[focus=true]:hover:border-error-700 data-[invalid=true]:data-[disabled=true]:hover:border-error-700 data-[focus=true]:web:ring-1 data-[focus=true]:web:ring-inset data-[focus=true]:web:ring-indicator-primary data-[invalid=true]:web:ring-1 data-[invalid=true]:web:ring-inset data-[invalid=true]:web:ring-indicator-error data-[invalid=true]:data-[focus=true]:hover:web:ring-1 data-[invalid=true]:data-[focus=true]:hover:web:ring-inset data-[invalid=true]:data-[focus=true]:hover:web:ring-indicator-error data-[invalid=true]:data-[disabled=true]:hover:web:ring-1 data-[invalid=true]:data-[disabled=true]:hover:web:ring-inset data-[invalid=true]:data-[disabled=true]:hover:web:ring-indicator-error',
    },
  },
});

const inputIconStyle = tva({
  base: 'justify-center items-center text-typography-400 fill-none',
  parentVariants: {
    size: {
      '2xs': 'h-3 w-3',
      'xs': 'h-3.5 w-3.5',
      'sm': 'h-4 w-4',
      'md': 'h-[18px] w-[18px]',
      'lg': 'h-5 w-5',
      'xl': 'h-6 w-6',
    },
  },
});

const inputSlotStyle = tva({
  base: 'justify-center items-center web:disabled:cursor-not-allowed',
});

const inputFieldStyle = tva({
  base: 'flex-1 text-typography-900 py-0 px-3 placeholder:text-typography-500 h-full ios:leading-[0px] web:cursor-text web:data-[disabled=true]:cursor-not-allowed',

  parentVariants: {
    variant: {
      underlined: 'web:outline-0 web:outline-none px-0',
      outline: 'web:outline-0 web:outline-none',
      rounded: 'web:outline-0 web:outline-none px-4',
    },

    size: {
      '2xs': 'text-2xs',
      'xs': 'text-xs',
      'sm': 'text-sm',
      'md': 'text-base',
      'lg': 'text-lg',
      'xl': 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
    },
  },
});

type IInputProps = React.ComponentProps<typeof UIInput> &
  VariantProps<typeof inputStyle> & { className?: string };
const Input = React.forwardRef<React.ComponentRef<typeof UIInput>, IInputProps>(
  function Input(
    { className, variant = 'outline', size = 'md', ...props },
    ref
  ) {
    return (
      <UIInput
        ref={ref}
        {...props}
        className={inputStyle({ variant, size, class: className })}
        context={{ variant, size }}
      />
    );
  }
);

type IInputIconProps = React.ComponentProps<typeof UIInput.Icon> &
  VariantProps<typeof inputIconStyle> & {
    className?: string;
    height?: number;
    width?: number;
  };

const InputIcon = React.forwardRef<
  React.ComponentRef<typeof UIInput.Icon>,
  IInputIconProps
>(function InputIcon({ className, size, ...props }, ref) {
  const { size: parentSize } = useStyleContext(SCOPE);

  if (typeof size === 'number') {
    return (
      <UIInput.Icon
        ref={ref}
        {...props}
        className={inputIconStyle({ class: className })}
        size={size}
      />
    );
  } else if (
    (props.height !== undefined || props.width !== undefined) &&
    size === undefined
  ) {
    return (
      <UIInput.Icon
        ref={ref}
        {...props}
        className={inputIconStyle({ class: className })}
      />
    );
  }
  return (
    <UIInput.Icon
      ref={ref}
      {...props}
      className={inputIconStyle({
        parentVariants: {
          size: parentSize,
        },
        class: className,
      })}
    />
  );
});

type IInputSlotProps = React.ComponentProps<typeof UIInput.Slot> &
  VariantProps<typeof inputSlotStyle> & { className?: string };

const InputSlot = React.forwardRef<
  React.ComponentRef<typeof UIInput.Slot>,
  IInputSlotProps
>(function InputSlot({ className, ...props }, ref) {
  return (
    <UIInput.Slot
      ref={ref}
      {...props}
      className={inputSlotStyle({
        class: className,
      })}
    />
  );
});

type IInputFieldProps = React.ComponentProps<typeof UIInput.Input> &
  VariantProps<typeof inputFieldStyle> & { className?: string };

const InputField = React.forwardRef<
  React.ComponentRef<typeof UIInput.Input>,
  IInputFieldProps
>(function InputField({ className, ...props }, ref) {
  const { variant: parentVariant, size: parentSize } = useStyleContext(SCOPE);

  return (
    <UIInput.Input
      ref={ref}
      {...props}
      className={inputFieldStyle({
        parentVariants: {
          variant: parentVariant,
          size: parentSize,
        },
        class: className,
      })}
    />
  );
});

Input.displayName = 'Input';
InputIcon.displayName = 'InputIcon';
InputSlot.displayName = 'InputSlot';
InputField.displayName = 'InputField';

export { Input, InputField, InputIcon, InputSlot };
````

## File: components/ui/ModernBackground.tsx
````typescript
import React from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Circle, Path } from 'react-native-svg';

interface ModernBackgroundProps {
  children: React.ReactNode;
  variant?: 'default' | 'auth' | 'minimal';
}

export default function ModernBackground({
  children,
  variant = 'default'
}: ModernBackgroundProps) {
  const renderBackgroundElements = () => {
    switch (variant) {
      case 'auth':
        return (
          <Svg
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: -1,
            }}
            width="100%"
            height="100%"
            viewBox="0 0 400 800"
          >
            <Defs>
              <LinearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#667eea" stopOpacity={0.1} />
                <Stop offset="50%" stopColor="#764ba2" stopOpacity={0.05} />
                <Stop offset="100%" stopColor="#f093fb" stopOpacity={0.1} />
              </LinearGradient>
              <LinearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <Stop offset="0%" stopColor="#667eea" stopOpacity={0.15} />
                <Stop offset="100%" stopColor="#764ba2" stopOpacity={0.05} />
              </LinearGradient>
            </Defs>

            {}
            <Path
              d="M0,0 L400,0 L400,800 L0,800 Z"
              fill="url(#bgGradient)"
            />

            {}
            <Circle
              cx="80"
              cy="120"
              r="40"
              fill="url(#circleGradient)"
            />
            <Circle
              cx="320"
              cy="200"
              r="25"
              fill="url(#circleGradient)"
            />
            <Circle
              cx="60"
              cy="600"
              r="30"
              fill="url(#circleGradient)"
            />
            <Circle
              cx="350"
              cy="650"
              r="35"
              fill="url(#circleGradient)"
            />

            {}
            <Path
              d="M-50,300 Q100,250 200,300 T400,320 L400,400 Q300,380 200,400 T-50,380 Z"
              fill="url(#circleGradient)"
            />
          </Svg>
        );

      case 'minimal':
        return (
          <View
            className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50"
            style={{ zIndex: -1 }}
          />
        );

      default:
        return (
          <View
            className="absolute inset-0 bg-gradient-to-br from-background-0 to-background-50"
            style={{ zIndex: -1 }}
          />
        );
    }
  };

  return (
    <View className="flex-1 relative">
      {renderBackgroundElements()}
      {children}
    </View>
  );
}
````

## File: database/schema.sql
````sql
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';


CREATE TYPE user_role AS ENUM ('management', 'teacher', 'student', 'parent');
CREATE TYPE subscription_plan AS ENUM ('starter', 'growing', 'enterprise');
CREATE TYPE subscription_status AS ENUM ('trial', 'active', 'cancelled', 'expired');


CREATE TABLE IF NOT EXISTS schools (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT,
  city VARCHAR(100),
  province VARCHAR(100),
  license_number VARCHAR(100),
  student_count_estimate INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  role user_role NOT NULL DEFAULT 'management',
  school_id UUID REFERENCES schools(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE NOT NULL,
  plan subscription_plan NOT NULL DEFAULT 'starter',
  status subscription_status NOT NULL DEFAULT 'trial',
  trial_ends_at TIMESTAMP WITH TIME ZONE,
  current_period_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  current_period_end TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() + INTERVAL '30 days'),
  student_limit INTEGER NOT NULL DEFAULT 50,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);


CREATE TABLE IF NOT EXISTS teacher_invitations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE NOT NULL,
  invited_by UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  email VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  invitation_token UUID DEFAULT gen_random_uuid(),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() + INTERVAL '7 days'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  accepted_at TIMESTAMP WITH TIME ZONE
);


CREATE TABLE IF NOT EXISTS students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE NOT NULL,
  student_id VARCHAR(50) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  date_of_birth DATE,
  gender VARCHAR(10),
  address TEXT,
  parent_phone VARCHAR(20),
  parent_email VARCHAR(255),
  class_name VARCHAR(100),
  enrollment_date DATE DEFAULT CURRENT_DATE,
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(school_id, student_id)
);


CREATE TABLE IF NOT EXISTS classes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  school_id UUID REFERENCES schools(id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(100) NOT NULL,
  grade_level INTEGER,
  teacher_id UUID REFERENCES users(id) ON DELETE SET NULL,
  academic_year VARCHAR(20) NOT NULL,
  student_capacity INTEGER DEFAULT 30,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(school_id, name, academic_year)
);


CREATE TABLE IF NOT EXISTS student_classes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE NOT NULL,
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE NOT NULL,
  academic_year VARCHAR(20) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(student_id, class_id, academic_year)
);


CREATE TABLE IF NOT EXISTS attendance (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE NOT NULL,
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'present',
  notes TEXT,
  recorded_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(student_id, class_id, date)
);


CREATE INDEX IF NOT EXISTS idx_users_school_id ON users(school_id);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_subscriptions_school_id ON subscriptions(school_id);
CREATE INDEX IF NOT EXISTS idx_teacher_invitations_school_id ON teacher_invitations(school_id);
CREATE INDEX IF NOT EXISTS idx_teacher_invitations_email ON teacher_invitations(email);
CREATE INDEX IF NOT EXISTS idx_teacher_invitations_token ON teacher_invitations(invitation_token);
CREATE INDEX IF NOT EXISTS idx_students_school_id ON students(school_id);
CREATE INDEX IF NOT EXISTS idx_students_student_id ON students(school_id, student_id);
CREATE INDEX IF NOT EXISTS idx_classes_school_id ON classes(school_id);
CREATE INDEX IF NOT EXISTS idx_classes_teacher_id ON classes(teacher_id);
CREATE INDEX IF NOT EXISTS idx_student_classes_student_id ON student_classes(student_id);
CREATE INDEX IF NOT EXISTS idx_student_classes_class_id ON student_classes(class_id);
CREATE INDEX IF NOT EXISTS idx_attendance_student_id ON attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_class_id ON attendance(class_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(date);


ALTER TABLE schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE teacher_invitations ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;




CREATE POLICY "Users can view their own school" ON schools
  FOR SELECT USING (
    id IN (
      SELECT school_id FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Management can update their school" ON schools
  FOR UPDATE USING (
    id IN (
      SELECT school_id FROM users
      WHERE id = auth.uid() AND role = 'management'
    )
  );

CREATE POLICY "Management can insert schools" ON schools
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT id FROM users WHERE role = 'management'
    )
  );


CREATE POLICY "Users can view users in their school" ON users
  FOR SELECT USING (
    school_id IN (
      SELECT school_id FROM users WHERE id = auth.uid()
    ) OR id = auth.uid()
  );

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (id = auth.uid());

CREATE POLICY "Management can update users in their school" ON users
  FOR UPDATE USING (
    school_id IN (
      SELECT school_id FROM users
      WHERE id = auth.uid() AND role = 'management'
    )
  );

CREATE POLICY "Users can insert their own profile" ON users
  FOR INSERT WITH CHECK (id = auth.uid());


CREATE POLICY "Users can view their school's subscription" ON subscriptions
  FOR SELECT USING (
    school_id IN (
      SELECT school_id FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Management can manage their school's subscription" ON subscriptions
  FOR ALL USING (
    school_id IN (
      SELECT school_id FROM users
      WHERE id = auth.uid() AND role = 'management'
    )
  );


CREATE POLICY "Management can manage teacher invitations" ON teacher_invitations
  FOR ALL USING (
    school_id IN (
      SELECT school_id FROM users
      WHERE id = auth.uid() AND role = 'management'
    )
  );

CREATE POLICY "Invited teachers can view their invitation" ON teacher_invitations
  FOR SELECT USING (
    email = (
      SELECT email FROM auth.users WHERE id = auth.uid()
    )
  );


CREATE POLICY "School users can view students" ON students
  FOR SELECT USING (
    school_id IN (
      SELECT school_id FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Management and teachers can manage students" ON students
  FOR ALL USING (
    school_id IN (
      SELECT school_id FROM users
      WHERE id = auth.uid() AND role IN ('management', 'teacher')
    )
  );


CREATE POLICY "School users can view classes" ON classes
  FOR SELECT USING (
    school_id IN (
      SELECT school_id FROM users WHERE id = auth.uid()
    )
  );

CREATE POLICY "Management can manage all classes" ON classes
  FOR ALL USING (
    school_id IN (
      SELECT school_id FROM users
      WHERE id = auth.uid() AND role = 'management'
    )
  );

CREATE POLICY "Teachers can manage their own classes" ON classes
  FOR ALL USING (
    teacher_id = auth.uid() OR
    school_id IN (
      SELECT school_id FROM users
      WHERE id = auth.uid() AND role = 'management'
    )
  );


CREATE POLICY "School users can view student-class relationships" ON student_classes
  FOR SELECT USING (
    student_id IN (
      SELECT id FROM students
      WHERE school_id IN (
        SELECT school_id FROM users WHERE id = auth.uid()
      )
    )
  );

CREATE POLICY "Management and teachers can manage student-class relationships" ON student_classes
  FOR ALL USING (
    student_id IN (
      SELECT id FROM students
      WHERE school_id IN (
        SELECT school_id FROM users
        WHERE id = auth.uid() AND role IN ('management', 'teacher')
      )
    )
  );


CREATE POLICY "School users can view attendance" ON attendance
  FOR SELECT USING (
    student_id IN (
      SELECT id FROM students
      WHERE school_id IN (
        SELECT school_id FROM users WHERE id = auth.uid()
      )
    )
  );

CREATE POLICY "Teachers can manage attendance for their classes" ON attendance
  FOR ALL USING (
    class_id IN (
      SELECT id FROM classes
      WHERE teacher_id = auth.uid() OR
      school_id IN (
        SELECT school_id FROM users
        WHERE id = auth.uid() AND role = 'management'
      )
    )
  );


CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';


CREATE TRIGGER update_schools_updated_at BEFORE UPDATE ON schools
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON classes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();


CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO users (id, email, full_name, phone, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'phone', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'management')::user_role
  );
  RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;


CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();


CREATE OR REPLACE FUNCTION create_initial_subscription()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO subscriptions (school_id, plan, status, trial_ends_at, student_limit)
  VALUES (
    NEW.id,
    'starter',
    'trial',
    NOW() + INTERVAL '14 days',
    50
  );
  RETURN NEW;
END;
$$ language 'plpgsql' SECURITY DEFINER;


CREATE TRIGGER on_school_created
  AFTER INSERT ON schools
  FOR EACH ROW EXECUTE FUNCTION create_initial_subscription();
````




## File: gluestack-ui.config.json
````json
{
  "tailwind": {
    "config": "tailwind.config.js",
    "css": "global.css"
  },
  "app": {
    "entry": "app/_layout.tsx",
    "components": "components/ui"
  }
}
````

## File: nativewind-env.d.ts
````typescript

````

## File: store/authStore.ts
````typescript
import { create } from 'zustand';
import { supabase } from '../utils/supabase';
import { User, Session } from '@supabase/supabase-js';

export type UserRole = 'management' | 'teacher' | 'student' | 'parent';

export interface School {
  id: string;
  name: string;
  type?: string;
  address?: string;
  city?: string;
  province?: string;
  license_number?: string;
  student_count_estimate?: number;
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  role: UserRole;
  school_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  school_id: string;
  plan: 'starter' | 'growing' | 'enterprise';
  status: 'trial' | 'active' | 'cancelled' | 'expired';
  trial_ends_at?: string;
  current_period_start: string;
  current_period_end: string;
  student_limit: number;
}

export interface AuthState {

  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  school: School | null;
  subscription: Subscription | null;
  loading: boolean;
  error: string | null;


  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, userData: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;


  updateProfile: (updates: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  loadUserProfile: () => Promise<void>;


  createSchool: (schoolData: Omit<School, 'id' | 'created_at'>) => Promise<{ success: boolean; schoolId?: string; error?: string }>;
  updateSchool: (updates: Partial<School>) => Promise<{ success: boolean; error?: string }>;


  loadSubscription: () => Promise<void>;


  initialize: () => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({

  user: null,
  session: null,
  profile: null,
  school: null,
  subscription: null,
  loading: false,
  error: null,


  signIn: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        set({ error: error.message, loading: false });
        return { success: false, error: error.message };
      }

      if (data.user && data.session) {
        set({ user: data.user, session: data.session });
        await get().loadUserProfile();
        return { success: true };
      }

      return { success: false, error: 'Login failed' };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      set({ error: errorMessage, loading: false });
      return { success: false, error: errorMessage };
    }
  },

  signUp: async (email: string, password: string, userData: Partial<UserProfile>) => {
    try {
      set({ loading: true, error: null });

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.full_name,
            phone: userData.phone,
            role: userData.role || 'management',
          },
        },
      });

      if (error) {
        set({ error: error.message, loading: false });
        return { success: false, error: error.message };
      }

      if (data.user) {
        set({ user: data.user, session: data.session });
        return { success: true };
      }

      return { success: false, error: 'Registration failed' };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      set({ error: errorMessage, loading: false });
      return { success: false, error: errorMessage };
    }
  },

  signOut: async () => {
    try {
      set({ loading: true });
      await supabase.auth.signOut();
      set({
        user: null,
        session: null,
        profile: null,
        school: null,
        subscription: null,
        loading: false,
        error: null
      });
    } catch (error) {
      console.error('Sign out error:', error);
      set({ loading: false });
    }
  },

  resetPassword: async (email: string) => {
    try {
      set({ loading: true, error: null });

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'schoolsync://reset-password',
      });

      if (error) {
        set({ error: error.message, loading: false });
        return { success: false, error: error.message };
      }

      set({ loading: false });
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      set({ error: errorMessage, loading: false });
      return { success: false, error: errorMessage };
    }
  },


  updateProfile: async (updates: Partial<UserProfile>) => {
    try {
      set({ loading: true, error: null });
      const { profile } = get();

      if (!profile) {
        set({ error: 'No profile found', loading: false });
        return { success: false, error: 'No profile found' };
      }

      const { data, error } = await supabase
        .from('users')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', profile.id)
        .select()
        .single();

      if (error) {
        set({ error: error.message, loading: false });
        return { success: false, error: error.message };
      }

      set({ profile: data, loading: false });
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      set({ error: errorMessage, loading: false });
      return { success: false, error: errorMessage };
    }
  },

  loadUserProfile: async () => {
    try {
      const { user } = get();
      if (!user) return;

      set({ loading: true });

      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Profile load error:', profileError);
        set({ loading: false });
        return;
      }

      set({ profile });


      if (profile.school_id) {
        const { data: school } = await supabase
          .from('schools')
          .select('*')
          .eq('id', profile.school_id)
          .single();

        if (school) {
          set({ school });
          await get().loadSubscription();
        }
      }

      set({ loading: false });
    } catch (error) {
      console.error('Load profile error:', error);
      set({ loading: false });
    }
  },


  createSchool: async (schoolData: Omit<School, 'id' | 'created_at'>) => {
    try {
      set({ loading: true, error: null });

      const { data, error } = await supabase
        .from('schools')
        .insert([schoolData])
        .select()
        .single();

      if (error) {
        set({ error: error.message, loading: false });
        return { success: false, error: error.message };
      }

      set({ school: data, loading: false });


      await get().updateProfile({ school_id: data.id });

      return { success: true, schoolId: data.id };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      set({ error: errorMessage, loading: false });
      return { success: false, error: errorMessage };
    }
  },

  updateSchool: async (updates: Partial<School>) => {
    try {
      set({ loading: true, error: null });
      const { school } = get();

      if (!school) {
        set({ error: 'No school found', loading: false });
        return { success: false, error: 'No school found' };
      }

      const { data, error } = await supabase
        .from('schools')
        .update(updates)
        .eq('id', school.id)
        .select()
        .single();

      if (error) {
        set({ error: error.message, loading: false });
        return { success: false, error: error.message };
      }

      set({ school: data, loading: false });
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      set({ error: errorMessage, loading: false });
      return { success: false, error: errorMessage };
    }
  },


  loadSubscription: async () => {
    try {
      const { school } = get();
      if (!school) return;

      const { data: subscription } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('school_id', school.id)
        .single();

      if (subscription) {
        set({ subscription });
      }
    } catch (error) {
      console.error('Load subscription error:', error);
    }
  },


  initialize: async () => {
    try {
      set({ loading: true });


      const { data: { session } } = await supabase.auth.getSession();

      if (session) {
        set({ session, user: session.user });
        await get().loadUserProfile();
      }


      supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          set({ session, user: session.user });
          await get().loadUserProfile();
        } else if (event === 'SIGNED_OUT') {
          set({
            user: null,
            session: null,
            profile: null,
            school: null,
            subscription: null
          });
        }
      });

      set({ loading: false });
    } catch (error) {
      console.error('Initialize error:', error);
      set({ loading: false });
    }
  },

  clearError: () => set({ error: null }),
  setLoading: (loading: boolean) => set({ loading }),
}));
````

## File: app-env.d.ts
````typescript

````

## File: app.json
````json
{
  "expo": {
    "name": "SchoolSyncV2",
    "slug": "SchoolSyncV2",
    "version": "1.0.0",

    "scheme": "SchoolSyncV2",
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/favicon.png"
    },
    "plugins": ["expo-router"],
    "experiments": {
      "typedRoutes": true,

      "tsconfigPaths": true
    },

    "orientation": "portrait",
    "icon": "./assets/icon.png",

    "userInterfaceStyle": "light",

    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    }
  }
}
````

## File: app/_layout.tsx
````typescript
import '../global.css';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { GluestackUIProvider } from '../components/ui/gluestack-ui-provider';

export const unstable_settings = {

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
````

## File: app/(drawer)/_layout.tsx
````typescript
import React from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Drawer } from 'expo-router/drawer';

import { HeaderButton } from '../../components/HeaderButton';

const DrawerLayout = () => {
  return (
    <Drawer>
      <Drawer.Screen
        name="index"
        options={{
          headerTitle: 'Home',
          drawerLabel: 'Home',
          drawerIcon: ({ size, color }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="(tabs)"
        options={{
          headerTitle: 'Tabs',
          drawerLabel: 'Tabs',
          drawerIcon: ({ size, color }) => (
            <MaterialIcons name="border-bottom" size={size} color={color} />
          ),
          headerRight: () => (
            <Link href="/modal" asChild>
              <HeaderButton />
            </Link>
          ),
        }}
      />
    </Drawer>
  );
};

export default DrawerLayout;
````

## File: app/(drawer)/(tabs)/_layout.tsx
````typescript
import { Tabs } from 'expo-router';
import { TabBarIcon } from '~/components/TabBarIcon';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: 'black',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Tab One',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </Tabs>
  );
}
````

## File: app/(drawer)/(tabs)/index.tsx
````typescript
import { Stack } from 'expo-router';

import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tab One' }} />
      <Container>
        <ScreenContent path="app/(drawer)/(tabs)/index.tsx" title="Tab One" />
      </Container>
    </>
  );
}
````

## File: app/(drawer)/(tabs)/two.tsx
````typescript
import { Stack } from 'expo-router';

import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tab Two' }} />
      <Container>
        <ScreenContent path="app/(drawer)/(tabs)/two.tsx" title="Tab Two" />
      </Container>
    </>
  );
}
````

## File: app/(drawer)/index.tsx
````typescript
import { Stack } from 'expo-router';
import { View, ScrollView, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '~/components/ui/card';
import { Button, ButtonText } from '~/components/ui/button';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <SafeAreaView className="flex-1 bg-background">
        <ScrollView className="flex-1 p-4">
          {}
          <View className="mb-6">
            <Text className="text-2xl font-bold text-typography-900 mb-2">
              Dashboard SchoolSync
            </Text>
            <Text className="text-base text-typography-600">
              Selamat datang di sistem manajemen pesantren
            </Text>
          </View>

          {}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-typography-900 mb-3">
              Statistik Cepat
            </Text>
            <View className="flex-row flex-wrap gap-3">
              <Card className="flex-1 min-w-[150px] p-4">
                <Text className="text-2xl font-bold text-primary-600 mb-1">
                  150
                </Text>
                <Text className="text-sm text-typography-600">
                  Total Santri
                </Text>
              </Card>
              <Card className="flex-1 min-w-[150px] p-4">
                <Text className="text-2xl font-bold text-success-600 mb-1">
                  25
                </Text>
                <Text className="text-sm text-typography-600">
                  Ustadz/Ustadzah
                </Text>
              </Card>
            </View>
          </View>

          {}
          <View className="mb-6">
            <Text className="text-lg font-semibold text-typography-900 mb-3">
              Aksi Cepat
            </Text>
            <View className="gap-3">
              <Button variant="outline" size="lg">
                <ButtonText>Kelola Data Santri</ButtonText>
              </Button>
              <Button variant="outline" size="lg">
                <ButtonText>Lihat Jadwal Pelajaran</ButtonText>
              </Button>
              <Button variant="outline" size="lg">
                <ButtonText>Laporan Keuangan</ButtonText>
              </Button>
            </View>
          </View>

          {}
          <View>
            <Text className="text-lg font-semibold text-typography-900 mb-3">
              Aktivitas Terbaru
            </Text>
            <Card className="p-4">
              <Text className="text-sm text-typography-600 mb-2">
                Belum ada aktivitas terbaru
              </Text>
              <Text className="text-xs text-typography-500">
                Aktivitas akan muncul di sini setelah Anda mulai menggunakan sistem
              </Text>
            </Card>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
````

## File: app/+html.tsx
````typescript
import { ScrollViewStyleReset } from 'expo-router/html';





export default function Root({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {



}
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1.00001,viewport-fit=cover"
        />
        {


}
        <ScrollViewStyleReset />

        {}
        <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} />
        {}
      </head>
      <body>{children}</body>
    </html>
  );
}

const responsiveBackground = `
body {
  background-color: #fff;
}
@media (prefers-color-scheme: dark) {
  body {
    background-color: #000;
  }
}`;
````

## File: app/+not-found.tsx
````typescript
import { Link, Stack } from 'expo-router';

import { Text } from 'react-native';

import { Container } from '~/components/Container';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Container>
        <Text className={styles.title}>{"This screen doesn't exist."}</Text>
        <Link href="/" className={styles.link}>
          <Text className={styles.linkText}>Go to home screen!</Text>
        </Link>
      </Container>
    </>
  );
}

const styles = {
  title: `text-xl font-bold`,
  link: `mt-4 pt-4`,
  linkText: `text-base text-[#2e78b7]`,
};
````

## File: app/modal.tsx
````typescript
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';

import { ScreenContent } from '~/components/ScreenContent';

export default function Modal() {
  return (
    <>
      <ScreenContent path="app/modal.tsx" title="Modal"></ScreenContent>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </>
  );
}
````

## File: babel.config.js
````javascript
module.exports = function (api) {
  api.cache(true);
  let plugins = [];

  plugins.push('react-native-reanimated/plugin');

  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],

    plugins,
  };
};
````

## File: cesconfig.json
````json
{
  "cesVersion": "2.18.3",
  "projectName": "SchoolSyncV2",
  "packages": [
    {
      "name": "expo-router",
      "type": "navigation",
      "options": {
        "type": "drawer + tabs"
      }
    },
    {
      "name": "nativewind",
      "type": "styling"
    },
    {
      "name": "zustand",
      "type": "state-management"
    },
    {
      "name": "supabase",
      "type": "authentication"
    }
  ],
  "flags": {
    "noGit": false,
    "noInstall": false,
    "overwrite": false,
    "importAlias": true,
    "packageManager": "npm",
    "eas": false,
    "publish": false
  },
  "packageManager": {
    "type": "npm",
    "version": "10.9.0"
  },
  "os": {
    "type": "Windows_NT",
    "platform": "win32",
    "arch": "x64",
    "kernelVersion": "10.0.26100"
  }
}
````

## File: components/Button.tsx
````typescript
import { forwardRef } from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

type ButtonProps = {
  title: string;
} & TouchableOpacityProps;

export const Button = forwardRef<View, ButtonProps>(({ title, ...touchableProps }, ref) => {
  return (
    <TouchableOpacity
      ref={ref}
      {...touchableProps}
      className={`${styles.button} ${touchableProps.className}`}>
      <Text className={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
});

Button.displayName = 'Button';

const styles = {
  button: 'items-center bg-indigo-500 rounded-[28px] shadow-md p-4',
  buttonText: 'text-white text-lg font-semibold text-center',
};
````

## File: components/Container.tsx
````typescript
import { SafeAreaView } from 'react-native';

export const Container = ({ children }: { children: React.ReactNode }) => {
  return <SafeAreaView className={styles.container}>{children}</SafeAreaView>;
};

const styles = {
  container: 'flex flex-1 m-6',
};
````

## File: components/EditScreenInfo.tsx
````typescript
import { Text, View } from 'react-native';

export const EditScreenInfo = ({ path }: { path: string }) => {
  const title = 'Open up the code for this screen:';
  const description =
    'Change any of the text, save the file, and your app will automatically update.';

  return (
    <View>
      <View className={styles.getStartedContainer}>
        <Text className={styles.getStartedText}>{title}</Text>
        <View className={styles.codeHighlightContainer + styles.homeScreenFilename}>
          <Text>{path}</Text>
        </View>
        <Text className={styles.getStartedText}>{description}</Text>
      </View>
    </View>
  );
};

const styles = {
  codeHighlightContainer: `rounded-md px-1`,
  getStartedContainer: `items-center mx-12`,
  getStartedText: `text-lg leading-6 text-center`,
  helpContainer: `items-center mx-5 mt-4`,
  helpLink: `py-4`,
  helpLinkText: `text-center`,
  homeScreenFilename: `my-2`,
};
````

## File: components/HeaderButton.tsx
````typescript
import { forwardRef } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Pressable, StyleSheet } from 'react-native';

export const HeaderButton = forwardRef<typeof Pressable, { onPress?: () => void }>(
  ({ onPress }, ref) => {
    return (
      <Pressable onPress={onPress}>
        {({ pressed }) => (
          <FontAwesome
            name="info-circle"
            size={25}
            color="gray"
            style={[
              styles.headerRight,
              {
                opacity: pressed ? 0.5 : 1,
              },
            ]}
          />
        )}
      </Pressable>
    );
  }
);

HeaderButton.displayName = 'HeaderButton';

export const styles = StyleSheet.create({
  headerRight: {
    marginRight: 15,
  },
});
````

## File: components/ScreenContent.tsx
````typescript
import { Text, View } from 'react-native';

import { EditScreenInfo } from './EditScreenInfo';

type ScreenContentProps = {
  title: string;
  path: string;
  children?: React.ReactNode;
};

export const ScreenContent = ({ title, path, children }: ScreenContentProps) => {
  return (
    <View className={styles.container}>
      <Text className={styles.title}>{title}</Text>
      <View className={styles.separator} />
      <EditScreenInfo path={path} />
      {children}
    </View>
  );
};
const styles = {
  container: `items-center flex-1 justify-center`,
  separator: `h-[1px] my-7 w-4/5 bg-gray-200`,
  title: `text-xl font-bold`,
};
````

## File: components/TabBarIcon.tsx
````typescript
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { StyleSheet } from 'react-native';

export const TabBarIcon = (props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) => {
  return <FontAwesome size={28} style={styles.tabBarIcon} {...props} />;
};

export const styles = StyleSheet.create({
  tabBarIcon: {
    marginBottom: -3,
  },
});
````

## File: eslint.config.js
````javascript
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*'],
  },
  {
    rules: {
      'react/display-name': 'off',
    },
  },
]);
````

## File: global.css
````css
@tailwind base;
@tailwind components;
@tailwind utilities;
````

## File: metro.config.js
````javascript
const { getDefaultConfig } = require('expo/metro-config');

const { withNativeWind } = require('nativewind/metro');



const config = getDefaultConfig(__dirname);

config.resolver.unstable_enablePackageExports = false;

module.exports = withNativeWind(config, { input: './global.css' });
````



## File: store/store.ts
````typescript
import { create } from 'zustand';

export interface BearState {
  bears: number;
  increasePopulation: () => void;
  removeAllBears: () => void;
  updateBears: (newBears: number) => void;
}

export const useStore = create<BearState>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}));
````

## File: tailwind.config.js
````javascript
import gluestackPlugin from '@gluestack-ui/nativewind-utils/tailwind-plugin';


module.exports = {
  darkMode: process.env.DARK_MODE ? process.env.DARK_MODE : 'media',
  content: [
    './app/**/*.{html,js,jsx,ts,tsx}',
    './components/**/*.{html,js,jsx,ts,tsx,mdx}',
    './store/**/*.{html,js,jsx,ts,tsx,mdx}',
    './utils/**/*.{html,js,jsx,ts,tsx,mdx}',
  ],
  presets: [require('nativewind/preset')],
  safelist: [
    {
      pattern:
        /(bg|border|text|stroke|fill)-(primary|secondary|tertiary|error|success|warning|info|typography|outline|background|indicator)-(0|50|100|200|300|400|500|600|700|800|900|950|white|gray|black|error|warning|muted|success|info|light|dark|primary)/,
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          0: 'rgb(var(--color-primary-0)/<alpha-value>)',
          50: 'rgb(var(--color-primary-50)/<alpha-value>)',
          100: 'rgb(var(--color-primary-100)/<alpha-value>)',
          200: 'rgb(var(--color-primary-200)/<alpha-value>)',
          300: 'rgb(var(--color-primary-300)/<alpha-value>)',
          400: 'rgb(var(--color-primary-400)/<alpha-value>)',
          500: 'rgb(var(--color-primary-500)/<alpha-value>)',
          600: 'rgb(var(--color-primary-600)/<alpha-value>)',
          700: 'rgb(var(--color-primary-700)/<alpha-value>)',
          800: 'rgb(var(--color-primary-800)/<alpha-value>)',
          900: 'rgb(var(--color-primary-900)/<alpha-value>)',
          950: 'rgb(var(--color-primary-950)/<alpha-value>)',
        },
        secondary: {
          0: 'rgb(var(--color-secondary-0)/<alpha-value>)',
          50: 'rgb(var(--color-secondary-50)/<alpha-value>)',
          100: 'rgb(var(--color-secondary-100)/<alpha-value>)',
          200: 'rgb(var(--color-secondary-200)/<alpha-value>)',
          300: 'rgb(var(--color-secondary-300)/<alpha-value>)',
          400: 'rgb(var(--color-secondary-400)/<alpha-value>)',
          500: 'rgb(var(--color-secondary-500)/<alpha-value>)',
          600: 'rgb(var(--color-secondary-600)/<alpha-value>)',
          700: 'rgb(var(--color-secondary-700)/<alpha-value>)',
          800: 'rgb(var(--color-secondary-800)/<alpha-value>)',
          900: 'rgb(var(--color-secondary-900)/<alpha-value>)',
          950: 'rgb(var(--color-secondary-950)/<alpha-value>)',
        },
        tertiary: {
          50: 'rgb(var(--color-tertiary-50)/<alpha-value>)',
          100: 'rgb(var(--color-tertiary-100)/<alpha-value>)',
          200: 'rgb(var(--color-tertiary-200)/<alpha-value>)',
          300: 'rgb(var(--color-tertiary-300)/<alpha-value>)',
          400: 'rgb(var(--color-tertiary-400)/<alpha-value>)',
          500: 'rgb(var(--color-tertiary-500)/<alpha-value>)',
          600: 'rgb(var(--color-tertiary-600)/<alpha-value>)',
          700: 'rgb(var(--color-tertiary-700)/<alpha-value>)',
          800: 'rgb(var(--color-tertiary-800)/<alpha-value>)',
          900: 'rgb(var(--color-tertiary-900)/<alpha-value>)',
          950: 'rgb(var(--color-tertiary-950)/<alpha-value>)',
        },
        error: {
          0: 'rgb(var(--color-error-0)/<alpha-value>)',
          50: 'rgb(var(--color-error-50)/<alpha-value>)',
          100: 'rgb(var(--color-error-100)/<alpha-value>)',
          200: 'rgb(var(--color-error-200)/<alpha-value>)',
          300: 'rgb(var(--color-error-300)/<alpha-value>)',
          400: 'rgb(var(--color-error-400)/<alpha-value>)',
          500: 'rgb(var(--color-error-500)/<alpha-value>)',
          600: 'rgb(var(--color-error-600)/<alpha-value>)',
          700: 'rgb(var(--color-error-700)/<alpha-value>)',
          800: 'rgb(var(--color-error-800)/<alpha-value>)',
          900: 'rgb(var(--color-error-900)/<alpha-value>)',
          950: 'rgb(var(--color-error-950)/<alpha-value>)',
        },
        success: {
          0: 'rgb(var(--color-success-0)/<alpha-value>)',
          50: 'rgb(var(--color-success-50)/<alpha-value>)',
          100: 'rgb(var(--color-success-100)/<alpha-value>)',
          200: 'rgb(var(--color-success-200)/<alpha-value>)',
          300: 'rgb(var(--color-success-300)/<alpha-value>)',
          400: 'rgb(var(--color-success-400)/<alpha-value>)',
          500: 'rgb(var(--color-success-500)/<alpha-value>)',
          600: 'rgb(var(--color-success-600)/<alpha-value>)',
          700: 'rgb(var(--color-success-700)/<alpha-value>)',
          800: 'rgb(var(--color-success-800)/<alpha-value>)',
          900: 'rgb(var(--color-success-900)/<alpha-value>)',
          950: 'rgb(var(--color-success-950)/<alpha-value>)',
        },
        warning: {
          0: 'rgb(var(--color-warning-0)/<alpha-value>)',
          50: 'rgb(var(--color-warning-50)/<alpha-value>)',
          100: 'rgb(var(--color-warning-100)/<alpha-value>)',
          200: 'rgb(var(--color-warning-200)/<alpha-value>)',
          300: 'rgb(var(--color-warning-300)/<alpha-value>)',
          400: 'rgb(var(--color-warning-400)/<alpha-value>)',
          500: 'rgb(var(--color-warning-500)/<alpha-value>)',
          600: 'rgb(var(--color-warning-600)/<alpha-value>)',
          700: 'rgb(var(--color-warning-700)/<alpha-value>)',
          800: 'rgb(var(--color-warning-800)/<alpha-value>)',
          900: 'rgb(var(--color-warning-900)/<alpha-value>)',
          950: 'rgb(var(--color-warning-950)/<alpha-value>)',
        },
        info: {
          0: 'rgb(var(--color-info-0)/<alpha-value>)',
          50: 'rgb(var(--color-info-50)/<alpha-value>)',
          100: 'rgb(var(--color-info-100)/<alpha-value>)',
          200: 'rgb(var(--color-info-200)/<alpha-value>)',
          300: 'rgb(var(--color-info-300)/<alpha-value>)',
          400: 'rgb(var(--color-info-400)/<alpha-value>)',
          500: 'rgb(var(--color-info-500)/<alpha-value>)',
          600: 'rgb(var(--color-info-600)/<alpha-value>)',
          700: 'rgb(var(--color-info-700)/<alpha-value>)',
          800: 'rgb(var(--color-info-800)/<alpha-value>)',
          900: 'rgb(var(--color-info-900)/<alpha-value>)',
          950: 'rgb(var(--color-info-950)/<alpha-value>)',
        },
        typography: {
          0: 'rgb(var(--color-typography-0)/<alpha-value>)',
          50: 'rgb(var(--color-typography-50)/<alpha-value>)',
          100: 'rgb(var(--color-typography-100)/<alpha-value>)',
          200: 'rgb(var(--color-typography-200)/<alpha-value>)',
          300: 'rgb(var(--color-typography-300)/<alpha-value>)',
          400: 'rgb(var(--color-typography-400)/<alpha-value>)',
          500: 'rgb(var(--color-typography-500)/<alpha-value>)',
          600: 'rgb(var(--color-typography-600)/<alpha-value>)',
          700: 'rgb(var(--color-typography-700)/<alpha-value>)',
          800: 'rgb(var(--color-typography-800)/<alpha-value>)',
          900: 'rgb(var(--color-typography-900)/<alpha-value>)',
          950: 'rgb(var(--color-typography-950)/<alpha-value>)',
          white: '#FFFFFF',
          gray: '#D4D4D4',
          black: '#181718',
        },
        outline: {
          0: 'rgb(var(--color-outline-0)/<alpha-value>)',
          50: 'rgb(var(--color-outline-50)/<alpha-value>)',
          100: 'rgb(var(--color-outline-100)/<alpha-value>)',
          200: 'rgb(var(--color-outline-200)/<alpha-value>)',
          300: 'rgb(var(--color-outline-300)/<alpha-value>)',
          400: 'rgb(var(--color-outline-400)/<alpha-value>)',
          500: 'rgb(var(--color-outline-500)/<alpha-value>)',
          600: 'rgb(var(--color-outline-600)/<alpha-value>)',
          700: 'rgb(var(--color-outline-700)/<alpha-value>)',
          800: 'rgb(var(--color-outline-800)/<alpha-value>)',
          900: 'rgb(var(--color-outline-900)/<alpha-value>)',
          950: 'rgb(var(--color-outline-950)/<alpha-value>)',
        },
        background: {
          0: 'rgb(var(--color-background-0)/<alpha-value>)',
          50: 'rgb(var(--color-background-50)/<alpha-value>)',
          100: 'rgb(var(--color-background-100)/<alpha-value>)',
          200: 'rgb(var(--color-background-200)/<alpha-value>)',
          300: 'rgb(var(--color-background-300)/<alpha-value>)',
          400: 'rgb(var(--color-background-400)/<alpha-value>)',
          500: 'rgb(var(--color-background-500)/<alpha-value>)',
          600: 'rgb(var(--color-background-600)/<alpha-value>)',
          700: 'rgb(var(--color-background-700)/<alpha-value>)',
          800: 'rgb(var(--color-background-800)/<alpha-value>)',
          900: 'rgb(var(--color-background-900)/<alpha-value>)',
          950: 'rgb(var(--color-background-950)/<alpha-value>)',
          error: 'rgb(var(--color-background-error)/<alpha-value>)',
          warning: 'rgb(var(--color-background-warning)/<alpha-value>)',
          muted: 'rgb(var(--color-background-muted)/<alpha-value>)',
          success: 'rgb(var(--color-background-success)/<alpha-value>)',
          info: 'rgb(var(--color-background-info)/<alpha-value>)',
          light: '#FBFBFB',
          dark: '#181719',
        },
        indicator: {
          primary: 'rgb(var(--color-indicator-primary)/<alpha-value>)',
          info: 'rgb(var(--color-indicator-info)/<alpha-value>)',
          error: 'rgb(var(--color-indicator-error)/<alpha-value>)',
        },
      },
      fontFamily: {
        heading: undefined,
        body: undefined,
        mono: undefined,
        roboto: ['Roboto', 'sans-serif'],
      },
      fontWeight: {
        extrablack: '950',
      },
      fontSize: {
        '2xs': '10px',
      },
      boxShadow: {
        'hard-1': '-2px 2px 8px 0px rgba(38, 38, 38, 0.20)',
        'hard-2': '0px 3px 10px 0px rgba(38, 38, 38, 0.20)',
        'hard-3': '2px 2px 8px 0px rgba(38, 38, 38, 0.20)',
        'hard-4': '0px -3px 10px 0px rgba(38, 38, 38, 0.20)',
        'hard-5': '0px 2px 10px 0px rgba(38, 38, 38, 0.10)',
        'soft-1': '0px 0px 10px rgba(38, 38, 38, 0.1)',
        'soft-2': '0px 0px 20px rgba(38, 38, 38, 0.2)',
        'soft-3': '0px 0px 30px rgba(38, 38, 38, 0.1)',
        'soft-4': '0px 0px 40px rgba(38, 38, 38, 0.1)',
      },
    },
  },
  plugins: [gluestackPlugin],
};
````

## File: tsconfig.json
````json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "jsx": "react-jsx",
    "baseUrl": ".",
    "paths": {
      "~/*": [
        "*"
      ],
      "@/*": [
        "./*"
      ],
      "tailwind.config": [
        "./tailwind.config.js"
      ]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts",
    "nativewind-env.d.ts"
  ]
}
````

## File: utils/supabase.ts
````typescript
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
````
