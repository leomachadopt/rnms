import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Send, Bot, Loader2, GraduationCap, Users, Lightbulb } from 'lucide-react'
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
    service: 'formacao' | 'consultoria' | 'mentoria'
    title: string
    description: string
    features: string[]
    cta: string
  }
}

type ProfessionalData = {
  name?: string
  email?: string
  phone?: string
  specialty?: string
  experience?: string
  mainChallenges?: string[]
  goals?: string
  currentSituation?: string
}

export function ProfessionalDiagnosticChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [step, setStep] = useState(0)
  const [userData, setUserData] = useState<ProfessionalData>({})
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

  const analyzeAndRecommend = (data: ProfessionalData) => {
    const challenges = data.mainChallenges || []
    const experience = data.experience || ''
    const goals = data.goals || ''

    // Lógica de recomendação baseada nas respostas
    const hasBasicChallenges = challenges.some(c =>
      c.includes('Instabilidade') ||
      c.includes('Recidivas') ||
      c.includes('Dificuldade de leitura sistémica')
    )

    const hasStrategicChallenges = challenges.some(c =>
      c.includes('Casos complexos') ||
      c.includes('Planos terapêuticos')
    )

    const wantsPositioning = goals?.includes('diferenciação') ||
                             goals?.includes('referência') ||
                             goals?.includes('posicionamento')

    const isExperienced = experience.includes('mais de') || experience.includes('10')

    // Determinar serviço recomendado
    let recommendedService: 'formacao' | 'consultoria' | 'mentoria'
    let title: string
    let description: string
    let features: string[]
    let cta: string

    if (wantsPositioning && isExperienced) {
      // Mentoria
      recommendedService = 'mentoria'
      title = 'Mentoria Clínica e Posicionamento Profissional'
      description = 'Com base no seu perfil, recomendamos a nossa **Mentoria Premium**. Ideal para profissionais experientes que procuram diferenciação profissional e posicionamento como referência clínica.'
      features = [
        'Aprofundamento de raciocínio clínico sistémico',
        'Estruturação de diferenciação profissional',
        'Estratégia de comunicação de valor terapêutico',
        'Posicionamento como referência no mercado',
        'Acompanhamento personalizado contínuo',
        'Estratégia de valorização profissional'
      ]
      cta = 'Solicitar Informações sobre Mentoria'
    } else if (hasStrategicChallenges) {
      // Consultoria
      recommendedService = 'consultoria'
      title = 'Consultoria Clínica Estratégica'
      description = 'Para o seu caso, recomendamos a nossa **Consultoria Selectiva**. Perfeita para análise de casos complexos e estruturação de planos terapêuticos integrados.'
      features = [
        'Análise detalhada de casos complexos',
        'Estruturação de planos terapêuticos sistémicos',
        'Integração de variáveis sistémicas no tratamento',
        'Aumento de previsibilidade clínica',
        'Valorização do plano de tratamento',
        'Acompanhamento personalizado dos casos'
      ]
      cta = 'Solicitar Informações sobre Consultoria'
    } else {
      // Formação
      recommendedService = 'formacao'
      title = 'Formação Presencial Certificada — Método RNS'
      description = 'Recomendamos a nossa **Formação Certificada RNS**. Ideal para reorganizar o raciocínio clínico e ampliar a compreensão sistémica da má oclusão.'
      features = [
        'Modelo estruturado de raciocínio clínico sistémico',
        'Integração de sistema nervoso, oclusão e função',
        'Aumento de previsibilidade terapêutica',
        'Redução de instabilidade e recidivas',
        'Certificação reconhecida',
        'Comunidade de profissionais alinhados'
      ]
      cta = 'Ver Detalhes da Formação RNS'
    }

    return {
      service: recommendedService,
      title,
      description,
      features,
      cta
    }
  }

  const nextStep = useCallback(() => {
    const currentStep = step + 1
    setStep(currentStep)

    switch (currentStep) {
      case 1:
        addMessage({
          sender: 'ai',
          text: 'Para começarmos, qual é o seu nome?',
          type: 'text',
        })
        break
      case 2:
        addMessage({
          sender: 'ai',
          text: 'Qual é o seu email? (para enviarmos as informações detalhadas)',
          type: 'text',
        })
        break
      case 3:
        addMessage({
          sender: 'ai',
          text: 'Qual é a sua especialidade ou área de atuação?',
          type: 'options',
          options: [
            'Ortodontia',
            'Medicina Dentária Geral',
            'DTM e Dor Orofacial',
            'Ortopedia Funcional',
            'Odontopediatria',
            'Outra especialidade'
          ],
        })
        break
      case 4:
        addMessage({
          sender: 'ai',
          text: 'Há quanto tempo atua na área clínica?',
          type: 'options',
          options: [
            'Menos de 2 anos',
            '2 a 5 anos',
            '5 a 10 anos',
            'Mais de 10 anos'
          ],
        })
        break
      case 5:
        addMessage({
          sender: 'ai',
          text: 'Quais são os principais desafios que enfrenta na sua prática clínica? (Pode selecionar vários)',
          type: 'options',
          options: [
            'Instabilidade de resultados',
            'Recidivas frequentes',
            'Dificuldade de leitura sistémica dos casos',
            'Casos complexos sem protocolo claro',
            'Dificuldade em estruturar planos terapêuticos',
            'Comunicação de valor ao paciente',
            'Diferenciação profissional no mercado'
          ],
          multiSelect: true,
        })
        setSelectedOptions([])
        break
      case 6:
        addMessage({
          sender: 'ai',
          text: 'O que procura alcançar profissionalmente?',
          type: 'options',
          options: [
            'Maior previsibilidade clínica',
            'Compreensão sistémica da má oclusão',
            'Diferenciação profissional',
            'Posicionamento como referência',
            'Resolver casos complexos',
            'Integrar conhecimentos fragmentados'
          ],
        })
        break
      case 7:
        addMessage({
          sender: 'ai',
          text: 'Como descreveria a sua situação atual?',
          type: 'options',
          options: [
            'Domino técnicas mas sinto que falta algo',
            'Tenho casos que não evoluem como esperado',
            'Quero aprofundar raciocínio clínico',
            'Procuro diferenciação no mercado',
            'Preciso de orientação em casos específicos'
          ],
        })
        break
      case 8:
        addMessage({
          sender: 'ai',
          text: 'Perfeito! Estou a analisar o seu perfil para recomendar a solução mais adequada...',
          type: 'text',
        })

        setTimeout(() => {
          const recommendation = analyzeAndRecommend(userData)

          addMessage({
            sender: 'ai',
            text: `Com base nas suas respostas, identifiquei a solução ideal para o seu caso.`,
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
        }, 2000)
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
        case 1: // Name
          setUserData((prev) => ({ ...prev, name: input }))
          nextStep()
          break
        case 2: // Email
          if (!input.includes('@')) {
            addMessage({
              sender: 'ai',
              text: 'Por favor, digite um email válido.',
            })
            setIsLoading(false)
            return
          }
          setUserData((prev) => ({ ...prev, email: input }))
          nextStep()
          break
        case 3: // Specialty
          setUserData((prev) => ({ ...prev, specialty: input }))
          nextStep()
          break
        case 4: // Experience
          setUserData((prev) => ({ ...prev, experience: input }))
          nextStep()
          break
        case 5: // Main Challenges (multi-select)
          if (selectedOptions.length === 0) {
            toast.error('Por favor, selecione pelo menos uma opção')
            setIsLoading(false)
            return
          }
          setUserData((prev) => ({ ...prev, mainChallenges: selectedOptions }))
          setSelectedOptions([])
          nextStep()
          break
        case 6: // Goals
          setUserData((prev) => ({ ...prev, goals: input }))
          nextStep()
          break
        case 7: // Current Situation
          setUserData((prev) => ({ ...prev, currentSituation: input }))
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

  // Initial greeting
  useEffect(() => {
    if (step === 0 && !initializedRef.current) {
      initializedRef.current = true
      addMessage({
        sender: 'ai',
        text: 'Olá! Sou o assistente do Método RNS. Vou fazer algumas perguntas para compreender os seus desafios clínicos e recomendar a solução mais adequada: **Formação Certificada**, **Consultoria Clínica** ou **Mentoria Profissional**.',
      })
      setTimeout(() => nextStep(), 1500)
    }
  }, [step, addMessage, nextStep])

  // Auto-scroll to bottom
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
        return <GraduationCap className="w-12 h-12 text-primary" />
      case 'consultoria':
        return <Users className="w-12 h-12 text-green-600" />
      case 'mentoria':
        return <Lightbulb className="w-12 h-12 text-purple-600" />
      default:
        return <GraduationCap className="w-12 h-12 text-primary" />
    }
  }

  const getServiceColor = (service: string) => {
    switch (service) {
      case 'formacao':
        return 'from-blue-500 to-blue-600'
      case 'consultoria':
        return 'from-green-500 to-green-600'
      case 'mentoria':
        return 'from-purple-500 to-purple-600'
      default:
        return 'from-blue-500 to-blue-600'
    }
  }

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto bg-white rounded-xl shadow-xl border border-border overflow-hidden">
      <div className="bg-gradient-to-r from-primary to-blue-600 p-4 text-white flex items-center gap-3">
        <Bot className="w-6 h-6" />
        <div>
          <h3 className="font-bold">Assistente Método RNS</h3>
          <p className="text-xs opacity-90">Diagnóstico de Necessidades Clínicas</p>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((msg) => {
            if (msg.type === 'recommendation' && msg.recommendation) {
              const rec = msg.recommendation
              return (
                <Card key={msg.id} className="border-2 border-primary animate-fade-in">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start gap-4">
                      {getServiceIcon(rec.service)}
                      <div className="flex-1">
                        <div className={`inline-block px-3 py-1 bg-gradient-to-r ${getServiceColor(rec.service)} text-white text-xs font-semibold rounded-full mb-2`}>
                          Recomendação Personalizada
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          {rec.title}
                        </h3>
                        <ReactMarkdown className="text-muted-foreground mb-4">
                          {rec.description}
                        </ReactMarkdown>
                      </div>
                    </div>

                    <div className="space-y-2 bg-slate-50 p-4 rounded-lg">
                      <p className="font-semibold text-sm text-foreground mb-2">O que está incluído:</p>
                      {rec.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                          <span className="text-sm text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <Button
                        asChild
                        size="lg"
                        className={`flex-1 bg-gradient-to-r ${getServiceColor(rec.service)} hover:opacity-90`}
                      >
                        <a href={`mailto:formacao@metodorns.pt?subject=Interesse em ${rec.title}&body=Olá, realizei o diagnóstico de necessidades e gostaria de receber mais informações sobre ${rec.title}.%0D%0A%0D%0AMeu nome: ${userData.name}%0D%0AEmail: ${userData.email}%0D%0AEspecialidade: ${userData.specialty}`}>
                          {rec.cta}
                        </a>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="flex-1"
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
                    'max-w-[80%] p-3 rounded-2xl animate-fade-in',
                    msg.sender === 'user'
                      ? 'bg-primary text-white rounded-tr-none'
                      : 'bg-muted text-foreground rounded-tl-none',
                  )}
                >
                  <ReactMarkdown
                    components={{
                      strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
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

          {/* Options Display */}
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
                          'rounded-full transition-all',
                          isSelected
                            ? 'bg-primary text-white shadow-md scale-105'
                            : 'border-primary text-primary hover:bg-primary hover:text-white',
                        )}
                      >
                        {option}
                        {isSelected && ' ✓'}
                      </Button>
                    )
                  })}
                </div>
                {currentMessage?.multiSelect && (
                  <div className="space-y-3 mt-4">
                    {selectedOptions.length > 0 && (
                      <div className="text-sm text-center text-muted-foreground bg-blue-50 py-2 px-4 rounded-full">
                        ✓ {selectedOptions.length} opção{selectedOptions.length > 1 ? 'ões' : ''} selecionada{selectedOptions.length > 1 ? 's' : ''}
                      </div>
                    )}
                    <Button
                      onClick={handleFinishMultiSelect}
                      disabled={selectedOptions.length === 0 || isLoading}
                      size="lg"
                      className="w-full rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold shadow-lg disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Processando...
                        </>
                      ) : selectedOptions.length > 0 ? (
                        <>
                          Continuar com {selectedOptions.length} opç{selectedOptions.length > 1 ? 'ões' : 'ão'}
                        </>
                      ) : (
                        'Selecione pelo menos uma opção para continuar'
                      )}
                    </Button>
                  </div>
                )}
              </div>
            )}
        </div>
      </ScrollArea>

      <div className="p-4 bg-gray-50 border-t border-border">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Digite a sua resposta..."
            className="flex-1 bg-white"
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
            className="bg-primary hover:bg-primary/90"
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
