import { PrismaClient } from '@prisma/client';
import { sendPushNotification } from '../services/pushNotification.service';

const prisma = new PrismaClient();

/**
 * Criar notificação para um usuário
 */
export async function createNotification(
  userId: string,
  type: string,
  title: string,
  message: string,
  link?: string
) {
  try {
    return await prisma.notification.create({
      data: {
        user_id: userId,
        type,
        title,
        message,
        link
      }
    });
  } catch (error) {
    console.error('Erro ao criar notificação:', error);
    throw error;
  }
}

/**
 * Notificar todos os administradores
 */
export async function notifyAdmins(
  type: string,
  title: string,
  message: string,
  link?: string
) {
  try {
    const admins = await prisma.user.findMany({
      where: { role: 'admin' },
      select: { id: true }
    });

    const notifications = admins.map(admin =>
      createNotification(admin.id, type, title, message, link)
    );

    return await Promise.all(notifications);
  } catch (error) {
    console.error('Erro ao notificar admins:', error);
    throw error;
  }
}

/**
 * Notificar usuário específico sobre mudança de status de ocorrência
 */
export async function notifyIssueStatusChange(
  userId: string,
  issueId: string,
  oldStatus: string,
  newStatus: string
) {
  const statusNames: Record<string, string> = {
    aberto: 'Aberto',
    em_andamento: 'Em Andamento',
    resolvido: 'Resolvido'
  };

  const title = 'Status da Ocorrência Atualizado';
  const message = `Sua ocorrência mudou de "${statusNames[oldStatus]}" para "${statusNames[newStatus]}"`;
  
  // Criar notificação in-app (banco de dados)
  await createNotification(
    userId,
    'issue_status_changed',
    title,
    message,
    `/morador/ocorrencias/${issueId}`
  );
  
  // Enviar push notification
  await sendPushNotification(
    userId,
    title,
    message,
    {
      type: 'issue_status_changed',
      issueId: issueId,
      status: newStatus
    }
  );
}
