import { create } from 'zustand';
import { User } from '../types';
import { isSupabaseConfigured } from '../lib/supabaseConfig';
import { authService, userService } from '../services/supabase';
import { mockAuthService } from '../services/mockAuth';
import { formatAuthError } from '../utils/authErrors';
import { mapDbUser } from '../utils/mapUser';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  clearError: () => void;
  initializeAuth: () => Promise<void>;
  requestPasswordReset: (email: string) => Promise<string>;
}

async function resolveUserProfile(userId: string, email: string, name?: string): Promise<User> {
  if (!isSupabaseConfigured()) {
    return {
      id: userId,
      email,
      name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  }

  const { data: profile, error } = await userService.getProfile(userId);
  if (error) throw error;

  if (profile) {
    return mapDbUser(profile);
  }

  const { data: created, error: createError } = await userService.createProfile(userId, { email, name });
  if (createError) throw createError;
  if (created) {
    return mapDbUser(created);
  }

  return {
    id: userId,
    email,
    name,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      if (!isSupabaseConfigured()) {
        const { data, error } = await mockAuthService.signIn(email, password);
        if (error) throw error;
        if (data.user) {
          set({ user: data.user, isLoading: false });
        }
        return;
      }

      const { data, error } = await authService.signIn(email, password);
      if (error) throw error;

      if (data.user) {
        const user = await resolveUserProfile(data.user.id, data.user.email!, data.user.user_metadata?.name);
        set({ user, isLoading: false });
      }
    } catch (error: unknown) {
      const message = formatAuthError(error);
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  signup: async (email: string, password: string, name?: string) => {
    set({ isLoading: true, error: null });
    try {
      if (!isSupabaseConfigured()) {
        const { data, error } = await mockAuthService.signUp(email, password, name);
        if (error) throw error;
        if (data.user) {
          set({ user: data.user, isLoading: false });
        }
        return;
      }

      const { data, error } = await authService.signUp(email, password, name);
      if (error) throw error;

      if (data.session) {
        const user = await resolveUserProfile(data.user!.id, data.user!.email!, name);
        set({ user, isLoading: false });
      } else if (data.user) {
        set({
          isLoading: false,
          error: 'Check your email to confirm your account before signing in. (Or disable Email Confirmations in Supabase Auth settings)',
        });
      } else {
        set({
          isLoading: false,
          error: 'An unexpected error occurred during signup.',
        });
      }
    } catch (error: unknown) {
      const message = formatAuthError(error);
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      if (!isSupabaseConfigured()) {
        await mockAuthService.signOut();
      } else {
        await authService.signOut();
      }
      set({ user: null, isLoading: false });
    } catch (error: unknown) {
      set({ error: formatAuthError(error), isLoading: false });
    }
  },

  updateProfile: async (data: Partial<User>) => {
    const state = useAuthStore.getState();
    set({ isLoading: true, error: null });
    try {
      if (!state.user) throw new Error('No user logged in');

      if (!isSupabaseConfigured()) {
        set({
          user: { ...state.user, ...data, updatedAt: new Date().toISOString() },
          isLoading: false,
        });
        return;
      }

      const updated = await userService.updateProfile(state.user.id, data);
      if (updated.error) throw updated.error;
      if (updated.data) {
        set({ user: mapDbUser(updated.data), isLoading: false });
      }
    } catch (error: unknown) {
      set({ error: formatAuthError(error), isLoading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null }),

  requestPasswordReset: async (email: string) => {
    set({ isLoading: true, error: null });
    try {
      if (!isSupabaseConfigured()) {
        const { error } = await mockAuthService.resetPassword(email);
        if (error) throw error;
        set({ isLoading: false });
        return 'Demo mode: password reset is simulated. Use your existing password to sign in, or create a new account with a different email.';
      }

      const { error } = await authService.resetPassword(email);
      if (error) throw error;
      set({ isLoading: false });
      return 'If an account exists for this email, you will receive password reset instructions shortly.';
    } catch (error: unknown) {
      const message = formatAuthError(error);
      set({ error: message, isLoading: false });
      throw error;
    }
  },

  initializeAuth: async () => {
    set({ isLoading: true });
    try {
      if (!isSupabaseConfigured()) {
        const { data, error } = await mockAuthService.getSession();
        if (error) throw error;
        set({ user: data.session?.user ?? null, isLoading: false });
        return;
      }

      const { data, error } = await authService.getSession();
      if (error) throw error;

      if (data.session?.user) {
        const user = await resolveUserProfile(
          data.session.user.id,
          data.session.user.email!,
          data.session.user.user_metadata?.name
        );
        set({ user, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (error: unknown) {
      set({ error: formatAuthError(error), isLoading: false });
    }
  },
}));
