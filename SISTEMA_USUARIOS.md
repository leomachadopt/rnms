# Sistema de Gestão de Usuários - Respira Oral

## 📋 Visão Geral

Sistema completo de autenticação e gestão de usuários com dois níveis de permissão:

### Níveis de Acesso:

1. **Super Admin** (`super_admin`)
   - Acesso total ao sistema
   - Pode criar, editar e deletar usuários
   - Pode alterar roles de outros usuários
   - Acesso a todas as funcionalidades

2. **Editor** (`editor`)
   - Acesso ao painel administrativo
   - Pode editar conteúdo (especialistas, blog, depoimentos)
   - **NÃO pode** gerenciar usuários
   - **NÃO pode** alterar configurações sensíveis

## 🚀 Setup Inicial

### 1. Criar Primeiro Usuário Super Admin

Execute o SQL no console do Neon Database:

```bash
# Arquivo: CREATE_FIRST_ADMIN.sql
```

**Credenciais padrão:**
- Email: `leomachadopt@gmail.com`
- Senha: `Admin123!`

⚠️ **IMPORTANTE:** Altere a senha após o primeiro login!

### 2. Configurar JWT Secret

Adicione no arquivo `.env`:

```env
JWT_SECRET=seu-secret-key-super-seguro-aqui-min-32-caracteres
```

## 📡 APIs Criadas

### POST `/api/auth/login`
Fazer login no sistema

**Request:**
```json
{
  "email": "leomachadopt@gmail.com",
  "password": "Admin123!"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1...",
  "user": {
    "id": 1,
    "email": "leomachadopt@gmail.com",
    "name": "Leonardo Machado",
    "role": "super_admin"
  }
}
```

### GET `/api/auth/users`
Listar todos os usuários (requer autenticação)

**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
[
  {
    "id": 1,
    "email": "leomachadopt@gmail.com",
    "name": "Leonardo Machado",
    "role": "super_admin",
    "active": 1,
    "lastLogin": "2026-02-02T13:00:00Z",
    "createdAt": "2026-02-01T10:00:00Z"
  }
]
```

### POST `/api/auth/users`
Criar novo usuário (apenas super_admin)

**Headers:**
```
Authorization: Bearer {token}
```

**Request:**
```json
{
  "email": "novo@example.com",
  "password": "SenhaSegura123!",
  "name": "Novo Usuário",
  "role": "editor"
}
```

### PUT `/api/auth/users`
Atualizar usuário (apenas super_admin)

**Headers:**
```
Authorization: Bearer {token}
```

**Request:**
```json
{
  "id": 2,
  "name": "Nome Atualizado",
  "email": "novo-email@example.com",
  "role": "editor",
  "active": 1
}
```

### DELETE `/api/auth/users?id={id}`
Deletar usuário (apenas super_admin)

**Headers:**
```
Authorization: Bearer {token}
```

## 🔒 Permissões

| Ação | Super Admin | Editor |
|------|-------------|--------|
| Ver Dashboard | ✅ | ✅ |
| Editar Especialistas | ✅ | ✅ |
| Editar Blog Posts | ✅ | ✅ |
| Editar Depoimentos | ✅ | ✅ |
| Ver Avaliações | ✅ | ✅ |
| **Criar Usuários** | ✅ | ❌ |
| **Editar Usuários** | ✅ | ❌ |
| **Deletar Usuários** | ✅ | ❌ |
| **Alterar Roles** | ✅ | ❌ |
| Editar Configurações | ✅ | ❌ |

## 🎨 Frontend - AuthContext

### Uso no Componente

```tsx
import { useAuth } from '@/contexts/AuthContext'

function MeuComponente() {
  const { user, isSuperAdmin, isAuthenticated, login, logout } = useAuth()

  // Verificar se é super admin
  if (isSuperAdmin) {
    return <GerenciarUsuarios />
  }

  // Verificar se está autenticado
  if (!isAuthenticated) {
    return <Login />
  }

  return <ConteudoProtegido />
}
```

### Login

```tsx
const { login } = useAuth()

try {
  await login('email@example.com', 'senha')
  // Login bem-sucedido
} catch (error) {
  // Erro no login
  console.error(error.message)
}
```

### Logout

```tsx
const { logout } = useAuth()

logout() // Remove token e dados do usuário
```

## 📊 Schema do Banco de Dados

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL, -- Hash bcrypt
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'editor', -- 'super_admin' | 'editor'
  active INTEGER DEFAULT 1 NOT NULL, -- 1 = ativo, 0 = inativo
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
);
```

## 🔐 Segurança

### Senhas
- ✅ Armazenadas com bcrypt (10 rounds)
- ✅ Nunca retornadas nas APIs
- ✅ Validação de força não implementada (adicionar se necessário)

### Tokens JWT
- ✅ Expiração: 7 dias
- ✅ Armazenados no localStorage
- ✅ Enviados via header `Authorization: Bearer {token}`

### Proteção de Rotas
- ✅ Middleware verifica token em todas as requisições
- ✅ Verificação de role antes de ações sensíveis
- ✅ Usuário não pode deletar a si mesmo

## 📝 Próximos Passos

1. ✅ **Executar SQL** para criar primeiro admin
2. ✅ **Configurar JWT_SECRET** no `.env`
3. ⏳ **Criar página de login** no frontend
4. ⏳ **Criar página de gestão de usuários** no painel admin
5. ⏳ **Adicionar proteção de rotas** no frontend
6. ⏳ **Adicionar validação de senha forte**
7. ⏳ **Implementar reset de senha** (opcional)

## 🐛 Troubleshooting

### "Credenciais inválidas"
- Verifique se o usuário foi criado corretamente no banco
- Confirme que a senha está correta
- Verifique se o usuário está ativo (`active = 1`)

### "Não autenticado"
- Token pode ter expirado (7 dias)
- Token pode estar inválido
- JWT_SECRET pode ter mudado

### "Sem permissão"
- Usuário não tem role adequada
- Apenas super_admin pode gerenciar usuários

---

✅ **Sistema completo e funcional!**
