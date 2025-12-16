import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createAuditLog(
  userId: string | undefined,
  action: string,
  entityType: string,
  entityId: string | undefined,
  oldData: any = null,
  newData: any = null,
  ipAddress: string | undefined = undefined,
  userAgent: string | undefined = undefined
) {
  try {
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
  } catch (error) {
    console.error('Erro ao criar log de auditoria:', error);
    throw error;
  }
}
