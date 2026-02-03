'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { IMaskInput } from 'react-imask';
import { formatName, formatAddress } from '@/utils/textFormat';
import api from '@/lib/api';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  whatsapp: string | null;
  apartment_or_house: string | null;
  photo_url: string | null;
  created_at: string;
}

export default function PerfilPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [mounted, setMounted] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    apartment_or_house: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchProfile();
    }
  }, [mounted]);

  const fetchProfile = async () => {
    if (!mounted) return;
    try {
      const response = await api.get('/api/profile');
      setProfile(response.data);
      setFormData({
        name: response.data.name,
        email: response.data.email,
        whatsapp: response.data.whatsapp || '',
        apartment_or_house: response.data.apartment_or_house || ''
      });
    } catch (error) {
      console.error('Erro ao buscar perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const response = await api.put('/api/profile', formData);
      setProfile(response.data);
      alert('Perfil atualizado com sucesso!');
    } catch (error: any) {
      console.error('Erro ao atualizar perfil:', error);
      alert(error.message || 'Erro ao atualizar perfil');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert('A nova senha deve ter no mínimo 6 caracteres');
      return;
    }

    try {
      await api.put('/api/profile/password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      alert('Senha alterada com sucesso!');
      setShowPasswordModal(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error: any) {
      console.error('Erro ao alterar senha:', error);
      alert(error.message || 'Erro ao alterar senha');
    }
  };

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tamanho (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('A imagem deve ter no máximo 5MB');
      return;
    }

    try {
      const photoFormData = new FormData();
      photoFormData.append('photo', file);
      const response = await api.post('/api/profile/photo', photoFormData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setProfile(response.data);
      alert('Foto atualizada com sucesso!');
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      alert('Erro ao fazer upload da foto');
    }
  };

  const handleDeletePhoto = async () => {
    if (!confirm('Deseja remover sua foto de perfil?')) return;

    try {
      const response = await api.delete('/api/profile/photo');
      setProfile(response.data);
      alert('Foto removida com sucesso!');
    } catch (error) {
      console.error('Erro ao remover foto:', error);
      alert('Erro ao remover foto');
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
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

  if (!profile) return <div className="alert alert-danger">Erro ao carregar perfil</div>;

  return (
    <>
      {/* Header */}
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className="page-header-title">
                <h2 className="mb-0">Meu Perfil</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Card de Foto */}
        <div className="col-md-4">
          <div className="card">
            <div className="card-body text-center">
              <div className="position-relative d-inline-block mb-3">
                {profile.photo_url ? (
                  <img
                    src={profile.photo_url.startsWith('http') ? profile.photo_url : `${process.env.NEXT_PUBLIC_API_URL}${profile.photo_url}`}
                    alt="Foto de perfil"
                    className="rounded-circle"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    className="rounded-circle d-flex align-items-center justify-content-center bg-primary text-white"
                    style={{ width: '150px', height: '150px', fontSize: '48px', fontWeight: 'bold' }}
                  >
                    {getInitials(profile.name)}
                  </div>
                )}
              </div>
              <h5>{profile.name}</h5>
              <p className="text-muted mb-3">{profile.email}</p>
              
              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoUpload}
                accept="image/*"
                style={{ display: 'none' }}
              />
              
              <button
                className="btn btn-primary btn-sm me-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <i className="ph-duotone ph-upload me-1"></i>
                {profile.photo_url ? 'Alterar Foto' : 'Adicionar Foto'}
              </button>
              
              {profile.photo_url && (
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={handleDeletePhoto}
                >
                  <i className="ph-duotone ph-trash me-1"></i>
                  Remover
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Card de Dados */}
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5>Dados Cadastrais</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-md-12">
                  <label className="form-label">Nome Completo</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: formatName(e.target.value) })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">WhatsApp</label>
                  <IMaskInput
                    mask="(00) 00000-0000"
                    className="form-control"
                    value={formData.whatsapp}
                    onAccept={(value) => setFormData({ ...formData, whatsapp: value })}
                    placeholder="(00) 00000-0000"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Endereço (Rua e número)</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.apartment_or_house}
                    onChange={(e) => setFormData({ ...formData, apartment_or_house: formatAddress(e.target.value) })}
                    placeholder="Ex: Apto 101"
                  />
                </div>
                <div className="col-12">
                  <button
                    className="btn btn-primary"
                    onClick={handleSave}
                    disabled={saving}
                  >
                    {saving ? 'Salvando...' : 'Salvar Alterações'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card de Segurança */}
          <div className="card mt-3">
            <div className="card-header">
              <h5>Segurança</h5>
            </div>
            <div className="card-body">
              <button
                className="btn btn-outline-primary"
                onClick={() => setShowPasswordModal(true)}
              >
                <i className="ph-duotone ph-lock me-2"></i>
                Alterar Senha
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Alterar Senha */}
      {showPasswordModal && (
        <>
          <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Alterar Senha</h5>
                  <button type="button" className="btn-close" onClick={() => setShowPasswordModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Senha Atual</label>
                    <input
                      type="password"
                      className="form-control"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nova Senha</label>
                    <input
                      type="password"
                      className="form-control"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      placeholder="Mínimo 6 caracteres"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Confirmar Nova Senha</label>
                    <input
                      type="password"
                      className="form-control"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowPasswordModal(false)}>
                    Cancelar
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handlePasswordChange}>
                    Alterar Senha
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
