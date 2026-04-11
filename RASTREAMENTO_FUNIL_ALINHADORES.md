# Rastreamento de Conversão - Funil Alinhadores

## 📊 Eventos do Meta Pixel Configurados

### 1. **Evento de Conversão Principal: `Lead`**
**Quando dispara:** Imediatamente após o formulário ser enviado com sucesso (Step 5)

**Parâmetros enviados:**
```javascript
{
  content_name: 'Funil Alinhadores - Formulário Completo',
  content_category: 'Sistema Alinhadores Invisíveis',
  value: [receita mensal calculada],
  currency: 'EUR',
  predicted_ltv: [receita anual calculada]
}
```

**Uso:** Este é o evento **padrão** do Meta Pixel que você deve usar como **objetivo de conversão** na sua campanha do Facebook Ads.

---

### 2. **Evento Customizado: `AlignersApplicationSubmitted`**
**Quando dispara:** Junto com o evento `Lead`, após formulário enviado

**Parâmetros enviados:**
```javascript
{
  name: 'Nome do médico',
  email: 'email@clinica.pt',
  clinic_name: 'Nome da Clínica',
  city: 'Cidade',
  goal_cases: 30,              // Meta de casos/mês
  current_conversion: 0.15,     // Taxa de conversão atual (15%)
  avg_case_value: 3500,         // Valor médio por caso (€)
  monthly_revenue: 15750,       // Receita mensal calculada
  program: 'Sistema Alinhadores Invisíveis',
  source: 'Funil Alinhadores'
}
```

**Uso:** Dados detalhados para análise e segmentação avançada.

---

## 🎯 Como Configurar a Campanha no Facebook Ads

### Passo 1: Criar Campanha
1. Acesse o **Gerenciador de Anúncios** do Facebook
2. Clique em **Criar** > Nova Campanha
3. Escolha objetivo: **Leads** ou **Conversões**

### Passo 2: Configurar Evento de Conversão
1. No nível do **Conjunto de Anúncios**:
   - Evento de conversão: **Lead**
   - Pixel: `25922671647391965` (já instalado)
   - Localização do evento: **Site**

2. Filtrar por parâmetros (opcional):
   - `content_name` = "Funil Alinhadores - Formulário Completo"
   - `content_category` = "Sistema Alinhadores Invisíveis"

### Passo 3: Otimização
- **Evento de otimização:** Lead
- **Janela de conversão:** 7 dias de clique
- **Atribuição:** Último clique

---

## 📍 URL da Campanha

Use esta URL para direcionar tráfego:
```
https://metodorns.com/alinhadores
```

**Parâmetros UTM recomendados:**
```
https://metodorns.com/alinhadores?utm_source=facebook&utm_medium=paid&utm_campaign=alinhadores_2025&utm_content=video_1
```

---

## 🔍 Verificar se o Tracking Está Funcionando

