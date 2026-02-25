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

const INITIAL_MESSAGE = `Olá! Bem-vindo.

Esta é uma conversa de qualificação para o Programa RNS de Integração Ortodôntica Sistêmica.

Vou fazer-te algumas perguntas para entender o teu contexto e ver se o programa se adequa ao teu momento.

Para começar: qual é o teu nome?`

export function ProgramaRNSChat() {
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

  // Auto-focus input after each message
  useEffect(() => {
    if (!isLoading && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isLoading, messages])

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
      const response = await fetch('/api/programa-rns-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages }),
      })

      if (!response.ok) {
        throw new Error('Erro ao enviar mensagem')
      }

      const data = await response.json()

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: data.reply,
        },
      ])
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      toast.error('Erro ao enviar mensagem. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }, [messages, isLoading])

  const handleSend = () => {
    sendMessage(inputValue)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col w-full bg-white rounded-2xl shadow-premium border border-border overflow-hidden"
         style={{ minHeight: '600px', maxHeight: '90vh', height: 'clamp(600px, 85vh, 900px)' }}>

      {/* Header */}
      <div className="bg-[hsl(0,0%,8%)] p-4 text-white flex items-center gap-3 border-b-2 border-gold/60 flex-shrink-0">
        <div className="w-10 h-10 bg-gold/20 border border-gold/40 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-5 h-5 text-gold" />
        </div>
        <div>
          <h3 className="font-bold text-base text-white">Programa RNS — Qualificação</h3>
          <p className="text-xs text-white/60">Avaliação de Elegibilidade</p>
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
                <div className="w-7 h-7 rounded-full bg-[hsl(0,0%,8%)] border border-gold/40 flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                  <Bot className="w-3.5 h-3.5 text-gold" />
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
                      <ul className="list-disc list-inside space-y-1 my-2 [&>li]:text-[14px]" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className="list-decimal list-inside space-y-1 my-2 [&>li]:text-[14px]" {...props} />
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
                    h4: ({ node, ...props }) => (
                      <h4 className="font-bold text-sm mt-2 mb-1" {...props} />
                    ),
                    a: ({ node, href, ...props }) => {
                      // WhatsApp link (render como botão)
                      if (href?.startsWith('https://wa.me/')) {
                        return (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 mt-3 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:scale-105 no-underline"
                            {...props}
                          />
                        )
                      }
                      // Email link
                      if (href?.startsWith('mailto:')) {
                        return (
                          <a
                            href={href}
                            className="underline font-medium hover:opacity-80"
                            {...props}
                          />
                        )
                      }
                      // Internal link
                      return (
                        <Link
                          to={href || '/'}
                          className="underline font-medium hover:opacity-80"
                          {...props}
                        />
                      )
                    },
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex w-full justify-start">
              <div className="w-7 h-7 rounded-full bg-[hsl(0,0%,8%)] border border-gold/40 flex items-center justify-center flex-shrink-0 mr-2">
                <Bot className="w-3.5 h-3.5 text-gold" />
              </div>
              <div className="bg-muted rounded-2xl rounded-tl-none p-3.5 border border-border/40 animate-fade-in">
                <Loader2 className="w-4 h-4 animate-spin text-gold" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border bg-muted/20 flex-shrink-0">
        <div className="flex items-end gap-2.5">
          <Textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escreve a tua resposta..."
            disabled={isLoading}
            className="min-h-[56px] max-h-[120px] resize-none bg-white border-border/60 focus-visible:ring-gold/50 text-sm"
            rows={2}
          />
          <Button
            onClick={handleSend}
            disabled={isLoading || !inputValue.trim()}
            size="icon"
            className="h-[56px] w-[56px] bg-gold hover:bg-gold/90 text-black flex-shrink-0 shadow-md"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Enter para enviar · Shift+Enter para nova linha
        </p>
      </div>
    </div>
  )
}
