import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Atualiza automaticamente solicitações para "concluido" quando a data agendada já passou
 * Não atualiza se o status for "pendente" ou "cancelado"
 */
export async function autoCompleteExpiredRequests() {
  try {
    const now = new Date();
    now.setHours(0, 0, 0, 0); // Início do dia atual

    // Auto-completar carretas
    const cartUpdated = await prisma.cartRequest.updateMany({
      where: {
        requested_date: {
          lt: now
        },
        status: {
          notIn: ['pendente', 'cancelado', 'concluido']
        }
      },
      data: {
        status: 'concluido'
      }
    });

    // Auto-completar tratores
    const tractorUpdated = await prisma.tractorRequest.updateMany({
      where: {
        requested_date: {
          lt: now
        },
        status: {
          notIn: ['pendente', 'cancelado', 'concluido']
        }
      },
      data: {
        status: 'concluido'
      }
    });

    // Auto-completar motosserra
    const chainsawUpdated = await prisma.chainsawRequest.updateMany({
      where: {
        requested_date: {
          lt: now
        },
        status: {
          notIn: ['pendente', 'cancelado', 'concluido']
        }
      },
      data: {
        status: 'concluido'
      }
    });

    const totalUpdated = cartUpdated.count + tractorUpdated.count + chainsawUpdated.count;

    if (totalUpdated > 0) {
      console.log(`✅ Auto-conclusão: ${totalUpdated} solicitações atualizadas (Carretas: ${cartUpdated.count}, Tratores: ${tractorUpdated.count}, Motosserra: ${chainsawUpdated.count})`);
    }

    return {
      cart: cartUpdated.count,
      tractor: tractorUpdated.count,
      chainsaw: chainsawUpdated.count,
      total: totalUpdated
    };
  } catch (error) {
    console.error('❌ Erro na auto-conclusão:', error);
    return null;
  }
}

/**
 * Inicia o processo automático de conclusão (executado a cada 1 hora)
 */
export function startAutoCompleteScheduler() {
  console.log('🕐 Agendador de auto-conclusão iniciado (intervalo: 1 hora)');
  
  // Executa a cada 1 hora (NÃO executa imediatamente para evitar timeout no cold start)
  setInterval(async () => {
    await autoCompleteExpiredRequests();
  }, 60 * 60 * 1000); // 1 hora
}
