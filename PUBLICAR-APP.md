# Como Publicar o App para iOS e Android

## Pré-requisitos Obrigatórios

### Para iOS (App Store)
- ✅ **Mac** com macOS (não funciona no Windows)
- ✅ **Xcode** instalado (baixar da App Store - grátis)
- ✅ **Conta Apple Developer** - US$ 99/ano
  - Cadastro: https://developer.apple.com
- ✅ **Certificados e Provisioning Profiles** configurados

### Para Android (Play Store)
- ✅ **Qualquer computador** (Windows, Mac ou Linux)
- ✅ **Android Studio** instalado (grátis)
- ✅ **Conta Google Play Console** - US$ 25 pagamento único
  - Cadastro: https://play.google.com/console
- ✅ **JDK 17** instalado

---

## PARTE 1: Preparar o Projeto

### 1.1 Atualizar Informações do App

Edite `frontend/capacitor.config.ts`:

```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.agreste.zeladoria',  // Identificador único (não mude depois!)
  appName: 'Agreste Zeladoria',    // Nome que aparece no celular
  webDir: 'out',
  server: {
    androidScheme: 'https',
    url: 'https://agreste-zeladoria.vercel.app', // Sua URL de produção
    cleartext: false
  }
};

export default config;
```

### 1.2 Configurar Ícones e Splash Screens

**Opção A: Gerar automaticamente (recomendado)**

1. Coloque uma imagem PNG 1024x1024 em `frontend/resources/icon.png`
2. (Opcional) Coloque uma imagem splash em `frontend/resources/splash.png`
3. Execute:

```bash
cd frontend
npm install @capacitor/assets --save-dev
npx capacitor-assets generate
```

**Opção B: Usar o ícone que você já configurou no admin**

Baixe o ícone do Cloudinary e salve como `frontend/resources/icon.png`, depois execute o comando acima.

### 1.3 Build da Aplicação Web

```bash
cd frontend
npm run build
```

### 1.4 Adicionar Plataformas

```bash
# Adicionar Android
npx cap add android

# Adicionar iOS (só no Mac)
npx cap add ios

# Sincronizar código web com os apps nativos
npx cap sync
```

---

## PARTE 2: Android (Play Store)

### 2.1 Configurar o App Android

Edite `frontend/android/app/build.gradle`:

```gradle
android {
    namespace "com.agreste.zeladoria"
    compileSdkVersion 34
    
    defaultConfig {
        applicationId "com.agreste.zeladoria"
        minSdkVersion 22
        targetSdkVersion 34
        versionCode 1      // Incrementar a cada atualização
        versionName "1.0.0" // Versão visível para o usuário
    }
}
```

### 2.2 Gerar Keystore (Chave de Assinatura)

**IMPORTANTE:** Guarde esse arquivo em local seguro! Perder a keystore = não conseguir atualizar o app nunca mais.

```bash
cd frontend/android
keytool -genkey -v -keystore agreste-release.keystore -alias agreste -keyalg RSA -keysize 2048 -validity 10000
```

Vai pedir:
- Senha da keystore (escolha uma forte e ANOTE!)
- Dados da empresa (nome, cidade, estado, etc)

### 2.3 Configurar Assinatura

Crie `frontend/android/key.properties`:

```properties
storePassword=SUA_SENHA_AQUI
keyPassword=SUA_SENHA_AQUI
keyAlias=agreste
storeFile=agreste-release.keystore
```

⚠️ **NUNCA** commite esse arquivo no Git! Adicione no `.gitignore`:

```bash
echo "android/key.properties" >> frontend/.gitignore
echo "android/*.keystore" >> frontend/.gitignore
```

Edite `frontend/android/app/build.gradle`, adicione antes de `android {`:

