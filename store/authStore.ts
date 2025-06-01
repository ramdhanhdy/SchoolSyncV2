import { create } from 'zustand';
import { supabase } from '../utils/supabase';
import { User, Session } from '@supabase/supabase-js';

export type UserRole = 'management' | 'teacher' | 'student' | 'parent';

export interface School {
  id: string;
  name: string;
  type?: string;
  address?: string;
  city?: string;
  province?: string;
  license_number?: string;
  student_count_estimate?: number;
  created_at: string;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  role: UserRole;
  school_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Subscription {
  id: string;
  school_id: string;
  plan: 'starter' | 'growing' | 'enterprise';
  status: 'trial' | 'active' | 'cancelled' | 'expired';
  trial_ends_at?: string;
  current_period_start: string;
  current_period_end: string;
  student_limit: number;
}

export interface AuthState {
  // Auth state
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  school: School | null;
  subscription: Subscription | null;
  loading: boolean;
  error: string | null;
  
  // Auth actions
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, userData: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  
  // Profile actions
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ success: boolean; error?: string }>;
  loadUserProfile: () => Promise<void>;
  
  // School actions
  createSchool: (schoolData: Omit<School, 'id' | 'created_at'>) => Promise<{ success: boolean; schoolId?: string; error?: string }>;
  updateSchool: (updates: Partial<School>) => Promise<{ success: boolean; error?: string }>;
  
  // Subscription actions
  loadSubscription: () => Promise<void>;
  
  // Utility actions
  initialize: () => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  user: null,
  session: null,
  profile: null,
  school: null,
  subscription: null,
  loading: false,
  error: null,

  // Auth actions
  signIn: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        set({ error: error.message, loading: false });
        return { success: false, error: error.message };
      }

      if (data.user && data.session) {
        set({ user: data.user, session: data.session });
        await get().loadUserProfile();
        return { success: true };
      }

      return { success: false, error: 'Login failed' };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      set({ error: errorMessage, loading: false });
      return { success: false, error: errorMessage };
    }
  },

  signUp: async (email: string, password: string, userData: Partial<UserProfile>) => {
    try {
      set({ loading: true, error: null });
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.full_name,
            phone: userData.phone,
            role: userData.role || 'management',
          },
        },
      });

      if (error) {
        set({ error: error.message, loading: false });
        return { success: false, error: error.message };
      }

      if (data.user) {
        set({ user: data.user, session: data.session });
        return { success: true };
      }

      return { success: false, error: 'Registration failed' };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      set({ error: errorMessage, loading: false });
      return { success: false, error: errorMessage };
    }
  },

  signOut: async () => {
    try {
      set({ loading: true });
      await supabase.auth.signOut();
      set({ 
        user: null, 
        session: null, 
        profile: null, 
        school: null, 
        subscription: null,
        loading: false,
        error: null 
      });
    } catch (error) {
      console.error('Sign out error:', error);
      set({ loading: false });
    }
  },

  resetPassword: async (email: string) => {
    try {
      set({ loading: true, error: null });
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'schoolsync://reset-password',
      });

      if (error) {
        set({ error: error.message, loading: false });
        return { success: false, error: error.message };
      }

      set({ loading: false });
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      set({ error: errorMessage, loading: false });
      return { success: false, error: errorMessage };
    }
  },

  // Profile actions
  updateProfile: async (updates: Partial<UserProfile>) => {
    try {
      set({ loading: true, error: null });
      const { profile } = get();
      
      if (!profile) {
        set({ error: 'No profile found', loading: false });
        return { success: false, error: 'No profile found' };
      }

      const { data, error } = await supabase
        .from('users')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', profile.id)
        .select()
        .single();

      if (error) {
        set({ error: error.message, loading: false });
        return { success: false, error: error.message };
      }

      set({ profile: data, loading: false });
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      set({ error: errorMessage, loading: false });
      return { success: false, error: errorMessage };
    }
  },

  loadUserProfile: async () => {
    try {
      const { user } = get();
      if (!user) return;

      set({ loading: true });
      
      const { data: profile, error: profileError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Profile load error:', profileError);
        set({ loading: false });
        return;
      }

      set({ profile });

      // Load school if user has school_id
      if (profile.school_id) {
        const { data: school } = await supabase
          .from('schools')
          .select('*')
          .eq('id', profile.school_id)
          .single();
        
        if (school) {
          set({ school });
          await get().loadSubscription();
        }
      }

      set({ loading: false });
    } catch (error) {
      console.error('Load profile error:', error);
      set({ loading: false });
    }
  },

  // School actions
  createSchool: async (schoolData: Omit<School, 'id' | 'created_at'>) => {
    try {
      set({ loading: true, error: null });
      
      const { data, error } = await supabase
        .from('schools')
        .insert([schoolData])
        .select()
        .single();

      if (error) {
        set({ error: error.message, loading: false });
        return { success: false, error: error.message };
      }

      set({ school: data, loading: false });
      
      // Update user profile with school_id
      await get().updateProfile({ school_id: data.id });
      
      return { success: true, schoolId: data.id };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      set({ error: errorMessage, loading: false });
      return { success: false, error: errorMessage };
    }
  },

  updateSchool: async (updates: Partial<School>) => {
    try {
      set({ loading: true, error: null });
      const { school } = get();
      
      if (!school) {
        set({ error: 'No school found', loading: false });
        return { success: false, error: 'No school found' };
      }

      const { data, error } = await supabase
        .from('schools')
        .update(updates)
        .eq('id', school.id)
        .select()
        .single();

      if (error) {
        set({ error: error.message, loading: false });
        return { success: false, error: error.message };
      }

      set({ school: data, loading: false });
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      set({ error: errorMessage, loading: false });
      return { success: false, error: errorMessage };
    }
  },

  // Subscription actions
  loadSubscription: async () => {
    try {
      const { school } = get();
      if (!school) return;

      const { data: subscription } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('school_id', school.id)
        .single();

      if (subscription) {
        set({ subscription });
      }
    } catch (error) {
      console.error('Load subscription error:', error);
    }
  },

  // Utility actions
  initialize: async () => {
    try {
      set({ loading: true });
      
      // Get current session
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        set({ session, user: session.user });
        await get().loadUserProfile();
      }
      
      // Listen for auth changes
      supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          set({ session, user: session.user });
          await get().loadUserProfile();
        } else if (event === 'SIGNED_OUT') {
          set({ 
            user: null, 
            session: null, 
            profile: null, 
            school: null, 
            subscription: null 
          });
        }
      });
      
      set({ loading: false });
    } catch (error) {
      console.error('Initialize error:', error);
      set({ loading: false });
    }
  },

  clearError: () => set({ error: null }),
  setLoading: (loading: boolean) => set({ loading }),
}));