import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.systemSetting.upsert({
    where: { key: 'tractor_price_per_hour' },
    update: {},
    create: {
      key: 'tractor_price_per_hour',
      value: '150.00',
      description: 'Valor por hora do trator (R$)'
    }
  });

  await prisma.systemSetting.upsert({
    where: { key: 'available_tractors' },
    update: {},
    create: {
      key: 'available_tractors',
      value: '2',
      description: 'Número de tratores disponíveis'
    }
  });

  console.log('✅ Settings de trator criadas com sucesso!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
