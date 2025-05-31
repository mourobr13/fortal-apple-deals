
import { useState, useEffect } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  id: string;
  email: string | null;
  role: string;
  full_name: string | null;
  phone: string | null;
  is_active: boolean;
  last_login: string | null;
  created_at: string;
  updated_at: string | null;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch user profile with all fields
          const { data: profileData } = await supabase
            .from('profiles')
            .select('id, email, role, full_name, phone, is_active, last_login, created_at, updated_at')
            .eq('id', session.user.id)
            .single();
          
          if (profileData) {
            setProfile(profileData as Profile);

            // Update last_login if user just signed in
            if (event === 'SIGNED_IN') {
              await supabase
                .from('profiles')
                .update({ last_login: new Date().toISOString() })
                .eq('id', session.user.id);
            }
          }
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // Fetch user profile for existing session
        const { data: profileData } = await supabase
          .from('profiles')
          .select('id, email, role, full_name, phone, is_active, last_login, created_at, updated_at')
          .eq('id', session.user.id)
          .single();
          
        if (profileData) {
          setProfile(profileData as Profile);
        }
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName || ''
        }
      }
    });
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: new Error('Usuário não autenticado') };

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();

    if (data && !error) {
      setProfile(data);
    }

    return { data, error };
  };

  return {
    user,
    session,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    isAdmin: profile?.role === 'admin',
    isActive: profile?.is_active ?? false
  };
};
