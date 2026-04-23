import { createClient } from '@supabase/supabase-js';

// İsimlerin NEXT_PUBLIC_ ile başladığından emin ol
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl || "", supabaseAnonKey || "");