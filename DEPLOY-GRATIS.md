# 🎉 Deploy 100% GRATUITO - Oracle Cloud + Locaweb + Vercel

## ✅ Pré-requisitos

- ✅ PostgreSQL na Locaweb (você já tem)
- ✅ Cartão de crédito internacional (validação Oracle - **não cobra**)
- ✅ Conta GitHub (gratuita)
- ✅ 2-3 horas para configurar

---

## 📋 ETAPA 1: Preparar Dados do Banco Locaweb

### Localizar credenciais PostgreSQL

1. Acesse painel Locaweb
2. Vá em "Banco de Dados" → PostgreSQL
3. Anote:
   ```
   Host: pgsql.locaweb.com.br (ou similar)
   Porta: 5432
   Banco: u123456_nomedatabase
   Usuário: u123456_usuario
   Senha: sua_senha_aqui
   ```

### Testar conexão (opcional)

Use um cliente como DBeaver ou execute no seu computador:

```powershell
# Instalar psql (se não tiver)
# Download: https://www.postgresql.org/download/windows/

# Testar conexão
psql -h pgsql.locaweb.com.br -U u123456_usuario -d u123456_nomedatabase -p 5432
# Digite a senha quando pedir
# Se conectar, digite \q para sair
```

### Montar string de conexão

```
postgresql://u123456_usuario:sua_senha@pgsql.locaweb.com.br:5432/u123456_nomedatabase
```

**Guarde essa string!** Usaremos várias vezes.

---

## 🔶 ETAPA 2: Oracle Cloud Always Free

### Por que Oracle Cloud?
- ✅ **REALMENTE gratuito para sempre** (Oracle garante)
- ✅ 2 VMs ARM com 1GB RAM cada
- ✅ 200GB storage total
- ✅ 10TB bandwidth/mês
- ✅ Suficiente para um condomínio

### Criar conta Oracle Cloud

1. Acesse: https://www.oracle.com/cloud/free/
2. Clique "Start for free"
3. Preencha dados:
   - País: Brazil
   - Email: seu email
   - Nome completo
   
4. **Verificação de identidade:**
   - Cartão de crédito internacional (Visa/Master/Amex)
   - Oracle cobra US$1 e estorna (validação)
   - **Não cobrará nada depois se usar só Free Tier**

5. Escolha região: **Brazil East (Sao Paulo)** ou **US East (Ashburn)**

6. Aguardar aprovação (5 minutos a 24 horas)

7. Receber email de confirmação

### Criar VM Always Free

1. Login no Oracle Cloud Console
2. Menu ☰ → Compute → Instances
3. **Create Instance**

4. Configurações:
   ```
   Name: agreste-backend
   
   Placement: 
   - Availability Domain: (deixar padrão)
   
   Image and shape:
   - Image: Ubuntu 22.04 (minimal)
   - Shape: Clique "Change Shape"
     → Ampere (VM.Standard.A1.Flex)
     → OCPU count: 1
     → Memory: 6 GB (use o máximo do free tier)
   
   Networking:
   - VCN: (deixar padrão ou criar nova)
   - Subnet: (deixar padrão)
   - Assign public IP: ✅ Sim
   
   Add SSH keys:
   - Generate SSH key pair → Download Private Key e Public Key
   - GUARDE BEM ESSAS CHAVES!
   
   Boot volume:
   - 50GB (free tier)
   ```

5. **Create**

6. Aguardar instância ficar "Running" (2-3 minutos)

7. Copiar **Public IP Address** (ex: 200.123.45.67)

### Configurar Firewall da Oracle

1. Na mesma tela da instância, clique em **Subnet**
2. Clique na **Security List** (Default Security List)
3. **Add Ingress Rules:**

**Regra 1 (HTTP):**
```
Source CIDR: 0.0.0.0/0
IP Protocol: TCP
Destination Port: 80
```

**Regra 2 (HTTPS):**
```
Source CIDR: 0.0.0.0/0
IP Protocol: TCP
Destination Port: 443
```

**Regra 3 (Backend - temporário):**
```
Source CIDR: 0.0.0.0/0
IP Protocol: TCP
Destination Port: 3001
```

