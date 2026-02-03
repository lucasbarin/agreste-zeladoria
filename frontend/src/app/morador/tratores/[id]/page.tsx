'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';

interface TractorRequest {
  id: string;
  user_id: string;
  requested_date: string;
  approved: boolean;
  approved_at?: string;
  approved_by?: string;
  created_at: string;
  user: {
    name: string;
    apartment_or_house?: string;
  };
}

export default function TractorDetailPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [request, setRequest] = useState<TractorRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
      return;
    }
    
    if (!user || !params.id) {
      setLoading(false);
      return;
    }

    const loadRequest = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/api/tractor/${params.id}`);
        setRequest(response.data.request);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Erro ao carregar solicitação');
      } finally {
        setLoading(false);
      }
    };

    loadRequest();
  }, [user, authLoading, params.id, router]);

  if (authLoading || loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  if (error || !request) {
    return (
      <>
        <div className="alert alert-danger">
          {error || 'Solicitação não encontrada'}
        </div>
        <button onClick={() => router.back()} className="btn btn-secondary">
          <i className="ph-duotone ph-arrow-left me-2"></i>
          Voltar
        </button>
      </>
    );
  }

  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className="page-header-title">
                <h5 className="m-b-10">Detalhes da Solicitação - Trator</h5>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">Home</li>
                <li className="breadcrumb-item"><a href="/morador/tratores">Tratores</a></li>
                <li className="breadcrumb-item">Detalhes</li>
              </ul>
            </div>
            <div className="col-md-12 mt-2">
              <button onClick={() => router.back()} className="btn btn-outline-secondary btn-sm">
                <i className="ph-duotone ph-arrow-left me-2"></i>
                Voltar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Informações da Solicitação</h5>
              <hr />
              
              <div className="row mb-3">
                <div className="col-sm-4">
                  <strong>Status:</strong>
                </div>
                <div className="col-sm-8">
                  {request.approved ? (
                    <span className="badge bg-success">Aprovado</span>
                  ) : (
                    <span className="badge bg-warning">Pendente</span>
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4">
                  <strong>Data Solicitada:</strong>
                </div>
                <div className="col-sm-8">
                  {new Date(request.requested_date).toLocaleDateString('pt-BR')}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4">
                  <strong>Solicitado em:</strong>
                </div>
                <div className="col-sm-8">
                  {new Date(request.created_at).toLocaleString('pt-BR')}
                </div>
              </div>

              {request.approved && request.approved_at && (
                <div className="row mb-3">
                  <div className="col-sm-4">
                    <strong>Aprovado em:</strong>
                  </div>
                  <div className="col-sm-8">
                    {new Date(request.approved_at).toLocaleString('pt-BR')}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Solicitante</h5>
              <hr />
              
              <div className="mb-2">
                <strong>Nome:</strong><br />
                {request.user.name}
              </div>

              {request.user.apartment_or_house && (
                <div className="mb-2">
                  <strong>Casa/Apto:</strong><br />
                  {request.user.apartment_or_house}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
