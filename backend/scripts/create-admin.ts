import prisma from '../src/lib/prisma';
import bcrypt from 'bcrypt';

async function createAdmin() {
  try {
    const password = await bcrypt.hash('admin123', 10);
    
    const admin = await prisma.user.create({
      data: {
        name: 'Administrador',
        email: 'admin@agreste.com',
        password_hash: password,
        role: 'admin',
      },
    });

    console.log('✅ Usuário admin criado com sucesso!');
    console.log('📧 Email: admin@agreste.com');
    console.log('🔑 Senha: admin123');
    console.log('👤 ID:', admin.id);
  } catch (error: any) {
    if (error.code === 'P2002') {
      console.log('⚠️ Usuário admin já existe!');
    } else {
      console.error('❌ Erro ao criar admin:', error);
    }
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
