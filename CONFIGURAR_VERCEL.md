# ⚙️ Configurar Variáveis de Ambiente no Vercel

## 🚨 Erro 401 ou 500 ao fazer login?

Você precisa configurar as variáveis de ambiente no Vercel!

## 📋 Passo a Passo:

### 1. Acessar Configurações do Projeto

Acesse: https://vercel.com/leomachadopt/respira-oral/settings/environment-variables

### 2. Adicionar Variáveis

Adicione as seguintes variáveis de ambiente:

#### a) DATABASE_URL
- **Name:** `DATABASE_URL`
- **Value:**
```
postgresql://neondb_owner:npg_MgE8SU6PavnO@ep-cold-truth-adx3jks3-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
```
- **Environments:** ✅ Production, ✅ Preview, ✅ Development

#### b) JWT_SECRET
- **Name:** `JWT_SECRET`
- **Value:** `L8mFdQF3I8g05fYmJQRS58EmPXmWkcGALsYYjifo4SI`
- **Environments:** ✅ Production, ✅ Preview, ✅ Development

### 3. Fazer Redeploy

Após adicionar as variáveis, você PRECISA fazer redeploy:

**Opção A - Via Dashboard:**
1. Vá em: https://vercel.com/leomachadopt/respira-oral/deployments
2. Clique no último deployment
3. Clique nos 3 pontinhos (⋯)
4. Selecione "Redeploy"
5. Confirme

**Opção B - Via Git:**
```bash
git commit --allow-empty -m "chore: Trigger redeploy"
git push
```

### 4. Testar Login

Após o redeploy, teste o login:

**Credenciais:**
- Email: `leomachadopt@gmail.com`
- Senha: `Admin123!`

## 🔍 Verificar se Funcionou

Teste com curl:

```bash
curl -X POST https://respiracaooral.pt/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"leomachadopt@gmail.com","password":"Admin123!"}'
```

**Resposta esperada (sucesso):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "leomachadopt@gmail.com",
    "name": "Leonardo Machado",
    "role": "super_admin"
  }
}
```

## ⚠️ Erros Comuns

### Erro 401 - Unauthorized
- Senha incorreta
- Usuário não existe
- Usuário está inativo

### Erro 500 - Internal Server Error
- `DATABASE_URL` não configurada no Vercel ❌
- `JWT_SECRET` não configurada no Vercel ❌
- Não fez redeploy após adicionar variáveis ❌

## ✅ Checklist Final

- [ ] `DATABASE_URL` adicionada no Vercel
- [ ] `JWT_SECRET` adicionada no Vercel
- [ ] Redeploy feito após adicionar variáveis
- [ ] Aguardou deploy completar (1-2 minutos)
- [ ] Testou login no site

---

💡 **Dica:** Após login bem-sucedido, altere a senha padrão `Admin123!` por segurança!
