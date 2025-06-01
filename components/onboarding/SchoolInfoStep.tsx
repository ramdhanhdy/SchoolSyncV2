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

  const validateStudentCount = (count: number) => {
    return !isNaN(count) && count > 0 && count <= 10000;
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

    if (!data.studentCount || !validateStudentCount(data.studentCount)) {
      Alert.alert('Error', 'Mohon isi jumlah santri yang valid (1-10000)');
      return;
    }

    onNext();
  };

  const handleSchoolTypeSelect = (type: string) => {
    if (type === 'Lainnya') {
      setShowSchoolTypeDropdown(false);
      // Keep dropdown closed and let user type custom type
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
    data.studentCount &&
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

            {/* Custom School Type Input */}
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

          {/* Address */}
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

          {/* City */}
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

          {/* Province */}
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

          {/* Student Count */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Jumlah Santri *</Text>
            <TextInput
              style={[
                styles.input,
                data.studentCount && !validateStudentCount(data.studentCount) ? styles.inputError : null
              ]}
              placeholder="Contoh: 150"
              value={data.studentCount ? data.studentCount.toString() : ''}
              onChangeText={(value) => onUpdate({ studentCount: parseInt(value) || 0 })}
              keyboardType="numeric"
              autoCorrect={false}
            />
            {data.studentCount && !validateStudentCount(data.studentCount) && (
              <Text style={styles.errorText}>Jumlah santri harus antara 1-10000</Text>
            )}
          </View>

          {/* Info Box */}
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>🏫 Informasi Pesantren</Text>
            <Text style={styles.infoText}>
              Data ini akan digunakan untuk menyesuaikan fitur SchoolSync dengan karakteristik pesantren Anda dan membantu dalam pelaporan.
            </Text>
          </View>
        </View>

        {/* Navigation Buttons */}
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