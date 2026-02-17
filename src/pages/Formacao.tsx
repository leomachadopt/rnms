import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  GraduationCap,
  Users,
  Lightbulb,
  Briefcase,
  CheckCircle2,
  Target,
  TrendingUp,
  Award,
  BookOpen,
  MessageCircle,
  DollarSign,
  BarChart3,
  Building2
} from 'lucide-react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

const Formacao = () => {
  const heroRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const formationRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const servicesRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const inCompanyRef = useScrollAnimation({ threshold: 0.15, triggerOnce: true })
  const benefitsRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })

  const formationBenefits = [
    'Ampliar leitura clínica sistémica',
    'Integrar variáveis sistémicas',
    'Aumentar previsibilidade terapêutica',
    'Estruturar decisões clínicas',
    'Diferenciar prática profissional',
    'Reduzir instabilidade e recidivas'
  ]

  const services = [
    {
      icon: GraduationCap,
      title: 'Formação Presencial Certificada',
      subtitle: 'Método RNS',
      description: 'Formação estruturada destinada a profissionais que trabalham com oclusão e desejam reorganizar o raciocínio clínico através de uma leitura sistémica da má oclusão.',
      features: [
        'Modelo de raciocínio clínico estruturado',
        'Integração de variáveis sistémicas',
        'Aumento de previsibilidade',
        'Certificação reconhecida',
        'Acompanhamento pós-formação',
        'Comunidade de profissionais'
      ],
      highlight: 'Produto Central',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Users,
      title: 'Day Clinic — Consultoria In Loco',
      subtitle: 'Presença Clínica Directa',
      description: 'Consultoria presencial na sua clínica. Um dia de imersão clínica com avaliação, tratamento e acompanhamento directo de casos reais ao lado do profissional — aprendizagem prática em contexto real.',
      features: [
        'Presença física na sua clínica',
        'Avaliação sistémica de casos reais',
        'Condução e orientação de tratamentos',
        'Raciocínio clínico aplicado ao vivo',
        'Feedback imediato caso a caso',
        'Acompanhamento pós Day Clinic'
      ],
      highlight: 'In Loco',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Lightbulb,
      title: 'Mentoria Clínica e Posicionamento',
      subtitle: 'Programa Premium',
      description: 'Programa destinado a profissionais que desejam aprofundar raciocínio clínico, estruturar diferenciação profissional e posicionar-se como referência clínica.',
      features: [
        'Aprofundamento de raciocínio clínico',
        'Estruturação de diferenciação profissional',
        'Comunicação de valor terapêutico',
        'Posicionamento como referência',
        'Estratégia de valorização',
        'Acompanhamento contínuo'
      ],
      highlight: 'Premium',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Briefcase,
      title: 'Palestras & Formações In Company',
      subtitle: 'Business · Gestão · Vendas',
      description: 'Programas personalizados de palestras e workshops para clínicas, empresas do sector da saúde e equipas comerciais. Foco em gestão de negócio, liderança clínica e estratégias de alta performance em vendas.',
      features: [
        'Gestão estratégica de clínica',
        'Alta performance em vendas clínicas',
        'Liderança e cultura de equipa',
        'Negociação e conversão de casos',
        'Posicionamento e precificação premium',
        'Crescimento sustentável do negócio'
      ],
      highlight: 'In Company',
      color: 'from-amber-500 to-amber-600'
    }
  ]

  const targetAudience = [
    {
      title: 'Ortodontistas',
      description: 'Profissionais que procuram ampliar a compreensão sistémica da má oclusão'
    },
    {
      title: 'Médicos Dentistas',
      description: 'Clínicos que trabalham com oclusão e desejam maior previsibilidade'
    },
    {
      title: 'Especialistas em DTM',
      description: 'Profissionais que procuram integração entre oclusão e sistema funcional'
    },
    {
      title: 'Profissionais Experientes',
      description: 'Com base técnica consolidada que procuram aprofundar raciocínio clínico'
    }
  ]

  const differentials = [
    {
      icon: Target,
      title: 'Não é Técnica, é Raciocínio',
      description: 'O Método RNS não ensina uma técnica ortodôntica. Ensina a reorganizar a compreensão clínica da má oclusão dentro de um sistema adaptativo.'
    },
    {
      icon: TrendingUp,
      title: 'Previsibilidade Sustentada',
      description: 'Redução de instabilidade e recidivas através da compreensão das variáveis sistémicas que influenciam a organização oclusal.'
    },
    {
      icon: Award,
      title: 'Diferenciação por Critério',
      description: 'Valorização profissional baseada em raciocínio clínico profundo, não apenas em domínio técnico ou volume de casos.'
    },
    {
      icon: BookOpen,
      title: 'Formação Estruturada',
      description: 'Modelo pedagógico claro, com base conceptual sólida e aplicação prática imediata na condução dos tratamentos.'
    }
  ]

  return (
    <div className="flex flex-col gap-12 pb-16">
      {/* Hero Section */}
      <section className="relative gradient-luxury pt-20 pb-16 lg:pt-28 lg:pb-24 overflow-hidden min-h-[calc(100vh-80px)] flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.5),transparent_60%)]"></div>
        <div className="absolute inset-0 pattern-dots opacity-20"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div
            ref={heroRef.elementRef}
            className={`text-center max-w-4xl mx-auto transition-all duration-1000 ${
              heroRef.isVisible
                ? 'animate-fade-in-up opacity-100'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-block mb-6 badge-premium">
              Formação Método RNS
            </div>
            <h1 className="heading-premium text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] text-white mb-6">
              Reorganize o{' '}
              <span className="text-gradient-gold">
                Raciocínio Clínico
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-10 font-light">
              Formação estruturada em Reequilíbrio Neuro-Oclusal Sistémico.
              Para profissionais que procuram coerência, previsibilidade e diferenciação clínica baseada em critério.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center">
              <Button
                asChild
                size="lg"
                className="btn-gold text-base sm:text-lg px-10 py-7 hover-glow-gold"
              >
                <a
                  href="mailto:formacao@metodorns.pt"
                  className="flex items-center"
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  Solicitar Informações
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="glass-premium text-base sm:text-lg px-10 py-7 border-2 border-white/30 text-white hover:bg-white hover:text-primary hover:scale-105 transition-all font-semibold"
              >
                <Link to="/avaliacao">Qual serviço preciso?</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Formação Presencial */}
      <section className="section-premium container-premium">
        <div
          ref={formationRef.elementRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            formationRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="inline-block mb-4 subheading-premium text-primary">
            Formação Certificada
          </div>
          <h2 className="heading-premium text-3xl lg:text-5xl mb-6">
            Formação Presencial<br />
            <span className="text-gradient-gold">Método RNS</span>
          </h2>
          <p className="text-premium text-lg max-w-3xl mx-auto">
            Destinada a profissionais que já possuem base técnica consolidada e procuram
            aprofundar coerência terapêutica, previsibilidade e valorização profissional sustentada.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {formationBenefits.map((benefit, index) => (
            <Card
              key={index}
              className={`glass-premium border-l-4 border-l-secondary hover:shadow-premium transition-all duration-1000 hover-lift ${
                formationRef.isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full gradient-navy-gold flex items-center justify-center mt-0.5 shadow-gold">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <p className="font-medium text-foreground leading-relaxed">
                    {benefit}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="glass-premium border-gradient rounded-[2rem] p-10 lg:p-12 shadow-premium max-w-4xl mx-auto">
          <h3 className="heading-premium text-2xl mb-8 text-center">A quem se dirige</h3>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {targetAudience.map((audience, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full gradient-navy-gold flex items-center justify-center mt-0.5 shadow-gold">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-foreground mb-1">{audience.title}</p>
                  <p className="text-base text-premium">{audience.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfólio de Serviços */}
      <section className="section-premium gradient-subtle">
        <div className="container-premium">
          <div
            ref={servicesRef.elementRef}
            className={`text-center mb-16 transition-all duration-1000 ${
              servicesRef.isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="inline-block mb-4 subheading-premium text-primary">
              Portfólio Completo
            </div>
            <h2 className="heading-premium text-3xl lg:text-5xl mb-6">
              Produtos e Serviços
            </h2>
            <p className="text-premium text-lg max-w-3xl mx-auto">
              Do raciocínio clínico à diferenciação profissional. Soluções estruturadas
              para cada fase do desenvolvimento clínico.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon
              return (
                <Card
                  key={index}
                  className={`card-premium hover-lift group transition-all duration-1000 ${
                    servicesRef.isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-16 h-16 gradient-navy-gold rounded-2xl flex items-center justify-center shadow-gold group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-semibold shadow-sm">
                        {service.highlight}
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-bold text-foreground">{service.title}</CardTitle>
                    <p className="text-sm text-primary font-semibold">{service.subtitle}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-premium leading-relaxed">
                      {service.description}
                    </p>
                    <div className="space-y-3 pt-4 border-t border-gradient-subtle">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full gradient-navy-gold flex items-center justify-center mt-0.5">
                            <CheckCircle2 className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-sm text-foreground font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* In Company — Business, Gestão & Vendas */}
      <section className="section-premium container-premium">
        <div
          ref={inCompanyRef.elementRef}
          className={`transition-all duration-1000 ${
            inCompanyRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-block mb-4 subheading-premium text-primary">
              In Company
            </div>
            <h2 className="heading-premium text-3xl lg:text-5xl mb-6">
              Palestras & Formações<br />
              <span className="text-gradient-gold">Business · Gestão · Vendas</span>
            </h2>
            <p className="text-premium text-lg max-w-3xl mx-auto">
              Programas sob medida para clínicas, grupos empresariais de saúde e equipas comerciais
              que querem crescer com estratégia, liderança e alta performance.
            </p>
          </div>

          {/* Propostas de valor — 3 pilares */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10 mb-16">
            {[
              {
                icon: BarChart3,
                title: 'Gestão Estratégica de Clínica',
                description: 'Como transformar uma clínica num negócio altamente rentável. Indicadores de performance, precificação premium, estrutura operacional e tomada de decisão baseada em dados.',
                topics: [
                  'KPIs essenciais para clínicas',
                  'Precificação e posicionamento premium',
                  'Processos e eficiência operacional',
                  'Crescimento sustentável e escalável',
                ]
              },
              {
                icon: DollarSign,
                title: 'Alta Performance em Vendas',
                description: 'Metodologia de conversão ética e de alto valor para profissionais e equipas de atendimento. Da primeira consulta ao fecho de tratamentos premium.',
                topics: [
                  'Comunicação de valor terapêutico',
                  'Conversão de casos complexos',
                  'Negociação e objecções frequentes',
                  'Follow-up e fidelização de pacientes',
                ]
              },
              {
                icon: Building2,
                title: 'Liderança e Cultura de Equipa',
                description: 'Construção de equipas de alta performance orientadas a resultados. Liderança clínica, gestão de pessoas e desenvolvimento de cultura organizacional vencedora.',
                topics: [
                  'Liderança clínica e inspiracional',
                  'Recrutamento e retenção de talento',
                  'Cultura de performance e resultados',
                  'Comunicação interna e motivação',
                ]
              }
            ].map((pillar, idx) => {
              const Icon = pillar.icon
              return (
                <Card
                  key={idx}
                  className={`card-premium hover-lift-premium group transition-all duration-700 ${
                    inCompanyRef.isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${idx * 150}ms` }}
                >
                  <CardContent className="p-8 lg:p-10 space-y-6">
                    <div className="w-14 h-14 rounded-2xl gradient-navy-gold flex items-center justify-center shadow-gold group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="heading-premium text-xl mb-3 text-foreground">{pillar.title}</h3>
                      <p className="text-premium text-base leading-relaxed mb-5">{pillar.description}</p>
                    </div>
                    <ul className="space-y-3 pt-4 border-t border-secondary/20">
                      {pillar.topics.map((topic, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full gradient-navy-gold flex items-center justify-center">
                            <CheckCircle2 className="w-3 h-3 text-white" />
                          </div>
                          <span className="text-sm font-medium text-foreground">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* CTA In Company */}
          <div className="glass-premium border-gradient rounded-[2rem] p-10 lg:p-14 shadow-premium text-center max-w-4xl mx-auto">
            <div className="w-16 h-16 gradient-navy-gold rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-gold">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <div className="inline-block mb-4 badge-elite">Formato Personalizado</div>
            <h3 className="heading-premium text-2xl lg:text-3xl mb-4 text-foreground">
              Programa desenvolvido para a sua equipa
            </h3>
            <p className="text-premium text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              Cada programa In Company é desenhado à medida das necessidades específicas da sua
              clínica ou empresa. Diagnóstico prévio, conteúdo customizado e acompanhamento pós-formação.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="btn-gold hover-glow-gold text-base px-10 py-6"
              >
                <a href="mailto:formacao@metodorns.pt" className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Solicitar Proposta In Company
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-secondary/40 text-foreground hover:bg-secondary/10 hover:border-secondary transition-all text-base px-10 py-6 font-semibold"
              >
                <Link to="/avaliacao">Diagnóstico IA Gratuito</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="section-premium container-premium">
        <div
          ref={benefitsRef.elementRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            benefitsRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="inline-block mb-4 subheading-premium text-primary">
            Diferenciais
          </div>
          <h2 className="heading-premium text-3xl lg:text-5xl mb-6">
            O que torna a formação RNS única
          </h2>
          <p className="text-premium text-lg max-w-3xl mx-auto">
            Não é uma formação técnica tradicional. É uma reorganização da forma de pensar
            antes de reorganizar a forma de tratar.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {differentials.map((item, index) => {
            const Icon = item.icon
            return (
              <Card
                key={index}
                className={`card-premium hover-lift group transition-all duration-1000 ${
                  benefitsRef.isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-8 lg:p-10">
                  <div className="w-14 h-14 rounded-full gradient-navy-gold flex items-center justify-center mb-6 shadow-gold group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-foreground">{item.title}</h3>
                  <p className="text-premium leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* CTA Final */}
      <section className="container-premium">
        <div className="gradient-navy-gold rounded-[3rem] p-12 lg:p-20 text-center text-white space-y-10 relative overflow-hidden shadow-premium hover-glow-gold">
          <div className="absolute inset-0 pattern-dots opacity-20"></div>

          <div className="relative z-10">
            <div className="inline-block mb-6 badge-premium bg-white/10 backdrop-blur-sm border border-white/30">
              <span className="font-semibold text-white">Próximo Passo</span>
            </div>
            <h2 className="heading-premium text-3xl lg:text-5xl mb-6 leading-tight text-white">
              Pronto para reorganizar<br />
              o raciocínio clínico?
            </h2>
            <p className="text-lg lg:text-xl mb-10 text-white/90 max-w-2xl mx-auto leading-relaxed font-light">
              Entre em contacto para receber informações sobre próximas turmas,
              investimento e processo de inscrição.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-white text-primary hover:bg-white/90 shadow-premium hover:scale-105 transition-all text-lg px-12 py-7 font-bold hover-lift"
              >
                <a href="mailto:formacao@metodorns.pt">
                  <MessageCircle className="mr-2 w-5 h-5" />
                  Solicitar Informações
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="glass-premium border-2 border-white/30 text-white hover:bg-white hover:text-primary shadow-premium hover:scale-105 transition-all text-lg px-12 py-7 font-semibold"
              >
                <Link to="/leonardo">
                  Conheça o Fundador
                </Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-white/80 font-light">
              Posicionamento Premium • Formação Selectiva • Impacto Real
            </p>
          </div>

          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-radial from-white/10 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-secondary/20 to-transparent rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
        </div>
      </section>
    </div>
  )
}

export default Formacao
