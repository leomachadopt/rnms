# 🔐 Configuração de Usuário Administrador

## Credenciais do Admin

**Email:** `leomachadopt@gmail.com`
**Senha:** `Admin123!`
**Role:** `super_admin`
**Nome:** Leonardo Machado

---

## Método 1: Via API Endpoint (Recomendado)

### Passo 1: Inicie o servidor de desenvolvimento

```bash
npm run dev:api
```

### Passo 2: Execute o comando para criar o admin

```bash
curl -X POST http://localhost:3000/api/auth/create-admin \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: create-admin-rns-2024"
```

### Resposta esperada:

```json
{
  "message": "Usuário criado com sucesso",
  "user": {
    "id": 1,
    "email": "leomachadopt@gmail.com",
    "name": "Leonardo Machado",
    "role": "super_admin"
  },
  "action": "created"
}
```

Se o usuário já existir, a senha será atualizada:

```json
{
  "message": "Usuário atualizado com sucesso",
  "user": {
    "email": "leomachadopt@gmail.com",
    "name": "Leonardo Machado",
    "role": "super_admin"
  },
  "action": "updated"
}
```

---

## Método 2: Via Script Node (se DATABASE_URL estiver configurada)

```bash
npm run create-admin
```

**Nota:** Requer que a variável `DATABASE_URL` esteja definida em `.env.local`

---

## Método 3: Produção (Vercel)

### Em produção, você pode criar o admin via curl:

```bash
curl -X POST https://seu-dominio.vercel.app/api/auth/create-admin \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: create-admin-rns-2024"
```

**⚠️ IMPORTANTE DE SEGURANÇA:**

Após criar o usuário admin em produção, você deve:

1. **Deletar ou desativar** o endpoint `/api/auth/create-admin.ts`
2. Ou alterar a chave secreta `ADMIN_CREATION_SECRET` nas variáveis de ambiente da Vercel

---

## Teste de Login

Após criar o usuário, teste o login:

1. Acesse: `http://localhost:3000/login` (dev) ou `https://seu-dominio.com/login` (prod)
2. Digite:
   - **Email:** `leomachadopt@gmail.com`
   - **Senha:** `Admin123!`
3. Clique em "Entrar"
4. Você deve ser redirecionado para `/admin`

---

## Verificação no Banco de Dados

Se tiver acesso ao Drizzle Studio:

```bash
npm run db:studio
```

Acesse: http://localhost:4983

Vá para a tabela `users` e verifique se o usuário foi criado com:
- email: `leomachadopt@gmail.com`
- role: `super_admin`
- active: `1`
- password: (hash bcrypt)

---

## Troubleshooting

### Erro: "Acesso negado"

Certifique-se de incluir o header correto:
```bash
-H "x-admin-secret: create-admin-rns-2024"
```

### Erro: "DATABASE_URL não está definida"

1. Verifique se o arquivo `.env.local` existe
2. Adicione a variável `DATABASE_URL` com a string de conexão do Neon:
   ```
   DATABASE_URL=postgresql://user:password@host/database?sslmode=require
   ```
3. Ou use o Método 1 (API endpoint) que funciona em ambiente de desenvolvimento da Vercel

### Erro: "Erro ao conectar ao banco de dados"

Verifique:
1. Conexão com internet
2. Credenciais do Neon corretas
3. Banco de dados está online no painel do Neon

---

## Segurança

### Produção - Checklist de Segurança:

- [ ] Criar usuário admin via endpoint protegido
- [ ] Deletar ou desativar `/api/auth/create-admin.ts`
- [ ] Alterar `ADMIN_CREATION_SECRET` no Vercel
- [ ] Testar login com as credenciais
- [ ] Verificar que apenas `super_admin` tem acesso total
- [ ] Configurar 2FA (futuro)

### Mudança de Senha

Para alterar a senha do admin após criação inicial:

1. Faça login como admin
2. Acesse `/admin/users`
3. Edite o usuário `leomachadopt@gmail.com`
4. Digite nova senha
5. Salve

---

## Arquivos Relacionados

- **API de criação:** `api/auth/create-admin.ts`
- **Script local:** `scripts/create-admin.ts`
- **API de login:** `api/auth/login.ts`
- **Contexto de auth:** `src/contexts/AuthContext.tsx`
- **Schema do DB:** `api/db/schema.ts`

---

## Próximos Passos

Após criar o admin e fazer login:

1. Acesse `/admin/users` para gerenciar outros usuários
2. Crie usuários com role `editor` para equipe
3. Configure permissões conforme necessário
4. Teste fluxo completo de autenticação
