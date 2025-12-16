'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

const ApexChart = dynamic(() => import('@/components/ApexChart'), { ssr: false });

interface Stats {
  totalIssues: number;
  openIssues: number;
  inProgressIssues: number;
  resolvedIssues: number;
  totalUsers: number;
  issuesByType: Array<{ type: string; count: number }>;
  issuesByMonth: Array<{ month: string; count: number }>;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      fetchStats();
    }
  }, [mounted]);

  const fetchStats = async () => {
    if (!mounted) return;
    try {
      const response = await api.get('/api/admin/stats');
      setStats(response.data);
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
    } finally {
      setLoading(false);
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

  if (!stats) {
    return (
      <div className="alert alert-danger">
        Erro ao carregar estatísticas
      </div>
    );
  }

  // Preparar dados para os gráficos
  const issuesByTypeData = {
    categories: stats.issuesByType.map(item => {
      const typeNames: any = {
        'poste_com_luz_queimada': 'Poste c/ Luz Queimada',
        'buraco_na_rua': 'Buraco na Rua',
        'sujeira_ou_entulho': 'Sujeira/Entulho'
      };
      return typeNames[item.type] || item.type;
    }),
    series: [{
      name: 'Ocorrências',
      data: stats.issuesByType.map(item => Number(item.count))
    }]
  };

  const issuesByMonthData = {
    categories: stats.issuesByMonth.map(item => {
      const [year, month] = item.month.split('-');
      const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      return `${monthNames[parseInt(month) - 1]}/${year}`;
    }).reverse(),
    series: [{
      name: 'Ocorrências',
      data: stats.issuesByMonth.map(item => Number(item.count)).reverse()
    }]
  };

  const issuesByStatusData = {
    categories: ['Abertas', 'Em Andamento', 'Resolvidas'],
    series: [{
      name: 'Ocorrências',
      data: [stats.openIssues, stats.inProgressIssues, stats.resolvedIssues]
    }]
  };

  return (
    <>
      {/* Header */}
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className="page-header-title">
                <h2 className="mb-0">Dashboard</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cards de Estatísticas */}
      <div className="row">
        {/* Total de Ocorrências */}
        <div className="col-md-6 col-xl-3">
          <div className="card bg-primary-dark">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="avtar avtar-lg bg-light-primary">
                    <i className="ph-duotone ph-warning-circle f-26"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="mb-0 text-white">Total de Ocorrências</h6>
                  <h2 className="mb-0 text-white">{stats.totalIssues}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ocorrências Abertas */}
        <div className="col-md-6 col-xl-3">
          <div className="card bg-warning-dark">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="avtar avtar-lg bg-light-warning">
                    <i className="ph-duotone ph-clock f-26"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="mb-0 text-white">Abertas</h6>
                  <h2 className="mb-0 text-white">{stats.openIssues}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Em Andamento */}
        <div className="col-md-6 col-xl-3">
          <div className="card bg-info-dark">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="avtar avtar-lg bg-light-info">
                    <i className="ph-duotone ph-gear f-26"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="mb-0 text-white">Em Andamento</h6>
                  <h2 className="mb-0 text-white">{stats.inProgressIssues}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resolvidas */}
        <div className="col-md-6 col-xl-3">
          <div className="card bg-success-dark">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0">
                  <div className="avtar avtar-lg bg-light-success">
                    <i className="ph-duotone ph-check-circle f-26"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="mb-0 text-white">Resolvidas</h6>
                  <h2 className="mb-0 text-white">{stats.resolvedIssues}</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="row">
        {/* Ocorrências por Mês */}
        <div className="col-md-6 col-xl-6">
          <div className="card">
            <div className="card-header">
              <h5>Ocorrências por Mês</h5>
            </div>
            <div className="card-body">
              <ApexChart
                type="area"
                data={issuesByMonthData}
                height={350}
              />
            </div>
          </div>
        </div>

        {/* Ocorrências por Tipo */}
        <div className="col-md-6 col-xl-6">
          <div className="card">
            <div className="card-header">
              <h5>Ocorrências por Tipo</h5>
            </div>
            <div className="card-body">
              <ApexChart
                type="donut"
                data={issuesByTypeData}
                height={350}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* Ocorrências por Status */}
        <div className="col-md-6 col-xl-6">
          <div className="card">
            <div className="card-header">
              <h5>Ocorrências por Status</h5>
            </div>
            <div className="card-body">
              <ApexChart
                type="bar"
                data={issuesByStatusData}
                height={350}
              />
            </div>
          </div>
        </div>

        {/* Card de Informações */}
        <div className="col-md-6 col-xl-6">
          <div className="card">
            <div className="card-header">
              <h5>Informações do Sistema</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <div className="avtar avtar-lg bg-light-primary">
                      <i className="ph-duotone ph-users f-24"></i>
                    </div>
                    <div className="ms-3">
                      <p className="text-muted mb-0">Total de Moradores</p>
                      <h4 className="mb-0">{stats.totalUsers}</h4>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="d-flex align-items-center">
                    <div className="avtar avtar-lg bg-light-success">
                      <i className="ph-duotone ph-check f-24"></i>
                    </div>
                    <div className="ms-3">
                      <p className="text-muted mb-0">Taxa de Resolução</p>
                      <h4 className="mb-0">
                        {stats.totalIssues > 0 
                          ? Math.round((stats.resolvedIssues / stats.totalIssues) * 100) 
                          : 0}%
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
