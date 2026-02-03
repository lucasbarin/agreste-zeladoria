import { messaging, isFirebaseEnabled } from '../lib/firebase';
import prisma from '../lib/prisma';

/**
 * Envia notificação push para um usuário específico
 */
export async function sendPushNotification(
  userId: string,
  title: string,
  body: string,
  data?: Record<string, string>
): Promise<void> {
  if (!isFirebaseEnabled || !messaging) {
    console.log('Push notifications desabilitado - Firebase não configurado');
    return;
  }

  try {
    // Buscar device tokens do usuário
    const deviceTokens = await prisma.deviceToken.findMany({
      where: { user_id: userId }
    });

    if (deviceTokens.length === 0) {
      console.log(`Usuário ${userId} não tem device tokens registrados`);
      return;
    }

    // Preparar mensagens para todos os dispositivos
    const messages = deviceTokens.map(dt => ({
      notification: {
        title,
        body
      },
      data: data || {},
      token: dt.token
    }));

    // Enviar notificações
    const response = await messaging.sendEach(messages);
    
    console.log(`📲 ${response.successCount}/${messages.length} notificações enviadas para usuário ${userId}`);
    
    // Remover tokens inválidos (se houver falhas)
    if (response.failureCount > 0) {
      const invalidTokens: string[] = [];
      response.responses.forEach((resp, idx) => {
        if (!resp.success && resp.error?.code === 'messaging/registration-token-not-registered') {
          invalidTokens.push(deviceTokens[idx].token);
        }
      });
      
      if (invalidTokens.length > 0) {
        await prisma.deviceToken.deleteMany({
          where: { token: { in: invalidTokens } }
        });
        console.log(`🗑️ ${invalidTokens.length} tokens inválidos removidos`);
      }
    }
  } catch (error) {
    console.error('❌ Erro ao enviar push notification:', error);
  }
}

/**
 * Envia notificação push para múltiplos usuários
 */
export async function sendBulkPushNotification(
  userIds: string[],
  title: string,
  body: string,
  data?: Record<string, string>
): Promise<void> {
  for (const userId of userIds) {
    await sendPushNotification(userId, title, body, data);
  }
}