### Método 1: Facebook Pixel Helper (Chrome Extension)
1. Instale: [Facebook Pixel Helper](https://chrome.google.com/webstore/detail/facebook-pixel-helper/fdgfkebogiimcoedlicjlajpkdmockpc)
2. Acesse: https://metodorns.com/alinhadores
3. Preencha e envie o formulário
4. Verifique se dispara:
   - ✅ `PageView` (ao carregar a página)
   - ✅ `Lead` (ao enviar formulário)
   - ✅ `AlignersApplicationSubmitted` (customizado)

### Método 2: Eventos de Teste do Meta
1. Acesse: [Meta Events Manager](https://business.facebook.com/events_manager2)
2. Selecione o Pixel: `25922671647391965`
3. Vá em **Testar Eventos**
4. Cole a URL: `https://metodorns.com/alinhadores`
5. Preencha e envie o formulário
6. Confirme que os eventos aparecem em tempo real

### Método 3: Console do Browser (Desenvolvedor)
1. Abra DevTools (F12)
2. Console > Digite: `fbq`
3. Deve retornar: `function fbq() { ... }`
4. Preencha o formulário e veja logs: `[Meta Pixel] Event tracked: Lead`

---

## 📈 Métricas Importantes para Acompanhar

### No Facebook Ads Manager:
- **CTR (Click-Through Rate):** % de cliques nos anúncios
- **Custo por Lead:** Quanto você paga por cada conversão
- **Taxa de Conversão:** % de visitantes que preenchem o formulário
- **ROAS (Return on Ad Spend):** Retorno sobre investimento em anúncios

### No Google Analytics / Meta Analytics:
- **Tempo médio no funil:** Quanto tempo levam para preencher
- **Taxa de abandono por etapa:** Onde as pessoas desistem
- **Valor médio por lead:** Receita potencial de cada lead

---

## 🧪 Testar Antes de Lançar

**Checklist pré-lançamento:**
- [ ] Meta Pixel Helper instalado e funcionando
- [ ] Teste completo: acessar `/alinhadores` → preencher formulário → verificar evento `Lead`
- [ ] Verificar no Events Manager que evento aparece
- [ ] Criar público personalizado com evento `Lead` (para remarketing)
- [ ] Configurar campanha de conversão no Ads Manager
- [ ] Definir orçamento e lance

---

## 🎨 Criativos Recomendados

### Público-Alvo:
- **Ortodontistas** e **dentistas generalistas** em Portugal
- Idade: 30-55 anos
- Interesse em: Ortodontia, Alinhadores Invisíveis, Invisalign, Gestão de Clínicas
- Comportamento: Proprietários de negócios

### Mensagens Principais:
1. **Problema:** "Taxa de conversão baixa em alinhadores?"
2. **Solução:** "Sistema DentalGrowth aumenta conversão em 30%"
3. **Prova:** Depoimentos de Dra. Cristiane (46 leads) e Dra. Joana (120% faturação)
4. **CTA:** "Planeamento estratégico gratuito de 45min"

### Formatos:
- **Vídeo curto (15-30s):** Antes/Depois de conversão
- **Carrossel:** 3 slides com problema → solução → prova social
- **Imagem estática:** Headline forte + depoimento + CTA

---

## 🚨 Troubleshooting

### Problema: Evento não dispara
**Solução:**
1. Verifique se `window.fbq` existe no console
2. Confirme que Meta Pixel Helper detecta o pixel
3. Desabilite bloqueadores de anúncios (AdBlock, etc)
4. Teste em modo anônimo/privado

### Problema: Muitos eventos duplicados
**Solução:**
- O código já está otimizado para disparar apenas 1x por envio
- Se aparecer duplicado, verifique se não há outro código do pixel na página

### Problema: Conversões não aparecem no Ads Manager
**Solução:**
- Aguarde até 24h (pode haver delay)
- Verifique se a campanha está usando o pixel correto (`25922671647391965`)
- Confirme que o domínio `metodorns.com` está verificado no Business Manager

---

## 📞 Suporte

**Meta Pixel ID:** `25922671647391965`
**Domínio:** `https://metodorns.com`
**Página do Funil:** `/alinhadores`
**Evento de Conversão:** `Lead` (padrão do Meta)
**Evento Customizado:** `AlignersApplicationSubmitted`

---

## ✅ Resumo Executivo

**O que foi implementado:**
- ✅ Meta Pixel instalado no site (ID: 25922671647391965)
- ✅ Evento `Lead` dispara após envio do formulário (Step 5)
- ✅ Evento customizado `AlignersApplicationSubmitted` com dados detalhados
- ✅ Parâmetros de valor (receita mensal e anual) para otimização

**O que você precisa fazer:**
1. Criar campanha no Facebook Ads Manager
2. Selecionar evento de conversão: **Lead**
3. Direcionar tráfego para: `https://metodorns.com/alinhadores`
4. Monitorar custo por lead e ROAS
5. Otimizar criativos com base em performance

**Meta de Conversão:**
- Evento principal: `Lead`
- Localização: Site (metodorns.com)
- Filtro (opcional): `content_name` = "Funil Alinhadores - Formulário Completo"
