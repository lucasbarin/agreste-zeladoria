import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { authMiddleware } from '../middleware/auth.middleware';
import { uploadProfile } from '../config/multer-profile';

const router = Router();
const prisma = new PrismaClient();

// Aplicar autenticação em todas as rotas
router.use(authMiddleware);

// Obter perfil do usuário logado
router.get('/', async (req, res) => {
  try {
    const userId = (req as any).user.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        whatsapp: true,
        apartment_or_house: true,
        photo_url: true,
        created_at: true
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res.status(500).json({ error: 'Erro ao buscar perfil' });
  }
});

// Atualizar dados do perfil
router.put('/', async (req, res) => {
  try {
    const userId = (req as any).user.userId;
    const { name, email, whatsapp, apartment_or_house } = req.body;

    // Verificar se o email já está em uso por outro usuário
    if (email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email,
          NOT: { id: userId }
        }
      });

      if (existingUser) {
        return res.status(400).json({ error: 'Email já está em uso' });
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name: name || undefined,
        email: email || undefined,
        whatsapp: whatsapp || undefined,
        apartment_or_house: apartment_or_house || undefined
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        whatsapp: true,
        apartment_or_house: true,
        photo_url: true
      }
    });

    res.json(updatedUser);
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({ error: 'Erro ao atualizar perfil' });
  }
});

// Atualizar senha
router.put('/password', async (req, res) => {
  try {
    const userId = (req as any).user.userId;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Senha atual e nova senha são obrigatórias' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'Nova senha deve ter no mínimo 6 caracteres' });
    }

    // Verificar senha atual
    const user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password_hash);

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Senha atual incorreta' });
    }

    // Atualizar senha
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password_hash: hashedPassword }
    });

    res.json({ message: 'Senha atualizada com sucesso' });
  } catch (error) {
    console.error('Erro ao atualizar senha:', error);
    res.status(500).json({ error: 'Erro ao atualizar senha' });
  }
});

// Upload de foto de perfil
router.post('/photo', uploadProfile.single('photo'), async (req, res) => {
  try {
    const userId = (req as any).user.userId;

    if (!req.file) {
      return res.status(400).json({ error: 'Nenhuma imagem enviada' });
    }

    // Cloudinary retorna a URL em req.file.path
    const photoUrl = (req.file as any).path;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { photo_url: photoUrl },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        apartment_or_house: true,
        photo_url: true
      }
    });

    res.json(updatedUser);
  } catch (error) {
    console.error('Erro ao fazer upload da foto:', error);
    res.status(500).json({ error: 'Erro ao fazer upload da foto' });
  }
});

// Deletar foto de perfil
router.delete('/photo', async (req, res) => {
  try {
    const userId = (req as any).user.userId;

    // Apenas remove a URL do banco, foto fica no Cloudinary
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { photo_url: null },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        apartment_or_house: true,
        photo_url: true
      }
    });

    res.json(updatedUser);
  } catch (error) {
    console.error('Erro ao deletar foto:', error);
    res.status(500).json({ error: 'Erro ao deletar foto' });
  }
});

export default router;
