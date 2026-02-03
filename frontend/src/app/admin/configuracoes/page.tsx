'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { listSettings, updateSetting, SystemSetting } from '@/lib/settings';

export default function ConfiguracoesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [settings, setSettings] = useState<SystemSetting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, authLoading, router]);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [appIcon, setAppIcon] = useState<string | null>(null);
  const [uploadingIcon, setUploadingIcon] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      loadSettings();
    }
  }, [mounted]);

  async function loadSettings() {
    if (!mounted) return;
    console.log('loadSettings: iniciando...');
    try {
      setLoading(true);
      console.log('loadSettings: chamando API...');
      const data = await listSettings();
      console.log('Settings recebidos:', data);
      console.log('É array?', Array.isArray(data));
      console.log('Quantidade:', data?.length);
      setSettings(Array.isArray(data) ? data : []);
      
      const initialData: Record<string, string> = {};
      if (Array.isArray(data)) {
        data.forEach(setting => {
          initialData[setting.key] = setting.value;
          if (setting.key === 'app_icon_url') {
            setAppIcon(setting.value);
          }
        });
      }
      console.log('FormData inicial:', initialData);
      setFormData(initialData);
      console.log('loadSettings: setLoading(false)');
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
      alert('Erro ao carregar configurações: ' + (error as Error).message);
    } finally {
      setLoading(false);
      console.log('loadSettings: finalmente loading=false');
    }
  }

  async function handleIconUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar tipo
    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
      alert('Apenas arquivos PNG ou JPG são permitidos');
      return;
    }

    // Validar tamanho (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('O arquivo deve ter no máximo 5MB');
      return;
    }

    try {
      setUploadingIcon(true);
      
      const formData = new FormData();
      formData.append('icon', file);

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/settings/app-icon`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Erro ao fazer upload do ícone');
      }

      const data = await response.json();
      setAppIcon(data.iconUrl);
      alert('Ícone do app atualizado com sucesso!');
      // Recarregar settings para atualizar o valor
      loadSettings();
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      alert('Erro ao fazer upload do ícone');
    } finally {
      setUploadingIcon(false);
    }
  }

  async function initializeSettings() {
    if (!confirm('Deseja criar as configurações padrão do sistema?')) return;
    
    try {
      setLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/settings/initialize`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Erro ao inicializar configurações');
      }
      
      const data = await response.json();
      alert(data.message || 'Configurações inicializadas com sucesso!');
      loadSettings();
    } catch (error) {
      console.error('Erro ao inicializar:', error);
      alert('Erro ao inicializar configurações');
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setSaving(true);
      
      // Atualizar cada configuração modificada
      const promises = Array.isArray(settings) ? settings.map(setting => {
        if (formData[setting.key] !== setting.value) {
          return updateSetting(setting.key, formData[setting.key]);
        }
        return Promise.resolve();
      }) : [];

      await Promise.all(promises);
      alert('Configurações atualizadas com sucesso!');
      loadSettings();
    } catch (error: any) {
      alert(error.message || 'Erro ao atualizar configurações');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const getSettingLabel = (key: string) => {
    const labels: Record<string, string> = {
      cart_price: 'Valor da Diária de Carreta (R$)',
      min_hours_advance: 'Horas Mínimas de Antecedência',
      available_carts: 'Número de Carretas Disponíveis'
    };
    return labels[key] || key;
  };

  const getSettingDescription = (key: string) => {
    const descriptions: Record<string, string> = {
      cart_price: 'Valor cobrado por diária (08:00 - 16:00)',
      min_hours_advance: 'Tempo mínimo de antecedência para agendamento',
      available_carts: 'Quantidade total de carretas disponíveis para agendamento simultâneo'
    };
    return descriptions[key];
  };

  const getSettingType = (key: string) => {
    if (key === 'cart_price') return 'number';
    if (key === 'min_hours_advance') return 'number';
    if (key === 'available_carts') return 'number';
    return 'text';
  };

  const getSettingStep = (key: string) => {
    if (key === 'cart_price') return '0.01';
    return '1';
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
                <h5 className="m-b-10">Configurações do Sistema</h5>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/admin/dashboard">Dashboard</a>
                </li>
                <li className="breadcrumb-item">Configurações</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <div className="card-header">
              <h5>Parâmetros do Sistema</h5>
            </div>
            <div className="card-body">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Carregando...</span>
                  </div>
                </div>
              ) : settings.length === 0 ? (
                <div className="text-center py-5">
                  <i className="feather icon-settings" style={{ fontSize: '48px', opacity: 0.3 }}></i>
                  <h5 className="mt-3">Nenhuma configuração encontrada</h5>
                  <p className="text-muted">Clique no botão abaixo para criar as configurações iniciais do sistema.</p>
                  <button
                    type="button"
                    onClick={initializeSettings}
                    className="btn btn-primary"
                  >
                    <i className="feather icon-plus me-2"></i>
                    Inicializar Configurações
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="alert alert-info mb-4">
                    <i className="feather icon-info me-2"></i>
                    <strong>Atenção:</strong> As alterações nestas configurações afetam todo o sistema.
                    Todas as modificações são registradas no log de auditoria.
                  </div>

                  {Array.isArray(settings) && settings.map((setting) => (
                    <div key={setting.key} className="mb-4">
                      <label htmlFor={setting.key} className="form-label fw-bold">
                        {getSettingLabel(setting.key)}
                      </label>
                      {getSettingDescription(setting.key) && (
                        <div className="text-muted small mb-2">
                          {getSettingDescription(setting.key)}
                        </div>
                      )}
                      <input
                        type={getSettingType(setting.key)}
                        className="form-control"
                        id={setting.key}
                        value={formData[setting.key] || ''}
                        onChange={(e) => handleChange(setting.key, e.target.value)}
                        step={getSettingStep(setting.key)}
                        min={setting.key === 'available_carts' ? '1' : '0'}
                      />
                    </div>
                  ))}

                  <div className="d-flex gap-2 mb-4">
                    <button type="submit" className="btn btn-primary" disabled={saving}>
                      {saving ? 'Salvando...' : 'Salvar Configurações'}
                    </button>
                  </div>
                </form>
              )}

              {/* App Icon Configuration */}
              <div className="card mt-4">
            <div className="card-header">
              <h5>Ícone do Aplicativo (iOS/Android)</h5>
            </div>
            <div className="card-body">
              <div className="alert alert-info mb-4">
                <i className="feather icon-info me-2"></i>
                <strong>Requisitos do Ícone:</strong>
                <ul className="mb-0 mt-2">
                  <li><strong>Formato:</strong> PNG ou JPG (PNG recomendado)</li>
                  <li><strong>Tamanho recomendado:</strong> 1024x1024 pixels (mínimo 512x512)</li>
                  <li><strong>Aspecto:</strong> Quadrado (1:1)</li>
                  <li><strong>Fundo:</strong> Preferível sem transparência</li>
                  <li><strong>Design:</strong> Simples e reconhecível, sem bordas arredondadas (o sistema adiciona automaticamente)</li>
                </ul>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <div className="text-center mb-3">
                    {appIcon ? (
                      <img 
                        src={appIcon.startsWith('http') ? appIcon : `${process.env.NEXT_PUBLIC_API_URL}${appIcon}`}
                        alt="Ícone do App" 
                        className="img-thumbnail"
                        style={{ width: '200px', height: '200px', objectFit: 'contain' }}
                      />
                    ) : (
                      <div 
                        className="d-flex align-items-center justify-content-center bg-light border rounded"
                        style={{ width: '200px', height: '200px', margin: '0 auto' }}
                      >
                        <i className="feather icon-image" style={{ fontSize: '48px', opacity: 0.3 }}></i>
                      </div>
                    )}
                  </div>
                  <div className="d-grid">
                    <label className="btn btn-primary" htmlFor="appIconUpload">
                      {uploadingIcon ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Enviando...
                        </>
                      ) : (
                        <>
                          <i className="feather icon-upload me-2"></i>
                          {appIcon ? 'Alterar Ícone' : 'Enviar Ícone'}
                        </>
                      )}
                    </label>
                    <input
                      type="file"
                      id="appIconUpload"
                      className="d-none"
                      accept="image/png,image/jpeg,image/jpg"
                      onChange={handleIconUpload}
                      disabled={uploadingIcon}
                    />
                  </div>
                </div>

                <div className="col-md-8">
                  <h6>Como será usado:</h6>
                  <div className="mb-3">
                    <strong>iOS (App Store):</strong>
                    <p className="text-muted mb-1">O sistema gerará automaticamente os ícones necessários nos tamanhos:</p>
                    <ul className="small text-muted">
                      <li>1024x1024 (App Store)</li>
                      <li>180x180 (iPhone)</li>
                      <li>167x167 (iPad Pro)</li>
                      <li>152x152 (iPad)</li>
                      <li>120x120 (iPhone)</li>
                      <li>76x76 (iPad)</li>
                    </ul>
                  </div>

                  <div className="mb-3">
                    <strong>Android (Play Store):</strong>
                    <p className="text-muted mb-1">O sistema gerará automaticamente os ícones necessários nos tamanhos:</p>
                    <ul className="small text-muted">
                      <li>512x512 (Play Store)</li>
                      <li>192x192 (xxxhdpi)</li>
                      <li>144x144 (xxhdpi)</li>
                      <li>96x96 (xhdpi)</li>
                      <li>72x72 (hdpi)</li>
                      <li>48x48 (mdpi)</li>
                    </ul>
                  </div>

                  <div className="alert alert-warning">
                    <i className="feather icon-alert-triangle me-2"></i>
                    <strong>Importante:</strong> Após alterar o ícone, será necessário gerar novamente os builds iOS/Android para que as mudanças sejam aplicadas nos apps.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h5>Sobre as Configurações</h5>
            </div>
            <div className="card-body">
              <h6>Valor da Carreta</h6>
              <p>Define o valor em reais (R$) cobrado por cada período de uso da carreta.</p>

              <h6>Horas Mínimas de Antecedência</h6>
              <p>Define quantas horas antes os moradores devem solicitar a carreta. Exemplo: se configurado para 24, os moradores só podem solicitar com pelo menos 1 dia de antecedência.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
