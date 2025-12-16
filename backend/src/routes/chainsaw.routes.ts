import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, adminMiddleware } from '../middleware/auth.middleware';
import { createNotification } from '../utils/notifications';
import { createAuditLog } from '../utils/audit';

const router = Router();
const prisma = new PrismaClient();

// Listar solicitações de motosserra
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const where = user.role === 'admin' ? {} : { user_id: user.userId };

    const requests = await prisma.chainsawRequest.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            apartment_or_house: true
          }
        }
      },
      orderBy: { created_at: 'desc' }
    });

    res.json(requests);
  } catch (error) {
    console.error('Erro ao buscar solicitações:', error);
    res.status(500).json({ error: 'Erro ao buscar solicitações' });
  }
});

// Criar solicitação de motosserra
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { requested_date, description, user_id } = req.body;

    if (!requested_date || !description) {
      return res.status(400).json({ error: 'Data e descrição são obrigatórias' });
    }

    const targetUserId = user.role === 'admin' && user_id ? user_id : user.userId;

    // Criar solicitação
    const chainsawRequest = await prisma.chainsawRequest.create({
      data: {
        user_id: targetUserId,
        requested_date: new Date(requested_date),
        description,
        status: 'pendente'
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            apartment_or_house: true
          }
        }
      }
    });

    // Notificar morador se admin criou para ele
    if (user.role === 'admin' && user_id) {
      await createNotification(
        targetUserId,
        'chainsaw_requested',
        'Solicitação de Motosserra Criada',
        `Uma solicitação de motosserra foi criada para você. Visita agendada para ${new Date(requested_date).toLocaleDateString('pt-BR')}`,
        `/morador/motosserra/${chainsawRequest.id}`
      );
    }

    // Notificar administradores
    const admins = await prisma.user.findMany({
      where: { role: 'admin' },
      select: { id: true }
    });

    for (const admin of admins) {
      if (admin.id !== user.userId) {
        await createNotification(
          admin.id,
          'chainsaw_requested',
          'Nova Solicitação de Motosserra',
          `${chainsawRequest.user.name} solicitou motosserra - Visita em ${new Date(requested_date).toLocaleDateString('pt-BR')}`,
          `/admin/motosserra/${chainsawRequest.id}`
        );
      }
    }

    // Audit log
    await createAuditLog(
      user.userId,
      'create',
      'chainsaw_request',
      chainsawRequest.id,
      null,
      JSON.stringify(chainsawRequest),
      req.ip || '',
      req.get('user-agent') || ''
    );

    res.status(201).json(chainsawRequest);
  } catch (error: any) {
    console.error('Erro ao criar solicitação:', error);
    res.status(500).json({ error: error.message || 'Erro ao criar solicitação' });
  }
});

// Atualizar status/orçamento
router.put('/:id/status', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const { status, admin_notes, estimated_value, final_value } = req.body;

    if (!['em_andamento', 'cancelado', 'concluido'].includes(status)) {
      return res.status(400).json({ error: 'Status inválido' });
    }

    const chainsawRequest = await prisma.chainsawRequest.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    if (!chainsawRequest) {
      return res.status(404).json({ error: 'Solicitação não encontrada' });
    }

    const updateData: any = {
      status,
      admin_notes,
      approved_by: user.userId,
      approved_at: new Date()
    };

    if (estimated_value !== undefined) {
      updateData.estimated_value = estimated_value;
    }

    if (final_value !== undefined) {
      updateData.final_value = final_value;
    }

    const updated = await prisma.chainsawRequest.update({
      where: { id },
      data: updateData
    });

    // Notificar morador
    const notificationMessages: any = {
      em_andamento: `Sua solicitação de motosserra está em andamento. ${admin_notes || ''}`,
      cancelado: `Sua solicitação de motosserra foi cancelada. ${admin_notes || ''}`,
      concluido: `O serviço de motosserra foi concluído. ${admin_notes || ''}`
    };

    const notificationTitles: any = {
      em_andamento: 'Em Andamento',
      cancelado: 'Cancelada',
      concluido: 'Serviço Concluído'
    };

    await createNotification(
      chainsawRequest.user_id,
      `chainsaw_${status}`,
      notificationTitles[status],
      notificationMessages[status],
      `/morador/motosserra/${id}`
    );

    // Audit log
    await createAuditLog(
      user.userId,
      'update',
      'chainsaw_request',
      id,
      JSON.stringify(chainsawRequest),
      JSON.stringify(updated),
      req.ip || '',
      req.get('user-agent') || ''
    );

    res.json(updated);
  } catch (error) {
    console.error('Erro ao atualizar status:', error);
    res.status(500).json({ error: 'Erro ao atualizar status' });
  }
});

// Obter detalhes de uma solicitação
router.get('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;

    const chainsawRequest = await prisma.chainsawRequest.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            apartment_or_house: true
          }
        }
      }
    });

    if (!chainsawRequest) {
      return res.status(404).json({ error: 'Solicitação não encontrada' });
    }

    // Morador só pode ver suas próprias solicitações
    if (user.role !== 'admin' && chainsawRequest.user_id !== user.userId) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    res.json({ request: chainsawRequest });
  } catch (error) {
    console.error('Erro ao buscar solicitação:', error);
    res.status(500).json({ error: 'Erro ao buscar solicitação' });
  }
});

// Cancelar solicitação (morador pode cancelar se estiver pendente)
router.delete('/:id', authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;

    const chainsawRequest = await prisma.chainsawRequest.findUnique({
      where: { id }
    });

    if (!chainsawRequest) {
      return res.status(404).json({ error: 'Solicitação não encontrada' });
    }

    if (chainsawRequest.user_id !== user.userId) {
      return res.status(403).json({ error: 'Você só pode cancelar suas próprias solicitações' });
    }

    if (chainsawRequest.status !== 'pendente') {
      return res.status(400).json({ error: 'Apenas solicitações pendentes podem ser canceladas' });
    }

    const userData = await prisma.user.findUnique({
      where: { id: user.userId },
      select: { name: true, apartment_or_house: true }
    });

    await prisma.chainsawRequest.delete({
      where: { id }
    });

    // Notificar administradores sobre o cancelamento
    const admins = await prisma.user.findMany({
      where: { role: 'admin' },
      select: { id: true }
    });

    const dateStr = new Date(chainsawRequest.requested_date).toLocaleDateString('pt-BR');
    for (const admin of admins) {
      await createNotification(
        admin.id,
        'chainsaw_cancelled',
        'Solicitação de Motosserra Cancelada',
        `${userData?.name} (${userData?.apartment_or_house}) cancelou a solicitação de motosserra para ${dateStr}`,
        '/admin/motosserra'
      );
    }

    // Audit log
    await createAuditLog(
      user.userId,
      'delete',
      'chainsaw_request',
      id,
      JSON.stringify(chainsawRequest),
      null,
      req.ip || '',
      req.get('user-agent') || ''
    );

    res.json({ message: 'Solicitação cancelada com sucesso' });
  } catch (error) {
    console.error('Erro ao cancelar solicitação:', error);
    res.status(500).json({ error: 'Erro ao cancelar solicitação' });
  }
});

export default router;
