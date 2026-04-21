'use client';

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type { User, AuthState, ScentProfile } from '@/types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signup: (userData: SignupData) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

interface SignupData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  preferredFragranceTypes: ScentProfile[];
}

type AuthAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_SESSION'; payload: { user: User; token: string } }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'LOAD_AUTH'; payload: AuthState };

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'perfume-store-auth';

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_USER':
      return { user: action.payload, isAuthenticated: true, sessionToken: `token-${Date.now()}` };
    case 'SET_SESSION':
      return { user: action.payload.user, isAuthenticated: true, sessionToken: action.payload.token };
    case 'LOGOUT':
      return { user: null, isAuthenticated: false, sessionToken: null };
    case 'UPDATE_USER':
      if (!state.user) return state;
      return { ...state, user: { ...state.user, ...action.payload, updatedAt: new Date().toISOString() } };
    case 'LOAD_AUTH':
      return action.payload;
    default:
      return state;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authState, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    sessionToken: null,
  });

  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
      if (savedAuth) {
        const parsedAuth = JSON.parse(savedAuth);
        if (parsedAuth.sessionToken && parsedAuth.user) {
          dispatch({ type: 'LOAD_AUTH', payload: parsedAuth });
        }
      }
    } catch (error) {
      console.error('Failed to load auth:', error);
    }
  }, []);

  useEffect(() => {
    try {
      if (authState.isAuthenticated && authState.user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (error) {
      console.error('Failed to save auth:', error);
    }
  }, [authState]);

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password,
      });

      if (error) return { success: false, message: error.message };

      if (data.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        const user: User = {
          id: data.user.id,
          email: data.user.email || email.toLowerCase(),
          fullName: profile?.full_name || data.user.user_metadata?.fullName || '',
          phone: profile?.phone || '',
          address: profile?.address || '',
          city: profile?.city || '',
          country: profile?.country || '',
          postalCode: profile?.postal_code || '',
          preferredFragranceTypes: profile?.preferred_fragrance_types || [],
          createdAt: profile?.created_at || new Date().toISOString(),
          updatedAt: profile?.updated_at || new Date().toISOString(),
        };

        dispatch({ type: 'SET_SESSION', payload: { user, token: data.session?.access_token || '' } });
        return { success: true, message: 'Login successful!' };
      }
      return { success: false, message: 'Invalid credentials' };
    } catch (error: any) {
      return { success: false, message: error.message || 'Login failed' };
    }
  };

  const signup = async (userData: SignupData): Promise<{ success: boolean; message: string }> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email.toLowerCase(),
        password: userData.password,
        options: { data: { fullName: userData.fullName } }
      });

      if (error) {
        if (error.message.includes('already registered')) {
          return { success: false, message: 'An account with this email already exists' };
        }
        return { success: false, message: error.message };
      }

      if (data.user) {
        const { error: profileError } = await supabase.from('profiles').insert({
          id: data.user.id,
          full_name: userData.fullName,
          email: userData.email.toLowerCase(),
          phone: userData.phone,
          address: userData.address,
          city: userData.city,
          country: userData.country,
          postal_code: userData.postalCode,
          preferred_fragrance_types: userData.preferredFragranceTypes,
        });

        if (profileError) {
          console.error('Profile error:', profileError);
        }

        const user: User = {
          id: data.user.id,
          email: userData.email.toLowerCase(),
          fullName: userData.fullName,
          phone: userData.phone,
          address: userData.address,
          city: userData.city,
          country: userData.country,
          postalCode: userData.postalCode,
          preferredFragranceTypes: userData.preferredFragranceTypes,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        dispatch({ type: 'SET_SESSION', payload: { user, token: data.session?.access_token || '' } });
        return { success: true, message: 'Account created successfully!' };
      }
      return { success: false, message: 'Signup failed' };
    } catch (error: any) {
      console.error('Signup error:', error);
      return { success: false, message: error.message || 'Signup failed' };
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (userData: Partial<User>) => {
    if (!authState.user) return;

    supabase
      .from('profiles')
      .update({
        full_name: userData.fullName,
        phone: userData.phone,
        address: userData.address,
        city: userData.city,
        country: userData.country,
        postal_code: userData.postalCode,
        updated_at: new Date().toISOString(),
      })
      .eq('id', authState.user.id)
      .then(({ error }) => {
        if (error) console.error('Error updating profile:', error);
      });

    dispatch({ type: 'UPDATE_USER', payload: userData });
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}