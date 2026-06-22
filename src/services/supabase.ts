import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { isSupabaseConfigured } from '../lib/supabaseConfig';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? '';

export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

function getClient(): SupabaseClient {
  if (!supabase) {
    throw new Error('Supabase client is not configured');
  }
  return supabase;
}

export const authService = {
  async signUp(email: string, password: string, name?: string) {
    return getClient().auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name ?? '',
          full_name: name ?? '',
        },
      },
    });
  },

  async signIn(email: string, password: string) {
    return getClient().auth.signInWithPassword({ email, password });
  },

  async signOut() {
    return getClient().auth.signOut();
  },

  async resetPassword(email: string) {
    return getClient().auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });
  },

  async updatePassword(newPassword: string) {
    return getClient().auth.updateUser({ password: newPassword });
  },

  async getSession() {
    return getClient().auth.getSession();
  },

  onAuthStateChange(callback: Parameters<SupabaseClient['auth']['onAuthStateChange']>[0]) {
    return getClient().auth.onAuthStateChange(callback);
  },
};

export const userService = {
  async getProfile(userId: string) {
    return getClient().from('users').select('*').eq('id', userId).maybeSingle();
  },

  async updateProfile(userId: string, data: Record<string, unknown>) {
    const payload: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if ('name' in data) payload.name = data.name;
    if ('phone' in data) payload.phone = data.phone;
    if ('bio' in data) payload.bio = data.bio;
    if ('profilePicture' in data) payload.profile_picture = data.profilePicture;

    return getClient().from('users').update(payload).eq('id', userId).select().single();
  },

  async createProfile(userId: string, data: { email: string; name?: string }) {
    return getClient()
      .from('users')
      .insert([
        {
          id: userId,
          email: data.email,
          name: data.name ?? null,
        },
      ])
      .select()
      .single();
  },
};

export const uploadService = {
  async getUploads(userId: string) {
    return getClient().from('uploads').select('*').eq('user_id', userId).order('created_at', { ascending: false });
  },

  async createUpload(data: Record<string, unknown>) {
    return getClient().from('uploads').insert([data]).select().single();
  },

  async deleteUpload(id: string) {
    return getClient().from('uploads').delete().eq('id', id);
  },
};

export const quizService = {
  async getQuizzes(userId: string) {
    return getClient().from('quizzes').select('*').eq('user_id', userId).order('created_at', { ascending: false });
  },

  async createQuiz(data: Record<string, unknown>) {
    return getClient().from('quizzes').insert([data]).select().single();
  },

  async getQuiz(id: string) {
    return getClient().from('quizzes').select('*').eq('id', id).single();
  },

  async deleteQuiz(id: string) {
    return getClient().from('quizzes').delete().eq('id', id);
  },
};

export const flashcardService = {
  async getFlashcards(userId: string) {
    return getClient().from('flashcards').select('*').eq('user_id', userId).order('created_at', { ascending: false });
  },

  async createFlashcard(data: Record<string, unknown>) {
    return getClient().from('flashcards').insert([data]).select().single();
  },

  async deleteFlashcard(id: string) {
    return getClient().from('flashcards').delete().eq('id', id);
  },

  async updateFlashcard(id: string, data: Record<string, unknown>) {
    return getClient().from('flashcards').update(data).eq('id', id).select().single();
  },
};

export const mockInterviewService = {
  async getInterviews(userId: string) {
    return getClient()
      .from('mock_interviews')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
  },

  async createInterview(data: Record<string, unknown>) {
    return getClient().from('mock_interviews').insert([data]).select().single();
  },

  async getInterview(id: string) {
    return getClient().from('mock_interviews').select('*').eq('id', id).single();
  },

  async updateInterview(id: string, data: Record<string, unknown>) {
    return getClient().from('mock_interviews').update(data).eq('id', id).select().single();
  },
};

export const resumeService = {
  async getResumes(userId: string) {
    return getClient().from('resumes').select('*').eq('user_id', userId).order('created_at', { ascending: false });
  },

  async createResume(data: Record<string, unknown>) {
    return getClient().from('resumes').insert([data]).select().single();
  },

  async getResume(id: string) {
    return getClient().from('resumes').select('*').eq('id', id).single();
  },

  async deleteResume(id: string) {
    return getClient().from('resumes').delete().eq('id', id);
  },
};

export const subscriptionService = {
  async getSubscription(userId: string) {
    return getClient().from('subscriptions').select('*').eq('user_id', userId).maybeSingle();
  },

  async createSubscription(data: Record<string, unknown>) {
    return getClient().from('subscriptions').insert([data]).select().single();
  },

  async updateSubscription(id: string, data: Record<string, unknown>) {
    return getClient().from('subscriptions').update(data).eq('id', id).select().single();
  },
};

export const transactionService = {
  async getTransactions(userId: string) {
    return getClient()
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
  },

  async createTransaction(data: Record<string, unknown>) {
    return getClient().from('transactions').insert([data]).select().single();
  },

  async getTransaction(id: string) {
    return getClient().from('transactions').select('*').eq('id', id).single();
  },
};
