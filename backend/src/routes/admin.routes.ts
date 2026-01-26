import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { authMiddleware } from '../middleware/auth.middleware';
import { upload } from '../config/multer';
import { createNotification } from '../utils/notifications';

const router = Router();
const prisma = new PrismaClient();

// Aplicar autenticação em todas as rotas
router.use(authMiddleware);

// Middleware para verificar se é admin
const isAdmin = (req: any, res: any, next: any) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Acesso negado' });
  }
  next();
};

// Função para criar log de auditoria
async function createAuditLog(
  userId: string | undefined,
  action: string,
  entityType: string,
  entityId: string | undefined,
  oldData: any = null,
  newData: any = null,
  ipAddress: string | undefined = undefined,
  userAgent: string | undefined = undefined
) {
  await prisma.auditLog.create({
    data: {
      user_id: userId,
      action,
      entity_type: entityType,
      entity_id: entityId,
      old_data: oldData ? JSON.stringify(oldData) : null,
      new_data: newData ? JSON.stringify(newData) : null,
      ip_address: ipAddress,
      user_agent: userAgent
    }
  });
}

// ========== USUÁRIOS ==========

// Listar todos os usuários
router.get('/users', isAdmin, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        whatsapp: true,
        apartment_or_house: true,
        created_at: true,
        _count: {
          select: { issues: true }
        }
      },
      orderBy: { created_at: 'desc' }
    });

    res.json(users);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

// Obter detalhes de um usuário
router.get('/users/:id', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        whatsapp: true,
        apartment_or_house: true,
        created_at: true,
        _count: {
          select: { issues: true }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
});

// Criar novo usuário
router.post('/users', isAdmin, async (req, res) => {
  try {
    const { name, email, password, role, whatsapp, apartment_or_house } = req.body;

    // Validações
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Nome, email e senha são obrigatórios' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Senha deve ter no mínimo 6 caracteres' });
    }

    // Verificar se email já existe
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    // Criar usuário
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password_hash: hashedPassword,
        role: role || 'resident',
        status: 'ativo', // Admin cria usuário já ativo
        whatsapp,
        apartment_or_house
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        whatsapp: true,
        apartment_or_house: true,
        created_at: true
      }
    });

    await createAuditLog(
      (req.user as any)?.id || req.user?.userId,
      'create',
      'user',
      newUser.id,
      null,
      { name, email, role: role || 'resident', apartment_or_house },
      req.ip,
      req.get('user-agent')
    );

    res.status(201).json(newUser);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

// Atualizar usuário
router.put('/users/:id', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, status, whatsapp, apartment_or_house } = req.body;

    const oldUser = await prisma.user.findUnique({ where: { id } });
    
    if (!oldUser) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, email, role, status, whatsapp, apartment_or_house },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        whatsapp: true,
        apartment_or_house: true
      }
    });

    await createAuditLog(
      (req.user as any)?.id || req.user?.userId,
      'update',
      'user',
      id,
      { name: oldUser.name, email: oldUser.email, role: oldUser.role, status: oldUser.status, whatsapp: oldUser.whatsapp, apartment_or_house: oldUser.apartment_or_house },
      { name, email, role, status, whatsapp, apartment_or_house },
      req.ip,
      req.get('user-agent')
    );

    res.json(updatedUser);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

// Atualizar status do usuário (aprovar/rejeitar/desativar)
router.patch('/users/:id/status', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['ativo', 'inativo', 'pendente'].includes(status)) {
      return res.status(400).json({ error: 'Status inválido. Use: ativo, inativo ou pendente' });
    }

    const oldUser = await prisma.user.findUnique({ where: { id } });
    if (!oldUser) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { status },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        apartment_or_house: true
      }
    });

    await createAuditLog(
      (req.user as any)?.id || req.user?.userId,
      'update',
      'user_status',
      id,
      { status: oldUser.status },
      { status },
      req.ip,
      req.get('user-agent')
    );

    // Notificar usuário se foi aprovado
    if (status === 'ativo' && oldUser.status === 'pendente') {
      await createNotification(
        id,
        'account_approved',
        'Conta Aprovada',
        'Sua conta foi aprovada! Você já pode acessar o sistema.',
        '/morador/dashboard'
      );
    }

    res.json(updatedUser);
  } catch (error) {
    console.error('Erro ao atualizar status do usuário:', error);
    res.status(500).json({ error: 'Erro ao atualizar status do usuário' });
  }
});

