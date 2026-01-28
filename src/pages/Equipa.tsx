import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Brain,
  Moon,
  Wind,
  Target,
  CheckCircle2,
  TrendingUp,
  Users,
  HeartHandshake,
  Sparkles,
  Shield,
  Zap
} from 'lucide-react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

const Equipa = () => {
  const heroRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const differentialRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const methodRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const promiseRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })

  const differentials = [
    {
      icon: Brain,
      title: 'Neurodivergência + Sono + Respiração',
      description: 'Muitas crianças rotuladas como hiperativas ou desatentas não dormem bem. Quando corrigimos a base (sono e respiração), o comportamento muda.',
      highlight: 'O nosso foco principal'
    },
    {
      icon: Users,
      title: 'A criança como sistema',
      description: 'Não tratamos apenas "dentes". Avaliamos sono, respiração, postura, hábitos, oclusão, crescimento e comportamento como um todo integrado.',
      highlight: 'Visão 360°'
    },
    {
      icon: HeartHandshake,
      title: 'Clínica familiar, não "de criança"',
      description: 'Trabalhamos a criança e envolvemos a família. Quando cuidamos da criança, faz sentido olharmos para a família toda.',
      highlight: 'Abordagem sistémica'
    },
  ]

  const methodology = [
    {
      step: '1',
      title: 'Checkup 360°',
      description: 'Avaliação integrada de sono, respiração, postura, hábitos e oclusão. Identificamos a raiz do problema, não apenas os sintomas.',
      icon: Target,
      color: 'from-blue-500 to-blue-600'
    },
    {
      step: '2',
      title: 'Diagnóstico Explicado',
      description: 'Clareza total sobre o que encontramos, prioridades de tratamento e porquê. Sem linguagem técnica complicada.',
      icon: Shield,
      color: 'from-green-500 to-green-600'
    },
    {
      step: '3',
      title: 'Plano em Fases',
      description: 'Do essencial ao ideal. Você entende cada etapa, custos e prazos. Sem surpresas, com transparência.',
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600'
    },
    {
      step: '4',
      title: 'Acompanhamento Contínuo',
      description: 'Checkpoints regulares, equipa integrada quando necessário, educação contínua e suporte familiar.',
      icon: Sparkles,
      color: 'from-orange-500 to-orange-600'
    },
  ]

  const truths = [
    'Respiração oral deixa marcas na boca e no corpo',
    'Sono fracionado impacta desenvolvimento e comportamento',
    'Palato estreito não é "normal" — é sinal de alerta',
    'Mordida cruzada pode estar ligada à postura',
    'Muitas "hiperatividades" começam com sono mal dormido',
    'Aparelho não é só estética — é função e crescimento'
  ]

  const pillars = [
    {
      icon: Moon,
      title: 'Sono & Comportamento',
      description: 'Se a criança não dorme bem, o comportamento, atenção e desenvolvimento são afetados.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Wind,
      title: 'Respiração & Crescimento',
      description: 'Respiração oral impacta palato, mordida, postura e desenvolvimento facial.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Users,
      title: 'Boca–Corpo Integrado',
      description: 'Oclusão, postura, dor e função estão conectados. Tratamos o sistema todo.',
      color: 'from-purple-500 to-purple-600'
    },
  ]

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-primary to-purple-600 text-white py-20 lg:py-28">
        <div
          ref={heroRef.elementRef}
          className={`container mx-auto px-4 text-center max-w-4xl transition-all duration-1000 ${
            heroRef.isVisible
              ? 'animate-fade-in-up opacity-100'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-block mb-6 px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
            <span className="font-semibold text-white">O que nos diferencia</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            Não somos "mais uma clínica".<br />
            Somos um método.
          </h1>
          <p className="text-xl lg:text-2xl mb-8 text-white/90 leading-relaxed">
            Tratamos crianças como <strong>sistemas</strong>, não como "bocas isoladas".<br />
            Sono + Respiração + Crescimento = o nosso foco.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="rounded-full bg-white text-primary hover:bg-white/90 hover:scale-105 transition-all shadow-xl text-lg px-8 py-6"
            >
              <a
                href="https://wa.link/uyxjm5"
                target="_blank"
                rel="noopener noreferrer"
              >
                Agendar Checkup 360°
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* O que fazemos de diferente */}
      <section className="container mx-auto px-4">
        <div
          ref={differentialRef.elementRef}
          className={`text-center mb-12 transition-all duration-1000 ${
            differentialRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <span className="text-primary font-semibold">O nosso diferencial</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            O que vemos (de verdade)<br />que outros não vêem
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Depois de atender milhares de crianças, desenvolvemos uma leitura clínica que vai além do óbvio
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {differentials.map((item, index) => {
            const Icon = item.icon
            return (
              <Card
                key={index}
                className={`border-2 border-primary/20 hover:border-primary hover:shadow-2xl transition-all duration-1000 ${
                  differentialRef.isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-8">
                  <div className="mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
                      {item.highlight}
                    </div>
                  </div>
                  <Icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Verdades que ninguém te conta */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Verdades que ninguém te conta<br />
              <span className="text-primary">(mas que fazem toda a diferença)</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {truths.map((truth, index) => (
              <Card
                key={index}
                className="border-l-4 border-l-primary hover:shadow-lg transition-all"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <p className="font-medium text-foreground leading-relaxed">
                      {truth}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Nosso Método */}
      <section className="container mx-auto px-4">
        <div
          ref={methodRef.elementRef}
          className={`text-center mb-12 transition-all duration-1000 ${
            methodRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="inline-block mb-4 px-4 py-2 bg-green-100 text-green-700 rounded-full font-semibold">
            Método estruturado
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold mb-4">
            Protocolo Respira & Cresce 360°
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Um caminho claro, em fases, sem achismos. Do diagnóstico ao acompanhamento.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {methodology.map((phase, index) => {
            const Icon = phase.icon
            return (
              <Card
                key={index}
                className={`relative overflow-hidden border-0 shadow-xl transition-all duration-1000 hover:scale-105 ${
                  methodRef.isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${phase.color} opacity-10`} />
                <CardContent className="p-8 relative">
                  <div className={`w-16 h-16 bg-gradient-to-br ${phase.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                    <span className="text-3xl font-bold text-white">{phase.step}</span>
                  </div>
                  <Icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">{phase.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {phase.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Nossa Promessa + 3 Pilares */}
      <section className="container mx-auto px-4">
        <div
          ref={promiseRef.elementRef}
          className={`bg-gradient-to-br from-primary/5 via-blue-50 to-purple-50 rounded-3xl p-8 lg:p-16 transition-all duration-1000 ${
            promiseRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
              <span className="text-primary font-semibold">Nossa promessa</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Prometemos <span className="text-primary">clareza, método e direção.</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Ajudamos famílias a perceber a raiz do problema (sono, respiração, desenvolvimento)
              e a seguir um plano claro, faseado e integrado.
            </p>
          </div>

          {/* 3 Pilares de Conteúdo */}
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon
              return (
                <Card
                  key={index}
                  className="border-2 border-primary/20 bg-white shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                >
                  <CardContent className="p-8 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-br ${pillar.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-bold text-xl mb-3">{pillar.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      {pillar.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 justify-center mt-12">
            <Button asChild size="lg" className="rounded-full shadow-lg hover:scale-105 transition-all text-lg px-8">
              <a
                href="https://wa.link/uyxjm5"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Zap className="w-5 h-5 mr-2" />
                Agendar Checkup 360°
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full hover:scale-105 transition-all text-lg px-8">
              <Link to="/problema">Entender o Problema</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="container mx-auto px-4">
        <Card className="border-0 shadow-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
          <CardContent className="p-12 lg:p-16 text-center relative z-10">
            <div className="inline-block mb-5 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full border border-white/30">
              <span className="font-semibold text-white">Dê o primeiro passo</span>
            </div>
            <h2 className="text-3xl lg:text-5xl font-extrabold mb-5 leading-tight text-white">
              Pronto para ver a criança<br />
              como um{' '}
              <span className="text-sky-300">
                sistema integrado
              </span>
              ?
            </h2>
            <p className="text-lg lg:text-xl mb-8 text-slate-100 max-w-2xl mx-auto leading-relaxed">
              Inicie a Avaliação 360° e descubra o que pode estar por trás dos sintomas que você observa.
            </p>
            <Button
              asChild
              size="lg"
              className="rounded-full bg-white text-primary hover:bg-slate-100 shadow-2xl hover:scale-110 transition-all text-lg px-10 py-7"
            >
              <a
                href="https://wa.link/uyxjm5"
                target="_blank"
                rel="noopener noreferrer"
              >
                Agendar Checkup 360°
              </a>
            </Button>
            <p className="mt-6 text-sm text-slate-200">
              Resposta em até 24h • Sem compromisso • 100% online
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

export default Equipa
