import { useState, useEffect } from 'react'
import { Save, Loader2, Sparkles, MessageSquare, BrainCircuit } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { getSetting, saveSetting } from '@/services/settings'

export default function Settings() {
  const [diagnosticPrompt, setDiagnosticPrompt] = useState('')
  const [strategicPrompt, setStrategicPrompt] = useState('')
  const [activeTab, setActiveTab] = useState<'diagnostic' | 'strategic'>('diagnostic')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      setIsLoading(true)
      const [diagnosticSetting, strategicSetting] = await Promise.all([
        getSetting('diagnostic_chat_prompt'),
        getSetting('strategic_agent_prompt'),
      ])

      if (diagnosticSetting) {
        setDiagnosticPrompt(diagnosticSetting.value)
      }
      if (strategicSetting) {
        setStrategicPrompt(strategicSetting.value)
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error)
      toast.error('Erro ao carregar configurações')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)

      await Promise.all([
        saveSetting(
          'diagnostic_chat_prompt',
          diagnosticPrompt,
          'System prompt para o agente de qualificação RNS (página /agenterns)'
        ),
        saveSetting(
          'strategic_agent_prompt',
          strategicPrompt,
          'System prompt para o agente estratégico (página /agente)'
        ),
      ])

      toast.success('Prompts de IA atualizados com sucesso!')
    } catch (error) {
      console.error('Erro ao salvar configurações:', error)
      toast.error('Erro ao salvar configurações')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[600px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-primary" />
          Configurações da IA
        </h1>
        <p className="text-muted-foreground mt-1">
          Configure os prompts utilizados pelos assistentes de IA do Método RNS
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab('diagnostic')}
          className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors border-b-2 ${
            activeTab === 'diagnostic'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Diagnóstico Clínico (Avaliação)
        </button>
        <button
          onClick={() => setActiveTab('strategic')}
          className={`flex items-center gap-2 px-4 py-2 font-medium transition-colors border-b-2 ${
            activeTab === 'strategic'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <BrainCircuit className="w-4 h-4" />
          Agente Estratégico (Consultoria)
        </button>
      </div>

      {/* Diagnostic Chat Tab */}
      {activeTab === 'diagnostic' && (
        <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Agente de Qualificação RNS
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Este prompt é utilizado na página <strong>/agenterns</strong> para qualificar
              o interesse do prospect (Formação ou Programa RNS) e conduzir uma entrevista
              de aplicação estruturada.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              System Prompt (GPT-4o-mini)
            </label>
            <Textarea
              value={diagnosticPrompt}
              onChange={(e) => setDiagnosticPrompt(e.target.value)}
              rows={24}
              className="font-mono text-xs leading-relaxed"
              placeholder="Insira o system prompt para o chat de diagnóstico..."
            />
            <p className="text-xs text-muted-foreground">
              <strong>Caracteres:</strong> {diagnosticPrompt.length} |{' '}
              <strong>Linhas:</strong> {diagnosticPrompt.split('\n').length}
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 text-sm mb-2">ℹ️ Sobre este prompt</h3>
            <ul className="text-xs text-blue-800 space-y-1 list-disc list-inside">
              <li>Conduz conversa em <strong>6-8 fases estruturadas</strong> (nome, especialidade, perfil, dor, impacto, objectivo, urgência)</li>
              <li>Usa <strong>OPTIONS clicáveis</strong> para facilitar UX do utilizador</li>
              <li>Termina com <strong>relatório final de 600+ palavras</strong> em 6 blocos obrigatórios</li>
              <li>Inclui <strong>"Uma Ideia Que Podes Aplicar Hoje"</strong> (primeira vitória imediata)</li>
              <li>Recomenda 1 dos 4 serviços RNS com base no perfil diagnosticado</li>
            </ul>
          </div>
        </div>
      )}

      {/* Strategic Agent Tab */}
      {activeTab === 'strategic' && (
        <div className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-primary" />
              Agente Estratégico — Consultor Clínico Investigativo
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Este prompt é utilizado na página <strong>/agente</strong> para conduzir uma
              investigação socrática profunda antes de revelar gradualmente o Método RNS
              como solução natural aos problemas verbalizados.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              System Prompt (GPT-4o-mini)
            </label>
            <Textarea
              value={strategicPrompt}
              onChange={(e) => setStrategicPrompt(e.target.value)}
              rows={24}
              className="font-mono text-xs leading-relaxed"
              placeholder="Insira o system prompt para o agente estratégico..."
            />
            <p className="text-xs text-muted-foreground">
              <strong>Caracteres:</strong> {strategicPrompt.length} |{' '}
              <strong>Linhas:</strong> {strategicPrompt.split('\n').length}
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h3 className="font-semibold text-purple-900 text-sm mb-2">ℹ️ Sobre este prompt</h3>
            <ul className="text-xs text-purple-800 space-y-1 list-disc list-inside">
              <li><strong>Fase 1 (3-5 trocas):</strong> Investigação pura SEM mencionar RNS — foco em verbalizar dores e frustrações</li>
              <li><strong>Transição:</strong> Espelha o padrão de volta ao profissional para validação ("é exactamente isto")</li>
              <li><strong>Fase 2 (2-4 trocas):</strong> Revelação gradual e orgânica do RNS como resposta natural</li>
              <li><strong>Fase 3:</strong> Diferenciais concretos (previsibilidade clínica, arquitectura cognitiva, casos práticos)</li>
              <li><strong>Fase 4:</strong> Qualificação honesta e CTA sem pressão (formacao@metodorns.pt)</li>
              <li><strong>Tom:</strong> Investigador clínico experiente — <strong>NUNCA vende, SEMPRE revela</strong></li>
            </ul>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="flex gap-3">
        <Button onClick={handleSave} disabled={isSaving} size="lg" className="flex-1">
          {isSaving ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              A guardar alterações...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Guardar Prompts de IA
            </>
          )}
        </Button>
      </div>

      {/* Info Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
            🔒 Segurança e Integração
          </h3>
          <ul className="text-sm text-green-800 space-y-1 list-disc list-inside">
            <li>
              Prompts armazenados de forma <strong>segura no banco de dados</strong> (Neon PostgreSQL)
            </li>
            <li>
              <strong>Integração dinâmica:</strong> os endpoints{' '}
              <code className="bg-green-100 px-1 rounded">/api/diagnostic-chat</code> e{' '}
              <code className="bg-green-100 px-1 rounded">/api/strategic-agent</code>{' '}
              buscam os prompts do banco antes de cada chamada à OpenAI
            </li>
            <li>
              Fallback automático: se o banco falhar, usa prompts hardcoded como backup
            </li>
          </ul>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <h3 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
            ⚙️ Configuração da OpenAI API
          </h3>
          <ul className="text-sm text-amber-800 space-y-1 list-disc list-inside">
            <li>
              Modelo utilizado: <strong>GPT-4o-mini</strong> (rápido, económico, eficaz)
            </li>
            <li>
              Chave API armazenada em <code className="bg-amber-100 px-1 rounded">.env.local</code> no servidor (variável <code className="bg-amber-100 px-1 rounded">OPENAI_API_KEY</code>)
            </li>
            <li>
              <strong>IMPORTANTE:</strong> A chave NUNCA é exposta ao frontend — todas as chamadas são server-side
            </li>
            <li>
              Tokens máximos: 2500 (diagnóstico) | 2000 (agente) | Temperatura: 0.7 / 0.8
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
          💡 Boas Práticas ao Editar Prompts
        </h3>
        <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
          <li>
            <strong>Teste sempre após alterar:</strong> abra as páginas /agenterns e /agente para verificar comportamento real
          </li>
          <li>
            <strong>Preserve a estrutura:</strong> os prompts atuais foram calibrados para gerar alta conversão — alterações devem ser incrementais
          </li>
          <li>
            <strong>Monitorize o comprimento:</strong> prompts muito longos aumentam custo e latência; muito curtos perdem contexto
          </li>
          <li>
            <strong>Tom e voz:</strong> mantenha o registo de consultor experiente (não vendedor), empático mas directo, português europeu
          </li>
        </ul>
      </div>
    </div>
  )
}
