'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { IMaskInput } from 'react-imask';
import { formatName, formatAddress } from '@/utils/textFormat';
import api from '@/lib/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  whatsapp: string | null;
  apartment_or_house: string | null;
  created_at: string;
  _count: {
    issues: number;
  };
}

export default function MoradoresPage() {
  const { user: currentUser, loading: authLoading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'resident',
    status: 'ativo',
    whatsapp: '',
    apartment_or_house: ''
  });
  const [createFormData, setCreateFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'resident',
    whatsapp: '',
    apartment_or_house: ''
  });
  const [newPassword, setNewPassword] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!authLoading && (!currentUser || currentUser.role !== 'admin')) {
      router.push('/login');
    }
  }, [currentUser, authLoading, router]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && currentUser?.role === 'admin') {
      fetchUsers();
    }
  }, [mounted, currentUser]);

  const fetchUsers = async () => {
    if (!mounted) return;
    try {
      const response = await api.get('/api/admin/users');
      setUsers(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setCreateFormData({
      name: '',
      email: '',
      password: '',
      role: 'resident',
      whatsapp: '',
      apartment_or_house: ''
    });
    setShowCreateModal(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
      whatsapp: user.whatsapp || '',
      apartment_or_house: user.apartment_or_house || ''
    });
    setShowModal(true);
  };

  const handleResetPassword = (user: User) => {
    setSelectedUser(user);
    setNewPassword('');
    setShowResetModal(true);
  };

  const handleCreateSubmit = async () => {
    if (!createFormData.name || !createFormData.email || !createFormData.password) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    try {
      await api.post('/api/admin/users', createFormData);
      alert('Morador cadastrado com sucesso!');
      setShowCreateModal(false);
      fetchUsers();
    } catch (error: any) {
      console.error('Erro ao criar usuário:', error);
      alert(error.response?.data?.error || 'Erro ao criar usuário');
    }
  };

  const handleSave = async () => {
    if (!selectedUser) return;

    try {
      await api.put(`/api/admin/users/${selectedUser.id}`, formData);
      setShowModal(false);
      fetchUsers();
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      alert('Erro ao atualizar usuário');
    }
  };

  const handleResetPasswordSubmit = async () => {
    if (!selectedUser || !newPassword) return;

    try {
      await api.post(`/api/admin/users/${selectedUser.id}/reset-password`, { newPassword });
      alert('Senha redefinida com sucesso!');
      setShowResetModal(false);
    } catch (error) {
      console.error('Erro ao redefinir senha:', error);
      alert('Erro ao redefinir senha');
    }
  };

  const handleUpdateStatus = async (userId: string, newStatus: string) => {
    const action = newStatus === 'ativo' ? 'aprovar' : 'rejeitar';
    if (!confirm(`Tem certeza que deseja ${action} este usuário?`)) {
      return;
    }

    try {
      await api.patch(`/api/admin/users/${userId}/status`, { status: newStatus });
      alert(`Usuário ${newStatus === 'ativo' ? 'aprovado' : 'rejeitado'} com sucesso!`);
      fetchUsers();
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      alert('Erro ao atualizar status do usuário');
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.apartment_or_house?.toLowerCase().includes(searchTerm.toLowerCase()) || false)
  );

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
      {/* Header */}
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className="page-header-title">
                <h2 className="mb-0">Gerenciar Moradores</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtro e Botão Novo */}
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-10">
                  <div className="input-group">
                    <span className="input-group-text">
                      <i className="ph-duotone ph-magnifying-glass"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Buscar por nome, email ou endereço..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-2">
                  <button 
                    className="btn btn-primary w-100"
                    onClick={handleCreate}
                  >
                    <i className="ph-duotone ph-plus me-2"></i>
                    Novo Morador
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabela de Usuários */}
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h5>Lista de Moradores ({filteredUsers.length})</h5>
            </div>
            <div className="card-body table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Endereço</th>
                    <th>Tipo</th>
                    <th>Status</th>
                    <th>Ocorrências</th>
                    <th>Cadastrado em</th>
                    <th className="text-end">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avtar avtar-s bg-light-primary me-2">
                            <i className="ph-duotone ph-user"></i>
                          </div>
                          {user.name}
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>{user.apartment_or_house || '-'}</td>
                      <td>
                        <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                          {user.role === 'admin' ? 'Administrador' : 'Morador'}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${
                          user.status === 'ativo' ? 'bg-success' : 
                          user.status === 'pendente' ? 'bg-warning' : 'bg-secondary'
                        }`}>
                          {user.status === 'ativo' ? 'Ativo' : 
                           user.status === 'pendente' ? 'Pendente' : 'Inativo'}
                        </span>
                      </td>
                      <td>{user._count.issues}</td>
                      <td>{new Date(user.created_at).toLocaleDateString('pt-BR')}</td>
                      <td className="text-end">
                        {user.status === 'pendente' && user.role !== 'admin' && (
                          <>
                            <button
                              className="btn btn-sm btn-success me-1"
                              onClick={() => handleUpdateStatus(user.id, 'ativo')}
                              title="Aprovar"
                            >
                              <i className="ph-duotone ph-check"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-danger me-1"
                              onClick={() => handleUpdateStatus(user.id, 'inativo')}
                              title="Rejeitar"
                            >
                              <i className="ph-duotone ph-x"></i>
                            </button>
                          </>
                        )}
                        <button
                          className="btn btn-sm btn-link-primary me-2"
                          onClick={() => handleEdit(user)}
                          title="Editar"
                        >
                          <i className="ph-duotone ph-pencil"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-link-warning"
                          onClick={() => handleResetPassword(user)}
                          title="Redefinir Senha"
                        >
                          <i className="ph-duotone ph-lock"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Editar Usuário */}
      {showModal && (
        <>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Editar Morador</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Nome</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: formatName(e.target.value) })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">WhatsApp</label>
                    <IMaskInput
                      mask="(00) 00000-0000"
                      className="form-control"
                      value={formData.whatsapp}
                      onAccept={(value) => setFormData({ ...formData, whatsapp: value })}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Endereço - Rua e número</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.apartment_or_house}
                      onChange={(e) => setFormData({ ...formData, apartment_or_house: formatAddress(e.target.value) })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Tipo de Usuário</label>
                    <select
                      className="form-select"
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    >
                      <option value="resident">Morador</option>
                      <option value="admin">Administrador</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                      className="form-select"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option value="ativo">Ativo</option>
                      <option value="inativo">Inativo</option>
                      <option value="pendente">Pendente</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancelar
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleSave}>
                    Salvar
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}

      {/* Modal Redefinir Senha */}
      {showResetModal && (
        <>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Redefinir Senha</h5>
                  <button type="button" className="btn-close" onClick={() => setShowResetModal(false)}></button>
                </div>
                <div className="modal-body">
                  <p>Redefinir senha para: <strong>{selectedUser?.name}</strong></p>
                  <div className="mb-3">
                    <label className="form-label">Nova Senha</label>
                    <input
                      type="password"
                      className="form-control"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Mínimo 6 caracteres"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowResetModal(false)}>
                    Cancelar
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-warning" 
                    onClick={handleResetPasswordSubmit}
                    disabled={newPassword.length < 6}
                  >
                    Redefinir Senha
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}

      {/* Modal Criar Morador */}
      {showCreateModal && (
        <>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Cadastrar Novo Morador</h5>
                  <button type="button" className="btn-close" onClick={() => setShowCreateModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Nome Completo *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={createFormData.name}
                      onChange={(e) => setCreateFormData({ ...createFormData, name: formatName(e.target.value) })}
                      placeholder="Digite o nome completo"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">E-mail *</label>
                    <input
                      type="email"
                      className="form-control"
                      value={createFormData.email}
                      onChange={(e) => setCreateFormData({ ...createFormData, email: e.target.value })}
                      placeholder="email@exemplo.com"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Senha *</label>
                    <input
                      type="password"
                      className="form-control"
                      value={createFormData.password}
                      onChange={(e) => setCreateFormData({ ...createFormData, password: e.target.value })}
                      placeholder="Mínimo 6 caracteres"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">WhatsApp</label>
                    <IMaskInput
                      mask="(00) 00000-0000"
                      className="form-control"
                      value={createFormData.whatsapp}
                      onAccept={(value) => setCreateFormData({ ...createFormData, whatsapp: value })}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Endereço - Rua e número</label>
                    <input
                      type="text"
                      className="form-control"
                      value={createFormData.apartment_or_house}
                      onChange={(e) => setCreateFormData({ ...createFormData, apartment_or_house: formatAddress(e.target.value) })}
                      placeholder="Ex: Apto 101, Casa 25"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Tipo de Usuário</label>
                    <select
                      className="form-select"
                      value={createFormData.role}
                      onChange={(e) => setCreateFormData({ ...createFormData, role: e.target.value })}
                    >
                      <option value="resident">Morador</option>
                      <option value="admin">Administrador</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowCreateModal(false)}>
                    Cancelar
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={handleCreateSubmit}
                    disabled={!createFormData.name || !createFormData.email || !createFormData.password}
                  >
                    Cadastrar
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
