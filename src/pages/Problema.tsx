import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

const Problema = () => {
  const heroRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const contentRef = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const sidebarRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })

  return (
    <div className="flex flex-col gap-12 pb-16">
      {/* Hero */}
      <section className="bg-blue-50 py-20">
        <div 
          ref={heroRef.elementRef}
          className={`container mx-auto px-4 max-w-4xl text-center transition-all duration-1000 ${
            heroRef.isVisible 
              ? 'animate-fade-in-up opacity-100' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
            Por que tantas clínicas continuam presas à instabilidade?
          </h1>
          <p className="text-xl text-muted-foreground">
            Porque a maioria dos profissionais foi treinada para ver a oclusão de forma isolada — e isso limita a previsibilidade e a estabilidade dos resultados.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="container mx-auto px-4 grid lg:grid-cols-3 gap-12">
        <div 
          ref={contentRef.elementRef}
          className={`lg:col-span-2 space-y-12 transition-all duration-1000 ${
            contentRef.isVisible 
              ? 'animate-fade-in-left opacity-100' 
              : 'opacity-0 -translate-x-10'
          }`}
        >
          {/* What is it */}
          <div className="prose prose-lg max-w-none">
            <h2 className="text-3xl font-bold text-primary mb-4">
              O problema não é falta de técnica
            </h2>
            <p className="leading-relaxed">
              O problema é a fragmentação. A maioria dos profissionais foi treinada para ver a oclusão de forma isolada — sem integrar sistema nervoso, postura, respiração e função lingual. O resultado? Intervenções corretivas sem previsibilidade, instabilidade nos tratamentos e recidivas frequentes.
            </p>
            <p className="leading-relaxed mt-4">
              <strong>Muitos clínicos dominam técnicas sofisticadas</strong>, mas continuam a enfrentar os mesmos desafios: dificuldade de leitura sistêmica dos casos, falta de critérios claros para decisões terapêuticas e resultados que não se sustentam no tempo.
            </p>
            <img
              src="https://img.usecurling.com/p/800/400?q=dental%20anatomy%20jaw%20occlusion%20medical&dpr=2"
              alt="Anatomia da oclusão e sistema estomatognático"
              className="rounded-xl shadow-md my-6 w-full object-cover hover-scale hover-lift transition-all duration-300"
            />
          </div>

          {/* Symptoms */}
          <div>
            <h2 className="text-3xl font-bold text-primary mb-6">
              O que o Método RNS propõe
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'Ver a oclusão como expressão de um sistema adaptativo',
                'Integrar sistema nervoso, postura e função numa só análise',
                'Antecipar desdobramentos antes de intervir',
                'Tomar decisões clínicas com critérios sistêmicos claros',
                'Reduzir recidivas pela compreensão das causas sistêmicas',
                'Aumentar previsibilidade e coerência terapêutica',
                'Diferenciar-se por raciocínio, não apenas por técnica',
                'Construir planos de tratamento mais valorizados',
              ].map((s, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 p-4 bg-white border border-border rounded-lg shadow-sm hover-lift transition-all duration-300 ${
                    contentRef.isVisible 
                      ? 'animate-scale-in opacity-100' 
                      : 'opacity-0 scale-95'
                  }`}
                  style={{ 
                    animationDelay: `${i * 100}ms`,
                    transitionDelay: `${i * 100}ms`
                  }}
                >
                  <div className="w-2 h-2 bg-secondary rounded-full animate-pulse-slow" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Impacts */}
          <div>
            <h2 className="text-3xl font-bold text-primary mb-6">
              Como funciona o Método RNS
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold">
                  Leitura Sistêmica
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  Aprenda a ver oclusão, postura, sistema nervoso e função como um sistema integrado — reconhecendo padrões e interferências que habitualmente são negligenciados.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-semibold">
                  Antecipação Clínica
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  Desenvolva a capacidade de prever desdobramentos biomecânicos antes de intervir — reduzindo riscos, instabilidade e recidivas nos seus casos.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg font-semibold">
                  Decisão com Critério
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground">
                  Transforme a sua leitura e antecipação em decisões clínicas mais seguras, coerentes e valorizadas — baseadas em critérios sistêmicos claros, não em protocolos rígidos.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Sidebar CTA */}
        <div 
          ref={sidebarRef.elementRef}
          className={`lg:col-span-1 space-y-6 transition-all duration-1000 ${
            sidebarRef.isVisible 
              ? 'animate-fade-in-right opacity-100' 
              : 'opacity-0 translate-x-10'
          }`}
        >
          <Card className="sticky top-24 border-primary/20 shadow-lg bg-blue-50/50 hover-lift">
            <CardHeader>
              <CardTitle className="text-primary">
                Reconhece esses desafios na sua clínica?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                O Método RNS oferece uma arquitetura decisória estruturada para reorganizar a prática clínica e consolidar crescimento sustentável.
              </p>
              <Button asChild className="w-full rounded-full">
                <Link to="/formacao">Conheça a Formação RNS</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

export default Problema
