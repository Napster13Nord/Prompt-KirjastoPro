import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth types
export interface User {
  id: string;
  email: string;
  created_at: string;
  course_access: boolean;
  access_code?: string;
}

// Auth functions
export const signUp = async (email: string, password: string, accessCode: string, fullName?: string) => {
  // Validate access code first
  if (accessCode !== process.env.NEXT_PUBLIC_COURSE_ACCESS_CODE && accessCode !== 'CURSO2024') {
    throw new Error('Virheellinen pääsykoodi. Sinun täytyy ostaa kurssi päästäksesi sisään.');
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        course_access: true,
        access_code: accessCode,
        full_name: fullName || '',
      }
    }
  });

  if (error) throw error;
  return data;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    // If there's no session, return null instead of throwing
    if (error && error.message.includes('session_not_found')) {
      return null;
    }
    
    if (error) throw error;
    return user;
  } catch (error) {
    // For auth session missing, return null instead of throwing
    if (error instanceof Error && error.message.includes('Auth session missing')) {
      return null;
    }
    throw error;
  }
};

// Check if user has course access
export const hasCourseAccess = (user: { user_metadata?: { course_access?: boolean } } | null) => {
  if (!user) return false;
  return user.user_metadata?.course_access === true;
}; 