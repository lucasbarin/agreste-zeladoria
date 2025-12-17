# 🚀 GUIA RÁPIDO DE DEPLOY - Para Iniciantes

## ✅ O que você já tem pronto:
- ✅ Backend funcionando com PostgreSQL Locaweb
- ✅ Frontend funcionando localmente
- ✅ Código no GitHub
- ✅ Banco de dados configurado

---

## 📋 PRÓXIMOS PASSOS (Vamos fazer juntos!)

### PASSO 5: Deploy do Backend (Oracle Cloud - GRÁTIS PARA SEMPRE)

#### 5.1 - Criar conta Oracle Cloud
1. Acesse: https://www.oracle.com/br/cloud/free/
2. Clique em "Start for free"
3. Preencha seus dados
4. **Atenção**: Use cartão de crédito internacional (não será cobrado)
5. Confirme e-mail

#### 5.2 - Criar máquina virtual (servidor)
1. Faça login no Oracle Cloud
2. Menu → **Compute** → **Instances** → **Create Instance**
3. Configure:
   - **Name**: `agreste-backend`
   - **Image**: Ubuntu 22.04
   - **Shape**: Clique em "Change Shape"
     - Escolha: **VM.Standard.A1.Flex**
     - **OCPUs**: 2 (ou até 4 grátis)
     - **Memory**: 12 GB (ou até 24 GB grátis)
   - **SSH Keys**: 
     - Clique em "Save Private Key" - GUARDE ESSE ARQUIVO!
     - Salve como: `agreste-chave.key`
4. Clique em **Create**
5. Aguarde 3-5 minutos até ficar "Running"
6. **Copie o IP Público** (algo como: 150.230.x.x)

#### 5.3 - Abrir portas no firewall
1. Na sua instância, clique na **Subnet**
2. Clique na **Default Security List**
3. Clique em **Add Ingress Rules**
4. Adicione 3 regras:

**Regra 1 - HTTP:**
- Source CIDR: `0.0.0.0/0`
- Destination Port: `80`
- Clique em "Add Ingress Rules"

**Regra 2 - HTTPS:**
- Source CIDR: `0.0.0.0/0`
- Destination Port: `443`
- Clique em "Add Ingress Rules"

**Regra 3 - Backend (temporário):**
- Source CIDR: `0.0.0.0/0`
- Destination Port: `3001`
- Clique em "Add Ingress Rules"

#### 5.4 - ME AVISE QUANDO CHEGAR AQUI!

Quando tiver:
- ✅ Conta Oracle criada
- ✅ VM criada e rodando
- ✅ IP público copiado
- ✅ Chave SSH baixada
- ✅ Portas abertas

**Me mande o IP público** e vou te ajudar a fazer o upload do código e configurar tudo!

---

### PASSO 6: Deploy do Frontend (Vercel - GRÁTIS)

Esse é mais fácil! Vamos fazer depois do backend estar no ar.

---

## 💰 Custos:
- **Oracle Cloud**: R$ 0/mês (Always Free)
- **Vercel**: R$ 0/mês (Free tier)
- **PostgreSQL Locaweb**: Já pago ✅
- **Total**: R$ 0/mês para hospedar tudo! 🎉

---

## 🤔 Dúvidas?

Me chame em qualquer etapa que eu te ajudo!

**Vamos começar?** 
👉 Comece pelo passo 5.1 (criar conta Oracle Cloud)
