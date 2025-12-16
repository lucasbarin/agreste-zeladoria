# 🎯 Solução Definitiva - Locaweb + Gratuito Permanente

## ⚠️ Verdade sobre "Gratuito"

### Railway
- **Gratuito:** US$5 crédito/mês (~500 horas)
- **Realidade:** Sistema 24/7 consome mais, precisa pagar ~US$10/mês
- **Não é solução definitiva**

### Vercel (Frontend)
- **Gratuito:** Permanente para projetos pessoais ✅
- **Limites:** 100GB bandwidth/mês (suficiente para condomínio)
- **É solução definitiva** ✅

### Render.com
- **Gratuito:** Permanente MAS com limitações
- **Problema:** App dorme após 15 min inativo (lento para acordar)
- **Não recomendado para produção**

---

## 💡 SOLUÇÃO RECOMENDADA (Definitiva)

### Cenário Ideal para Você:

```
┌─────────────────────────────────────────────┐
│  BACKEND: VPS Barato (R$ 20-30/mês)        │
│  BANCO: PostgreSQL Locaweb                  │
│  FRONTEND: Vercel (Gratuito Permanente)    │
│  APPS: Após sistema estável                 │
└─────────────────────────────────────────────┘
```

**Por que essa combinação:**
- ✅ **Estável e definitivo** (não precisará migrar)
- ✅ **Controle total** do backend
- ✅ **Performance boa** 24/7
- ✅ **Custo previsível** (~R$ 20-50/mês)
- ✅ **Banco na Locaweb** (como você quer)

---

## 🗄️ PASSO 1: PostgreSQL na Locaweb

### Contratar PostgreSQL na Locaweb

1. Acesse painel Locaweb
2. Vá em "Banco de Dados" → "Adicionar PostgreSQL"
3. Escolha plano (geralmente incluído na hospedagem)
4. Anote os dados:

```
Host: pgsql.locaweb.com.br (ou similar)
Porta: 5432
Banco: u123456_agreste
Usuário: u123456_agreste
Senha: (definida por você)
```

### String de Conexão
```
postgresql://u123456_agreste:SuaSenha@pgsql.locaweb.com.br:5432/u123456_agreste
```

**Custo:** Incluído na hospedagem ou ~R$ 10-20/mês

---

## 💻 PASSO 2: Escolher Hospedagem do Backend

### Opção A: Contabo VPS (RECOMENDADA) 💰

**Especificações:**
- 4 vCPU / 6GB RAM / 200GB SSD
- **Custo: €4,50/mês (~R$ 27/mês)** 🔥
- Localização: Alemanha ou EUA
- Performance excelente
- Uptime 99.9%

**Link:** https://contabo.com/en/vps/

**Vantagens:**
- ✅ Mais barato que Locaweb VPS
- ✅ Muito mais recursos
- ✅ Estável e confiável
- ✅ Sem surpresas de custo

### Opção B: Oracle Cloud (SEMPRE GRATUITO) 🆓

**Especificações:**
- 1 vCPU / 1GB RAM (ARM)
- **Custo: R$ 0 PARA SEMPRE** ✅
- Oracle garante permanência
- Performance OK para início

**Limitações:**
- Processo de cadastro rigoroso
- Pode pedir cartão internacional
- Setup mais técnico

### Opção C: Locaweb VPS

**Se você já tem:**
- VPS 1: R$ 39,90/mês
- Mais caro mas suporte em PT-BR
- Você já conhece a plataforma

---

## 🚀 PASSO 3: Configurar Backend (Contabo VPS)

### Criar conta e VPS

1. Acesse https://contabo.com/en/vps/
2. Escolha "VPS S" (€4,50/mês)
3. Sistema: Ubuntu 22.04 LTS
4. Região: US East (melhor para Brasil)
5. Finalizar compra
6. Aguardar email com dados de acesso (30 min)

### Acessar VPS via SSH

```powershell
# Recebeu: IP, usuário, senha
ssh root@seu-ip-aqui

# Primeiro acesso: trocar senha
passwd
```

### Configurar servidor (copie e cole tudo)

