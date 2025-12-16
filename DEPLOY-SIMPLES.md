# 🚀 Deploy Simplificado - Locaweb + Alternativas

## 💡 Cenário Recomendado (Mais Fácil)

Para quem não tem experiência técnica, recomendo esta combinação:

1. **Backend + Banco**: Railway.app (gratuito para começar)
2. **Frontend Web**: Vercel (gratuito)
3. **Apps Mobile**: Depois que tudo estiver funcionando

**Vantagens:**
- ✅ Não precisa configurar servidor
- ✅ Deploy automático via Git
- ✅ PostgreSQL incluído
- ✅ SSL grátis
- ✅ Atualização simples (só dar push no Git)

---

## 📊 Opções de Hospedagem

### Opção 1: RAILWAY (Recomendado - Mais Fácil) 🌟

**Custo:** Gratuito (US$5 crédito mensal) → depois ~US$10/mês

#### Passo 1: Criar conta
1. Acesse https://railway.app
2. Clique em "Start a New Project"
3. Faça login com GitHub

#### Passo 2: Criar PostgreSQL
1. No Railway, clique "New" → "Database" → "PostgreSQL"
2. Aguarde criar (1-2 minutos)
3. Clique no banco → aba "Variables"
4. Copie a `DATABASE_URL` (algo como `postgresql://postgres:senha@...`)

#### Passo 3: Deploy do Backend
1. No Railway, clique "New" → "GitHub Repo"
2. Selecione seu repositório `app-agreste`
3. Selecione a pasta `backend` como Root Directory
4. Adicione variáveis de ambiente:
   ```
   DATABASE_URL = (cole a URL do banco)
   JWT_SECRET = MinhaChaveSecreta123456789012345678
   NODE_ENV = production
   PORT = 3001
   CORS_ORIGIN = *
   ```
5. Railway fará deploy automático
6. Copie a URL pública (ex: `agreste-backend.up.railway.app`)

#### Passo 4: Deploy do Frontend na Vercel
1. Acesse https://vercel.com
2. Faça login com GitHub
3. "Add New" → "Project"
4. Selecione repositório `app-agreste`
5. Configure:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Environment Variables:**
     ```
     NEXT_PUBLIC_API_URL = https://agreste-backend.up.railway.app
     ```
6. Clique "Deploy"
7. Aguarde 3-5 minutos
8. Copie a URL (ex: `agreste.vercel.app`)

#### Passo 5: Atualizar CORS no Backend
1. Volte ao Railway
2. No projeto backend, vá em "Variables"
3. Edite `CORS_ORIGIN`:
   ```
   CORS_ORIGIN = https://agreste.vercel.app
   ```
4. Backend reiniciará automaticamente

**Pronto! Sistema funcionando! 🎉**

---

### Opção 2: LOCAWEB (Sua Hospedagem Atual)

A Locaweb tem planos compartilhados (PHP) e VPS. Para Node.js você precisa de:
- **Hospedagem VPS** (a partir de R$ 39,90/mês) OU
- **Cloud Server** (mais caro mas mais fácil)

#### Limitações da Locaweb:
- ⚠️ Hospedagem compartilhada **não suporta Node.js**
- ⚠️ VPS requer conhecimento de Linux
- ⚠️ Precisa configurar servidor manualmente

#### Se você tem VPS/Cloud na Locaweb:

##### Passo 1: Acessar servidor via SSH
```bash
# Windows PowerShell
ssh usuario@seu-servidor.locaweb.com.br
```

##### Passo 2: Instalar Node.js
```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verificar
node --version  # Deve mostrar v18.x
npm --version
```

##### Passo 3: Instalar PostgreSQL
```bash
# Instalar PostgreSQL
sudo apt install postgresql postgresql-contrib -y

# Iniciar serviço
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Criar banco
sudo -u postgres psql
```

No psql:
```sql
CREATE DATABASE agreste_zeladoria;
CREATE USER agreste_user WITH PASSWORD 'SenhaForte123!';
GRANT ALL PRIVILEGES ON DATABASE agreste_zeladoria TO agreste_user;
\q
```

##### Passo 4: Fazer upload do código
```bash
# No seu computador (PowerShell)
cd c:\wamp64\www\app-agreste

# Compactar backend
Compress-Archive -Path backend\* -DestinationPath backend.zip

# Upload via SFTP (usar FileZilla ou WinSCP)
# Servidor: seu-servidor.locaweb.com.br
# Upload para: /home/usuario/agreste-backend/
```

