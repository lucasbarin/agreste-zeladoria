'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createCartRequest, CreateCartRequestData } from '@/lib/cart';
import { getSetting } from '@/lib/settings';

export default function NovaCarretaPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [cartPrice, setCartPrice] = useState('50.00');
  const [minHours, setMinHours] = useState('24');
  const [formData, setFormData] = useState<CreateCartRequestData>({
    requested_date: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  async function loadSettings() {
    try {
      const [price, hours] = await Promise.all([
        getSetting('cart_price').catch(() => ({ value: '50.00' })),
        getSetting('min_hours_advance').catch(() => ({ value: '24' }))
      ]);
      setCartPrice(price.value);
      setMinHours(hours.value);
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
    }
  }

  const getMinDate = () => {
    const now = new Date();
    const minDate = new Date(now.getTime() + parseInt(minHours) * 60 * 60 * 1000);
    return minDate.toISOString().split('T')[0];
  };

  const isWeekend = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validar fim de semana
    if (isWeekend(formData.requested_date)) {
      setError('Não é possível agendar carretas aos sábados e domingos');
      return;
    }

    // Validar data mínima
    const requestedDate = new Date(formData.requested_date);
    const now = new Date();
    const minDate = new Date(now.getTime() + parseInt(minHours) * 60 * 60 * 1000);

    if (requestedDate < minDate) {
      setError(`A data deve ser com pelo menos ${minHours} horas de antecedência`);
      return;
    }

    try {
      setLoading(true);
      await createCartRequest(formData);
      alert('Solicitação criada com sucesso! Aguarde a aprovação do administrador.');
      router.push('/morador/carretas');
    } catch (error: any) {
      setError(error.message || 'Erro ao criar solicitação');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className="page-header-title">
                <h5 className="m-b-10">Nova Solicitação de Carreta</h5>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/morador/dashboard">Dashboard</a>
                </li>
                <li className="breadcrumb-item">
                  <a href="/morador/carretas">Carretas</a>
                </li>
                <li className="breadcrumb-item">Nova Solicitação</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card">
            <div className="card-header">
              <h5>Solicitar Carreta</h5>
            </div>
            <div className="card-body">
              <div className="alert alert-info mb-4">
                <h6 className="alert-heading">Informações Importantes</h6>
                <ul className="mb-0">
                  <li>Valor: <strong>R$ {cartPrice}</strong> por diária (08:00 - 16:00)</li>
                  <li>Antecedência mínima: <strong>{minHours} horas</strong></li>
                  <li>Não disponível aos sábados e domingos</li>
                  <li>A carreta será levada até sua residência</li>
                  <li>Você só pode ter um agendamento ativo por vez</li>
                  <li>Após aprovação, você será notificado</li>
                </ul>
              </div>

              {error && (
                <div className="alert alert-danger">
                  <i className="feather icon-alert-circle me-2"></i>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="requested_date" className="form-label">
                    Data Desejada *
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="requested_date"
                    min={getMinDate()}
                    value={formData.requested_date}
                    onChange={(e) => setFormData({ ...formData, requested_date: e.target.value })}
                    required
                  />
                  <small className="form-text text-muted">
                    Data mínima: {new Date(getMinDate()).toLocaleDateString('pt-BR')} (não permitido sábados e domingos)
                  </small>
                </div>

                <div className="alert alert-warning">
                  <strong>Horário de funcionamento:</strong> Diária completa das 08:00 às 16:00
                </div>

                <div className="mb-3">
                  <div className="alert alert-warning">
                    <strong>Valor Total:</strong> R$ {cartPrice}
                  </div>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button
                    type="button"
                    onClick={() => router.push('/morador/carretas')}
                    className="btn btn-secondary"
                    disabled={loading}
                  >
                    <i className="feather icon-arrow-left me-2"></i>
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <i className="feather icon-check me-2"></i>
                        Solicitar Carreta
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