### Acessar VM via SSH

**Windows PowerShell:**
```powershell
# Navegar até onde salvou a chave privada
cd C:\Users\SeuUsuario\Downloads

# Dar permissão (se necessário)
icacls ssh-key-*.key /inheritance:r /grant:r "$($env:USERNAME):(R)"

# Conectar
ssh -i ssh-key-*.key ubuntu@200.123.45.67
# (troque pelo seu IP público)
```

Primeira vez perguntará "Are you sure?", digite: `yes`

---

## ⚙️ ETAPA 3: Configurar Servidor Oracle

### Atualizar sistema

```bash
# Atualizar pacotes
sudo apt update && sudo apt upgrade -y

# Instalar ferramentas básicas
sudo apt install -y curl wget git nano ufw
```

### Instalar Node.js 18

```bash
# Adicionar repositório Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# Instalar
sudo apt install -y nodejs

# Verificar
node --version  # v18.x.x
npm --version   # 9.x.x
```

### Instalar PM2

```bash
sudo npm install -g pm2
```

### Configurar Firewall do Ubuntu

```bash
# Configurar firewall
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw allow 3001/tcp  # Backend (temporário)
sudo ufw --force enable

# Verificar
sudo ufw status
```

### Criar estrutura do projeto

```bash
# Criar diretório
sudo mkdir -p /var/www/agreste-backend
sudo chown -R ubuntu:ubuntu /var/www/agreste-backend
cd /var/www/agreste-backend
```

---

## 📦 ETAPA 4: Enviar Código para Servidor

### Opção A: Via Git (Recomendado)

**No seu computador (PowerShell):**
```powershell
cd c:\wamp64\www\app-agreste

# Inicializar Git (se ainda não fez)
git init
git add .
git commit -m "Deploy backend"

# Criar repositório no GitHub
# 1. Vá em github.com → New Repository
# 2. Nome: app-agreste
# 3. Private (recomendado)
# 4. Create repository

# Conectar e enviar
git remote add origin https://github.com/seu-usuario/app-agreste.git
git branch -M main
git push -u origin main
```

**No servidor Oracle:**
```bash
cd /var/www/agreste-backend

# Clonar repositório
git clone https://github.com/seu-usuario/app-agreste.git .

# Entrar na pasta backend
cd backend
```

### Opção B: Via SFTP (Alternativa)

Use **WinSCP** ou **FileZilla**:
```
Protocol: SFTP
Host: 200.123.45.67 (seu IP)
Port: 22
Username: ubuntu
Password: (deixe vazio)
Private key: ssh-key-*.key (selecione o arquivo)
```

Upload da pasta `backend` para `/var/www/agreste-backend/`

---

## 🔧 ETAPA 5: Configurar Backend

```bash
cd /var/www/agreste-backend/backend

# Instalar dependências
npm install --production

# Criar arquivo .env
nano .env
```

**Cole este conteúdo** (ajuste com seus dados):
```env
DATABASE_URL="postgresql://u123456_usuario:sua_senha@pgsql.locaweb.com.br:5432/u123456_nomedatabase"
JWT_SECRET="MinhaChaveSecretaSuperSegura123456789012345678"
PORT=3001
NODE_ENV=production
CORS_ORIGIN=*
API_URL=http://200.123.45.67:3001
```

**Salvar:** `Ctrl+X` → `Y` → `Enter`

### Executar migrações no banco Locaweb

```bash
# Gerar Prisma Client
npx prisma generate

# Aplicar schema no banco Locaweb
npx prisma db push

# Verificar se conectou
npx prisma studio
# Ctrl+C para sair
```

### Criar usuário admin inicial

```bash
# Se tiver script
npm run seed

# Ou criar manualmente com script
node -e "
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const prisma = new PrismaClient();

async function createAdmin() {
  const hash = await bcrypt.hash('admin123', 10);
  await prisma.user.create({
    data: {
      name: 'Administrador',
      email: 'admin@agreste.com.br',
      password_hash: hash,
      role: 'admin',
      status: 'ativo',
      apartment_or_house: 'Administração'
    }
  });
  console.log('Admin criado!');
}
createAdmin();
"
```

