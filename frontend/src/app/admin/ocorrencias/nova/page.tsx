'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';
import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import('@/components/Map/LeafletMap'), {
  ssr: false,
  loading: () => <div>Carregando mapa...</div>
});

interface User {
  id: string;
  name: string;
  email: string;
  apartment_or_house: string | null;
}

interface IssueType {
  id: string;
  code: string;
  name: string;
  active: boolean;
}

export default function NovaOcorrenciaAdminPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, authLoading, router]);
  const [users, setUsers] = useState<User[]>([]);
  const [issueTypes, setIssueTypes] = useState<IssueType[]>([]);
  const [location, setLocation] = useState<[number, number]>([-9.0, -38.5]);
  const [formData, setFormData] = useState({
    user_id: '',
    type: '',
    description: '',
    latitude: -9.0,
    longitude: -38.5,
    photo: null as File | null
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchUsers();
      fetchIssueTypes();
      getCurrentLocation();
    }
  }, [mounted]);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/api/admin/users');
      const allUsers = Array.isArray(response.data) ? response.data : [];
      setUsers(allUsers.filter((u: any) => u.role === 'resident'));
    } catch (error) {
      console.error('Erro ao buscar moradores:', error);
    }
  };

  const fetchIssueTypes = async () => {
    try {
      const response = await api.get('/api/admin/issue-types');
      setIssueTypes(Array.isArray(response.data) ? response.data.filter((t: IssueType) => t.active) : []);
    } catch (error) {
      console.error('Erro ao buscar tipos:', error);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setLocation([lat, lng]);
          setFormData(prev => ({ ...prev, latitude: lat, longitude: lng }));
        },
        (error) => {
          console.error('Erro ao obter localização:', error);
        }
      );
    }
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setFormData(prev => ({ ...prev, latitude: lat, longitude: lng }));
    setLocation([lat, lng]);
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, photo: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.type) {
      alert('Selecione o tipo de ocorrência');
      return;
    }

    try {
      setLoading(true);

      const submitData = new FormData();
      if (formData.user_id) {
        submitData.append('user_id', formData.user_id);
      }
      submitData.append('type', formData.type);
      submitData.append('description', formData.description);
      submitData.append('latitude', formData.latitude.toString());
      submitData.append('longitude', formData.longitude.toString());
      
      if (formData.photo) {
        submitData.append('photo', formData.photo);
      }

      await api.post('/api/admin/issues', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Ocorrência cadastrada com sucesso!');
      router.push('/admin/ocorrencias');
    } catch (error: any) {
      alert(error.response?.data?.error || 'Erro ao cadastrar ocorrência');
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-md-12">
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/admin/dashboard">Dashboard</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="/admin/ocorrencias">Ocorrências</a>
                </li>
                <li className="breadcrumb-item" aria-current="page">Nova Ocorrência</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Morador (Opcional)</label>
                  <select
                    className="form-select"
                    value={formData.user_id}
                    onChange={(e) => setFormData({ ...formData, user_id: e.target.value })}
                  >
                    <option value="">Sem morador específico (reportado pela gestão)</option>
                    {users.map(user => (
                      <option key={user.id} value={user.id}>
                        {user.name} {user.apartment_or_house ? `- ${user.apartment_or_house}` : ''}
                      </option>
                    ))}
                  </select>
                  <small className="form-text text-muted">
                    Deixe em branco se a ocorrência foi identificada pela gestão
                  </small>
                </div>

                <div className="mb-3">
                  <label className="form-label">Tipo de Ocorrência *</label>
                  <select
                    className="form-select"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    required
                  >
                    <option value="">Selecione o tipo</option>
                    {issueTypes.map(type => (
                      <option key={type.id} value={type.code}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label">Descrição (Opcional)</label>
                  <textarea
                    className="form-control"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Descreva a ocorrência..."
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Localização *</label>
                  <div style={{ height: '300px', borderRadius: '8px', overflow: 'hidden' }}>
                    <LeafletMap
                      center={location}
                      zoom={15}
                      draggableMarker
                      onLocationSelect={handleLocationSelect}
                    />
                  </div>
                  <small className="form-text text-muted mt-2 d-block">
                    Arraste o marcador para ajustar a localização exata
                  </small>
                </div>

                <div className="mb-3">
                  <label className="form-label">Foto (Opcional)</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handlePhotoChange}
                  />
                  {formData.photo && (
                    <small className="form-text text-success mt-2 d-block">
                      ✓ {formData.photo.name}
                    </small>
                  )}
                </div>

                <div className="d-flex gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Cadastrando...' : 'Cadastrar Ocorrência'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => router.push('/admin/ocorrencias')}
                    disabled={loading}
                  >
                    Cancelar
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
