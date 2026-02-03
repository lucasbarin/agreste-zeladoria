'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';

export default function NetworkStatus() {
  const [status, setStatus] = useState<'checking' | 'online' | 'slow' | 'offline'>('checking');
  const [ping, setPing] = useState<number | null>(null);

  useEffect(() => {
    const checkStatus = async () => {
      const start = Date.now();
      try {
        await api.get('/api/health');
        const duration = Date.now() - start;
        setPing(duration);
        
        if (duration < 1000) {
          setStatus('online');
        } else if (duration < 5000) {
          setStatus('slow');
        } else {
          setStatus('slow');
        }
      } catch (error) {
        setStatus('offline');
        setPing(null);
      }
    };

    // Verificar ao montar e a cada 30s
    checkStatus();
    const interval = setInterval(checkStatus, 30000);
    
    return () => clearInterval(interval);
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
