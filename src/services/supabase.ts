import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const authService = {
  async signUp(email: string, password: string) {
    return supabase.auth.signUp({ email, password });
  },

  async signIn(email: string, password: string) {
    return supabase.auth.signInWithPassword({ email, password });
  },

  async signOut() {
    return supabase.auth.signOut();
  },

  async resetPassword(email: string) {
    return supabase.auth.resetPasswordForEmail(email);
  },

  async updatePassword(newPassword: string) {
    return supabase.auth.updateUser({ password: newPassword });
  },

  async getSession() {
    return supabase.auth.getSession();
  },

  onAuthStateChange(callback: Parameters<typeof supabase.auth.onAuthStateChange>[0]) {
    return supabase.auth.onAuthStateChange(callback);
  },
};

export const userService = {
  async getProfile(userId: string) {
    return supabase.from('users').select('*').eq('id', userId).maybeSingle();
  },

  async updateProfile(userId: string, data: any) {
    return supabase.from('users').update(data).eq('id', userId).select().single();
  },

  async createProfile(userId: string, data: any) {
    return supabase.from('users').insert([{ id: userId, ...data }]).select().single();
  },
};

export const uploadService = {
  async getUploads(userId: string) {
    return supabase.from('uploads').select('*').eq('user_id', userId).order('created_at', { ascending: false });
  },

  async createUpload(data: any) {
    return supabase.from('uploads').insert([data]).select().single();
  },

  async deleteUpload(id: string) {
    return supabase.from('uploads').delete().eq('id', id);
  },
};

export const quizService = {
  async getQuizzes(userId: string) {
    return supabase.from('quizzes').select('*').eq('user_id', userId).order('created_at', { ascending: false });
  },

  async createQuiz(data: any) {
    return supabase.from('quizzes').insert([data]).select().single();
  },

  async getQuiz(id: string) {
    return supabase.from('quizzes').select('*').eq('id', id).single();
  },

  async deleteQuiz(id: string) {
    return supabase.from('quizzes').delete().eq('id', id);
  },
};

export const flashcardService = {
  async getFlashcards(userId: string) {
    return supabase.from('flashcards').select('*').eq('user_id', userId).order('created_at', { ascending: false });
  },

  async createFlashcard(data: any) {
    return supabase.from('flashcards').insert([data]).select().single();
  },

  async deleteFlashcard(id: string) {
    return supabase.from('flashcards').delete().eq('id', id);
  },

  async updateFlashcard(id: string, data: any) {
    return supabase.from('flashcards').update(data).eq('id', id).select().single();
  },
};

export const mockInterviewService = {
  async getInterviews(userId: string) {
    return supabase
      .from('mock_interviews')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
  },

  async createInterview(data: any) {
    return supabase.from('mock_interviews').insert([data]).select().single();
  },

  async getInterview(id: string) {
    return supabase.from('mock_interviews').select('*').eq('id', id).single();
  },

  async updateInterview(id: string, data: any) {
    return supabase.from('mock_interviews').update(data).eq('id', id).select().single();
  },
};

export const resumeService = {
  async getResumes(userId: string) {
    return supabase.from('resumes').select('*').eq('user_id', userId).order('created_at', { ascending: false });
  },

  async createResume(data: any) {
    return supabase.from('resumes').insert([data]).select().single();
  },

  async getResume(id: string) {
    return supabase.from('resumes').select('*').eq('id', id).single();
  },

  async deleteResume(id: string) {
    return supabase.from('resumes').delete().eq('id', id);
  },
};

export const subscriptionService = {
  async getSubscription(userId: string) {
    return supabase.from('subscriptions').select('*').eq('user_id', userId).maybeSingle();
  },

  async createSubscription(data: any) {
    return supabase.from('subscriptions').insert([data]).select().single();
  },

  async updateSubscription(id: string, data: any) {
    return supabase.from('subscriptions').update(data).eq('id', id).select().single();
  },
};

export const transactionService = {
  async getTransactions(userId: string) {
    return supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
  },

  async createTransaction(data: any) {
    return supabase.from('transactions').insert([data]).select().single();
  },

  async getTransaction(id: string) {
    return supabase.from('transactions').select('*').eq('id', id).single();
  },
};
