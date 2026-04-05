import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// Helper pour éviter les crashs pendant le build Vercel
const getEnv = (key: string) => {
  if (typeof import.meta.env !== 'undefined' && import.meta.env[key]) return import.meta.env[key];
  if (typeof process !== 'undefined' && process.env[key]) return process.env[key];
  return undefined;
};

const supabaseUrl = getEnv('PUBLIC_SUPABASE_URL') || 'https://placeholder-build.supabase.co';
const supabaseAnonKey = getEnv('PUBLIC_SUPABASE_ANON_KEY') || 'placeholder-key';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
