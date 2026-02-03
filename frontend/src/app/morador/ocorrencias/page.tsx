'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { issueService } from '@/lib/issues';
import { Issue } from '@/types';
import Link from 'next/link';

const ISSUE_TYPE_LABELS = {
  poste_com_luz_queimada: 'Poste com Luz Queimada',
  buraco_na_rua: 'Buraco na Rua',
  sujeira_ou_entulho: 'Sujeira ou Entulho',
};

const STATUS_LABELS = {
  aberto: 'Aberto',
  em_andamento: 'Em Andamento',
  resolvido: 'Resolvido',
};

const STATUS_BADGES = {
  aberto: 'danger',
  em_andamento: 'warning',
  resolvido: 'success',
};

export default function OcorrenciasPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [issues, setIssues] = useState<Issue[]>([]);
  const [loadingIssues, setLoadingIssues] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadIssues();
    }
  }, [user]);

  const loadIssues = async () => {
    try {
      setLoadingIssues(true);
      const data = await issueService.list();
      setIssues(data);
    } catch (err: any) {
      setError('Erro ao carregar ocorrências');
    } finally {
      setLoadingIssues(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="text-center py-5">
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
                <h5 className="m-b-10">Minhas Ocorrências</h5>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">Home</li>
                <li className="breadcrumb-item">Ocorrências</li>
              </ul>
            </div>
            <div className="col-md-12 mt-2">
              <Link href="/morador/nova-ocorrencia" className="btn btn-primary btn-sm">
                <i className="ph-duotone ph-plus me-2"></i>
                Nova Ocorrência
              </Link>
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

          {loadingIssues ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Carregando...</span>
              </div>
            </div>
          ) : issues.length === 0 ? (
            <div className="card text-center py-5">
              <div className="card-body">
                <h5>Nenhuma ocorrência cadastrada</h5>
                <p className="text-muted">Clique em "Nova Ocorrência" para reportar um problema</p>
              </div>
            </div>
          ) : (
            <div className="row">
              {issues.map((issue) => (
                <div key={issue.id} className="col-md-6 col-lg-4 mb-4">
                  <div className="card h-100">
                    {issue.photo_url && (
                      <img
                        src={issue.photo_url.startsWith('http') ? issue.photo_url : `${process.env.NEXT_PUBLIC_API_URL}${issue.photo_url}`}
                        className="card-img-top"
                        alt="Foto da ocorrência"
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                    )}
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <h5 className="card-title mb-0">
                          {ISSUE_TYPE_LABELS[issue.type]}
                        </h5>
                        <span className={`badge bg-${STATUS_BADGES[issue.status]}`}>
                          {STATUS_LABELS[issue.status]}
                        </span>
                      </div>
                      {issue.description && (
                        <p className="card-text text-muted small">
                          {issue.description.substring(0, 100)}
                          {issue.description.length > 100 && '...'}
                        </p>
                      )}
                      <p className="card-text">
                        <small className="text-muted">
                          {new Date(issue.created_at).toLocaleDateString('pt-BR')}
                        </small>
                      </p>
                    </div>
                    <div className="card-footer bg-transparent">
                      <Link
                        href={`/morador/ocorrencias/${issue.id}`}
                        className="btn btn-sm btn-outline-primary w-100"
                      >
                        Ver Detalhes
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
