import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from './supabaseClient';
import { useTranslation } from 'react-i18next';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { t } = useTranslation('common');
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);
  const [role, setRole] = useState('user');
  const [loading, setLoading] = useState(true);
  const [requireEmailVerification, setRequireEmailVerification] = useState(false);
  const [requirePasswordChange, setRequirePasswordChange] = useState(false);

  // Listen to auth state changes
  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data }) => {
      setUser(data?.session?.user || null);
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user || null);
      setLoading(false);
      if (session?.user) {
        // Extract name, avatar, role from user_metadata or identities
        let name = session.user.user_metadata?.name || session.user.user_metadata?.full_name || null;
        let avatar = session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture || null;
        // If Google, get from identities
        if (session.user.identities && session.user.identities.length > 0) {
          const identity = session.user.identities[0];
          if (identity.provider === 'google') {
            name = identity.identity_data?.full_name || identity.identity_data?.name || name;
            avatar = identity.identity_data?.avatar_url || identity.identity_data?.picture || avatar;
          }
        }
        setUserName(name);
        setUserAvatar(avatar);
        setRole(session.user.user_metadata?.role || 'user');
        // On first Google login, update user_metadata with name/avatar/role
        if (!session.user.user_metadata?.role && session.user.app_metadata?.provider === 'google') {
          await supabase.auth.updateUser({
            data: {
              name,
              avatar_url: avatar,
              role: 'user',
            },
          });
          setRole('user');
        }
      } else {
        setUserName(null);
        setUserAvatar(null);
        setRole('user');
      }
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  // Check if user needs to verify email or change password
  useEffect(() => {
    if (user) {
      if (!user.email_confirmed_at) {
        setRequireEmailVerification(true);
      } else {
        setRequireEmailVerification(false);
      }
      // Supabase: check if user is using temp password ("new" users)
      if (user?.user_metadata?.must_change_password) {
        setRequirePasswordChange(true);
      } else {
        setRequirePasswordChange(false);
      }
    } else {
      setRequireEmailVerification(false);
      setRequirePasswordChange(false);
    }
  }, [user]);

  // Sign in with email/password
  const signIn = useCallback(async (email, password) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) throw error;
    return data;
  }, []);

  // Sign in with Google
  const signInWithGoogle = useCallback(async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    setLoading(false);
    if (error) {
      if (error.message && error.message.toLowerCase().includes('already registered')) {
        throw new Error(t('email_already_registered', 'البريد الإلكتروني مسجل بالفعل'));
      }
      throw error;
    }
  }, [t]);

  // Sign up (register)
  const signUp = useCallback(async (email, password) => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: typeof window !== 'undefined' ? window.location.origin + '/auth/verify' : undefined,
      },
    });
    setLoading(false);
    if (error) throw error;
    return data;
  }, []);

  // Sign out
  const signOut = useCallback(async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
  }, []);

  // Change password (after first login)
  const changePassword = useCallback(async (newPassword) => {
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });
    setLoading(false);
    if (error) throw error;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        userName,
        userAvatar,
        role,
        loading,
        requireEmailVerification,
        requirePasswordChange,
        signIn,
        signInWithGoogle,
        signUp,
        signOut,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 