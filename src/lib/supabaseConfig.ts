const PLACEHOLDER_URLS = ['https://your-project.supabase.co', 'your_supabase_url'];
const PLACEHOLDER_KEYS = ['your_anon_key_here', 'your_anon_key'];

export function isSupabaseConfigured(): boolean {
  const rawUrl = import.meta.env.VITE_SUPABASE_URL?.trim();
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

  if (!rawUrl || !key) return false;
  
  // Clean up the URL in case the user accidentally included the API path (e.g., /rest/v1/)
  const url = rawUrl.replace(/\/rest\/v1\/?$/, '');

  if (PLACEHOLDER_URLS.some((p) => url === p || url.includes('your-project'))) return false;
  if (PLACEHOLDER_KEYS.some((p) => key === p || key.startsWith('your_'))) return false;

  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && parsed.hostname.endsWith('.supabase.co');
  } catch {
    return false;
  }
}

export function getSupabaseConfigMessage(): string {
  return 'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file (see .env.example), then restart the dev server.';
}
