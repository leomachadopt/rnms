import { Link } from 'react-router-dom'
import { ArrowRight, AlertTriangle, Star, Brain, Wind, Users, Target, Shield, TrendingUp, Sparkles, Layers, ScanEye, Puzzle, CheckCircle2, GraduationCap, Lightbulb, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import useAppStore from '@/stores/useAppStore'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'
import { PRIMARY_CTA_ROUTE } from '@/config/routes'

const Index = () => {
  const { testimonials } = useAppStore()
  const heroRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const problemRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const whatIsRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const premisesRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const methodRef = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const pillarsRef = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const ecosystemRef = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const testimonialsRef = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const ctaRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })

  // Filtrar apenas depoimentos em destaque, ou mostrar todos se não houver destaques
  const displayTestimonials = testimonials.filter(t => t.featured).length > 0
    ? testimonials.filter(t => t.featured).slice(0, 3)
    : testimonials.slice(0, 3)

  const truths = [
    { icon: Layers, text: 'A oclusão é manifestação de um sistema adaptativo complexo' },
    { icon: Brain, text: 'O sistema neuromuscular organiza e influencia a estabilidade oclusal' },
    { icon: Wind, text: 'Postura, respiração e função lingual são inseparáveis da organização oclusal' },
    { icon: ScanEye, text: 'Leitura isolada da oclusão conduz a decisões clínicas incompletas' },
    { icon: Puzzle, text: 'Instabilidade e recidivas resultam da fragmentação diagnóstica' },
    { icon: TrendingUp, text: 'Raciocínio sistêmico aumenta previsibilidade e reduz instabilidade clínica' }
  ]

  const methodology = [
    {
      step: '1',
      title: 'Leitura Sistêmica',
      description: 'Reconhecimento de interferências sistêmicas e correlação entre sinais clínicos que habitualmente são negligenciados ou vistos de forma isolada.',
      icon: Target,
    },
    {
      step: '2',
      title: 'Integração de Variáveis',
      description: 'Sistema neuromuscular, postura, função lingual, respiração, visão, sono e crescimento integrados numa só análise clínica.',
      icon: Shield,
    },
    {
      step: '3',
      title: 'Priorização Terapêutica',
      description: 'Critérios claros para priorizar intervenções e conduzir tratamentos com maior coerência e segurança clínica.',
      icon: TrendingUp,
    },
    {
      step: '4',
      title: 'Previsibilidade Sustentada',
      description: 'Redução de instabilidade e recidivas através da compreensão das bases adaptativas e sistêmicas da má oclusão.',
      icon: Sparkles,
    },
  ]

  const pillars = [
    {
      icon: Brain,
      title: 'Sistema Nervoso',
      description: 'Organização neuromuscular e adaptação funcional como base da compreensão oclusal.',
    },
    {
      icon: Wind,
      title: 'Função & Postura',
      description: 'Respiração, função lingual e organização postural integradas à leitura da má oclusão.',
    },
    {
      icon: Users,
      title: 'Oclusão Sistémica',
      description: 'Má oclusão como expressão de um sistema adaptativo, não como problema isolado.',
    },
  ]

  const services = [
    {
      icon: GraduationCap,
      title: 'Formação Presencial Certificada',
      highlight: 'Produto Estruturante',
      description: 'Formação intensiva de 4 dias para profissionais que desejam reorganizar o raciocínio clínico a partir da oclusão como eixo sistêmico e estrutural.',
      features: [
        'Modelo clínico-econômico estruturado',
        'Leitura sistêmica aplicada',
        'Arquitetura terapêutica integrada',
        'Certificação oficial RNS',
        'Acesso à Comunidade RNS',
        'Base para crescimento previsível'
      ]
    },
    {
      icon: Users,
      title: 'Comunidade RNS',
      highlight: 'Programa de Continuidade',
      description: 'Ambiente anual de aprofundamento clínico e consolidação estratégica para profissionais que desejam manter evolução, troca qualificada e atualização contínua.',
      features: [
        'Encontros periódicos exclusivos',
        'Discussão estruturada de casos',
        'Atualizações clínicas estratégicas',
        'Networking qualificado',
        'Direcionamento contínuo',
        'Evolução com consistência'
      ]
    },
    {
      icon: Lightbulb,
      title: 'Programa RNS — Implementação Clínica',
      highlight: 'Programa Premium',
      description: 'Transformação completa da arquitetura clínica e comercial da sua clínica ortodôntica através do Método RNS — para clínicas que procuram crescimento por diferenciação.',
      features: [
        'Estruturação clínica avançada',
        'Estratégia comercial e precificação',
        'Posicionamento e autoridade',
        'Conversão de planos integrados',
        'Crescimento sustentável',
        'Acompanhamento individual'
      ]
    }
  ]

  return (
    <div className="flex flex-col gap-6 pb-16">
      {/* Hero Section */}
      <section className="relative gradient-luxury pt-20 pb-16 lg:pt-28 lg:pb-24 overflow-hidden min-h-[calc(100vh-80px)] flex items-center z-10">
        {/* Premium Gradient Overlays */}
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
              Método RNS
            </div>
            <h1 className="heading-premium text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] text-white mb-6">
              Complexidade não exige mais técnica. <span className="text-gradient-gold">Exige raciocínio clínico integrado.</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-xl leading-relaxed animate-fade-in-up animate-stagger-1 font-light">
              O Método RNS organiza a interpretação sistêmica do corpo a partir da dinâmica adaptativa entre oclusão e função, promovendo segurança decisória fundamentada e maior previsibilidade clínica.
            </p>
            <div className={`flex flex-col sm:flex-row gap-4 sm:gap-5 pt-4 transition-all duration-1000 ${
              heroRef.isVisible 
                ? 'animate-fade-in-up animate-stagger-2 opacity-100' 
                : 'opacity-100'
            }`}>
              <Button
                asChild
                size="lg"
                className="btn-gold text-base sm:text-lg hover-glow-gold relative z-20"
              >
                <Link to="/formacao" className="flex items-center">
                  Formação Método RNS
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-xl text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 border-2 border-white bg-white/95 text-foreground hover:bg-white hover:border-secondary hover:scale-105 transition-all duration-300 font-semibold relative z-20 shadow-lg"
              >
                <Link to={PRIMARY_CTA_ROUTE}>Avaliar Elegibilidade da Minha Clínica</Link>
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
              src="https://img.usecurling.com/p/600/600?q=professional%20dentist%20orthodontist%20clinic%20modern&dpr=2"
              alt="Profissional de ortodontia - Método RNS"
              className="relative rounded-[3rem] shadow-2xl w-full object-cover aspect-square transform hover:scale-105 transition-transform duration-700 border-4 border-white/20 hover-glow"
            />
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-0"></div>
      </section>

      {/* O Problema */}
      <section className="section-premium container-premium">
        <div
          ref={problemRef.elementRef}
          className={`text-center mb-10 transition-all duration-1000 ${
            problemRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="inline-block mb-4 subheading-premium text-primary">
            O Problema
          </div>
          <h2 className="heading-premium text-3xl lg:text-5xl mb-6">
            Por que tantas clínicas continuam presas à instabilidade?
          </h2>
          <p className="text-premium text-lg max-w-3xl mx-auto">
            Porque foram treinados para executar procedimentos, não para estruturar decisões — e quando o diagnóstico é fragmentado, o plano também é; quando o plano é fragmentado, o resultado depende do acaso. Recidivas não são apenas falhas técnicas, mas sintomas de uma estrutura clínica incompleta.
          </p>
        </div>
      </section>

      {/* O que é Método RNS */}
      <section className="section-premium container-premium">
        <div
          ref={whatIsRef.elementRef}
          className={`glass-premium rounded-[2rem] p-10 lg:p-16 shadow-premium border-gradient grid md:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
            whatIsRef.isVisible
              ? 'opacity-100'
              : 'opacity-0'
          }`}
        >
          <div
            className={`order-2 md:order-1 transition-all duration-1000 ${
              whatIsRef.isVisible
                ? 'animate-scale-in opacity-100'
                : 'opacity-0 scale-95'
            }`}
          >
            <div className="relative hover-scale">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2rem] blur-2xl animate-pulse-slow"></div>
              <img
                src="https://img.usecurling.com/p/500/400?q=dental%20xray%20skull%20occlusion%20anatomy&dpr=2"
                alt="Análise sistémica da oclusão - Método RNS"
                className="relative rounded-[2rem] shadow-2xl w-full object-cover border-4 border-white hover-lift"
              />
            </div>
          </div>
          <div
            className={`space-y-7 order-1 md:order-2 transition-all duration-1000 ${
              whatIsRef.isVisible
                ? 'animate-fade-in-left opacity-100'
                : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="inline-block mb-4 subheading-premium text-primary">
              O Método
            </div>
            <h2 className="heading-premium text-4xl lg:text-5xl text-foreground leading-tight mb-6">
              O que é o Método RNS?
            </h2>
            <p className="text-premium text-lg leading-relaxed mb-6">
              O Método RNS é uma arquitetura clínica baseada na oclusão que reorganiza a forma como o diagnóstico é construído e como o plano é estruturado.
            </p>
            <ul className="space-y-4">
              {[
                { emoji: '🔎', title: 'Ver', desc: 'Leitura sistêmica que integra oclusão, postura e função numa única arquitetura diagnóstica.' },
                { emoji: '🧩', title: 'Estruturar', desc: 'Transformação de procedimentos isolados em planos integrados de alto valor clínico.' },
                { emoji: '📈', title: 'Consolidar', desc: 'Decisões clínicas que geram crescimento consistente e previsibilidade econômica.' },
              ].map((item, idx) => (
                <li
                  key={idx}
                  className={`flex items-center gap-4 text-foreground text-lg transition-all duration-700 ${
                    whatIsRef.isVisible
                      ? 'animate-fade-in-up opacity-100'
                      : 'opacity-0 translate-y-5'
                  }`}
                  style={{ transitionDelay: `${(idx + 1) * 150}ms` }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full gradient-navy-gold flex items-center justify-center shadow-gold text-2xl">
                    {item.emoji}
                  </div>
                  <span className="font-medium"><strong>{item.title}</strong> — {item.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Premissas do Método */}
      <section className="section-premium gradient-subtle">
        <div className="container-premium">
          <div
            ref={premisesRef.elementRef}
            className={`text-center mb-10 max-w-3xl mx-auto transition-all duration-1000 ${
              premisesRef.isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="inline-block mb-4 subheading-premium text-primary">
              Fundamentos
            </div>
            <h2 className="heading-premium text-3xl lg:text-4xl mb-4">
              Premissas do Método RNS<br />
              <span className="text-gradient-gold">(que reorganizam a compreensão clínica)</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {truths.map((truth, index) => {
              const Icon = truth.icon
              return (
                <Card
                  key={index}
                  className={`glass-premium border-l-4 border-l-secondary hover:shadow-premium transition-all duration-1000 hover-lift ${
                    premisesRef.isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full gradient-navy-gold flex items-center justify-center mt-1 shadow-gold">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <p className="font-medium text-foreground leading-relaxed">
                        {truth.text}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Os 4 Pilares do Método RNS */}
      <section className="section-premium container-premium">
        <div
          ref={methodRef.elementRef}
          className={`text-center mb-10 transition-all duration-1000 ${
            methodRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="inline-block mb-4 subheading-premium text-primary">
            Estrutura do Método
          </div>
          <h2 className="heading-premium text-3xl lg:text-5xl mb-6">
            Os 4 Pilares do Método RNS
          </h2>
          <p className="text-premium text-lg max-w-3xl mx-auto">
            Da leitura sistémica à previsibilidade clínica sustentada.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {methodology.map((phase, index) => {
            const Icon = phase.icon
            return (
              <Card
                key={index}
                className={`card-premium relative overflow-hidden hover-lift transition-all duration-1000 ${
                  methodRef.isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8 relative">
                  <div className="w-16 h-16 gradient-navy-gold rounded-2xl flex items-center justify-center mb-6 shadow-gold">
                    <span className="text-3xl font-bold text-white">{phase.step}</span>
                  </div>
                  <Icon className="w-9 h-9 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3 text-foreground">{phase.title}</h3>
                  <p className="text-premium text-base leading-relaxed">
                    {phase.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* 3 Pilares de Conteúdo */}
      <section className="section-premium gradient-subtle">
        <div className="container-premium">
          <div
            ref={pillarsRef.elementRef}
            className={`text-center mb-10 max-w-3xl mx-auto transition-all duration-1000 ${
              pillarsRef.isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="inline-block mb-4 subheading-premium text-primary">
              Nossa Promessa
            </div>
            <h2 className="heading-premium text-3xl lg:text-5xl mb-6">
              <span className="text-gradient-gold">Reorganizar a compreensão da má oclusão</span>
            </h2>
            <p className="text-premium text-xl leading-relaxed">
              O Método RNS oferece aos profissionais um modelo estruturado de raciocínio clínico que integra múltiplas variáveis sistêmicas na condução de tratamentos mais coerentes, previsíveis e valorizados.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10 max-w-5xl mx-auto">
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
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <CardContent className="p-8 lg:p-10 text-center">
                    <div className="w-16 h-16 gradient-navy-gold rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-gold">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-bold text-xl mb-4 text-foreground">{pillar.title}</h4>
                    <p className="text-premium leading-relaxed">
                      {pillar.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Ecossistema RNS */}
      <section className="section-premium container-premium">
        <div
          ref={ecosystemRef.elementRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            ecosystemRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="inline-block mb-4 subheading-premium text-primary">
            Portfólio Completo
          </div>
          <h2 className="heading-premium text-3xl lg:text-5xl mb-6">
            Ecossistema RNS
          </h2>
          <p className="text-premium text-lg max-w-3xl mx-auto">
            Do raciocínio clínico à diferenciação profissional. Soluções estruturadas
            para cada fase do desenvolvimento clínico.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
            <Card
              key={index}
              className={`card-premium hover-lift group transition-all duration-1000 ${
                ecosystemRef.isVisible
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
                <div className="pt-4">
                  <Button
                    asChild
                    className="btn-gold w-full hover-glow-gold"
                  >
                    <Link to={index === 2 ? "/programa-rns" : "/formacao"}>
                      Saiba Mais
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section
        ref={testimonialsRef.elementRef}
        className="section-premium container-premium"
      >
        <div
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            testimonialsRef.isVisible
              ? 'animate-fade-in-up opacity-100'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-block mb-4 subheading-premium text-primary">
            Depoimentos
          </div>
          <h2 className="heading-premium text-4xl lg:text-5xl mb-6">
            O que dizem sobre o Método RNS
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayTestimonials.map((t, i) => (
            <Card
              key={t.id}
              className={`card-premium hover-lift ${
                testimonialsRef.isVisible
                  ? 'animate-scale-in opacity-100'
                  : 'opacity-0 scale-95'
              }`}
              style={{
                animationDelay: `${i * 150}ms`,
                transitionDelay: `${i * 150}ms`
              }}
            >
              <CardContent className="p-8 space-y-5">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="w-5 h-5 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-foreground italic text-lg leading-relaxed font-light">"{t.text}"</p>
                <div className="flex items-center gap-4 pt-4 border-t border-gradient-subtle">
                  <Avatar className="w-14 h-14 border-2 border-secondary/30 shadow-gold">
                    <AvatarImage
                      src={t.customAvatar || `https://img.usecurling.com/ppl/thumbnail?gender=${t.avatarGender}&seed=${t.avatarSeed}`}
                    />
                    <AvatarFallback className="gradient-navy-gold text-white font-semibold">{t.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-base text-foreground">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
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
          <div
            className={`relative z-10 max-w-3xl mx-auto transition-all duration-1000 ${
              ctaRef.isVisible
                ? 'animate-bounce-in opacity-100'
                : 'opacity-0 scale-90'
            }`}
          >
            <div className="w-24 h-24 mx-auto mb-8 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/30 shadow-gold">
              <AlertTriangle className="w-14 h-14 text-white" />
            </div>
            <h2 className="heading-premium text-4xl lg:text-6xl mb-6 leading-tight text-white">
              Pronto para reorganizar o raciocínio clínico?
            </h2>
            <p className="text-xl text-white/95 mb-10 leading-relaxed max-w-2xl mx-auto font-light">
              Aprenda a integrar oclusão, sistema nervoso e função numa leitura sistêmica — e conduza tratamentos com maior previsibilidade e valorização profissional.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full bg-white text-primary font-bold text-lg px-12 py-7 hover:bg-white/90 shadow-premium hover:shadow-2xl transition-all duration-300 hover:scale-105 hover-lift"
            >
              <Link to="/formacao">Conheça a Formação RNS</Link>
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

export default Index
