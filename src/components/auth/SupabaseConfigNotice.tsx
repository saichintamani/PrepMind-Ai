import React from 'react';
import { isSupabaseConfigured } from '../../lib/supabaseConfig';

const SupabaseConfigNotice: React.FC = () => {
  if (isSupabaseConfigured()) return null;

  const isDev = import.meta.env.DEV;

  return (
    <div
      className={`mb-6 p-4 rounded-lg border text-sm ${
        isDev
          ? 'bg-amber-50 border-amber-200 text-amber-900'
          : 'bg-red-50 border-red-200 text-red-700'
      }`}
    >
      {isDev ? (
        <>
          <p className="font-semibold">Demo mode (local auth)</p>
          <p className="mt-1">
            Supabase is not configured, so sign-in and sign-up use browser storage for local testing
            only. Add your project URL and anon key to <code className="text-xs">.env</code> and
            restart the dev server for real accounts.
          </p>
        </>
      ) : (
        <>
          <p className="font-semibold">Authentication unavailable</p>
          <p className="mt-1">
            Supabase credentials are missing or invalid. Set VITE_SUPABASE_URL and
            VITE_SUPABASE_ANON_KEY, then redeploy.
          </p>
        </>
      )}
    </div>
  );
};

export default SupabaseConfigNotice;
