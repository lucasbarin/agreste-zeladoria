'use client';

import { useEffect, useState, useRef } from 'react';
import api from '@/lib/api';

export default function NetworkStatus() {
  const [status, setStatus] = useState<'checking' | 'online' | 'slow' | 'offline'>('online');
  const [ping, setPing] = useState<number | null>(null);
  const isCheckingRef = useRef(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;
    
    const checkStatus = async () => {
      // Prevenir múltiplas requisições simultâneas
      if (isCheckingRef.current || !mountedRef.current) return;
      
      isCheckingRef.current = true;
      const start = Date.now();
      
      try {
        await api.get('/api/health', { timeout: 8000 });
        const duration = Date.now() - start;
        
        if (!mountedRef.current) return;
        
        setPing(duration);
        
        if (duration < 1000) {
          setStatus('online');
        } else if (duration < 5000) {
          setStatus('slow');
        } else {
          setStatus('slow');
        }
      } catch (error) {
        if (!mountedRef.current) return;
        setStatus('offline');
        setPing(null);
      } finally {
        isCheckingRef.current = false;
      }
    };

    // Verificar após 5s (dar tempo do backend acordar) e depois a cada 60s
    const initialTimeout = setTimeout(checkStatus, 5000);
    const interval = setInterval(checkStatus, 60000);
    
    return () => {
      mountedRef.current = false;
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  // Mostrar apenas se houver problemas
  if (status === 'online' && ping !== null && ping < 1000) {
    return null;
  }

  const getStatusColor = () => {
    switch (status) {
      case 'checking': return 'bg-secondary text-muted';
      case 'online': return 'bg-success text-white';
      case 'slow': return 'bg-warning text-dark';
      case 'offline': return 'bg-danger text-white';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'checking': return 'Verificando...';
      case 'online': return `Online (${ping}ms)`;
      case 'slow': return ping ? `Lento (${ping}ms) - Aguarde...` : 'Conexão lenta';
      case 'offline': return 'Servidor offline';
    }
  };

  return (
    <div className={`position-fixed bottom-0 end-0 m-3 px-3 py-2 rounded ${getStatusColor()}`} style={{ zIndex: 1050, fontSize: '0.875rem' }}>
      <i className={`bi ${status === 'checking' ? 'bi-hourglass-split' : status === 'online' ? 'bi-check-circle' : status === 'slow' ? 'bi-exclamation-triangle' : 'bi-x-circle'} me-2`}></i>
      {getStatusText()}
    </div>
  );
}
