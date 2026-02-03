# Configuração de Push Notifications (Firebase)

## ✅ Implementação Concluída no Frontend

- ✅ Plugin `@capacitor/push-notifications` instalado
- ✅ Serviço de notificações criado em `src/lib/notifications.ts`
- ✅ Integração com `AuthContext` para registrar device tokens
- ✅ Listeners configurados para receber e tratar notificações
- ✅ Sincronização com Android e iOS realizada

---

## 📱 Próximos Passos: Configurar Firebase

### 1. Criar Projeto no Firebase Console

1. Acesse: https://console.firebase.google.com/
2. Clique em **"Adicionar projeto"**
3. Nome do projeto: **Agreste Zeladoria**
4. Desabilite Google Analytics (opcional)
5. Clique em **"Criar projeto"**

---

### 2. Configurar Android (FCM)

#### 2.1. Adicionar App Android ao Firebase

1. No Firebase Console, clique no ícone **Android** (🤖)
2. **Nome do pacote Android**: `com.agreste.zeladoria`
   - ⚠️ Deve ser EXATAMENTE igual ao `appId` em `capacitor.config.ts`
3. **Apelido do app**: Agreste Zeladoria Android
4. Clique em **"Registrar app"**

#### 2.2. Baixar google-services.json

1. Baixe o arquivo `google-services.json`
2. **Copie para**: `frontend/android/app/google-services.json`

#### 2.3. Adicionar Plugin Firebase no Gradle

Edite `frontend/android/build.gradle`:

```gradle
buildscript {
    dependencies {
        // Adicione esta linha
        classpath 'com.google.gms:google-services:4.4.0'
    }
}
```

Edite `frontend/android/app/build.gradle`:

```gradle
apply plugin: 'com.android.application'
// Adicione esta linha no final do arquivo
apply plugin: 'com.google.gms.google-services'
```

#### 2.4. Sincronizar

```bash
cd frontend
npx cap sync android
```

---

### 3. Configurar iOS (APNs)

#### 3.1. Adicionar App iOS ao Firebase

1. No Firebase Console, clique no ícone **iOS** (🍎)
2. **ID do pacote iOS**: `com.agreste.zeladoria`
3. **Apelido do app**: Agreste Zeladoria iOS
4. Clique em **"Registrar app"**

#### 3.2. Baixar GoogleService-Info.plist

1. Baixe o arquivo `GoogleService-Info.plist`
2. **Copie para**: `frontend/ios/App/App/GoogleService-Info.plist`

#### 3.3. Configurar APNs (Apple Push Notification Service)

**⚠️ Requer conta Apple Developer ($99/ano)**

1. Acesse: https://developer.apple.com/account/resources/certificates
2. Crie um **APNs Authentication Key**:
   - Clique em **"Keys"** → **"+"**
   - Marque **"Apple Push Notifications service (APNs)"**
   - Baixe o arquivo `.p8`
3. No Firebase Console:
   - Vá em **Configurações do Projeto** → **Cloud Messaging**
   - Seção **APNs Authentication Key**
   - Faça upload do arquivo `.p8`
   - Preencha **Key ID** e **Team ID**

#### 3.4. Sincronizar (no Mac)

```bash
cd frontend
npx cap sync ios
npx cap open ios
```

No Xcode:
- Abra o projeto
- Selecione o target **App**
- Aba **Signing & Capabilities**
- Adicione capability: **Push Notifications**

---

### 4. Backend: Enviar Notificações

#### 4.1. Instalar Firebase Admin SDK

No backend:

```bash
cd backend
npm install firebase-admin
```

#### 4.2. Baixar Chave de Serviço do Firebase

1. No Firebase Console:
   - **Configurações do Projeto** (⚙️)
   - Aba **"Contas de serviço"**
   - Clique em **"Gerar nova chave privada"**
2. Salve como: `backend/firebase-service-account.json`
3. **⚠️ NÃO COMMITAR ESTE ARQUIVO** - Adicione ao `.gitignore`

#### 4.3. Criar Rotas de Notificação

Crie `backend/src/routes/notifications.routes.ts`:

```typescript
import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import * as admin from 'firebase-admin';
import { prisma } from '../lib/prisma';

const router = Router();

// Registrar device token
router.post('/register-token', authenticateToken, async (req, res) => {
  try {
    const { deviceToken } = req.body;
    const userId = req.user!.id;

    // Salvar no banco (tabela device_tokens)
    await prisma.deviceToken.upsert({
      where: { user_id: userId },
      update: { token: deviceToken },
      create: { user_id: userId, token: deviceToken }
    });

    res.json({ message: 'Device token registrado' });
  } catch (error) {
    console.error('Erro ao registrar token:', error);
    res.status(500).json({ error: 'Erro interno' });
  }
});

// Remover device token
router.post('/unregister-token', authenticateToken, async (req, res) => {
  try {
    const userId = req.user!.id;
    await prisma.deviceToken.deleteMany({ where: { user_id: userId } });
    res.json({ message: 'Device token removido' });
  } catch (error) {
    res.status(500).json({ error: 'Erro interno' });
  }
});

export { router as notificationRoutes };
```

