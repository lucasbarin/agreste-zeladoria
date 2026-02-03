import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.middleware';
import prisma from '../lib/prisma';

const router = Router();

/**
 * Registrar device token
 * POST /api/notifications/register-token
 */
router.post('/register-token', authMiddleware, async (req, res) => {
  try {
    const { deviceToken } = req.body;
    const userId = req.user!.userId;

    if (!deviceToken) {
      return res.status(400).json({ error: 'deviceToken é obrigatório' });
    }

    // Verificar se token já existe para outro usuário
    const existingToken = await prisma.deviceToken.findUnique({
      where: { token: deviceToken }
    });

    if (existingToken && existingToken.user_id !== userId) {
      // Token estava registrado para outro usuário - deletar e re-registrar
      await prisma.deviceToken.delete({
        where: { token: deviceToken }
      });
    }

    // Criar ou atualizar token
    const token = await prisma.deviceToken.upsert({
      where: { token: deviceToken },
      update: {
        user_id: userId,
        platform: req.body.platform || 'android'
      },
      create: {
        user_id: userId,
        token: deviceToken,
        platform: req.body.platform || 'android'
      }
    });

    console.log(`✅ Device token registrado para usuário ${userId}`);
    res.json({ message: 'Device token registrado com sucesso', tokenId: token.id });
  } catch (error) {
    console.error('Erro ao registrar device token:', error);
    res.status(500).json({ error: 'Erro interno ao registrar device token' });
  }
});

/**
 * Remover device token
 * POST /api/notifications/unregister-token
 */
router.post('/unregister-token', authMiddleware, async (req, res) => {
  try {
    const { deviceToken } = req.body;
    const userId = req.user!.userId;

    if (deviceToken) {
      // Remover token específico
      await prisma.deviceToken.deleteMany({
        where: {
          user_id: userId,
          token: deviceToken
        }
      });
    } else {
      // Remover todos os tokens do usuário
      await prisma.deviceToken.deleteMany({
        where: { user_id: userId }
      });
    }

    console.log(`🗑️ Device tokens removidos para usuário ${userId}`);
    res.json({ message: 'Device token removido com sucesso' });
  } catch (error) {
    console.error('Erro ao remover device token:', error);
    res.status(500).json({ error: 'Erro interno ao remover device token' });
  }
});

/**
 * Listar device tokens do usuário (admin)
 * GET /api/notifications/tokens
 */
router.get('/tokens', authMiddleware, async (req, res) => {
  try {
    const userId = req.user!.userId;

    const tokens = await prisma.deviceToken.findMany({
      where: { user_id: userId },
      select: {
        id: true,
        platform: true,
        created_at: true
      }
    });

    res.json({ tokens });
  } catch (error) {
    console.error('Erro ao listar tokens:', error);
    res.status(500).json({ error: 'Erro interno' });
  }
});

export default router;
