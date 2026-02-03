'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { listCartRequests, CartRequest } from '@/lib/cart';
import { getSetting } from '@/lib/settings';

export default function CarretasPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [requests, setRequests] = useState<CartRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [cartPrice, setCartPrice] = useState('50.00');

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      loadData();
    }
  }, [mounted]);

  async function loadData() {
    if (!mounted) return;
    try {
      setLoading(true);
      const [requestsData, priceSetting] = await Promise.all([
        listCartRequests(),
        getSetting('cart_price').catch(() => ({ value: '50.00' }))
      ]);
      setRequests(requestsData);
      setCartPrice(priceSetting.value);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  }

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

  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className="page-header-title">
                <h5 className="m-b-10">Solicitações de Carreta</h5>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/morador/dashboard">Dashboard</a>
                </li>
                <li className="breadcrumb-item">Carretas</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center flex-wrap">
              <h5 className="mb-0">Nova Solicitação</h5>
              <button
                onClick={() => router.push('/morador/carretas/nova')}
                className="btn btn-primary btn-sm mt-2 mt-md-0"
              >
                <i className="feather icon-plus"></i> Solicitar Carreta
              </button>
            </div>
            <div className="card-body">
              <div className="alert alert-info">
                <i className="feather icon-info me-2"></i>
                <strong>Valor:</strong> R$ {cartPrice} por período | 
                <strong className="ms-2">Antecedência mínima:</strong> 24 horas
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header">
              <h5>Minhas Solicitações</h5>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Carregando...</span>
                  </div>
                </div>
              ) : Array.isArray(requests) && requests.length === 0 ? (
                <div className="text-center py-5">
                  <i className="feather icon-inbox" style={{ fontSize: '48px', color: '#ccc' }}></i>
                  <p className="text-muted mt-3">Nenhuma solicitação encontrada</p>
                  <button
                    onClick={() => router.push('/morador/carretas/nova')}
                    className="btn btn-primary mt-2"
                  >
                    Fazer primeira solicitação
                  </button>
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Data</th>
                        <th>Horário</th>
                        <th>Valor</th>
                        <th>Status</th>
                        <th>Solicitado em</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(requests) && requests.map((request) => (
                        <tr key={request.id}>
                          <td>{formatDate(request.requested_date)}</td>
                          <td>08:00 - 16:00</td>
                          <td>R$ {parseFloat(request.value.toString()).toFixed(2)}</td>
                          <td>{getStatusBadge(request.status)}</td>
                          <td>{formatDate(request.created_at)}</td>
                          <td>
                            <button
                              onClick={() => router.push(`/morador/carretas/${request.id}`)}
                              className="btn btn-sm btn-info"
                              title="Ver detalhes"
                            >
                              <i className="feather icon-eye"></i>
                            </button>
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
