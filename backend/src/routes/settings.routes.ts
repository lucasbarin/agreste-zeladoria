import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, adminMiddleware } from '../middleware/auth.middleware';
import { createAuditLog } from '../utils/audit';

const router = Router();
const prisma = new PrismaClient();

// Obter todas as configurações
router.get('/', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
  try {
    const settings = await prisma.systemSetting.findMany({
      orderBy: { key: 'asc' }
    });
    
    res.json({ settings });
  } catch (error) {
    console.error('Erro ao buscar configurações:', error);
    res.status(500).json({ error: 'Erro ao buscar configurações' });
  }
});

// Obter configuração específica (pode ser público para valor da carreta)
router.get('/:key', async (req: Request, res: Response) => {
  try {
    const { key } = req.params;

    const setting = await prisma.systemSetting.findUnique({
      where: { key }
    });

    if (!setting) {
      return res.status(404).json({ error: 'Configuração não encontrada' });
    }

    res.json({ setting });
  } catch (error) {
    console.error('Erro ao buscar configuração:', error);
    res.status(500).json({ error: 'Erro ao buscar configuração' });
  }
});

// Atualizar configuração
router.put('/:key', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { key } = req.params;
    const { value } = req.body;

    const oldSetting = await prisma.systemSetting.findUnique({
      where: { key }
    });

    const setting = await prisma.systemSetting.update({
      where: { key },
      data: { value }
    });

    // Audit log
    await createAuditLog(
      user.userId,
      'update',
      'system_setting',
      setting.id,
      JSON.stringify(oldSetting),
      JSON.stringify(setting),
      req.ip || '',
      req.get('user-agent') || ''
    );

    res.json({ setting });
  } catch (error) {
    console.error('Erro ao atualizar configuração:', error);
    res.status(500).json({ error: 'Erro ao atualizar configuração' });
  }
});

export default router;
