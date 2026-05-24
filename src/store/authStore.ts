import { create } from 'zustand';
import { User } from '../types';
import { authService, userService } from '../services/supabase';

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
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await authService.signIn(email, password);
      if (error) throw error;

      if (data.user) {
        const { data: profile } = await userService.getProfile(data.user.id);
        set({
          user: profile || {
            id: data.user.id,
            email: data.user.email!,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          isLoading: false,
        });
      }
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  signup: async (email: string, password: string, name?: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await authService.signUp(email, password);
      if (error) throw error;

      if (data.user) {
        const newUser: User = {
          id: data.user.id,
          email: data.user.email!,
          name,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        await userService.createProfile(data.user.id, newUser);
        set({ user: newUser, isLoading: false });
      }
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await authService.signOut();
      set({ user: null, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateProfile: async (data: Partial<User>) => {
    const state = useAuthStore.getState();
    set({ isLoading: true, error: null });
    try {
      if (!state.user) throw new Error('No user logged in');
      const updated = await userService.updateProfile(state.user.id, data);
      if (updated.data) {
        set({ user: updated.data, isLoading: false });
      }
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  clearError: () => set({ error: null }),

  initializeAuth: async () => {
    set({ isLoading: true });
    try {
      const { data, error } = await authService.getSession();
      if (error) throw error;

      if (data.session?.user) {
        const { data: profile } = await userService.getProfile(data.session.user.id);
        set({
          user: profile || {
            id: data.session.user.id,
            email: data.session.user.email!,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          isLoading: false,
        });
      } else {
        set({ isLoading: false });
      }
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
