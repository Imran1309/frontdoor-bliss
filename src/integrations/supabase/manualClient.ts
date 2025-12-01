// Custom Supabase client that avoids relying on Vite env injection issues
// NOTE: We intentionally do NOT modify the auto-generated client.ts file.
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// These values come from the existing .env configuration / Lovable Cloud backend
const SUPABASE_URL = "https://mfnombvwxgnbglqvespu.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mbm9tYnZ3eGduYmdscXZlc3B1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ1MDg3NzQsImV4cCI6MjA4MDA4NDc3NH0.0szRQCsUuL7U7KrfZ_cn7W6CnGBQYKdgvgdUJHxCjIc";

export const manualSupabaseClient = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      storage: localStorage,
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);
