import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Criando configurações iniciais do sistema...');

  // Configuração do valor da carreta
  await prisma.systemSetting.upsert({
    where: { key: 'cart_price' },
    update: {},
    create: {
      key: 'cart_price',
      value: '50.00',
      description: 'Valor cobrado pela solicitação de carreta (R$)'
    }
  });

  // Configuração de horas mínimas de antecedência
  await prisma.systemSetting.upsert({
    where: { key: 'min_hours_advance' },
    update: {},
    create: {
      key: 'min_hours_advance',
      value: '24',
      description: 'Horas mínimas de antecedência para solicitar carreta'
    }
  });

  console.log('✅ Configurações criadas com sucesso!');
}

main()
  .catch((e) => {
    console.error('❌ Erro ao criar configurações:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
