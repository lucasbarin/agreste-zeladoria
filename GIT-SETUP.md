# 🚀 Instalação e Versionamento com Git

## 📥 PASSO 1: Instalar Git

### Baixar Git para Windows

1. Acesse: https://git-scm.com/download/win
2. Download automático começará (Git-2.43.0-64-bit.exe)
3. Execute o instalador
4. Configurações recomendadas:
   - ✅ Use Visual Studio Code as Git's default editor
   - ✅ Git from the command line and also from 3rd-party software
   - ✅ Use bundled OpenSSH
   - ✅ Use the OpenSSL library
   - ✅ Checkout Windows-style, commit Unix-style
   - ✅ Use MinTTY
   - ✅ Default (fast-forward or merge)
   - ✅ Git Credential Manager
   - ✅ Enable file system caching
   - ✅ Enable symbolic links

5. **Next → Next → Install**
6. **Fechar e reabrir o PowerShell** (importante!)

### Verificar instalação

```powershell
git --version
# Deve mostrar: git version 2.43.0 (ou similar)
```

## 🔧 PASSO 2: Configurar Git (Primeira Vez)

```powershell
# Configurar nome
git config --global user.name "Seu Nome"

# Configurar email
git config --global user.email "seu-email@exemplo.com"

# Verificar configuração
git config --list
```

## 📦 PASSO 3: Inicializar Repositório

```powershell
cd c:\wamp64\www\app-agreste

# Inicializar Git
git init

# Verificar
git status
```

## 🏷️ PASSO 4: Criar Versão 1.0

```powershell
# Adicionar todos os arquivos
git add .

# Fazer commit inicial
git commit -m "🎉 Release v1.0 - Sistema completo de gestão de ocorrências

Funcionalidades:
- Autenticação com aprovação de usuários
- Ocorrências com geolocalização e fotos
- Solicitações de serviços (trator, motosserra, carreta)
- Painel administrativo completo
- Sistema de notificações
- Integração WhatsApp
- Logs de auditoria
- Auto-conclusão de solicitações
- Upload de fotos
- Máscaras de input

Stack:
- Backend: Node.js + TypeScript + Express + Prisma
- Frontend: Next.js 16 + React + CapacitorJS
- Banco: SQLite (dev) / PostgreSQL (prod)
"

# Criar tag da versão 1.0
git tag -a v1.0.0 -m "Versão 1.0 - Release inicial"

# Ver histórico
git log --oneline

# Ver tags
git tag
```

## 🌐 PASSO 5: Subir no GitHub

### Criar repositório no GitHub

1. Acesse: https://github.com
2. Faça login ou crie conta
3. Clique no "+" no canto superior direito → "New repository"
4. Configurar:
   ```
   Repository name: agreste-zeladoria
   Description: Sistema de gestão de ocorrências - Residencial Recanto do Agreste
   Visibilidade: Private (recomendado)
   ❌ NÃO marque "Initialize with README"
   ```
5. **Create repository**

### Conectar e enviar código

```powershell
# Conectar com GitHub (use SEU usuário e repositório)
git remote add origin https://github.com/seu-usuario/agreste-zeladoria.git

# Renomear branch para main
git branch -M main

# Enviar código e tags
git push -u origin main
git push --tags

# Confirmar
git remote -v
```

### Autenticação GitHub

Se pedir senha:
1. Não é sua senha do GitHub
2. Use **Personal Access Token**
3. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
4. Generate new token (classic)
5. Marcar: `repo` (Full control of private repositories)
6. Generate token
7. **Copie o token** (só aparece uma vez!)
8. Use como senha quando o Git pedir

## 📝 PASSO 6: Comandos Úteis

```powershell
# Ver status
git status

# Ver histórico
git log --oneline --graph --all

# Criar nova branch (para desenvolvimento)
git checkout -b dev
git push -u origin dev

# Voltar para main
git checkout main

# Ver diferenças
git diff

# Adicionar arquivos específicos
git add backend/src/server.ts

# Fazer commit
git commit -m "Descrição da mudança"

# Enviar para GitHub
git push

# Atualizar do GitHub
git pull

# Ver branches
git branch -a

# Ver tags
git tag

# Criar nova tag (futuro)
git tag -a v1.1.0 -m "Versão 1.1"
git push --tags
```

## 🔄 Fluxo de Trabalho Recomendado

### Para novas funcionalidades:

```powershell
# 1. Criar branch de desenvolvimento
git checkout -b feature/nova-funcionalidade

# 2. Fazer alterações no código
# ... editar arquivos ...

# 3. Adicionar e commitar
git add .
git commit -m "Adicionar nova funcionalidade X"

# 4. Enviar para GitHub
git push -u origin feature/nova-funcionalidade

# 5. No GitHub: Criar Pull Request para main
# 6. Após aprovação: Merge e delete branch
# 7. Voltar para main e atualizar
git checkout main
git pull
```

### Para correções urgentes:

```powershell
# 1. Criar branch de hotfix
git checkout -b hotfix/corrigir-bug-critico

# 2. Corrigir bug
# 3. Commit e push
git add .
git commit -m "Corrigir bug crítico X"
git push -u origin hotfix/corrigir-bug-critico

# 4. Merge direto na main
git checkout main
git merge hotfix/corrigir-bug-critico
git push

# 5. Criar tag de patch
git tag -a v1.0.1 -m "Hotfix: Corrigir bug crítico"
git push --tags
```

## 📦 Estrutura de Versionamento

```
v1.0.0 → v1.0.1 → v1.1.0 → v2.0.0
 │         │         │         │
Major    Patch    Minor     Major
(breaking) (bug)   (feat)   (breaking)
```

- **Major (v2.0.0):** Mudanças grandes, quebra compatibilidade
- **Minor (v1.1.0):** Novas funcionalidades, compatível
- **Patch (v1.0.1):** Correções de bugs

## 🎯 Próximos Passos

Após instalar Git e criar v1.0:

1. ✅ Instalar Git
2. ✅ Configurar usuário
3. ✅ Criar repositório local
4. ✅ Fazer commit da v1.0
5. ✅ Criar tag v1.0.0
6. ✅ Criar repositório no GitHub
7. ✅ Fazer push do código
8. 📱 Continuar com deploy (DEPLOY-GRATIS.md)

---

**💡 Dica:** Sempre faça commit antes de grandes mudanças. Git é seu backup e histórico!

## 🆘 Resolver Problemas Comuns

### Git não reconhecido após instalação
```powershell
# Fechar e reabrir PowerShell
# Ou executar:
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

### Erro ao fazer push (senha)
- Use Personal Access Token, não senha
- GitHub → Settings → Developer settings → Tokens

### Arquivo muito grande
```powershell
# Remover do Git
git rm --cached arquivo-grande.zip
echo "arquivo-grande.zip" >> .gitignore
git add .gitignore
git commit -m "Ignorar arquivo grande"
```

### Desfazer último commit (local)
```powershell
git reset --soft HEAD~1
```

### Ver tamanho do repositório
```powershell
git count-objects -vH
```
