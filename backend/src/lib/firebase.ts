import * as admin from 'firebase-admin';
import path from 'path';
import fs from 'fs';

// Inicializar Firebase Admin apenas se arquivo de credenciais existir
const serviceAccountPath = path.join(__dirname, '../../firebase-service-account.json');

let messaging: admin.messaging.Messaging | null = null;

if (fs.existsSync(serviceAccountPath)) {
  try {
    const serviceAccount = require(serviceAccountPath);
    
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
    });
    
    messaging = admin.messaging();
    console.log('✅ Firebase Admin inicializado com sucesso');
  } catch (error) {
    console.error('❌ Erro ao inicializar Firebase Admin:', error);
  }
} else {
  console.warn('⚠️ firebase-service-account.json não encontrado. Push notifications desabilitado.');
  console.warn('   Para habilitar, baixe o arquivo do Firebase Console e coloque em backend/');
}

export { messaging };
export const isFirebaseEnabled = messaging !== null;
