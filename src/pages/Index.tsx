import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, AlertTriangle, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import useAppStore from '@/stores/useAppStore'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

const Index = () => {
  const { testimonials } = useAppStore()
  const heroRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const whatIsRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })
  const impactsRef = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const testimonialsRef = useScrollAnimation({ threshold: 0.1, triggerOnce: true })
  const ctaRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true })

  // Filtrar apenas depoimentos em destaque, ou mostrar todos se não houver destaques
  const displayTestimonials = testimonials.filter(t => t.featured).length > 0
    ? testimonials.filter(t => t.featured).slice(0, 3)
    : testimonials.slice(0, 3)

  return (
    <div className="flex flex-col gap-12 pb-16">
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
              Método Premium
            </div>
            <h1 className="heading-premium text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] text-white mb-6">
              A má oclusão só pode ser compreendida <span className="text-gradient-gold">dentro de um sistema</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-xl leading-relaxed animate-fade-in-up animate-stagger-1 font-light">
              Método RNS — Reequilíbrio Neuro-Oclusal Sistémico.
              Reorganize o raciocínio clínico e conduza tratamentos com maior coerência, previsibilidade e valor.
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
                className="glass-premium rounded-xl text-base sm:text-lg px-8 sm:px-10 py-6 sm:py-7 border-2 border-white/30 text-white hover:bg-white hover:text-primary hover:scale-105 transition-all duration-300 font-semibold relative z-20"
              >
                <Link to="/avaliacao">Diagnóstico IA Gratuito</Link>
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
              O Método RNS não é uma técnica ortodôntica. É um modelo estruturado de raciocínio clínico
              que integra sistema nervoso, oclusão, postura, função lingual e adaptação funcional do
              organismo na compreensão e condução dos tratamentos.
            </p>
            <ul className="space-y-4">
              {[
                'Reorganiza a compreensão da má oclusão como fenómeno sistémico',
                'Aumenta previsibilidade e coerência terapêutica',
                'Diferenciação profissional baseada em critério',
              ].map((text, idx) => (
                <li
                  key={idx}
                  className={`flex items-center gap-4 text-foreground text-lg transition-all duration-700 ${
                    whatIsRef.isVisible
                      ? 'animate-fade-in-up opacity-100'
                      : 'opacity-0 translate-y-5'
                  }`}
                  style={{ transitionDelay: `${(idx + 1) * 150}ms` }}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full gradient-navy-gold flex items-center justify-center shadow-gold">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-medium">{text}</span>
                </li>
              ))}
            </ul>
            <Button
              asChild
              variant="link"
              className="text-primary p-0 h-auto font-semibold text-lg hover:gap-3 transition-all group"
            >
              <Link to="/sobre" className="flex items-center gap-2">
                Saiba mais sobre o Método{' '}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Diferenciais do Método RNS */}
      <section className="section-premium relative gradient-subtle overflow-hidden">
        <div className="absolute inset-0 pattern-dots opacity-30"></div>

        <div
          ref={impactsRef.elementRef}
          className="container-premium relative z-10"
        >
          <div
            className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-1000 ${
              impactsRef.isVisible
                ? 'animate-fade-in-up opacity-100'
                : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="inline-block mb-4 subheading-premium text-primary">
              Diferenciais
            </div>
            <h2 className="heading-premium text-4xl lg:text-5xl mb-6">
              Diferenciais do Método RNS
            </h2>
            <p className="text-premium text-xl leading-relaxed">
              Um modelo de raciocínio clínico que reorganiza a forma de pensar
              antes de reorganizar a forma de tratar.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {[
              {
                title: 'Coerência Terapêutica',
                desc: 'Decisões clínicas baseadas em critérios sistémicos claros, não em protocolos rígidos.',
                icon: '🎯',
              },
              {
                title: 'Previsibilidade Clínica',
                desc: 'Redução de instabilidade e recidivas através da compreensão das variáveis sistémicas.',
                icon: '📊',
              },
              {
                title: 'Valorização Profissional',
                desc: 'Diferenciação baseada em raciocínio clínico profundo, não apenas em técnica.',
                icon: '⭐',
              },
            ].map((item, idx) => (
              <Card
                key={idx}
                className={`card-premium group hover-lift ${
                  impactsRef.isVisible
                    ? 'animate-scale-in opacity-100'
                    : 'opacity-0 scale-95'
                }`}
                style={{
                  animationDelay: `${idx * 150}ms`,
                  transitionDelay: `${idx * 150}ms`
                }}
              >
                <CardContent className="p-10 text-center space-y-5">
                  <div className="text-6xl mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 animate-float">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    {item.title}
                  </h3>
                  <p className="text-premium text-lg leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
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
            O que dizem os profissionais
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
              A má oclusão não pode ser compreendida fora do sistema.
              Integre oclusão, sistema nervoso e organização funcional do corpo.
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
