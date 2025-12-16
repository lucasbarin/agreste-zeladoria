// Tipos customizados para a aplicação

export type UserRole = 'resident' | 'admin';

export type IssueType = 'poste_com_luz_queimada' | 'buraco_na_rua' | 'sujeira_ou_entulho';

export type IssueStatus = 'aberto' | 'em_andamento' | 'resolvido';

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export interface AuthRequest extends Express.Request {
  user?: JwtPayload;
}
