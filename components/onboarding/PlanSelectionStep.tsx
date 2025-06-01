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
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'professional' | 'enterprise' | ''>(data.selectedPlan || '');

  const handlePlanSelect = (planId: 'starter' | 'professional' | 'enterprise') => {
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
    const studentCount = data.studentCount || 0;
    if (studentCount <= 50) return 'starter';
    if (studentCount <= 500) return 'professional';
    return 'enterprise';
  };

  const recommendedPlan = getRecommendedPlan();

  return (
    <ModernBackground>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 py-8">
          {/* Header */}
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

           {/* Recommendation */}
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

           {/* Plans */}
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
                     {/* Popular Badge */}
                     {plan.popular && (
                       <View className="absolute -top-3 left-4 bg-emerald-500 px-3 py-1 rounded-full">
                         <Text className="text-xs font-bold text-white">
                           PALING POPULER
                         </Text>
                       </View>
                     )}

                     {/* Recommended Badge */}
                     {plan.id === recommendedPlan && !plan.popular && (
                       <View className="absolute -top-3 left-4 bg-amber-500 px-3 py-1 rounded-full">
                         <Text className="text-xs font-bold text-white">
                           DIREKOMENDASIKAN
                         </Text>
                       </View>
                     )}

                     {/* Plan Header */}
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

                     {/* Trial Info */}
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

                     {/* Features */}
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

                     {/* Selection Indicator */}
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

           {/* Info Box */}
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

           {/* Navigation Buttons */}
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