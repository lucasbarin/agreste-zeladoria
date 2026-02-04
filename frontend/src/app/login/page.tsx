'use client';

import { useState, useEffect, Suspense } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function LoginForm() {
  const { login } = useAuth();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (searchParams.get('registered') === 'true') {
      setSuccessMessage('Cadastro realizado com sucesso! Aguarde a aprovação do administrador para fazer login.');
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#e3a927', minHeight: '100vh' }}>
      <div className="container">
        <div className="row justify-content-center align-items-center" style={{ minHeight: '100vh', paddingTop: '2rem', paddingBottom: '2rem' }}>
          <div className="col-md-5">
          <div className="card shadow">
            <div className="card-body p-5">
              <div className="text-center mb-4">
                <img src="/logo.png" alt="Agreste Zeladoria" height="80" className="mb-3" />
                <h1 className="mb-2">Agreste Zeladoria</h1>
                <h6 className="text-muted">Faça login para continuar</h6>
              </div>

              {successMessage && (
                <div className="alert alert-success" role="alert">
                  {successMessage}
                </div>
              )}

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">E-mail</label>
                  <input
                    id="email"
                    className="form-control"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Senha</label>
                  <input
                    id="password"
                    className="form-control"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn w-100"
                  style={{ backgroundColor: '#e3a927', color: 'white', border: 'none' }}
                  disabled={loading}
                >
                  {loading ? 'Entrando...' : 'Entrar'}
                </button>
              </form>

              <div className="text-center mt-3">
                <Link href="/register" className="text-decoration-none">
                  Não tem conta? Cadastre-se
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

      {/* Scripts do Acorn */}
      <script src="/js/vendor/jquery-3.5.1.min.js" async />
      <script src="/js/vendor/bootstrap.bundle.min.js" async />
      <script src="/js/base/globals.js" async />
      <script src="/js/base/nav.js" async />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="container min-vh-100 d-flex align-items-center justify-content-center"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Carregando...</span></div></div>}>
      <LoginForm />
    </Suspense>
  );
}
