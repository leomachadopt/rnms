import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  CheckCircle2,
  Target,
  TrendingUp,
  Award,
  BookOpen,
  MessageCircle,
  GraduationCap,
  Users,
  Lightbulb
} from 'lucide-react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

const Formacao = () => {
  const heroRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const formationRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const servicesRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const benefitsRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })

  const formationBenefits = [
    'Ampliar leitura clínica sistêmica da má oclusão',
    'Integrar variáveis sistêmicas (postura, função, sistema nervoso)',
    'Aumentar previsibilidade terapêutica e reduzir recidivas',
    'Estruturar decisões clínicas com critérios claros',
    'Diferenciar prática profissional baseada em raciocínio',
    'Construir planos de tratamento mais coerentes e valorizados'
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
      title: 'Mentoria Clínica & Estratégica',
      highlight: 'Programa Premium',
      description: 'Acompanhamento personalizado para profissionais que desejam estruturar clínica, posicionamento e previsibilidade financeira em alto nível.',
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

  const targetAudience = [
    {
      title: 'Ortodontistas',
      description: 'Profissionais que procuram ampliar a compreensão sistêmica da má oclusão e integrar múltiplas variáveis no diagnóstico'
    },
    {
      title: 'Médicos Dentistas',
      description: 'Clínicos que trabalham com oclusão e desejam maior previsibilidade e coerência terapêutica nos tratamentos'
    },
    {
      title: 'Especialistas em DTM',
      description: 'Profissionais que procuram integração entre oclusão, sistema neuromuscular e organização postural'
    },
    {
      title: 'Profissionais Experientes',
      description: 'Com base técnica consolidada que procuram aprofundar raciocínio clínico e diferenciação profissional baseada em critério'
    }
  ]

  const differentials = [
    {
      icon: Target,
      title: 'Não é Técnica, é Raciocínio',
      description: 'O Método RNS não ensina uma técnica ortodôntica. Ensina a reorganizar a compreensão clínica da má oclusão dentro de um sistema adaptativo e integrado.'
    },
    {
      icon: TrendingUp,
      title: 'Previsibilidade Sustentada',
      description: 'Redução de instabilidade e recidivas através da compreensão das variáveis sistêmicas que realmente influenciam a organização oclusal e a estabilidade dos tratamentos.'
    },
    {
      icon: Award,
      title: 'Diferenciação por Critério',
      description: 'Valorização profissional baseada em raciocínio clínico profundo, não apenas em domínio técnico ou volume de casos — construa autoridade pela qualidade do pensamento.'
    },
    {
      icon: BookOpen,
      title: 'Formação Estruturada',
      description: 'Modelo pedagógico claro, com base conceptual sólida e aplicação prática imediata na condução dos tratamentos — teoria e prática integradas desde o primeiro dia.'
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
              Formação estruturada em Reequilíbrio Neuro-Oclusal Sistêmico. Para profissionais que procuram coerência, previsibilidade e diferenciação clínica baseada em critério — não apenas em técnica.
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
            Destinada a profissionais que já possuem base técnica consolidada e procuram aprofundar coerência terapêutica, previsibilidade e valorização profissional sustentada através de raciocínio clínico sistêmico.
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
            Não é uma formação técnica tradicional. É uma reorganização da forma de pensar antes de reorganizar a forma de tratar — e isso muda radicalmente a qualidade da sua prática clínica.
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