Ou via Git (se tiver):
```bash
# No servidor
cd /home/usuario
git clone https://github.com/seu-usuario/app-agreste.git
cd app-agreste/backend
```

##### Passo 5: Configurar backend no servidor
```bash
cd /home/usuario/agreste-backend

# Instalar dependências
npm install --production

# Criar .env
nano .env
```

Conteúdo do .env:
```env
DATABASE_URL="postgresql://agreste_user:SenhaForte123!@localhost:5432/agreste_zeladoria"
JWT_SECRET="MinhaChaveSecreta123456789012345678"
PORT=3001
NODE_ENV=production
```

Salvar: `Ctrl+X`, `Y`, `Enter`

```bash
# Executar migrações
npx prisma migrate deploy

# Instalar PM2
sudo npm install -g pm2

# Iniciar backend
pm2 start npm --name "agreste-api" -- start
pm2 startup
pm2 save
```

##### Passo 6: Configurar Nginx
```bash
sudo nano /etc/nginx/sites-available/agreste
```

Conteúdo:
```nginx
server {
    listen 80;
    server_name api.seudominio.com.br;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Ativar site
sudo ln -s /etc/nginx/sites-available/agreste /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

##### Passo 7: Configurar SSL (HTTPS)
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d api.seudominio.com.br
```

##### Passo 8: Deploy Frontend
Repetir processo para frontend ou usar Vercel (mais fácil)

---

### Opção 3: RENDER (Alternativa ao Railway)

Similar ao Railway, gratuito para começar:
1. Acesse https://render.com
2. "New" → "PostgreSQL" (crie banco)
3. "New" → "Web Service" (backend)
4. "New" → "Static Site" (frontend)

---

## 🗄️ Banco de Dados - PostgreSQL na Locaweb

Se quiser usar o PostgreSQL da Locaweb:

1. **Contratar addon PostgreSQL** no painel Locaweb
2. Anotar dados de conexão:
   - Host: `pgsql.locaweb.com.br`
   - Porta: `5432`
   - Banco: `seu_banco`
   - Usuário: `seu_usuario`
   - Senha: `sua_senha`

3. **String de conexão:**
   ```
   postgresql://seu_usuario:sua_senha@pgsql.locaweb.com.br:5432/seu_banco
   ```

4. **Usar no Railway/Vercel:**
   - Configure `DATABASE_URL` com a string acima
   - Backend acessará o banco da Locaweb remotamente

---

## 📱 Apps Mobile (Fazer Depois)

Depois do sistema web funcionando:

### Preparar para Mobile
```powershell
cd c:\wamp64\www\app-agreste\frontend

# Atualizar URL da API para produção
# Editar .env.production:
# NEXT_PUBLIC_API_URL=https://agreste-backend.up.railway.app

# Instalar Capacitor
npm install @capacitor/cli @capacitor/core
npx cap init

# Adicionar plataformas
npx cap add ios
npx cap add android
```

### iOS (precisa Mac)
```bash
npx cap sync ios
npx cap open ios
# Abrir Xcode e fazer build
```

### Android
```bash
npx cap sync android
npx cap open android
# Abrir Android Studio e fazer build
```

---

## 🎯 Recomendação Final

**Para começar HOJE sem dor de cabeça:**

1. ✅ **Railway** (backend + banco) - 10 minutos
2. ✅ **Vercel** (frontend) - 5 minutos
3. ✅ Testar tudo funcionando
4. 📱 **Apps mobile** - fazer depois com calma

**Custo inicial:** R$ 0,00 (gratuito)
**Custo após limite:** ~R$ 50-80/mês (Railway + Vercel Pro se precisar)

---

## 📞 Passo a Passo Detalhado

Quer que eu faça um **tutorial com prints** de cada tela?

Posso criar guias específicos para:
- [ ] Railway (backend + banco)
- [ ] Vercel (frontend)
- [ ] Locaweb VPS (se preferir)
- [ ] Apps iOS
- [ ] Apps Android

**Qual opção você prefere seguir?**

1. Railway + Vercel (mais fácil, recomendado)
2. Locaweb VPS (você já tem)
3. Outra opção

Me diga qual caminho seguir e faço o passo a passo detalhado! 🚀
