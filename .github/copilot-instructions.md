# Recanto do Agreste - Guia para Agentes de IA

## Visão Geral do Projeto

Sistema web + mobile (iOS/Android) para o condomínio **Residencial Recanto do Agreste**, permitindo moradores reportarem problemas em áreas comuns e gestores gerenciarem as ocorrências.

**Nome do sistema:** Agreste Zeladoria

## Arquitetura e Stack Tecnológica

### Stack Definida
- **Frontend/App:** React + Vite ou Next.js com TypeScript
- **Mobile:** CapacitorJS para conversão em apps nativos iOS/Android
- **Backend:** Node.js + TypeScript (Express ou NestJS)
- **ORM:** Prisma
- **Banco de Dados:** SQLite (dev) / PostgreSQL (prod)
- **Mapas:** Leaflet + OpenStreetMap

### Estrutura do Projeto (Monorepo)
```
/backend          # API Node.js + TypeScript
/frontend         # App React/Next.js + Capacitor
/!TEMPLATE        # Template Acorn HTML (referência visual - NÃO MODIFICAR)
/uploads/issues   # Armazenamento local de imagens
```

## Regra Crítica: Template Visual

**OBRIGATÓRIO:** O visual DEVE ser baseado no template `!TEMPLATE\Source\Html\acorn-html-classic-dashboard\`

- **Preservar:** Layout, componentes, cores e identidade visual do Acorn Classic Dashboard
- **Reutilizar:** CSS, JS, componentes do template em HTML puro ou adaptados para React/Next.js
- **Proibido:** Criar layouts do zero - sempre partir do template existente
- **Aplicação:** Tanto área admin quanto área de moradores (ajustando apenas menus/permissões)

Ao adaptar o template, sempre explicar:
- O que foi reaproveitado
- O que foi reestruturado (ex: HTML → componentes React)

## Modelo de Dados

### Tabela `users`
```typescript
{
  id: string
  name: string
  email: string
  password_hash: string
  role: 'resident' | 'admin'
  apartment_or_house?: string
  created_at: Date
}
```

### Tabela `issues`
```typescript
{
  id: string
  user_id: string
  type: 'poste_com_luz_queimada' | 'buraco_na_rua' | 'sujeira_ou_entulho'
  description?: string
  latitude: number
  longitude: number
  photo_url?: string
  status: 'aberto' | 'em_andamento' | 'resolvido'
  created_at: Date
  updated_at: Date
}
```

## Funcionalidades Principais

### 1. Autenticação
- Login com e-mail e senha
- Dois perfis: `resident` (morador) e `admin` (gestor)
- Recuperação de senha (inicialmente mock)

### 2. Área do Morador
- **Criar ocorrência:** tipo, descrição, localização (GPS + mapa ajustável), foto (câmera/galeria via Capacitor)
- **Listar ocorrências:** apenas do próprio usuário, com filtros por status/tipo/data
- **Detalhes:** visualizar ocorrência com mapa e foto

### 3. Painel Administrativo
- **Dashboard:** mapa com todas as ocorrências (marcadores clicáveis)
- **Tabela:** listagem com filtros (tipo, status, data)
- **Gestão:** alterar status das ocorrências (aberto → em_andamento → resolvido)
- **Estrutura:** preparar para notificações futuras (placeholder)

## Padrões de Desenvolvimento

### Comandos Esperados
- Backend: `npm run dev` (porta 3000 ou similar)
- Frontend: `npm run dev` (porta 5173 para Vite)
- Capacitor: `npx cap sync` → `npx cap open ios/android`

### Upload de Imagens
- Salvar localmente em `/uploads/issues`
- Retornar URL pública relativa
- Estrutura preparada para migração futura (ex: AWS S3)

### Geolocalização e Mapas
- Capturar localização atual do dispositivo via Capacitor Geolocation
- Exibir marcador ajustável no mapa (Leaflet)
- Armazenar latitude/longitude no banco

### Mobile (Capacitor)
- Integração com câmera e galeria: `@capacitor/camera`
- Geolocalização: `@capacitor/geolocation`
- Builds: `npx cap build ios/android`

## Fluxo de Desenvolvimento

Projeto conduzido em etapas sequenciais:
1. **Setup inicial** - Stack, estrutura, integração template Acorn, Capacitor
2. **Autenticação** - Login, registro, JWT
3. **Ocorrências** - CRUD, mapa, geolocalização, upload de fotos
4. **Painel admin** - Dashboard, tabela, gestão de status
5. **Refinos** - Melhorias, testes, deploy

## Convenções de Código

- **Idioma:** Português (Brasil) para variáveis, comentários e mensagens
- **TypeScript:** Sempre tipar interfaces e tipos
- **Componentes:** Nomes em PascalCase (ex: `IssueList.tsx`)
- **Rotas API:** RESTful (ex: `POST /api/issues`, `GET /api/issues/:id`)

## Contexto do Usuário

- **Perfil:** Não é desenvolvedor profissional
- **Necessidades:** 
  - Explicações breves e claras
  - Código completo e funcional
  - Comandos explícitos para executar
  - Sugestões de boas práticas

## Documentação de Referência

- CapacitorJS: https://capacitorjs.com/docs
- Template base: `!TEMPLATE\Source\Html\acorn-html-classic-dashboard\`
