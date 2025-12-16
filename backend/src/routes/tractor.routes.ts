import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, adminMiddleware } from '../middleware/auth.middleware';
import { createNotification } from '../utils/notifications';
import { createAuditLog } from '../utils/audit';

const router = Router();
const prisma = new PrismaClient();

// Listar solicitações de trator
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const where = user.role === 'admin' ? {} : { user_id: user.userId };

    const requests = await prisma.tractorRequest.findMany({
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

// Criar solicitação de trator
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { requested_date, hours_needed, description, user_id } = req.body;

    if (!requested_date || !hours_needed) {
      return res.status(400).json({ error: 'Data e quantidade de horas são obrigatórias' });
    }

    if (hours_needed < 1) {
      return res.status(400).json({ error: 'Quantidade de horas deve ser pelo menos 1' });
    }

    const targetUserId = user.role === 'admin' && user_id ? user_id : user.userId;

    // Obter valor por hora
    const priceSetting = await prisma.systemSetting.findUnique({
      where: { key: 'tractor_price_per_hour' }
    });

    const pricePerHour = parseFloat(priceSetting?.value || '150.00');
    const totalValue = pricePerHour * hours_needed;

    // Criar solicitação
    const tractorRequest = await prisma.tractorRequest.create({
      data: {
        user_id: targetUserId,
        requested_date: new Date(requested_date),
        hours_needed,
        description,
        value_per_hour: pricePerHour,
        total_value: totalValue,
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
        'tractor_requested',
        'Solicitação de Trator Criada',
        `Uma solicitação de trator foi criada para você no dia ${new Date(requested_date).toLocaleDateString('pt-BR')} - ${hours_needed}h`,
        `/morador/tratores/${tractorRequest.id}`
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
          'tractor_requested',
          'Nova Solicitação de Trator',
          `${tractorRequest.user.name} solicitou trator para ${new Date(requested_date).toLocaleDateString('pt-BR')} - ${hours_needed}h`,
          `/admin/tratores/${tractorRequest.id}`
        );
      }
    }

    // Audit log
    await createAuditLog(
      user.userId,
      'create',
      'tractor_request',
      tractorRequest.id,
      null,
      JSON.stringify(tractorRequest),
      req.ip || '',
      req.get('user-agent') || ''
    );

    res.status(201).json(tractorRequest);
  } catch (error: any) {
    console.error('Erro ao criar solicitação:', error);
    res.status(500).json({ error: error.message || 'Erro ao criar solicitação' });
  }
});

// Atualizar status
router.put('/:id/status', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const { status, admin_notes } = req.body;

    if (!['aprovado', 'rejeitado', 'concluido'].includes(status)) {
      return res.status(400).json({ error: 'Status inválido' });
    }

    const tractorRequest = await prisma.tractorRequest.findUnique({
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

    if (!tractorRequest) {
      return res.status(404).json({ error: 'Solicitação não encontrada' });
    }

    const updated = await prisma.tractorRequest.update({
      where: { id },
      data: {
        status,
        admin_notes,
        approved_by: user.userId,
        approved_at: new Date()
      }
    });

    // Notificar morador
    const notificationMessages: any = {
      aprovado: `Sua solicitação de trator para ${new Date(tractorRequest.requested_date).toLocaleDateString('pt-BR')} foi aprovada e está agendada.`,
      rejeitado: `Sua solicitação de trator foi rejeitada. ${admin_notes || ''}`,
      concluido: `O serviço de trator foi concluído.`
    };

    await createNotification(
      tractorRequest.user_id,
      `tractor_${status}`,
      `Solicitação de Trator ${status === 'aprovado' ? 'Aprovada' : status === 'rejeitado' ? 'Rejeitada' : 'Concluída'}`,
      notificationMessages[status],
      `/morador/tratores/${id}`
    );

    // Audit log
    await createAuditLog(
      user.userId,
      'update',
      'tractor_request',
      id,
      JSON.stringify(tractorRequest),
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

    const tractorRequest = await prisma.tractorRequest.findUnique({
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

    if (!tractorRequest) {
      return res.status(404).json({ error: 'Solicitação não encontrada' });
    }

    // Morador só pode ver suas próprias solicitações
    if (user.role !== 'admin' && tractorRequest.user_id !== user.userId) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    res.json({ request: tractorRequest });
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

    const tractorRequest = await prisma.tractorRequest.findUnique({
      where: { id }
    });

    if (!tractorRequest) {
      return res.status(404).json({ error: 'Solicitação não encontrada' });
    }

    if (tractorRequest.user_id !== user.userId) {
      return res.status(403).json({ error: 'Você só pode cancelar suas próprias solicitações' });
    }

    if (tractorRequest.status !== 'pendente') {
      return res.status(400).json({ error: 'Apenas solicitações pendentes podem ser canceladas' });
    }

    const userData = await prisma.user.findUnique({
      where: { id: user.userId },
      select: { name: true, apartment_or_house: true }
    });

    await prisma.tractorRequest.delete({
      where: { id }
    });

    // Notificar administradores sobre o cancelamento
    const admins = await prisma.user.findMany({
      where: { role: 'admin' },
      select: { id: true }
    });

    const dateStr = new Date(tractorRequest.requested_date).toLocaleDateString('pt-BR');
    for (const admin of admins) {
      await createNotification(
        admin.id,
        'tractor_cancelled',
        'Solicitação de Trator Cancelada',
        `${userData?.name} (${userData?.apartment_or_house}) cancelou a solicitação de trator para ${dateStr}`,
        '/admin/tratores'
      );
    }

    // Audit log
    await createAuditLog(
      user.userId,
      'delete',
      'tractor_request',
      id,
      JSON.stringify(tractorRequest),
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
