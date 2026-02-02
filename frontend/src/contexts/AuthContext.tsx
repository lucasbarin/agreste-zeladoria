'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';
import { authService } from '@/lib/auth';
import { useRouter } from 'next/navigation';

interface AuthContextData {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Carregar usuário do localStorage
    const loadUser = () => {
      const storedUser = authService.getUser();
      if (storedUser) {
        setUser(storedUser);
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      setUser(response.user);
      
      // Redirecionar baseado no role
      if (response.user.role === 'admin') {
        router.push('/admin/dashboard');
      } else {
        router.push('/morador/dashboard');
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erro ao fazer login');
    }
  };

  const register = async (data: any) => {
    try {
      const response = await authService.register(data);
      
      // Se retornou pendingApproval, não fazer login automático
      if ((response as any).pendingApproval) {
        router.push('/login?registered=true');
        return;
      }
      
      // Apenas fazer login se retornou token
      if (response.token && response.user) {
        setUser(response.user);
        
        // Redirecionar baseado no role
        if (response.user.role === 'admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/morador/dashboard');
        }
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Erro ao criar conta');
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
};
