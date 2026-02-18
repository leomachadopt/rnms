import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Send, Bot, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import ReactMarkdown from 'react-markdown'

type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const INITIAL_MESSAGE = `Olá! Sou o assistente de diagnóstico do **Método RNS**.

Vou fazer-lhe algumas perguntas para compreender os seus desafios reais e recomendar o serviço mais adequado ao seu momento — **Formação Certificada**, **Day Clinic In Loco**, **Mentoria Clínica & Comercial** ou **Programa In Company**.

Para começar: qual é o seu nome e como posso ajudar a sua clínica hoje?`

export function ProfessionalDiagnosticChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'assistant',
      content: INITIAL_MESSAGE,
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

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

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const sendMessage = useCallback(async (userText: string) => {
    if (!userText.trim() || isLoading) return

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: userText.trim(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInputValue('')
    setIsLoading(true)

    // Preparar histórico para a API (excluindo a mensagem inicial local)
    const history = [...messages, userMsg]
      .filter((m) => m.id !== 'init')
      .map((m) => ({ role: m.role, content: m.content }))

    // Se o histórico não tiver nenhuma mensagem do assistente ainda,
    // incluir a mensagem inicial como contexto
    const apiMessages =
      history.filter((m) => m.role === 'assistant').length === 0
        ? [{ role: 'assistant' as const, content: INITIAL_MESSAGE }, ...history]
        : history

    try {
      const response = await fetch('/api/diagnostic-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        throw new Error(err.error || `Erro ${response.status}`)
      }

      const data = await response.json()
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.reply,
      }
      setMessages((prev) => [...prev, assistantMsg])
    } catch (error: any) {
      toast.error(error.message || 'Erro ao contactar o assistente. Tente novamente.')
      // Remover a mensagem do utilizador em caso de erro de rede grave
    } finally {
      setIsLoading(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [messages, isLoading])

  const handleSend = () => {
    sendMessage(inputValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-[680px] w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-premium border border-border overflow-hidden">
      {/* Header — fundo preto com detalhe dourado */}
      <div className="bg-[hsl(0,0%,8%)] p-4 text-white flex items-center gap-3 border-b-2 border-secondary/60">
        <div className="w-10 h-10 bg-secondary/20 border border-secondary/40 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-5 h-5 text-secondary" />
        </div>
        <div>
          <h3 className="font-bold text-base text-white">Assistente Método RNS</h3>
          <p className="text-xs text-white/60">Diagnóstico · Identificação da Solução Ideal</p>
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
                    ? 'gradient-navy-gold text-white rounded-tr-none'
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
                <span
                  className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce"
                  style={{ animationDelay: '0ms' }}
                />
                <span
                  className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce"
                  style={{ animationDelay: '150ms' }}
                />
                <span
                  className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce"
                  style={{ animationDelay: '300ms' }}
                />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 bg-muted/30 border-t border-border">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escreva a sua mensagem..."
            className="flex-1 bg-white text-sm"
            disabled={isLoading}
            maxLength={600}
          />
          <Button
            onClick={handleSend}
            disabled={isLoading || !inputValue.trim()}
            size="icon"
            className="gradient-navy-gold hover:opacity-90 border-0 flex-shrink-0"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
        <p className="text-[10px] text-muted-foreground mt-2 text-center">
          Diagnóstico confidencial · Assistente com IA · Sem compromisso
        </p>
      </div>
    </div>
  )
}
