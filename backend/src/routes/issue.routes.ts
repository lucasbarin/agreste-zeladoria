import { Router } from 'express';
import { IssueController } from '../controllers/issue.controller';
import { authMiddleware, adminMiddleware } from '../middleware/auth.middleware';
import { upload } from '../config/multer';

const router = Router();

// Todas as rotas requerem autenticação
router.use(authMiddleware);

// Criar nova ocorrência (com upload de foto opcional)
router.post('/', upload.single('photo'), async (req, res) => {
  // Se houver arquivo, adicionar URL do Cloudinary ao body
  if (req.file) {
    req.body.photo_url = (req.file as any).path; // Cloudinary retorna a URL em 'path'
  }
  await IssueController.create(req, res);
});

// Listar ocorrências (morador vê só as suas, admin vê todas)
router.get('/', IssueController.list);

// Obter detalhes de uma ocorrência
router.get('/:id', IssueController.getById);

// Atualizar status (apenas admin)
router.patch('/:id/status', adminMiddleware, IssueController.updateStatus);

// Deletar ocorrência (criador ou admin)
router.delete('/:id', IssueController.delete);

// Estatísticas (apenas admin)
router.get('/stats/dashboard', adminMiddleware, IssueController.stats);

export default router;