```gradle
def keystoreProperties = new Properties()
def keystorePropertiesFile = rootProject.file('key.properties')
if (keystorePropertiesFile.exists()) {
    keystoreProperties.load(new FileInputStream(keystorePropertiesFile))
}

android {
    // ... código existente ...
    
    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile file(keystoreProperties['storeFile'])
            storePassword keystoreProperties['storePassword']
        }
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

### 2.4 Gerar APK/AAB para Produção

```bash
cd frontend/android
./gradlew assembleRelease    # Gera APK
./gradlew bundleRelease       # Gera AAB (obrigatório para Play Store)
```

O arquivo estará em:
- APK: `frontend/android/app/build/outputs/apk/release/app-release.apk`
- AAB: `frontend/android/app/build/outputs/bundle/release/app-release.aab`

### 2.5 Publicar no Google Play

1. Acesse https://play.google.com/console
2. Clique em **"Criar app"**
3. Preencha informações básicas
4. **Produção** → **Criar nova versão**
5. Faça upload do `app-release.aab`
6. Preencha:
   - Nome do app: "Agreste Zeladoria"
   - Descrição curta (80 caracteres)
   - Descrição completa (4000 caracteres)
   - Screenshots (mínimo 2, formato PNG/JPG)
   - Ícone 512x512
   - Banner 1024x500
   - Categoria: Produtividade ou Ferramentas
   - Classificação etária
   - Política de privacidade (URL)
7. Enviar para análise (demora 1-3 dias)

---

## PARTE 3: iOS (App Store)

⚠️ **Só funciona em Mac!**

### 3.1 Abrir Projeto no Xcode

```bash
cd frontend
npx cap open ios
```

### 3.2 Configurar Certificados

No Xcode:
1. Selecione o projeto **App** no navegador
2. Aba **Signing & Capabilities**
3. **Team**: Selecione sua conta Apple Developer
4. **Bundle Identifier**: `com.agreste.zeladoria` (mesmo do capacitor.config.ts)
5. Xcode criará automaticamente os certificados

### 3.3 Configurar Versão

No Xcode:
- **General** → **Identity**
  - Version: `1.0.0`
  - Build: `1`

### 3.4 Gerar Archive

1. No Xcode, menu **Product** → **Archive**
2. Aguarde o build (pode demorar)
3. Na janela **Archives**, selecione o build
4. Clique em **Distribute App**
5. Escolha **App Store Connect**
6. Siga os passos do assistente

### 3.5 Publicar no App Store

1. Acesse https://appstoreconnect.apple.com
2. **Meus Apps** → **+** → **Novo App**
3. Preencha:
   - Nome: "Agreste Zeladoria"
   - Idioma principal: Português (Brasil)
   - Bundle ID: `com.agreste.zeladoria`
   - SKU: `agreste-zeladoria-001`
4. **Informações do app**:
   - Screenshots (obrigatório: iPhone 6.7", 6.5", 5.5")
   - Descrição (4000 caracteres)
   - Palavras-chave
   - URL de suporte
   - URL de marketing (opcional)
   - Ícone 1024x1024 (sem cantos arredondados!)
5. **Preço e Disponibilidade**: Grátis
6. **Classificação etária**
7. **Build**: Selecione o build que você fez upload
8. **Enviar para análise** (demora 1-3 dias)

---

## PARTE 4: Atualizações Futuras

### Para Android

1. Edite `android/app/build.gradle`:
   - Incremente `versionCode` (ex: 1 → 2)
   - Atualize `versionName` (ex: "1.0.0" → "1.0.1")

```bash
cd frontend
npm run build
npx cap sync
cd android
./gradlew bundleRelease
```

2. No Play Console → **Produção** → **Criar nova versão**
3. Upload do novo AAB

### Para iOS

1. No Xcode, incremente **Build** (ex: 1 → 2)
2. **Product** → **Archive**
3. **Distribute App**
4. No App Store Connect, adicione nova versão

---

## PARTE 5: Requisitos das Lojas

### Screenshots Necessários

**Android (Play Store):**
- Telefone: 2-8 capturas (mín 320px, máx 3840px)
- Tablet 7": 1-8 capturas (opcional)
- Tablet 10": 1-8 capturas (opcional)

**iOS (App Store):**
- iPhone 6.7" (Pro Max): Obrigatório
- iPhone 6.5" (Plus): Obrigatório
- iPhone 5.5": Obrigatório
- iPad Pro 12.9": Opcional

**Dica:** Use emuladores para gerar os screenshots:
- Android: Android Studio → AVD Manager
- iOS: Xcode → Simulators

### Informações Obrigatórias

- ✅ Nome do app
- ✅ Descrição curta e completa
- ✅ Ícone da loja (512x512 Android, 1024x1024 iOS)
- ✅ Screenshots
- ✅ Categoria
- ✅ Classificação etária
- ✅ Política de privacidade (URL pública)
- ✅ Informações de contato

---

## PARTE 6: Política de Privacidade

Você **precisa** de uma política de privacidade pública. Crie uma página em:
`https://agreste-zeladoria.vercel.app/privacy`

Exemplo mínimo:

```markdown
# Política de Privacidade - Agreste Zeladoria

**Última atualização:** [DATA]

## Coleta de Dados
O app coleta:
- Nome, e-mail, número da casa/apartamento
- Fotos enviadas nas ocorrências
- Localização das ocorrências

## Uso dos Dados
- Gerenciar solicitações de serviços
- Comunicação entre moradores e administração
- Melhorar o app

## Armazenamento
Dados armazenados em servidores seguros (Render.com, Cloudinary).

## Compartilhamento
Dados não são vendidos ou compartilhados com terceiros.

## Direitos
Você pode solicitar exclusão dos seus dados pelo e-mail: [SEU-EMAIL]

## Contato
Email: [SEU-EMAIL]
```

---

## PARTE 7: Checklist Final

Antes de publicar:

### Funcionalidades
- [ ] Testado em emulador Android
- [ ] Testado em emulador iOS (se tiver Mac)
- [ ] Login funciona
- [ ] Criar ocorrências funciona
- [ ] Upload de fotos funciona
- [ ] Mapas carregam corretamente
- [ ] Solicitações de carreta/trator/motosserra funcionam

### Preparação
- [ ] Ícone 1024x1024 configurado
- [ ] Screenshots tirados (mínimo 2-3)
- [ ] Descrição escrita
- [ ] Política de privacidade publicada
- [ ] Contas das lojas criadas e pagas
- [ ] Keystore do Android salva em local seguro

### Build
- [ ] `npm run build` sem erros
- [ ] `npx cap sync` executado
- [ ] AAB/Archive gerado com sucesso

---

## Resumo: Custos e Tempo

| Item | Custo | Tempo |
|------|-------|-------|
| Conta Apple Developer | US$ 99/ano | Imediato |
| Conta Google Play | US$ 25 único | Imediato |
| Análise Play Store | - | 1-3 dias |
| Análise App Store | - | 1-3 dias |
| **Total Inicial** | **~US$ 124** | **2-6 dias** |

---

## Alternativa: Publicação Progressiva

Se quiser testar antes de pagar:

### 1. Testar Localmente (Grátis)
```bash
# Android
npx cap run android

# iOS (Mac)
npx cap run ios
```

### 2. Distribuição Beta (Grátis)
- **Android:** TestFlight interno do Google Play (100 testadores)
- **iOS:** TestFlight da Apple (10.000 testadores)

### 3. APK Direto (Grátis)
Distribua o APK diretamente (sem Play Store):
- Upload em site próprio
- Usuários precisam permitir "Fontes desconhecidas"
- ⚠️ Menos confiável para usuários

---

## Precisa de Ajuda?

Se tiver dúvidas em qualquer etapa, me avise que explico mais detalhadamente!
