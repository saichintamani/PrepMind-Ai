import React from 'react';
import { isSupabaseConfigured } from '../../lib/supabaseConfig';

const SupabaseConfigNotice: React.FC = () => {
  if (isSupabaseConfigured()) return null;

  return null;
};

export default SupabaseConfigNotice;