```bash
# Atualizar sistema
apt update && apt upgrade -y

# Instalar Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs

# Instalar PM2
npm install -g pm2

# Instalar Nginx
apt install -y nginx

# Instalar Certbot (SSL)
apt install -y certbot python3-certbot-nginx

# Criar diretório
mkdir -p /var/www/agreste-backend
cd /var/www/agreste-backend
```

### Upload do código

**Opção 1: Via Git (recomendado)**
```bash
# No servidor
cd /var/www/agreste-backend
git clone https://github.com/seu-usuario/app-agreste.git .
cd backend
```

**Opção 2: Via SFTP**
- Use WinSCP ou FileZilla
- Host: seu-ip-aqui
- User: root
- Senha: sua-senha
- Upload pasta `backend` para `/var/www/agreste-backend/`

### Configurar aplicação

```bash
cd /var/www/agreste-backend

# Instalar dependências
npm install --production

# Criar .env
nano .env
```

Cole este conteúdo (ajuste com seus dados):
```env
DATABASE_URL="postgresql://u123456_agreste:SuaSenha@pgsql.locaweb.com.br:5432/u123456_agreste"
JWT_SECRET="MinhaChaveSecretaSuperSegura123456789012345678"
PORT=3001
NODE_ENV=production
CORS_ORIGIN=https://seu-dominio.vercel.app
```

Salvar: `Ctrl+X` → `Y` → `Enter`

```bash
# Gerar Prisma Client
npx prisma generate

# Executar migrações no banco Locaweb
npx prisma db push

# Criar usuário admin inicial
node scripts/create-admin.ts

# Testar (deve iniciar sem erros)
npm start
```

Se funcionou, pare (Ctrl+C) e continue:

```bash
# Iniciar com PM2 (mantém rodando 24/7)
pm2 start npm --name "agreste-api" -- start
pm2 startup
pm2 save

# Verificar status
pm2 status
pm2 logs agreste-api
```

### Configurar Nginx

```bash
nano /etc/nginx/sites-available/agreste
```

Cole:
```nginx
server {
    listen 80;
    server_name seu-ip-aqui;  # Trocar depois por domínio

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Ativar configuração
ln -s /etc/nginx/sites-available/agreste /etc/nginx/sites-enabled/
rm /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

# Configurar firewall
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable
```

**Teste:** Acesse `http://seu-ip-aqui/health` no navegador
- Deve retornar: `{"status":"ok"}`

---

## 🌐 PASSO 4: Deploy Frontend (Vercel - GRÁTIS)

### Criar conta Vercel

1. Acesse https://vercel.com
2. "Sign Up" com GitHub
3. Autorizar acesso

### Subir código no GitHub (se ainda não subiu)

```powershell
cd c:\wamp64\www\app-agreste

# Inicializar Git
git init
git add .
git commit -m "Projeto completo"

# Criar repositório no GitHub
# Vá em github.com → New Repository → "app-agreste"

# Conectar e subir
git remote add origin https://github.com/seu-usuario/app-agreste.git
git branch -M main
git push -u origin main
```

### Deploy no Vercel

1. No Vercel: "Add New" → "Project"
2. "Import Git Repository" → Selecionar `app-agreste`
3. Configurar:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Next.js
   - **Build Command:** `npm run build`
   - **Install Command:** `npm install`

4. **Environment Variables:**
   ```
   NEXT_PUBLIC_API_URL = http://seu-ip-vps:80
   ```
   (Trocaremos depois por HTTPS)

5. "Deploy"

6. Aguardar 3-5 minutos

7. Copiar URL: `https://agreste-xxx.vercel.app`

### Atualizar CORS no Backend

```bash
# No servidor VPS
nano /var/www/agreste-backend/.env
```

Alterar linha:
```env
CORS_ORIGIN=https://agreste-xxx.vercel.app
```

```bash
# Reiniciar
pm2 restart agreste-api
```

**Teste:** Acesse `https://agreste-xxx.vercel.app` → Fazer login

---

## 🔒 PASSO 5: Configurar Domínio e SSL (Opcional)

