import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useStudyStore } from './studyStore';

export type ThemeMode = 'light' | 'dark' | 'system';
export type FocusArea = 'placement' | 'exams' | 'coding' | 'interviews' | 'general';

export interface UserPreferences {
  theme: ThemeMode;
  focusArea: FocusArea;
  dailyStudyGoalMinutes: number;
  studyReminders: boolean;
  reminderHour: number;
  emailNotifications: boolean;
  marketingEmails: boolean;
  compactSidebar: boolean;
  hasCompletedOnboarding: boolean;
  studyStreak: number;
  lastStudyDate: string | null;
  totalStudySessions: number;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'light',
  focusArea: 'placement',
  dailyStudyGoalMinutes: 30,
  studyReminders: true,
  reminderHour: 18,
  emailNotifications: true,
  marketingEmails: false,
  compactSidebar: false,
  hasCompletedOnboarding: false,
  studyStreak: 0,
  lastStudyDate: null,
  totalStudySessions: 0,
};

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function applyTheme(theme: ThemeMode) {
  const root = document.documentElement;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = theme === 'dark' || (theme === 'system' && prefersDark);
  root.classList.toggle('dark', isDark);
}

interface PreferencesState extends UserPreferences {
  setPreferences: (partial: Partial<UserPreferences>) => void;
  recordStudySession: () => { streak: number; isNewDay: boolean };
  resetOnboarding: () => void;
  requestReminderPermission: () => Promise<boolean>;
  syncActivityFromStudy: () => void;
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set, get) => ({
      ...DEFAULT_PREFERENCES,

      setPreferences: (partial) => {
        set(partial);
        if (partial.theme !== undefined) {
          applyTheme(partial.theme);
        }
      },

      recordStudySession: () => {
        const state = get();
        const today = todayKey();
        let streak = state.studyStreak;
        let isNewDay = false;

        if (state.lastStudyDate !== today) {
          isNewDay = true;
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayKey = yesterday.toISOString().slice(0, 10);

          if (state.lastStudyDate === yesterdayKey) {
            streak += 1;
          } else if (state.lastStudyDate === null) {
            streak = 1;
          } else {
            streak = 1;
          }

          set({
            studyStreak: streak,
            lastStudyDate: today,
            totalStudySessions: state.totalStudySessions + 1,
          });
        }

        return { streak, isNewDay };
      },

      resetOnboarding: () => set({ hasCompletedOnboarding: false }),

      requestReminderPermission: async () => {
        if (!('Notification' in window)) return false;
        const permission = await Notification.requestPermission();
        return permission === 'granted';
      },

      syncActivityFromStudy: () => {
        const study = useStudyStore.getState();
        const sessions =
          study.quizzes.filter((q) => q.lastAttemptAt).length +
          study.interviews.length +
          study.uploads.length;
        const state = get();
        if (sessions > state.totalStudySessions) {
          set({ totalStudySessions: sessions });
        }
      },
    }),
    {
      name: 'prepmind_preferences',
      onRehydrateStorage: () => (state) => {
        if (state) applyTheme(state.theme);
      },
    }
  )
);

export const FOCUS_AREA_LABELS: Record<FocusArea, string> = {
  placement: 'Campus placement',
  exams: 'Competitive exams',
  coding: 'Coding interviews',
  interviews: 'Mock interviews & HR',
  general: 'General learning',
};

export function initThemeFromPreferences() {
  const theme = usePreferencesStore.getState().theme;
  applyTheme(theme);
}
