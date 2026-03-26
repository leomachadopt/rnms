# Guia de Configuração - Campanha Facebook OdontoGrowth 360

## 📊 Visão Geral da Campanha

**Objetivo:** Gerar leads qualificados para o programa OdontoGrowth 360
**Pixel ID:** 25922671647391965
**Landing Page:** https://rnos.vercel.app/odontogrowth
**Formulário:** https://rnos.vercel.app/aplicacao-br

---

## 🎯 Eventos de Rastreamento Implementados

### 1. **ViewContent** (Visualização da Landing Page)
- **Quando:** Usuário acessa /odontogrowth
- **Dados rastreados:**
  - `content_name`: "OdontoGrowth 360 Landing Page"
  - `content_category`: "Landing Page"
- **Uso:** Medir alcance e interesse inicial

### 2. **ViewContent** (Visualização do Formulário)
- **Quando:** Usuário acessa /aplicacao-br
- **Dados rastreados:**
  - `content_name`: "Formulário Aplicação OdontoGrowth 360"
  - `content_category`: "Application Form"
- **Uso:** Medir quantos clicaram para aplicar

### 3. **ButtonClick** (Cliques nos CTAs)
- **Quando:** Usuário clica em "Aplicar para o programa"
- **Dados rastreados:**
  - `button_name`: Nome do CTA
  - `destination`: "/aplicacao-br"
- **Uso:** Medir efetividade dos CTAs

### 4. **Lead** (Conversão Principal) ⭐
- **Quando:** Formulário enviado com sucesso
- **Dados rastreados:**
  - `content_name`: "OdontoGrowth 360 - Aplicação Enviada"
  - `value`: Faixa de faturamento mensal
  - `currency`: "BRL"
  - `status`: Prontidão para investir
- **Uso:** **ESTE É O EVENTO PRINCIPAL PARA OTIMIZAÇÃO**

### 5. **ApplicationSubmitted** (Evento Customizado)
- **Quando:** Formulário enviado com sucesso
- **Dados rastreados:**
  - `program`: "OdontoGrowth 360"
  - `monthly_revenue`: Faturamento mensal
  - `goal`: Objetivo 12 meses
  - `ready_to_invest`: Prontidão para investir
- **Uso:** Segmentação e análise detalhada

---

## ⚙️ Configuração no Facebook Ads Manager

### PASSO 1: Verificar o Pixel

1. Acesse **Gerenciador de Eventos** no Facebook
2. Verifique se o Pixel **25922671647391965** está ativo
3. Use a extensão **Meta Pixel Helper** para testar:
   - Acesse https://rnos.vercel.app/odontogrowth
   - Verifique se dispara o evento `ViewContent`
   - Clique em "Aplicar para o programa"
   - Verifique se dispara `ButtonClick`
   - Preencha e envie o formulário
   - Verifique se dispara `Lead` e `ApplicationSubmitted`

### PASSO 2: Criar Evento de Conversão Personalizado

1. No **Gerenciador de Eventos**, vá em **Eventos Personalizados**
2. Clique em **+ Criar Evento Personalizado**
3. Configure:
   - **Nome:** Aplicação OdontoGrowth 360
   - **Fonte de dados:** Pixel 25922671647391965
   - **Parâmetros de correspondência:**
     - URL contém: `/aplicacao-br`
     - E evento padrão: `Lead`

### PASSO 3: Configurar a Campanha

#### 3.1 Nível da Campanha
```
Nome: OdontoGrowth 360 - Geração de Leads
Objetivo: Leads (ou Vendas se preferir otimizar para valor)
Categoria: Negócios e B2B
```

#### 3.2 Nível do Conjunto de Anúncios
```
Nome do conjunto: Donos de Clínicas Odontológicas - Brasil
Evento de conversão: Lead (ou o evento personalizado criado)
Otimização: Conversões (Lead)
Orçamento: Definir conforme seu budget
```

**Público-alvo sugerido:**
- **Localização:** Brasil (ou estados específicos)
- **Idade:** 28-55 anos
- **Idioma:** Português (Brasil)
- **Segmentação detalhada:**
  - Interesses: Odontologia, Administração de empresas, Empreendedorismo
  - Comportamentos: Proprietários de pequenas empresas, Gestão empresarial
  - Cargos: Dentista, Dono de clínica, Cirurgião-dentista

**Posicionamentos:**
- Feed do Facebook
- Feed do Instagram
- Stories do Instagram
- Reels do Instagram
- (Evite Audience Network para maior controle)

