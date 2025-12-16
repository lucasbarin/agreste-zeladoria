import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Iniciando seed do banco de dados...');

  // Tipos de ocorrência iniciais
  const issueTypes = [
    {
      code: 'poste_com_luz_queimada',
      name: 'Poste com Luz Queimada',
      description: 'Poste de iluminação pública com lâmpada queimada ou defeituosa',
      active: true
    },
    {
      code: 'buraco_na_rua',
      name: 'Buraco na Rua',
      description: 'Buraco ou irregularidade no asfalto ou calçamento',
      active: true
    },
    {
      code: 'sujeira_ou_entulho',
      name: 'Sujeira ou Entulho',
      description: 'Acúmulo de lixo, entulho ou sujeira em área comum',
      active: true
    }
  ];

  console.log('📝 Criando tipos de ocorrência...');
  
  for (const type of issueTypes) {
    const exists = await prisma.issueType.findUnique({
      where: { code: type.code }
    });

    if (exists) {
      console.log(`  ⏭️  Tipo "${type.name}" já existe, pulando...`);
    } else {
      await prisma.issueType.create({ data: type });
      console.log(`  ✅ Tipo "${type.name}" criado com sucesso`);
    }
  }

  console.log('\n🎉 Seed concluído!');
}

main()
  .catch((e) => {
    console.error('❌ Erro ao executar seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
