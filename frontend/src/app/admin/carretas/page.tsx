'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { listCartRequests, updateCartStatus, CartRequest } from '@/lib/cart';

export default function AdminCarretasPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [requests, setRequests] = useState<CartRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('todos');

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, authLoading, router]);
  const [selectedRequest, setSelectedRequest] = useState<CartRequest | null>(null);
  const [modalAction, setModalAction] = useState<'aprovar' | 'rejeitar' | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      loadRequests();
    }
  }, [mounted]);

  async function loadRequests() {
    if (!mounted) return;
    try {
      setLoading(true);
      const data = await listCartRequests();
      setRequests(data);
    } catch (error) {
      console.error('Erro ao carregar solicitações:', error);
    } finally {
      setLoading(false);
    }
  }

  const filteredRequests = Array.isArray(requests) ? requests.filter(req => {
    if (filter === 'todos') return true;
    return req.status === filter;
  }) : [];

  const getStatusBadge = (status: string) => {
    const badges = {
      pendente: 'bg-warning',
      aprovado: 'bg-success',
      rejeitado: 'bg-danger',
      concluido: 'bg-info'
    };
    const labels = {
      pendente: 'Pendente',
      aprovado: 'Aprovado',
      rejeitado: 'Rejeitado',
      concluido: 'Concluído'
    };
    return (
      <span className={`badge ${badges[status as keyof typeof badges]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const openModal = (request: CartRequest, action: 'aprovar' | 'rejeitar') => {
    setSelectedRequest(request);
    setModalAction(action);
    setAdminNotes('');
  };

  const closeModal = () => {
    setSelectedRequest(null);
    setModalAction(null);
    setAdminNotes('');
  };

  const handleSubmitAction = async () => {
    if (!selectedRequest || !modalAction) return;

    try {
      setSubmitting(true);
      await updateCartStatus(selectedRequest.id, {
        status: modalAction === 'aprovar' ? 'aprovado' : 'rejeitado',
        admin_notes: adminNotes || undefined
      });
      alert(`Solicitação ${modalAction === 'aprovar' ? 'aprovada' : 'rejeitada'} com sucesso!`);
      closeModal();
      loadRequests();
    } catch (error: any) {
      alert(error.message || 'Erro ao processar solicitação');
    } finally {
      setSubmitting(false);
    }
  };

  const handleConcluir = async (request: CartRequest) => {
    if (!confirm('Confirma que o serviço foi concluído?')) return;

    try {
      await updateCartStatus(request.id, {
        status: 'concluido'
      });
      alert('Status atualizado para concluído!');
      loadRequests();
    } catch (error: any) {
      alert(error.message || 'Erro ao atualizar status');
    }
  };

  const getStatusCount = (status: string) => {
    return Array.isArray(requests) ? requests.filter(r => r.status === status).length : 0;
  };

  if (!mounted || loading) {
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
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="page-header-title">
                    <h5 className="m-b-10">Gestão de Carretas</h5>
                  </div>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="/admin/dashboard">Dashboard</a>
                    </li>
                    <li className="breadcrumb-item">Carretas</li>
                  </ul>
                </div>
                <div>
                  <button 
                    className="btn btn-primary"
                    onClick={() => router.push('/admin/carretas/nova')}
                  >
                    <i className="ph-duotone ph-plus me-2"></i>
                    Nova Solicitação
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-3 col-sm-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="avtar avtar-s bg-light-warning">
                    <i className="feather icon-clock"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="mb-0">Pendentes</h6>
                  <p className="text-muted mb-0">{getStatusCount('pendente')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="avtar avtar-s bg-light-success">
                    <i className="feather icon-check-circle"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="mb-0">Aprovados</h6>
                  <p className="text-muted mb-0">{getStatusCount('aprovado')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="avtar avtar-s bg-light-danger">
                    <i className="feather icon-x-circle"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="mb-0">Rejeitados</h6>
                  <p className="text-muted mb-0">{getStatusCount('rejeitado')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="avtar avtar-s bg-light-info">
                    <i className="feather icon-check"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="mb-0">Concluídos</h6>
                  <p className="text-muted mb-0">{getStatusCount('concluido')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header">
              <h5>Solicitações de Carreta</h5>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    className={`btn ${filter === 'todos' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setFilter('todos')}
                  >
                    Todos ({Array.isArray(requests) ? requests.length : 0})
                  </button>
                  <button
                    type="button"
                    className={`btn ${filter === 'pendente' ? 'btn-warning' : 'btn-outline-warning'}`}
                    onClick={() => setFilter('pendente')}
                  >
                    Pendentes ({getStatusCount('pendente')})
                  </button>
                  <button
                    type="button"
                    className={`btn ${filter === 'aprovado' ? 'btn-success' : 'btn-outline-success'}`}
                    onClick={() => setFilter('aprovado')}
                  >
                    Aprovados ({getStatusCount('aprovado')})
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Carregando...</span>
                  </div>
                </div>
              ) : filteredRequests.length === 0 ? (
                <div className="text-center py-5">
                  <i className="feather icon-inbox" style={{ fontSize: '48px', color: '#ccc' }}></i>
                  <p className="text-muted mt-3">Nenhuma solicitação encontrada</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Morador</th>
                        <th>Endereço</th>
                        <th>Data</th>
                        <th>Horário</th>
                        <th>Valor</th>
                        <th>Status</th>
                        <th>Solicitado em</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRequests.map((request) => (
                        <tr key={request.id}>
                          <td>{request.user?.name || 'N/A'}</td>
                          <td>{request.user?.apartment_or_house || 'N/A'}</td>
                          <td>{formatDate(request.requested_date)}</td>
                          <td>08:00 - 16:00</td>
                          <td>R$ {parseFloat(request.value.toString()).toFixed(2)}</td>
                          <td>{getStatusBadge(request.status)}</td>
                          <td>{formatDate(request.created_at)}</td>
                          <td>
                            <div className="btn-group btn-group-sm" role="group">
                              {request.status === 'pendente' && (
                                <>
                                  <button
                                    onClick={() => openModal(request, 'aprovar')}
                                    className="btn btn-success"
                                    title="Aprovar"
                                  >
                                    <i className="feather icon-check"></i>
                                  </button>
                                  <button
                                    onClick={() => openModal(request, 'rejeitar')}
                                    className="btn btn-danger"
                                    title="Rejeitar"
                                  >
                                    <i className="feather icon-x"></i>
                                  </button>
                                </>
                              )}
                              {request.status === 'aprovado' && (
                                <button
                                  onClick={() => handleConcluir(request)}
                                  className="btn btn-info"
                                  title="Marcar como concluído"
                                >
                                  <i className="feather icon-check-circle"></i>
                                </button>
                              )}
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

      {/* Modal */}
      {selectedRequest && modalAction && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {modalAction === 'aprovar' ? 'Aprovar' : 'Rejeitar'} Solicitação
                </h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <p><strong>Morador:</strong> {selectedRequest.user?.name}</p>
                <p><strong>Data:</strong> {formatDate(selectedRequest.requested_date)}</p>
                <p><strong>Horário:</strong> 08:00 - 16:00</p>
                <p><strong>Valor:</strong> R$ {parseFloat(selectedRequest.value.toString()).toFixed(2)}</p>
                
                <div className="mb-3">
                  <label htmlFor="admin_notes" className="form-label">
                    Observações {modalAction === 'rejeitar' ? '(obrigatório)' : '(opcional)'}
                  </label>
                  <textarea
                    className="form-control"
                    id="admin_notes"
                    rows={3}
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Digite observações para o morador..."
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                  disabled={submitting}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className={`btn ${modalAction === 'aprovar' ? 'btn-success' : 'btn-danger'}`}
                  onClick={handleSubmitAction}
                  disabled={submitting || (modalAction === 'rejeitar' && !adminNotes.trim())}
                >
                  {submitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Processando...
                    </>
                  ) : (
                    modalAction === 'aprovar' ? 'Confirmar Aprovação' : 'Confirmar Rejeição'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
