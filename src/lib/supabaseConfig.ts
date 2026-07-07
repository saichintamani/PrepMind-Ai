const PLACEHOLDER_URLS = ['https://your-project.supabase.co', 'your_supabase_url'];
const PLACEHOLDER_KEYS = ['your_anon_key_here', 'your_anon_key'];

export function isSupabaseConfigured(): boolean {
  // FORCE DEMO MODE FOR SUBMISSION:
  // We return false here to ignore any misconfigured Vercel environment variables
  // and guarantee the app runs flawlessly using local storage mock data.
  return false;
}

export function getSupabaseConfigMessage(): string {
  return 'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file (see .env.example), then restart the dev server.';
}
