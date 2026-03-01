import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, XCircle, TrendingUp, Users, Target, Shield, Building2, Lightbulb, Rocket, Brain, BarChart3, Award, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

const ProgramaRNS = () => {
  const heroRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const problemRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const whatIsRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const differentialsRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const componentsRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const methodologyRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const resultsRef = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const whoIsRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const processRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const ctaRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Hero Section */}
      <section className="relative gradient-luxury py-12 lg:py-16 overflow-hidden">
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
            APENAS 1 CLÍNICA POR CIDADE
          </div>
          <h1 className="heading-premium text-4xl lg:text-6xl mb-6 leading-tight text-white">
            Programa RNS —<br />
            <span className="text-gradient-gold">Implementação Clínica</span>
          </h1>
          <p className="text-xl lg:text-2xl mb-8 text-white/90 leading-relaxed font-light">
            Transformação completa da arquitetura clínica e comercial da sua clínica ortodôntica através do Método RNS — para clínicas que procuram crescimento por diferenciação, não por volume.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="btn-gold text-lg px-10 py-7 hover-glow-gold"
            >
              <Link to="/elegibilidade">
                Avaliar Elegibilidade da Minha Clínica
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* O Problema */}
      <section className="section-premium container-premium py-8 lg:py-12">
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
            Por que tantas clínicas crescem por volume, não por estrutura?
          </h2>
          <p className="text-premium text-lg max-w-3xl mx-auto">
            Porque a fragmentação da decisão clínica leva a tratamentos reativos — e tratamentos reativos dependem de volume para gerar estabilidade económica. O Programa RNS foi criado para inverter essa lógica.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto">
          {[
            {
              icon: XCircle,
              title: 'Ciclo de volume insustentável',
              description: 'Mais leads, mais consultas, mais esforço comercial — mas sem aumento de previsibilidade nem de ticket médio.',
              badge: 'Problema comum'
            },
            {
              icon: Target,
              title: 'Decisões fragmentadas',
              description: 'Diagnóstico isolado da oclusão sem integração sistémica — leva a planos incompletos e recidivas frequentes.',
              badge: 'Causa raiz'
            },
            {
              icon: TrendingUp,
              title: 'Crescimento instável',
              description: 'Dependência de marketing agressivo e negociação para fechar casos — em vez de atração por diferenciação clínica.',
              badge: 'Consequência'
            }
          ].map((item, index) => {
            const Icon = item.icon
            return (
              <Card
                key={index}
                className={`card-premium hover-lift group transition-all duration-1000 ${
                  problemRef.isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-8 lg:p-10">
                  <div className="mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-600 rounded-full text-sm font-semibold mb-4 border border-red-200">
                      {item.badge}
                    </div>
                  </div>
                  <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-red-600" />
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

      {/* O que é */}
      <section className="section-premium relative gradient-subtle overflow-hidden py-8 lg:py-12">
        <div className="absolute inset-0 pattern-dots opacity-30"></div>

        <div
          ref={whatIsRef.elementRef}
          className="container-premium relative z-10"
        >
          <div className={`text-center mb-10 transition-all duration-1000 ${
            whatIsRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="inline-block mb-4 subheading-premium text-primary">
              O Programa
            </div>
            <h2 className="heading-premium text-3xl lg:text-5xl mb-6">
              O que é o Programa RNS
            </h2>
            <p className="text-premium text-lg max-w-3xl mx-auto">
              Não é consultoria pontual, nem agência de marketing, nem formação isolada. É a implementação completa do Método RNS dentro da sua clínica — integrando decisão clínica, atração de pacientes e estrutura comercial num único sistema.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto">
            {[
              {
                icon: Brain,
                title: 'Arquitetura Clínica RNS',
                description: 'Implementação do modelo de raciocínio sistémico na ortodontia — integração de sistema nervoso, postura, respiração e função lingual na decisão terapêutica.',
                highlight: 'Fundação'
              },
              {
                icon: Users,
                title: 'Sistema de Atração Qualificada',
                description: 'Estrutura de comunicação e posicionamento que atrai pacientes compatíveis com tratamentos completos e de maior valor.',
                highlight: 'Diferenciação'
              },
              {
                icon: Rocket,
                title: 'Estrutura Comercial Coerente',
                description: 'Processo de adesão baseado em critério clínico — não em pressão comercial — que aumenta conversão e ticket médio naturalmente.',
                highlight: 'Crescimento'
              }
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <Card
                  key={index}
                  className={`card-premium hover-lift group transition-all duration-1000 ${
                    whatIsRef.isVisible
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
        </div>
      </section>

      {/* O que fazemos de diferente */}
      <section className="section-premium container-premium py-8 lg:py-12">
        <div
          ref={differentialsRef.elementRef}
          className={`text-center mb-10 transition-all duration-1000 ${
            differentialsRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="inline-block mb-4 subheading-premium text-primary">
            Diferenciação
          </div>
          <h2 className="heading-premium text-3xl lg:text-5xl mb-6">
            Por que o Programa RNS é diferente
          </h2>
          <p className="text-premium text-lg max-w-3xl mx-auto">
            Enquanto a maioria dos programas de crescimento trabalha apenas marketing ou vendas, o Programa RNS começa pela reorganização da decisão clínica — porque é aí que nasce a verdadeira diferenciação.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            {
              icon: Shield,
              title: 'Integração Real',
              description: 'Clínica, comercial e marketing trabalhando como um único sistema — não como departamentos isolados.'
            },
            {
              icon: Award,
              title: 'Exclusividade Territorial',
              description: 'Apenas 1 clínica por cidade recebe implementação completa — garantindo diferenciação real no mercado.'
            },
            {
              icon: Lightbulb,
              title: 'Formação Certificada',
              description: 'Formação presencial oficial RNS incluída no programa — certificação institucional da clínica.'
            },
            {
              icon: BarChart3,
              title: 'Métricas de Previsibilidade',
              description: 'Sistema de acompanhamento que mede evolução clínica e comercial com critérios objectivos.'
            }
          ].map((item, index) => {
            const Icon = item.icon
            return (
              <Card
                key={index}
                className={`card-premium hover-lift transition-all duration-1000 ${
                  differentialsRef.isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 lg:p-8 text-center">
                  <div className="w-12 h-12 rounded-full gradient-navy-gold flex items-center justify-center mx-auto mb-4 shadow-gold">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="font-bold text-lg mb-3 text-foreground">{item.title}</h4>
                  <p className="text-premium text-base leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Componentes do Programa */}
      <section className="section-premium relative gradient-subtle overflow-hidden py-8 lg:py-12">
        <div className="absolute inset-0 pattern-dots opacity-30"></div>

        <div
          ref={componentsRef.elementRef}
          className="container-premium relative z-10"
        >
          <div className={`text-center mb-10 transition-all duration-1000 ${
            componentsRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="inline-block mb-4 subheading-premium text-primary">
              Componentes
            </div>
            <h2 className="heading-premium text-3xl lg:text-5xl mb-6">
              O que está incluído no Programa
            </h2>
            <p className="text-premium text-lg max-w-3xl mx-auto">
              Implementação completa de todos os sistemas necessários para transformar a arquitectura da clínica.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: 'Arquitetura Clínica RNS',
                items: [
                  'Implementação do modelo de raciocínio sistémico',
                  'Protocolos de avaliação integrada (SN + postura + respiração + oclusão)',
                  'Critérios de decisão terapêutica baseados em evidência RNS',
                  'Sistema de registo e documentação clínica'
                ]
              },
              {
                title: 'Formação Certificada',
                items: [
                  'Formação presencial oficial RNS',
                  'Acompanhamento clínico de casos reais',
                  'Certificação institucional da clínica',
                  'Acesso vitalício a atualizações do método'
                ]
              },
              {
                title: 'Sistema de Atração Qualificada',
                items: [
                  'Posicionamento estratégico diferenciado no mercado',
                  'Landing pages e funis de qualificação automática',
                  'Comunicação clínica dirigida ao paciente ideal',
                  'Conteúdo educativo que pré-vende o método'
                ]
              },
              {
                title: 'Estrutura Comercial Coerente',
                items: [
                  'Processo de apresentação de planos baseado em critério',
                  'Scripts de adesão sem pressão comercial',
                  'Sistema de follow-up estruturado',
                  'Métricas de conversão e previsibilidade'
                ]
              }
            ].map((component, index) => (
              <Card
                key={index}
                className={`card-premium transition-all duration-1000 ${
                  componentsRef.isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-6 text-foreground">{component.title}</h3>
                  <ul className="space-y-3">
                    {component.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                        <span className="text-premium text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Metodologia de Implementação */}
      <section className="section-premium container-premium py-8 lg:py-12">
        <div
          ref={methodologyRef.elementRef}
          className={`text-center mb-10 transition-all duration-1000 ${
            methodologyRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="inline-block mb-4 subheading-premium text-primary">
            Metodologia
          </div>
          <h2 className="heading-premium text-3xl lg:text-5xl mb-6">
            Como funciona a implementação
          </h2>
          <p className="text-premium text-lg max-w-3xl mx-auto">
            Processo estruturado em 4 fases — da avaliação estratégica à operação completa.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {[
            {
              step: '1',
              title: 'Diagnóstico Estratégico',
              description: 'Avaliação profunda da estrutura clínica, comercial e de atração atual — identificação de gaps e potencial de crescimento.',
              icon: Target,
              color: 'from-blue-500 to-blue-600'
            },
            {
              step: '2',
              title: 'Formação & Implementação Clínica',
              description: 'Formação presencial oficial RNS + implementação dos protocolos de decisão sistémica na ortodontia.',
              icon: Brain,
              color: 'from-green-500 to-green-600'
            },
            {
              step: '3',
              title: 'Estrutura de Atração & Conversão',
              description: 'Criação do sistema de comunicação, landing pages e processo comercial coerente com a nova arquitectura clínica.',
              icon: Rocket,
              color: 'from-purple-500 to-purple-600'
            },
            {
              step: '4',
              title: 'Acompanhamento & Otimização',
              description: 'Monitorização de métricas, ajuste fino de processos e suporte contínuo para garantir previsibilidade sustentada.',
              icon: TrendingUp,
              color: 'from-orange-500 to-orange-600'
            }
          ].map((phase, index) => {
            const Icon = phase.icon
            return (
              <Card
                key={index}
                className={`card-premium relative overflow-hidden hover-lift transition-all duration-1000 ${
                  methodologyRef.isVisible
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

      {/* Resultados Esperados */}
      <section className="section-premium relative gradient-subtle overflow-hidden py-8 lg:py-12">
        <div className="absolute inset-0 pattern-dots opacity-30"></div>

        <div
          ref={resultsRef.elementRef}
          className="container-premium relative z-10"
        >
          <div className={`text-center mb-10 transition-all duration-1000 ${
            resultsRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="inline-block mb-4 subheading-premium text-primary">
              Resultados
            </div>
            <h2 className="heading-premium text-3xl lg:text-5xl mb-6">
              O que acontece quando a arquitectura está organizada
            </h2>
            <p className="text-premium text-lg max-w-3xl mx-auto">
              Transformação estrutural que gera resultados clínicos e económicos sustentados — não por pressão comercial, mas por coerência sistémica.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-5 mb-8">
              {[
                {
                  title: 'Maior clareza na decisão terapêutica',
                  description: 'Critérios sistémicos claros eliminam dúvidas e aumentam confiança clínica'
                },
                {
                  title: 'Pacientes mais alinhados com o tratamento',
                  description: 'Atração qualificada traz pacientes que já valorizam abordagem sistémica'
                },
                {
                  title: 'Aumento de aceitação de planos completos',
                  description: 'Apresentação baseada em critério clínico, não em pressão comercial'
                },
                {
                  title: 'Casos de maior valor e complexidade',
                  description: 'Diferenciação real atrai pacientes que procuram excelência clínica'
                },
                {
                  title: 'Redução de instabilidade e recidivas',
                  description: 'Abordagem sistémica aumenta previsibilidade e sustentabilidade dos resultados'
                },
                {
                  title: 'Crescimento ortodôntico mais estável',
                  description: 'Estrutura sólida gera crescimento previsível e sustentado no tempo'
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-6 rounded-xl glass-premium border border-secondary/20 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                >
                  <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-foreground mb-2 text-lg">{item.title}</h4>
                    <p className="text-premium text-base">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-navy-gold/10 border border-secondary/30 rounded-2xl p-10">
              <h3 className="heading-premium text-2xl lg:text-3xl text-center leading-relaxed text-foreground">
                Não por pressão comercial.<br />
                <span className="text-gradient-gold">Por coerência clínica.</span>
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Para quem é */}
      <section className="section-premium container-premium py-8 lg:py-12">
        <div
          ref={whoIsRef.elementRef}
          className={`text-center mb-10 transition-all duration-1000 ${
            whoIsRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="inline-block mb-4 subheading-premium text-primary">
            Perfil Ideal
          </div>
          <h2 className="heading-premium text-3xl lg:text-5xl mb-6">
            Para quem é o Programa RNS
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* É para quem */}
          <Card className={`card-premium border-2 border-secondary/30 transition-all duration-1000 ${
            whoIsRef.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <CardContent className="p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">É para quem</h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Procura crescimento por diferenciação clínica real',
                  'Quer atrair casos de maior valor e complexidade',
                  'Valoriza previsibilidade acima de volume',
                  'Está disposto a reorganizar a arquitectura da clínica',
                  'Quer estrutura que gere crescimento sustentado'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-premium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* NÃO é para quem */}
          <Card className={`card-premium border-2 border-red-200 transition-all duration-1000 ${
            whoIsRef.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <CardContent className="p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <XCircle className="w-7 h-7 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">Não é para quem</h3>
              </div>
              <ul className="space-y-4">
                {[
                  'Procura apenas mais leads ou vendas rápidas',
                  'Não está disposto a reorganizar processos clínicos',
                  'Prioriza apenas crescimento de volume',
                  'Quer resultados sem investimento em formação',
                  'Não valoriza exclusividade territorial'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <span className="text-premium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Processo de Qualificação */}
      <section className="section-premium relative gradient-subtle overflow-hidden py-8 lg:py-12">
        <div className="absolute inset-0 pattern-dots opacity-30"></div>

        <div
          ref={processRef.elementRef}
          className="container-premium relative z-10"
        >
          <div className={`max-w-4xl mx-auto transition-all duration-1000 ${
            processRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            <Card className="card-premium">
              <CardContent className="p-10 lg:p-14 space-y-8 text-center">
                <div className="inline-block mb-4 subheading-premium text-primary">
                  Processo
                </div>
                <h3 className="heading-premium text-3xl lg:text-4xl">
                  Não existe contratação directa
                </h3>
                <div className="max-w-2xl mx-auto space-y-6 text-premium text-lg leading-relaxed">
                  <p>Primeiro é realizada uma <strong>conversa de qualificação estratégica</strong> para avaliar:</p>
                  <ul className="text-left space-y-3">
                    {[
                      'Alinhamento com os valores e metodologia RNS',
                      'Estrutura atual da clínica e potencial de crescimento',
                      'Disponibilidade territorial (apenas 1 por cidade)',
                      'Compromisso com a transformação completa'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full gradient-navy-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-sm font-bold">{idx + 1}</span>
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="pt-4"><strong>Só após confirmação mútua de alinhamento</strong> é iniciada a implementação.</p>
                </div>
                <div className="pt-6">
                  <Button
                    asChild
                    size="lg"
                    className="btn-gold text-lg px-10 py-7 hover-glow-gold"
                  >
                    <Link to="/elegibilidade">
                      Avaliar Elegibilidade da Minha Clínica
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="container-premium py-6">
        <div
          ref={ctaRef.elementRef}
          className={`gradient-navy-gold rounded-[3rem] p-10 lg:p-14 text-center text-white space-y-8 relative overflow-hidden shadow-premium hover-glow-gold transition-all duration-1000 ${
            ctaRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 pattern-dots opacity-20"></div>

          <div className="relative z-10">
            <div className="inline-block mb-6 badge-premium bg-white/10 backdrop-blur-sm border border-white/30">
              <span className="font-semibold text-white">Transforme a arquitectura da sua clínica</span>
            </div>
            <h2 className="heading-premium text-3xl lg:text-5xl mb-6 leading-tight text-white">
              Arquitetura antes da mecânica<br />
              <span className="text-white/90">
                Previsibilidade antes do protocolo
              </span>
            </h2>
            <p className="text-lg lg:text-xl mb-10 text-white/90 max-w-2xl mx-auto leading-relaxed font-light">
              O Programa RNS integra decisão clínica sistémica, atração qualificada e estrutura comercial coerente — para clínicas que procuram crescimento sustentado por diferenciação real.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full bg-white text-primary hover:bg-white/90 shadow-premium hover:scale-105 transition-all text-lg px-12 py-7 font-bold hover-lift"
            >
              <Link to="/elegibilidade" className="flex items-center gap-2">
                Avaliar Elegibilidade da Minha Clínica
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <p className="mt-6 text-sm text-white/80 font-light">
              Apenas 1 clínica por cidade • Avaliação estratégica obrigatória • Formação Certificada Incluída
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

export default ProgramaRNS
