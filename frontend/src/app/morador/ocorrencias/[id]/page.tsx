'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { issueService } from '@/lib/issues';
import { Issue } from '@/types';
import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import('@/components/Map/LeafletMap'), {
  ssr: false,
  loading: () => <div className="bg-secondary rounded" style={{ height: '400px' }}>Carregando mapa...</div>
});

export default function IssueDetailPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [issue, setIssue] = useState<Issue | null>(null);
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

    const loadIssue = async () => {
      try {
        setLoading(true);
        const data = await issueService.getById(params.id as string);
        setIssue(data);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Erro ao carregar ocorrência');
      } finally {
        setLoading(false);
      }
    };

    loadIssue();
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

  if (error || !issue) {
    return (
      <>
        <div className="alert alert-danger">
          {error || 'Ocorrência não encontrada'}
        </div>
        <button onClick={() => router.back()} className="btn btn-secondary">
          <i className="ph-duotone ph-arrow-left me-2"></i>
          Voltar
        </button>
      </>
    );
  }

  const markers = [{
    id: issue.id,
    position: [issue.latitude, issue.longitude] as [number, number],
    popup: `<strong>${getTypeName(issue.type)}</strong>`
  }];

  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className="page-header-title">
                <h5 className="m-b-10">Detalhes da Ocorrência</h5>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">Home</li>
                <li className="breadcrumb-item"><a href="/morador/ocorrencias">Ocorrências</a></li>
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
          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Informações</h5>
                <hr />
                
                <div className="mb-3">
                  <strong>Tipo:</strong>
                  <p className="mb-0">{getTypeName(issue.type)}</p>
                </div>

                <div className="mb-3">
                  <strong>Status:</strong>
                  <br />
                  <span className={`badge bg-${getStatusColor(issue.status)}`}>
                    {getStatusName(issue.status)}
                  </span>
                </div>

                <div className="mb-3">
                  <strong>Descrição:</strong>
                  <p className="mb-0">{issue.description || 'Sem descrição'}</p>
                </div>

                <div className="mb-3">
                  <strong>Data de criação:</strong>
                  <p className="mb-0">
                    {new Date(issue.created_at).toLocaleString('pt-BR')}
                  </p>
                </div>

                <div className="mb-3">
                  <strong>Última atualização:</strong>
                  <p className="mb-0">
                    {new Date(issue.updated_at).toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 mb-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">Localização</h5>
                <hr />
                <div className="bg-secondary rounded d-flex align-items-center justify-content-center" style={{ height: '300px' }}>
                  <div className="text-center text-white">
                    <i className="ph-duotone ph-map-pin f-32"></i>
                    <p className="mt-2 mb-0">Mapa desabilitado temporariamente</p>
                  </div>
                </div>
                <p className="text-muted mt-2 mb-0 small">
                  Lat: {issue.latitude.toFixed(6)}, Lng: {issue.longitude.toFixed(6)}
                </p>
              </div>
            </div>

            {issue.photo_url && (
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Foto</h5>
                  <hr />
                  <img 
                    src={issue.photo_url.startsWith('http') ? issue.photo_url : `${process.env.NEXT_PUBLIC_API_URL}${issue.photo_url}`}
                    alt="Foto da ocorrência"
                    className="img-fluid rounded"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
    </>
  );
}

function getTypeName(type: string): string {
  const types: Record<string, string> = {
    poste_com_luz_queimada: 'Poste com Luz Queimada',
    buraco_na_rua: 'Buraco na Rua',
    sujeira_ou_entulho: 'Sujeira ou Entulho'
  };
  return types[type] || type;
}

function getStatusName(status: string): string {
  const statuses: Record<string, string> = {
    aberto: 'Aberto',
    em_andamento: 'Em Andamento',
    resolvido: 'Resolvido'
  };
  return statuses[status] || status;
}

function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    aberto: 'danger',
    em_andamento: 'warning',
    resolvido: 'success'
  };
  return colors[status] || 'secondary';
}
