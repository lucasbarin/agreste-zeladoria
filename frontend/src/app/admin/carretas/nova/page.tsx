'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';

interface User {
  id: string;
  name: string;
  email: string;
  apartment_or_house: string | null;
}

export default function NovaCarretaAdminPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, authLoading, router]);
  const [formData, setFormData] = useState({
    user_id: '',
    requested_date: ''
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchUsers();
    }
  }, [mounted]);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/api/admin/users');
      const allUsers = Array.isArray(response.data) ? response.data : [];
      // Filtrar apenas moradores
      setUsers(allUsers.filter((u: any) => u.role === 'resident'));
    } catch (error) {
      console.error('Erro ao buscar moradores:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.user_id || !formData.requested_date) {
      alert('Preencha todos os campos');
      return;
    }

    try {
      setLoading(true);
      await api.post('/api/cart', formData);
      alert('Solicitação de carreta criada com sucesso!');
      router.push('/admin/carretas');
    } catch (error: any) {
      console.error('Erro ao criar solicitação:', error);
      alert(error.response?.data?.error || 'Erro ao criar solicitação');
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      {/* Header */}
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-md-12">
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/admin">Dashboard</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="/admin/carretas">Carretas</a>
                </li>
                <li className="breadcrumb-item" aria-current="page">Nova Solicitação</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Formulário */}
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <div className="card-header">
              <h5>Criar Solicitação para Morador</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Morador *</label>
                  <select
                    className="form-select"
                    value={formData.user_id}
                    onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
                    required
                  >
                    <option value="">Selecione um morador</option>
                    {users.map(user => (
                      <option key={user.id} value={user.id}>
                        {user.name} {user.apartment_or_house ? `- ${user.apartment_or_house}` : ''}
                      </option>
                    ))}
                  </select>
                  <small className="form-text text-muted">
                    Selecione o morador para quem a carreta será agendada
                  </small>
                </div>

                <div className="mb-3">
                  <label className="form-label">Data da Solicitação *</label>
                  <input
                    type="date"
                    className="form-control"
                    value={formData.requested_date}
                    onChange={(e) => setFormData({ ...formData, requested_date: e.target.value })}
                    required
                  />
                  <small className="form-text text-muted">
                    A disponibilidade será verificada automaticamente
                  </small>
                </div>

                <div className="alert alert-info">
                  <i className="ph-duotone ph-info me-2"></i>
                  <strong>Importante:</strong> Esta solicitação será criada com status "pendente" e precisará ser aprovada posteriormente.
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => router.push('/admin/carretas')}
                    disabled={loading}
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Criando...
                      </>
                    ) : (
                      <>
                        <i className="ph-duotone ph-check me-2"></i>
                        Criar Solicitação
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
