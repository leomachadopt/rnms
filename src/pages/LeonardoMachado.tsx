import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { PRIMARY_CTA_ROUTE } from '@/config/routes'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

const LeonardoMachado = () => {
  const heroRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const funcaoRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const integracaoRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const resultadoRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })

  return (
    <div className="flex flex-col gap-12 pb-12">
      {/* Hero Section */}
      <section className="gradient-luxury text-white py-16 lg:py-24 relative overflow-hidden">
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
          <h1 className="heading-premium text-5xl lg:text-7xl mb-8 leading-tight text-white">
            Leonardo Machado
          </h1>
          <p className="text-2xl lg:text-3xl text-white/90 leading-relaxed max-w-3xl mx-auto font-light">
            Fundador do Programa RNS de Integração Ortodôntica
          </p>
        </div>
      </section>

      {/* 1. A Função */}
      <section className="section-premium container-premium">
        <div
          ref={funcaoRef.elementRef}
          className={`transition-all duration-1000 ${
            funcaoRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h2 className="heading-premium text-4xl lg:text-5xl mb-16 text-center">
            A Função
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            {/* Coluna de Texto */}
            <div className="space-y-8 text-lg lg:text-xl leading-relaxed text-foreground/90">
              <p className="text-2xl lg:text-3xl font-light">
                Eu não criei apenas uma formação.<br />
                <strong className="text-gradient-gold font-semibold">Criei uma estrutura de decisão.</strong>
              </p>

              <p>
                Ao longo de mais de duas décadas de prática integrada com Medicina Dentária, tornou-se evidente um padrão: clínicas tecnicamente competentes operam com critérios de decisão frágeis.
              </p>

              <div className="glass-premium border-l-4 border-l-secondary p-6 lg:p-8 rounded-xl">
                <p className="text-center italic text-primary font-semibold text-xl lg:text-2xl">
                  O problema raramente está na técnica.<br />
                  Está na arquitetura que organiza essa técnica.
                </p>
              </div>

              <p>
                Foi dessa constatação que nasceu o trabalho que hoje sustenta o Programa RNS: <strong>estruturar a decisão clínica e institucional</strong> para que a previsibilidade deixe de ser circunstancial e passe a ser consequência.
              </p>
            </div>

            {/* Área de Imagem/Visual */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl gradient-navy-gold shadow-premium relative overflow-hidden">
                <div className="absolute inset-0 pattern-dots opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Placeholder para imagem futura */}
                  <div className="text-center text-white/30 p-8">
                    <p className="text-sm font-light">[Espaço reservado para imagem]</p>
                    <p className="text-xs mt-2">Sugestão: Leonardo em ambiente clínico ou diagrama de estrutura de decisão</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. A Integração */}
      <section className="section-premium gradient-subtle py-16 lg:py-20">
        <div className="container-premium">
          <div
            ref={integracaoRef.elementRef}
            className={`transition-all duration-1000 ${
              integracaoRef.isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <h2 className="heading-premium text-4xl lg:text-5xl mb-16 text-center">
              A Trajetória
            </h2>

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
              {/* Área de Imagem/Visual (ordem invertida no desktop) */}
              <div className="relative lg:order-1 order-2">
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 shadow-premium relative overflow-hidden border border-border">
                  <div className="absolute inset-0 pattern-dots opacity-10"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Placeholder para timeline visual ou foto */}
                    <div className="text-center text-muted-foreground/30 p-8">
                      <p className="text-sm font-light">[Espaço reservado para imagem]</p>
                      <p className="text-xs mt-2">Sugestão: Timeline visual 2003-2024 ou foto de formação/prática colaborativa</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coluna de Texto */}
              <div className="space-y-8 text-lg lg:text-xl leading-relaxed text-foreground/90 lg:order-2 order-1">
                <p>
                  Desde 2003 desenvolvo a minha atividade em contexto clínico colaborativo com médicos dentistas, acompanhando de perto a realidade prática da integração terapêutica. Ao longo desse percurso tornou-se evidente a necessidade de estruturar aquilo que, em muitas clínicas, permanecia apenas intuitivo. Em 2011 comecei a sistematizar o eixo central do meu trabalho: <strong>tornar mensurável e operacional a integração entre oclusão e sistema corporal.</strong>
                </p>

                <p>
                  A minha formação de base é em Fisioterapia, com especialização como Esperto em Posturologia pela Accademia di Posturologia ed Ortopedia Funzionale (Itália). Esta base técnica, aliada à prática interdisciplinar contínua, sustentou o desenvolvimento de uma metodologia integrativa própria, consolidada entre 2016 e 2021 através da formação de profissionais em Portugal, Espanha, França e Brasil.
                </p>

                <p>
                  A partir de 2021, o foco evoluiu para <strong className="text-primary">implementação estrutural em clínicas</strong>, organizando decisão, equipa e coerência clínica-comercial. O Programa RNS não é um produto académico: <strong>é uma arquitetura construída a partir de prática real</strong>, aplicada em contexto clínico e institucional.
                </p>

                <div className="glass-premium border-l-4 border-l-secondary p-8 lg:p-10 rounded-xl shadow-premium mt-10">
                  <p className="text-xl lg:text-2xl font-semibold text-primary mb-6">
                    Hoje, o meu trabalho integra três dimensões que raramente coexistem na mesma pessoa:
                  </p>
                  <ul className="space-y-4 text-lg">
                    <li className="flex items-start gap-3">
                      <span className="text-secondary font-bold text-2xl">→</span>
                      <span><strong>decisão clínica,</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-secondary font-bold text-2xl">→</span>
                      <span><strong>estrutura de conversão,</strong></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-secondary font-bold text-2xl">→</span>
                      <span><strong>organização institucional.</strong></span>
                    </li>
                  </ul>
                  <p className="mt-8 text-center italic text-foreground/80 text-base">
                    Não como teoria.<br />
                    <strong className="text-gradient-gold text-xl not-italic">Como prática aplicada.</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. O Resultado Natural */}
      <section className="section-premium container-premium">
        <div
          ref={resultadoRef.elementRef}
          className={`transition-all duration-1000 ${
            resultadoRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h2 className="heading-premium text-4xl lg:text-5xl mb-16 text-center">
            O Resultado Natural
          </h2>

          <div className="max-w-4xl mx-auto mb-16">
            <div className="bg-secondary/10 border-2 border-secondary rounded-xl p-8 lg:p-10">
              <p className="text-xl lg:text-2xl font-semibold text-primary mb-4 text-center">
                Clínicas que implementaram esta estrutura registaram crescimentos médios mensais entre <strong className="text-gradient-gold">20% e 30%</strong>.
              </p>
              <p className="text-lg text-foreground/80 italic mt-6 text-center">
                Mas o crescimento não é o objetivo.<br />
                <strong className="text-primary not-italic">É a consequência.</strong>
              </p>
              <p className="text-xl font-semibold mt-6 text-foreground text-center">
                O objetivo é maturidade decisória e estabilidade institucional.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Final */}
      <section className="container-premium py-12">
        <div className="gradient-navy-gold rounded-[3rem] p-12 lg:p-16 text-center text-white space-y-8 relative overflow-hidden shadow-premium hover-glow-gold">
          <div className="absolute inset-0 pattern-dots opacity-20"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <p className="text-2xl lg:text-3xl mb-10 text-white/90 leading-relaxed font-light">
              O Programa RNS é aplicado de forma <strong className="text-white">criteriosamente selectiva</strong>.
            </p>

            <Button
              asChild
              size="lg"
              className="rounded-full bg-white text-primary hover:bg-white/90 shadow-premium hover:scale-105 transition-all text-xl px-14 py-8 font-bold hover-lift"
            >
              <Link to={PRIMARY_CTA_ROUTE}>
                Avaliar Elegibilidade
              </Link>
            </Button>

            <p className="mt-8 text-base text-white/70 font-light">
              Entrevista diagnóstica e seletiva — Não é uma sessão comercial
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
