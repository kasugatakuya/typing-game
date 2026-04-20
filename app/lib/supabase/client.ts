import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/app/types/database";
import type { SupabaseClient } from "@supabase/supabase-js";

let supabaseClient: SupabaseClient<Database> | null = null;

export function createClient(): SupabaseClient<Database> | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Return null if environment variables are not available (e.g., during static generation)
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  // Singleton pattern for browser client
  if (supabaseClient) {
    return supabaseClient;
  }

  supabaseClient = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
  return supabaseClient;
}
