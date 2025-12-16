'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function MoradorDashboard() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className="page-header-title">
                <h5 className="m-b-10">Olá, {user.name}!</h5>
              </div>
              <p className="text-muted">
                {user.apartment_or_house || 'Endereço não informado'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body text-center">
              <div className="avtar avtar-xl bg-light-primary mb-3 mx-auto">
                <i className="ph-duotone ph-plus-circle f-32"></i>
              </div>
              <h5 className="card-title">Nova Ocorrência</h5>
              <p className="card-text text-muted">
                Reporte um problema nas áreas comuns do condomínio
              </p>
              <a href="/morador/nova-ocorrencia" className="btn btn-primary">
                <i className="ph-duotone ph-plus me-2"></i>
                Criar Ocorrência
              </a>
            </div>
          </div>
        </div>

        <div className="col-md-6 mb-4">
          <div className="card">
            <div className="card-body text-center">
              <div className="avtar avtar-xl bg-light-info mb-3 mx-auto">
                <i className="ph-duotone ph-list f-32"></i>
              </div>
              <h5 className="card-title">Minhas Ocorrências</h5>
              <p className="card-text text-muted">
                Acompanhe o status das suas ocorrências
              </p>
              <a href="/morador/ocorrencias" className="btn btn-info">
                <i className="ph-duotone ph-eye me-2"></i>
                Ver Ocorrências
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
