'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';

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
    apartment_or_house?: string;
  };
}

export default function AdminMotosserraPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [requests, setRequests] = useState<ChainsawRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('todos');

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

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

  const filteredRequests = requests.filter(req => {
    if (filter === 'todos') return true;
    return req.status === filter;
  });

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

  const getStatusCount = (status: string) => {
    return requests.filter(r => r.status === status).length;
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
                <h2 className="mb-0">Gestão de Serviços com Motosserra</h2>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item"><a href="/admin">Dashboard</a></li>
                <li className="breadcrumb-item">Motosserra</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-3">
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
                  <div className="avtar avtar-s bg-light-info">
                    <i className="feather icon-loader"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="mb-0">Em Andamento</h6>
                  <p className="text-muted mb-0">{getStatusCount('em_andamento')}</p>
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
                  <h6 className="mb-0">Cancelados</h6>
                  <p className="text-muted mb-0">{getStatusCount('cancelado')}</p>
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
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5>Solicitações ({filteredRequests.length})</h5>
              <div className="btn-group">
                <button className={`btn btn-sm ${filter === 'todos' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setFilter('todos')}>Todos</button>
                <button className={`btn btn-sm ${filter === 'pendente' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setFilter('pendente')}>Pendentes</button>
                <button className={`btn btn-sm ${filter === 'em_andamento' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setFilter('em_andamento')}>Em Andamento</button>
                <button className={`btn btn-sm ${filter === 'concluido' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => setFilter('concluido')}>Concluídos</button>
              </div>
            </div>
            <div className="card-body table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Morador</th>
                    <th>Data Serviço</th>
                    <th>Descrição</th>
                    <th>Status</th>
                    <th>Solicitado em</th>
                    <th className="text-end">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((request) => (
                    <tr key={request.id}>
                      <td>
                        <strong>{request.user.name}</strong>
                        {request.user.apartment_or_house && (
                          <><br /><small className="text-muted">{request.user.apartment_or_house}</small></>
                        )}
                      </td>
                      <td>{new Date(request.requested_date).toLocaleDateString('pt-BR')}</td>
                      <td>
                        <span className="text-truncate d-inline-block" style={{ maxWidth: '200px' }} title={request.description}>
                          {request.description}
                        </span>
                      </td>
                      <td>{getStatusBadge(request.status)}</td>
                      <td>{new Date(request.created_at).toLocaleDateString('pt-BR')}</td>
                      <td className="text-end">
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => router.push(`/admin/motosserra/${request.id}`)}
                        >
                          Ver Detalhes
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredRequests.length === 0 && (
                <div className="text-center py-5">
                  <p className="text-muted">Nenhuma solicitação encontrada</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
