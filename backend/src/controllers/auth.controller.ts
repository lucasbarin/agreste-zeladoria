import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { UserRole } from '../types';

// Schemas de validação
const registerSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
  role: z.enum(['resident', 'admin']).default('resident'),
  whatsapp: z.string().optional(),
  apartment_or_house: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Senha é obrigatória'),
});

export class AuthController {
  // Registro de novo usuário
  static async register(req: Request, res: Response): Promise<void> {
    try {
      // Validar dados de entrada
      const data = registerSchema.parse(req.body);

      // Verificar se usuário já existe
      const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser) {
        res.status(400).json({ error: 'E-mail já cadastrado' });
        return;
      }

      // Hash da senha
      const password_hash = await bcrypt.hash(data.password, 10);

      // Criar usuário
      const user = await prisma.user.create({
        data: {
          name: data.name,
          email: data.email,
          password_hash,
          role: data.role,
          status: data.role === 'admin' ? 'ativo' : 'pendente', // Admin já ativo, morador pendente
          whatsapp: data.whatsapp,
          apartment_or_house: data.apartment_or_house,
        },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
          apartment_or_house: true,
          created_at: true,
        },
      });

      // Se usuário estiver pendente, retornar sem token
      if (user.status === 'pendente') {
        res.status(201).json({
          message: 'Cadastro realizado com sucesso! Aguarde a aprovação do administrador.',
          user: {
            name: user.name,
            email: user.email,
          },
          pendingApproval: true,
        });
        return;
      }

      // Gerar token JWT apenas para usuários ativos
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new Error('JWT_SECRET não configurado');
      }

      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          role: user.role,
        },
        secret,
        {
          expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as any,
        }
      );

      res.status(201).json({
        user,
        token,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          error: 'Dados inválidos',
          details: error.errors,
        });
        return;
      }
      console.error('Erro no registro:', error);
      res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  }

  // Login
  static async login(req: Request, res: Response): Promise<void> {
    try {
      // Validar dados de entrada
      const data = loginSchema.parse(req.body);

      // Buscar usuário
      const user = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (!user) {
        res.status(401).json({ error: 'E-mail ou senha inválidos' });
        return;
      }

      // Verificar senha
      const validPassword = await bcrypt.compare(
        data.password,
        user.password_hash
      );

      if (!validPassword) {
        res.status(401).json({ error: 'E-mail ou senha inválidos' });
        return;
      }

      // Verificar se usuário está ativo (exceto admin)
      if (user.role !== 'admin' && user.status !== 'ativo') {
        res.status(403).json({ 
          error: 'Usuário pendente de aprovação', 
          message: 'Sua conta está aguardando aprovação do administrador. Você receberá um e-mail quando for aprovada.'
        });
        return;
      }

      // Gerar token JWT
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new Error('JWT_SECRET não configurado');
      }

      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
          role: user.role,
        },
        secret,
        {
          expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as any,
        }
      );

      // Retornar usuário sem senha
      const { password_hash, ...userWithoutPassword } = user;

      res.json({
        user: userWithoutPassword,
        token,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          error: 'Dados inválidos',
          details: error.errors,
        });
        return;
      }
      console.error('Erro no login:', error);
      res.status(500).json({ error: 'Erro ao fazer login' });
    }
  }

  // Obter usuário atual (requer autenticação)
  static async me(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'Não autenticado' });
        return;
      }

      const user = await prisma.user.findUnique({
        where: { id: req.user.userId },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          apartment_or_house: true,
          created_at: true,
        },
      });

      if (!user) {
        res.status(404).json({ error: 'Usuário não encontrado' });
        return;
      }

      res.json({ user });
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  }
}
