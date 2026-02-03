'use client';

import { useAuth } from '@/contexts/AuthContext';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';
import { listNotifications, markNotificationAsRead, markAllNotificationsAsRead, getUnreadNotificationCount, Notification } from '@/lib/notifications';
import NetworkStatus from './NetworkStatus';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const mountedRef = useRef(true);
  const loadingNotificationsRef = useRef(false);

  // Carregar notificações
  useEffect(() => {
    mountedRef.current = true;
    
    // Carregar após 2s para não conflitar com AuthContext
    const initialTimeout = setTimeout(() => {
      if (mountedRef.current) loadNotifications();
    }, 2000);
    
    const interval = setInterval(() => {
      if (mountedRef.current) loadNotifications();
    }, 60000); // A cada 60s ao invés de 30s
    
    return () => {
      mountedRef.current = false;
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  async function loadNotifications() {
    // Prevenir múltiplas chamadas simultâneas
    if (loadingNotificationsRef.current || !mountedRef.current) return;
    
    loadingNotificationsRef.current = true;
    
    try {
      const [notifs, count] = await Promise.all([
        listNotifications().catch(() => []),
        getUnreadNotificationCount().catch(() => 0)
      ]);
      
      if (!mountedRef.current) return;
      
      setNotifications(Array.isArray(notifs) ? notifs.slice(0, 10) : []);
      setUnreadCount(typeof count === 'number' ? count : 0);
    } catch (error) {
      console.error('Erro ao carregar notificações:', error);
      if (mountedRef.current) {
        setNotifications([]);
        setUnreadCount(0);
      }
    } finally {
      loadingNotificationsRef.current = false;
    }
  }

  async function handleNotificationClick(notification: Notification) {
    try {
      if (!notification.read) {
        await markNotificationAsRead(notification.id);
        loadNotifications();
      }
      if (notification.link) {
        setShowNotifications(false);
        router.push(notification.link);
      }
    } catch (error) {
      console.error('Erro ao marcar notificação:', error);
    }
  }

  async function handleMarkAllAsRead() {
    try {
      await markAllNotificationsAsRead();
      loadNotifications();
    } catch (error) {
      console.error('Erro ao marcar todas como lidas:', error);
    }
  }

  function formatTimeAgo(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Agora';
    if (diffMins < 60) return `${diffMins}m atrás`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h atrás`;
    
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d atrás`;
    
    return date.toLocaleDateString('pt-BR');
  }

  useEffect(() => {
    const initMobileSidebar = () => {
      const sidebarHideBtn = document.getElementById('sidebar-hide');
      const body = document.body;

      if (!sidebarHideBtn) {
        console.warn('Menu hamburguer não encontrado');
        return;
      }

      const toggleSidebar = (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        body.classList.toggle('mob-sidebar-active');
      };

      // Remover listeners antigos se existirem
      sidebarHideBtn.replaceWith(sidebarHideBtn.cloneNode(true));
      const newSidebarBtn = document.getElementById('sidebar-hide');
      
      if (newSidebarBtn) {
        newSidebarBtn.addEventListener('click', toggleSidebar, { passive: false });
      }

      const sidebarLinks = document.querySelectorAll('.pc-sidebar .pc-link');
      const closeOnLinkClick = () => {
        if (window.innerWidth < 1024) {
          body.classList.remove('mob-sidebar-active');
        }
      };

      sidebarLinks.forEach(link => {
        link.addEventListener('click', closeOnLinkClick);
      });

      const closeOnOverlayClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (window.innerWidth < 1024 && 
            body.classList.contains('mob-sidebar-active') && 
            !target.closest('.pc-sidebar') && 
            !target.closest('#sidebar-hide')) {
          body.classList.remove('mob-sidebar-active');
        }
      };

      document.addEventListener('click', closeOnOverlayClick);

      return () => {
        if (newSidebarBtn) {
          newSidebarBtn.removeEventListener('click', toggleSidebar);
        }
        sidebarLinks.forEach(link => {
          link.removeEventListener('click', closeOnLinkClick);
        });
        document.removeEventListener('click', closeOnOverlayClick);
      };
    };

    // Tentar múltiplas vezes até encontrar o elemento
    let cleanupFn: (() => void) | undefined;
    let attempts = 0;
    const maxAttempts = 10;
    
    const tryInit = () => {
      const btn = document.getElementById('sidebar-hide');
      if (btn || attempts >= maxAttempts) {
        cleanupFn = initMobileSidebar();
      } else {
        attempts++;
        setTimeout(tryInit, 100);
      }
    };

    tryInit();

    return () => {
      if (cleanupFn) cleanupFn();
    };
  }, [pathname]);

  if (!user) return null;

  const isAdmin = user.role === 'admin';

  const adminMenuItems = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: 'ph-gauge' },
    { href: '/admin/ocorrencias', label: 'Ocorrências', icon: 'ph-warning' },
    { href: '/admin/ocorrencias/nova', label: 'Nova Ocorrência', icon: 'ph-plus-circle' },
    { href: '/admin/carretas', label: 'Carretas', icon: 'ph-truck' },
    { href: '/admin/tratores', label: 'Tratores', icon: 'ph-car' },
    { href: '/admin/motosserra', label: 'Motosserra', icon: 'ph-tree' },
    { href: '/admin/moradores', label: 'Moradores', icon: 'ph-users' },
    { href: '/admin/tipos-ocorrencia', label: 'Tipos de Ocorrência', icon: 'ph-list-bullets' },
    { href: '/admin/configuracoes', label: 'Configurações', icon: 'ph-gear' },
    { href: '/admin/logs', label: 'Logs do Sistema', icon: 'ph-file-text' },
  ];

  const moradoresMenuItems = [
    { href: '/morador/dashboard', label: 'Início', icon: 'ph-house' },
    { href: '/morador/nova-ocorrencia', label: 'Nova Ocorrência', icon: 'ph-plus-circle' },
    { href: '/morador/ocorrencias', label: 'Minhas Ocorrências', icon: 'ph-list' },
    { href: '/morador/carretas', label: 'Carretas', icon: 'ph-truck' },
    { href: '/morador/tratores', label: 'Tratores', icon: 'ph-car' },
    { href: '/morador/motosserra', label: 'Motosserra', icon: 'ph-tree' },
    { href: '/morador/perfil', label: 'Meu Perfil', icon: 'ph-user-circle' },
  ];

  const menuItems = isAdmin ? adminMenuItems : moradoresMenuItems;

  return (
    <>
      {/* Loader removido - causava conflito DOM com React durante navegação */}
      
      <nav className="pc-sidebar">
        <div className="navbar-wrapper">
          <div className="m-header" style={{ marginTop: 'max(env(safe-area-inset-top), 60px)', paddingBottom: '1rem' }}>
            <Link href={isAdmin ? '/admin/dashboard' : '/morador/dashboard'} className="b-brand text-primary">
              <img src="/logo.png" alt="Agreste Zeladoria" className="logo-lg" style={{ maxHeight: '40px' }} />
            </Link>
          </div>

          <div className="navbar-content">
            <ul className="pc-navbar">
              <li className="pc-item pc-caption">
                <label>Menu</label>
              </li>
              {menuItems.map((item) => (
                <li key={item.href} className="pc-item">
                  <a 
                    href={item.href}
                    className="pc-link"
                    onClick={(e) => {
                      e.preventDefault();
                      router.push(item.href);
                    }}
                  >
                    <span className="pc-micon">
                      <i className={`ph-duotone ${item.icon}`}></i>
                    </span>
                    <span className="pc-mtext">{item.label}</span>
                  </a>
                </li>
              ))}
              <li className="pc-item">
                <a href="#" onClick={(e) => { e.preventDefault(); logout(); }} className="pc-link">
                  <span className="pc-micon">
                    <i className="ph-duotone ph-sign-out"></i>
                  </span>
                  <span className="pc-mtext">Sair</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <header className="pc-header" style={{ background: '#1f2937', paddingTop: 'env(safe-area-inset-top, 40px)' }}>
        <div className="header-wrapper">
          <div className="me-auto pc-mob-drp">
            <ul className="list-unstyled d-flex align-items-center">
              <li className="pc-h-item pc-sidebar-collapse mobile-only">
                <a href="#" className="pc-head-link ms-0" id="sidebar-hide">
                  <i className="ti ti-menu-2" style={{ color: '#fff', fontSize: '24px' }}></i>
                </a>
              </li>
              <li className="pc-h-item ms-2 mobile-only">
                <Link href={isAdmin ? '/admin/dashboard' : '/morador/dashboard'} className="pc-head-link">
                  <img src="/logo.png" alt="Agreste" className="mobile-logo" />
                </Link>
              </li>
            </ul>
          </div>
          <div className="ms-auto">
            <ul className="list-unstyled">
              <li className="dropdown pc-h-item" style={{ position: 'relative' }}>
                <a
                  className="pc-head-link dropdown-toggle arrow-none me-0"
                  href="#"
                  role="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowNotifications(!showNotifications);
                  }}
                  style={{ position: 'relative' }}
                >
                  <i className="ph-duotone ph-bell" style={{ color: '#fff', fontSize: '20px' }}></i>
                  {unreadCount > 0 && (
                    <span 
                      className="badge bg-danger rounded-pill" 
                      style={{
                        position: 'absolute',
                        top: '-8px',
                        right: '-8px',
                        fontSize: '10px',
                        minWidth: '18px',
                        height: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0 5px',
                        zIndex: 10
                      }}
                    >
                      {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                  )}
                </a>
                {showNotifications && (
                  <div 
                    className="dropdown-menu dropdown-menu-end show" 
                    style={{
                      width: '350px',
                      maxHeight: '500px',
                      overflowY: 'auto',
                      position: 'absolute',
                      right: 0,
                      top: '100%',
                      marginTop: '0.5rem'
                    }}
                  >
                    <div className="dropdown-header d-flex align-items-center justify-content-between">
                      <h5 className="m-0">Notificações</h5>
                      {unreadCount > 0 && (
                        <span className="badge bg-primary">{unreadCount}</span>
                      )}
                    </div>
                    <div className="dropdown-divider"></div>
                    {unreadCount > 0 && (
                      <>
                        <div className="px-3 pb-2">
                          <button
                            onClick={handleMarkAllAsRead}
                            className="btn btn-sm btn-link text-decoration-none p-0"
                          >
                            Marcar todas como lidas
                          </button>
                        </div>
                        <div className="dropdown-divider"></div>
                      </>
                    )}
                    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                      {notifications.length === 0 ? (
                        <div className="text-center py-4 text-muted">
                          <i className="ph-duotone ph-bell-slash" style={{ fontSize: '48px' }}></i>
                          <p className="mb-0 mt-2">Nenhuma notificação</p>
                        </div>
                      ) : (
                        notifications.map((notif) => (
                          <a
                            key={notif.id}
                            href="#"
                            className="dropdown-item"
                            onClick={(e) => {
                              e.preventDefault();
                              handleNotificationClick(notif);
                            }}
                            style={{
                              backgroundColor: notif.read ? 'transparent' : '#f8f9fa',
                              borderLeft: notif.read ? 'none' : '3px solid #4680ff',
                              whiteSpace: 'normal',
                              padding: '12px 16px'
                            }}
                          >
                            <div className="d-flex align-items-start">
                              <div className="flex-shrink-0">
                                <i className="ph-duotone ph-info-circle" style={{ fontSize: '24px', color: '#4680ff' }}></i>
                              </div>
                              <div className="flex-grow-1 ms-2">
                                <h6 className="mb-1" style={{ fontSize: '13px', fontWeight: 600 }}>
                                  {notif.title}
                                </h6>
                                <p className="mb-1 text-muted" style={{ fontSize: '12px' }}>
                                  {notif.message}
                                </p>
                                <small className="text-muted" style={{ fontSize: '11px' }}>
                                  {formatTimeAgo(notif.created_at)}
                                </small>
                              </div>
                            </div>
                          </a>
                        ))
                      )}
                    </div>
                    {notifications.length > 0 && (
                      <>
                        <div className="dropdown-divider"></div>
                        <div className="text-center py-2">
                          <a
                            href={isAdmin ? '/admin/notificacoes' : '/morador/notificacoes'}
                            className="text-decoration-none"
                            onClick={() => setShowNotifications(false)}
                          >
                            Ver todas as notificações
                          </a>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </li>
              <li className="dropdown pc-h-item">
                <a
                  className="pc-head-link dropdown-toggle arrow-none me-0"
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="false"
                  aria-expanded="false"
                >
                  <i className="ph-duotone ph-user" style={{ color: '#fff' }}></i>
                </a>
                <div className="dropdown-menu dropdown-menu-end pc-h-dropdown">
                  <div className="dropdown-header d-flex align-items-center justify-content-between">
                    <h5 className="m-0">Perfil</h5>
                  </div>
                  <div className="dropdown-divider"></div>
                  <a href="#" className="dropdown-item">
                    <i className="ph-duotone ph-user"></i>
                    <span>{user.name}</span>
                  </a>
                  <a href="#" className="dropdown-item">
                    <i className="ph-duotone ph-envelope"></i>
                    <span>{user.email}</span>
                  </a>
                  <div className="dropdown-divider"></div>
                  <a href="#" onClick={(e) => { e.preventDefault(); logout(); }} className="dropdown-item">
                    <i className="ph-duotone ph-power"></i>
                    <span>Sair</span>
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <div className="pc-container">
        <div className="pc-content">
          {children}
        </div>
      </div>

      {/* Indicador de status de rede */}
      <NetworkStatus />
    </>
  );
}
