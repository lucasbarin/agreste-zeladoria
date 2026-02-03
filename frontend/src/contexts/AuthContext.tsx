'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { User } from '@/types';
import { authService } from '@/lib/auth';
import { pushNotificationService } from '@/lib/notifications';
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
  const loadedRef = useRef(false);

  useEffect(() => {
    // Prevenir múltiplas execuções
    if (loadedRef.current) return;
    loadedRef.current = true;
    
    // Carregar usuário do localStorage e validar token
    const loadUser = async () => {
      const storedUser = authService.getUser();
      const token = authService.getToken();
      
      if (storedUser && token) {
        try {
          // Validar se o token ainda é válido (com timeout de 10s)
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 10000);
          
          const validUser = await authService.me();
          clearTimeout(timeoutId);
          setUser(validUser);
        } catch (error: any) {
          // Se for timeout ou erro de rede, manter usuário logado
          if (error.name === 'AbortError' || error.code === 'ECONNABORTED' || !navigator.onLine) {
            console.log('Erro de rede ou timeout, mantendo usuário logado localmente');
            setUser(storedUser);
          } else {
            // Token inválido ou expirado - fazer logout
            console.log('Token expirado ou inválido, fazendo logout...');
            authService.logout();
            setUser(null);
          }
        }
      }
      setLoading(false);
    };

    loadUser();
    
    // Inicializar push notifications
    pushNotificationService.initialize();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      setUser(response.user);
      
      // Registrar device token para push notifications
      const deviceToken = pushNotificationService.getDeviceToken();
      if (deviceToken) {
        await pushNotificationService.registerDeviceToken(deviceToken);
      }
      
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

  const logout = async () => {
    // Remover device token do backend
    await pushNotificationService.unregisterDeviceToken();
    
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
