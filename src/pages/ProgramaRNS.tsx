import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, AlertCircle, TrendingUp, Users, Target, Shield, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

const ProgramaRNS = () => {
  const heroRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const problemRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const whatIsRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const resultsRef = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const systemRef = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const investmentRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const ctaRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })

  return (
    <div className="flex flex-col gap-8 pb-16">
      {/* Hero Section */}
      <section className="relative gradient-luxury pt-20 pb-16 lg:pt-28 lg:pb-24 overflow-hidden min-h-[calc(100vh-80px)] flex items-center z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.15),transparent_50%)] z-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,0,0,0.5),transparent_60%)] z-0"></div>
        <div className="absolute inset-0 z-0" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}></div>

        <div className="container mx-auto px-4 max-w-5xl text-center relative z-20">
          <div
            ref={heroRef.elementRef}
            className={`space-y-6 lg:space-y-8 transition-all duration-1000 ${
              heroRef.isVisible
                ? 'animate-fade-in-up opacity-100'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-block mb-6 badge-premium animate-fade-in">
              APENAS 1 CLÍNICA POR CIDADE
            </div>
            <h1 className="heading-premium text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] text-white mb-6 max-w-5xl mx-auto">
              <span className="text-gradient-gold">PROGRAMA RNS</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 font-light animate-fade-in-up animate-stagger-1">
              A maioria das clínicas ortodônticas cresce por volume.<br />
              Algumas poucas crescem por integração sistémica.
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-secondary to-primary mx-auto rounded-full shadow-gold animate-fade-in-up animate-stagger-2"></div>

            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed pt-2 font-light animate-fade-in-up animate-stagger-2">
              Implementação do Método RNS em clínicas premium que pretendem aumentar previsibilidade clínica, atrair casos de maior valor e estruturar um crescimento ortodôntico previsível.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-0"></div>
      </section>

      {/* O Problema */}
      <section className="section-premium container-premium">
        <div
          ref={problemRef.elementRef}
          className={`glass-premium rounded-[2rem] p-10 lg:p-16 shadow-premium border-gradient transition-all duration-1000 ${
            problemRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <p className="text-premium text-xl lg:text-2xl leading-relaxed">
              A maioria das clínicas ortodônticas cresce por <strong className="font-bold">volume.</strong>
            </p>
            <p className="text-premium text-xl lg:text-2xl leading-relaxed">
              Poucas crescem por <strong className="font-bold text-secondary">estrutura.</strong>
            </p>

            <div className="grid sm:grid-cols-3 gap-4 pt-8 pb-8">
              {[
                'Mais leads',
                'Mais consultas',
                'Mais esforço para fechar',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-center gap-2 p-4 bg-red-50 border border-red-200 rounded-xl">
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <span className="font-medium text-foreground">{item}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 text-lg text-muted-foreground italic">
              <p>Resultados clínicos inconsistentes.</p>
              <p>Crescimento irregular.</p>
            </div>

            <div className="bg-gradient-navy-gold/10 border border-secondary/30 rounded-2xl p-8 mt-8">
              <p className="text-xl lg:text-2xl font-semibold text-foreground leading-relaxed">
                Não por falta de técnica.<br />
                <span className="text-secondary">Por falta de arquitetura.</span>
              </p>
            </div>

            <div className="pt-6 space-y-4 text-lg text-foreground leading-relaxed">
              <p>Quando a decisão clínica não está organizada, a ortodontia torna-se reativa.</p>
              <p>Quando é reativa, depende sempre de volume.</p>
            </div>

            <p className="text-xl lg:text-2xl font-bold text-secondary pt-6">
              O Programa RNS foi criado para mudar esse nível.
            </p>
          </div>
        </div>
      </section>

      {/* O que é */}
      <section className="section-premium relative gradient-subtle overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-30"></div>

        <div
          ref={whatIsRef.elementRef}
          className="container-premium relative z-10"
        >
          <div className={`max-w-5xl mx-auto space-y-12 transition-all duration-1000 ${
            whatIsRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="text-center">
              <div className="inline-block mb-4 subheading-premium text-primary">
                O Programa
              </div>
              <h2 className="heading-premium text-4xl lg:text-5xl mb-6">
                O QUE É O PROGRAMA RNS
              </h2>
            </div>

            <Card className="card-premium">
              <CardContent className="p-10 lg:p-14 space-y-8">
                <p className="text-premium text-xl leading-relaxed text-center">
                  Uma <strong>implementação institucional</strong> dentro da clínica que reorganiza três pontos críticos:
                </p>

                <div className="grid md:grid-cols-3 gap-6 pt-6">
                  {[
                    { icon: Target, title: 'Decisão clínica ortodôntica' },
                    { icon: Users, title: 'Atração de pacientes certos' },
                    { icon: TrendingUp, title: 'Adesão a planos completos' },
                  ].map((item, idx) => {
                    const Icon = item.icon
                    return (
                      <div key={idx} className="text-center space-y-4">
                        <div className="w-16 h-16 rounded-full gradient-navy-gold flex items-center justify-center shadow-gold mx-auto">
                          <Icon className="w-8 h-8 text-white" />
                        </div>
                        <p className="font-bold text-foreground text-lg">{item.title}</p>
                      </div>
                    )
                  })}
                </div>

                <div className="bg-secondary/5 border-l-4 border-secondary rounded-lg p-8 mt-8 space-y-3">
                  <p className="text-lg font-semibold text-foreground">Não é consultoria.</p>
                  <p className="text-lg font-semibold text-foreground">Não é agência.</p>
                  <p className="text-lg font-semibold text-foreground">Não é formação isolada.</p>
                </div>

                <p className="text-premium text-xl text-center font-bold leading-relaxed pt-6">
                  É a integração de um <span className="text-secondary">sistema completo</span> que aumenta previsibilidade clínica e estabilidade económica como consequência.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* O que acontece */}
      <section className="section-premium container-premium">
        <div
          ref={resultsRef.elementRef}
          className={`glass-premium rounded-[2rem] p-10 lg:p-16 shadow-premium border-gradient transition-all duration-1000 ${
            resultsRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="text-center">
              <div className="inline-block mb-4 subheading-premium text-primary">
                Resultados
              </div>
              <h2 className="heading-premium text-4xl lg:text-5xl mb-6">
                O QUE ACONTECE QUANDO A ARQUITETURA ESTÁ ORGANIZADA
              </h2>
            </div>

            <div className="space-y-5">
              {[
                'Maior clareza na decisão terapêutica.',
                'Pacientes mais alinhados com o tipo de tratamento proposto.',
                'Aumento de aceitação de planos completos.',
                'Casos de maior valor e complexidade.',
                'Crescimento ortodôntico mais estável.',
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-5 rounded-xl bg-white border border-secondary/20 shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                >
                  <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <span className="text-lg text-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>

            <div className="bg-gradient-navy-gold/10 border border-secondary/30 rounded-2xl p-8 mt-10">
              <p className="text-premium text-xl font-bold text-center leading-relaxed">
                Não por pressão comercial.<br />
                <span className="text-secondary">Por coerência clínica.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sistema Completo */}
      <section className="section-premium relative gradient-subtle overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-30"></div>

        <div
          ref={systemRef.elementRef}
          className="container-premium relative z-10"
        >
          <div className={`glass-premium rounded-[2rem] p-10 lg:p-16 shadow-premium border-gradient transition-all duration-1000 ${
            systemRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="max-w-4xl mx-auto space-y-10">
              <div className="text-center">
                <div className="inline-block mb-4 subheading-premium text-primary">
                  Como Funciona
                </div>
                <h2 className="heading-premium text-4xl lg:text-5xl mb-6">
                  UM SISTEMA COMPLETO DENTRO DA CLÍNICA
                </h2>
                <p className="text-premium text-lg leading-relaxed">
                  O programa integra diretamente:
                </p>
              </div>

              <div className="space-y-4">
                {[
                  'Implementação da arquitetura RNS na ortodontia',
                  'Estrutura de atração de pacientes compatíveis',
                  'Landing pages e comunicação clínica dirigida',
                  'Formação oficial RNS para a equipa',
                  'Sistema de métricas e previsibilidade',
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-5 rounded-xl bg-white border border-secondary/20 shadow-md"
                  >
                    <div className="w-10 h-10 rounded-full gradient-navy-gold flex items-center justify-center shadow-gold flex-shrink-0">
                      <span className="text-white font-bold">{idx + 1}</span>
                    </div>
                    <span className="text-lg text-foreground font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-navy-gold/10 border border-secondary/30 rounded-2xl p-8 mt-10">
                <p className="text-premium text-xl font-bold text-center text-secondary">
                  Tudo operando como um único sistema.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Processo */}
      <section className="section-premium container-premium">
        <div
          ref={investmentRef.elementRef}
          className={`transition-all duration-1000 ${
            investmentRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Card className="card-premium">
            <CardContent className="p-10 lg:p-14 space-y-8 text-center">
              <div className="inline-block mb-4 subheading-premium text-primary">
                Processo
              </div>
              <h3 className="heading-premium text-3xl lg:text-4xl">
                NÃO EXISTE CONTRATAÇÃO DIRETA
              </h3>
              <div className="max-w-2xl mx-auto space-y-6 text-premium text-lg leading-relaxed">
                <p>Primeiro é realizada uma <strong>avaliação estratégica da clínica.</strong></p>
                <p>Só após a implementação.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Final - Qualificação */}
      <section className="container-premium">
        <div
          ref={ctaRef.elementRef}
          className={`gradient-navy-gold rounded-[3rem] p-12 lg:p-20 text-center text-white space-y-12 relative overflow-hidden shadow-premium hover-glow-gold transition-all duration-1000 ${
            ctaRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className={`relative z-10 max-w-4xl mx-auto transition-all duration-1000 ${
              ctaRef.isVisible ? 'animate-bounce-in opacity-100' : 'opacity-0 scale-90'
            }`}
          >
            <div className="space-y-10">
              {/* Não é para si */}
              <div className="bg-black/25 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl">
                <p className="heading-premium text-xl lg:text-2xl mb-4 text-white tracking-tight">
                  SE A SUA CLÍNICA PROCURA APENAS MAIS LEADS
                </p>
                <p className="text-lg lg:text-xl text-white/95">
                  Este programa não é para si.
                </p>
              </div>

              {/* É para si */}
              <div className="bg-black/25 backdrop-blur-md rounded-2xl p-8 border border-white/30 shadow-xl">
                <p className="heading-premium text-xl lg:text-2xl mb-4 text-white tracking-tight">
                  SE PROCURA PREVISIBILIDADE, DIFERENCIAÇÃO E CRESCIMENTO ESTRUTURADO
                </p>
                <p className="text-lg lg:text-xl text-amber-200 font-semibold">
                  Pode existir alinhamento.
                </p>
              </div>

              <Button
                asChild
                size="lg"
                className="rounded-full bg-white text-primary font-bold text-lg px-12 py-7 hover:bg-white/90 shadow-premium hover:shadow-2xl transition-all duration-300 hover:scale-105 hover-lift"
              >
                <Link to="/agendamento" className="flex items-center">
                  Solicitar Avaliação Estratégica da Clínica
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              {/* Posicionamento Final */}
              <div className="border-t border-white/20 pt-10 mt-10">
                <p className="text-xl lg:text-2xl font-bold text-white leading-relaxed">
                  Arquitetura antes da mecânica.<br />
                  Interpretação antes da execução.<br />
                  Previsibilidade antes do protocolo.
                </p>
                <p className="text-lg text-amber-200 font-semibold mt-6">
                  Método RNS — Programa de Implementação Institucional
                </p>
              </div>
            </div>
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

export default ProgramaRNS
