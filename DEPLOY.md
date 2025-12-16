# Guia de Deploy - Agreste Zeladoria

## 📋 Pré-requisitos

- Servidor com Node.js 18+ e PostgreSQL
- Domínio configurado (ex: agreste.com.br)
- Certificado SSL (Let's Encrypt recomendado)
- Conta Apple Developer (para iOS)
- Conta Google Play Console (para Android)

---

## 🗄️ 1. Configurar Banco de Dados PostgreSQL

### Criar banco de dados
```bash
# Conectar ao PostgreSQL
psql -U postgres

# Criar banco
CREATE DATABASE agreste_zeladoria;
CREATE USER agreste_user WITH PASSWORD 'senha_segura_aqui';
GRANT ALL PRIVILEGES ON DATABASE agreste_zeladoria TO agreste_user;
\q
```

### String de conexão
```
postgresql://agreste_user:senha_segura_aqui@localhost:5432/agreste_zeladoria?schema=public
```

---

## 🔧 2. Deploy do Backend

### Preparar servidor
```bash
# Clonar/copiar código para servidor
cd /var/www/agreste-backend

# Instalar dependências
npm install --production

# Configurar variáveis de ambiente
nano .env
```

### Arquivo .env de produção
```env
DATABASE_URL="postgresql://agreste_user:senha@localhost:5432/agreste_zeladoria?schema=public"
JWT_SECRET="gerar-chave-segura-de-minimo-32-caracteres"
PORT=3001
NODE_ENV=production
CORS_ORIGIN=https://agreste.com.br
API_URL=https://api.agreste.com.br
```

### Executar migrações
```bash
npx prisma migrate deploy
```

### Build e iniciar
```bash
npm run build
npm start

# Ou usar PM2 (recomendado)
npm install -g pm2
pm2 start npm --name "agreste-backend" -- start
pm2 startup
pm2 save
```

### Nginx (proxy reverso)
```nginx
server {
    listen 80;
    server_name api.agreste.com.br;
    
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🌐 3. Deploy do Frontend

### Preparar build
```bash
cd /var/www/agreste-frontend

# Instalar dependências
npm install

# Configurar variáveis
nano .env.production
```

### Arquivo .env.production
```env
NEXT_PUBLIC_API_URL=https://api.agreste.com.br
```

### Build e iniciar
```bash
npm run build
npm start

# Ou usar PM2
pm2 start npm --name "agreste-frontend" -- start
pm2 save
```

### Nginx (frontend)
```nginx
server {
    listen 80;
    server_name agreste.com.br www.agreste.com.br;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Configurar SSL
```bash
# Instalar certbot
sudo apt install certbot python3-certbot-nginx

# Gerar certificados
sudo certbot --nginx -d agreste.com.br -d www.agreste.com.br
sudo certbot --nginx -d api.agreste.com.br
```

---

## 📱 4. Build iOS

### Requisitos
- macOS com Xcode instalado
- Conta Apple Developer ($99/ano)
- Certificados e provisioning profiles configurados

### Preparar projeto
```bash
cd frontend

# Atualizar API URL
nano .env.production
# NEXT_PUBLIC_API_URL=https://api.agreste.com.br

# Build otimizado
npm run build

# Sincronizar com Capacitor
npx cap sync ios
```

### Abrir no Xcode
```bash
npx cap open ios
```

### No Xcode:
1. Selecionar equipe de desenvolvimento
2. Configurar Bundle ID (ex: `com.agreste.zeladoria`)
3. Atualizar versão e build number
4. Configurar ícone e splash screen
5. Testar no simulador
6. Archive → Upload to App Store Connect
7. TestFlight para testes
8. Submeter para revisão da Apple

### Recursos necessários:
- Ícone: 1024x1024px
- Screenshots: diversos tamanhos (iPhone, iPad)
- Descrição, palavras-chave, privacidade

---

## 🤖 5. Build Android

### Requisitos
- Android Studio instalado
- Conta Google Play Console ($25 taxa única)
- Keystore para assinatura

### Preparar projeto
```bash
cd frontend

# Build e sync
npm run build
npx cap sync android
```

### Abrir no Android Studio
```bash
npx cap open android
```

### Gerar keystore (primeira vez)
```bash
keytool -genkey -v -keystore agreste-release.keystore -alias agreste -keyalg RSA -keysize 2048 -validity 10000
```

### Configurar build assinado
Editar `android/app/build.gradle`:
```gradle
android {
    signingConfigs {
        release {
            storeFile file("../../agreste-release.keystore")
            storePassword "senha_keystore"
            keyAlias "agreste"
            keyPassword "senha_key"
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

### Gerar APK/AAB
```bash
cd android
./gradlew bundleRelease

# AAB estará em: android/app/build/outputs/bundle/release/app-release.aab
```

### Google Play Console:
1. Criar aplicativo
2. Upload do AAB
3. Configurar store listing (textos, imagens)
4. Screenshots: diversos tamanhos
5. Classificação de conteúdo
6. Política de privacidade (URL)
7. Teste interno/fechado → Aberto → Produção

### Recursos necessários:
- Ícone: 512x512px
- Feature graphic: 1024x500px
- Screenshots: phone, tablet, TV

---

## 🔐 6. Segurança

### Backend
- [ ] Alterar JWT_SECRET para valor único e seguro
- [ ] Configurar rate limiting
- [ ] Configurar helmet.js
- [ ] Backup automático do banco
- [ ] Logs de auditoria

### Frontend
- [ ] Configurar CSP (Content Security Policy)
- [ ] HTTPS obrigatório
- [ ] Validar todas as entradas

### Banco de dados
- [ ] Backup diário automático
- [ ] Retenção de 30 dias
- [ ] Acesso restrito por firewall

---

## 📊 7. Monitoramento

### PM2 monitoring
```bash
pm2 monit
pm2 logs agreste-backend
pm2 logs agreste-frontend
```

### Nginx logs
```bash
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log
```

### PostgreSQL
```bash
# Monitorar conexões
SELECT count(*) FROM pg_stat_activity;

# Backup manual
pg_dump -U agreste_user agreste_zeladoria > backup_$(date +%Y%m%d).sql
```

---

## 🔄 8. Atualizações

### Backend/Frontend
```bash
# Baixar nova versão
git pull

# Backend
cd backend
npm install
npx prisma migrate deploy
npm run build
pm2 restart agreste-backend

# Frontend
cd frontend
npm install
npm run build
pm2 restart agreste-frontend
```

### Apps Mobile
- Incrementar versão no package.json
- Rebuild e resubmeter para stores
- Apple: revisão 1-3 dias
- Google: revisão 1-7 dias

---

## 📝 Checklist de Deploy

### Backend
- [ ] PostgreSQL configurado
- [ ] .env com credenciais de produção
- [ ] Migrações executadas
- [ ] PM2 configurado
- [ ] Nginx configurado
- [ ] SSL ativo
- [ ] Backup automático ativo

### Frontend
- [ ] Build de produção
- [ ] .env.production configurado
- [ ] PM2 configurado
- [ ] Nginx configurado
- [ ] SSL ativo

### Mobile
- [ ] API URL de produção
- [ ] Ícones e splash screens
- [ ] Conta developer ativa
- [ ] Build assinado
- [ ] Testes funcionais completos
- [ ] Screenshots preparadas
- [ ] Textos e descrições prontas
- [ ] Submetido para review

---

## 🆘 Suporte

Em caso de problemas:
1. Verificar logs: `pm2 logs`
2. Verificar Nginx: `sudo nginx -t`
3. Verificar PostgreSQL: `sudo systemctl status postgresql`
4. Verificar disco: `df -h`
5. Verificar memória: `free -h`

## 📞 Contatos

- **Servidor**: Informações de acesso SSH
- **Banco**: Credenciais PostgreSQL
- **Apple**: ID da conta developer
- **Google**: ID da conta Play Console
