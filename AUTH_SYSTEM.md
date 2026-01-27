# 🔐 Sistema de Autenticação - Documentação

## Visão Geral

Sistema completo de autenticação implementado para proteger a área administrativa do site. Apenas usuários autenticados têm acesso ao painel `/admin`.

## 🎯 Funcionalidades Implementadas

### 1. **Página de Login** (`/login`)
- Interface moderna e responsiva
- Campos de email e senha com validação
- Ícones visuais para melhor UX
- Loading state durante autenticação
- Mensagens de erro/sucesso via toast
- Design gradiente azul harmonioso

### 2. **Contexto de Autenticação** (`AuthContext`)
- Gerenciamento global do estado de autenticação
- Persistência de sessão no localStorage
- Expiração automática após 24 horas
- Verificação de autenticação ao carregar app
- Funções de login e logout

### 3. **Rota Protegida** (`ProtectedRoute`)
- HOC que protege rotas administrativas
- Redireciona para `/login` se não autenticado
- Tela de loading durante verificação
- Previne acesso direto via URL

### 4. **Botão de Logout**
- Localizado na sidebar do admin (desktop e mobile)
- Estilo visual em vermelho para destaque
- Confirmação via toast
- Redirecionamento automático para login

## 🔑 Credenciais de Acesso

### Usuário Administrador
```
Email: leomachadopt@gmail.com
Senha: Admin123!
```

⚠️ **IMPORTANTE**: Estas credenciais estão hardcoded no arquivo `AuthContext.tsx`. Em produção, isso deveria ser substituído por autenticação com backend.

## 🏗️ Arquitetura

### Estrutura de Arquivos
```
src/
├── contexts/
│   └── AuthContext.tsx          # Contexto de autenticação
├── components/
│   └── ProtectedRoute.tsx       # HOC para rotas protegidas
├── pages/
│   └── Login.tsx                # Página de login
└── App.tsx                      # Integração das rotas
```

### Fluxo de Autenticação

1. **Acesso à Rota Protegida**
   ```
   Usuário tenta acessar /admin
   → ProtectedRoute verifica autenticação
   → Se não autenticado: redireciona para /login
   → Se autenticado: renderiza página
   ```

2. **Login**
   ```
   Usuário envia credenciais
   → AuthContext valida
   → Se válido: salva no localStorage + redireciona
   → Se inválido: mostra erro
   ```

3. **Persistência**
   ```
   App carrega
   → AuthContext lê localStorage
   → Verifica se sessão não expirou
   → Restaura estado de autenticação
   ```

4. **Logout**
   ```
   Usuário clica em "Sair"
   → AuthContext limpa sessão
   → Remove do localStorage
   → Redireciona para /login
   ```

## 🛡️ Segurança

### Implementado
- ✅ Rotas protegidas via React Router
- ✅ Persistência segura no localStorage
- ✅ Expiração automática de sessão (24h)
- ✅ Validação de formulário com Zod
- ✅ Feedback visual de erros
- ✅ Loading states

### Limitações Atuais
- ⚠️ Credenciais hardcoded no frontend
- ⚠️ Sem hash de senha
- ⚠️ Sem refresh token
- ⚠️ Sem proteção contra ataques de força bruta
- ⚠️ Sem 2FA

### Melhorias Recomendadas para Produção

1. **Backend de Autenticação**
   ```typescript
   // Substituir validação local por API
   const login = async (email: string, password: string) => {
     const response = await fetch('/api/auth/login', {
       method: 'POST',
       body: JSON.stringify({ email, password })
     })
     const { token } = await response.json()
     return token
   }
   ```

2. **JWT Token**
   - Usar JSON Web Tokens
   - Armazenar token seguro
   - Refresh token para renovação
   - Validação no backend

3. **Proteção de API**
   - Adicionar middleware de autenticação
   - Validar token em cada requisição
   - Rate limiting
   - CORS configurado

4. **Segurança Adicional**
   - Hash de senhas (bcrypt)
   - HTTPS obrigatório
   - Cookie HTTP-only para token
   - 2FA (Two-Factor Authentication)
   - Recuperação de senha
   - Logs de acesso

## 📱 Experiência do Usuário

### Desktop
- Página de login centralizada
- Sidebar com botão de logout
- Transições suaves
- Feedback visual claro

### Mobile
- Layout responsivo
- Sidebar em drawer
- Touch-friendly
- Mesmas funcionalidades

## 🎨 Design

### Página de Login
- Gradiente azul suave
- Card centralizado com sombra
- Ícones nos campos
- Animação de fade-in
- Loading spinner no botão

