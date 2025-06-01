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
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>🔒</Text>
            </View>
            
            <Text style={styles.title}>Lupa Password?</Text>
            <Text style={styles.subtitle}>
              Masukkan email Anda dan kami akan mengirimkan link untuk mereset password
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Email Input */}
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

            {/* Reset Button */}
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

            {/* Back to Login */}
            <TouchableOpacity
              style={styles.loginButton}
              onPress={onNavigateToLogin}
              disabled={loading}
            >
              <Text style={styles.loginButtonText}>← Kembali ke Login</Text>
            </TouchableOpacity>
          </View>

          {/* Info */}
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
  // Success screen styles
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