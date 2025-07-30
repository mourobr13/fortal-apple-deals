
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

  const fetchProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user:', userId);
      
      const { data: profileData, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }
      
      console.log('Profile fetched:', profileData);
      return profileData as Profile;
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      return null;
    }
  };

  useEffect(() => {
    console.log('Setting up auth listener...');
    
    // Configurar listener de mudanças de auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, !!session);
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Buscar profile apenas se o usuário estiver logado
          setTimeout(async () => {
            const profileData = await fetchProfile(session.user.id);
            setProfile(profileData);
            
            // Atualizar last_login se necessário
            if (event === 'SIGNED_IN' && profileData) {
              supabase
                .from('profiles')
                .update({ last_login: new Date().toISOString() })
                .eq('id', session.user.id)
                .then(() => console.log('Last login updated'));
            }
          }, 0);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Verificar sessão existente
    supabase.auth.getSession().then(async ({ data: { session }, error }) => {
      console.log('Initial session check:', !!session, error);
      
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const profileData = await fetchProfile(session.user.id);
        setProfile(profileData);
      }
      
      setLoading(false);
    });

    return () => {
      console.log('Cleaning up auth listener');
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log('Signing in user:', email);
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      console.error('Sign in error:', error);
    } else {
      console.log('Sign in successful');
    }
    
    return { data, error };
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    console.log('Signing up user:', email);
    
    const redirectUrl = `${window.location.origin}/`;
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName || ''
        }
      }
    });
    
    return { data, error };
  };

  const signOut = async () => {
    console.log('Signing out user');
    
    const { error } = await supabase.auth.signOut();
    
    if (!error) {
      setUser(null);
      setSession(null);
      setProfile(null);
    }
    
    return { error };
  };

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) return { error: new Error('Usuário não autenticado') };

    // Security: Only allow updating safe fields, prevent privilege escalation
    const safeUpdates: Partial<Profile> = {};
    const allowedFields = ['full_name', 'phone'] as const;
    
    for (const field of allowedFields) {
      if (field in updates && updates[field] !== undefined) {
        // Input validation
        if (field === 'full_name' && updates[field]) {
          if (typeof updates[field] !== 'string' || updates[field]!.length > 100) {
            return { error: new Error('Nome deve ter no máximo 100 caracteres') };
          }
        }
        if (field === 'phone' && updates[field]) {
          const phoneRegex = /^\+?[1-9]\d{1,14}$/;
          if (typeof updates[field] !== 'string' || !phoneRegex.test(updates[field]!)) {
            return { error: new Error('Formato de telefone inválido') };
          }
        }
        safeUpdates[field] = updates[field];
      }
    }

    if (Object.keys(safeUpdates).length === 0) {
      return { error: new Error('Nenhum campo válido para atualizar') };
    }

    const { data, error } = await supabase
      .from('profiles')
      .update(safeUpdates)
      .eq('id', user.id)
      .select()
      .single();

    if (data && !error) {
      setProfile(data);
    }

    return { data, error };
  };

  const updateUserRole = async (userId: string, role: string) => {
    if (!user || !isAdmin) {
      return { error: new Error('Acesso negado: apenas administradores podem alterar roles') };
    }

    const { data, error } = await supabase
      .from('profiles')
      .update({ role })
      .eq('id', userId)
      .select()
      .single();

    return { data, error };
  };

  const isAdmin = profile?.role === 'admin';
  const isActive = profile?.is_active ?? false;

  console.log('useAuth state:', { 
    hasUser: !!user, 
    isAdmin, 
    loading, 
    profileRole: profile?.role 
  });

  return {
    user,
    session,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    updateUserRole,
    isAdmin,
    isActive
  };
};
