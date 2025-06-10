import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as LucideIcons from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Helper to get icon component by name, with a fallback
const Icon = ({ name, ...props }: { name: string } & LucideIcons.LucideProps) => {
  const LucideIconComponent = LucideIcons[name as keyof typeof LucideIcons] as React.ElementType;
  if (!LucideIconComponent) {
    return <LucideIcons.HelpCircle {...props} />; // Default icon
  }
  return <LucideIconComponent {...props} />;
};

export interface NavItem {
  id: string;
  label: string;
  iconName: string; // Lucide icon name
  routeName: string;
}

interface BottomNavigationBarProps {
  activeRouteName: string;
  navItems?: NavItem[]; // Made optional to use default
  onPressRoute: (routeName: string) => void;
}

const defaultNavItems: NavItem[] = [
  { id: 'home', label: 'Beranda', iconName: 'Home', routeName: 'Dashboard' },
  { id: 'calendar', label: 'Kalender', iconName: 'CalendarDays', routeName: 'Calendar' },
  { id: 'chat', label: 'Pesan', iconName: 'MessageSquareText', routeName: 'Chat' },
  { id: 'notifications', label: 'Notifikasi', iconName: 'Bell', routeName: 'Notifications' },
  { id: 'profile', label: 'Profil', iconName: 'UserCircle2', routeName: 'Profile' },
];

export function BottomNavigationBar({
  activeRouteName,
  navItems = defaultNavItems,
  onPressRoute,
}: BottomNavigationBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.outerContainer, { paddingBottom: insets.bottom }]}>
      <View style={styles.innerContainer}>
        {navItems.map((item) => {
          const isActive = item.routeName === activeRouteName;
          const iconColor = isActive ? '#2563eb' : '#64748b'; // blue-600 for active, slate-500 for inactive
          // Text color is handled by StyleSheet for consistency here

          return (
            <TouchableOpacity
              key={item.id}
              style={styles.navItem}
              onPress={() => onPressRoute(item.routeName)}
              activeOpacity={0.7}
            >
              <Icon name={item.iconName} size={24} color={iconColor} strokeWidth={isActive ? 2.5 : 2} />
              <Text style={[styles.label, isActive ? styles.labelActive : styles.labelInactive]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

BottomNavigationBar.displayName = 'BottomNavigationBar';

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: '#ffffff', // White background
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0', // slate-200 for a subtle top border
    // Shadow for iOS
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 8,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 60, // Standard height for bottom nav
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  label: {
    fontSize: 10,
    marginTop: 2,
  },
  labelActive: {
    color: '#2563eb', // blue-600
    fontWeight: '600',
  },
  labelInactive: {
    color: '#64748b', // slate-500
  },
});

BottomNavigationBar.displayName = 'BottomNavigationBar';
