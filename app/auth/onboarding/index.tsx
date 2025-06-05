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
import CombinedInfoStep from '../../../components/onboarding/CombinedInfoStep';
// Removed BasicInfoStep and SchoolInfoStep - combined into CombinedInfoStep
// Removed PlanSelectionStep and TeacherInviteStep imports - simplified onboarding
import WelcomeStep from '../../../components/onboarding/WelcomeStep';

export interface OnboardingData {
  // Basic Info
  fullName: string;
  phone?: string; // Optional - removed from onboarding UI
  position: string; // Auto-set to 'management' - not collected in UI
  
  // School Info
  schoolName: string;
  schoolType?: string; // Optional - can be set later
  address?: string; // Optional - removed from onboarding UI
  city?: string; // Optional - removed from onboarding UI
  province?: string; // Optional - removed from onboarding UI
  studentCount?: number; // Optional - can be set later
  
  // Plan Selection - removed from onboarding, will use default
  // selectedPlan: 'starter' | 'professional' | 'enterprise';
  
  // Teacher Invites - removed from onboarding, can be done later
  // teacherInvites: {
  //   name: string;
  //   email: string;
  //   subject?: string;
  // }[];
}

const TOTAL_STEPS = 2;

export default function OnboardingIndex() {
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({
    fullName: '',
    position: 'management', // Auto-set since user is already in management role
    schoolName: '',
    // Optional fields - will be set later or remain undefined
    // phone: undefined,
    // schoolType: undefined,
    // address: undefined,
    // city: undefined,
    // province: undefined,
    // studentCount: undefined,
    // selectedPlan: 'starter', // Will use default plan
    // teacherInvites: [], // Will be handled separately
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
        // phone field removed from onboarding - will be handled in profile later
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
        // phone field removed from onboarding - will be handled in profile later
      });

      // Create school with minimal required information
      const schoolResult = await createSchool({
        name: onboardingData.schoolName,
        // Optional fields removed from onboarding - can be added later
        // address: onboardingData.address,
        // city: onboardingData.city,
        // province: onboardingData.province,
      });

      if (schoolResult.success) {
        // Plan selection and teacher invitations will be handled separately after onboarding
        
        // Navigate directly to dashboard without showing popup
        router.replace('/dashboard');
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
          <CombinedInfoStep
            data={onboardingData}
            onUpdate={updateOnboardingData}
            onNext={handleNext}
          />
        );
      case 2:
        return (
          <WelcomeStep
            data={onboardingData}
            onComplete={completeOnboarding}
          />
        );
      // Removed BasicInfoStep and SchoolInfoStep - combined into CombinedInfoStep
      // Removed PlanSelectionStep and TeacherInviteStep - simplified onboarding
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Informasi Dasar';
      case 2: return 'Selamat Datang';
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