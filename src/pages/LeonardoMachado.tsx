import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Brain,
  BookOpen,
  Users,
  Globe,
  Award,
  Target,
  Lightbulb,
  TrendingUp,
  CheckCircle2
} from 'lucide-react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

const LeonardoMachado = () => {
  const heroRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const identityRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const differentialsRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const portfolioRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })

  const identityPillars = [
    {
      icon: Brain,
      title: 'Fundador do Método RNS',
      description: 'Criador de um modelo estruturado de raciocínio clínico sistémico aplicado à má oclusão.'
    },
    {
      icon: BookOpen,
      title: 'Formador de Raciocínio Clínico',
      description: 'Capacita profissionais a compreender a má oclusão dentro de um sistema adaptativo mais amplo.'
    },
    {
      icon: Target,
      title: 'Referência em Integração Sistémica',
      description: 'Autoridade na integração entre oclusão, sistema nervoso e organização funcional do corpo.'
    },
    {
      icon: TrendingUp,
      title: 'Especialista em Previsibilidade Clínica',
      description: 'Foco em coerência terapêutica, previsibilidade de resultados e valorização profissional sustentada.'
    }
  ]

  const differentials = [
    'Clareza conceptual e rigor intelectual',
    'Capacidade pedagógica estruturada',
    'Integração entre múltiplos sistemas',
    'Experiência clínica real e comprovada',
    'Visão e presença internacional',
    'Posicionamento intelectual consistente'
  ]

  const portfolio = [
    {
      icon: Award,
      title: 'Formação Presencial Certificada',
      description: 'Formação estruturada destinada a profissionais que trabalham com oclusão e desejam ampliar leitura clínica, integrar variáveis sistémicas e aumentar previsibilidade.',
      highlight: 'Produto Central'
    },
    {
      icon: Users,
      title: 'Consultoria Clínica Estratégica',
      description: 'Análise de casos complexos, estruturação de planos terapêuticos, integração sistémica no tratamento e aumento de previsibilidade clínica.',
      highlight: 'Selectivo'
    },
    {
      icon: Lightbulb,
      title: 'Mentoria Clínica e Posicionamento',
      description: 'Programa para profissionais que desejam aprofundar raciocínio clínico, estruturar diferenciação profissional e posicionar-se como referência clínica.',
      highlight: 'Premium'
    },
    {
      icon: Globe,
      title: 'Formação Internacional',
      description: 'Participação em eventos científicos e clínicos internacionais para consolidar presença e criar rede de profissionais alinhados.',
      highlight: 'Expansão'
    }
  ]

  return (
    <div className="flex flex-col gap-12 pb-16">
      {/* Hero Section */}
      <section className="gradient-luxury text-white py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.15),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(17,25,40,0.4),transparent_60%)]"></div>
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
            Fundador do Método RNS
          </div>
          <h1 className="heading-premium text-4xl lg:text-6xl mb-6 leading-tight text-white">
            Leonardo Machado
          </h1>
          <p className="text-xl lg:text-2xl mb-10 text-white/90 leading-relaxed max-w-3xl mx-auto font-light">
            Referência clínica e intelectual no estudo e aplicação do Reequilíbrio Neuro-Oclusal Sistémico.<br />
            <strong className="font-semibold text-gradient-gold">A má oclusão só pode ser compreendida dentro do sistema.</strong>
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="btn-gold text-lg px-10 py-7 hover-glow-gold"
            >
              <Link to="/formacao">
                Formação Método RNS
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="glass-premium border-2 border-white/30 text-white hover:bg-white hover:text-primary hover:scale-105 transition-all text-lg px-10 py-7 font-semibold"
            >
              <Link to="/avaliacao">
                Diagnóstico IA Gratuito
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Identidade Profissional */}
      <section className="section-premium container-premium">
        <div
          ref={identityRef.elementRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            identityRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="inline-block mb-4 subheading-premium text-primary">
            Identidade Profissional
          </div>
          <h2 className="heading-premium text-3xl lg:text-5xl mb-6">
            Não é apenas um formador.<br />
            <span className="text-gradient-gold">É o fundador de um método.</span>
          </h2>
          <p className="text-premium text-lg max-w-3xl mx-auto">
            Leonardo Machado posiciona-se como organizador de pensamento clínico,
            referência em integração sistémica e autoridade em previsibilidade clínica
            aplicada ao tratamento da má oclusão.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {identityPillars.map((item, index) => {
            const Icon = item.icon
            return (
              <Card
                key={index}
                className={`card-premium hover-lift group transition-all duration-1000 ${
                  identityRef.isVisible
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

      {/* A Lacuna que Ocupa */}
      <section className="section-premium gradient-subtle">
        <div className="container-premium">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block mb-4 subheading-premium text-primary">
                Contexto
              </div>
              <h2 className="heading-premium text-3xl lg:text-4xl mb-4">
                A lacuna que o posicionamento ocupa
              </h2>
            </div>

            <div className="glass-premium border-gradient rounded-[2rem] p-10 lg:p-12 shadow-premium">
              <p className="text-premium text-lg leading-relaxed mb-6">
                No panorama atual da ortodontia e da oclusão, existe uma abundância de técnicas,
                cursos e abordagens fragmentadas. No entanto, permanece uma <strong className="text-primary">lacuna significativa
                na organização do raciocínio clínico</strong>.
              </p>
              <p className="text-premium text-lg leading-relaxed mb-6">
                Muitos profissionais dominam técnicas sofisticadas, mas continuam a enfrentar:
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Instabilidade de resultados',
                  'Recidivas',
                  'Dificuldade de leitura sistémica dos casos',
                  'Decisões clínicas pouco coerentes entre si',
                  'Dificuldade em comunicar valor clínico ao paciente'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full gradient-navy-gold flex items-center justify-center mt-0.5 shadow-gold">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-foreground font-medium text-lg">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="glass-premium border-l-4 border-l-secondary p-6 lg:p-8 rounded-xl shadow-gold">
                <p className="text-lg font-bold text-primary mb-3">
                  Esta lacuna não é técnica. É organizacional.
                </p>
                <p className="text-premium leading-relaxed">
                  O Método RNS surge precisamente para ocupar este espaço: organizar o raciocínio
                  clínico a partir de uma leitura sistémica da má oclusão.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais Estratégicos */}
      <section className="section-premium container-premium">
        <div
          ref={differentialsRef.elementRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            differentialsRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="inline-block mb-4 subheading-premium text-primary">
            Diferenciais Estratégicos
          </div>
          <h2 className="heading-premium text-3xl lg:text-5xl mb-6">
            O que diferencia Leonardo Machado
          </h2>
          <p className="text-premium text-lg max-w-3xl mx-auto">
            Não compete por preço. Não compete por volume. Compete por profundidade e impacto.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {differentials.map((item, index) => (
            <Card
              key={index}
              className={`glass-premium border-l-4 border-l-secondary hover:shadow-premium transition-all duration-1000 hover-lift ${
                differentialsRef.isVisible
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
                    {item}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Portfólio */}
      <section className="section-premium container-premium gradient-subtle">
        <div
          ref={portfolioRef.elementRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            portfolioRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="inline-block mb-4 subheading-premium text-primary">
            Portfólio de Serviços
          </div>
          <h2 className="heading-premium text-3xl lg:text-5xl mb-6">
            Produtos e Serviços
          </h2>
          <p className="text-premium text-lg max-w-3xl mx-auto">
            Posicionamento premium e selectivo. Profundidade clínica, autoridade conceptual
            e impacto real na prática profissional.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {portfolio.map((item, index) => {
            const Icon = item.icon
            return (
              <Card
                key={index}
                className={`card-premium hover-lift relative overflow-hidden group transition-all duration-1000 ${
                  portfolioRef.isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-8 lg:p-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 rounded-full gradient-navy-gold flex items-center justify-center shadow-gold group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-semibold shadow-sm">
                      {item.highlight}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">{item.title}</h3>
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
              <span className="font-semibold text-white">Visão & Missão</span>
            </div>
            <h2 className="heading-premium text-3xl lg:text-5xl mb-6 leading-tight text-white">
              Consolidar o Método RNS como referência internacional
            </h2>
            <p className="text-lg lg:text-xl mb-10 text-white/90 max-w-2xl mx-auto leading-relaxed font-light">
              Formar profissionais capazes de conduzir tratamentos com maior coerência,
              previsibilidade e valor clínico através da compreensão sistémica da má oclusão.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full bg-white text-primary hover:bg-white/90 shadow-premium hover:scale-105 transition-all text-lg px-12 py-7 font-bold hover-lift"
            >
              <Link to="/formacao">
                Conheça a Formação RNS
              </Link>
            </Button>
            <p className="mt-6 text-sm text-white/80 font-light">
              Profundidade Clínica • Autoridade Conceptual • Impacto Real
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

export default LeonardoMachado
