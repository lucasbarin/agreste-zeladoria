'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function RegisterPage() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    apartment_or_house: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await register({
        ...formData,
        role: 'resident',
      });
    } catch (err: any) {
      setError(err.message || 'Erro ao cadastrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#e3a927', minHeight: '100vh' }}>
      <div className="container">
        <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh', paddingTop: '2rem', paddingBottom: '2rem' }}>
          <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <img src="/logo.png" alt="Agreste Zeladoria" height="70" className="mb-3" />
                <h1 className="mb-2">Cadastro</h1>
                <h6 className="text-muted">Crie sua conta no Agreste Zeladoria</h6>
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Nome completo</label>
                  <input
                    id="name"
                    name="name"
                    className="form-control"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">E-mail</label>
                  <input
                    id="email"
                    name="email"
                    className="form-control"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Senha</label>
                  <input
                    id="password"
                    name="password"
                    className="form-control"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="apartment_or_house" className="form-label">
                    Endereço (Rua e número) (opcional)
                  </label>
                  <input
                    id="apartment_or_house"
                    name="apartment_or_house"
                    className="form-control"
                    type="text"
                    value={formData.apartment_or_house}
                    onChange={handleChange}
                  />
                </div>

                <button
                  type="submit"
                  className="btn w-100"
                  style={{ backgroundColor: '#e3a927', color: 'white', border: 'none' }}
                  disabled={loading}
                >
                  {loading ? 'Cadastrando...' : 'Cadastrar'}
                </button>
              </form>

              <div className="text-center mt-3">
                <Link href="/login" className="text-decoration-none">
                  Já tem conta? Faça login
                </Link>
              </div>

              <div className="text-center mt-4 pt-3" style={{ borderTop: '1px solid #dee2e6' }}>
                <small className="text-muted">
                  Developed by{' '}
                  <a 
                    href="https://catenacom.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    style={{ color: '#e3a927', textDecoration: 'none' }}
                  >
                    Catenacom
                  </a>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
