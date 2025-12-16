// Tipos de usuário
export type UserRole = 'resident' | 'admin';

export type UserStatus = 'pendente' | 'ativo' | 'inativo';

export type IssueType = 'poste_com_luz_queimada' | 'buraco_na_rua' | 'sujeira_ou_entulho';

export type IssueStatus = 'aberto' | 'em_andamento' | 'resolvido';

// Interface de Usuário
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status?: UserStatus;
  whatsapp?: string;
  apartment_or_house?: string;
  created_at: string;
}

// Interface de Ocorrência
export interface Issue {
  id: string;
  user_id: string;
  type: IssueType;
  description?: string;
  latitude: number;
  longitude: number;
  photo_url?: string;
  status: IssueStatus;
  created_at: string;
  updated_at: string;
  user?: User;
}

// Respostas da API
export interface AuthResponse {
  user: User;
  token: string;
}

export interface ApiError {
  error: string;
  details?: any;
}
