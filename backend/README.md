# Agreste Zeladoria - Backend

API REST para o sistema de gestão de ocorrências do condomínio Residencial Recanto do Agreste.

## 🚀 Tecnologias

- Node.js + TypeScript
- Express
- Prisma ORM
- SQLite (desenvolvimento)
- JWT para autenticação
- Multer para upload de imagens

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Gerar cliente do Prisma
npm run prisma:generate

# Executar migrations
npm run prisma:migrate

# Iniciar servidor em modo desenvolvimento
npm run dev
```

## 🌐 Endpoints

### Autenticação
- `POST /api/auth/register` - Cadastro de usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Usuário atual

### Ocorrências
- `POST /api/issues` - Criar ocorrência
- `GET /api/issues` - Listar ocorrências
- `GET /api/issues/:id` - Detalhes da ocorrência
- `PATCH /api/issues/:id/status` - Atualizar status (admin)

## 🔐 Variáveis de Ambiente

Copie `.env.example` para `.env` e configure:

- `DATABASE_URL` - URL do banco de dados
- `JWT_SECRET` - Chave secreta para JWT
- `PORT` - Porta do servidor (padrão: 3001)