#### 3.3 Nível do Anúncio
```
Formato: Vídeo único
Nome: [Nome do seu vídeo]
Texto principal: Copy persuasiva focando em:
  - Dor: Clínicas com agenda cheia mas faturamento instável
  - Solução: Estruturação empresarial completa em 6 meses
  - Prova: Método comprovado, clínicas dobraram faturamento
  - CTA: Candidatar-se agora (vagas limitadas)

Título: "OdontoGrowth 360 - Estruturação para Clínicas"
Descrição: "6 meses de implementação. Processos, gestão e crescimento previsível."
Botão de CTA: "Aplicar agora" ou "Saiba mais"
URL de destino: https://rnos.vercel.app/odontogrowth
```

### PASSO 4: Configurar Rastreamento de Conversões

1. No conjunto de anúncios, em **Otimização e entrega:**
   - Evento de conversão: **Lead**
   - Janela de atribuição: **7 dias de clique ou 1 dia de visualização**

2. Em **Rastreamento:**
   - Confirme que o Pixel está selecionado
   - Ative **Parâmetros de URL** (opcional):
     ```
     utm_source=facebook
     utm_medium=paid_social
     utm_campaign=odontogrowth_360
     utm_content={{ad.name}}
     ```

### PASSO 5: Criar Públicos Personalizados para Remarketing

1. **Visitantes da Landing Page** (não converteram)
   - Evento: ViewContent
   - URL contém: `/odontogrowth`
   - Excluir: Pessoas que dispararam evento Lead
   - Período: Últimos 30 dias

2. **Iniciaram aplicação** (não completaram)
   - Evento: ViewContent
   - URL contém: `/aplicacao-br`
   - Excluir: Pessoas que dispararam evento Lead
   - Período: Últimos 14 dias

3. **Leads convertidos**
   - Evento: Lead
   - Período: Últimos 180 dias

4. **Engajamento com o vídeo**
   - Pessoas que assistiram 50% do vídeo
   - Período: Últimos 30 dias

---

## 📈 Métricas para Monitorar

### Métricas Principais
- **CPL (Custo por Lead):** Quanto custa cada aplicação
- **Taxa de conversão:** % de visitantes que aplicam
- **Qualidade dos leads:** % de leads com "Sim, estou pronto" na Q3

### Métricas Secundárias
- **CTR (Click-Through Rate):** % de cliques no anúncio
- **CPC (Custo por Clique):** Quanto custa cada clique
- **Taxa de conclusão do vídeo:** % que assistiu 75%+
- **CPM (Custo por Mil Impressões):** Custo de alcance

### Funil de Conversão Esperado
```
100% - Visualizaram o anúncio
 ↓ 3-5% CTR
3-5% - Clicaram e acessaram /odontogrowth
 ↓ 10-20% conversão
0.3-1% - Preencheram formulário (Lead)
```

**Exemplo:**
- 10.000 impressões
- 350 cliques (3.5% CTR)
- 35-70 aplicações (10-20% conversão)
- CPL alvo: R$ 50-150

---

## 🎬 Recomendações para o Criativo em Vídeo

### Estrutura sugerida (60-90 segundos)

**0-3 seg:** Hook forte
- "Sua clínica está cheia, mas o faturamento não cresce?"

**3-15 seg:** Problema
- Agenda lotada mas receita instável
- Dependência total do dono
- Processos desorganizados

**15-30 seg:** Solução
- OdontoGrowth 360: programa de 6 meses
- Estruturação completa: comercial, gestão, processos

**30-50 seg:** Benefícios
- Receita previsível
- Gestão por indicadores
- Clínicas dobraram faturamento

**50-60 seg:** CTA
- "Vagas limitadas. Candidate-se agora."
- Mostrar URL ou botão

**Dicas técnicas:**
- Legendas obrigatórias (maioria assiste sem som)
- Proporção: 1:1 (quadrado) ou 4:5 (vertical)
- Primeiros 3 segundos são críticos
- Incluir logo e branding sutil

---

## 🔧 Testes A/B Recomendados

### Teste 1: Públicos
- Conjunto A: Interesse em Odontologia
- Conjunto B: Comportamento "Proprietários de empresas"
- Conjunto C: Lookalike de leads convertidos (quando tiver dados)

### Teste 2: Criativos
- Versão A: Vídeo focado em dor/problema
- Versão B: Vídeo focado em resultados
- Versão C: Imagem estática + carrossel

### Teste 3: Copy
- Versão A: Foco em estruturação
- Versão B: Foco em dobrar faturamento
- Versão C: Foco em reduzir dependência do dono

---

## 🚨 Checklist Pré-Lançamento

