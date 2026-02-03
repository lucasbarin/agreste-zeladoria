'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { issueService } from '@/lib/issues';
import { listIssueTypes, getIssueTypeColor, getIssueTypeIcon, IssueType } from '@/lib/issueTypes';
import { Issue, IssueStatus } from '@/types';
import api from '@/lib/api';
import dynamic from 'next/dynamic';

interface PendingRequest {
  id: string;
  type: 'cart' | 'tractor' | 'chainsaw';
  user_name: string;
  apartment_or_house?: string;
  requested_date: string;
  created_at: string;
  quantity?: number;
}

const LeafletMap = dynamic(() => import('@/components/Map/LeafletMap'), {
  ssr: false,
  loading: () => <div className="bg-secondary rounded" style={{ height: '500px' }}>Carregando mapa...</div>
});

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [issueTypes, setIssueTypes] = useState<IssueType[]>([]);
  const [loadingIssues, setLoadingIssues] = useState(true);
  const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [stats, setStats] = useState({ aberto: 0, em_andamento: 0, resolvido: 0, total: 0 });
  const [mounted, setMounted] = useState(false);
  const loadedRef = useRef(false);
  const redirectedRef = useRef(false);

  // Garantir que está montado no cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    console.log('[AdminDashboard] useEffect auth:', { loading, user: user?.role });
    
    if (!loading && (!user || user.role !== 'admin')) {
      if (!redirectedRef.current) {
        console.log('[AdminDashboard] Redirecionando para login');
        redirectedRef.current = true;
        router.push('/login');
      }
      return;
    }
  }, [user, loading]); // Removido 'router'

  useEffect(() => {
    console.log('[AdminDashboard] useEffect load:', { mounted, user: user?.role, loaded: loadedRef.current });
    
    // Prevenir múltiplas cargas dos mesmos dados
    if (mounted && user?.role === 'admin' && !loadedRef.current) {
      console.log('[AdminDashboard] Carregando dados');
      loadedRef.current = true;
      loadIssues();
      loadIssueTypes();
      loadPendingRequests();
    }
  }, [user, mounted]);

  const loadPendingRequests = async () => {
    if (!mounted) return;
    
    try {
      setLoadingRequests(true);
      const [cartRes, tractorRes, chainsawRes] = await Promise.all([
        api.get('/api/cart').catch(err => ({ data: [] })),
        api.get('/api/tractor').catch(err => ({ data: [] })),
        api.get('/api/chainsaw').catch(err => ({ data: [] }))
      ]);

      const cartRequests = (cartRes.data || [])
        .filter((r: any) => r.approved === false || r.approved === null)
        .map((r: any) => ({
          id: r.id,
          type: 'cart' as const,
          user_name: r.user?.name || 'N/A',
          apartment_or_house: r.user?.apartment_or_house,
          requested_date: r.requested_date,
          created_at: r.created_at,
          quantity: r.quantity
        }));

      const tractorRequests = (tractorRes.data || [])
        .filter((r: any) => r.approved === false || r.approved === null)
        .map((r: any) => ({
          id: r.id,
          type: 'tractor' as const,
          user_name: r.user?.name || 'N/A',
          apartment_or_house: r.user?.apartment_or_house,
          requested_date: r.requested_date,
          created_at: r.created_at
        }));

      const chainsawRequests = (chainsawRes.data || [])
        .filter((r: any) => r.approved === false || r.approved === null)
        .map((r: any) => ({
          id: r.id,
          type: 'chainsaw' as const,
          user_name: r.user?.name || 'N/A',
          apartment_or_house: r.user?.apartment_or_house,
          requested_date: r.requested_date,
          created_at: r.created_at
        }));

      const allRequests = [...cartRequests, ...tractorRequests, ...chainsawRequests]
        .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());

      setPendingRequests(allRequests);
    } catch (error) {
      console.error('Erro ao carregar solicitações:', error);
    } finally {
      setLoadingRequests(false);
    }
  };

  const loadIssues = async () => {
    if (!mounted) return;
    
    try {
      setLoadingIssues(true);
      const data = await issueService.list();
      setIssues(data);
      
      const aberto = data.filter(i => i.status === 'aberto').length;
      const em_andamento = data.filter(i => i.status === 'em_andamento').length;
      const resolvido = data.filter(i => i.status === 'resolvido').length;
      
      setStats({ aberto, em_andamento, resolvido, total: data.length });
    } catch (error) {
      console.error('Erro ao carregar ocorrências:', error);
      // Mesmo com erro, definir dados vazios
      setIssues([]);
      setStats({ aberto: 0, em_andamento: 0, resolvido: 0, total: 0 });
    } finally {
      setLoadingIssues(false);
    }
  };

  const loadIssueTypes = async () => {
    try {
      const types = await listIssueTypes();
      setIssueTypes(types);
    } catch (error) {
      console.error('Erro ao carregar tipos:', error);
    }
  };

  if (!mounted || !user || user.role !== 'admin') {
    return null;
  }

  const markers = issues.map((issue, index) => {
    const color = getIssueTypeColor(issueTypes, issue.type);
    const icon = getIssueTypeIcon(issueTypes, issue.type);
    console.log(`Issue ${issue.id}: type=${issue.type}, color=${color}, icon=${icon}`);
    return {
      id: issue.id,
      position: [issue.latitude, issue.longitude] as [number, number],
      popup: `
        <div style="min-width: 200px;">
          <strong>${getTypeName(issue.type)}</strong><br/>
          Status: ${getStatusName(issue.status)}<br/>
          <a href="/admin/ocorrencias/${issue.id}" style="display: inline-block; margin-top: 8px; padding: 4px 12px; background: #0d6efd; color: white; text-decoration: none; border-radius: 4px; font-size: 12px;">Ver Detalhes</a>
        </div>
      `,
      color,
      icon
    };
  });

  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className="page-header-title">
                <h5 className="m-b-10">Dashboard</h5>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">Home</li>
                <li className="breadcrumb-item">Dashboard</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="row">
        <div className="col-md-6 col-xl-3">
          <a href="/admin/ocorrencias" className="text-decoration-none">
            <div className="card bg-primary-dark" style={{ cursor: 'pointer', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <div className="avtar avtar-s bg-light-primary">
                      <i className="ph-duotone ph-list f-20"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="mb-0 text-white">Total</h6>
                  </div>
                </div>
                <div className="bg-body p-3 mt-3 rounded">
                  <div className="mt-3 row align-items-center">
                    <div className="col-7">
                      <h3 className="mb-1">{stats.total}</h3>
                      <p className="text-muted mb-0 text-sm">Ocorrências</p>
                    </div>
                    <div className="col-5 text-end">
                      <i className="ph-duotone ph-list f-32"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className="col-md-6 col-xl-3">
          <a href="/admin/ocorrencias?status=aberto" className="text-decoration-none">
            <div className="card bg-danger-dark" style={{ cursor: 'pointer', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <div className="avtar avtar-s bg-light-danger">
                      <i className="ph-duotone ph-warning f-20"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="mb-0 text-white">Abertas</h6>
                  </div>
                </div>
                <div className="bg-body p-3 mt-3 rounded">
                  <div className="mt-3 row align-items-center">
                    <div className="col-7">
                      <h3 className="mb-1">{stats.aberto}</h3>
                      <p className="text-muted mb-0 text-sm">Aguardando</p>
                    </div>
                    <div className="col-5 text-end">
                      <i className="ph-duotone ph-warning f-32 text-danger"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className="col-md-6 col-xl-3">
          <a href="/admin/ocorrencias?status=em_andamento" className="text-decoration-none">
            <div className="card bg-warning-dark" style={{ cursor: 'pointer', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <div className="avtar avtar-s bg-light-warning">
                      <i className="ph-duotone ph-clock f-20"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="mb-0 text-white">Em Andamento</h6>
                  </div>
                </div>
                <div className="bg-body p-3 mt-3 rounded">
                  <div className="mt-3 row align-items-center">
                    <div className="col-7">
                      <h3 className="mb-1">{stats.em_andamento}</h3>
                      <p className="text-muted mb-0 text-sm">Em Progresso</p>
                    </div>
                    <div className="col-5 text-end">
                      <i className="ph-duotone ph-clock f-32 text-warning"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
        <div className="col-md-6 col-xl-3">
          <a href="/admin/ocorrencias?status=resolvido" className="text-decoration-none">
            <div className="card bg-success-dark" style={{ cursor: 'pointer', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <div className="flex-shrink-0">
                    <div className="avtar avtar-s bg-light-success">
                      <i className="ph-duotone ph-check-circle f-20"></i>
                    </div>
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <h6 className="mb-0 text-white">Resolvidas</h6>
                  </div>
                </div>
                <div className="bg-body p-3 mt-3 rounded">
                  <div className="mt-3 row align-items-center">
                    <div className="col-7">
                      <h3 className="mb-1">{stats.resolvido}</h3>
                      <p className="text-muted mb-0 text-sm">Completas</p>
                    </div>
                    <div className="col-5 text-end">
                      <i className="ph-duotone ph-check-circle f-32 text-success"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>

      {/* Map */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="mb-0">Mapa de Ocorrências</h5>
            </div>
            <div className="card-body p-0">
              {loadingIssues ? (
                <div className="p-5 text-center">Carregando...</div>
              ) : issues.length > 0 ? (
                <LeafletMap
                  center={[issues[0].latitude, issues[0].longitude]}
                  zoom={15}
                  markers={markers}
                  height="500px"
                />
              ) : (
                <div className="p-5 text-center text-muted">Nenhuma ocorrência cadastrada</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pending Requests */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="d-flex align-items-center justify-content-between">
                <h5 className="mb-0">Solicitações Pendentes de Aprovação</h5>
                <span className="badge bg-warning">{pendingRequests.length}</span>
              </div>
            </div>
            <div className="card-body">
              {loadingRequests ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Carregando...</span>
                  </div>
                </div>
              ) : pendingRequests.length === 0 ? (
                <div className="text-center py-4">
                  <i className="ph-duotone ph-check-circle f-40 text-success"></i>
                  <p className="text-muted mt-2">Nenhuma solicitação pendente! 🎉</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Tipo</th>
                        <th>Solicitante</th>
                        <th>Casa/Apto</th>
                        <th>Data Solicitada</th>
                        <th>Criado em</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingRequests.map((request) => (
                        <tr key={`${request.type}-${request.id}`}>
                          <td>
                            <span className={`badge bg-${getRequestTypeColor(request.type)}`}>
                              <i className={`ph-duotone ${getRequestTypeIcon(request.type)} me-1`}></i>
                              {getRequestTypeName(request.type)}
                              {request.quantity && ` (${request.quantity}x)`}
                            </span>
                          </td>
                          <td>{request.user_name}</td>
                          <td>{request.apartment_or_house || '-'}</td>
                          <td>
                            <i className="ph-duotone ph-calendar me-2"></i>
                            {new Date(request.requested_date).toLocaleDateString('pt-BR')}
                          </td>
                          <td>
                            {new Date(request.created_at).toLocaleString('pt-BR')}
                          </td>
                          <td>
                            <a 
                              href={`/admin/${getRequestTypePath(request.type)}`}
                              className="btn btn-sm btn-primary"
                            >
                              Gerenciar
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Issues */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="d-flex align-items-center justify-content-between">
                <h5 className="mb-0">Últimas Ocorrências</h5>
                <a href="/admin/ocorrencias" className="btn btn-sm btn-primary">
                  Ver Todas
                </a>
              </div>
            </div>
            <div className="card-body">
              {loadingIssues ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Carregando...</span>
                  </div>
                </div>
              ) : issues.length === 0 ? (
                <p className="text-muted text-center py-4">Nenhuma ocorrência cadastrada.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Tipo</th>
                        <th>Descrição</th>
                        <th>Status</th>
                        <th>Data</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {issues.slice(0, 10).map((issue) => (
                        <tr key={issue.id} style={{ cursor: 'pointer' }} onClick={() => router.push(`/admin/ocorrencias/${issue.id}`)}>
                          <td>
                            <i className="ph-duotone ph-warning-circle me-2"></i>
                            {getTypeName(issue.type)}
                          </td>
                          <td>{issue.description || '-'}</td>
                          <td>
                            <span className={`badge bg-${getStatusColor(issue.status)}`}>
                              {getStatusName(issue.status)}
                            </span>
                          </td>
                          <td>
                            <i className="ph-duotone ph-calendar me-2"></i>
                            {new Date(issue.created_at).toLocaleDateString('pt-BR')}
                          </td>
                          <td>
                            <a 
                              href={`/admin/ocorrencias/${issue.id}`}
                              className="btn btn-sm btn-primary"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <i className="ph-duotone ph-eye me-1"></i>
                              Ver Detalhes
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
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

function getStatusName(status: IssueStatus): string {
  const statuses: Record<IssueStatus, string> = {
    aberto: 'Aberto',
    em_andamento: 'Em Andamento',
    resolvido: 'Resolvido'
  };
  return statuses[status];
}

function getStatusColor(status: IssueStatus): string {
  const colors: Record<IssueStatus, string> = {
    aberto: 'danger',
    em_andamento: 'warning',
    resolvido: 'success'
  };
  return colors[status];
}

function getRequestTypeName(type: string): string {
  const types: Record<string, string> = {
    cart: 'Carreta',
    tractor: 'Trator',
    chainsaw: 'Motosserra'
  };
  return types[type] || type;
}

function getRequestTypeColor(type: string): string {
  const colors: Record<string, string> = {
    cart: 'primary',
    tractor: 'success',
    chainsaw: 'danger'
  };
  return colors[type] || 'secondary';
}

function getRequestTypeIcon(type: string): string {
  const icons: Record<string, string> = {
    cart: 'ph-shopping-cart',
    tractor: 'ph-tractor',
    chainsaw: 'ph-scissors'
  };
  return icons[type] || 'ph-file';
}

function getRequestTypePath(type: string): string {
  const paths: Record<string, string> = {
    cart: 'carretas',
    tractor: 'tratores',
    chainsaw: 'motosserra'
  };
  return paths[type] || '';
}
