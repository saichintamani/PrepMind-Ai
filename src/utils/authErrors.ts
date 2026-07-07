import { isSupabaseConfigured } from '../lib/supabaseConfig';

export function formatAuthError(error: unknown): string {
  const message =
    error instanceof Error
      ? error.message
      : typeof error === 'object' && error !== null && 'message' in error
        ? String((error as { message: unknown }).message)
        : 'Something went wrong. Please try again.';

  if (!isSupabaseConfigured()) {
    return message;
  }

  const normalized = message.toLowerCase();

  if (
    normalized.includes('failed to fetch') ||
    normalized.includes('networkerror') ||
    normalized.includes('network request failed')
  ) {
    return 'Cannot reach Supabase. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env, confirm your project is active, then restart the dev server.';
  }

  if (normalized.includes('invalid api key') || normalized.includes('invalid jwt')) {
    return 'Invalid Supabase API key. Copy the anon public key from your Supabase project settings into VITE_SUPABASE_ANON_KEY.';
  }

  return message;
}