### Tela de Loading
- Spinner centralizado
- Mensagem "Verificando autenticação..."
- Transição suave

## 🔄 Estados da Aplicação

### 1. Não Autenticado
- Acesso apenas a rotas públicas
- Redirect automático para login ao tentar acessar /admin

### 2. Autenticando (Loading)
- Tela de loading durante verificação
- Previne flash de conteúdo

### 3. Autenticado
- Acesso total ao painel admin
- Sessão persistente por 24h
- Botão de logout disponível

### 4. Sessão Expirada
- Redirect automático para login
- Mensagem clara de expiração

## 🧪 Testando o Sistema

### Teste 1: Login Válido
1. Acesse `http://localhost:5173/login`
2. Digite: `leomachadopt@gmail.com`
3. Senha: `Admin123!`
4. Clique em "Entrar"
5. ✅ Deve redirecionar para `/admin`

### Teste 2: Login Inválido
1. Acesse `/login`
2. Digite credenciais incorretas
3. ❌ Deve mostrar toast de erro
4. ❌ Deve permanecer na página de login

### Teste 3: Acesso Direto
1. **SEM** estar logado, tente acessar `/admin`
2. ✅ Deve redirecionar para `/login`

### Teste 4: Persistência
1. Faça login
2. Recarregue a página (F5)
3. ✅ Deve permanecer autenticado
4. ✅ Deve permanecer em `/admin`

### Teste 5: Logout
1. Estando autenticado
2. Clique em "Sair" na sidebar
3. ✅ Deve mostrar toast de sucesso
4. ✅ Deve redirecionar para `/login`
5. ✅ Tentar acessar `/admin` deve redirecionar

### Teste 6: Expiração
1. Faça login
2. No DevTools, edite localStorage:
   ```javascript
   // Definir expiração no passado
   const auth = JSON.parse(localStorage.getItem('respira_oral_auth'))
   auth.expiry = Date.now() - 1000
   localStorage.setItem('respira_oral_auth', JSON.stringify(auth))
   ```
3. Recarregue a página
4. ✅ Deve redirecionar para `/login`

## 📊 Monitoramento

### Console Logs
O sistema registra no console:
- Tentativas de login
- Verificações de autenticação
- Erros de validação

### LocalStorage
Inspecione o localStorage no DevTools:
- Chave: `respira_oral_auth`
- Valor: `{ authenticated: true, expiry: timestamp }`

## 🐛 Troubleshooting

### Problema: Não consigo fazer login
**Solução**: Verifique se digitou corretamente:
- Email: `leomachadopt@gmail.com` (minúsculas)
- Senha: `Admin123!` (maiúscula no A, exclamação no final)

### Problema: Loop de redirecionamento
**Solução**: Limpe o localStorage:
```javascript
localStorage.removeItem('respira_oral_auth')
```

### Problema: Sessão expira muito rápido
**Solução**: Ajuste o tempo em `AuthContext.tsx`:
```typescript
const expiry = Date.now() + 24 * 60 * 60 * 1000 // Alterar aqui
```

### Problema: Página em branco após login
**Solução**:
1. Verifique o console para erros
2. Limpe cache do navegador
3. Recompile: `npm run build`

## 📝 Notas Importantes

1. **Produção**: Este sistema é adequado para ambiente de desenvolvimento/staging, mas **NÃO** para produção sem as melhorias de segurança mencionadas.

2. **Credenciais**: As credenciais estão visíveis no código-fonte. Qualquer pessoa com acesso ao repositório pode vê-las.

3. **Token**: O "token" atual é apenas uma flag booleana. Em produção, use JWT real.

4. **HTTPS**: Em produção, sempre use HTTPS para proteger credenciais em trânsito.

5. **Backup**: Mantenha credenciais de administrador em local seguro separado do código.

## 🚀 Próximos Passos Recomendados

1. **Backend de Autenticação**
   - Implementar API de login
   - Usar banco de dados para usuários
   - Implementar refresh token

2. **Múltiplos Usuários**
   - Sistema de gestão de usuários
   - Diferentes níveis de permissão
   - Auditoria de ações

3. **Recuperação de Senha**
   - Fluxo de "Esqueci minha senha"
   - Email de redefinição
   - Link temporário seguro

4. **Segurança Avançada**
   - 2FA via SMS/App
   - Captcha em login
   - IP whitelisting
   - Detecção de anomalias

## 📞 Suporte

Para dúvidas sobre o sistema de autenticação, consulte:
- Este documento
- Código em `src/contexts/AuthContext.tsx`
- React Router: https://reactrouter.com
