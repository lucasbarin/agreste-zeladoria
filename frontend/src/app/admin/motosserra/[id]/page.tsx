'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';
import WhatsAppButton from '@/components/WhatsAppButton';

interface ChainsawRequest {
  id: string;
  user_id: string;
  requested_date: string;
  description: string;
  status: string;
  admin_notes?: string;
  created_at: string;
  user: {
    name: string;
    email: string;
    apartment_or_house?: string;
  };
}

export default function AdminChainsawDetailPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [mounted, setMounted] = useState(false);
  const [request, setRequest] = useState<ChainsawRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [adminNotes, setAdminNotes] = useState('');

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && params.id) {
      loadRequest();
    }
  }, [mounted, params.id]);

  const loadRequest = async () => {
    if (!mounted) return;
    try {
      setLoading(true);
      const response = await api.get(`/api/chainsaw/${params.id}`);
      setRequest(response.data.request || response.data);
    } catch (error) {
      console.error('Erro ao carregar solicitação:', error);
      alert('Erro ao carregar solicitação');
      router.push('/admin/motosserra');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!request) return;

    try {
      await api.put(`/api/chainsaw/${request.id}/status`, {
        status: newStatus,
        admin_notes: adminNotes
      });
      alert('Status atualizado com sucesso!');
      setShowModal(false);
      loadRequest();
    } catch (error: any) {
      alert(error.response?.data?.error || 'Erro ao atualizar status');
    }
  };

  const getStatusBadge = (status: string) => {
    const badges: any = {
      pendente: 'bg-warning',
      em_andamento: 'bg-info',
      cancelado: 'bg-danger',
      concluido: 'bg-success'
    };
    const labels: any = {
      pendente: 'Pendente',
      em_andamento: 'Em Andamento',
      cancelado: 'Cancelado',
      concluido: 'Concluído'
    };
    return <span className={`badge ${badges[status]}`}>{labels[status]}</span>;
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

  if (!request) return null;

  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-md-12">
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><a href="/admin/dashboard">Dashboard</a></li>
                <li className="breadcrumb-item"><a href="/admin/motosserra">Motosserra</a></li>
                <li className="breadcrumb-item">Detalhes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5>Informações da Solicitação</h5>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-md-6">
                  <p className="text-muted mb-1">Status</p>
                  <div>{getStatusBadge(request.status)}</div>
                </div>
                <div className="col-md-6">
                  <p className="text-muted mb-1">Data do Serviço</p>
                  <p className="mb-0"><strong>{new Date(request.requested_date).toLocaleDateString('pt-BR')}</strong></p>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-12">
                  <p className="text-muted mb-1">Descrição</p>
                  <p className="mb-0">{request.description || 'Sem descrição'}</p>
                </div>
              </div>

              {request.admin_notes && (
                <div className="alert alert-info">
                  <strong>Observações do Administrador:</strong><br />
                  {request.admin_notes}
                </div>
              )}

              <div className="row">
                <div className="col-md-12">
                  <p className="text-muted mb-1">Solicitado em</p>
                  <p className="mb-0">{new Date(request.created_at).toLocaleString('pt-BR')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h5>Morador</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <p className="mb-2"><strong>{request.user.name}</strong></p>
                </div>
                {(request.user as any).whatsapp && (
                  <div>
                    <WhatsAppButton
                      phone={(request.user as any).whatsapp}
                      message={`Olá ${request.user.name}, sobre sua solicitação de motosserra para ${new Date(request.requested_date).toLocaleDateString('pt-BR')}.`}
                      className=""
                    />
                    <span className="ms-2 text-muted small">Contatar morador</span>
                  </div>
                )}
              </div>
              <p className="text-muted mb-2">
                <i className="ph-duotone ph-envelope me-2"></i>
                {request.user.email}
              </p>
              {(request.user as any).whatsapp && (
                <p className="text-muted mb-2">
                  <i className="ph-duotone ph-phone me-2"></i>
                  {(request.user as any).whatsapp}
                </p>
              )}
              {request.user.apartment_or_house && (
                <p className="text-muted mb-0">
                  <i className="ph-duotone ph-map-pin me-2"></i>
                  {request.user.apartment_or_house}
                </p>
              )}
            </div>
          </div>

          {request.status === 'pendente' && (
            <div className="card mt-3">
              <div className="card-header">
                <h5>Ações</h5>
              </div>
              <div className="card-body">
                <button
                  className="btn btn-info w-100 mb-2"
                  onClick={() => {
                    setNewStatus('em_andamento');
                    setAdminNotes('');
                    setShowModal(true);
                  }}
                >
                  <i className="ph-duotone ph-play me-2"></i>
                  Colocar em Andamento
                </button>
                <button
                  className="btn btn-danger w-100"
                  onClick={() => {
                    setNewStatus('cancelado');
                    setAdminNotes('');
                    setShowModal(true);
                  }}
                >
                  <i className="ph-duotone ph-x me-2"></i>
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {request.status === 'em_andamento' && (
            <div className="card mt-3">
              <div className="card-header">
                <h5>Ações</h5>
              </div>
              <div className="card-body">
                <button
                  className="btn btn-success w-100"
                  onClick={() => {
                    setNewStatus('concluido');
                    setAdminNotes('');
                    setShowModal(true);
                  }}
                >
                  <i className="ph-duotone ph-check-circle me-2"></i>
                  Marcar como Concluído
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Atualizar Status</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <form onSubmit={handleUpdateStatus}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Novo Status</label>
                      <input
                        type="text"
                        className="form-control"
                        value={newStatus === 'em_andamento' ? 'Em Andamento' : newStatus === 'cancelado' ? 'Cancelado' : 'Concluído'}
                        disabled
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Observações (opcional)</label>
                      <textarea
                        className="form-control"
                        rows={4}
                        value={adminNotes}
                        onChange={(e) => setAdminNotes(e.target.value)}
                        placeholder="Digite observações para o morador..."
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Confirmar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </>
  );
}