### Testar backend

```bash
# Testar inicio
npm start

# Se iniciou sem erro, abra outro terminal e teste:
# curl http://localhost:3001/health
# Deve retornar: {"status":"ok"}

# Parar: Ctrl+C
```

### Iniciar com PM2 (mantém 24/7)

```bash
# Iniciar aplicação
pm2 start npm --name "agreste-api" -- start

# Configurar para iniciar no boot
pm2 startup
# Copie e execute o comando que aparecer (começa com sudo)

pm2 save

# Verificar status
pm2 status
pm2 logs agreste-api

# Comandos úteis:
# pm2 restart agreste-api
# pm2 stop agreste-api
# pm2 delete agreste-api
```

### Instalar e configurar Nginx

```bash
# Instalar Nginx
sudo apt install -y nginx

# Criar configuração
sudo nano /etc/nginx/sites-available/agreste
```

**Cole:**
```nginx
server {
    listen 80;
    server_name 200.123.45.67;  # Seu IP público

    # Aumentar tamanho de upload
    client_max_body_size 50M;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }
}
```

```bash
# Ativar configuração
sudo ln -s /etc/nginx/sites-available/agreste /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default

# Testar configuração
sudo nginx -t

# Se OK, recarregar
sudo systemctl reload nginx
sudo systemctl enable nginx
```

### Testar API externamente

**No navegador do seu computador:**
```
http://200.123.45.67/health
```

Deve retornar: `{"status":"ok"}`

✅ **Backend funcionando!**

---

## 🌐 ETAPA 6: Deploy Frontend (Vercel)

### Preparar código

**No seu computador:**
```powershell
cd c:\wamp64\www\app-agreste\frontend

# Criar arquivo de ambiente de produção
echo "NEXT_PUBLIC_API_URL=http://200.123.45.67" | Out-File -Encoding utf8 .env.production
```

### Commit e push

```powershell
cd c:\wamp64\www\app-agreste
git add .
git commit -m "Configurar API de produção"
git push
```

### Deploy no Vercel

1. Acesse https://vercel.com
2. **Sign Up** com GitHub
3. **Add New** → **Project**
4. **Import** repositório `app-agreste`
5. Configurar:
   ```
   Framework Preset: Next.js
   Root Directory: frontend
   Build Command: npm run build
   Output Directory: .next
   Install Command: npm install
   ```

6. **Environment Variables:**
   ```
   Name: NEXT_PUBLIC_API_URL
   Value: http://200.123.45.67
   ```

7. **Deploy**

8. Aguardar 3-5 minutos

9. Copiar URL: `https://agreste-xxx.vercel.app`

### Atualizar CORS no backend

**No servidor Oracle:**
```bash
nano /var/www/agreste-backend/backend/.env
```

Alterar:
```env
CORS_ORIGIN=https://agreste-xxx.vercel.app
```

```bash
# Reiniciar
pm2 restart agreste-api
```

### Testar sistema completo

1. Acesse: `https://agreste-xxx.vercel.app`
2. Faça login: `admin@agreste.com.br` / `admin123`
3. Teste criar ocorrência, usuário, etc.

✅ **Sistema 100% funcionando grátis!**

---

## 🔒 ETAPA 7: Segurança (Opcional mas Recomendado)

### Instalar SSL/HTTPS (se tiver domínio)

Se você tiver um domínio (ex: agreste.com.br):

**1. Configurar DNS:**
- A Record: `api.agreste.com.br` → `200.123.45.67`
- Aguardar propagação (1-24h)

**2. No servidor Oracle:**
```bash
# Instalar Certbot
sudo apt install -y certbot python3-certbot-nginx

# Atualizar Nginx
sudo nano /etc/nginx/sites-available/agreste
# Trocar: server_name 200.123.45.67;
# Por: server_name api.agreste.com.br;

sudo nginx -t && sudo systemctl reload nginx

# Gerar certificado SSL
sudo certbot --nginx -d api.agreste.com.br

# Renovação automática já configurada
```

