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
  // Ensure action.color has a fallback if not provided, though types should enforce it.
  const backgroundColor = action.color || '#64748B'; // Default to slate if color is missing
    const getIcon = (iconColor: string = "white") => {
    switch (action.icon) {
      case 'user-plus':
        return <UserPlus size={24} color={iconColor} />;
      case 'graduation-cap':
        return <GraduationCap size={24} color={iconColor} />;
      case 'file-text':
        return <FileText size={24} color={iconColor} />;
      case 'settings':
        return <Settings size={24} color={iconColor} />;
      case 'help-circle':
        return <HelpCircle size={24} color={iconColor} />;
      case 'calendar':
        return <Calendar size={24} color={iconColor} />;
      case 'dollar-sign':
        return <DollarSign size={24} color={iconColor} />;
      case 'message-square':
        return <MessageSquare size={24} color={iconColor} />;
      default:
        return <Settings size={24} color={iconColor} />;
    }
  };
  
  // getGradientColors is no longer needed for solid background
  /* const getGradientColors = () => {
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
  }; */

  return (
    <TouchableOpacity
      onPress={action.onPress}
      className="items-center w-20" // Width for each item, adjust as needed
      activeOpacity={0.7}
    >
      <View 
        className="w-14 h-14 rounded-full items-center justify-center mb-1.5 shadow-md"
        style={{ backgroundColor: backgroundColor, elevation: 3 }} // Apply color directly
      >
        {getIcon("white")} {/* Icon color white for contrast */}
      </View>
      <Text className="text-xs font-medium text-slate-700 text-center leading-tight">
        {action.title}
      </Text>
      {action.subtitle && (
        <Text className="text-[10px] text-slate-500 text-center mt-0.5 leading-tight">
          {action.subtitle}
        </Text>
      )}
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

  return (
    <View className="mb-6"> {/* Added mb-6 for spacing similar to other sections */}
      <View className="flex-row items-center mb-3"> {/* Reduced mb from 5 to 3 */}
        {/* Optional: Keep the decorative line and title style or simplify */}
        <LinearGradient
          colors={['#3b82f6', '#60a5fa']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          className="w-1 h-5 rounded-full mr-2.5" /* Adjusted size & margin */
        />
        <View>
          <Text className="text-lg font-semibold text-slate-800"> {/* Matched Snapshot title style */}
            Aksi Cepat
          </Text>
          {/* Subtitle can be kept or removed based on final look */}
          {/* <Text className="text-sm text-slate-600 mt-0.5">
            Kelola pesantren dengan mudah
          </Text> */}
        </View>
      </View>
      
      <ScrollView 
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 4, paddingVertical: 8, columnGap: 12 }} // Added columnGap
        className="flex-row"
      >
        {quickActions.map((action) => (
          <QuickActionButton key={action.id} action={action} />
        ))}
      </ScrollView>
    </View>
  );
}

// Add displayName for debugging
QuickActions.displayName = 'QuickActions';