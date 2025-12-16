import api from './api';
import { Issue, IssueType, IssueStatus } from '@/types';

export const issueService = {
  // Criar nova ocorrência
  async create(data: {
    type: IssueType;
    description?: string;
    latitude: number;
    longitude: number;
    photo?: File;
  }): Promise<Issue> {
    const formData = new FormData();
    formData.append('type', data.type);
    formData.append('latitude', data.latitude.toString());
    formData.append('longitude', data.longitude.toString());
    
    if (data.description) {
      formData.append('description', data.description);
    }
    
    if (data.photo) {
      formData.append('photo', data.photo);
    }

    const response = await api.post<{ issue: Issue }>('/api/issues', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data.issue;
  },

  // Listar ocorrências
  async list(filters?: {
    type?: IssueType;
    status?: IssueStatus;
    userId?: string;
  }): Promise<Issue[]> {
    const params = new URLSearchParams();
    
    if (filters?.type) params.append('type', filters.type);
    if (filters?.status) params.append('status', filters.status);
    if (filters?.userId) params.append('userId', filters.userId);

    const response = await api.get<{ issues: Issue[] }>(
      `/api/issues?${params.toString()}`
    );
    
    return Array.isArray(response.data?.issues) ? response.data.issues : [];
  },

  // Obter detalhes de uma ocorrência
  async getById(id: string): Promise<Issue> {
    const response = await api.get<{ issue: Issue }>(`/api/issues/${id}`);
    return response.data.issue;
  },

  // Atualizar status (apenas admin)
  async updateStatus(id: string, status: IssueStatus): Promise<Issue> {
    const response = await api.patch<{ issue: Issue }>(
      `/api/issues/${id}/status`,
      { status }
    );
    return response.data.issue;
  },

  // Deletar ocorrência
  async delete(id: string): Promise<void> {
    await api.delete(`/api/issues/${id}`);
  },

  // Obter estatísticas (apenas admin)
  async getStats(): Promise<any> {
    const response = await api.get('/api/issues/stats/dashboard');
    return response.data.stats;
  },
};
