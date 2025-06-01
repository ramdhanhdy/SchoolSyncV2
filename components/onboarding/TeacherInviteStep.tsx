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

const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

export default function TeacherInviteStep({ data, onUpdate, onNext, onBack }: TeacherInviteStepProps) {
  const [teachers, setTeachers] = useState<TeacherInvite[]>(
    data.teacherInvites?.map(invite => ({
      id: generateId(),
      name: invite.name,
      email: invite.email,
      subject: invite.subject
    })) || []
  );
  const [newTeacher, setNewTeacher] = useState({ name: '', email: '', subject: '' });
  const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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

    // Check for duplicate email
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



  const handleSubjectSelect = (subject: string) => {
    setNewTeacher({ ...newTeacher, subject });
    setShowSubjectDropdown(false);
  };

  const handleNext = () => {
    // Teachers are optional, so we can proceed even with empty list
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
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Undang Guru</Text>
          <Text style={styles.subtitle}>
            Undang guru-guru untuk bergabung dengan SchoolSync (opsional)
          </Text>
        </View>

        {/* Add Teacher Form */}
        <View style={styles.addTeacherSection}>
          <Text style={styles.sectionTitle}>Tambah Guru Baru</Text>
          
          {/* Name Input */}
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

          {/* Email Input */}
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

          {/* Subject Input */}
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

          {/* Add Button */}
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

        {/* Teachers List */}
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

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>📧 Tentang Undangan Guru</Text>
          <Text style={styles.infoText}>
            • Guru akan menerima email undangan untuk bergabung{"\n"}
            • Mereka dapat mengatur password sendiri{"\n"}
            • Anda dapat menambah guru lain kapan saja nanti{"\n"}
            • Langkah ini bersifat opsional dan dapat dilewati
          </Text>
        </View>

        {/* Skip Option */}
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

        {/* Navigation Buttons */}
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