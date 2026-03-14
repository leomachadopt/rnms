import { Link } from 'react-router-dom'
import { CheckCircle2, TrendingUp, Target, Users, LineChart, FileCheck, Calendar, AlertCircle, ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { useMetaPixel } from '@/hooks/use-meta-pixel'

const OdontoGrowth = () => {
  const { trackButtonClick } = useMetaPixel()

  const heroRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const realityRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const problemRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const programRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const whyRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const pillarsRef = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const timelineRef = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const systemsRef = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const resultsRef = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const profileRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const founderRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const formatRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const ctaRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })

  const handleCTAClick = (ctaName: string, destination: string) => {
    trackButtonClick(ctaName, destination)
  }

  const pillars = [
    {
      icon: TrendingUp,
      title: 'Receita',
      description: 'Estruturação do processo comercial da clínica para geração previsível de receita.'
    },
    {
      icon: Target,
      title: 'Operação',
      description: 'Organização da jornada do paciente e eficiência da agenda clínica.'
    },
    {
      icon: LineChart,
      title: 'Gestão',
      description: 'Clínica orientada por indicadores com o Painel KPI para decisões estratégicas.'
    },
    {
      icon: Users,
      title: 'Escala',
      description: 'Processos e governança com o sistema Clauger para crescimento sustentável.'
    }
  ]

  const timeline = [
    { month: 'Mês 1', title: 'Ajustes rápidos de receita', description: 'Implementação de melhorias imediatas na geração de receita' },
    { month: 'Mês 2', title: 'Estrutura comercial', description: 'Construção do processo comercial estruturado' },
    { month: 'Mês 3', title: 'Gestão por indicadores', description: 'Implementação do Painel KPI e métricas essenciais' },
    { month: 'Mês 4', title: 'Organização operacional', description: 'Otimização da jornada do paciente e agenda' },
    { month: 'Mês 5', title: 'Posicionamento e estratégia', description: 'Definição de posicionamento e estratégia de crescimento' },
    { month: 'Mês 6', title: 'Governança e crescimento', description: 'Implementação de processos e sistema de governança' }
  ]

  const systems = [
    {
      icon: LineChart,
      title: 'Painel KPI',
      description: 'Gestão da clínica baseada em indicadores essenciais e análise de performance.'
    },
    {
      icon: FileCheck,
      title: 'Clauger',
      description: 'Sistema de governança e processos para organização e delegação eficiente.'
    },
    {
      icon: Target,
      title: 'Plataforma Estratégica',
      description: 'Organização das decisões de crescimento e planejamento estratégico.'
    }
  ]

  const results = [
    'Estrutura comercial clara e previsível',
    'Crescimento financeiro mais consistente',
    'Gestão baseada em indicadores confiáveis',
    'Operação clínica mais eficiente',
    'Processos organizados e delegáveis',
    'Redução da dependência do dono'
  ]

  return (
    <div className="flex flex-col gap-6 pb-16">
      {/* Hero Section */}
      <section className="relative gradient-luxury pt-20 pb-16 lg:pt-28 lg:pb-24 overflow-hidden min-h-[calc(100vh-80px)] flex items-center z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.15),transparent_50%)] z-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.5),transparent_60%)] z-0"></div>
        <div className="absolute inset-0 z-0" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}></div>

        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-20">
          <div
            ref={heroRef.elementRef}
            className={`space-y-6 lg:space-y-8 transition-all duration-1000 ${
              heroRef.isVisible
                ? 'animate-fade-in-up opacity-100'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-block mb-6 badge-premium animate-fade-in">
              OdontoGrowth 360
            </div>
            <h1 className="heading-premium text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] text-white mb-6">
              Programa avançado de estruturação e <span className="text-gradient-gold">crescimento</span> para donos de clínicas odontológicas
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-xl leading-relaxed font-light">
              Durante seis meses, o programa conduz clínicas por um processo estruturado de organização comercial, gestão por indicadores e governança operacional, criando um modelo de crescimento previsível.
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 sm:gap-5 pt-4 transition-all duration-1000 ${
              heroRef.isVisible
                ? 'animate-fade-in-up animate-stagger-2 opacity-100'
                : 'opacity-100'
            }`}>
              <Button
                asChild
                size="lg"
                className="rounded-xl text-base sm:text-lg px-10 py-7 font-semibold bg-secondary text-[hsl(0,0%,8%)] hover:bg-secondary/90 shadow-lg hover:scale-105 transition-all duration-300"
              >
                <Link to="/aplicacao-br" onClick={() => handleCTAClick('Aplicar para o programa - Hero', '/aplicacao-br')}>
                  Aplicar para o programa
                </Link>
              </Button>
            </div>
          </div>
          <div
            className={`relative hidden lg:block transition-all duration-1000 ${
              heroRef.isVisible
                ? 'animate-fade-in-right opacity-100'
                : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-secondary/20 to-primary/30 rounded-[3rem] blur-3xl transform translate-x-10 translate-y-10 animate-pulse-slow"></div>
            <img
              src="/leonardotransparente (1).png"
              alt="Leonardo Machado - Método RNS"
              className="relative rounded-[3rem] shadow-2xl w-full object-cover aspect-square transform hover:scale-105 transition-transform duration-700 border-4 border-white/20 hover-glow"
            />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-0"></div>
      </section>

      {/* A Realidade das Clínicas Odontológicas */}
      <section className="section-premium container-premium">
        <div
          ref={realityRef.elementRef}
          className={`glass-premium rounded-[2rem] p-10 lg:p-16 shadow-premium border-gradient transition-all duration-1000 ${
            realityRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <div className="inline-block mb-4 subheading-premium text-primary">
              A Realidade
            </div>
            <h2 className="heading-premium text-3xl lg:text-5xl mb-6">
              Por que tantas clínicas trabalham muito, mas crescem pouco?
            </h2>
            <p className="text-premium text-lg leading-relaxed">
              Clínicas com excelente capacidade técnica enfrentam um paradoxo: agenda cheia, mas faturamento instável. Operação dependente do dono. O problema não é clínico — <span className="font-bold text-foreground">é estrutural</span>.
            </p>
          </div>
        </div>
      </section>

      {/* O Problema Real do Mercado */}
      <section className="section-premium gradient-subtle">
        <div className="container-premium">
          <div
            ref={problemRef.elementRef}
            className={`text-center mb-10 max-w-3xl mx-auto transition-all duration-1000 ${
              problemRef.isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="inline-block mb-4 subheading-premium text-primary">
              O Problema Real
            </div>
            <h2 className="heading-premium text-3xl lg:text-5xl mb-6">
              O problema não é falta de pacientes
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: TrendingUp, title: 'Geração de receita pouco estruturada', description: 'Sem processo comercial claro e previsível' },
              { icon: AlertCircle, title: 'Operação clínica desorganizada', description: 'Jornada do paciente fragmentada e ineficiente' },
              { icon: Target, title: 'Gestão sem indicadores', description: 'Decisões baseadas em intuição, não em dados' }
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <Card
                  key={index}
                  className={`card-premium hover-lift transition-all duration-1000 ${
                    problemRef.isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 gradient-navy-gold rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-gold">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-bold text-xl mb-4 text-foreground">{item.title}</h4>
                    <p className="text-premium leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="text-center mt-12 max-w-2xl mx-auto">
            <p className="text-xl text-foreground font-semibold">
              Resultado: <span className="text-primary">crescimento irregular, desgaste do dono, falta de previsibilidade</span>.
            </p>
          </div>
        </div>
      </section>

      {/* Apresentação do Programa */}
      <section className="section-premium container-premium">
        <div
          ref={programRef.elementRef}
          className={`glass-premium rounded-[2rem] p-10 lg:p-16 shadow-premium border-gradient transition-all duration-1000 ${
            programRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="text-center mb-8 max-w-3xl mx-auto">
            <div className="inline-block mb-4 subheading-premium text-primary">
              A Solução
            </div>
            <h2 className="heading-premium text-3xl lg:text-5xl mb-6">
              O que é o OdontoGrowth 360
            </h2>
            <p className="text-premium text-lg leading-relaxed">
              O programa foi criado para estruturar clínicas como <span className="font-bold text-foreground">negócios previsíveis</span>.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="p-10 lg:p-12 bg-white/80 dark:bg-background/80 rounded-3xl border-2 border-muted-foreground/20 shadow-lg">
                <p className="text-lg font-bold text-muted-foreground mb-8 text-center uppercase tracking-wide">Não é</p>
                <ul className="space-y-6">
                  <li className="flex items-center gap-4 text-muted-foreground text-lg">
                    <span className="text-3xl flex-shrink-0">❌</span>
                    <span>Curso técnico</span>
                  </li>
                  <li className="flex items-center gap-4 text-muted-foreground text-lg">
                    <span className="text-3xl flex-shrink-0">❌</span>
                    <span>Mentoria genérica</span>
                  </li>
                  <li className="flex items-center gap-4 text-muted-foreground text-lg">
                    <span className="text-3xl flex-shrink-0">❌</span>
                    <span>Treinamento de marketing</span>
                  </li>
                </ul>
              </div>
              <div className="p-12 lg:p-16 gradient-navy-gold rounded-3xl shadow-premium hover-glow-gold flex flex-col justify-center items-center text-center min-h-[280px]">
                <p className="text-lg font-bold text-secondary mb-6 uppercase tracking-wide">É</p>
                <p className="text-3xl lg:text-4xl font-bold text-white leading-tight">
                  Um processo de estruturação empresarial da clínica
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* O Significado do 360 */}
      <section className="section-premium gradient-subtle">
        <div className="container-premium">
          <div
            ref={whyRef.elementRef}
            className={`text-center mb-10 max-w-3xl mx-auto transition-all duration-1000 ${
              whyRef.isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="inline-block mb-4 subheading-premium text-primary">
              Abordagem Completa
            </div>
            <h2 className="heading-premium text-3xl lg:text-5xl mb-6">
              Por que 360?
            </h2>
            <p className="text-premium text-lg leading-relaxed">
              Clínicas não crescem apenas com marketing. Nem apenas com técnica.<br />
              <span className="font-bold text-foreground">Crescem quando quatro dimensões do negócio passam a funcionar juntas:</span>
            </p>
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {['Geração de receita', 'Operação clínica', 'Gestão por indicadores', 'Governança e escala'].map((item, i) => (
                <div key={i} className="p-4 glass-premium rounded-xl">
                  <p className="font-semibold text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Os 4 Pilares */}
      <section className="section-premium container-premium">
        <div
          ref={pillarsRef.elementRef}
          className={`text-center mb-10 transition-all duration-1000 ${
            pillarsRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="inline-block mb-4 subheading-premium text-primary">
            Estrutura do Programa
          </div>
          <h2 className="heading-premium text-3xl lg:text-5xl mb-6">
            Os 4 Pilares do OdontoGrowth 360
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <Card
                key={index}
                className={`card-premium hover-lift transition-all duration-1000 ${
                  pillarsRef.isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 gradient-navy-gold rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-gold">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-2xl mb-4 text-foreground">Pilar {index + 1} — {pillar.title}</h4>
                  <p className="text-premium leading-relaxed">{pillar.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Jornada de 6 Meses */}
      <section className="section-premium gradient-subtle">
        <div className="container-premium">
          <div
            ref={timelineRef.elementRef}
            className={`text-center mb-16 transition-all duration-1000 ${
              timelineRef.isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="inline-block mb-4 subheading-premium text-primary">
              Jornada
            </div>
            <h2 className="heading-premium text-3xl lg:text-5xl mb-6">
              Jornada de 6 meses
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`glass-premium rounded-xl p-6 lg:p-8 border-l-4 border-l-secondary hover-lift transition-all duration-1000 ${
                  timelineRef.isVisible
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 gradient-navy-gold rounded-xl flex items-center justify-center shadow-gold">
                      <span className="text-2xl font-bold text-white">{index + 1}</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-primary mb-1">{item.month}</p>
                    <h4 className="text-xl font-bold text-foreground mb-2">{item.title}</h4>
                    <p className="text-premium">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Os Sistemas Incluídos */}
      <section className="section-premium container-premium">
        <div
          ref={systemsRef.elementRef}
          className={`text-center mb-10 transition-all duration-1000 ${
            systemsRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="inline-block mb-4 subheading-premium text-primary">
            Ferramentas
          </div>
          <h2 className="heading-premium text-3xl lg:text-5xl mb-6">
            Os sistemas incluídos
          </h2>
          <p className="text-premium text-lg max-w-3xl mx-auto">
            Ferramentas que sustentam a implementação
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {systems.map((system, index) => {
            const Icon = system.icon
            return (
              <Card
                key={index}
                className={`card-premium hover-lift transition-all duration-1000 ${
                  systemsRef.isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 gradient-navy-gold rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-gold">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="font-bold text-xl mb-4 text-foreground">{system.title}</h4>
                  <p className="text-premium leading-relaxed">{system.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Resultados Esperados */}
      <section className="section-premium gradient-subtle">
        <div className="container-premium">
          <div
            ref={resultsRef.elementRef}
            className={`text-center mb-10 transition-all duration-1000 ${
              resultsRef.isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="inline-block mb-4 subheading-premium text-primary">
              Transformação
            </div>
            <h2 className="heading-premium text-3xl lg:text-5xl mb-6">
              O que muda em uma clínica após o OdontoGrowth 360
            </h2>
          </div>

          <div className="max-w-3xl mx-auto glass-premium rounded-2xl p-10 lg:p-12 shadow-premium border-gradient">
            <div className="grid md:grid-cols-2 gap-6">
              {results.map((result, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-4 transition-all duration-1000 ${
                    resultsRef.isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full gradient-navy-gold flex items-center justify-center shadow-gold">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-foreground font-medium leading-relaxed">{result}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Para Quem é o Programa */}
      <section className="section-premium container-premium">
        <div
          ref={profileRef.elementRef}
          className={`glass-premium rounded-[2rem] p-10 lg:p-16 shadow-premium border-gradient transition-all duration-1000 ${
            profileRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="text-center mb-10">
            <div className="inline-block mb-4 subheading-premium text-primary">
              Perfil Ideal
            </div>
            <h2 className="heading-premium text-3xl lg:text-5xl mb-6">
              Para quem é o programa
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-8 bg-gradient-to-br from-secondary/10 to-primary/10 rounded-2xl border-2 border-secondary/30">
              <h4 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-secondary" />
                Indicado para
              </h4>
              <ul className="space-y-4">
                {[
                  'Donos de clínicas odontológicas',
                  'Clínicas com operação ativa',
                  'Profissionais que desejam crescer com estrutura'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-foreground font-medium">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-secondary mt-2"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 bg-background/50 rounded-2xl border-2 border-primary/20">
              <h4 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-primary" />
                Não indicado para
              </h4>
              <ul className="space-y-4">
                {[
                  'Clínicas em fase inicial',
                  'Profissionais buscando apenas marketing'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground">
                    <div className="flex-shrink-0 w-2 h-2 rounded-full bg-muted-foreground mt-2"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre o Fundador */}
      <section className="section-premium gradient-subtle">
        <div className="container-premium">
          <div
            ref={founderRef.elementRef}
            className={`glass-premium rounded-[2rem] p-10 lg:p-16 shadow-premium border-gradient grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
              founderRef.isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="order-2 md:order-1">
              <div className="relative hover-scale">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2rem] blur-2xl animate-pulse-slow"></div>
                <img
                  src="/leonardotransparente (1).png"
                  alt="Leonardo Machado - Fundador do Método RNS"
                  className="relative rounded-[2rem] shadow-2xl w-full object-cover border-4 border-white hover-lift"
                />
              </div>
            </div>
            <div className="space-y-6 order-1 md:order-2">
              <div className="inline-block mb-4 subheading-premium text-primary">
                Sobre o Fundador
              </div>
              <h2 className="heading-premium text-3xl lg:text-4xl mb-6">
                Leonardo Machado
              </h2>
              <div className="space-y-4 text-premium text-lg">
                <p className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <span>Ortodontista com sólida autoridade clínica</span>
                </p>
                <p className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <span>Experiência em gestão de clínicas odontológicas</span>
                </p>
                <p className="flex items-start gap-3">
                  <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <span>Criador do Método RNS</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Formato do Programa */}
      <section className="section-premium container-premium">
        <div
          ref={formatRef.elementRef}
          className={`glass-premium rounded-[2rem] p-10 lg:p-16 shadow-premium border-gradient transition-all duration-1000 ${
            formatRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="text-center mb-10 max-w-3xl mx-auto">
            <div className="inline-block mb-4 subheading-premium text-primary">
              Como Funciona
            </div>
            <h2 className="heading-premium text-3xl lg:text-5xl mb-10">
              Formato do programa
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Calendar, title: 'Duração', detail: '6 meses' },
              { icon: Users, title: 'Formato', detail: 'Encontros semanais online' },
              { icon: Target, title: 'Grupo', detail: 'Limitado de clínicas' },
              { icon: Sparkles, title: 'Acompanhamento', detail: 'Direto e individual' }
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <Card
                  key={index}
                  className={`card-premium hover-lift transition-all duration-1000 ${
                    formatRef.isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 gradient-navy-gold rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-gold">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-sm font-semibold text-primary mb-2">{item.title}</p>
                    <p className="text-xl font-bold text-foreground">{item.detail}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container-premium">
        <div
          ref={ctaRef.elementRef}
          className={`gradient-navy-gold rounded-[3rem] p-12 lg:p-20 text-center text-white space-y-10 relative overflow-hidden shadow-premium hover-glow-gold transition-all duration-1000 ${
            ctaRef.isVisible
              ? 'opacity-100'
              : 'opacity-0'
          }`}
        >
          <div className={`relative z-10 max-w-3xl mx-auto transition-all duration-1000 ${
            ctaRef.isVisible
              ? 'animate-bounce-in opacity-100'
              : 'opacity-0 scale-90'
          }`}>
            <div className="w-24 h-24 mx-auto mb-8 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30 shadow-gold">
              <ArrowRight className="w-14 h-14 text-white" />
            </div>
            <h2 className="heading-premium text-4xl lg:text-6xl mb-6 leading-tight text-white">
              Pronto para estruturar sua clínica?
            </h2>
            <p className="text-xl text-white/95 mb-10 leading-relaxed max-w-2xl mx-auto font-light">
              Transforme sua clínica em um negócio previsível e escalável. Aplique agora para o OdontoGrowth 360.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full bg-white text-primary font-bold text-lg px-12 py-7 hover:bg-white/90 shadow-premium hover:shadow-2xl transition-all duration-300 hover:scale-105 hover-lift"
            >
              <Link to="/aplicacao-br" onClick={() => handleCTAClick('Aplicar para o programa - CTA Final', '/aplicacao-br')}>
                Aplicar para o programa
              </Link>
            </Button>
          </div>

          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-radial from-white/10 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-secondary/20 to-transparent rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-2xl"></div>
        </div>
      </section>
    </div>
  )
}

export default OdontoGrowth
