import api from './api';

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
