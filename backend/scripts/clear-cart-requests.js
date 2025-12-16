const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.cartRequest.deleteMany();
  console.log('✅ Solicitações antigas removidas!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
