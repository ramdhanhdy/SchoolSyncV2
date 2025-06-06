import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { 
  UserPlus, 
  GraduationCap, 
  FileText, 
  Settings, 
  HelpCircle, 
  Calendar,
  DollarSign,
  MessageSquare
} from 'lucide-react-native';
import { QuickAction } from '../shared/types';

interface QuickActionsProps {
  actions?: QuickAction[];
}

interface QuickActionButtonProps {
  action: QuickAction;
}

function QuickActionButton({ action }: QuickActionButtonProps) {
  const getIcon = () => {
    switch (action.icon) {
      case 'user-plus':
        return <UserPlus size={24} color={action.color || '#1B5E20'} />;
      case 'graduation-cap':
        return <GraduationCap size={24} color={action.color || '#1B5E20'} />;
      case 'file-text':
        return <FileText size={24} color={action.color || '#1B5E20'} />;
      case 'settings':
        return <Settings size={24} color={action.color || '#1B5E20'} />;
      case 'help-circle':
        return <HelpCircle size={24} color={action.color || '#1B5E20'} />;
      case 'calendar':
        return <Calendar size={24} color={action.color || '#1B5E20'} />;
      case 'dollar-sign':
        return <DollarSign size={24} color={action.color || '#1B5E20'} />;
      case 'message-square':
        return <MessageSquare size={24} color={action.color || '#1B5E20'} />;
      default:
        return <Settings size={24} color={action.color || '#1B5E20'} />;
    }
  };

  return (
    <TouchableOpacity
      onPress={action.onPress}
      className="bg-white rounded-xl p-4 items-center justify-center shadow-sm border border-gray-100 min-h-[100px] flex-1"
      activeOpacity={0.7}
    >
      <View className="items-center">
        {getIcon()}
        <Text className="text-sm font-medium text-gray-900 mt-2 text-center">
          {action.title}
        </Text>
        {action.subtitle && (
          <Text className="text-xs text-gray-500 mt-1 text-center">
            {action.subtitle}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

// Add displayName for debugging
QuickActionButton.displayName = 'QuickActionButton';

export function QuickActions({ actions }: QuickActionsProps) {
  // Default actions if none provided
  const defaultActions: QuickAction[] = [
    {
      id: 'add-student',
      title: 'Tambah Santri',
      icon: 'user-plus',
      onPress: () => console.log('Add student'),
      color: '#3B82F6',
    },
    {
      id: 'add-teacher',
      title: 'Tambah Ustadz',
      icon: 'graduation-cap',
      onPress: () => console.log('Add teacher'),
      color: '#8B5CF6',
    },
    {
      id: 'reports',
      title: 'Laporan',
      icon: 'file-text',
      onPress: () => console.log('View reports'),
      color: '#059669',
    },
    {
      id: 'schedule',
      title: 'Jadwal',
      icon: 'calendar',
      onPress: () => console.log('View schedule'),
      color: '#DC2626',
    },
    {
      id: 'finance',
      title: 'Keuangan',
      icon: 'dollar-sign',
      onPress: () => console.log('View finance'),
      color: '#D97706',
    },
    {
      id: 'messages',
      title: 'Pesan',
      icon: 'message-square',
      onPress: () => console.log('View messages'),
      color: '#0891B2',
    },
    {
      id: 'settings',
      title: 'Pengaturan',
      icon: 'settings',
      onPress: () => console.log('Open settings'),
      color: '#6B7280',
    },
    {
      id: 'help',
      title: 'Bantuan',
      icon: 'help-circle',
      onPress: () => console.log('Open help'),
      color: '#EC4899',
    },
  ];

  const quickActions = actions || defaultActions;

  // Split actions into rows of 4
  const rows = [];
  for (let i = 0; i < quickActions.length; i += 4) {
    rows.push(quickActions.slice(i, i + 4));
  }

  return (
    <View className="px-5">
      <Text className="text-lg font-bold text-gray-900 mb-4">
        Aksi Cepat
      </Text>
      
      <ScrollView 
        showsVerticalScrollIndicator={false}
        className="max-h-[250px]"
      >
        {rows.map((row, rowIndex) => (
          <View key={rowIndex} className="flex-row space-x-3 mb-3">
            {row.map((action) => (
              <QuickActionButton key={action.id} action={action} />
            ))}
            {/* Fill remaining space if row has less than 4 items */}
            {row.length < 4 && (
              Array.from({ length: 4 - row.length }).map((_, index) => (
                <View key={`spacer-${index}`} className="flex-1" />
              ))
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// Add displayName for debugging
QuickActions.displayName = 'QuickActions';