### Se você tem domínio (ex: agreste.com.br)

**No Vercel (Frontend):**
1. Project Settings → Domains
2. Add `agreste.com.br`
3. Configurar DNS conforme instruções

**No VPS (Backend):**
```bash
# Configurar domínio para apontar para VPS
# DNS: api.agreste.com.br → A → seu-ip-vps

# Após propagação DNS (1-24h):
nano /etc/nginx/sites-available/agreste
# Trocar: server_name seu-ip-aqui;
# Por: server_name api.agreste.com.br;

nginx -t && systemctl reload nginx

# Instalar SSL
certbot --nginx -d api.agreste.com.br

# Atualizar .env
nano .env
# CORS_ORIGIN=https://agreste.com.br
pm2 restart agreste-api
```

**No Vercel:**
- Environment Variables: `NEXT_PUBLIC_API_URL = https://api.agreste.com.br`
- Redeploy

---

## 💰 RESUMO DE CUSTOS

### Setup Recomendado:
```
PostgreSQL Locaweb:  R$ 15/mês (ou incluído)
Contabo VPS:         R$ 27/mês
Vercel:              R$ 0/mês ✅
─────────────────────────────────
TOTAL:              ~R$ 42/mês
```

### Alternativa 100% Gratuita:
```
PostgreSQL Locaweb:  R$ 15/mês (precisa pagar)
Oracle Cloud VPS:    R$ 0/mês ✅ (sempre gratuito)
Vercel:              R$ 0/mês ✅
─────────────────────────────────
TOTAL:              ~R$ 15/mês
```

---

## 📱 PASSO 6: Apps Mobile (Depois)

Quando o sistema web estiver 100% estável:

```powershell
cd c:\wamp64\www\app-agreste\frontend

# Instalar Capacitor
npm install @capacitor/cli @capacitor/core @capacitor/android @capacitor/ios

# Inicializar
npx cap init "Agreste Zeladoria" "br.com.agreste.zeladoria"

# Adicionar plataformas
npx cap add android
npx cap add ios

# Configurar API de produção
# Criar .env.production com URL real
echo "NEXT_PUBLIC_API_URL=https://api.agreste.com.br" > .env.production

# Build
npm run build

# Sincronizar
npx cap sync

# Abrir
npx cap open android  # Requer Android Studio
npx cap open ios      # Requer macOS + Xcode
```

---

## ✅ CHECKLIST FINAL

### Backend (VPS)
- [ ] VPS contratado e acessível
- [ ] Node.js e PM2 instalados
- [ ] Código enviado via Git/SFTP
- [ ] .env configurado com banco Locaweb
- [ ] Migrações executadas (`npx prisma db push`)
- [ ] PM2 rodando (`pm2 status`)
- [ ] Nginx configurado
- [ ] Firewall ativo
- [ ] `/health` respondendo

### Banco (Locaweb)
- [ ] PostgreSQL contratado
- [ ] Dados de conexão anotados
- [ ] String de conexão testada

### Frontend (Vercel)
- [ ] Código no GitHub
- [ ] Deploy no Vercel concluído
- [ ] Environment variable configurada
- [ ] Site acessível e funcionando
- [ ] Login/cadastro testados

### Opcional (Domínio)
- [ ] Domínio apontando para VPS e Vercel
- [ ] SSL configurado (certbot)
- [ ] HTTPS funcionando

---

## 🎯 Qual caminho seguir?

**Recomendo:**
1. **Contabo VPS (R$ 27/mês)** - Melhor custo-benefício
2. **PostgreSQL Locaweb** - Como você quer
3. **Vercel gratuito** - Frontend estável

**Total: ~R$ 42/mês definitivo**

**Alternativa 100% free:**
1. **Oracle Cloud (R$ 0)** - Mais trabalhoso setup
2. **PostgreSQL Locaweb (R$ 15/mês)** - Mínimo necessário
3. **Vercel (R$ 0)** - Frontend

**Total: ~R$ 15/mês definitivo**

Quer que eu te guie no setup da Contabo + Locaweb + Vercel? É a opção mais estável e sem dor de cabeça! 🚀