// Redefinir senha de usuário
router.post('/users/:id/reset-password', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ error: 'Senha deve ter no mínimo 6 caracteres' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    await prisma.user.update({
      where: { id },
      data: { password_hash: hashedPassword }
    });

    await createAuditLog(
      (req.user as any)?.id || req.user?.userId,
      'update',
      'user',
      id,
      null,
      { action: 'password_reset' },
      req.ip,
      req.get('user-agent')
    );

    res.json({ message: 'Senha redefinida com sucesso' });
  } catch (error) {
    console.error('Erro ao redefinir senha:', error);
    res.status(500).json({ error: 'Erro ao redefinir senha' });
  }
});

// ========== TIPOS DE OCORRÊNCIA ==========

// Listar tipos de ocorrência
router.get('/issue-types', isAdmin, async (req, res) => {
  try {
    const types = await prisma.issueType.findMany({
      orderBy: { name: 'asc' }
    });
    res.json(types);
  } catch (error) {
    console.error('Erro ao buscar tipos:', error);
    res.status(500).json({ error: 'Erro ao buscar tipos' });
  }
});

// Criar tipo de ocorrência
router.post('/issue-types', isAdmin, async (req, res) => {
  try {
    const { code, name, description, marker_color, marker_icon, active } = req.body;

    const type = await prisma.issueType.create({
      data: { 
        code, 
        name, 
        description, 
        marker_color: marker_color || '#dc3545',
        marker_icon,
        active: active ?? true 
      }
    });

    await createAuditLog(
      (req.user as any)?.id || req.user?.userId,
      'create',
      'issue_type',
      type.id,
      null,
      { code, name, description, marker_color, marker_icon, active },
      req.ip,
      req.get('user-agent')
    );

    res.status(201).json(type);
  } catch (error) {
    console.error('Erro ao criar tipo:', error);
    res.status(500).json({ error: 'Erro ao criar tipo' });
  }
});

// Atualizar tipo de ocorrência
router.put('/issue-types/:id', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { code, name, description, marker_color, marker_icon, active } = req.body;

    const oldType = await prisma.issueType.findUnique({ where: { id } });
    
    if (!oldType) {
      return res.status(404).json({ error: 'Tipo não encontrado' });
    }

    const type = await prisma.issueType.update({
      where: { id },
      data: { code, name, description, marker_color, marker_icon, active }
    });

    await createAuditLog(
      (req.user as any)?.id || req.user?.userId,
      'update',
      'issue_type',
      id,
      oldType,
      { code, name, description, marker_color, marker_icon, active },
      req.ip,
      req.get('user-agent')
    );

    res.json(type);
  } catch (error) {
    console.error('Erro ao atualizar tipo:', error);
    res.status(500).json({ error: 'Erro ao atualizar tipo' });
  }
});

// Excluir tipo de ocorrência
router.delete('/issue-types/:id', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const type = await prisma.issueType.findUnique({ where: { id } });
    
    if (!type) {
      return res.status(404).json({ error: 'Tipo não encontrado' });
    }

    await prisma.issueType.delete({ where: { id } });

    await createAuditLog(
      (req.user as any)?.id || req.user?.userId,
      'delete',
      'issue_type',
      id,
      type,
      null,
      req.ip,
      req.get('user-agent')
    );

    res.json({ message: 'Tipo excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir tipo:', error);
    res.status(500).json({ error: 'Erro ao excluir tipo' });
  }
});

// ========== OCORRÊNCIAS (Admin) ==========

// Excluir ocorrência (com log)
router.delete('/issues/:id', isAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    const issue = await prisma.issue.findUnique({ where: { id } });
    
    if (!issue) {
      return res.status(404).json({ error: 'Ocorrência não encontrada' });
    }

    await prisma.issue.delete({ where: { id } });

    await createAuditLog(
      (req.user as any)?.id || req.user?.userId,
      'delete',
      'issue',
      id,
      issue,
      null,
      req.ip,
      req.get('user-agent')
    );

    res.json({ message: 'Ocorrência excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir ocorrência:', error);
    res.status(500).json({ error: 'Erro ao excluir ocorrência' });
  }
});

