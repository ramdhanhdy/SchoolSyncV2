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
        {/* Success Animation Area */}
        <View style={styles.successSection}>
          <View style={styles.successIcon}>
            <Text style={styles.successEmoji}>🎉</Text>
          </View>
          <Text style={styles.successTitle}>Selamat!</Text>
          <Text style={styles.successSubtitle}>
            Akun SchoolSync untuk {data.schoolName} berhasil dibuat
          </Text>
        </View>

        {/* Summary Card */}
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

        {/* What's Next Section */}
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

        {/* Features Highlight */}
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

        {/* Support Info */}
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

        {/* Complete Button */}
        <TouchableOpacity style={styles.completeButton} onPress={onComplete}>
          <Text style={styles.completeButtonText}>Mulai Menggunakan SchoolSync</Text>
        </TouchableOpacity>

        {/* Footer */}
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