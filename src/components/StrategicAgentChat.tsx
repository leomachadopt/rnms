import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Send, Bot, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import ReactMarkdown from 'react-markdown'

type ChatMessage = {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const INITIAL_MESSAGE = `Bem-vindo ao Consultor Técnico Estratégico do **Método RNS**.

Sou um consultor especializado que está aqui para o ajudar a compreender como o Método RNS pode transformar a sua prática clínica.

Não se trata de aprender mais uma técnica.
Trata-se de reorganizar a forma como pensa, lê o paciente e toma decisões clínicas.

**Uma nova lente clínica para uma nova geração de decisões.**

Para começar: qual é o seu nome e qual é a sua área de actuação?`

export function StrategicAgentChat() {
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
  const inputRef = useRef<HTMLTextAreaElement>(null)

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

    // Prepara histórico para API
    const history = [...messages, userMsg]
      .filter((m) => m.id !== 'init')
      .map((m) => ({ role: m.role, content: m.content }))

    const apiMessages =
      history.filter((m) => m.role === 'assistant').length === 0
        ? [{ role: 'assistant' as const, content: INITIAL_MESSAGE }, ...history]
        : history

    try {
      const response = await fetch('/api/strategic-agent', {
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
    } finally {
      setIsLoading(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [messages, isLoading])

  const handleSend = () => sendMessage(inputValue)

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-premium border border-border overflow-hidden"
         style={{ minHeight: '600px', maxHeight: '820px', height: 'clamp(600px, 80vh, 820px)' }}>

      {/* Header */}
      <div className="bg-[hsl(0,0%,8%)] p-4 text-white flex items-center gap-3 border-b-2 border-secondary/60 flex-shrink-0">
        <div className="w-11 h-11 bg-secondary/20 border border-secondary/40 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-6 h-6 text-secondary" />
        </div>
        <div>
          <h3 className="font-bold text-lg text-white">Consultor Técnico Estratégico — Método RNS</h3>
          <p className="text-xs text-white/60">Direcionamento Estratégico · Compreensão da Lente Clínica RNS</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs text-white/60">Online</span>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-5" ref={scrollRef}>
        <div className="space-y-5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'flex w-full',
                msg.role === 'user' ? 'justify-end' : 'justify-start',
              )}
            >
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-[hsl(0,0%,8%)] border border-secondary/40 flex items-center justify-center flex-shrink-0 mr-3 mt-1">
                  <Bot className="w-4 h-4 text-secondary" />
                </div>
              )}
              <div
                className={cn(
                  'max-w-[82%] p-4 rounded-2xl animate-fade-in text-sm leading-relaxed',
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
                      <p className="mb-2.5 last:mb-0" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className="list-disc list-inside space-y-1.5 my-2.5" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className="list-decimal list-inside space-y-1.5 my-2.5" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                      <li className="leading-relaxed" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                      <h2 className="font-bold text-base mt-4 mb-2" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3 className="font-bold text-sm mt-3 mb-1.5" {...props} />
                    ),
                    h4: ({ node, ...props }) => (
                      <h4 className="font-semibold text-sm mt-2 mb-1" {...props} />
                    ),
                    blockquote: ({ node, ...props }) => (
                      <blockquote className="border-l-3 border-secondary/40 pl-3 italic my-2.5 text-muted-foreground" {...props} />
                    ),
                    a: ({ node, href, ...props }) =>
                      href?.startsWith('mailto:') ? (
                        <a
                          href={href}
                          className="underline font-medium text-secondary hover:opacity-80"
                          {...props}
                        />
                      ) : (
                        <Link
                          to={href || '/'}
                          className="underline font-medium text-secondary hover:opacity-80"
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
              <div className="w-8 h-8 rounded-full bg-[hsl(0,0%,8%)] border border-secondary/40 flex items-center justify-center flex-shrink-0 mr-3 mt-1">
                <Bot className="w-4 h-4 text-secondary" />
              </div>
              <div className="bg-muted p-3.5 rounded-2xl rounded-tl-none border border-border/40 flex items-center gap-1.5">
                <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 bg-muted/30 border-t border-border flex-shrink-0">
        <div className="flex gap-2 items-end">
          <Textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escreva a sua mensagem... (Shift+Enter para nova linha)"
            className="flex-1 bg-white text-sm min-h-[44px] max-h-[120px] resize-none"
            disabled={isLoading}
            maxLength={800}
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
          Consulta confidencial · Assistente com IA · Compreensão da lente clínica RNS
        </p>
      </div>
    </div>
  )
}
