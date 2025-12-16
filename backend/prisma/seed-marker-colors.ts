import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Atualizar cores dos tipos existentes
  await prisma.issueType.updateMany({
    where: { code: 'poste_com_luz_queimada' },
    data: { 
      marker_color: '#ffc107', // Amarelo/laranja para luz
      marker_icon: 'lightbulb'
    }
  });

  await prisma.issueType.updateMany({
    where: { code: 'buraco_na_rua' },
    data: { 
      marker_color: '#dc3545', // Vermelho para perigo
      marker_icon: 'alert-triangle'
    }
  });

  await prisma.issueType.updateMany({
    where: { code: 'sujeira_ou_entulho' },
    data: { 
      marker_color: '#28a745', // Verde para limpeza
      marker_icon: 'trash'
    }
  });

  console.log('✅ Cores dos markers atualizadas com sucesso!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
