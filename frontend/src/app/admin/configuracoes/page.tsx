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
                        required
                      />
                      {setting.description && (
                        <small className="form-text text-muted">
                          {setting.description}
                        </small>
                      )}
                      <small className="form-text text-muted d-block">
                        <strong>Última atualização:</strong> {new Date(setting.updated_at).toLocaleString('pt-BR')}
                      </small>
                    </div>
                  ))}

                  <hr />

                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button
                      type="button"
                      onClick={loadSettings}
                      className="btn btn-secondary"
                      disabled={saving}
                    >
                      <i className="feather icon-rotate-ccw me-2"></i>
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={saving}
                    >
                      {saving ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Salvando...
                        </>
                      ) : (
                        <>
                          <i className="feather icon-save me-2"></i>
                          Salvar Configurações
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
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
