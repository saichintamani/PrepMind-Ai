import React from 'react';
import { isSupabaseConfigured } from '../../lib/supabaseConfig';

const SupabaseConfigNotice: React.FC = () => {
  if (isSupabaseConfigured()) return null;

  return (
    <div
      className={`mb-6 p-4 rounded-lg border text-sm bg-amber-50 border-amber-200 text-amber-900`}
    >
      <p className="font-semibold">Demo Mode</p>
      <p className="mt-1">
        Running in local storage demo mode. Your data will be saved to this browser for demonstration purposes.
      </p>
    </div>
  );
};

export default SupabaseConfigNotice;
