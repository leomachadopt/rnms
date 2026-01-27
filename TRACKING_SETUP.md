# 🎯 Sistema de Tracking e Analytics - Facebook Pixel

Este documento descreve o sistema completo de tracking e analytics implementado no projeto.

## 📋 O que foi implementado

### 1. **Estrutura de Banco de Dados**
- ✅ Tabela `tracking_events` para armazenar eventos
- ✅ Campos UTM nas tabelas `evaluations` (utm_source, utm_medium, utm_campaign, utm_content, utm_term)
- ✅ Relação entre eventos de tracking e avaliações

### 2. **Frontend (React)**
- ✅ **Facebook Pixel** - Script carregado automaticamente
- ✅ **Hook `useFacebookPixel`** - Para tracking de eventos em qualquer componente
- ✅ **Hook `useUTMParams`** - Captura e persiste parâmetros UTM da URL
- ✅ **Banner de Cookies (LGPD)** - Consentimento antes de ativar tracking
- ✅ **Tracking Automático**:
  - `PageView` - Em cada mudança de rota
  - `Lead` - Quando usuário preenche nome e telefone na avaliação
  - `CompleteRegistration` - Quando avaliação é concluída com sucesso
  - `Contact` - (Preparado para clicks em telefone/WhatsApp)

### 3. **Backend (API)**
- ✅ **Conversions API** (`/api/conversions-api`) - Envia eventos server-side para Facebook
- ✅ **Analytics API** (`/api/analytics`) - Retorna métricas agregadas:
  - `?type=overview` - Métricas gerais (visitantes, leads, conversão)
  - `?type=traffic-sources` - Origens de tráfego
  - `?type=campaigns` - Performance por campanha
  - `?type=funnel` - Funil de conversão
  - `?type=timeline` - Eventos ao longo do tempo
- ✅ **Tracking Events API** (`/api/tracking-events`) - CRUD de eventos

### 4. **Área Admin**
- ✅ **Página Analytics** (`/admin/analytics`) - Dashboard completo com:
  - Métricas principais (visitantes, leads, taxa de conversão)
  - Análise por campanha
  - Origens de tráfego
  - Funil de conversão
- ✅ **Origem nas Avaliações** - Lista de avaliações mostra origem (UTM) de cada lead
- ✅ **Página de Configurações** (`/admin/tracking`) - Gerenciar:
  - Facebook Pixel ID
  - Conversions API Access Token
  - Ativar/desativar Pixel e Conversions API
  - Modo de teste

---

## 🚀 Como Configurar

### Passo 1: Configurar Variáveis de Ambiente

Adicione ao arquivo `.env`:

```bash
# Facebook Pixel ID (público - fica no frontend)
VITE_FACEBOOK_PIXEL_ID=123456789012345

# Facebook Conversions API Token (privado - apenas backend)
FACEBOOK_CONVERSIONS_API_TOKEN=EAAx...
```

### Passo 2: Criar as Tabelas no Banco de Dados

Execute a migração do Drizzle:

```bash
npm run db:push
```

Isso criará:
- Tabela `tracking_events`
- Campos UTM na tabela `evaluations`

### Passo 3: Obter Credenciais do Facebook

#### **Facebook Pixel ID:**
1. Acesse https://business.facebook.com/events_manager
2. Selecione seu Pixel ou crie um novo
3. Copie o Pixel ID (número de 15 dígitos)

#### **Conversions API Access Token:**
1. No Events Manager, vá em **Configurações** → **Conversions API**
2. Clique em **Generate Access Token**
3. Copie o token (começa com `EAAx...`)

### Passo 4: Configurar no Admin

1. Acesse `/admin/tracking`
2. Cole o **Pixel ID**
3. Cole o **Access Token**
4. Ative ambos (Pixel e Conversions API)
5. Clique em **Guardar Configurações**

---

## 📊 Como Usar o Analytics

### Visualizar Métricas

Acesse `/admin/analytics` para ver:

