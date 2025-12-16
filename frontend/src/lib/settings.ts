import api from './api';

export interface SystemSetting {
  id: string;
  key: string;
  value: string;
  description?: string;
  updated_at: string;
}

export async function listSettings(): Promise<SystemSetting[]> {
  const response = await api.get<{ settings: SystemSetting[] }>('/api/settings');
  return Array.isArray(response.data.settings) ? response.data.settings : [];
}

export async function getSetting(key: string): Promise<SystemSetting> {
  const response = await api.get<{ setting: SystemSetting }>(`/api/settings/${key}`);
  return response.data.setting;
}

export async function updateSetting(key: string, value: string): Promise<SystemSetting> {
  const response = await api.put<{ setting: SystemSetting }>(`/api/settings/${key}`, { value });
  return response.data.setting;
}
