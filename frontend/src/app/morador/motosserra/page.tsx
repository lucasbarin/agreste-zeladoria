'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

interface ChainsawRequest {
  id: string;
  requested_date: string;
  description: string;
  status: string;
  admin_notes?: string;
  created_at: string;
}

export default function MoradorMotosserraPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [requests, setRequests] = useState<ChainsawRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    requested_date: '',
    description: ''
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      loadRequests();
    }
  }, [mounted]);

  const loadRequests = async () => {
    if (!mounted) return;
    try {
      setLoading(true);
      const response = await api.get('/api/chainsaw');
      setRequests(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Erro ao carregar solicitações:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await api.post('/api/chainsaw', formData);
      alert('Solicitação enviada com sucesso! Aguarde o contato para avaliação.');
      setShowModal(false);
      setFormData({ requested_date: '', description: '' });
      loadRequests();
    } catch (error: any) {
      alert(error.response?.data?.error || 'Erro ao enviar solicitação');
    }
  };

  const handleCancel = async (id: string) => {
    if (!confirm('Deseja cancelar esta solicitação?')) return;

    try {
      await api.delete(`/api/chainsaw/${id}`);
      alert('Solicitação cancelada');
      loadRequests();
    } catch (error: any) {
      alert(error.response?.data?.error || 'Erro ao cancelar');
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

  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className="page-header-title">
                <h2 className="mb-0">Serviços de Motosserra</h2>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><a href="/morador">Início</a></li>
                <li className="breadcrumb-item">Motosserra</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12">
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <i className="ph-duotone ph-plus me-2"></i>
            Nova Solicitação
          </button>
        </div>
      </div>

      <div className="row">
        {requests.length === 0 ? (
          <div className="col-12">
            <div className="card">
              <div className="card-body text-center py-5">
                <i className="ph-duotone ph-tree f-48 text-muted mb-3"></i>
                <p className="text-muted">Você ainda não possui solicitações de serviço com motosserra</p>
                <button className="btn btn-primary mt-3" onClick={() => setShowModal(true)}>
                  Fazer Primeira Solicitação
                </button>
              </div>
            </div>
          </div>
        ) : (
          requests.map((request) => (
            <div key={request.id} className="col-md-6 col-lg-4">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h5 className="mb-0">Serviço com Motosserra</h5>
                    {getStatusBadge(request.status)}
                  </div>
                  <p className="text-muted mb-2">
                    <i className="ph-duotone ph-calendar me-2"></i>
                    Visita: {new Date(request.requested_date).toLocaleDateString('pt-BR')}
                  </p>
                  <p className="text-muted small mb-2">{request.description}</p>
                  {request.admin_notes && (
                    <div className="alert alert-warning py-2 px-3 mt-2">
                      <small><strong>Observação:</strong> {request.admin_notes}</small>
                    </div>
                  )}
                  <div className="d-flex gap-2 mt-3">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => router.push(`/morador/motosserra/${request.id}`)}
                    >
                      Ver Detalhes
                    </button>
                    {request.status === 'pendente' && (
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleCancel(request.id)}
                      >
                        Cancelar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Nova Solicitação de Serviço</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="alert alert-info">
                      <i className="ph-duotone ph-info me-2"></i>
                      <small><strong>Importante:</strong> Informe a data desejada e uma descrição do serviço necessário.</small>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Data do Serviço *</label>
                      <input
                        type="date"
                        className="form-control"
                        value={formData.requested_date}
                        onChange={(e) => setFormData({ ...formData, requested_date: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Descrição do Serviço *</label>
                      <textarea
                        className="form-control"
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Descreva o serviço necessário: tipo de árvore, localização, etc."
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Enviar Solicitação
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
