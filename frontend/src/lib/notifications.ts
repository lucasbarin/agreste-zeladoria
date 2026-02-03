import api from './api';
import { PushNotifications, Token, PushNotificationSchema, ActionPerformed } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  link?: string;
  read: boolean;
  created_at: string;
}

// Serviço de Push Notifications (Firebase/APNs)
export const pushNotificationService = {
  // Inicializar notificações push
  async initialize() {
    // Verificar se está em plataforma nativa (não funciona em web)
    if (!Capacitor.isNativePlatform()) {
      console.log('Push notifications não disponível em web');
      return;
    }

    try {
      // Solicitar permissão
      let permStatus = await PushNotifications.checkPermissions();

      if (permStatus.receive === 'prompt') {
        permStatus = await PushNotifications.requestPermissions();
      }

      if (permStatus.receive !== 'granted') {
        console.log('Permissão de notificação negada');
        return;
      }

      // Registrar para receber notificações
      await PushNotifications.register();
      console.log('Push notifications registrado');

      // Listeners
      this.setupListeners();
    } catch (error) {
      console.error('Erro ao inicializar push notifications:', error);
    }
  },

  // Configurar listeners de notificações
  setupListeners() {
    // Quando receber o device token
    PushNotifications.addListener('registration', async (token: Token) => {
      console.log('Device token recebido:', token.value);
      
      // Salvar token no localStorage para usar no login
      localStorage.setItem('deviceToken', token.value);
      
      // Se já estiver logado, enviar token para o backend
      const authToken = localStorage.getItem('token');
      if (authToken) {
        await this.registerDeviceToken(token.value);
      }
    });

    // Erro ao registrar
    PushNotifications.addListener('registrationError', (error: any) => {
      console.error('Erro no registro de push:', error);
    });

    // Quando receber uma notificação (app em foreground)
    PushNotifications.addListener('pushNotificationReceived', (notification: PushNotificationSchema) => {
      console.log('Notificação recebida:', notification);
      
      // Aqui você pode exibir uma notificação local ou atualizar a UI
      // Exemplo: mostrar um toast ou atualizar lista de ocorrências
    });

    // Quando o usuário clicar na notificação
    PushNotifications.addListener('pushNotificationActionPerformed', (notification: ActionPerformed) => {
      console.log('Notificação clicada:', notification);
      
      // Navegar para tela específica baseado nos dados da notificação
      const data = notification.notification.data;
      
      if (data.type === 'issue_status_changed') {
        // Redirecionar para detalhes da ocorrência
        window.location.href = `/morador/ocorrencias/${data.issueId}`;
      } else if (data.type === 'cart_status_changed') {
        // Redirecionar para solicitações
        window.location.href = `/morador/solicitacoes`;
      }
    });
  },

  // Registrar device token no backend
  async registerDeviceToken(deviceToken: string) {
    try {
      await api.post('/api/notifications/register-token', { deviceToken });
      console.log('Device token registrado no backend');
    } catch (error) {
      console.error('Erro ao registrar device token:', error);
    }
  },

  // Remover device token (usado no logout)
  async unregisterDeviceToken() {
    try {
      const deviceToken = localStorage.getItem('deviceToken');
      if (deviceToken) {
        await api.post('/api/notifications/unregister-token', { deviceToken });
        localStorage.removeItem('deviceToken');
        console.log('Device token removido');
      }
    } catch (error) {
      console.error('Erro ao remover device token:', error);
    }
  },

  // Obter device token atual
  getDeviceToken(): string | null {
    return localStorage.getItem('deviceToken');
  },
};

// Funções de notificações in-app (banco de dados)

export async function listNotifications(unreadOnly = false): Promise<Notification[]> {
  const url = unreadOnly ? '/api/notifications?unread_only=true' : '/api/notifications';
  const response = await api.get(url);
  
  // Backend pode retornar { notifications: [...] } ou diretamente [...]
  const data = response.data;
  if (data && typeof data === 'object' && 'notifications' in data) {
    return Array.isArray(data.notifications) ? data.notifications : [];
  }
  return Array.isArray(data) ? data : [];
}

export async function markNotificationAsRead(id: string): Promise<void> {
  await api.put(`/api/notifications/${id}/read`);
}

export async function markAllNotificationsAsRead(): Promise<void> {
  await api.put('/api/notifications/read-all');
}

export async function getUnreadNotificationCount(): Promise<number> {
  const response = await api.get<{ count: number }>('/api/notifications/unread-count');
  return typeof response.data.count === 'number' ? response.data.count : 0;
}