// ========== LOGS DE AUDITORIA ==========

// Listar logs
router.get('/logs', isAdmin, async (req, res) => {
  try {
    const { page = '1', limit = '50', action, entityType } = req.query;
    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const where: any = {};
    if (action) where.action = action;
    if (entityType) where.entity_type = entityType;

    const [logs, total] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        orderBy: { created_at: 'desc' },
        skip,
        take: parseInt(limit as string)
      }),
      prisma.auditLog.count({ where })
    ]);

    res.json({
      logs,
      total,
      page: parseInt(page as string),
      totalPages: Math.ceil(total / parseInt(limit as string))
    });
  } catch (error) {
    console.error('Erro ao buscar logs:', error);
    res.status(500).json({ error: 'Erro ao buscar logs' });
  }
});

// ========== ESTATÍSTICAS ==========

// Dashboard stats
router.get('/stats', isAdmin, async (req, res) => {
  try {
    const [
      totalIssues,
      openIssues,
      inProgressIssues,
      resolvedIssues,
      totalUsers,
      issuesByType,
      issuesByMonth
    ] = await Promise.all([
      prisma.issue.count(),
      prisma.issue.count({ where: { status: 'aberto' } }),
      prisma.issue.count({ where: { status: 'em_andamento' } }),
      prisma.issue.count({ where: { status: 'resolvido' } }),
      prisma.user.count({ where: { role: 'resident' } }),
      prisma.$queryRaw`
        SELECT type, COUNT(*) as count
        FROM issues
        GROUP BY type
        ORDER BY count DESC
      `,
      prisma.$queryRaw`
        SELECT 
          strftime('%Y-%m', created_at) as month,
          COUNT(*) as count
        FROM issues
        GROUP BY month
        ORDER BY month DESC
        LIMIT 12
      `
    ]);

    res.json({
      totalIssues,
      openIssues,
      inProgressIssues,
      resolvedIssues,
      totalUsers,
      issuesByType,
      issuesByMonth
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    res.status(500).json({ error: 'Erro ao buscar estatísticas' });
  }
});

// ========== OCORRÊNCIAS (ADMIN) ==========

// Criar ocorrência como admin (com user_id opcional)
router.post('/issues', isAdmin, upload.single('photo'), async (req, res) => {
  try {
    const { user_id, type, description, latitude, longitude } = req.body;
    
    // Validar tipo de ocorrência
    const issueType = await prisma.issueType.findUnique({
      where: { code: type }
    });

    if (!issueType) {
      return res.status(400).json({ error: 'Tipo de ocorrência inválido' });
    }

    // Se user_id for fornecido, validar que o usuário existe
    if (user_id) {
      const user = await prisma.user.findUnique({ where: { id: user_id } });
      if (!user) {
        return res.status(400).json({ error: 'Usuário não encontrado' });
      }
    }

    // Upload de foto se houver
    let photo_url = null;
    if (req.file) {
      photo_url = `/uploads/issues/${req.file.filename}`;
    }

    // Criar ocorrência (se não tiver user_id, usa o ID do admin)
    const issue = await prisma.issue.create({
      data: {
        user_id: user_id || req.user!.userId, // Admin como responsável se não especificado
        type,
        description: description || null,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        photo_url,
        status: 'aberto'
      },
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

    // Log de auditoria
    await createAuditLog(
      req.user?.userId,
      'create',
      'issue',
      issue.id,
      null,
      { type, user_id, latitude, longitude, description },
      req.ip,
      req.get('user-agent')
    );

    // Notificar o morador se foi especificado
    if (user_id && user_id !== req.user.userId) {
      await createNotification(
        user_id,
        'issue_created_by_admin',
        'Ocorrência Registrada',
        `A gestão registrou uma ocorrência no seu nome: ${issueType.name}`,
        `/morador/ocorrencias/${issue.id}`
      );
    }

    res.status(201).json({ issue });
  } catch (error) {
    console.error('Erro ao criar ocorrência:', error);
    res.status(500).json({ error: 'Erro ao criar ocorrência' });
  }
});

export default router;
