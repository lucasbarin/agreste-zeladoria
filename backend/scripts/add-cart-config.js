const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.systemSetting.upsert({
    where: { key: 'available_carts' },
    update: {},
    create: {
      key: 'available_carts',
      value: '2',
      description: 'Número de carretas disponíveis para agendamento'
    }
  });
  console.log('✅ Configuração de carretas disponíveis adicionada!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
