import React, { useState, useEffect, useCallback } from 'react';
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
  // Basic Info
  fullName: string;
  phone: string;
  position: string;
  
  // School Info
  schoolName: string;
  schoolType: string;
  address: string;
  city: string;
  province: string;
  studentCount: number;
  
  // Plan Selection
  selectedPlan: 'starter' | 'professional' | 'enterprise';
  
  // Teacher Invites
  teacherInvites: {
    name: string;
    email: string;
    subject?: string;
  }[];
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
  
  const { user, profile, updateProfile, createSchool } = useAuthStore();

  const handlePrevious = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  useEffect(() => {
    // Check if user is authenticated
    if (!user) {
      router.replace('/auth');
      return;
    }

    // Pre-fill data from profile if available
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
  }, [currentStep, handlePrevious]);

  const updateOnboardingData = (updates: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...updates }));
  };

  const handleNext = async () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Complete onboarding
      await completeOnboarding();
    }
  };

  const completeOnboarding = async () => {
    try {
      // Update user profile
      await updateProfile({
        full_name: onboardingData.fullName,
        phone: onboardingData.phone,
      });

      // Create school
      const schoolResult = await createSchool({
        name: onboardingData.schoolName,
        type: onboardingData.schoolType,
        address: onboardingData.address,
        city: onboardingData.city,
        province: onboardingData.province,
        student_count_estimate: onboardingData.studentCount,
      });

      if (schoolResult.success) {
        // TODO: Create subscription with selected plan
        // TODO: Send teacher invitations
        
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
            onBack={handlePrevious}
          />
        );
      case 3:
        return (
          <PlanSelectionStep
            data={onboardingData}
            onUpdate={updateOnboardingData}
            onNext={handleNext}
            onBack={handlePrevious}
          />
        );
      case 4:
        return (
          <TeacherInviteStep
            data={onboardingData}
            onUpdate={updateOnboardingData}
            onNext={handleNext}
            onBack={handlePrevious}
          />
        );
      case 5:
        return (
          <WelcomeStep
            data={onboardingData}
            onComplete={completeOnboarding}
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