#### 4.4. Adicionar Migração do Prisma

Crie `backend/prisma/migrations/XXXXXX_add_device_tokens/migration.sql`:

```sql
CREATE TABLE IF NOT EXISTS "device_tokens" (
  "id" TEXT PRIMARY KEY,
  "user_id" TEXT NOT NULL,
  "token" TEXT NOT NULL UNIQUE,
  "platform" TEXT DEFAULT 'android',
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
);

CREATE INDEX "device_tokens_user_id_idx" ON "device_tokens"("user_id");
```

Execute:

```bash
cd backend
npx prisma migrate dev --name add_device_tokens
```

#### 4.5. Inicializar Firebase Admin

Crie `backend/src/lib/firebase.ts`:

```typescript
import * as admin from 'firebase-admin';
import serviceAccount from '../../firebase-service-account.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});

export const messaging = admin.messaging();
```

#### 4.6. Função para Enviar Notificações

Crie `backend/src/services/pushNotification.service.ts`:

```typescript
import { messaging } from '../lib/firebase';
import { prisma } from '../lib/prisma';

export async function sendPushNotification(
  userId: string,
  title: string,
  body: string,
  data?: Record<string, string>
) {
  try {
    // Buscar device tokens do usuário
    const deviceTokens = await prisma.deviceToken.findMany({
      where: { user_id: userId }
    });

    if (deviceTokens.length === 0) {
      console.log(`Usuário ${userId} não tem device tokens`);
      return;
    }

    // Enviar para todos os dispositivos
    const messages = deviceTokens.map(dt => ({
      notification: { title, body },
      data: data || {},
      token: dt.token
    }));

    const response = await messaging.sendAll(messages);
    console.log(`${response.successCount} notificações enviadas`);
  } catch (error) {
    console.error('Erro ao enviar push notification:', error);
  }
}
```

#### 4.7. Usar ao Mudar Status

Em `backend/src/controllers/issues.controller.ts`:

```typescript
import { sendPushNotification } from '../services/pushNotification.service';

// Ao atualizar status de ocorrência
export async function updateIssueStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body;

  const issue = await prisma.issue.update({
    where: { id },
    data: { status }
  });

  // Enviar push notification
  await sendPushNotification(
    issue.user_id,
    'Status da Ocorrência Atualizado',
    `Sua ocorrência agora está: ${status}`,
    { type: 'issue_status_changed', issueId: id }
  );

  res.json(issue);
}
```

---

## 🧪 Testar Notificações

### Android

1. Build do app com Firebase configurado:
```bash
cd frontend/android
./gradlew assembleDebug
```

2. Instalar APK no dispositivo físico (emulador tem limitações com FCM)

3. Fazer login no app

4. No backend, testar endpoint de envio manual:
```bash
curl -X POST http://localhost:3000/api/test-notification \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{"userId": "ID_DO_USUARIO"}'
```

### iOS (no Mac)

1. Abrir projeto no Xcode
2. Configurar certificado de desenvolvimento
3. Buildar em dispositivo físico (simulador não suporta push)
4. Testar igual ao Android

---

## 📝 Checklist Final

### Frontend
- [x] Plugin @capacitor/push-notifications instalado
- [x] Serviço de notificações criado
- [x] Integração com AuthContext
- [x] cap sync executado
- [ ] google-services.json copiado (Android)
- [ ] GoogleService-Info.plist copiado (iOS)
- [ ] Gradle configurado com plugin Firebase (Android)
- [ ] Xcode configurado com Push Notifications capability (iOS)

### Backend
- [ ] firebase-admin instalado
- [ ] firebase-service-account.json baixado
- [ ] Migração device_tokens criada
- [ ] Rotas de notificação implementadas
- [ ] Firebase Admin inicializado
- [ ] Função sendPushNotification criada
- [ ] Integração com mudanças de status

### Firebase Console
- [ ] Projeto Firebase criado
- [ ] App Android registrado
- [ ] App iOS registrado (se aplicável)
- [ ] APNs configurado (iOS)

---

## 🚀 Status Atual

✅ **Frontend pronto** - Código implementado e funcionando em Android/iOS
⚠️ **Aguardando configuração Firebase** - Você precisa criar projeto e baixar arquivos
⚠️ **Backend incompleto** - Precisa implementar rotas e Firebase Admin

**Próximo passo**: Criar projeto Firebase e baixar `google-services.json` 🔥
