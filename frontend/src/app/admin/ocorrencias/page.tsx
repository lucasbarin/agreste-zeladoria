'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { issueService } from '@/lib/issues';
import { Issue, IssueStatus, IssueType } from '@/types';

export default function AdminOcorrenciasPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState<IssueType | ''>('');
  const [filterStatus, setFilterStatus] = useState<IssueStatus | ''>('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user?.role === 'admin') {
      loadIssues();
    }
  }, [user, filterType, filterStatus]);

  const loadIssues = async () => {
    try {
      setLoading(true);
      const filters: any = {};
      if (filterType) filters.type = filterType;
      if (filterStatus) filters.status = filterStatus;
      
      const data = await issueService.list(filters);
      setIssues(data);
    } catch (error) {
      console.error('Erro ao carregar ocorrências:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (issueId: string) => {
    if (!confirm('Tem certeza que deseja excluir esta ocorrência?')) {
      return;
    }

    try {
      setUpdatingId(issueId);
      await issueService.delete(issueId);
      // Remover da lista local
      setIssues(issues.filter(issue => issue.id !== issueId));
    } catch (error) {
      console.error('Erro ao excluir ocorrência:', error);
      alert('Erro ao excluir ocorrência');
    } finally {
      setUpdatingId(null);
    }
  };

  const handleStatusChange = async (issueId: string, newStatus: IssueStatus) => {
    try {
      setUpdatingId(issueId);
      await issueService.updateStatus(issueId, newStatus);
      // Atualizar lista local
      setIssues(issues.map(issue => 
        issue.id === issueId ? { ...issue, status: newStatus } : issue
      ));
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      alert('Erro ao atualizar status');
    } finally {
      setUpdatingId(null);
    }
  };

  if (authLoading || !user || user.role !== 'admin') {
    return (
      <>
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
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
                <h5 className="m-b-10">Gestão de Ocorrências</h5>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">Admin</li>
                <li className="breadcrumb-item">Ocorrências</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          {/* Filtros */}
          <div className="card mb-4">
            <div className="card-body">
                <div className="row">
                  <div className="col-md-4 mb-3 mb-md-0">
                    <label className="form-label">Filtrar por Tipo:</label>
                    <select 
                      className="form-select"
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value as IssueType | '')}
                    >
                      <option value="">Todos os tipos</option>
                      <option value="poste_com_luz_queimada">Poste com Luz Queimada</option>
                      <option value="buraco_na_rua">Buraco na Rua</option>
                      <option value="sujeira_ou_entulho">Sujeira ou Entulho</option>
                    </select>
                  </div>
                  
                  <div className="col-md-4 mb-3 mb-md-0">
                    <label className="form-label">Filtrar por Status:</label>
                    <select 
                      className="form-select"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value as IssueStatus | '')}
                    >
                      <option value="">Todos os status</option>
                      <option value="aberto">Aberto</option>
                      <option value="em_andamento">Em Andamento</option>
                      <option value="resolvido">Resolvido</option>
                    </select>
                  </div>

                  <div className="col-md-4 d-flex align-items-end">
                    <button 
                      className="btn btn-secondary w-100"
                      onClick={() => {
                        setFilterType('');
                        setFilterStatus('');
                      }}
                    >
                      Limpar Filtros
                    </button>
                  </div>
                </div>
              </div>
            </div>

          {/* Tabela de Ocorrências */}
          <div className="card">
            <div className="card-body">
                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Carregando...</span>
                    </div>
                  </div>
                ) : issues.length === 0 ? (
                  <p className="text-muted text-center py-5">Nenhuma ocorrência encontrada.</p>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Tipo</th>
                          <th>Morador</th>
                          <th>Descrição</th>
                          <th>Status</th>
                          <th>Data</th>
                          <th>Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {issues.map((issue) => (
                          <tr key={issue.id}>
                            <td>
                              <small className="text-muted">
                                {issue.id.substring(0, 8)}...
                              </small>
                            </td>
                            <td>{getTypeName(issue.type)}</td>
                            <td>
                              {issue.user?.name || 'N/A'}
                              {issue.user?.apartment_or_house && (
                                <small className="d-block text-muted">
                                  {issue.user.apartment_or_house}
                                </small>
                              )}
                            </td>
                            <td>
                              <small>
                                {issue.description 
                                  ? issue.description.substring(0, 50) + (issue.description.length > 50 ? '...' : '')
                                  : '-'
                                }
                              </small>
                            </td>
                            <td>
                              <select
                                className={`form-select form-select-sm bg-${getStatusColor(issue.status)} text-white`}
                                value={issue.status}
                                onChange={(e) => handleStatusChange(issue.id, e.target.value as IssueStatus)}
                                disabled={updatingId === issue.id}
                              >
                                <option value="aberto">Aberto</option>
                                <option value="em_andamento">Em Andamento</option>
                                <option value="resolvido">Resolvido</option>
                              </select>
                            </td>
                            <td>
                              <small>
                                {new Date(issue.created_at).toLocaleDateString('pt-BR')}
                              </small>
                            </td>
                            <td>
                              <div className="d-flex gap-1">
                                <button
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() => router.push(`/admin/ocorrencias/${issue.id}`)}
                                  title="Ver detalhes"
                                >
                                  <i className="ph-duotone ph-eye"></i>
                                </button>
                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleDelete(issue.id)}
                                  disabled={updatingId === issue.id}
                                  title="Excluir ocorrência"
                                >
                                  {updatingId === issue.id ? (
                                    <span className="spinner-border spinner-border-sm"></span>
                                  ) : (
                                    <i className="ph-duotone ph-trash"></i>
                                  )}
                                </button>
                              </div>
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

function getStatusColor(status: IssueStatus): string {
  const colors: Record<IssueStatus, string> = {
    aberto: 'danger',
    em_andamento: 'warning',
    resolvido: 'success'
  };
  return colors[status];
}
