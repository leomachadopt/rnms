import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PRIMARY_CTA_ROUTE } from '@/config/routes';
import { useScrollAnimation } from '@/hooks/use-scroll-animation';

const LeonardoMachado = () => {
  const heroRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const menteRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const territorioRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const posicionamentoRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const principiosRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const trajetoriaRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const paraQuemRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true });
  const citacaoRef = useScrollAnimation({ threshold: 0.2, triggerOnce: true });

  return (
    <div className="flex flex-col gap-6 pb-16">
      {/* HERO SECTION */}
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
              Fundador do Método RNS
            </div>
            <h1 className="heading-premium text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] text-white mb-6">
              Leonardo Machado
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 leading-relaxed max-w-3xl mx-auto font-light mb-4">
              Arquitetura clínica aplicada à oclusão.
            </p>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-10 font-light">
              Organizador estrutural do raciocínio clínico e fundador do Método RNS.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center">
              <Button
                asChild
                size="lg"
                className="btn-gold text-lg px-12 py-7 hover-glow-gold"
              >
                <Link to="/formacao">Formação RNS</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="bg-primary/90 backdrop-blur-sm text-lg px-12 py-7 border-2 border-secondary text-white hover:bg-primary hover:border-secondary hover:scale-105 transition-all font-semibold shadow-lg"
              >
                <Link to="/programa-rns">Programa RNS</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* SEÇÃO: A MENTE POR TRÁS DA ARQUITETURA */}
      <section className="section-premium container-premium">
        <div
          ref={menteRef.elementRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            menteRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="inline-block mb-4 subheading-premium text-primary">
            A Abordagem
          </div>
          <h2 className="heading-premium text-3xl lg:text-5xl mb-6">
            A Mente por Trás da<br />
            <span className="text-gradient-gold">Arquitetura</span>
          </h2>
          <p className="text-premium text-lg max-w-3xl mx-auto mb-12">
            Uma abordagem construída a partir da estrutura, onde a organização do pensamento clínico precede a técnica.
          </p>
        </div>

        <div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
            {/* Coluna de Texto */}
            <div className="space-y-8 text-lg lg:text-xl leading-relaxed text-foreground/90">
              <p>
                A contribuição de Leonardo Machado está na organização do pensamento clínico antes da técnica.
                O Método RNS emerge da necessidade de hierarquizar decisões antes de qualquer intervenção,
                transformando a complexidade em clareza operacional.
              </p>

              <div className="glass-premium border-l-4 border-l-secondary p-6 lg:p-8 rounded-xl">
                <p className="text-center italic text-primary font-semibold text-xl lg:text-2xl">
                  "Decisão antes da intervenção."
                </p>
              </div>
            </div>

            {/* Área de Imagem/Visual */}
            <div className="relative">
              <img
                src="/leonardotransparente (1).png"
                alt="Leonardo Machado"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO: TERRITÓRIO DE ATUAÇÃO */}
      <section className="section-premium container-premium">
        <div
          ref={territorioRef.elementRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            territorioRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="inline-block mb-4 subheading-premium text-primary">
            Âmbito de Atuação
          </div>
          <h2 className="heading-premium text-3xl lg:text-5xl mb-6">
            Território de Atuação
          </h2>
          <p className="text-premium text-lg max-w-3xl mx-auto">
            Três dimensões integradas que sustentam a prática e a implementação do Método RNS.
          </p>
        </div>

        <div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Card 1 */}
              <div className="glass-premium p-8 rounded-xl hover:shadow-premium transition-all hover:scale-105">
                <div className="w-14 h-14 mb-6 rounded-full gradient-navy-gold flex items-center justify-center shadow-gold">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-primary mb-4">
                  Organização do raciocínio clínico
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  Integração e hierarquia antes da intervenção.
                </p>
              </div>

              {/* Card 2 */}
              <div className="glass-premium p-8 rounded-xl hover:shadow-premium transition-all hover:scale-105">
                <div className="w-14 h-14 mb-6 rounded-full gradient-navy-gold flex items-center justify-center shadow-gold">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-primary mb-4">
                  Leitura sistêmica aplicada
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  Oclusão como ponto de convergência funcional.
                </p>
              </div>

              {/* Card 3 */}
              <div className="glass-premium p-8 rounded-xl hover:shadow-premium transition-all hover:scale-105">
                <div className="w-14 h-14 mb-6 rounded-full gradient-navy-gold flex items-center justify-center shadow-gold">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-primary mb-4">
                  Implementação estruturada em clínicas
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  Aplicação prática em equipes selecionadas.
                </p>
              </div>
            </div>
          </div>
      </section>

      {/* SEÇÃO: POSICIONAMENTO PROFISSIONAL */}
      <section className="section-premium gradient-subtle py-16 lg:py-20">
        <div className="container-premium">
          <div
            ref={posicionamentoRef.elementRef}
            className={`text-center mb-16 transition-all duration-1000 ${
              posicionamentoRef.isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="inline-block mb-4 subheading-premium text-primary">
              Posicionamento
            </div>
            <h2 className="heading-premium text-3xl lg:text-5xl mb-6">
              Um território que não<br />compete por técnica
            </h2>
            <p className="text-premium text-lg max-w-3xl mx-auto">
              Diferenciação pela arquitetura de pensamento, não pela acumulação de métodos.
            </p>
          </div>

          <div>
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 relative">
              {/* Linha vertical divisória */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border"></div>

              {/* Coluna: Não é */}
              <div className="glass-premium p-8 lg:p-10 rounded-xl">
                <h3 className="text-2xl font-semibold text-foreground mb-8">Não é</h3>
                <ul className="space-y-4 text-lg">
                  <li className="flex items-start">
                    <span className="text-muted-foreground mr-3">—</span>
                    <span className="text-foreground/80">Terapia manual isolada</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-muted-foreground mr-3">—</span>
                    <span className="text-foreground/80">Consultoria comercial</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-muted-foreground mr-3">—</span>
                    <span className="text-foreground/80">Técnica adicional</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-muted-foreground mr-3">—</span>
                    <span className="text-foreground/80">Abordagem fragmentada</span>
                  </li>
                </ul>
              </div>

              {/* Coluna: É */}
              <div className="glass-premium p-8 lg:p-10 rounded-xl border-2 border-secondary/30">
                <h3 className="text-2xl font-semibold text-primary mb-8">É</h3>
                <ul className="space-y-4 text-lg">
                  <li className="flex items-start">
                    <span className="text-secondary mr-3 font-bold">→</span>
                    <span className="text-foreground font-medium">Organização estrutural</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-3 font-bold">→</span>
                    <span className="text-foreground font-medium">Arquitetura decisória</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-3 font-bold">→</span>
                    <span className="text-foreground font-medium">Integração hierarquizada</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-secondary mr-3 font-bold">→</span>
                    <span className="text-foreground font-medium">Elevação intelectual da prática</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* SEÇÃO: PRINCÍPIOS QUE SUSTENTAM A ATUAÇÃO */}
      <section className="section-premium container-premium">
        <div
          ref={principiosRef.elementRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            principiosRef.isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="inline-block mb-4 subheading-premium text-primary">
            Fundamentos
          </div>
          <h2 className="heading-premium text-3xl lg:text-5xl mb-6">
            Princípios que sustentam<br />a atuação
          </h2>
          <p className="text-premium text-lg max-w-3xl mx-auto">
            Quatro pilares conceptuais que estruturam todo o trabalho e formação RNS.
          </p>
        </div>

        <div>
            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Princípio 1 */}
              <div className="glass-premium p-8 lg:p-10 rounded-xl hover:shadow-premium transition-all hover:scale-105 border-l-4 border-l-secondary">
                <div className="w-14 h-14 mb-6 rounded-full gradient-navy-gold flex items-center justify-center shadow-gold">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-primary mb-4">
                  Integração antes da soma
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  O sistema não responde como partes isoladas. Antes de adicionar intervenções, é necessário compreender a relação funcional entre elas. Integrar é organizar conexões, não acumular procedimentos.
                </p>
              </div>

              {/* Princípio 2 */}
              <div className="glass-premium p-8 lg:p-10 rounded-xl hover:shadow-premium transition-all hover:scale-105 border-l-4 border-l-secondary">
                <div className="w-14 h-14 mb-6 rounded-full gradient-navy-gold flex items-center justify-center shadow-gold">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-primary mb-4">
                  Bidirecionalidade sistêmica
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  A oclusão influencia o sistema e é influenciada por ele. A leitura clínica deve considerar essa dinâmica de duas vias para evitar decisões lineares e interpretações simplificadas.
                </p>
              </div>

              {/* Princípio 3 */}
              <div className="glass-premium p-8 lg:p-10 rounded-xl hover:shadow-premium transition-all hover:scale-105 border-l-4 border-l-secondary">
                <div className="w-14 h-14 mb-6 rounded-full gradient-navy-gold flex items-center justify-center shadow-gold">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-primary mb-4">
                  Hierarquia antes da simultaneidade
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  Nem todas as variáveis têm o mesmo peso em cada caso. A clareza sobre o que é prioritário organiza a sequência terapêutica e reduz dispersão.
                </p>
              </div>

              {/* Princípio 4 */}
              <div className="glass-premium p-8 lg:p-10 rounded-xl hover:shadow-premium transition-all hover:scale-105 border-l-4 border-l-secondary">
                <div className="w-14 h-14 mb-6 rounded-full gradient-navy-gold flex items-center justify-center shadow-gold">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-primary mb-4">
                  Organização antes da intervenção
                </h3>
                <p className="text-foreground/80 leading-relaxed">
                  A intervenção deve ser consequência de uma leitura estruturada. Sem organização prévia da decisão, a prática torna-se reativa.
                </p>
              </div>
            </div>
          </div>
      </section>

      {/* SEÇÃO: TRAJETÓRIA E EXPERIÊNCIA */}
      <section id="trajetoria" className="section-premium gradient-subtle py-16 lg:py-20">
        <div className="container-premium">
          <div
            ref={trajetoriaRef.elementRef}
            className={`text-center mb-20 transition-all duration-1000 ${
              trajetoriaRef.isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="inline-block mb-4 subheading-premium text-primary">
              Percurso
            </div>
            <h2 className="heading-premium text-3xl lg:text-5xl mb-6">
              Trajetória e Experiência
            </h2>
            <p className="text-premium text-lg max-w-3xl mx-auto">
              Da formação base à atuação internacional — a evolução de um método aplicado.
            </p>
          </div>

          <div>

          {/* Timeline */}
          <div className="relative max-w-6xl mx-auto">
            {/* Linha horizontal */}
            <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent hidden md:block"></div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {/* Ponto 1 */}
              <div className="text-center relative">
                <div className="w-4 h-4 bg-secondary rounded-full mx-auto mb-6 relative z-10 shadow-lg"></div>
                <h3 className="text-lg font-semibold text-primary mb-2">Formação base</h3>
                <p className="text-sm text-foreground/70">ATM e Oclusão</p>
              </div>

              {/* Ponto 2 */}
              <div className="text-center relative">
                <div className="w-4 h-4 bg-secondary rounded-full mx-auto mb-6 relative z-10 shadow-lg"></div>
                <h3 className="text-lg font-semibold text-primary mb-2">Consolidação clínica</h3>
                <p className="text-sm text-foreground/70">Prática intensiva</p>
              </div>

              {/* Ponto 3 */}
              <div className="text-center relative">
                <div className="w-4 h-4 bg-secondary rounded-full mx-auto mb-6 relative z-10 shadow-lg"></div>
                <h3 className="text-lg font-semibold text-primary mb-2">Estruturação do modelo</h3>
                <p className="text-sm text-foreground/70">Método RNS</p>
              </div>

              {/* Ponto 4 */}
              <div className="text-center relative">
                <div className="w-4 h-4 bg-secondary rounded-full mx-auto mb-6 relative z-10 shadow-lg"></div>
                <h3 className="text-lg font-semibold text-primary mb-2">Implementações</h3>
                <p className="text-sm text-foreground/70">Clínicas selecionadas</p>
              </div>

              {/* Ponto 5 */}
              <div className="text-center relative">
                <div className="w-4 h-4 bg-secondary rounded-full mx-auto mb-6 relative z-10 shadow-lg"></div>
                <h3 className="text-lg font-semibold text-primary mb-2">Atuação internacional</h3>
                <p className="text-sm text-foreground/70">Expansão do território</p>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* SEÇÃO: CITAÇÃO ESTRUTURAL */}
      <section className="section-premium gradient-subtle py-16 lg:py-20">
        <div className="container-premium">
          <div
            ref={citacaoRef.elementRef}
            className={`transition-all duration-1000 ${
              citacaoRef.isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="max-w-4xl mx-auto text-center">
              <div className="glass-premium p-12 lg:p-16 rounded-2xl border-l-4 border-l-secondary shadow-premium">
                <blockquote className="text-3xl lg:text-4xl font-serif text-primary leading-relaxed italic">
                  "A oclusão não é um evento isolado.<br />
                  É convergência funcional de um sistema."
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO FINAL — CTA INSTITUCIONAL */}
      <section id="formacao" className="container-premium">
        <div className="gradient-navy-gold rounded-[3rem] p-12 lg:p-20 text-center text-white space-y-10 relative overflow-hidden shadow-premium hover-glow-gold">
          <div className="absolute inset-0 pattern-dots opacity-20"></div>

          <div className="relative z-10">
            <div className="inline-block mb-6 badge-premium bg-white/10 backdrop-blur-sm border border-white/30">
              <span className="font-semibold text-white">Próximo Passo</span>
            </div>
            <h2 className="heading-premium text-3xl lg:text-5xl mb-6 leading-tight text-white">
              Conheça a formação e a<br />agenda do fundador
            </h2>
            <p className="text-lg lg:text-xl mb-10 text-white/90 max-w-2xl mx-auto leading-relaxed font-light">
              Formação estruturada e aplicação prática do Método RNS em contexto clínico real.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-white text-primary hover:bg-white/90 shadow-premium hover:scale-105 transition-all text-lg px-12 py-7 font-bold hover-lift"
              >
                <Link to="/formacao">Formação RNS</Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="rounded-full bg-white/20 backdrop-blur-md border-2 border-white text-white hover:bg-white hover:text-primary shadow-premium hover:scale-105 transition-all text-lg px-12 py-7 font-bold"
              >
                <Link to="/programa-rns">Programa RNS</Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-white/80 font-light">
              Formação Aplicada • Seleção Criteriosa • Implementação Real
            </p>
          </div>

          {/* Decorative circles */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-gradient-radial from-white/10 to-transparent rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-radial from-secondary/20 to-transparent rounded-full translate-x-1/3 translate-y-1/3 blur-3xl"></div>
        </div>
      </section>
    </div>
  );
}

export default LeonardoMachado;