**3. Atualizar frontend:**
- Vercel → Project Settings → Environment Variables
- Editar: `NEXT_PUBLIC_API_URL = https://api.agreste.com.br`
- Redeploy

**4. Atualizar CORS:**
```bash
nano /var/www/agreste-backend/backend/.env
# CORS_ORIGIN=https://agreste.vercel.app
pm2 restart agreste-api
```

### Configurar Domínio Customizado no Vercel

1. Vercel → Project Settings → Domains
2. Add Domain: `agreste.com.br`
3. Configurar DNS conforme instruções
4. Aguardar verificação

---

## 📊 ETAPA 8: Monitoramento e Manutenção

### Verificar status

```bash
# Status da aplicação
pm2 status
pm2 logs agreste-api

# Uso de recursos
htop  # ou top

# Espaço em disco
df -h

# Memória
free -h

# Nginx
sudo systemctl status nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Backup do banco (Locaweb cuida)

A Locaweb já faz backup do PostgreSQL, mas você pode fazer manualmente:

```bash
# No seu computador
pg_dump -h pgsql.locaweb.com.br -U u123456_usuario -d u123456_nomedatabase > backup.sql
```

### Atualizar código

```bash
# No servidor Oracle
cd /var/www/agreste-backend/backend
git pull
npm install
pm2 restart agreste-api
```

---

## 🎯 RESUMO FINAL

### O que você tem agora:

✅ **Backend:** Oracle Cloud (Grátis para sempre)
✅ **Banco:** PostgreSQL Locaweb (Você já tem)
✅ **Frontend:** Vercel (Grátis para sempre)
✅ **Custo Total:** R$ 0/mês

### URLs:
- API: `http://200.123.45.67` (ou `https://api.seu-dominio.com.br`)
- Site: `https://agreste-xxx.vercel.app` (ou seu domínio)

### Credenciais Admin:
- Email: `admin@agreste.com.br`
- Senha: `admin123` (TROCAR após primeiro login!)

---

## 🆘 Resolução de Problemas

### Backend não inicia
```bash
pm2 logs agreste-api
# Verificar erro
# Comum: problema com DATABASE_URL

# Testar conexão do banco
node -e "const { PrismaClient } = require('@prisma/client'); new PrismaClient().\$connect().then(() => console.log('OK')).catch(e => console.error(e));"
```

### Frontend não conecta na API
- Verificar `NEXT_PUBLIC_API_URL` no Vercel
- Verificar firewall Oracle (porta 80 aberta?)
- Testar API direto: `http://seu-ip/health`

### CORS error
- Atualizar `CORS_ORIGIN` no `.env` do backend
- Reiniciar: `pm2 restart agreste-api`

### Oracle Cloud suspende conta
- Certifique-se de estar usando APENAS recursos Always Free
- Não use serviços pagos sem querer
- Oracle avisa antes de cobrar

---

## 📱 Próximo Passo: Apps Mobile

Quando estiver 100% estável, veja o arquivo `DEPLOY.md` seção 4 e 5 para build iOS/Android.

---

## ✅ Checklist

- [ ] PostgreSQL Locaweb configurado e testado
- [ ] Oracle Cloud conta criada e verificada
- [ ] VM Always Free criada (Ubuntu 22.04 ARM)
- [ ] Firewall Oracle configurado (portas 80, 443, 3001)
- [ ] SSH funcionando (chave privada guardada)
- [ ] Node.js 18 instalado
- [ ] Código enviado via Git
- [ ] .env configurado com DATABASE_URL Locaweb
- [ ] `npx prisma db push` executado
- [ ] PM2 rodando aplicação
- [ ] Nginx configurado
- [ ] API respondendo `/health`
- [ ] Código no GitHub
- [ ] Vercel deploy concluído
- [ ] Frontend acessível e testado
- [ ] Login/CRUD funcionando
- [ ] (Opcional) Domínio configurado
- [ ] (Opcional) SSL/HTTPS ativo

**Pronto! Sistema 100% gratuito e definitivo no ar! 🎉**
