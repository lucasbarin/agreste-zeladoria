import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const prisma = new PrismaClient();

// Obter notificações do usuário
router.get('/', authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { unread_only } = req.query;

    const where: any = { user_id: user.userId };
    
    if (unread_only === 'true') {
      where.read = false;
    }

    const notifications = await prisma.notification.findMany({
      where,
      orderBy: { created_at: 'desc' },
      take: 50 // Últimas 50 notificações
    });

    res.json({ notifications });
  } catch (error) {
    console.error('Erro ao buscar notificações:', error);
    res.status(500).json({ error: 'Erro ao buscar notificações' });
  }
});

// Marcar notificação como lida
router.put('/:id/read', authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { id } = req.params;

    const notification = await prisma.notification.findUnique({
      where: { id }
    });

    if (!notification) {
      return res.status(404).json({ error: 'Notificação não encontrada' });
    }

    if (notification.user_id !== user.userId) {
      return res.status(403).json({ error: 'Acesso negado' });
    }

    const updated = await prisma.notification.update({
      where: { id },
      data: { read: true }
    });

    res.json(updated);
  } catch (error) {
    console.error('Erro ao marcar notificação:', error);
    res.status(500).json({ error: 'Erro ao marcar notificação' });
  }
});

// Marcar todas como lidas
router.put('/read-all', authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    await prisma.notification.updateMany({
      where: {
        user_id: user.userId,
        read: false
      },
      data: { read: true }
    });

    res.json({ message: 'Todas as notificações foram marcadas como lidas' });
  } catch (error) {
    console.error('Erro ao marcar notificações:', error);
    res.status(500).json({ error: 'Erro ao marcar notificações' });
  }
});

// Contar notificações não lidas
router.get('/unread-count', authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const count = await prisma.notification.count({
      where: {
        user_id: user.userId,
        read: false
      }
    });

    res.json({ count });
  } catch (error) {
    console.error('Erro ao contar notificações:', error);
    res.status(500).json({ error: 'Erro ao contar notificações' });
  }
});

export default router;