- [ ] Pixel instalado e testado no site
- [ ] Eventos ViewContent, Lead funcionando corretamente
- [ ] Evento de conversão configurado no Ads Manager
- [ ] Público-alvo definido e salvo
- [ ] Vídeo uploaded e com legendas
- [ ] Copy e CTA revisados
- [ ] URL de destino testada (https://rnos.vercel.app/odontogrowth)
- [ ] Parâmetros UTM configurados (opcional)
- [ ] Orçamento diário/total definido
- [ ] Públicos de remarketing criados
- [ ] Meta Pixel Helper testado manualmente

---

## 📞 Próximos Passos Após Lançamento

### Primeiras 48 horas
- Monitorar se os eventos estão disparando corretamente
- Verificar CPM e CTR iniciais
- Ajustar orçamento se necessário

### Primeira semana
- Analisar CPL (custo por lead)
- Pausar conjuntos com performance ruim
- Duplicar conjuntos com performance boa
- Criar lookalike dos leads convertidos

### Após 10-15 leads
- Criar público Lookalike 1% dos leads
- Configurar campanha de remarketing
- Testar novos criativos

---

## 💡 Dicas de Otimização

1. **Deixe o algoritmo aprender:** Não faça mudanças drásticas nos primeiros 3-5 dias
2. **Regra do 50:** Espere pelo menos 50 eventos de conversão por semana para o algoritmo otimizar
3. **Mantenha consistência:** Não altere o evento de conversão após lançar
4. **Budget mínimo:** Facebook recomenda pelo menos R$ 50/dia para otimização de conversões
5. **Qualidade > Quantidade:** 10 leads qualificados valem mais que 50 não qualificados

---

## 🎯 Eventos Rastreados no Site

| Página | Evento | Quando Dispara | Objetivo |
|--------|--------|----------------|----------|
| /odontogrowth | ViewContent | Ao carregar página | Medir interesse inicial |
| /odontogrowth | ButtonClick | Click "Aplicar para o programa" | Medir intenção |
| /aplicacao-br | ViewContent | Ao carregar página | Medir início de aplicação |
| /aplicacao-br | Lead | Formulário enviado | **CONVERSÃO PRINCIPAL** |
| /aplicacao-br | ApplicationSubmitted | Formulário enviado | Dados detalhados |

---

## 📝 Exemplo de Copy para Anúncio

### Versão 1: Foco no Problema
```
Sua clínica odontológica está cheia, mas o faturamento não cresce?

O problema não é técnico. É estrutural.

Sem processo comercial claro, a receita fica instável.
Sem gestão por indicadores, as decisões ficam no "achismo".
Sem governança, tudo depende de você.

O OdontoGrowth 360 é um programa de 6 meses que estrutura sua clínica como um negócio previsível e escalável.

✅ Processo comercial estruturado
✅ Gestão por indicadores (Painel KPI)
✅ Governança e delegação (Sistema Clauger)
✅ Jornada do paciente otimizada

Dezenas de clínicas dobraram seu faturamento com nossa metodologia.

Vagas limitadas. Candidatos passam por processo de seleção.

👉 Aplicar para o programa
```

### Versão 2: Foco em Resultados
```
Clínicas odontológicas dobraram seu faturamento em 12 meses.

Como? Estruturação empresarial completa.

O OdontoGrowth 360 é um programa intensivo de 6 meses para donos de clínicas que querem crescer com previsibilidade.

Durante o programa, você implementa:
→ Processo comercial estruturado
→ Gestão por indicadores essenciais
→ Sistemas de governança e processos
→ Jornada do paciente otimizada

Acompanhamento direto. Encontros quinzenais online.
Sistemas inclusos: Painel KPI, Clauger, Plataforma Estratégica.

Para donos de clínicas em operação, prontos para estruturar e escalar.

Processo seletivo. Vagas limitadas.

👉 Candidate-se agora
```

---

## 🔍 Monitoramento e Debug

### Verificar se eventos estão funcionando:

1. **Extensão Meta Pixel Helper**
   - Instale no Chrome
   - Acesse suas páginas
   - Verifique se ícone fica verde
   - Confira eventos disparados

2. **Teste de Eventos no Facebook**
   - Gerenciador de Eventos > Teste de Eventos
   - Cole a URL: https://rnos.vercel.app/odontogrowth
   - Realize ações (navegar, clicar, preencher formulário)
   - Confirme que eventos aparecem em tempo real

3. **Console do Navegador**
   - Abra DevTools (F12)
   - Vá em Console
   - Você verá logs: `[Meta Pixel] Event tracked: Lead`

---

## 📊 Dashboard de Análise Recomendado

Crie um painel personalizado no Ads Manager com:

- **Desempenho de Campanha:**
  - Alcance
  - Impressões
  - Frequência
  - Gastos

- **Engajamento:**
  - Cliques no link
  - CTR (todos)
  - CPC (custo por clique no link)

- **Conversões:**
  - Leads (OdontoGrowth 360)
  - Custo por lead
  - Taxa de conversão
  - ROAS (se tiver valor atribuído)

---

**Sucesso na sua campanha! 🚀**

Para dúvidas ou ajustes no tracking, entre em contato.
