'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

interface TractorRequest {
  id: string;
  requested_date: string;
  hours_needed: number;
  description?: string;
  status: string;
  admin_notes?: string;
  value_per_hour: number;
  total_value: number;
  created_at: string;
}

export default function MoradorTratoresPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [requests, setRequests] = useState<TractorRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    requested_date: '',
    hours_needed: 1,
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
      const response = await api.get('/api/tractor');
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
      await api.post('/api/tractor', formData);
      alert('Solicitação de trator enviada com sucesso!');
      setShowModal(false);
      setFormData({ requested_date: '', hours_needed: 1, description: '' });
      loadRequests();
    } catch (error: any) {
      alert(error.response?.data?.error || 'Erro ao enviar solicitação');
    }
  };

  const handleCancel = async (id: string) => {
    if (!confirm('Deseja cancelar esta solicitação?')) return;

    try {
      await api.delete(`/api/tractor/${id}`);
      alert('Solicitação cancelada');
      loadRequests();
    } catch (error: any) {
      alert(error.response?.data?.error || 'Erro ao cancelar');
    }
  };

  const getStatusBadge = (status: string) => {
    const badges: any = {
      pendente: 'bg-warning',
      aprovado: 'bg-success',
      rejeitado: 'bg-danger',
      concluido: 'bg-info'
    };
    return <span className={`badge ${badges[status]}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
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
                <h2 className="mb-0">Solicitações de Trator</h2>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><a href="/morador">Início</a></li>
                <li className="breadcrumb-item">Tratores</li>
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
                <i className="ph-duotone ph-tractor f-48 text-muted mb-3"></i>
                <p className="text-muted">Você ainda não possui solicitações de trator</p>
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
                    <h5 className="mb-0">
                      {request.hours_needed}h de Trator
                    </h5>
                    {getStatusBadge(request.status)}
                  </div>
                  <p className="text-muted mb-2">
                    <i className="ph-duotone ph-calendar me-2"></i>
                    {new Date(request.requested_date).toLocaleDateString('pt-BR')}
                  </p>
                  {request.description && (
                    <p className="text-muted small mb-2">{request.description}</p>
                  )}
                  <p className="mb-2">
                    <strong>Valor:</strong> R$ {request.total_value.toFixed(2)}
                    <br />
                    <small className="text-muted">(R$ {request.value_per_hour.toFixed(2)}/hora)</small>
                  </p>
                  {request.admin_notes && (
                    <div className="alert alert-info py-2 px-3 mt-2">
                      <small><strong>Observação:</strong> {request.admin_notes}</small>
                    </div>
                  )}
                  <div className="d-flex gap-2 mt-3">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => router.push(`/morador/tratores/${request.id}`)}
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
                  <h5 className="modal-title">Nova Solicitação de Trator</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Data Necessária *</label>
                      <input
                        type="date"
                        className="form-control"
                        value={formData.requested_date}
                        onChange={(e) => setFormData({ ...formData, requested_date: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Quantidade de Horas *</label>
                      <input
                        type="number"
                        className="form-control"
                        min="1"
                        value={formData.hours_needed}
                        onChange={(e) => setFormData({ ...formData, hours_needed: parseInt(e.target.value) })}
                        required
                      />
                      <small className="text-muted">Valor por hora: R$ 150,00</small>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Descrição do Serviço</label>
                      <textarea
                        className="form-control"
                        rows={3}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        placeholder="Descreva o serviço que precisa"
                      ></textarea>
                    </div>
                    <div className="alert alert-info">
                      <small>
                        <i className="ph-duotone ph-info me-2"></i>
                        A disponibilidade será gerenciada pelo condomínio
                      </small>
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
