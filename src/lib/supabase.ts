import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      prompts: {
        Row: {
          id: string;
          act: string;
          prompt: string;
          for_devs: boolean;
          category: string | null;
          tags: string[] | null;
          platforms: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          act: string;
          prompt: string;
          for_devs?: boolean;
          category?: string | null;
          tags?: string[] | null;
          platforms?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          act?: string;
          prompt?: string;
          for_devs?: boolean;
          category?: string | null;
          tags?: string[] | null;
          platforms?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      vibe_prompts: {
        Row: {
          id: string;
          app: string;
          prompt: string;
          contributor: string;
          techstack: string;
          category: string | null;
          tags: string[] | null;
          platforms: string[] | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          app: string;
          prompt: string;
          contributor: string;
          techstack: string;
          category?: string | null;
          tags?: string[] | null;
          platforms?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          app?: string;
          prompt?: string;
          contributor?: string;
          techstack?: string;
          category?: string | null;
          tags?: string[] | null;
          platforms?: string[] | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}; 