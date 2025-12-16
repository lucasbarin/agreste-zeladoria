import api from './api';

export interface IssueType {
  id: string;
  code: string;
  name: string;
  description?: string;
  marker_color?: string;
  marker_icon?: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

export async function listIssueTypes(): Promise<IssueType[]> {
  try {
    const response = await api.get('/api/admin/issue-types');
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Erro ao buscar tipos:', error);
    return [];
  }
}

export function getIssueTypeColor(types: IssueType[], issueTypeCode: string): string {
  const type = types.find(t => t.code === issueTypeCode);
  return type?.marker_color || '#dc3545'; // Vermelho padrão
}

export function getIssueTypeIcon(types: IssueType[], issueTypeCode: string): string | undefined {
  const type = types.find(t => t.code === issueTypeCode);
  return type?.marker_icon;
}
