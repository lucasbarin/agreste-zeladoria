import express from 'express';
import cors from 'cors';
import path from 'path';

// Rotas
import authRoutes from './routes/auth.routes';
import issueRoutes from './routes/issue.routes';
import adminRoutes from './routes/admin.routes';
import profileRoutes from './routes/profile.routes';
import cartRoutes from './routes/cart.routes';
import tractorRoutes from './routes/tractor.routes';
import chainsawRoutes from './routes/chainsaw.routes';
import notificationRoutes from './routes/notifications.routes';
import settingsRoutes from './routes/settings.routes';

// Utilitários
import { startAutoCompleteScheduler } from './utils/autoComplete';

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos (uploads)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rota de health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Agreste Zeladoria API está rodando',
    timestamp: new Date().toISOString()
  });
});

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/issues', issueRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/tractor', tractorRoutes);
app.use('/api/chainsaw', chainsawRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/settings', settingsRoutes);

// Middleware de erro 404
app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

// Middleware de erro global
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Erro:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Erro interno do servidor'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  
  // Iniciar agendador de auto-conclusão
  startAutoCompleteScheduler();
});

export default app;
