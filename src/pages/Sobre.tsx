import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Brain,
  Moon,
  Wind,
  Target,
  TrendingUp,
  Users,
  HeartHandshake,
  Sparkles,
  Shield,
  Zap,
  Layers,
  ScanEye,
  Puzzle
} from 'lucide-react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

const Sobre = () => {
  const heroRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const differentialRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const methodRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const promiseRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })

  const differentials = [
    {
      icon: Brain,
      title: 'Integração Sistêmica',
      description: 'Sistema nervoso, oclusão, postura, respiração e função lingual integrados num único modelo de compreensão clínica — não como áreas separadas.',
      highlight: 'Visão Completa'
    },
    {
      icon: Users,
      title: 'Raciocínio, não Protocolo',
      description: 'Desenvolve capacidade de decisão terapêutica baseada em critérios claros e sistêmicos — não em protocolos rígidos ou técnicas isoladas.',
      highlight: 'Autonomia Clínica'
    },
    {
      icon: HeartHandshake,
      title: 'Previsibilidade Sustentada',
      description: 'Reduz instabilidade e recidivas através da compreensão das variáveis sistêmicas que realmente influenciam a má oclusão e a sua estabilidade.',
      highlight: 'Resultados Reais'
    },
  ]

  const methodology = [
    {
      step: '1',
      title: 'Leitura Sistêmica',
      description: 'Reconhecimento de interferências sistêmicas e correlação entre sinais clínicos que habitualmente são negligenciados ou vistos de forma isolada.',
      icon: Target,
      color: 'from-blue-500 to-blue-600'
    },
    {
      step: '2',
      title: 'Integração de Variáveis',
      description: 'Sistema neuromuscular, postura, função lingual, respiração, visão, sono e crescimento integrados numa só análise clínica.',
      icon: Shield,
      color: 'from-green-500 to-green-600'
    },
    {
      step: '3',
      title: 'Priorização Terapêutica',
      description: 'Critérios claros para priorizar intervenções e conduzir tratamentos com maior coerência e segurança clínica.',
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600'
    },
    {
      step: '4',
      title: 'Previsibilidade Sustentada',
      description: 'Redução de instabilidade e recidivas através da compreensão das bases adaptativas e sistêmicas da má oclusão.',
      icon: Sparkles,
      color: 'from-orange-500 to-orange-600'
    },
  ]

  const truths = [
    { icon: Layers, text: 'A oclusão é manifestação de um sistema adaptativo complexo' },
    { icon: Brain, text: 'O sistema neuromuscular organiza e influencia a estabilidade oclusal' },
    { icon: Wind, text: 'Postura, respiração e função lingual são inseparáveis da organização oclusal' },
    { icon: ScanEye, text: 'Leitura isolada da oclusão conduz a decisões clínicas incompletas' },
    { icon: Puzzle, text: 'Instabilidade e recidivas resultam da fragmentação diagnóstica' },
    { icon: TrendingUp, text: 'Raciocínio sistêmico aumenta previsibilidade e reduz instabilidade clínica' }
  ]

  const pillars = [
    {
      icon: Brain,
      title: 'Sistema Nervoso',
      description: 'Organização neuromuscular e adaptação funcional como base da compreensão oclusal.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Wind,
      title: 'Função & Postura',
      description: 'Respiração, função lingual e organização postural integradas à leitura da má oclusão.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Users,
      title: 'Oclusão Sistémica',
      description: 'Má oclusão como expressão de um sistema adaptativo, não como problema isolado.',
      color: 'from-purple-500 to-purple-600'
    },
  ]

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Hero Section */}
      <section className="gradient-luxury text-white py-12 lg:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.5),transparent_60%)]"></div>
        <div className="absolute inset-0 pattern-dots opacity-20"></div>

        <div
          ref={heroRef.elementRef}
          className={`container mx-auto px-4 text-center max-w-4xl relative z-10 transition-all duration-1000 ${
            heroRef.isVisible
              ? 'animate-fade-in-up opacity-100'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-block mb-6 badge-premium">
            Sobre o Método
          </div>
          <h1 className="heading-premium text-4xl lg:text-6xl mb-6 leading-tight text-white">
            Reequilíbrio Neuro-Oclusal<br />
            <span className="text-gradient-gold">Sistêmico</span>
          </h1>
          <p className="text-xl lg:text-2xl mb-8 text-white/90 leading-relaxed font-light">
            Um modelo clínico-econômico que reorganiza a prática clínica a partir da oclusão — transformando fragmentação em critério, coerência e previsibilidade.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="btn-gold text-lg px-10 py-7 hover-glow-gold"
            >
              <Link to="/formacao">
                Formação Certificada
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* O que fazemos de diferente */}
      <section className="section-premium container-premium py-8 lg:py-12">
        <div
          ref={differentialRef.elementRef}
          className={`text-center mb-10 transition-all duration-1000 ${
            differentialRef.isVisible ? 'opacity-100' : 'opacity-0'
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

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {differentials.map((item, index) => {
            const Icon = item.icon
            return (
              <Card
                key={index}
                className={`card-premium hover-lift group transition-all duration-1000 ${
                  differentialRef.isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-8 lg:p-10">
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary/10 text-secondary rounded-full text-sm font-semibold mb-4 shadow-sm">
                      {item.highlight}
                    </div>
                  </div>
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

      {/* Premissas do Método */}
      <section className="section-premium gradient-subtle py-8 lg:py-12">
        <div className="container-premium">
          <div className="text-center mb-10 max-w-3xl mx-auto">
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
                  className="glass-premium border-l-4 border-l-secondary hover:shadow-premium transition-all duration-300 hover-lift"
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
      <section className="section-premium container-premium py-8 lg:py-12">
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
                <div className={`absolute inset-0 bg-gradient-to-br ${phase.color} opacity-5`} />
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

      {/* Nossa Promessa + 3 Pilares */}
      <section className="section-premium container-premium py-8 lg:py-12">
        <div
          ref={promiseRef.elementRef}
          className={`glass-premium border-gradient rounded-[3rem] p-8 lg:p-12 shadow-premium transition-all duration-1000 ${
            promiseRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="text-center mb-10 max-w-3xl mx-auto">
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

          {/* 3 Pilares de Conteúdo */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10 max-w-5xl mx-auto mb-8">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon
              return (
                <Card
                  key={index}
                  className="card-premium hover-lift"
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

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center mt-8">
            <Button asChild size="lg" className="btn-gold text-lg px-10 py-7 hover-glow-gold">
              <Link to="/agenterns">
                <Zap className="w-5 h-5 mr-2" />
                Fale Connosco
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="glass-premium border-2 border-primary/30 hover:bg-white hover:scale-105 transition-all text-lg px-10 py-7 font-semibold">
              <Link to="/formacao">Formação Certificada RNS</Link>
            </Button>
          </div>
          <p className="text-center text-muted-foreground mt-6 text-sm font-light">
            Não sabe qual solução é ideal? Use nosso diagnóstico IA para identificar suas necessidades
          </p>
        </div>
      </section>

      {/* CTA Final */}
      <section className="container-premium py-6">
        <div className="gradient-navy-gold rounded-[3rem] p-10 lg:p-14 text-center text-white space-y-8 relative overflow-hidden shadow-premium hover-glow-gold">
          <div className="absolute inset-0 pattern-dots opacity-20"></div>

          <div className="relative z-10">
            <div className="inline-block mb-6 badge-premium bg-white/10 backdrop-blur-sm border border-white/30">
              <span className="font-semibold text-white">Dê o primeiro passo</span>
            </div>
            <h2 className="heading-premium text-3xl lg:text-5xl mb-6 leading-tight text-white">
              Reorganize o raciocínio clínico<br />
              <span className="text-white/90">
                antes de reorganizar o tratamento
              </span>
            </h2>
            <p className="text-lg lg:text-xl mb-10 text-white/90 max-w-2xl mx-auto leading-relaxed font-light">
              O Método RNS oferece formação estruturada para profissionais que procuram maior coerência,
              previsibilidade e diferenciação clínica baseada em critério.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full bg-white text-primary hover:bg-white/90 shadow-premium hover:scale-105 transition-all text-lg px-12 py-7 font-bold hover-lift"
            >
              <Link to="/formacao">
                Formação Método RNS
              </Link>
            </Button>
            <p className="mt-6 text-sm text-white/80 font-light">
              Formação Presencial Certificada • Acompanhamento Clínico • Rede de Profissionais
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

export default Sobre
