import { Request, Response } from 'express';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { IssueType, IssueStatus } from '../types';

// Schemas de validação
const createIssueSchema = z.object({
  type: z.enum(['poste_com_luz_queimada', 'buraco_na_rua', 'sujeira_ou_entulho']),
  description: z.string().optional(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  photo_url: z.string().optional(),
});

const updateStatusSchema = z.object({
  status: z.enum(['aberto', 'em_andamento', 'resolvido']),
});

export class IssueController {
  // Criar nova ocorrência
  static async create(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'Não autenticado' });
        return;
      }

      // Converter strings para números (quando vem de FormData)
      const bodyData = {
        ...req.body,
        latitude: parseFloat(req.body.latitude),
        longitude: parseFloat(req.body.longitude),
      };

      // Validar dados
      const data = createIssueSchema.parse(bodyData);

      // Criar ocorrência
      const issue = await prisma.issue.create({
        data: {
          user_id: req.user.userId,
          type: data.type,
          description: data.description,
          latitude: data.latitude,
          longitude: data.longitude,
          photo_url: data.photo_url,
          status: 'aberto',
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              apartment_or_house: true,
            },
          },
        },
      });

      // Notificar administradores sobre nova ocorrência
      const { notifyAdmins } = await import('../utils/notifications');
      const typeNames: Record<string, string> = {
        poste_com_luz_queimada: 'Poste com Luz Queimada',
        buraco_na_rua: 'Buraco na Rua',
        sujeira_ou_entulho: 'Sujeira ou Entulho'
      };
      await notifyAdmins(
        'issue_created',
        'Nova Ocorrência Reportada',
        `${issue.user.name} reportou: ${typeNames[issue.type] || issue.type}`,
        `/admin/ocorrencias/${issue.id}`
      );

      res.status(201).json({ issue });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          error: 'Dados inválidos',
          details: error.errors,
        });
        return;
      }
      console.error('Erro ao criar ocorrência:', error);
      res.status(500).json({ error: 'Erro ao criar ocorrência' });
    }
  }

  // Listar ocorrências
  static async list(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'Não autenticado' });
        return;
      }

      const { type, status, userId } = req.query;

      // Construir filtros
      const where: any = {};

      // Se não for admin, só mostra as próprias ocorrências
      if (req.user.role !== 'admin') {
        where.user_id = req.user.userId;
      } else if (userId) {
        // Admin pode filtrar por usuário específico
        where.user_id = userId as string;
      }

      if (type) {
        where.type = type as IssueType;
      }

      if (status) {
        where.status = status as IssueStatus;
      }

      const issues = await prisma.issue.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              apartment_or_house: true,
            },
          },
        },
        orderBy: {
          created_at: 'desc',
        },
      });

      res.json({ issues });
    } catch (error) {
      console.error('Erro ao listar ocorrências:', error);
      res.status(500).json({ error: 'Erro ao listar ocorrências' });
    }
  }

  // Obter detalhes de uma ocorrência
  static async getById(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'Não autenticado' });
        return;
      }

      const { id } = req.params;

      const issue = await prisma.issue.findUnique({
        where: { id },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              apartment_or_house: true,
            },
          },
        },
      });

      if (!issue) {
        res.status(404).json({ error: 'Ocorrência não encontrada' });
        return;
      }

      // Se não for admin, só pode ver suas próprias ocorrências
      if (req.user.role !== 'admin' && issue.user_id !== req.user.userId) {
        res.status(403).json({ error: 'Sem permissão para visualizar esta ocorrência' });
        return;
      }

      res.json({ issue });
    } catch (error) {
      console.error('Erro ao buscar ocorrência:', error);
      res.status(500).json({ error: 'Erro ao buscar ocorrência' });
    }
  }

  // Atualizar status da ocorrência (apenas admin)
  static async updateStatus(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'Não autenticado' });
        return;
      }

      if (req.user.role !== 'admin') {
        res.status(403).json({ error: 'Apenas administradores podem alterar o status' });
        return;
      }

      const { id } = req.params;
      const data = updateStatusSchema.parse(req.body);

      const issue = await prisma.issue.findUnique({
        where: { id },
      });

      if (!issue) {
        res.status(404).json({ error: 'Ocorrência não encontrada' });
        return;
      }

      const updatedIssue = await prisma.issue.update({
        where: { id },
        data: {
          status: data.status,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              apartment_or_house: true,
            },
          },
        },
      });

      // Notificar o morador sobre a mudança de status
      const { notifyIssueStatusChange } = await import('../utils/notifications');
      await notifyIssueStatusChange(
        updatedIssue.user_id,
        updatedIssue.id,
        issue.status,
        data.status
      );

      res.json({ issue: updatedIssue });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          error: 'Dados inválidos',
          details: error.errors,
        });
        return;
      }
      console.error('Erro ao atualizar status:', error);
      res.status(500).json({ error: 'Erro ao atualizar status' });
    }
  }

  // Deletar ocorrência (apenas o criador ou admin)
  static async delete(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'Não autenticado' });
        return;
      }

      const { id } = req.params;

      const issue = await prisma.issue.findUnique({
        where: { id },
      });

      if (!issue) {
        res.status(404).json({ error: 'Ocorrência não encontrada' });
        return;
      }

      // Apenas o criador ou admin pode deletar
      if (req.user.role !== 'admin' && issue.user_id !== req.user.userId) {
        res.status(403).json({ error: 'Sem permissão para deletar esta ocorrência' });
        return;
      }

      await prisma.issue.delete({
        where: { id },
      });

      res.json({ message: 'Ocorrência deletada com sucesso' });
    } catch (error) {
      console.error('Erro ao deletar ocorrência:', error);
      res.status(500).json({ error: 'Erro ao deletar ocorrência' });
    }
  }

  // Estatísticas (apenas admin)
  static async stats(req: Request, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'Não autenticado' });
        return;
      }

      if (req.user.role !== 'admin') {
        res.status(403).json({ error: 'Apenas administradores' });
        return;
      }

      const [total, abertos, emAndamento, resolvidos] = await Promise.all([
        prisma.issue.count(),
        prisma.issue.count({ where: { status: 'aberto' } }),
        prisma.issue.count({ where: { status: 'em_andamento' } }),
        prisma.issue.count({ where: { status: 'resolvido' } }),
      ]);

      const porTipo = await prisma.issue.groupBy({
        by: ['type'],
        _count: true,
      });

      res.json({
        stats: {
          total,
          por_status: {
            abertos,
            em_andamento: emAndamento,
            resolvidos,
          },
          por_tipo: porTipo.map((item) => ({
            tipo: item.type,
            quantidade: item._count,
          })),
        },
      });
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      res.status(500).json({ error: 'Erro ao buscar estatísticas' });
    }
  }
}
