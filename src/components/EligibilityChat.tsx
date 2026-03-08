import { useState, useRef, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Send, Bot, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import ReactMarkdown from 'react-markdown'
import { useMetaPixel } from '@/hooks/use-meta-pixel'

type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
  rawContent: string
  options?: string[]
}

// Extrai opções do formato: OPTIONS: ["a", "b", "c"]
function parseOptions(raw: string): { text: string; options: string[] } {
  const match = raw.match(/OPTIONS:\s*(\[[\s\S]*?\])\s*$/m)
  if (!match) return { text: raw.trim(), options: [] }
  try {
    const options: string[] = JSON.parse(match[1])
    const text = raw.slice(0, match.index).trim()
    return { text, options }
  } catch {
    return { text: raw.trim(), options: [] }
  }
}

const INITIAL_MESSAGE = `Olá! Bem-vindo ao processo de elegibilidade para o Programa RNS de Integração Ortodôntica.

Vou fazer-te algumas perguntas para entender se o Programa se adequa ao momento da tua clínica.

Para começar: qual é o teu nome?`

type EligibilityChatProps = {
  onQualified?: () => void  // Callback quando qualificado
}

export function EligibilityChat({ onQualified }: EligibilityChatProps) {
  const navigate = useNavigate()
  const { trackChatMessage, trackEligibilityComplete, trackButtonClick } = useMetaPixel()

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'assistant',
      content: INITIAL_MESSAGE,
      rawContent: INITIAL_MESSAGE,
      options: [],
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [optionsUsed, setOptionsUsed] = useState(false)
  const [isQualified, setIsQualified] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Session ID único para esta conversa
  const [sessionId] = useState(() =>
    `eligibility-${Date.now()}-${Math.random().toString(36).substring(7)}`
  )

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      const viewport = scrollRef.current.querySelector(
        '[data-radix-scroll-area-viewport]',
      )
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight
      }
    }
  }, [messages, isLoading])

  // Prevenir zoom no iOS quando o input recebe foco
  useEffect(() => {
    const preventZoom = (e: TouchEvent) => {
      if ((e.target as HTMLElement).tagName === 'TEXTAREA' || (e.target as HTMLElement).tagName === 'INPUT') {
        e.preventDefault()
      }
    }

    // Adicionar listener para prevenir zoom com duplo toque
    document.addEventListener('touchstart', preventZoom, { passive: false })

    return () => {
      document.removeEventListener('touchstart', preventZoom)
    }
  }, [])

  // Detecta se a conversa chegou ao diagnóstico final (qualificado)
  useEffect(() => {
    const lastAssistantMsg = [...messages]
      .reverse()
      .find((m) => m.role === 'assistant')

    if (lastAssistantMsg && lastAssistantMsg.content.includes('Preencher Formulário de Pré-Elegibilidade')) {
      setIsQualified(true)
      trackEligibilityComplete()
      if (onQualified) onQualified()
    }
  }, [messages, onQualified, trackEligibilityComplete])

  const sendMessage = useCallback(async (userText: string) => {
    if (!userText.trim() || isLoading) return

    setOptionsUsed(true)

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userText.trim(),
      rawContent: userText.trim(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInputValue('')
    setIsLoading(true)

    // Track chat interaction
    const messageCount = messages.filter(m => m.role === 'user').length + 1
    trackChatMessage(`message_${messageCount}`)

    // Prepara histórico para API — usa rawContent
    const history = [...messages, userMsg]
      .filter((m) => m.id !== 'init')
      .map((m) => ({ role: m.role, content: m.rawContent }))

    const apiMessages =
      history.filter((m) => m.role === 'assistant').length === 0
        ? [{ role: 'assistant' as const, content: INITIAL_MESSAGE }, ...history]
        : history

    try {
      const response = await fetch('/api/eligibility-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        throw new Error(err.error || `Erro ${response.status}`)
      }

      const data = await response.json()
      const { text, options } = parseOptions(data.reply)

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: text,
        rawContent: data.reply,
        options,
      }

      const updatedMessages = [...messages, userMsg, assistantMsg]
      setMessages((prev) => [...prev, assistantMsg])
      setOptionsUsed(false)

      // Salvar conversa na base de dados
      try {
        await fetch('/api/save-conversation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId,
            chatType: 'eligibility_chat',
            messages: updatedMessages.map((m) => ({
              role: m.role,
              content: m.content,
              timestamp: m.id,
            })),
            status: isQualified ? 'completed' : 'active',
          }),
        })
      } catch (saveError) {
        console.error('Erro ao salvar conversa:', saveError)
      }
    } catch (error: any) {
      toast.error(error.message || 'Erro ao contactar o assistente. Tente novamente.')
    } finally {
      setIsLoading(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [messages, isLoading, sessionId, isQualified, trackChatMessage])

  const handleSend = () => sendMessage(inputValue)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Última mensagem do assistente (para mostrar opções)
  const lastAssistantMsg = [...messages].reverse().find((m) => m.role === 'assistant')
  const activeOptions =
    !optionsUsed && !isLoading && lastAssistantMsg?.options?.length
      ? lastAssistantMsg.options
      : []

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-premium border border-border overflow-hidden"
         style={{ minHeight: '500px', maxHeight: 'calc(100vh - 200px)', height: 'clamp(500px, 70vh, 800px)' }}>

      {/* Header */}
      <div className="bg-[hsl(0,0%,8%)] p-4 text-white flex items-center gap-3 border-b-2 border-secondary/60 flex-shrink-0">
        <div className="w-10 h-10 bg-secondary/20 border border-secondary/40 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-5 h-5 text-secondary" />
        </div>
        <div>
          <h3 className="font-bold text-base text-white">Avaliação de Elegibilidade</h3>
          <p className="text-xs text-white/60">Programa RNS de Integração Ortodôntica</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs text-white/60">Online</span>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'flex w-full',
                msg.role === 'user' ? 'justify-end' : 'justify-start',
              )}
            >
              {msg.role === 'assistant' && (
                <div className="w-7 h-7 rounded-full bg-[hsl(0,0%,8%)] border border-secondary/40 flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                  <Bot className="w-3.5 h-3.5 text-secondary" />
                </div>
              )}
              <div
                className={cn(
                  'max-w-[80%] p-3.5 rounded-2xl animate-fade-in text-sm leading-relaxed',
                  msg.role === 'user'
                    ? 'bg-[hsl(0,0%,15%)] text-white rounded-tr-none [&_*]:text-white [&_strong]:text-white'
                    : 'bg-muted text-foreground rounded-tl-none border border-border/40',
                )}
              >
                <ReactMarkdown
                  components={{
                    strong: ({ node, ...props }) => (
                      <strong className="font-semibold" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="mb-2 last:mb-0" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className="list-disc list-inside space-y-1 my-2" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className="list-decimal list-inside space-y-1 my-2" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="leading-relaxed" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2 className="font-bold text-base mt-3 mb-1" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3 className="font-bold text-sm mt-2 mb-1" {...props} />
                    ),
                    a: ({ node, href, ...props }) =>
                      href?.startsWith('mailto:') ? (
                        <a
                          href={href}
                          className="underline font-medium hover:opacity-80"
                          {...props}
                        />
                      ) : (
                        <Link
                          to={href || '/'}
                          className="underline font-medium hover:opacity-80"
                          {...props}
                        />
                      ),
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex justify-start">
              <div className="w-7 h-7 rounded-full bg-[hsl(0,0%,8%)] border border-secondary/40 flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                <Bot className="w-3.5 h-3.5 text-secondary" />
              </div>
              <div className="bg-muted p-3 rounded-2xl rounded-tl-none border border-border/40 flex items-center gap-1">
                <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          {/* Quick-reply options */}
          {activeOptions.length > 0 && (
            <div className="flex flex-wrap gap-2 pl-9 pb-1">
              {activeOptions.map((opt) => (
                <button
                  key={opt}
                  onClick={() => sendMessage(opt)}
                  className="text-sm px-3.5 py-2 rounded-xl border-2 border-secondary/60 bg-white text-foreground font-medium hover:bg-secondary hover:text-[hsl(0,0%,8%)] hover:border-secondary transition-all duration-150 cursor-pointer"
                >
                  {opt}
                </button>
              ))}
            </div>
          )}

          {/* CTA para formulário (quando qualificado) */}
          {isQualified && (
            <div className="mt-6 p-6 bg-secondary/10 border-2 border-secondary rounded-2xl">
              <h4 className="font-bold text-lg mb-3 text-foreground">
                ✅ Perfil Elegível — Próximo Passo
              </h4>
              <p className="text-sm text-muted-foreground mb-4">
                Parabéns! O teu perfil está alinhado com o Programa RNS de Integração Ortodôntica.
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Para avançar, preenche o formulário breve de pré-elegibilidade e agenda a tua
                Entrevista Estratégica com o Dr. Leonardo Machado.
              </p>
              <Button
                onClick={() => {
                  trackButtonClick('Preencher Formulário', '/aplicacao')
                  navigate('/aplicacao')
                }}
                className="w-full btn-gold hover-glow-gold"
              >
                Preencher Formulário de Pré-Elegibilidade
              </Button>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-3 sm:p-4 bg-muted/30 border-t border-border flex-shrink-0">
        <div className="flex gap-2 items-end">
          <Textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={activeOptions.length > 0 ? 'Ou escreve a tua resposta...' : 'Escreve a tua mensagem...'}
            className="flex-1 bg-white text-base min-h-[44px] max-h-[120px] resize-none"
            style={{ fontSize: '16px' }}
            disabled={isLoading}
            maxLength={600}
            rows={1}
          />
          <Button
            onClick={handleSend}
            disabled={isLoading || !inputValue.trim()}
            size="icon"
            className="bg-[hsl(0,0%,8%)] hover:bg-[hsl(0,0%,20%)] border border-secondary/40 text-secondary flex-shrink-0"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
        <p className="text-[10px] text-muted-foreground mt-2 text-center">
          Avaliação confidencial · Sem compromisso · Programa exclusivo
        </p>
      </div>
    </div>
  )
}
