import React, { useState } from 'react';
import {
  View,
  Text,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../store/authStore';
import { router } from 'expo-router';
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
            onPress: () => {
              // Use setTimeout to ensure navigation happens after Alert is dismissed
              setTimeout(() => {
                router.replace('/auth/onboarding');
              }, 100);
            },
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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
                Daftar Akun Baru
              </Text>
              <Text style={styles.headerSubtitle}>
                Buat akun dengan email dan password. Informasi lainnya akan dilengkapi setelah pendaftaran.
              </Text>
            </View>

            {/* Main Card */}
            <View style={styles.card}>
              <View style={styles.formContainer}>
                 {/* Email Input */}
                 <View style={styles.inputGroup}>
                   <Text style={styles.inputLabel}>
                     Email *
                   </Text>
                   <TextInput
                     style={[styles.input, formData.email && !validateEmail(formData.email) && styles.inputError]}
                     placeholder="nama@email.com"
                     value={formData.email}
                     onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                     keyboardType="email-address"
                     autoCapitalize="none"
                     autoCorrect={false}
                     placeholderTextColor="#9CA3AF"
                   />
                   {formData.email && !validateEmail(formData.email) && (
                     <Text style={styles.errorText}>
                       Format email tidak valid
                     </Text>
                   )}
                 </View>

                 {/* Password Input */}
                 <View style={styles.inputGroup}>
                   <Text style={styles.inputLabel}>
                     Password *
                   </Text>
                   <TextInput
                     style={[styles.input, formData.password && !validatePassword(formData.password) && styles.inputError]}
                     placeholder="Minimal 6 karakter"
                     value={formData.password}
                     onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
                     secureTextEntry
                     placeholderTextColor="#9CA3AF"
                   />
                   {formData.password && !validatePassword(formData.password) && (
                     <Text style={styles.errorText}>
                       Password minimal 6 karakter
                     </Text>
                   )}
                 </View>

                 {/* Confirm Password Input */}
                 <View style={styles.inputGroup}>
                   <Text style={styles.inputLabel}>
                     Konfirmasi Password *
                   </Text>
                   <TextInput
                     style={[styles.input, formData.confirmPassword && formData.password !== formData.confirmPassword && styles.inputError]}
                     placeholder="Ulangi password"
                     value={formData.confirmPassword}
                     onChangeText={(text) => setFormData(prev => ({ ...prev, confirmPassword: text }))}
                     secureTextEntry
                     placeholderTextColor="#9CA3AF"
                   />
                   {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                     <Text style={styles.errorText}>
                       Password tidak cocok
                     </Text>
                   )}
                 </View>

                 {/* Terms and Conditions */}
                 <View style={styles.termsContainer}>
                   <TouchableOpacity
                     onPress={() => setAcceptedTerms(!acceptedTerms)}
                     style={styles.checkboxContainer}
                   >
                     <View style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]}>
                       {acceptedTerms && (
                         <Ionicons name="checkmark" size={12} color="white" />
                       )}
                     </View>
                   </TouchableOpacity>
                   <Text style={styles.termsText}>
                     Saya menyetujui{' '}
                     <Text style={styles.termsLink}>
                       Syarat dan Ketentuan
                     </Text>
                     {' '}serta{' '}
                     <Text style={styles.termsLink}>
                       Kebijakan Privasi
                     </Text>
                     {' '}SchoolSync
                   </Text>
                 </View>

                 {/* Sign Up Button */}
                 <TouchableOpacity
                   style={[styles.signUpButton, (!isFormValid || loading) && styles.signUpButtonDisabled]}
                   onPress={handleSignUp}
                   disabled={!isFormValid || loading}
                 >
                   <Text style={styles.signUpButtonText}>
                     {loading ? 'Mendaftar...' : 'Daftar Sekarang'}
                   </Text>
                 </TouchableOpacity>

                 {/* Login Link */}
                 <View style={styles.loginLinkContainer}>
                   <Text style={styles.loginText}>
                     Sudah punya akun?{' '}
                     <Text
                       style={styles.loginLink}
                       onPress={onNavigateToLogin}
                     >
                       Masuk di sini
                     </Text>
                   </Text>
                 </View>
              </View>
            </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  header: {
    marginBottom: 32,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 24,
  },
  formContainer: {
    gap: 24,
  },
  inputGroup: {
    marginBottom: 4,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
    color: '#111827',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    fontSize: 14,
    color: '#EF4444',
    marginTop: 8,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
    gap: 12,
  },
  checkboxContainer: {
    marginTop: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#9CA3AF',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxChecked: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  termsText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    flex: 1,
  },
  termsLink: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  signUpButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 32,
  },
  signUpButtonDisabled: {
    backgroundColor: '#9CA3AF',
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  loginLinkContainer: {
    alignItems: 'center',
    marginTop: 32,
  },
  loginText: {
    fontSize: 16,
    color: '#6B7280',
  },
  loginLink: {
    color: '#3B82F6',
    fontWeight: '600',
  },
});