import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, adminMiddleware } from '../middleware/auth.middleware';
import { createNotification } from '../utils/notifications';
import { createAuditLog } from '../utils/audit';

const router = Router();
const prisma = new PrismaClient();

// Obter todas as solicitações (admin) ou apenas do usuário (morador)
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const where = user.role === 'admin' ? {} : { user_id: user.userId };

    const requests = await prisma.cartRequest.findMany({
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

// Criar nova solicitação de carreta (admin pode criar para outro usuário)
router.post('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { requested_date, user_id } = req.body;
    
    // Se user_id for fornecido, admin está criando para outro usuário
    const targetUserId = user.role === 'admin' && user_id ? user_id : user.userId;

    const requestedDate = new Date(requested_date);

    // Validar se é sábado ou domingo
    const dayOfWeek = requestedDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return res.status(400).json({ 
        error: 'Não é possível agendar carretas aos sábados e domingos' 
      });
    }

    // Verificar se usuário já tem agendamento ativo (não concluído)
    const activeRequest = await prisma.cartRequest.findFirst({
      where: {
        user_id: targetUserId,
        status: {
          in: ['pendente', 'aprovado']
        }
      }
    });

    if (activeRequest) {
      return res.status(400).json({ 
        error: 'Este morador já possui um agendamento ativo. Aguarde a conclusão para fazer um novo.' 
      });
    }

    // Validar data mínima
    const minHoursSetting = await prisma.systemSetting.findUnique({
      where: { key: 'min_hours_advance' }
    });

    const minHours = parseInt(minHoursSetting?.value || '24');
    const minDate = new Date();
    minDate.setHours(minDate.getHours() + minHours);

    if (requestedDate < minDate) {
      return res.status(400).json({ 
        error: `A data deve ser com pelo menos ${minHours} horas de antecedência` 
      });
    }

    // Verificar disponibilidade de carretas para a data
    const startOfDay = new Date(requestedDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(requestedDate);
    endOfDay.setHours(23, 59, 59, 999);

    const [availableCartsSetting, approvedRequests] = await Promise.all([
      prisma.systemSetting.findUnique({ where: { key: 'available_carts' } }),
      prisma.cartRequest.count({
        where: {
          requested_date: {
            gte: startOfDay,
            lt: endOfDay
          },
          status: 'aprovado'
        }
      })
    ]);

    const availableCarts = parseInt(availableCartsSetting?.value || '2');
    
    if (approvedRequests >= availableCarts) {
      return res.status(400).json({ 
        error: `Não há carretas disponíveis para esta data. Todas as ${availableCarts} carretas já estão reservadas.` 
      });
    }

    // Obter valor da carreta
    const priceSetting = await prisma.systemSetting.findUnique({
      where: { key: 'cart_price' }
    });

    const price = parseFloat(priceSetting?.value || '50.00');

    // Criar solicitação
    const cartRequest = await prisma.cartRequest.create({
      data: {
        user_id: targetUserId,
        requested_date: requestedDate,
        value: price,
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

    // Se admin criou para outro usuário, notificar o morador
    if (user.role === 'admin' && user_id) {
      await createNotification(
        targetUserId,
        'cart_requested',
        'Solicitação de Carreta Criada',
        `Uma solicitação de carreta foi criada para você no dia ${new Date(requested_date).toLocaleDateString('pt-BR')}`,
        `/morador/carretas/${cartRequest.id}`
      );
    }

    // Notificar administradores
    const admins = await prisma.user.findMany({
      where: { role: 'admin' },
      select: { id: true }
    });

    for (const admin of admins) {
      // Não notificar o próprio admin que criou
      if (admin.id !== user.userId) {
        await createNotification(
          admin.id,
          'cart_requested',
          'Nova Solicitação de Carreta',
          `${cartRequest.user.name} solicitou carreta para ${new Date(requested_date).toLocaleDateString('pt-BR')}`,
          `/admin/carretas/${cartRequest.id}`
        );
      }
    }

    // Audit log
    await createAuditLog(
      user.userId,
      'create',
      'cart_request',
      cartRequest.id,
      null,
      JSON.stringify(cartRequest),
      req.ip || '',
      req.get('user-agent') || ''
    );

    res.status(201).json(cartRequest);
  } catch (error: any) {
    console.error('Erro ao criar solicitação:', error);
    console.error('Stack:', error.stack);
    res.status(500).json({ error: error.message || 'Erro ao criar solicitação' });
  }
});

// Aprovar/Rejeitar solicitação (admin apenas)
router.put('/:id/status', authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;
    const { status, admin_notes } = req.body;

    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    if (!['aprovado', 'rejeitado', 'concluido'].includes(status)) {
      return res.status(400).json({ error: 'Status inválido' });
    }

    const cartRequest = await prisma.cartRequest.findUnique({
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

    if (!cartRequest) {
      return res.status(404).json({ error: 'Solicitação não encontrada' });
    }

    const updated = await prisma.cartRequest.update({
      where: { id },
      data: {
        status,
        admin_notes,
        approved_by: user.userId,
        approved_at: new Date()
      },
      include: {
        user: {
          select: {
            name: true,
            apartment_or_house: true
          }
        }
      }
    });

    // Notificar morador
    const notificationTitles = {
      aprovado: 'Solicitação de Carreta Aprovada',
      rejeitado: 'Solicitação de Carreta Rejeitada',
      concluido: 'Carreta Concluída'
    };

    const notificationMessages = {
      aprovado: `Sua solicitação de carreta foi aprovada!`,
      rejeitado: `Sua solicitação de carreta foi rejeitada. ${admin_notes || ''}`,
      concluido: `Sua carreta foi concluída.`
    };

    await createNotification(
      cartRequest.user_id,
      `cart_${status}`,
      notificationTitles[status as keyof typeof notificationTitles],
      notificationMessages[status as keyof typeof notificationMessages],
      `/morador/carretas/${id}`
    );

    // Audit log
    await createAuditLog(
      user.userId,
      'update',
      'cart_request',
      id,
      JSON.stringify(cartRequest),
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

    const cartRequest = await prisma.cartRequest.findUnique({
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

    if (!cartRequest) {
      return res.status(404).json({ error: 'Solicitação não encontrada' });
    }

    // Morador só pode ver suas próprias solicitações
    if (user.role !== 'admin' && cartRequest.user_id !== user.userId) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    res.json({ request: cartRequest });
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

    const cartRequest = await prisma.cartRequest.findUnique({
      where: { id }
    });

    if (!cartRequest) {
      return res.status(404).json({ error: 'Solicitação não encontrada' });
    }

    // Verificar se é o próprio morador
    if (cartRequest.user_id !== user.userId) {
      return res.status(403).json({ error: 'Você só pode cancelar suas próprias solicitações' });
    }

    // Verificar se está pendente
    if (cartRequest.status !== 'pendente') {
      return res.status(400).json({ error: 'Apenas solicitações pendentes podem ser canceladas' });
    }

    // Obter dados do usuário para notificação
    const userData = await prisma.user.findUnique({
      where: { id: user.userId },
      select: { name: true, apartment_or_house: true }
    });

    // Deletar a solicitação
    await prisma.cartRequest.delete({
      where: { id }
    });

    // Notificar administradores sobre o cancelamento
    const admins = await prisma.user.findMany({
      where: { role: 'admin' },
      select: { id: true }
    });

    const dateStr = new Date(cartRequest.requested_date).toLocaleDateString('pt-BR');
    for (const admin of admins) {
      await createNotification(
        admin.id,
        'cart_cancelled',
        'Solicitação de Carreta Cancelada',
        `${userData?.name} (${userData?.apartment_or_house}) cancelou a solicitação de carreta para ${dateStr}`,
        '/admin/carretas'
      );
    }

    // Audit log
    await createAuditLog(
      user.userId,
      'delete',
      'cart_request',
      id,
      JSON.stringify(cartRequest),
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
