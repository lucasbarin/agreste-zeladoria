'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { issueService } from '@/lib/issues';
import { Issue, IssueStatus } from '@/types';
import dynamic from 'next/dynamic';
import WhatsAppButton from '@/components/WhatsAppButton';

const LeafletMap = dynamic(() => import('@/components/Map/LeafletMap'), {
  ssr: false,
  loading: () => <div className="bg-secondary rounded" style={{ height: '400px' }}>Carregando mapa...</div>
});

export default function AdminIssueDetailPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [issue, setIssue] = useState<Issue | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(false);
  const hasLoadedRef = useRef(false);
  const currentIdRef = useRef<string | null>(null);

  // Verificar autenticação - separado do carregamento de dados
  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.replace('/login'); // usar replace ao invés de push
    }
  }, [user, authLoading, router]);

  // Carregar dados da ocorrência
  useEffect(() => {
    const loadIssue = async () => {
      // Só executar se:
      // 1. Usuário está autenticado e é admin
      // 2. Temos um ID válido
      // 3. Ainda não carregamos esses dados (ou é um ID diferente)
      if (!user || user.role !== 'admin' || !params.id) {
        setLoading(false);
        return;
      }

      const issueId = params.id as string;
      
      // Se já carregamos esse ID específico, não carregar novamente
      if (hasLoadedRef.current && currentIdRef.current === issueId) {
        return;
      }

      // Marcar como carregado
      hasLoadedRef.current = true;
      currentIdRef.current = issueId;

      try {
        setLoading(true);
        setError('');
        const data = await issueService.getById(issueId);
        setIssue(data);
      } catch (err: any) {
        console.error('Erro ao carregar ocorrência:', err);
        setError(err.response?.data?.error || 'Erro ao carregar ocorrência');
      } finally {
        setLoading(false);
      }
    };

    loadIssue();
  }, [user, params.id]); // Removido authLoading e router

  const handleStatusChange = async (newStatus: IssueStatus) => {
    if (!issue) return;
    
    try {
      setUpdating(true);
      await issueService.updateStatus(issue.id, newStatus);
      setIssue({ ...issue, status: newStatus });
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      alert('Erro ao atualizar status');
    } finally {
      setUpdating(false);
    }
  };

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
                <li className="breadcrumb-item">Admin</li>
                <li className="breadcrumb-item"><a href="/admin/ocorrencias">Ocorrências</a></li>
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
                  <strong>ID:</strong>
                  <p className="mb-0"><small className="text-muted">{issue.id}</small></p>
                </div>

                <div className="mb-3">
                  <strong>Tipo:</strong>
                  <p className="mb-0">{getTypeName(issue.type)}</p>
                </div>

                <div className="mb-3">
                  <strong>Status:</strong>
                  <select
                    className={`form-select form-select-sm w-50 bg-${getStatusColor(issue.status)} text-white`}
                    value={issue.status}
                    onChange={(e) => handleStatusChange(e.target.value as IssueStatus)}
                    disabled={updating}
                  >
                    <option value="aberto">Aberto</option>
                    <option value="em_andamento">Em Andamento</option>
                    <option value="resolvido">Resolvido</option>
                  </select>
                  {updating && <small className="text-muted ms-2">Atualizando...</small>}
                </div>

                <div className="mb-3">
                  <strong>Descrição:</strong>
                  <p className="mb-0">{issue.description || 'Sem descrição'}</p>
                </div>

                <div className="mb-3">
                  <strong>Morador:</strong>
                  <p className="mb-0">
                    {issue.user?.name || 'N/A'}
                    {issue.user?.apartment_or_house && (
                      <span className="text-muted"> - {issue.user.apartment_or_house}</span>
                    )}
                  </p>
                  {issue.user?.email && (
                    <small className="text-muted d-block">{issue.user.email}</small>
                  )}
                  {issue.user?.whatsapp && (
                    <div className="mt-2">
                      <WhatsAppButton 
                        phone={issue.user.whatsapp}
                        message={`Olá ${issue.user.name}, sobre a ocorrência #${issue.id.substring(0, 8)} (${getTypeName(issue.type)}) registrada em ${new Date(issue.created_at).toLocaleDateString('pt-BR')}.`}
                        className=""
                      />
                      <span className="ms-2 text-muted">Contatar morador</span>
                    </div>
                  )}
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
                <LeafletMap
                  center={[issue.latitude, issue.longitude]}
                  zoom={16}
                  markers={markers}
                  height="300px"
                />
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

function getStatusColor(status: IssueStatus): string {
  const colors: Record<IssueStatus, string> = {
    aberto: 'danger',
    em_andamento: 'warning',
    resolvido: 'success'
  };
  return colors[status];
}
