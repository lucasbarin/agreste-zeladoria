'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { listNotifications, markNotificationAsRead, markAllNotificationsAsRead, Notification } from '@/lib/notifications';

export default function NotificacoesPage() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'todas' | 'nao_lidas'>('todas');

  useEffect(() => {
    loadNotifications();
  }, [filter]);

  async function loadNotifications() {
    try {
      setLoading(true);
      const data = await listNotifications(filter === 'nao_lidas');
      setNotifications(data);
    } catch (error) {
      console.error('Erro ao carregar notificações:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleMarkAsRead(id: string) {
    try {
      await markNotificationAsRead(id);
      loadNotifications();
    } catch (error) {
      console.error('Erro ao marcar notificação:', error);
    }
  }

  async function handleMarkAllAsRead() {
    try {
      await markAllNotificationsAsRead();
      alert('Todas as notificações foram marcadas como lidas');
      loadNotifications();
    } catch (error) {
      console.error('Erro ao marcar todas como lidas:', error);
    }
  }

  function handleNotificationClick(notification: Notification) {
    if (!notification.read) {
      handleMarkAsRead(notification.id);
    }
    if (notification.link) {
      router.push(notification.link);
    }
  }

  function formatDateTime(dateString: string) {
    return new Date(dateString).toLocaleString('pt-BR');
  }

  function getTypeLabel(type: string) {
    const labels: Record<string, string> = {
      issue_created: 'Ocorrência Criada',
      issue_status_changed: 'Status de Ocorrência',
      cart_requested: 'Solicitação de Carreta',
      cart_approved: 'Carreta Aprovada',
      cart_rejected: 'Carreta Rejeitada',
      cart_completed: 'Carreta Concluída'
    };
    return labels[type] || type;
  }

  function getTypeIcon(type: string) {
    const icons: Record<string, string> = {
      issue_created: 'ph-warning text-warning',
      issue_status_changed: 'ph-info text-info',
      cart_requested: 'ph-truck text-primary',
      cart_approved: 'ph-check-circle text-success',
      cart_rejected: 'ph-x-circle text-danger',
      cart_completed: 'ph-check text-success'
    };
    return icons[type] || 'ph-bell text-secondary';
  }

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <div className="page-header">
        <div className="page-block">
          <div className="row align-items-center">
            <div className="col-md-12">
              <div className="page-header-title">
                <h5 className="m-b-10">Notificações</h5>
              </div>
              <ul className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/morador/dashboard">Dashboard</a>
                </li>
                <li className="breadcrumb-item">Notificações</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header">
              <h5>Centro de Notificações</h5>
              {unreadCount > 0 && (
                <div className="card-header-right">
                  <button
                    onClick={handleMarkAllAsRead}
                    className="btn btn-sm btn-primary"
                  >
                    <i className="feather icon-check me-2"></i>
                    Marcar todas como lidas
                  </button>
                </div>
              )}
            </div>
            <div className="card-body">
              <div className="mb-3 d-flex justify-content-between align-items-center">
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    className={`btn ${filter === 'todas' ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setFilter('todas')}
                  >
                    Todas ({notifications.length})
                  </button>
                  <button
                    type="button"
                    className={`btn ${filter === 'nao_lidas' ? 'btn-warning' : 'btn-outline-warning'}`}
                    onClick={() => setFilter('nao_lidas')}
                  >
                    Não Lidas ({unreadCount})
                  </button>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Carregando...</span>
                  </div>
                </div>
              ) : notifications.length === 0 ? (
                <div className="text-center py-5">
                  <i className="ph-duotone ph-bell-slash" style={{ fontSize: '64px', color: '#ccc' }}></i>
                  <p className="text-muted mt-3">
                    {filter === 'nao_lidas' ? 'Nenhuma notificação não lida' : 'Nenhuma notificação encontrada'}
                  </p>
                </div>
              ) : (
                <div className="list-group">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`list-group-item list-group-item-action ${!notification.read ? 'list-group-item-light' : ''}`}
                      style={{
                        cursor: notification.link ? 'pointer' : 'default',
                        borderLeft: !notification.read ? '4px solid #4680ff' : '4px solid transparent'
                      }}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="d-flex w-100 align-items-start">
                        <div className="flex-shrink-0 me-3">
                          <i 
                            className={`ph-duotone ${getTypeIcon(notification.type)}`}
                            style={{ fontSize: '32px' }}
                          ></i>
                        </div>
                        <div className="flex-grow-1">
                          <div className="d-flex w-100 justify-content-between align-items-start mb-1">
                            <h6 className="mb-0">
                              {notification.title}
                              {!notification.read && (
                                <span className="badge bg-primary ms-2">Nova</span>
                              )}
                            </h6>
                            <small className="text-muted">{formatDateTime(notification.created_at)}</small>
                          </div>
                          <p className="mb-1">{notification.message}</p>
                          <div className="d-flex justify-content-between align-items-center">
                            <small className="text-muted">
                              <span className="badge bg-light text-dark">{getTypeLabel(notification.type)}</span>
                            </small>
                            {!notification.read && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMarkAsRead(notification.id);
                                }}
                                className="btn btn-sm btn-link text-decoration-none p-0"
                              >
                                Marcar como lida
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
