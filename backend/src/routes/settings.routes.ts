import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware, adminMiddleware } from '../middleware/auth.middleware';
import { createAuditLog } from '../utils/audit';
import { uploadAppIcon } from '../config/multer-app-icon';

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

// Inicializar configurações padrão (admin apenas)
router.post('/initialize', authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
  try {
    const defaultSettings = [
      { key: 'cart_price', value: '50.00', description: 'Valor cobrado pela solicitação de carreta (R$)' },
      { key: 'min_hours_advance', value: '24', description: 'Horas mínimas de antecedência para solicitar carreta' },
      { key: 'available_carts', value: '5', description: 'Número de carretas disponíveis' }
    ];

    const created = [];
    for (const setting of defaultSettings) {
      const existing = await prisma.systemSetting.findUnique({ where: { key: setting.key } });
      if (!existing) {
        const newSetting = await prisma.systemSetting.create({ data: setting });
        created.push(newSetting);
      }
    }

    res.json({ message: `${created.length} configurações inicializadas`, settings: created });
  } catch (error) {
    console.error('Erro ao inicializar configurações:', error);
    res.status(500).json({ error: 'Erro ao inicializar configurações' });
  }
});

// Upload de ícone do app
router.post('/app-icon', authMiddleware, adminMiddleware, uploadAppIcon.single('icon'), async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const file = req.file as any;

    if (!file) {
      return res.status(400).json({ error: 'Nenhum arquivo foi enviado' });
    }

    // URL do Cloudinary
    const iconUrl = file.path;

    // Salvar ou atualizar a configuração do ícone do app
    const existingSetting = await prisma.systemSetting.findUnique({
      where: { key: 'app_icon_url' }
    });

    let setting;
    if (existingSetting) {
      setting = await prisma.systemSetting.update({
        where: { key: 'app_icon_url' },
        data: { value: iconUrl }
      });

      // Audit log
      await createAuditLog(
        user.userId,
        'update',
        'system_setting',
        setting.id,
        JSON.stringify(existingSetting),
        JSON.stringify(setting),
        req.ip || '',
        req.get('user-agent') || ''
      );
    } else {
      setting = await prisma.systemSetting.create({
        data: {
          key: 'app_icon_url',
          value: iconUrl,
          description: 'URL do ícone do aplicativo para iOS e Android'
        }
      });

      // Audit log
      await createAuditLog(
        user.userId,
        'create',
        'system_setting',
        setting.id,
        null,
        JSON.stringify(setting),
        req.ip || '',
        req.get('user-agent') || ''
      );
    }

    res.json({ iconUrl });
  } catch (error) {
    console.error('Erro ao fazer upload do ícone:', error);
    res.status(500).json({ error: 'Erro ao fazer upload do ícone do app' });
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
