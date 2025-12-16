# 🚀 Agreste Zeladoria

Sistema completo (web + mobile) para gestão de ocorrências do condomínio **Residencial Recanto do Agreste**.

![Status](https://img.shields.io/badge/status-em_desenvolvimento-yellow)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![TypeScript](https://img.shields.io/badge/typescript-5.3-blue)

---

## 📋 Sobre o Projeto

Sistema que permite aos moradores reportarem problemas nas áreas comuns (postes queimados, buracos, lixo) com localização via GPS e fotos. Gestores visualizam em mapa interativo e gerenciam as ocorrências.

### Funcionalidades Principais

**Moradores:**
- 📝 Registrar ocorrências com foto e localização GPS
- 📍 Ajustar localização no mapa
- 📊 Acompanhar status das suas ocorrências

**Administradores:**
- 🗺️ Visualizar todas as ocorrências em mapa
- 📋 Gerenciar e filtrar ocorrências
- 🔄 Alterar status (aberto → em andamento → resolvido)

---

## 🛠️ Tecnologias

### Backend
- Node.js + Express + TypeScript
- Prisma ORM
- SQLite (dev) / PostgreSQL (prod)
- JWT Authentication
- Multer (upload de imagens)

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS + Template Acorn
- Leaflet (mapas)
- Axios

### Mobile
- CapacitorJS
- Plugins: Camera, Geolocation

---

## 📦 Instalação

### Pré-requisitos

⚠️ **Você precisa instalar o Node.js primeiro!**

1. Baixe em: https://nodejs.org/ (versão LTS)
2. Instale e reinicie o terminal
3. Verifique: `node --version` e `npm --version`

### Configuração

Siga as instruções detalhadas em:
- **[INSTALL.md](INSTALL.md)** - Guia completo de instalação
- **[FRONTEND-SETUP.md](FRONTEND-SETUP.md)** - Setup do frontend

**Resumo rápido:**

```bash
# 1. Backend
cd backend
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev

# 2. Frontend (em outro terminal)
npx create-next-app@latest frontend --typescript --tailwind --app
cd frontend
npm install axios leaflet react-leaflet @capacitor/core @capacitor/camera @capacitor/geolocation
npm run dev
```

---

## 🌐 Acesso

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001
- **API Health:** http://localhost:3001/health
- **Prisma Studio:** `npm run prisma:studio` (no backend)

---

## 📁 Estrutura do Projeto

```
app-agreste/
├── backend/           # API REST Node.js
│   ├── prisma/       # Schema e migrations
│   ├── src/          # Código-fonte
│   └── uploads/      # Imagens das ocorrências
│
├── frontend/         # Aplicação Next.js + Capacitor
│   ├── src/app/      # Páginas e rotas
│   ├── src/components/ # Componentes React
│   └── public/       # Assets do template Acorn
│
├── !TEMPLATE/        # Template Acorn (NÃO MODIFICAR)
│   └── Source/Html/acorn-html-classic-dashboard/
│
├── INSTALL.md        # Guia de instalação
├── STATUS.md         # Status atual do desenvolvimento
└── README.md         # Este arquivo
```

---

## 🎨 Design

O projeto utiliza o template **Acorn HTML Classic Dashboard** como base visual:
- Localização: `!TEMPLATE\Source\Html\acorn-html-classic-dashboard\`
- Componentes: Bootstrap 5 customizado
- Tema: Moderno, limpo e responsivo

---

## 🗃️ Banco de Dados

### Modelo de Dados

**Users (Usuários)**
```typescript
{
  id: uuid
  name: string
  email: string (unique)
  password_hash: string
  role: 'resident' | 'admin'
  apartment_or_house?: string
  created_at: datetime
}
```

**Issues (Ocorrências)**
```typescript
{
  id: uuid
  user_id: uuid (FK)
  type: 'poste_com_luz_queimada' | 'buraco_na_rua' | 'sujeira_ou_entulho'
  description?: string
  latitude: float
  longitude: float
  photo_url?: string
  status: 'aberto' | 'em_andamento' | 'resolvido'
  created_at: datetime
}
```

---

## 🔐 Autenticação

- Sistema de login com JWT
- Dois tipos de usuário: `resident` (morador) e `admin` (gestor)
- Tokens com validade de 7 dias
- Proteção de rotas por role

---

## 📱 Mobile (CapacitorJS)

```bash
# Sincronizar código web com apps nativos
npx cap sync

# Abrir no Android Studio
npx cap open android

# Abrir no Xcode (macOS)
npx cap open ios

# Build para produção
npm run build
npx cap sync
```

---

## 🧪 Status do Desenvolvimento

Veja **[STATUS.md](STATUS.md)** para detalhes completos.

### ✅ Concluído
- Estrutura completa do backend
- Configuração do Prisma
- Schema do banco de dados
- Sistema de upload
- Documentação

### ⏳ Em Progresso
- Aguardando instalação do Node.js
- Setup do frontend Next.js
- Adaptação do template Acorn

### 📋 Próximo
- Implementação de autenticação
- CRUD de ocorrências
- Integração com mapas
- Painel administrativo

---

## 📖 Documentação Adicional

- **[.github/copilot-instructions.md](.github/copilot-instructions.md)** - Guia para agentes de IA
- **[backend/README.md](backend/README.md)** - Documentação da API
- **[instructions.txt](instructions.txt)** - Requisitos originais do projeto

---

## 🤝 Desenvolvimento

Este projeto está sendo desenvolvido com assistência de IA, seguindo as melhores práticas de:
- Clean Code
- Arquitetura em camadas
- Type Safety (TypeScript)
- Documentação clara
- Commits semânticos

---

## 📄 Licença

MIT License - Projeto privado do condomínio Residencial Recanto do Agreste

---

## 🚧 Próximos Passos

1. ✅ **Você está aqui:** Instalar Node.js
2. ⏳ Executar comandos de instalação
3. ⏳ Testar backend (health check)
4. ⏳ Criar e configurar frontend
5. ⏳ Implementar autenticação
6. ⏳ Desenvolver funcionalidades principais

---

**💡 Dica:** Comece lendo o arquivo **INSTALL.md** após instalar o Node.js!
