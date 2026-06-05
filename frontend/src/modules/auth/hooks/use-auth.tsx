'use client';

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useMemo,
} from 'react';

import { signIn, signOut, signUp, useSession } from '../lib/auth-client';

interface AuthContextValue {
  user: { id: string; email: string; name: string } | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: { email: string; password: string }) => Promise<void>;
  register: (data: {
    email: string;
    name: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, isPending } = useSession();

  const login = useCallback(
    async (data: { email: string; password: string }) => {
      const { error } = await signIn.email({
        email: data.email,
        password: data.password,
      });
      if (error) throw new Error(error.message ?? 'Login failed');
    },
    [],
  );

  const register = useCallback(
    async (data: { email: string; name: string; password: string }) => {
      const { error } = await signUp.email({
        email: data.email,
        name: data.name,
        password: data.password,
      });
      if (error) throw new Error(error.message ?? 'Registration failed');
    },
    [],
  );

  const logout = useCallback(async () => {
    await signOut();
  }, []);

  const user = session?.user
    ? {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
      }
    : null;

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoading: isPending,
      isAuthenticated: user !== null,
      login,
      register,
      logout,
    }),
    [user, isPending, login, register, logout],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
