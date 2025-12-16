'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';

interface AuditLog {
  id: string;
  user_id: string | null;
  action: string;
  entity_type: string;
  entity_id: string | null;
  old_data: string | null;
  new_data: string | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

export default function LogsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, authLoading, router]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterAction, setFilterAction] = useState('');
  const [filterEntity, setFilterEntity] = useState('');
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchLogs();
    }
  }, [mounted, currentPage, filterAction, filterEntity]);

  const fetchLogs = async () => {
    if (!mounted) return;
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: '50'
      });
      
      if (filterAction) params.append('action', filterAction);
      if (filterEntity) params.append('entityType', filterEntity);

      const response = await api.get(`/api/admin/logs?${params.toString()}`);
      setLogs(response.data.logs || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error('Erro ao buscar logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActionBadge = (action: string) => {
    const badges: any = {
      'create': 'bg-success',
      'update': 'bg-warning',
      'delete': 'bg-danger'
    };
    return badges[action] || 'bg-secondary';
  };

  const getActionLabel = (action: string) => {
    const labels: any = {
      'create': 'Criação',
      'update': 'Atualização',
      'delete': 'Exclusão'
    };
    return labels[action] || action;
  };

  const getEntityLabel = (entityType: string) => {
    const labels: any = {
      'user': 'Usuário',
      'issue': 'Ocorrência',
      'issue_type': 'Tipo de Ocorrência'
    };
    return labels[entityType] || entityType;
  };

  const viewDetails = (log: AuditLog) => {
    setSelectedLog(log);
    setShowModal(true);
  };

  if (loading && logs.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header */}
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className="page-header-title">
                <h2 className="mb-0">Logs do Sistema</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Ação</label>
                  <select
                    className="form-select"
                    value={filterAction}
                    onChange={(e) => {
                      setFilterAction(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="">Todas</option>
                    <option value="create">Criação</option>
                    <option value="update">Atualização</option>
                    <option value="delete">Exclusão</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Tipo de Entidade</label>
                  <select
                    className="form-select"
                    value={filterEntity}
                    onChange={(e) => {
                      setFilterEntity(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    <option value="">Todas</option>
                    <option value="user">Usuário</option>
                    <option value="issue">Ocorrência</option>
                    <option value="issue_type">Tipo de Ocorrência</option>
                  </select>
                </div>
                <div className="col-md-4 d-flex align-items-end">
                  <button
                    className="btn btn-secondary w-100"
                    onClick={() => {
                      setFilterAction('');
                      setFilterEntity('');
                      setCurrentPage(1);
                    }}
                  >
                    Limpar Filtros
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabela de Logs */}
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h5>Registro de Atividades</h5>
            </div>
            <div className="card-body table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Data/Hora</th>
                    <th>Ação</th>
                    <th>Entidade</th>
                    <th>ID Entidade</th>
                    <th>IP</th>
                    <th className="text-end">Detalhes</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id}>
                      <td>
                        {new Date(log.created_at).toLocaleString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td>
                        <span className={`badge ${getActionBadge(log.action)}`}>
                          {getActionLabel(log.action)}
                        </span>
                      </td>
                      <td>{getEntityLabel(log.entity_type)}</td>
                      <td>
                        {log.entity_id ? (
                          <code className="text-muted">{log.entity_id.substring(0, 8)}...</code>
                        ) : '-'}
                      </td>
                      <td>{log.ip_address || '-'}</td>
                      <td className="text-end">
                        <button
                          className="btn btn-sm btn-link-primary"
                          onClick={() => viewDetails(log)}
                          title="Ver Detalhes"
                        >
                          <i className="ph-duotone ph-eye"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {logs.length === 0 && !loading && (
                <div className="text-center py-5">
                  <i className="ph-duotone ph-file-text f-48 text-muted mb-3"></i>
                  <p className="text-muted">Nenhum log encontrado</p>
                </div>
              )}

              {/* Paginação */}
              {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                  <nav>
                    <ul className="pagination">
                      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          Anterior
                        </button>
                      </li>
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const page = i + 1;
                        return (
                          <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                            <button
                              className="page-link"
                              onClick={() => setCurrentPage(page)}
                            >
                              {page}
                            </button>
                          </li>
                        );
                      })}
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          Próxima
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Detalhes */}
      {showModal && selectedLog && (
        <>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Detalhes do Log</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <strong>Data/Hora:</strong>
                      <p>{new Date(selectedLog.created_at).toLocaleString('pt-BR')}</p>
                    </div>
                    <div className="col-md-6">
                      <strong>Ação:</strong>
                      <p>
                        <span className={`badge ${getActionBadge(selectedLog.action)}`}>
                          {getActionLabel(selectedLog.action)}
                        </span>
                      </p>
                    </div>
                    <div className="col-md-6">
                      <strong>Tipo de Entidade:</strong>
                      <p>{getEntityLabel(selectedLog.entity_type)}</p>
                    </div>
                    <div className="col-md-6">
                      <strong>ID Entidade:</strong>
                      <p><code>{selectedLog.entity_id || '-'}</code></p>
                    </div>
                    <div className="col-md-6">
                      <strong>Endereço IP:</strong>
                      <p>{selectedLog.ip_address || '-'}</p>
                    </div>
                    <div className="col-md-6">
                      <strong>User Agent:</strong>
                      <p className="text-truncate">{selectedLog.user_agent || '-'}</p>
                    </div>

                    {selectedLog.old_data && (
                      <div className="col-12">
                        <strong>Dados Anteriores:</strong>
                        <pre className="bg-light p-3 rounded mt-2">
                          {JSON.stringify(JSON.parse(selectedLog.old_data), null, 2)}
                        </pre>
                      </div>
                    )}

                    {selectedLog.new_data && (
                      <div className="col-12">
                        <strong>Novos Dados:</strong>
                        <pre className="bg-light p-3 rounded mt-2">
                          {JSON.stringify(JSON.parse(selectedLog.new_data), null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Fechar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </>
  );
}