- **Visitantes Únicos** - Quantas pessoas visitaram o site
- **Page Views** - Total de páginas visualizadas
- **Leads** - Quantas pessoas iniciaram uma avaliação
- **Taxa de Conversão** - % de visitantes que viraram leads

### Análise por Campanha

Na aba **Campanhas**, veja performance de cada campanha:
- Visitantes por campanha
- Leads gerados
- Taxa de conversão específica

**Exemplo de URL com UTM:**
```
https://respiraoral.pt/?utm_source=facebook&utm_medium=cpc&utm_campaign=ortodontia_kids&utm_content=banner_respiracao
```

### Filtrar por Período

Use o seletor no topo da página:
- Últimos 7 dias
- Últimos 30 dias
- Últimos 90 dias

---

## 🔍 Rastreamento de Eventos

### Eventos Automáticos

Estes eventos são disparados automaticamente:

| Evento | Quando | Local |
|--------|--------|-------|
| `PageView` | Visita a qualquer página | Todas as rotas |
| `Lead` | Preenche nome + telefone | Formulário de avaliação |
| `CompleteRegistration` | Finaliza avaliação | Após gerar relatório |

### Como Adicionar Eventos Customizados

Use o hook `useFacebookPixel` em qualquer componente:

```tsx
import { useFacebookPixel } from '@/hooks/useFacebookPixel'

function MeuComponente() {
  const { trackEvent } = useFacebookPixel()

  const handleClick = () => {
    trackEvent('Contact', {
      eventData: {
        content_name: 'WhatsApp Click',
        specialist_id: 123,
      }
    })
  }

  return <button onClick={handleClick}>Contactar</button>
}
```

---

## 🔐 Privacidade e LGPD

### Banner de Cookies

- ✅ Aparece na primeira visita
- ✅ Usuário pode aceitar ou rejeitar
- ✅ Pixel só carrega após consentimento
- ✅ Configurações podem ser alteradas

### Dados Coletados

O sistema coleta:
- **Públicos**: Página visitada, origem UTM, navegador
- **Privados (hash SHA256)**: Email, telefone (apenas no servidor)

### Segurança

- Token da Conversions API armazenado criptografado no servidor
- Token nunca exposto no frontend
- Dados sensíveis hasheados antes de enviar ao Facebook

---

## 🧪 Testar o Tracking

### 1. Verificar Pixel no Navegador

1. Instale a extensão **Facebook Pixel Helper** no Chrome
2. Visite o site
3. Aceite os cookies
4. A extensão deve mostrar o Pixel ativo

### 2. Verificar Eventos no Facebook

1. Acesse https://business.facebook.com/events_manager
2. Vá em **Test Events**
3. Faça ações no site (navegar, preencher formulário)
4. Eventos devem aparecer em tempo real

### 3. Verificar Deduplicação

- Cada evento tem um `event_id` único
- Mesmo evento enviado pelo browser e servidor é contado apenas 1 vez
- Verifique no Events Manager que não há duplicatas

---

## 📈 Próximos Passos (Opcional)

### Criar Públicos Personalizados
- Visitantes sem conversão (retargeting)
- Leads qualificados
- Segmentação por interesse

### Integrar com Facebook Ads API
- Importar custo de campanhas
- Calcular ROI automaticamente
- Otimizar campanhas com base em conversões

### Webhooks para Especialistas
- Notificar especialista quando receber novo lead
- Status de follow-up
- Confirmação de agendamento

---

## 📞 Suporte

Se tiver dúvidas sobre o sistema de tracking:

1. Verifique se as variáveis de ambiente estão configuradas
2. Confira se o banco de dados foi migrado
3. Teste o Pixel Helper no navegador
4. Verifique os logs no console do navegador (`[FB Pixel]`)

---

## 🎉 Pronto!

O sistema de tracking está completo e funcional. Agora você pode:

- ✅ Rastrear todas as visitas e conversões
- ✅ Analisar campanhas de marketing
- ✅ Otimizar investimento em anúncios
- ✅ Entender de onde vêm os melhores leads
- ✅ Conformidade com LGPD

**Happy tracking! 🚀**
