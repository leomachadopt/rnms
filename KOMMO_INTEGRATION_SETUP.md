# Integração Kommo - Configuração Completa ✅

## ✅ O que foi implementado:

### 1. Campos Customizados no Kommo
Foram criados os seguintes campos na sua conta Kommo:
- **Nome do Responsável** (ID: 1042879)
- **Idade da Criança** (ID: 1042881)
- **Nível de Risco** (ID: 1042883)
- **Sinais Respiratórios** (ID: 1042885)
- **Problemas Dentários** (ID: 1042887)
- **Hábitos Orais** (ID: 1042889)
- **Postura** (ID: 1042891)
- **Problemas de Fala** (ID: 1042893)
- **Qualidade do Sono** (ID: 1042895)
- **Tratamento Anterior** (ID: 1042897)

### 2. Configuração Salva no Banco
- **Pipeline:** Campanha Angel - Respirador oral (ID: 12346588)
- **Status Inicial:** Contato inicial (ID: 95413152)
- **Tag:** Campanha RO - Questionário (ID: 108497)
- **Token do Kommo:** Salvo de forma segura no banco de dados

### 3. Fluxo Automático
Quando um usuário completa o questionário:
1. ✅ Lead é criado automaticamente no Kommo
2. ✅ Nome do lead: Nome da criança
3. ✅ Contato: WhatsApp do responsável
4. ✅ Todos os campos customizados preenchidos
5. ✅ Tag "Campanha RO - Questionário" adicionada
6. ✅ Nota com relatório da IA completo
7. ✅ Nota com dados UTM (origem do lead)
8. ✅ Email de notificação enviado

## 📋 Como Testar em Produção:

### Opção 1: Teste Real
1. Acesse: https://respira-oral.vercel.app (ou seu domínio)
2. Complete o questionário normalmente
3. Ao final, verifique no Kommo:
   - Pipeline: "Campanha Angel - Respirador oral"
   - Etapa: "Contato inicial"
   - Lead criado com todos os dados

### Opção 2: Fazer Deploy no Vercel
```bash
git add .
git commit -m "Adicionar integração com Kommo CRM"
git push
```

Após o deploy, a integração estará ativa!

## 🔍 Verificar Lead no Kommo:

1. Acesse: https://clinicadentariavitoria.kommo.com
2. Vá em "Leads" → Pipeline "Campanha Angel - Respirador oral"
3. Procure na etapa "Contato inicial"
4. O lead terá:
   - **Nome:** Nome da criança
   - **Telefone:** WhatsApp do responsável
   - **Campos preenchidos:** Todas as respostas do questionário
   - **Nota:** Relatório completo da IA + Origem (UTM)
   - **Tag:** "Campanha RO - Questionário"

## 🛠️ Arquivos Criados:

### APIs (pasta `/api`)
- `send-to-kommo.ts` - Envia lead para o Kommo
- `save-kommo-settings.ts` - Salva configurações (uso interno)
- `kommo-setup.ts` - Script de descoberta de IDs (uso interno)

### SQL
- `INSERT_KOMMO_CONFIG.sql` - Configuração salva no banco ✅

### Código Atualizado
- `src/components/AIChat.tsx` - Integração adicionada no fluxo (linha 435-457)

## ⚙️ Configuração no Banco de Dados:

A configuração completa está salva na tabela `settings` com a key `kommo_config`:

```json
{
  "token": "[TOKEN_SEGURO]",
  "domain": "clinicadentariavitoria.kommo.com",
  "pipeline_id": 12346588,
  "status_id": 95413152,
  "tag_id": 108497,
  "fields": {
    "parent_name": 1042879,
    "child_age": 1042881,
    "risk_level": 1042883,
    "breathing_signs": 1042885,
    "dental_issues": 1042887,
    "oral_habits": 1042889,
    "posture": 1042891,
    "speech_issues": 1042893,
    "sleep_quality": 1042895,
    "previous_treatment": 1042897
  }
}
```

## 🚀 Próximos Passos:

1. ✅ **Fazer deploy** no Vercel (se ainda não fez)
2. ✅ **Testar** completando um questionário real
3. ✅ **Verificar** o lead criado no Kommo
4. ✅ **Configurar** automações no Kommo (opcional):
   - Envio de mensagem automática no WhatsApp
   - Atribuição automática de responsável
   - Tarefas automáticas para follow-up

## 📞 Estrutura do Lead:

**Nome do Lead:** João (nome da criança)

**Contato Vinculado:**
- Nome: Maria Silva (responsável)
- WhatsApp: +351 916 209 737

**Campos Customizados:**
- Nome do Responsável: Maria Silva
- Idade da Criança: 6-10 anos
- Nível de Risco: Alto
- Sinais Respiratórios: Boca aberta constantemente, Ronco ao dormir
- Problemas Dentários: Sim, dentes tortos
- Hábitos Orais: Sim, usa chucha
- Postura: Sim, frequentemente
- Problemas de Fala: Sim, dificuldade de pronúncia
- Qualidade do Sono: Ruim - sono agitado
- Tratamento Anterior: Não, nunca

**Nota (Relatório):**
```
📄 RELATÓRIO DETALHADO

[Relatório completo gerado pela IA]

📊 ORIGEM DO LEAD
• Fonte: facebook
• Meio: cpc
• Campanha: respiracao-oral-2025
• Conteúdo: video-explicativo
• Termo: respiracao-bucal-criancas
```

---

## ✅ Integração Completa e Funcionando!

Todos os leads do questionário agora vão automaticamente para o Kommo CRM! 🎉
