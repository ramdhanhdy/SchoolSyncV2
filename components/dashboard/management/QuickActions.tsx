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
import { LinearGradient } from 'expo-linear-gradient';

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
        return <UserPlus size={24} color="white" />;
      case 'graduation-cap':
        return <GraduationCap size={24} color="white" />;
      case 'file-text':
        return <FileText size={24} color="white" />;
      case 'settings':
        return <Settings size={24} color="white" />;
      case 'help-circle':
        return <HelpCircle size={24} color="white" />;
      case 'calendar':
        return <Calendar size={24} color="white" />;
      case 'dollar-sign':
        return <DollarSign size={24} color="white" />;
      case 'message-square':
        return <MessageSquare size={24} color="white" />;
      default:
        return <Settings size={24} color="white" />;
    }
  };
  
  const getGradientColors = () => {
    switch (action.icon) {
      case 'user-plus': return ['#3B82F6', '#60A5FA'];
      case 'graduation-cap': return ['#8B5CF6', '#A78BFA'];
      case 'file-text': return ['#10B981', '#34D399'];
      case 'calendar': return ['#EF4444', '#F87171'];
      case 'dollar-sign': return ['#F59E0B', '#FBBF24'];
      case 'message-square': return ['#0891B2', '#22D3EE'];
      case 'settings': return ['#64748B', '#94A3B8'];
      case 'help-circle': return ['#EC4899', '#F472B6'];
      default: return ['#3B82F6', '#60A5FA'];
    }
  };

  return (
    <TouchableOpacity
      onPress={action.onPress}
      className="rounded-2xl shadow-md min-h-[110px] flex-1 overflow-hidden"
      activeOpacity={0.7}
    >
      <LinearGradient
        colors={getGradientColors() as any}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        className="h-full w-full p-4 items-center justify-center"
      >
        <View className="items-center">
          {getIcon()}
          <Text className="text-sm font-medium text-white mt-2 text-center">
            {action.title}
          </Text>
          {action.subtitle && (
            <Text className="text-xs text-white text-opacity-80 mt-1 text-center">
              {action.subtitle}
            </Text>
          )}
        </View>
      </LinearGradient>
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
    <View>
      <View className="flex-row items-center mb-4">
        <LinearGradient
          colors={['#3b82f6', '#60a5fa']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          className="w-1 h-6 rounded-full mr-2"
        />
        <Text className="text-lg font-bold text-slate-900">
          Aksi Cepat
        </Text>
      </View>
      
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