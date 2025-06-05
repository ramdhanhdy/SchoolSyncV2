import React from 'react';
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

interface CombinedInfoStepProps {
  data: OnboardingData;
  onUpdate: (updates: Partial<OnboardingData>) => void;
  onNext: () => void;
}

export default function CombinedInfoStep({ data, onUpdate, onNext }: CombinedInfoStepProps) {

  const handleNext = () => {
    // Validation - only check required fields
    if (!data.fullName.trim()) {
      Alert.alert('Error', 'Mohon isi nama lengkap');
      return;
    }

    if (!data.schoolName.trim()) {
      Alert.alert('Error', 'Mohon isi nama sekolah');
      return;
    }

    onNext();
  };

  const isFormValid = 
    data.fullName.trim() &&
    data.schoolName.trim();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>Informasi Dasar</Text>
        <Text style={styles.subtitle}>
          Mari mulai dengan informasi dasar Anda dan sekolah
        </Text>

        {/* Full Name Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nama Lengkap *</Text>
          <TextInput
            style={styles.input}
            value={data.fullName}
            onChangeText={(text) => onUpdate({ fullName: text })}
            placeholder="Masukkan nama lengkap Anda"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="words"
            accessibilityLabel="Input nama lengkap"
            accessibilityHint="Masukkan nama lengkap Anda"
          />
        </View>

        {/* School Name Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nama Sekolah *</Text>
          <TextInput
            style={styles.input}
            value={data.schoolName}
            onChangeText={(text) => onUpdate({ schoolName: text })}
            placeholder="Masukkan nama sekolah"
            placeholderTextColor="#9CA3AF"
            autoCapitalize="words"
            accessibilityLabel="Input nama sekolah"
            accessibilityHint="Masukkan nama sekolah tempat Anda bekerja"
          />
        </View>

        <Text style={styles.note}>
          * Wajib diisi. Informasi lainnya dapat ditambahkan nanti di profil Anda.
        </Text>
      </View>

      {/* Next Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.nextButton, !isFormValid && styles.nextButtonDisabled]}
          onPress={handleNext}
          disabled={!isFormValid}
          accessibilityLabel="Tombol lanjut"
          accessibilityHint="Lanjut ke langkah berikutnya"
        >
          <Text style={[styles.nextButtonText, !isFormValid && styles.nextButtonTextDisabled]}>
            Lanjutkan
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    padding: 24,
    paddingBottom: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1F2937',
    backgroundColor: '#FFFFFF',
    minHeight: 56,
  },
  note: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 16,
    fontStyle: 'italic',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  nextButton: {
    backgroundColor: '#059669',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 56,
  },
  nextButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButtonTextDisabled: {
    color: '#9CA3AF',
  },
});