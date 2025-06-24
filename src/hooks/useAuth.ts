'use client';

import { useState, useEffect } from 'react';
import { supabase, getCurrentUser, hasCourseAccess } from '@/lib/auth';
import { User } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        setHasAccess(hasCourseAccess(currentUser));
      } catch {
        // Silent fail for missing session - this is expected behavior
        console.debug('No active session found - user needs to login');
        setUser(null);
        setHasAccess(false);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        
        if (session?.user) {
          setUser(session.user);
          setHasAccess(hasCourseAccess(session.user));
        } else {
          setUser(null);
          setHasAccess(false);
        }
        
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    user,
    loading,
    hasAccess,
    isAuthenticated: !!user,
  };
} 