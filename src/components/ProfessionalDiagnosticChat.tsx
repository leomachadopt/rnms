import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Send, Bot, Loader2, GraduationCap, Users, Lightbulb, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'
import ReactMarkdown from 'react-markdown'

type Message = {
  id: string
  sender: 'ai' | 'user'
  text: string
  type?: 'text' | 'options' | 'recommendation'
  options?: string[]
  multiSelect?: boolean
  recommendation?: {
    service: 'formacao' | 'day-clinic' | 'mentoria' | 'in-company'
    title: string
    description: string
    features: string[]
    cta: string
    ctaEmail: string
  }
}

type DiagnosticData = {
  name?: string
  email?: string
  role?: string
  clinicSize?: string
  mainPain?: string
  painDetails?: string[]
  businessGoal?: string
  urgency?: string
  previousTraining?: string
}

export function ProfessionalDiagnosticChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [step, setStep] = useState(0)
  const [userData, setUserData] = useState<DiagnosticData>({})
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)
  const initializedRef = useRef(false)

  const addMessage = useCallback((msg: Omit<Message, 'id'>) => {
    setMessages((prev) => [
      ...prev,
      { ...msg, id: Math.random().toString(36).substring(7) },
    ])
  }, [])

  const analyzeAndRecommend = (data: DiagnosticData) => {
    const pain = data.mainPain || ''
    const painDetails = data.painDetails || []
    const goal = data.businessGoal || ''
    const role = data.role || ''
    const urgency = data.urgency || ''

    // Lógica de recomendação cruzada baseada nos dados recolhidos

    // IN COMPANY — dono ou gestor com equipa, foco em vendas/gestão/liderança
    const isManagerWithTeam =
      role.includes('Gestor') || role.includes('Director') || role.includes('múltiplos')
    const wantsBusinessGrowth =
      goal.includes('Crescer') || goal.includes('escalar') ||
      painDetails.some(p => p.includes('vendas') || p.includes('equipa') || p.includes('gestão'))

    // MENTORIA — profissional experiente com dor no posicionamento, conversão e marketing
    const wantsPositioning =
      goal.includes('referência') || goal.includes('Posicionamento') ||
      painDetails.some(p => p.includes('marketing') || p.includes('preço') || p.includes('converter'))

    // DAY CLINIC — dor clínica directa, casos complexos, quer suporte prático in loco
    const wantsClinicalSupport =
      pain.includes('Casos complexos') || pain.includes('clínica') ||
      painDetails.some(p => p.includes('caso') || p.includes('diagnóstico') || p.includes('resultado'))

    // FORMAÇÃO — base do funil, quer reorganizar raciocínio clínico
    const wantsFoundation =
      pain.includes('raciocínio') || pain.includes('sistémica') ||
      goal.includes('base') || goal.includes('estruturar')

    // Urgência alta favorece Day Clinic ou Mentoria
    const isUrgent = urgency.includes('Agora') || urgency.includes('1 mês')

    let recommendedService: 'formacao' | 'day-clinic' | 'mentoria' | 'in-company'
    let title: string
    let description: string
    let features: string[]
    let cta: string
    let ctaEmail: string

    if (isManagerWithTeam && wantsBusinessGrowth) {
      recommendedService = 'in-company'
      title = 'Palestras & Formações In Company'
      description = `**${data.name || 'Olá'}**, com base no seu perfil de gestor e nos desafios que descreveu, o nosso programa **In Company** é a solução mais alinhada. Desenvolvemos um programa personalizado para a sua equipa com foco em gestão estratégica, alta performance comercial e liderança.`
      features = [
        'Diagnóstico prévio das necessidades da equipa',
        'Programa de gestão estratégica de clínica',
        'Formação em vendas clínicas de alto valor',
        'Workshop de liderança e cultura de equipa',
        'Conteúdo 100% personalizado ao seu contexto',
        'Acompanhamento pós-formação com métricas'
      ]
      cta = 'Solicitar Proposta In Company'
      ctaEmail = 'Olá, realizei o diagnóstico e tenho interesse no programa In Company para a minha equipa.'
    } else if (wantsPositioning && !wantsFoundation) {
      recommendedService = 'mentoria'
      title = 'Mentoria Clínica, Comercial & Marketing'
      description = `**${data.name || 'Olá'}**, o seu perfil indica que já tem base técnica — a sua principal dor está em **converter melhor, posicionar-se como referência e crescer comercialmente**. A nossa Mentoria Premium é exactamente para isso: raciocínio clínico avançado + estratégia de negócio.`
      features = [
        'Posicionamento como autoridade clínica de referência',
        'Estratégia de marketing clínico e presença digital',
        'Conversão de casos e comunicação de valor premium',
        'Precificação estratégica e upsell de tratamentos',
        'Aprofundamento do raciocínio clínico sistémico',
        'Acompanhamento contínuo e personalizado'
      ]
      cta = 'Solicitar Informações sobre Mentoria'
      ctaEmail = 'Olá, realizei o diagnóstico e tenho interesse na Mentoria Clínica, Comercial & Marketing.'
    } else if (wantsClinicalSupport && isUrgent) {
      recommendedService = 'day-clinic'
      title = 'Day Clinic — Consultoria In Loco'
      description = `**${data.name || 'Olá'}**, a sua dor é essencialmente clínica e precisa de suporte prático e imediato. O **Day Clinic** é uma imersão presencial na sua clínica: avaliação e condução de casos reais, raciocínio clínico aplicado ao vivo e feedback directo caso a caso.`
      features = [
        'Presença física do Leonardo Machado na sua clínica',
        'Avaliação sistémica de casos reais selecionados',
        'Orientação e condução ao vivo dos tratamentos',
        'Raciocínio clínico demonstrado em tempo real',
        'Feedback imediato e aprendizagem contextual',
        'Relatório e acompanhamento pós Day Clinic'
      ]
      cta = 'Agendar Day Clinic In Loco'
      ctaEmail = 'Olá, realizei o diagnóstico e tenho interesse no Day Clinic — Consultoria In Loco.'
    } else {
      recommendedService = 'formacao'
      title = 'Formação Presencial Certificada — Método RNS'
      description = `**${data.name || 'Olá'}**, o seu diagnóstico indica que a melhor base para o seu desenvolvimento é a **Formação Certificada RNS**. Um modelo estruturado de raciocínio clínico que reorganiza a forma de compreender e tratar a má oclusão — fundamento para qualquer crescimento posterior.`
      features = [
        'Modelo estruturado de raciocínio clínico sistémico',
        'Integração de sistema nervoso, oclusão e função',
        'Maior previsibilidade e coerência terapêutica',
        'Redução de instabilidade e recidivas',
        'Certificação reconhecida internacionalmente',
        'Acesso à comunidade exclusiva de profissionais RNS'
      ]
      cta = 'Solicitar Informações sobre a Formação'
      ctaEmail = 'Olá, realizei o diagnóstico e tenho interesse na Formação Presencial Certificada RNS.'
    }

    return { service: recommendedService, title, description, features, cta, ctaEmail }
  }

  const nextStep = useCallback(() => {
    const currentStep = step + 1
    setStep(currentStep)

    switch (currentStep) {
      case 1:
        addMessage({
          sender: 'ai',
          text: 'Para começar, qual é o seu nome?',
          type: 'text',
        })
        break

      case 2:
        addMessage({
          sender: 'ai',
          text: `Prazer, ${userData.name}! 👋\n\nQual é o seu email profissional? Envio-lhe as informações detalhadas após o diagnóstico.`,
          type: 'text',
        })
        break

      case 3:
        addMessage({
          sender: 'ai',
          text: 'Qual melhor descreve o seu perfil actual?',
          type: 'options',
          options: [
            'Clínico individual — trabalho sozinho',
            'Dono de clínica com 1 a 3 profissionais',
            'Gestor de clínica com equipa alargada',
            'Director clínico ou grupo com múltiplos espaços',
            'Profissional a iniciar actividade própria',
          ],
        })
        break

      case 4:
        addMessage({
          sender: 'ai',
          text: 'Qual é a sua **maior dor** neste momento? Seja honesto — é isso que me vai ajudar a recomendar o caminho certo.',
          type: 'options',
          options: [
            'Resultados clínicos instáveis ou recidivas',
            'Casos complexos que não consigo resolver bem',
            'Dificuldade em converter pacientes e fechar casos',
            'A clínica não cresce como esperado',
            'Equipa sem foco, motivação ou cultura de resultados',
            'Não consigo cobrar o que o meu trabalho vale',
            'Falta-me base para um raciocínio clínico mais sólido',
          ],
        })
        break

      case 5:
        addMessage({
          sender: 'ai',
          text: 'Entendo. Agora diga-me com mais detalhe — **o que está a travar o seu crescimento?** (Selecione todas as que se aplicam)',
          type: 'options',
          options: [
            'Instabilidade nos diagnósticos e planos de tratamento',
            'Pouca diferenciação em relação à concorrência',
            'Marketing fraco ou ausência de posicionamento digital',
            'Dificuldade em precificar e comunicar valor premium',
            'Equipa comercial sem formação para converter',
            'Não sei como escalar sem perder qualidade',
            'Falta de sistematização nos processos clínicos',
            'Baixa taxa de conversão na primeira consulta',
          ],
          multiSelect: true,
        })
        setSelectedOptions([])
        break

      case 6:
        addMessage({
          sender: 'ai',
          text: 'Qual é o **principal objectivo** que quer alcançar nos próximos 12 meses?',
          type: 'options',
          options: [
            'Melhorar a qualidade e previsibilidade clínica',
            'Aumentar o ticket médio e faturação',
            'Posicionamento como referência no mercado',
            'Crescer e escalar a operação da clínica',
            'Construir e liderar uma equipa de alta performance',
            'Dominar o raciocínio clínico sistémico (base sólida)',
          ],
        })
        break

      case 7:
        addMessage({
          sender: 'ai',
          text: 'Já teve alguma formação ou acompanhamento em gestão, marketing ou clínica anteriormente?',
          type: 'options',
          options: [
            'Sim, formações clínicas mas nunca em gestão/marketing',
            'Sim, já fiz cursos de gestão ou vendas',
            'Sim, já tive mentoria ou coaching',
            'Não, seria a minha primeira experiência estruturada',
          ],
        })
        break

      case 8:
        addMessage({
          sender: 'ai',
          text: 'Última pergunta: qual é a sua **urgência** para implementar mudanças?',
          type: 'options',
          options: [
            'Agora mesmo — preciso de resultados rápidos',
            'No próximo mês — estou a planear',
            'Nos próximos 3 meses — ainda a avaliar opções',
            'Sem prazo definido — só a explorar',
          ],
        })
        break

      case 9:
        addMessage({
          sender: 'ai',
          text: 'Perfeito. Estou a cruzar as suas respostas para identificar a solução mais adequada ao seu perfil...',
          type: 'text',
        })

        setTimeout(() => {
          const recommendation = analyzeAndRecommend(userData)

          addMessage({
            sender: 'ai',
            text: `Diagnóstico concluído. Com base no seu perfil e nas suas respostas, aqui está a minha recomendação:`,
            type: 'text',
          })

          setTimeout(() => {
            addMessage({
              sender: 'ai',
              text: '',
              type: 'recommendation',
              recommendation,
            })
          }, 1500)
        }, 2500)
        break

      default:
        break
    }
  }, [step, addMessage, userData])

  const processInput = useCallback(
    async (input: string) => {
      setIsLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 800))

      switch (step) {
        case 1: // Nome
          setUserData((prev) => ({ ...prev, name: input }))
          nextStep()
          break

        case 2: // Email
          if (!input.includes('@')) {
            addMessage({
              sender: 'ai',
              text: 'Por favor, introduza um email válido.',
            })
            setIsLoading(false)
            return
          }
          setUserData((prev) => ({ ...prev, email: input }))
          nextStep()
          break

        case 3: // Perfil/Papel
          setUserData((prev) => ({ ...prev, role: input }))
          nextStep()
          break

        case 4: // Maior dor
          setUserData((prev) => ({ ...prev, mainPain: input }))
          nextStep()
          break

        case 5: // Detalhes da dor (multi-select)
          if (selectedOptions.length === 0) {
            toast.error('Por favor, selecione pelo menos uma opção')
            setIsLoading(false)
            return
          }
          setUserData((prev) => ({ ...prev, painDetails: selectedOptions }))
          setSelectedOptions([])
          nextStep()
          break

        case 6: // Objectivo principal
          setUserData((prev) => ({ ...prev, businessGoal: input }))
          nextStep()
          break

        case 7: // Formação anterior
          setUserData((prev) => ({ ...prev, previousTraining: input }))
          nextStep()
          break

        case 8: // Urgência
          setUserData((prev) => ({ ...prev, urgency: input }))
          nextStep()
          break

        default:
          break
      }
      setIsLoading(false)
    },
    [step, nextStep, selectedOptions, addMessage]
  )

  const handleOptionClick = (option: string) => {
    const currentMessage = messages[messages.length - 1]

    if (currentMessage?.multiSelect) {
      setSelectedOptions((prev) => {
        if (prev.includes(option)) {
          return prev.filter((opt) => opt !== option)
        } else {
          return [...prev, option]
        }
      })
    } else {
      addMessage({ sender: 'user', text: option })
      processInput(option)
    }
  }

  const handleSend = () => {
    if (!inputValue.trim()) return
    addMessage({ sender: 'user', text: inputValue })
    processInput(inputValue)
    setInputValue('')
  }

  const handleFinishMultiSelect = () => {
    if (selectedOptions.length === 0) {
      toast.error('Por favor, selecione pelo menos uma opção')
      return
    }

    const selectedText = selectedOptions.join(', ')
    addMessage({ sender: 'user', text: selectedText })

    setIsLoading(true)
    setTimeout(() => {
      processInput('')
    }, 300)
  }

  // Saudação inicial
  useEffect(() => {
    if (step === 0 && !initializedRef.current) {
      initializedRef.current = true
      addMessage({
        sender: 'ai',
        text: 'Olá! Sou o assistente de diagnóstico do **Método RNS**.\n\nVou fazer-lhe algumas perguntas para compreender os seus desafios reais e recomendar o serviço mais adequado ao seu momento: **Formação Certificada**, **Day Clinic In Loco**, **Mentoria Clínica & Comercial** ou **Programa In Company**.\n\nLeva menos de 3 minutos. Vamos começar?',
      })
      setTimeout(() => nextStep(), 2000)
    }
  }, [step, addMessage, nextStep])

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector(
        '[data-radix-scroll-area-viewport]',
      )
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }
  }, [messages, isLoading, selectedOptions])

  const currentMessage = messages[messages.length - 1]

  const getServiceIcon = (service: string) => {
    switch (service) {
      case 'formacao':
        return <GraduationCap className="w-10 h-10 text-white" />
      case 'day-clinic':
        return <Users className="w-10 h-10 text-white" />
      case 'mentoria':
        return <Lightbulb className="w-10 h-10 text-white" />
      case 'in-company':
        return <Briefcase className="w-10 h-10 text-white" />
      default:
        return <GraduationCap className="w-10 h-10 text-white" />
    }
  }

  const getServiceGradient = (service: string) => {
    // Todos usam o tema preto e dourado do Método RNS
    return 'from-[hsl(0,0%,8%)] to-[hsl(0,0%,20%)]'
  }

  const getServiceBadge = (service: string) => {
    switch (service) {
      case 'formacao': return 'Formação Certificada'
      case 'day-clinic': return 'Day Clinic · In Loco'
      case 'mentoria': return 'Mentoria Premium'
      case 'in-company': return 'In Company'
      default: return 'Recomendação'
    }
  }

  return (
    <div className="flex flex-col h-[680px] w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-premium border border-border overflow-hidden">
      {/* Header */}
      <div className="gradient-navy-gold p-4 text-white flex items-center gap-3">
        <div className="w-10 h-10 bg-white/15 rounded-full flex items-center justify-center">
          <Bot className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-bold text-base">Assistente Método RNS</h3>
          <p className="text-xs opacity-80">Diagnóstico · Identificação da Solução Ideal</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs opacity-80">Online</span>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((msg) => {
            if (msg.type === 'recommendation' && msg.recommendation) {
              const rec = msg.recommendation
              return (
                <Card key={msg.id} className="border-2 border-secondary/40 shadow-gold animate-fade-in">
                  <CardContent className="p-6 space-y-5">
                    {/* Service Header */}
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${getServiceGradient(rec.service)} flex items-center justify-center shadow-gold flex-shrink-0`}>
                        {getServiceIcon(rec.service)}
                      </div>
                      <div>
                        <div className="badge-premium text-xs mb-1">
                          {getServiceBadge(rec.service)}
                        </div>
                        <h3 className="text-lg font-bold text-foreground leading-tight">
                          {rec.title}
                        </h3>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="bg-secondary/5 border border-secondary/20 rounded-xl p-4">
                      <ReactMarkdown
                        className="text-foreground text-sm leading-relaxed"
                        components={{
                          strong: ({ node, ...props }) => <strong className="font-semibold text-foreground" {...props} />,
                        }}
                      >
                        {rec.description}
                      </ReactMarkdown>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      <p className="font-semibold text-sm text-foreground">O que está incluído:</p>
                      {rec.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2.5">
                          <div className="w-5 h-5 rounded-full gradient-navy-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-white text-[10px] font-bold">✓</span>
                          </div>
                          <span className="text-sm text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <Button
                        asChild
                        size="lg"
                        className="flex-1 btn-gold hover-glow-gold"
                      >
                        <a href={`mailto:formacao@metodorns.pt?subject=${encodeURIComponent(`Interesse: ${rec.title}`)}&body=${encodeURIComponent(`${rec.ctaEmail}\n\nNome: ${userData.name || ''}\nEmail: ${userData.email || ''}\nPerfil: ${userData.role || ''}`)}`}>
                          {rec.cta}
                        </a>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="flex-1 border-secondary/40 hover:bg-secondary/10"
                      >
                        <Link to="/formacao">
                          Ver Todos os Serviços
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            }

            return (
              <div
                key={msg.id}
                className={cn(
                  'flex w-full',
                  msg.sender === 'user' ? 'justify-end' : 'justify-start',
                )}
              >
                <div
                  className={cn(
                    'max-w-[80%] p-3 rounded-2xl animate-fade-in text-sm leading-relaxed',
                    msg.sender === 'user'
                      ? 'gradient-navy-gold text-white rounded-tr-none'
                      : 'bg-muted text-foreground rounded-tl-none',
                  )}
                >
                  <ReactMarkdown
                    components={{
                      strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
                      p: ({ node, ...props }) => <p className="mb-1 last:mb-0" {...props} />,
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>
              </div>
            )
          })}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted p-3 rounded-2xl rounded-tl-none flex items-center gap-1">
                <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          )}

          {/* Options */}
          {!isLoading &&
            messages.length > 0 &&
            currentMessage?.sender === 'ai' &&
            currentMessage?.type === 'options' && (
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2 mt-2 animate-fade-in">
                  {currentMessage.options?.map((option) => {
                    const isSelected = selectedOptions.includes(option)
                    return (
                      <Button
                        key={option}
                        variant={isSelected ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => handleOptionClick(option)}
                        className={cn(
                          'rounded-full text-xs transition-all',
                          isSelected
                            ? 'gradient-navy-gold text-white border-0 shadow-md scale-105'
                            : 'border-secondary/40 text-foreground hover:border-secondary hover:bg-secondary/10',
                        )}
                      >
                        {isSelected && <span className="mr-1">✓</span>}
                        {option}
                      </Button>
                    )
                  })}
                </div>
                {currentMessage?.multiSelect && (
                  <div className="space-y-3 mt-4">
                    {selectedOptions.length > 0 && (
                      <div className="text-xs text-center text-secondary font-medium bg-secondary/10 py-2 px-4 rounded-full border border-secondary/20">
                        {selectedOptions.length} opç{selectedOptions.length > 1 ? 'ões' : 'ão'} selecionada{selectedOptions.length > 1 ? 's' : ''}
                      </div>
                    )}
                    <Button
                      onClick={handleFinishMultiSelect}
                      disabled={selectedOptions.length === 0 || isLoading}
                      size="lg"
                      className="w-full rounded-full btn-gold hover-glow-gold disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          A processar...
                        </>
                      ) : selectedOptions.length > 0 ? (
                        `Continuar com ${selectedOptions.length} opç${selectedOptions.length > 1 ? 'ões' : 'ão'}`
                      ) : (
                        'Selecione pelo menos uma opção'
                      )}
                    </Button>
                  </div>
                )}
              </div>
            )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 bg-muted/30 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Digite a sua resposta..."
            className="flex-1 bg-white text-sm"
            disabled={
              isLoading ||
              (messages.length > 0 &&
                currentMessage?.type === 'options' &&
                !currentMessage?.multiSelect)
            }
          />
          <Button
            onClick={handleSend}
            disabled={isLoading || !inputValue.trim()}
            size="icon"
            className="gradient-navy-gold hover:opacity-90 border-0"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
