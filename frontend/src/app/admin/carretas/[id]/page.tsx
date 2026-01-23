'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getCartRequestById, updateCartStatus } from '@/lib/cart';
import WhatsAppButton from '@/components/WhatsAppButton';

export default function AdminCartDetailPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const [request, setRequest] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/login');
      return;
    }

    if (!user || user.role !== 'admin' || !params.id) {
      setLoading(false);
      return;
    }

    const loadRequest = async () => {
      try {
        setLoading(true);
        const data = await getCartRequestById(params.id as string);
        setRequest(data);
        setAdminNotes(data.admin_notes || '');
      } catch (error: any) {
        console.error('Erro ao carregar solicitação:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRequest();
  }, [user, authLoading, params.id, router]);

  const handleStatusUpdate = async (newStatus: 'aprovado' | 'rejeitado' | 'concluido') => {
    if (!request) return;
    
    if (newStatus === 'rejeitado' && !adminNotes.trim()) {
      alert('Por favor, informe o motivo da rejeição');
      return;
    }

    try {
      setUpdating(true);
      await updateCartStatus(request.id, {
        status: newStatus,
        admin_notes: adminNotes || undefined
      });
      alert('Status atualizado com sucesso!');
      router.push('/admin/carretas');
    } catch (error: any) {
      alert(error.message || 'Erro ao atualizar status');
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

  if (!request) {
    return (
      <>
        <div className="alert alert-danger">
          Solicitação não encontrada
        </div>
        <button onClick={() => router.back()} className="btn btn-secondary">
          <i className="ph-duotone ph-arrow-left me-2"></i>
          Voltar
        </button>
      </>
    );
  }

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      pendente: 'bg-warning',
      aprovado: 'bg-success',
      rejeitado: 'bg-danger',
      concluido: 'bg-secondary'
    };
    return badges[status] || 'bg-secondary';
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      pendente: 'Pendente',
      aprovado: 'Aprovado',
      rejeitado: 'Rejeitado',
      concluido: 'Concluído'
    };
    return labels[status] || status;
  };

  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className="page-header-title">
                <h5 className="m-b-10">Detalhes da Solicitação de Carreta</h5>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">Home</li>
                <li className="breadcrumb-item"><a href="/admin/carretas">Carretas</a></li>
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
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Informações do Morador</h5>
              <hr />
              
              <div className="mb-3">
                <strong>Nome:</strong>
                <p className="mb-0">{request.user?.name || 'N/A'}</p>
              </div>

              <div className="mb-3">
                <strong>Endereço:</strong>
                <p className="mb-0">{request.user?.apartment_or_house || 'N/A'}</p>
              </div>

              <div className="mb-3">
                <strong>E-mail:</strong>
                <p className="mb-0">{request.user?.email || 'N/A'}</p>
              </div>

              {(request.user as any)?.whatsapp && (
                <div className="mb-3">
                  <strong>WhatsApp:</strong>
                  <p className="mb-0">{(request.user as any).whatsapp}</p>
                  <div className="mt-2">
                    <WhatsAppButton
                      phone={(request.user as any).whatsapp}
                      message={`Olá ${request.user.name}, sobre sua solicitação de carreta para ${new Date(request.requested_date).toLocaleDateString('pt-BR')}.`}
                      className=""
                    />
                    <span className="ms-2 text-muted">Contatar morador</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Detalhes da Reserva</h5>
              <hr />
              
              <div className="mb-3">
                <strong>Data Solicitada:</strong>
                <p className="mb-0">
                  {new Date(request.requested_date).toLocaleDateString('pt-BR')}
                </p>
              </div>

              <div className="mb-3">
                <strong>Horário:</strong>
                <p className="mb-0">08:00 - 16:00 (Diária completa)</p>
              </div>

              <div className="mb-3">
                <strong>Status:</strong>
                <br />
                <span className={`badge ${getStatusBadge(request.status)}`}>
                  {getStatusLabel(request.status)}
                </span>
              </div>

              <div className="mb-3">
                <strong>Data da Solicitação:</strong>
                <p className="mb-0">
                  {new Date(request.created_at).toLocaleString('pt-BR')}
                </p>
              </div>

              {request.approved_at && (
                <div className="mb-3">
                  <strong>Data da Aprovação:</strong>
                  <p className="mb-0">
                    {new Date(request.approved_at).toLocaleString('pt-BR')}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {request.status === 'pendente' && (
        <div className="row mt-3">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Ações do Administrador</h5>
                <hr />
                
                <div className="mb-3">
                  <label className="form-label">Observações</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Observações sobre a aprovação ou motivo da rejeição"
                  />
                </div>

                <div className="d-flex gap-2">
                  <button
                    onClick={() => handleStatusUpdate('aprovado')}
                    className="btn btn-success"
                    disabled={updating}
                  >
                    <i className="ph-duotone ph-check me-2"></i>
                    {updating ? 'Processando...' : 'Aprovar'}
                  </button>
                  
                  <button
                    onClick={() => handleStatusUpdate('rejeitado')}
                    className="btn btn-danger"
                    disabled={updating}
                  >
                    <i className="ph-duotone ph-x me-2"></i>
                    {updating ? 'Processando...' : 'Rejeitar'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {request.status === 'aprovado' && (
        <div className="row mt-3">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Marcar como Concluído</h5>
                <hr />
                
                <p>Marque como concluído quando a carreta for devolvida.</p>
                
                <button
                  onClick={() => handleStatusUpdate('concluido')}
                  className="btn btn-primary"
                  disabled={updating}
                >
                  <i className="ph-duotone ph-check-circle me-2"></i>
                  {updating ? 'Processando...' : 'Marcar como Concluído'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {request.admin_notes && (
        <div className="row mt-3">
          <div className="col-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Observações do Administrador</h5>
                <hr />
                <p className="mb-0">{request.admin_notes}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
