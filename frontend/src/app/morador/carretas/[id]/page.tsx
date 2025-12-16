'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getCartRequestById, cancelCartRequest, CartRequest } from '@/lib/cart';

export default function DetalhesCarretaPage() {
  const router = useRouter();
  const params = useParams();
  const [mounted, setMounted] = useState(false);
  const [request, setRequest] = useState<CartRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [canceling, setCanceling] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && params.id) {
      loadRequest();
    }
  }, [mounted, params.id]);

  async function loadRequest() {
    if (!mounted) return;
    try {
      setLoading(true);
      const data = await getCartRequestById(params.id as string);
      setRequest(data);
    } catch (error) {
      console.error('Erro ao carregar solicitação:', error);
      alert('Erro ao carregar detalhes da solicitação');
      router.push('/morador/carretas');
    } finally {
      setLoading(false);
    }
  }

  const getStatusInfo = (status: string) => {
    const info = {
      pendente: { label: 'Pendente', class: 'bg-warning', icon: 'clock' },
      aprovado: { label: 'Aprovado', class: 'bg-success', icon: 'check-circle' },
      rejeitado: { label: 'Rejeitado', class: 'bg-danger', icon: 'x-circle' },
      concluido: { label: 'Concluído', class: 'bg-info', icon: 'check' }
    };
    return info[status as keyof typeof info];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  const handleCancel = async () => {
    if (!request) return;

    const confirmed = confirm('Tem certeza que deseja cancelar esta solicitação?');
    if (!confirmed) return;

    try {
      setCanceling(true);
      await cancelCartRequest(request.id);
      alert('Solicitação cancelada com sucesso!');
      router.push('/morador/carretas');
    } catch (error: any) {
      alert(error.message || 'Erro ao cancelar solicitação');
    } finally {
      setCanceling(false);
    }
  };

  if (!mounted || loading) {
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
      <div className="container">
        <div className="alert alert-warning">
          Solicitação não encontrada
        </div>
      </div>
    );
  }

  const statusInfo = getStatusInfo(request.status);

  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className="page-header-title">
                <h5 className="m-b-10">Detalhes da Solicitação</h5>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/morador/dashboard">Dashboard</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="/morador/carretas">Carretas</a>
                </li>
                <li className="breadcrumb-item">Detalhes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <div className="card-header">
              <h5>Solicitação #{request.id.substring(0, 8)}</h5>
              <div className="card-header-right">
                <span className={`badge ${statusInfo.class}`}>
                  <i className={`feather icon-${statusInfo.icon} me-1`}></i>
                  {statusInfo.label}
                </span>
              </div>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-sm-4">
                  <strong>Data Solicitada:</strong>
                </div>
                <div className="col-sm-8">
                  {formatDate(request.requested_date)}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4">
                  <strong>Horário:</strong>
                </div>
                <div className="col-sm-8">
                  08:00 - 16:00 (Diária completa)
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4">
                  <strong>Valor:</strong>
                </div>
                <div className="col-sm-8">
                  R$ {parseFloat(request.value.toString()).toFixed(2)}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-sm-4">
                  <strong>Data da Solicitação:</strong>
                </div>
                <div className="col-sm-8">
                  {formatDateTime(request.created_at)}
                </div>
              </div>

              {request.approved_at && (
                <div className="row mb-3">
                  <div className="col-sm-4">
                    <strong>Data da Resposta:</strong>
                  </div>
                  <div className="col-sm-8">
                    {formatDateTime(request.approved_at)}
                  </div>
                </div>
              )}

              {request.admin_notes && (
                <div className="row mb-3">
                  <div className="col-sm-12">
                    <strong>Observações do Administrador:</strong>
                    <div className="alert alert-light mt-2">
                      {request.admin_notes}
                    </div>
                  </div>
                </div>
              )}

              <hr />

              <div className="alert alert-info">
                <h6 className="alert-heading">Status da Solicitação</h6>
                {request.status === 'pendente' && (
                  <p className="mb-0">Sua solicitação está aguardando análise do administrador.</p>
                )}
                {request.status === 'aprovado' && (
                  <p className="mb-0">Sua solicitação foi aprovada! A carreta será entregue na data e período solicitados.</p>
                )}
                {request.status === 'rejeitado' && (
                  <p className="mb-0">Infelizmente sua solicitação foi rejeitada. Verifique as observações do administrador.</p>
                )}
                {request.status === 'concluido' && (
                  <p className="mb-0">O serviço foi concluído com sucesso!</p>
                )}
              </div>

              <div className="d-grid gap-2">
                {request.status === 'pendente' && (
                  <button
                    onClick={handleCancel}
                    className="btn btn-danger"
                    disabled={canceling}
                  >
                    {canceling ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Cancelando...
                      </>
                    ) : (
                      <>
                        <i className="feather icon-x-circle me-2"></i>
                        Cancelar Solicitação
                      </>
                    )}
                  </button>
                )}
                <button
                  onClick={() => router.push('/morador/carretas')}
                  className="btn btn-secondary"
                >
                  <i className="feather icon-arrow-left me-2"></i>
                  Voltar para Lista
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
