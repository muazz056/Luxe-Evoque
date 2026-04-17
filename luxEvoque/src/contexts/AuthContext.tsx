'use client';

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import type { User, AuthState, ScentProfile } from '@/types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signup: (userData: SignupData) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
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
const USERS_STORAGE_KEY = 'perfume-store-users';

// Simulated user database (in real app, this would be server-side)
let userDatabase: User[] = [];

function generateId(): string {
  return `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_USER':
      return {
        user: action.payload,
        isAuthenticated: true,
        sessionToken: `token-${Date.now()}`,
      };

    case 'SET_SESSION':
      return {
        user: action.payload.user,
        isAuthenticated: true,
        sessionToken: action.payload.token,
      };

    case 'LOGOUT':
      return {
        user: null,
        isAuthenticated: false,
        sessionToken: null,
      };

    case 'UPDATE_USER':
      if (!state.user) return state;
      return {
        ...state,
        user: { ...state.user, ...action.payload, updatedAt: new Date().toISOString() },
      };

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

  // Load auth state from localStorage on mount
  useEffect(() => {
    try {
      const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
      const savedUsers = localStorage.getItem(USERS_STORAGE_KEY);

      if (savedUsers) {
        userDatabase = JSON.parse(savedUsers);
      }

      if (savedAuth) {
        const parsedAuth = JSON.parse(savedAuth);
        // Verify token is still valid (simple check)
        if (parsedAuth.sessionToken && parsedAuth.user) {
          dispatch({ type: 'LOAD_AUTH', payload: parsedAuth });
        }
      }
    } catch (error) {
      console.error('Failed to load auth from localStorage:', error);
    }
  }, []);

  // Save auth state to localStorage whenever it changes
  useEffect(() => {
    try {
      if (authState.isAuthenticated && authState.user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    } catch (error) {
      console.error('Failed to save auth to localStorage:', error);
    }
  }, [authState]);

  // Save user database periodically
  useEffect(() => {
    try {
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(userDatabase));
    } catch (error) {
      console.error('Failed to save users to localStorage:', error);
    }
  }, []);

  const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Find user in database
    const user = userDatabase.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return { success: false, message: 'No account found with this email. Please sign up first.' };
    }

    // In a real app, we'd verify password hash. Here we just check it exists.
    // For demo, any password works if user exists
    const token = `token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    dispatch({
      type: 'SET_SESSION',
      payload: { user, token }
    });

    return { success: true, message: 'Login successful!' };
  };

  const signup = async (userData: SignupData): Promise<{ success: boolean; message: string }> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check if email already exists
    const existingUser = userDatabase.find(u => u.email.toLowerCase() === userData.email.toLowerCase());

    if (existingUser) {
      return { success: false, message: 'An account with this email already exists. Please login instead.' };
    }

    // Create new user
    const newUser: User = {
      id: generateId(),
      fullName: userData.fullName,
      email: userData.email.toLowerCase(),
      phone: userData.phone,
      address: userData.address,
      city: userData.city,
      country: userData.country,
      postalCode: userData.postalCode,
      preferredFragranceTypes: userData.preferredFragranceTypes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Add to database
    userDatabase.push(newUser);

    // Auto-login after signup
    const token = `token-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    dispatch({
      type: 'SET_SESSION',
      payload: { user: newUser, token }
    });

    return { success: true, message: 'Account created successfully!' };
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (userData: Partial<User>) => {
    if (!authState.user) return;

    const updatedUser = { ...authState.user, ...userData, updatedAt: new Date().toISOString() };

    // Update in database
    const index = userDatabase.findIndex(u => u.id === authState.user?.id);
    if (index >= 0) {
      userDatabase[index] = updatedUser;
    }

    dispatch({ type: 'UPDATE_USER', payload: userData });
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        signup,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}