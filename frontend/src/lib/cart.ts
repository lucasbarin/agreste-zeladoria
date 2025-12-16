import api from './api';

export interface CartRequest {
  id: string;
  user_id: string;
  requested_date: string;
  status: 'pendente' | 'aprovado' | 'rejeitado' | 'concluido';
  admin_notes?: string;
  approved_by?: string;
  approved_at?: string;
  value: number;
  created_at: string;
  updated_at: string;
  user?: {
    name: string;
    email: string;
    apartment_or_house?: string;
  };
}

export interface CreateCartRequestData {
  requested_date: string;
}

export interface UpdateCartStatusData {
  status: 'aprovado' | 'rejeitado' | 'concluido';
  admin_notes?: string;
}

export async function listCartRequests(): Promise<CartRequest[]> {
  const response = await api.get<CartRequest[]>('/api/cart');
  return Array.isArray(response.data) ? response.data : [];
}

export async function createCartRequest(data: CreateCartRequestData): Promise<CartRequest> {
  try {
    const response = await api.post<CartRequest>('/api/cart', data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Erro ao criar solicitação');
  }
}

export async function getCartRequestById(id: string): Promise<CartRequest> {
  const response = await api.get<{ request: CartRequest }>(`/api/cart/${id}`);
  return response.data.request;
}

export async function updateCartStatus(id: string, data: UpdateCartStatusData): Promise<CartRequest> {
  try {
    const response = await api.put<{ request: CartRequest }>(`/api/cart/${id}/status`, data);
    return response.data.request;
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Erro ao atualizar status');
  }
}

export async function cancelCartRequest(id: string): Promise<void> {
  try {
    await api.delete(`/api/cart/${id}`);
  } catch (error: any) {
    throw new Error(error.response?.data?.error || 'Erro ao cancelar solicitação');
  }
}
