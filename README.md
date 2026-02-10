# 🚀 Recanto do Agreste

Sistema web + mobile para gestão de ocorrências e serviços do condomínio **Residencial Recanto do Agreste**.

![Status](https://img.shields.io/badge/status-produção-green)
![Node](https://img.shields.io/badge/node-18.x-brightgreen)
![TypeScript](https://img.shields.io/badge/typescript-5.x-blue)

---

## 📋 Sobre o Projeto

Sistema completo que permite:
- **Moradores:** Reportar problemas (ocorrências) com foto e GPS, solicitar serviços (trator, carreta, motosserra)
- **Administradores:** Visualizar em mapa interativo, gerenciar ocorrências, aprovar solicitações

---

## 🌐 Sistema em Produção

- **Frontend:** https://agreste-zeladoria.vercel.app (Vercel - grátis)
- **Backend:** https://agreste-zeladoria.onrender.com (Render - free tier)
- **Banco:** PostgreSQL no Render (expira em 90 dias)

---

## 🛠️ Stack Tecnológica

### Backend
- Node.js + Express + TypeScript
- Prisma ORM
- PostgreSQL (produção)
- JWT Authentication
- Multer (upload de imagens)

### Frontend/App
- Next.js 16 (App Router) + TypeScript
- Template Acorn (Bootstrap)
- Leaflet + OpenStreetMap (mapas)
- CapacitorJS (Android/iOS)

---

## 📦 Desenvolvimento Local

### Pré-requisitos
- Node.js 18+ (https://nodejs.org/)
- Git

### Setup Rápido

```bash
# 1. Clonar repositório
git clone https://github.com/lucasbarin/agreste-zeladoria.git
cd agreste-zeladoria

# 2. Backend
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npm run dev  # ou: npx tsx watch src/server.ts

# 3. Frontend (novo terminal)
cd frontend
npm install
npm run dev

# 4. Acessar
# Frontend: http://localhost:3000
# Backend: http://localhost:3001
```

---

## 📱 Gerar APK Android

```bash
cd frontend
npm run build
npx cap sync android
cd android
$env:JAVA_HOME="C:\Program Files\Android\Android Studio\jbr"
.\gradlew assembleRelease

# APK em: frontend/android/app/build/outputs/apk/release/app-release.apk
```

---

## � Estrutura do Projeto

```
app-agreste/
├── backend/              # API REST Node.js + TypeScript
│   ├── prisma/          # Schema do banco e migrations
│   ├── src/             # Código-fonte (controllers, routes, services)
│   └── uploads/         # Imagens (ocorrências, perfis)
│
├── frontend/            # Next.js + CapacitorJS
│   ├── src/app/         # Páginas (admin e morador)
│   ├── src/components/  # Componentes React reutilizáveis
│   ├── android/         # Projeto Android nativo
│   └── public/          # Assets (template Acorn)
│
├── !TEMPLATE/           # Template Acorn original (referência visual)
├── CHANGELOG.md         # Histórico de versões
└── CUSTOS-MENSAIS.md    # Análise de custos para manter online
```

---

## �📄 Documentação

- **[CHANGELOG.md](CHANGELOG.md)** - Histórico de versões
- **[CUSTOS-MENSAIS.md](CUSTOS-MENSAIS.md)** - Análise de custos para produção

---

## 🔑 Credenciais Padrão
