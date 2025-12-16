'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';

interface IssueType {
  id: string;
  code: string;
  name: string;
  description: string | null;
  marker_color: string | null;
  marker_icon: string | null;
  active: boolean;
  created_at: string;
}

export default function TiposOcorrenciaPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [types, setTypes] = useState<IssueType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, authLoading, router]);
  const [showModal, setShowModal] = useState(false);
  const [editingType, setEditingType] = useState<IssueType | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    marker_color: '#dc3545',
    marker_icon: '',
    active: true
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchTypes();
    }
  }, [mounted]);

  const fetchTypes = async () => {
    if (!mounted) return;
    try {
      const response = await api.get('/api/admin/issue-types');
      setTypes(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Erro ao buscar tipos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNew = () => {
    setEditingType(null);
    setFormData({
      code: '',
      name: '',
      description: '',
      marker_color: '#dc3545',
      marker_icon: '',
      active: true
    });
    setShowModal(true);
  };

  const handleEdit = (type: IssueType) => {
    setEditingType(type);
    setFormData({
      code: type.code,
      name: type.name,
      description: type.description || '',
      marker_color: type.marker_color || '#dc3545',
      marker_icon: type.marker_icon || '',
      active: type.active
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (editingType) {
        await api.put(`/api/admin/issue-types/${editingType.id}`, formData);
      } else {
        await api.post('/api/admin/issue-types', formData);
      }
      setShowModal(false);
      fetchTypes();
    } catch (error) {
      console.error('Erro ao salvar tipo:', error);
      alert('Erro ao salvar tipo de ocorrência');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este tipo de ocorrência?')) return;

    try {
      await api.delete(`/api/admin/issue-types/${id}`);
      fetchTypes();
    } catch (error) {
      console.error('Erro ao excluir tipo:', error);
      alert('Erro ao excluir tipo de ocorrência');
    }
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
      {/* Header */}
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className="page-header-title d-flex justify-content-between align-items-center">
                <h2 className="mb-0">Tipos de Ocorrência</h2>
                <button className="btn btn-primary" onClick={handleNew}>
                  <i className="ph-duotone ph-plus me-2"></i>
                  Novo Tipo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabela de Tipos */}
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h5>Lista de Tipos ({types.length})</h5>
            </div>
            <div className="card-body table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Status</th>
                    <th>Cadastrado em</th>
                    <th className="text-end">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {types.map((type) => (
                    <tr key={type.id}>
                      <td>
                        <code className="text-primary">{type.code}</code>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avtar avtar-s bg-light-primary me-2">
                            <i className="ph-duotone ph-list-bullets"></i>
                          </div>
                          {type.name}
                        </div>
                      </td>
                      <td>{type.description || '-'}</td>
                      <td>
                        <span className={`badge ${type.active ? 'bg-success' : 'bg-secondary'}`}>
                          {type.active ? 'Ativo' : 'Inativo'}
                        </span>
                      </td>
                      <td>{new Date(type.created_at).toLocaleDateString('pt-BR')}</td>
                      <td className="text-end">
                        <button
                          className="btn btn-sm btn-link-primary me-2"
                          onClick={() => handleEdit(type)}
                          title="Editar"
                        >
                          <i className="ph-duotone ph-pencil"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-link-danger"
                          onClick={() => handleDelete(type.id)}
                          title="Excluir"
                        >
                          <i className="ph-duotone ph-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {types.length === 0 && (
                <div className="text-center py-5">
                  <i className="ph-duotone ph-list-bullets f-48 text-muted mb-3"></i>
                  <p className="text-muted">Nenhum tipo de ocorrência cadastrado</p>
                  <button className="btn btn-primary mt-3" onClick={handleNew}>
                    <i className="ph-duotone ph-plus me-2"></i>
                    Cadastrar Primeiro Tipo
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Criar/Editar */}
      {showModal && (
        <>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">
                    {editingType ? 'Editar' : 'Novo'} Tipo de Ocorrência
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Código *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      placeholder="Ex: poste_com_luz_queimada"
                    />
                    <small className="text-muted">Use apenas letras minúsculas, números e underscore</small>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nome *</label>
                    <input
                      type="text"
                      className="form-control"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Ex: Poste com Luz Queimada"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Descrição</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Descrição opcional do tipo de ocorrência"
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Cor do Marker no Mapa</label>
                    <div className="d-flex align-items-center gap-2">
                      <input
                        type="color"
                        className="form-control form-control-color"
                        value={formData.marker_color}
                        onChange={(e) => setFormData({ ...formData, marker_color: e.target.value })}
                        style={{ width: '60px', height: '40px' }}
                      />
                      <input
                        type="text"
                        className="form-control"
                        value={formData.marker_color}
                        onChange={(e) => setFormData({ ...formData, marker_color: e.target.value })}
                        placeholder="#dc3545"
                        maxLength={7}
                      />
                    </div>
                    <small className="text-muted">Escolha a cor que aparecerá no mapa</small>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Ícone (opcional)</label>
                    <div className="row g-2">
                      {[
                        { icon: 'lightbulb', label: 'Lâmpada' },
                        { icon: 'warning', label: 'Alerta' },
                        { icon: 'trash', label: 'Lixo' },
                        { icon: 'drop', label: 'Água' },
                        { icon: 'tree', label: 'Árvore' },
                        { icon: 'road-horizon', label: 'Rua' },
                        { icon: 'phone', label: 'Telefone' },
                        { icon: 'toolbox', label: 'Ferramentas' },
                        { icon: 'wrench', label: 'Chave' },
                        { icon: 'first-aid', label: 'Primeiros Socorros' }
                      ].map((item) => (
                        <div key={item.icon} className="col-3 col-md-2">
                          <button
                            type="button"
                            className={`btn w-100 ${formData.marker_icon === item.icon ? 'btn-primary' : 'btn-outline-secondary'}`}
                            onClick={() => setFormData({ ...formData, marker_icon: item.icon })}
                            title={item.label}
                          >
                            <i className={`ph-duotone ph-${item.icon}`} style={{ fontSize: '24px' }}></i>
                          </button>
                        </div>
                      ))}
                    </div>
                    <small className="text-muted">Selecione um ícone visual para o tipo de ocorrência</small>
                  </div>
                  <div className="mb-3">
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={formData.active}
                        onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                      />
                      <label className="form-check-label">Ativo</label>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancelar
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={handleSave}
                    disabled={!formData.code || !formData.name}
                  >
                    {editingType ? 'Atualizar' : 'Criar'}
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
