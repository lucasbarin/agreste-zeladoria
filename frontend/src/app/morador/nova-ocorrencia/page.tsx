'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { issueService } from '@/lib/issues';
import { IssueType } from '@/types';
import dynamic from 'next/dynamic';

// Importar mapa dinamicamente (só no cliente)
const LeafletMap = dynamic(() => import('@/components/Map/LeafletMap'), {
  ssr: false,
  loading: () => <div className="bg-gray-200 rounded" style={{ height: '400px' }}>Carregando mapa...</div>
});

export default function NovaOcorrenciaPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    type: 'poste_com_luz_queimada' as IssueType,
    description: '',
    latitude: -22.17496021078111, // Portaria do Residencial Recanto do Agreste
    longitude: -46.77342106771189,
  });

  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [loadingLocation, setLoadingLocation] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Obter localização atual
  const getCurrentLocation = () => {
    setLoadingLocation(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
          setLoadingLocation(false);
        },
        (error) => {
          console.error('Erro ao obter localização:', error);
          alert('Não foi possível obter sua localização. Ajuste o marcador no mapa manualmente.');
          setLoadingLocation(false);
        }
      );
    } else {
      alert('Geolocalização não suportada pelo navegador');
      setLoadingLocation(false);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setFormData((prev) => ({
      ...prev,
      latitude: lat,
      longitude: lng,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await issueService.create({
        ...formData,
        photo: photo || undefined,
      });
      setSuccess(true);
      setTimeout(() => {
        router.push('/morador/ocorrencias');
      }, 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao criar ocorrência');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      
    );
  }

  if (!user) {
    return null;
  }

  if (success) {
    return (
      
        <div className="alert alert-success">
          <h4>Ocorrência criada com sucesso!</h4>
          <p>Redirecionando...</p>
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
                <h5 className="m-b-10">Nova Ocorrência</h5>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">Home</li>
                <li className="breadcrumb-item">Nova Ocorrência</li>
              </ul>
            </div>
            <div className="col-md-12 mt-2">
              <button
                onClick={() => router.back()}
                className="btn btn-outline-secondary btn-sm"
              >
                <i className="ph-duotone ph-arrow-left me-2"></i>
                Voltar
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title mb-3">Informações da Ocorrência</h5>

                {/* Tipo de problema */}
                <div className="mb-3">
                  <label className="form-label">Tipo de Problema *</label>
                  <select
                    className="form-select"
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value as IssueType })
                    }
                    required
                  >
                    <option value="poste_com_luz_queimada">Poste com Luz Queimada</option>
                    <option value="buraco_na_rua">Buraco na Rua</option>
                    <option value="sujeira_ou_entulho">Sujeira ou Entulho</option>
                  </select>
                </div>

                {/* Descrição */}
                <div className="mb-3">
                  <label className="form-label">Descrição (Opcional)</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    placeholder="Descreva o problema com mais detalhes..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />
                </div>

                {/* Upload de foto */}
                <div className="mb-3">
                  <label className="form-label">Foto (Opcional)</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handlePhotoChange}
                  />
                  {photoPreview && (
                    <div className="mt-2">
                      <img
                        src={photoPreview}
                        alt="Preview"
                        className="img-thumbnail"
                        style={{ maxHeight: '200px' }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title mb-3">Localização *</h5>
                
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    className="btn btn-primary"
                    disabled={loadingLocation}
                  >
                    {loadingLocation ? 'Obtendo localização...' : '📍 Usar Minha Localização'}
                  </button>
                  <small className="d-block text-muted mt-2">
                    Ou ajuste o marcador no mapa arrastando-o
                  </small>
                </div>

                <div className="mb-3">
                  <LeafletMap
                    center={[formData.latitude, formData.longitude]}
                    zoom={15}
                    height="400px"
                    draggableMarker
                    onLocationSelect={handleLocationSelect}
                  />
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <label className="form-label">Latitude</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.latitude}
                      readOnly
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Longitude</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.longitude}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="d-grid gap-2 mb-5">
              <button
                type="submit"
                className="btn btn-lg btn-primary"
                disabled={submitting}
              >
                {submitting ? 'Enviando...' : 'Enviar Ocorrência'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
