# Guia de Deploy - Agreste Zeladoria

## 📦 Deploy do Backend (Oracle Cloud - GRÁTIS)

### 1. Criar conta no Oracle Cloud
- Acesse: https://www.oracle.com/br/cloud/free/
- Crie uma conta (sempre gratuito - Always Free)
- Confirme e-mail e telefone

### 2. Criar Instância VM
1. No painel, vá em "Compute" → "Instances"
2. Clique em "Create Instance"
3. Configure:
   - **Name**: agreste-backend
   - **Image**: Ubuntu 22.04
   - **Shape**: VM.Standard.A1.Flex (ARM - 4 OCPUs, 24GB RAM - GRÁTIS)
   - **Network**: Use a rede padrão
   - **SSH Keys**: Baixe a chave privada (.key)
   
4. Aguarde criar (~5 minutos)
5. Copie o IP público

### 3. Configurar Firewall
1. Na instância, vá em "Subnet" → "Security List"
2. Adicione regras de entrada:
   - Porta 80 (HTTP)
   - Porta 443 (HTTPS)
   - Porta 3001 (Backend temporário)

### 4. Acessar servidor via SSH
```bash
ssh -i caminho/para/chave.key ubuntu@SEU_IP_PUBLICO
```

### 5. Instalar dependências no servidor
```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Instalar PM2
sudo npm install -g pm2

# Instalar Nginx
sudo apt install -y nginx

# Instalar Git
sudo apt install -y git
```

### 6. Fazer upload do código
**Opção 1 - Via Git:**
```bash
cd /home/ubuntu
git clone https://github.com/lucasbarin/agreste-zeladoria.git
cd agreste-zeladoria/backend
```

**Opção 2 - Via SCP (do seu PC):**
```bash
scp -i chave.key -r C:\wamp64\www\app-agreste\backend ubuntu@SEU_IP:/home/ubuntu/
```

### 7. Configurar backend no servidor
```bash
cd /home/ubuntu/agreste-zeladoria/backend

# Instalar dependências
npm install --production

# Criar arquivo .env
nano .env
```

Cole no .env:
```env
DATABASE_URL="postgresql://agresteapp:qCRF#Yn7@IT1u5@agresteapp.postgresql.dbaas.com.br:5432/agresteapp?schema=public"
JWT_SECRET="agreste-zeladoria-production-secret-2024"
NODE_ENV=production
PORT=3001
CORS_ORIGIN=*
```

Salve: `Ctrl+X` → `Y` → `Enter`

### 8. Gerar Prisma Client e iniciar
```bash
# Gerar Prisma
npx prisma generate

# Construir aplicação
npm run build

# Iniciar com PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### 9. Configurar Nginx
```bash
sudo nano /etc/nginx/sites-available/agreste
```

Cole:
```nginx
server {
    listen 80;
    server_name SEU_IP_PUBLICO;

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

Ativar e reiniciar:
```bash
sudo ln -s /etc/nginx/sites-available/agreste /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 10. Testar
Acesse: `http://SEU_IP_PUBLICO/health`

Deve retornar: `{"status":"ok"}`

---

## 🚀 Deploy do Frontend (Vercel - GRÁTIS)

### 1. Criar conta no Vercel
- Acesse: https://vercel.com
- Faça login com GitHub

### 2. Importar projeto
1. Clique em "Add New Project"
2. Selecione o repositório: `lucasbarin/agreste-zeladoria`
3. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

### 3. Adicionar variável de ambiente
Em "Environment Variables", adicione:
```
NEXT_PUBLIC_API_URL=http://SEU_IP_ORACLE
```

### 4. Deploy
- Clique em "Deploy"
- Aguarde ~2 minutos
- Vercel vai gerar uma URL: `https://agreste-zeladoria-xxx.vercel.app`

### 5. Atualizar CORS no backend
No servidor Oracle, edite o .env:
```bash
cd /home/ubuntu/agreste-zeladoria/backend
nano .env
```

Mude:
```env
CORS_ORIGIN=https://agreste-zeladoria-xxx.vercel.app
```

Reinicie:
```bash
pm2 restart agreste-backend
```

---

## ✅ Sistema no ar!

- **Frontend**: https://agreste-zeladoria-xxx.vercel.app
- **Backend**: http://SEU_IP_ORACLE
- **Banco**: PostgreSQL Locaweb

### Custos mensais: R$ 0,00 🎉

---

## 📱 Apps Mobile (iOS/Android)

Depois do sistema web funcionando, podemos gerar os apps!

