import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ArrowRight, Lock, Shield, TrendingUp, Users, Award, Sparkles, ChevronRight } from "lucide-react";
import { useMetaPixel } from "@/hooks/use-meta-pixel";

// Estado global do funil
interface FunnelState {
  page: number;      // 0-6
  goal: number;      // Casos/mês desejados
  conv: number;      // Taxa de conversão (decimal 0-1)
  caseVal: number;   // Ticket médio por caso
}

export default function FunnelAlinhadores() {
  const [state, setState] = useState<FunnelState>({
    page: 0,
    goal: 0,
    conv: 0,
    caseVal: 0,
  });

  // Navegação
  const goNext = (updates: Partial<FunnelState> = {}) => {
    setState(prev => ({ ...prev, page: prev.page + 1, ...updates }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cálculos para o resultado
  const calcMetrics = () => {
    const currentCases = Math.round(state.goal * state.conv);
    const currentRevenue = currentCases * state.caseVal;
    const newCases = Math.round(state.goal * 0.40); // 40% conversão
    const newRevenue = newCases * state.caseVal;
    const lift = newRevenue - currentRevenue;
    const annualLift = lift * 12;

    return { currentCases, currentRevenue, newCases, newRevenue, lift, annualLift };
  };

  // Estado para controlar se usuário não está qualificado
  const [notQualified, setNotQualified] = useState(false);

  // Navegação com opção de desqualificar
  const goNextOrDisqualify = (disqualify: boolean = false) => {
    if (disqualify) {
      setNotQualified(true);
      setState(prev => ({ ...prev, page: prev.page + 1 }));
    } else {
      goNext();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Renderiza o passo atual
  const renderStep = () => {
    // Se não qualificado no Step 0, mostrar tela especial
    if (state.page === 1 && notQualified) {
      return <StepDisqualified />;
    }

    switch (state.page) {
      case 0: return <Step0 goNext={goNextOrDisqualify} />;
      case 1: return <Step1 goNext={goNext} />;
      case 2: return <Step2 goNext={goNext} />;
      case 3: return <Step3 goNext={goNext} />;
      case 4: return <Step4 state={state} calcMetrics={calcMetrics} goNext={goNext} />;
      case 5: return <Step5 state={state} goNext={goNext} />;
      case 6: return <Step6 />;
      default: return <Step0 goNext={goNextOrDisqualify} />;
    }
  };

  // Barra de progresso
  const progress = [0, 20, 40, 60, 80, 100, 100][state.page];
  const stepLabel = [
    "Qualificação inicial",
    "Meta de casos",
    "Taxa de conversão",
    "Valor médio",
    "O seu potencial",
    "Dados de contacto",
    "Confirmação"
  ][state.page];

  return (
    <div className="min-h-screen bg-white">
      {/* Header customizado tipo PurpleFire */}
      {state.page < 6 && (
        <div className="fixed top-0 left-0 right-0 bg-primary z-50">
          <div className="max-w-7xl mx-auto px-4 py-4">
            {/* Stats superiores */}
            <div className="flex items-center justify-center gap-8 mb-4 text-white text-xs">
              <div className="text-center">
                <div className="font-bold text-lg text-secondary">10+</div>
                <div className="text-[10px] uppercase tracking-wide opacity-90">Anos de Atuação</div>
              </div>
              <div className="h-8 w-px bg-secondary opacity-30"></div>
              <div className="text-center">
                <div className="font-bold text-lg text-secondary">20–30</div>
                <div className="text-[10px] uppercase tracking-wide opacity-90">Casos/Mês</div>
              </div>
              <div className="h-8 w-px bg-secondary opacity-30"></div>
              <div className="text-center">
                <div className="font-bold text-lg text-secondary">30 dias</div>
                <div className="text-[10px] uppercase tracking-wide opacity-90">Até Resultados</div>
              </div>
            </div>

            {/* Título principal */}
            <div className="text-center">
              <div className="text-xs uppercase tracking-wider text-secondary font-semibold mb-2">
                OdontoGrowth
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Obtenha 20–30 Novos Pacientes<br />de Alinhadores Invisíveis Todos os Meses
              </h1>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary/10 border border-secondary/20 rounded-full text-secondary text-xs font-medium">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                Sem descontos ou consultas gratuitas
              </div>
              <p className="text-xs text-white opacity-75 mt-3">
                Planeamento estratégico gratuito de 45 min • Sem pitch • Sem compromisso
              </p>
            </div>
          </div>

          {/* Barra de progresso */}
          <div className="bg-white border-t border-gray-200">
            <div className="max-w-[580px] mx-auto px-4 py-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-primary">{stepLabel}</span>
                <span className="text-xs text-gray-500">{progress}%</span>
              </div>
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-secondary transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo */}
      <div className={state.page < 6 ? "pt-80 pb-12 px-4" : "pt-12 pb-12 px-4"}>
        <div className="max-w-[620px] mx-auto">
          {renderStep()}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// TELA DE DESQUALIFICAÇÃO
// ============================================================================
function StepDisqualified() {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 max-w-[620px] mx-auto">
      <div className="space-y-6 text-center">
        {/* Ícone de sucesso */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-accent border-4 border-secondary/30 flex items-center justify-center">
            <Check className="w-12 h-12 text-secondary" />
          </div>
        </div>

        {/* Título */}
        <div>
          <h2 className="text-3xl font-bold text-primary mb-3">
            Ótimo — continue a fazer o que está a funcionar
          </h2>
        </div>

        {/* Mensagem */}
        <div className="max-w-[500px] mx-auto">
          <p className="text-base text-primary/70 leading-relaxed">
            Se a sua agenda de alinhadores já está cheia, está no top 5% das clínicas dentárias.
            Quando estiver pronto para expandir a capacidade ou abrir uma segunda localização,
            adoraríamos conversar.
          </p>
        </div>

        {/* Botão */}
        <div className="pt-4">
          <button
            onClick={() => window.location.href = '/alinhadores'}
            className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-primary font-semibold text-base rounded-xl hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl"
          >
            Recomeçar
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PASSO 0 — Qualificação inicial
// ============================================================================
function Step0({ goNext }: { goNext: (disqualify?: boolean) => void }) {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 max-w-[620px] mx-auto">
      <div className="space-y-6">
        {/* Avatar + Título */}
        <div className="flex items-start gap-4">
          <div className="relative flex-shrink-0">
            <img
              src="/leonardo-avatar.jpg"
              alt="Leonardo Machado"
              className="w-[90px] h-[90px] rounded-full object-cover ring-4 ring-blue-100"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/leonardotransparente (1).png";
              }}
            />
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
          </div>
          <div className="flex-1">
            <h1 className="text-[28px] font-bold text-primary mb-2 leading-tight">
              Está a tentar ativamente aumentar a receita de <span className="text-secondary">alinhadores invisíveis</span> da sua clínica?
            </h1>
            <p className="text-sm text-gray-500">
              Leonardo Machado, Fundador da OdontoGrowth
            </p>
          </div>
        </div>

        {/* Subtítulo */}
        <div>
          <p className="text-base text-gray-600 font-medium">
            Responda honestamente — isto determina se podemos ajudá-lo
          </p>
        </div>

        {/* Opções A/B */}
        <div className="space-y-3">
          <button
            onClick={() => goNext(false)}
            className="w-full text-left p-5 bg-white border-2 border-gray-200 rounded-2xl hover:border-secondary hover:shadow-xl transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center flex-shrink-0 text-gray-400 font-bold text-base group-hover:border-secondary group-hover:bg-accent group-hover:text-secondary transition-all">
                A
              </div>
              <div className="flex-1">
                <div className="font-semibold text-[17px] text-primary">
                  Sim — quero mais pacientes de alinhadores e estou pronto para investir
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-secondary group-hover:translate-x-1 transition-all flex-shrink-0" />
            </div>
          </button>

          <button
            onClick={() => goNext(true)}
            className="w-full text-left p-5 bg-white border-2 border-gray-200 rounded-2xl hover:border-secondary hover:shadow-xl transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center flex-shrink-0 text-gray-400 font-bold text-base group-hover:border-secondary group-hover:bg-accent group-hover:text-secondary transition-all">
                B
              </div>
              <div className="flex-1">
                <div className="font-semibold text-[17px] text-primary">
                  Não agora — a minha agenda de alinhadores já está cheia
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-secondary group-hover:translate-x-1 transition-all flex-shrink-0" />
            </div>
          </button>
        </div>

        {/* Grid de tratamentos */}
        <div className="grid grid-cols-2 gap-3 mt-4">
          {[
            { label: "Ortodontia tradicional", icon: "🦷" },
            { label: "Expansão maxilar", icon: "📐" },
            { label: "DTM", icon: "🎯" },
            { label: "Reabilitação oclusal", icon: "⚙️" },
          ].map((item, i) => (
            <div key={i} className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-center">
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-xs text-gray-700 font-medium">{item.label}</div>
            </div>
          ))}
        </div>

        {/* Box dourado */}
        <div className="p-4 bg-accent border border-secondary/20 rounded-lg">
          <div className="flex gap-2">
            <Check className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
            <div className="text-sm text-primary">
              <span className="font-semibold">Já tem o conhecimento clínico.</span> Este sistema foca em
              <span className="font-semibold"> conversão comercial, fluxo de decisão e fecho</span> — não em técnica ortodôntica.
            </div>
          </div>
        </div>

        {/* Box preto */}
        <div className="p-4 bg-primary rounded-lg">
          <div className="text-xs uppercase tracking-wider text-secondary font-semibold mb-1.5">
            Dado de contexto
          </div>
          <div className="text-sm leading-relaxed text-white/90">
            Clínicas que implementam o sistema OdontoGrowth para alinhadores <span className="font-bold text-secondary">aumentam em média a faturação em 30% ao mês</span> —
            sem aumentar o orçamento de marketing.
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PASSO 1 — Meta de casos por mês
// ============================================================================
function Step1({ goNext }: { goNext: (updates?: Partial<FunnelState>) => void }) {
  const options = [
    { badge: "A", title: "5–10 casos/mês", subtitle: "A começar a estruturar o fluxo", value: 7 },
    { badge: "B", title: "10–20 casos/mês", subtitle: "Já tenho procura, preciso converter melhor", value: 15 },
    { badge: "C", title: "20–40 casos/mês", subtitle: "Quero duplicar o meu volume actual", value: 30 },
    { badge: "D", title: "40+ casos/mês", subtitle: "Quero ser referência regional em alinhadores", value: 50 },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 max-w-[580px] mx-auto">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-primary mb-2">
            Quantos casos de alinhadores quer iniciar por mês?
          </h2>
          <p className="text-sm text-gray-500">
            Não importa onde está hoje — escolha a meta que faria sentido para a sua clínica em 6 meses
          </p>
        </div>

        <div className="space-y-3">
          {options.map((opt) => (
            <button
              key={opt.badge}
              onClick={() => goNext({ goal: opt.value })}
              className="w-full text-left p-5 bg-gray-50 border-2 border-gray-200 rounded-2xl hover:border-secondary hover:bg-accent hover:shadow-lg transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary text-primary font-bold text-sm flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  {opt.badge}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-[16px] text-primary mb-0.5">
                    {opt.title}
                  </div>
                  <div className="text-sm text-gray-600">
                    {opt.subtitle}
                  </div>
                </div>
                <ArrowRight className="w-6 h-6 text-gray-300 group-hover:text-secondary group-hover:translate-x-1 transition-all flex-shrink-0" />
              </div>
            </button>
          ))}
        </div>

        {/* Depoimento */}
        <div className="p-4 bg-white border-l-4 border-[#1a56db] shadow-sm rounded-r-lg">
          <div className="flex items-start gap-3">
            <img
              src="/testimonial-placeholder.jpg"
              alt="Dra. Cristiane"
              className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Cristiane+Martins&background=1a56db&color=fff";
              }}
            />
            <div>
              <p className="text-sm italic text-gray-700 mb-2">
                "Tivemos uma procura de 46 leads qualificados para o tratamento com alinhadores em apenas 30 dias. O sistema de fecho mudou completamente a forma como conduzo as consultas de alinhadores."
              </p>
              <div className="text-xs font-semibold text-primary">Dra. Cristiane Martins</div>
            </div>
          </div>
        </div>

        {/* Box preto */}
        <div className="p-4 bg-primary rounded-lg">
          <div className="text-xs uppercase tracking-wider text-secondary font-semibold mb-1.5">
            Porque é que isto importa
          </div>
          <div className="text-sm leading-relaxed text-white/90">
            A maioria das clínicas <span className="font-bold text-secondary">perde 60% das oportunidades</span> entre
            a consulta inicial e o início do tratamento. O sistema OdontoGrowth inverte esta lógica.
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PASSO 2 — Taxa de conversão atual
// ============================================================================
function Step2({ goNext }: { goNext: (updates?: Partial<FunnelState>) => void }) {
  const options = [
    { label: "Menos de 10% — a maioria não fecha", value: 0.08 },
    { label: "10–20% — 1 em cada 5 ou 6 fecha", value: 0.15 },
    { label: "20–30% — 1 em cada 4 fecha", value: 0.25 },
    { label: "30–40% — quase 1 em cada 3 fecha", value: 0.35 },
    { label: "Não sei ao certo", value: 0.15 },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 max-w-[580px] mx-auto">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-primary mb-2">
            Qual a sua taxa de conversão actual em alinhadores?
          </h2>
          <p className="text-sm text-gray-500">
            De cada 10 pessoas a quem apresenta o orçamento de alinhadores, quantas fecham o tratamento?
          </p>
        </div>

        <div className="space-y-3">
          {options.map((opt, i) => (
            <button
              key={i}
              onClick={() => goNext({ conv: opt.value })}
              className="w-full text-left p-5 bg-gray-50 border-2 border-gray-200 rounded-2xl hover:border-secondary hover:bg-accent hover:shadow-lg transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="font-medium text-[16px] text-primary">
                  {opt.label}
                </div>
                <ArrowRight className="w-6 h-6 text-gray-300 group-hover:text-secondary group-hover:translate-x-1 transition-all flex-shrink-0" />
              </div>
            </button>
          ))}
        </div>

        {/* Box preto */}
        <div className="p-4 bg-primary rounded-lg">
          <div className="text-xs uppercase tracking-wider text-secondary font-semibold mb-1.5">
            Benchmark do mercado
          </div>
          <div className="text-sm leading-relaxed text-white/90">
            A média nacional é <span className="font-bold text-secondary">15–18%</span>.
            Clínicas com sistema estruturado alcançam <span className="font-bold text-secondary">35–45%</span> de forma consistente.
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PASSO 3 — Ticket médio por caso
// ============================================================================
function Step3({ goNext }: { goNext: (updates?: Partial<FunnelState>) => void }) {
  const options = [
    { badge: "A", title: "2.000€–3.000€", subtitle: "Tratamento básico / mild", value: 2500 },
    { badge: "B", title: "3.000€–4.500€", subtitle: "Tratamento moderado", value: 3750 },
    { badge: "C", title: "4.500€–6.000€", subtitle: "Tratamento complexo", value: 5250 },
    { badge: "D", title: "6.000€–8.000€", subtitle: "Casos multidisciplinares", value: 7000 },
    { badge: "E", title: "8.000€–12.000€", subtitle: "Full arch / reabilitação estética", value: 10000 },
    { badge: "F", title: "Acima de 12.000€", subtitle: "Reabilitação completa premium", value: 15000 },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 max-w-[580px] mx-auto">
      <div className="space-y-6">
        {/* Depoimento lateral */}
        <div className="p-4 bg-gray-50 border-l-4 border-[#1a56db] rounded-r-lg">
          <p className="text-sm italic text-gray-700 mb-2">
            "Aumentei o meu valor médio de 1.000€ para 2.800€ — não porque subi o preço, mas porque aprendi a apresentar valor de forma agregada a procedimentos complementares no momento certo."
          </p>
          <div className="text-xs font-semibold text-primary">Dra. Marilia Pessoa</div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-primary mb-2">
            Qual o valor médio dos seus casos de alinhadores?
          </h2>
          <p className="text-sm text-gray-500">
            Considere o valor total que o paciente paga pelo tratamento completo (à vista ou fraccionado)
          </p>
        </div>

        <div className="space-y-3">
          {options.map((opt) => (
            <button
              key={opt.badge}
              onClick={() => goNext({ caseVal: opt.value })}
              className="w-full text-left p-5 bg-gray-50 border-2 border-gray-200 rounded-2xl hover:border-secondary hover:bg-accent hover:shadow-lg transition-all group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary text-secondary font-bold text-sm flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  {opt.badge}
                </div>
                <div className="flex-1">
                  <div className="font-bold text-[16px] text-primary mb-0.5">
                    {opt.title}
                  </div>
                  <div className="text-sm text-gray-600">
                    {opt.subtitle}
                  </div>
                </div>
                <ArrowRight className="w-6 h-6 text-gray-300 group-hover:text-secondary group-hover:translate-x-1 transition-all flex-shrink-0" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// PASSO 4 — Resultado / Calculadora
// ============================================================================
function Step4({
  state,
  calcMetrics,
  goNext
}: {
  state: FunnelState;
  calcMetrics: () => any;
  goNext: (updates?: Partial<FunnelState>) => void;
}) {
  const m = calcMetrics();

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 max-w-[620px] mx-auto">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-2">
            A oportunidade real da sua clínica em alinhadores
          </h2>
          <p className="text-sm text-gray-500">
            Baseado nos dados que forneceu, veja o potencial de crescimento implementando o sistema OdontoGrowth
          </p>
        </div>

      {/* Painel de resultado */}
      <div className="p-5 bg-primary rounded-xl space-y-4">
        <div className="text-xs uppercase tracking-wider text-secondary font-semibold">
          Simulação com sistema OdontoGrowth (conversão 40%)
        </div>

        {/* 3 métricas */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 bg-white bg-opacity-5 rounded-lg">
            <div className="text-2xl font-bold text-secondary mb-1">{state.goal}</div>
            <div className="text-[11px] text-white/70 uppercase tracking-wide">Consultas/mês</div>
          </div>
          <div className="p-3 bg-white bg-opacity-5 rounded-lg">
            <div className="text-2xl font-bold text-secondary mb-1">{m.newCases}</div>
            <div className="text-[11px] text-white/70 uppercase tracking-wide">Casos iniciados</div>
          </div>
          <div className="p-3 bg-white bg-opacity-5 rounded-lg">
            <div className="text-2xl font-bold text-secondary mb-1">40%</div>
            <div className="text-[11px] text-white/70 uppercase tracking-wide">Taxa conversão</div>
          </div>
        </div>

        {/* Bloco: sua meta */}
        <div className="p-4 bg-white bg-opacity-[0.06] rounded-lg border border-white border-opacity-10">
          <div className="text-sm text-secondary mb-2">Com a sua meta de {state.goal} consultas/mês:</div>
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-white/80">Hoje (conversão {(state.conv * 100).toFixed(0)}%):</span>
              <span className="text-lg font-bold text-white">{formatCurrency(m.currentRevenue)}/mês</span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-sm text-white/80">Com o sistema (40%):</span>
              <span className="text-lg font-bold text-white">{formatCurrency(m.newRevenue)}/mês</span>
            </div>
            <div className="pt-2 border-t border-white border-opacity-10">
              <div className="flex justify-between items-baseline">
                <span className="text-sm font-semibold text-white">Ganho mensal:</span>
                <span className="text-xl font-bold text-secondary">+{formatCurrency(m.lift)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Garantia 5x */}
        <div className="p-4 bg-secondary/10 border border-secondary/20 rounded-lg">
          <div className="flex items-start gap-3">
            <Shield className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-primary mb-1">Garantia de resultado 5×</div>
              <div className="text-sm text-primary/90">
                Se em 6 meses o sistema não gerar no mínimo <span className="font-bold">5× o valor do investimento</span> em
                receita adicional, devolvemos 100% do valor pago.
              </div>
            </div>
          </div>
        </div>

        {/* Receita anual */}
        <div className="text-center py-3">
          <div className="text-sm text-secondary mb-1">Potencial de crescimento anual</div>
          <div className="text-3xl font-bold text-secondary">
            {formatCurrency(m.annualLift)}
          </div>
        </div>
      </div>

      {/* Bloco de decisão */}
      <div className="p-5 bg-accent border border-secondary/20 rounded-xl">
        <div className="text-center mb-4">
          <h3 className="text-lg font-bold text-primary mb-1">
            Isto faz sentido para a sua clínica?
          </h3>
          <p className="text-sm text-primary/70">
            Se a resposta é <span className="font-semibold">sim</span>, vamos para o próximo passo
          </p>
        </div>
        <div className="space-y-2">
          <button
            onClick={() => goNext()}
            className="w-full py-4 bg-secondary text-primary font-semibold rounded-lg hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] flex items-center justify-center gap-2"
          >
            Sim, quero saber como funciona
            <ArrowRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full py-3 text-sm text-gray-600 hover:text-gray-800 transition-all"
          >
            Não faz sentido agora
          </button>
        </div>
      </div>

      {/* 4 cards - como funciona */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-primary">Como o sistema funciona</h3>

        <div className="p-4 bg-white border border-gray-200 rounded-lg">
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <div className="font-bold text-sm text-primary mb-1">Fluxo de decisão estruturado</div>
              <div className="text-[13px] text-gray-600">
                Roteiro passo a passo para conduzir a consulta do diagnóstico ao fecho, eliminando objeções antes que apareçam
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded-lg">
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <div className="font-bold text-sm text-primary mb-1">Apresentação de valor + ancoragem</div>
              <div className="text-[13px] text-gray-600">
                Framework de preços que posiciona o tratamento como investimento, não como custo — aumentando o valor e aceitação
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded-lg">
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="font-bold text-sm text-primary mb-1">Formação de equipa comercial</div>
              <div className="text-[13px] text-gray-600">
                Coordenadores e rececionistas aprendem a qualificar leads, marcar consultas premium e fazer follow-up estruturado
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-white border border-gray-200 rounded-lg">
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <div className="font-bold text-sm text-primary mb-1">Métricas e optimização contínua</div>
              <div className="text-[13px] text-gray-600">
                Dashboard de acompanhamento semanal: consultas → orçamentos → fechos. Identifica gargalos e ajusta o sistema
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Depoimento final */}
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-start gap-3">
          <img
            src="/testimonial-placeholder-2.jpg"
            alt="Dra. Joana Matos"
            className="w-12 h-12 rounded-full object-cover flex-shrink-0"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://ui-avatars.com/api/?name=Joana+Matos&background=042C53&color=fff";
            }}
          />
          <div>
            <p className="text-sm text-gray-700 mb-2">
              "Em 90 dias a implementar o sistema, tive um aumento de 120% na faturação em relação ao mesmo mês do ano anterior. O mais impressionante é que não precisei gastar nada com marketing e campanhas."
            </p>
            <div className="flex items-center gap-2">
              <div className="text-xs font-semibold text-primary">Dra. Joana Matos</div>
              <div className="px-2 py-0.5 bg-accent text-secondary text-[10px] font-semibold rounded">
                Dobro de faturação
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

// ============================================================================
// PASSO 5 — Formulário de captação
// ============================================================================
function Step5({ state, goNext }: { state: FunnelState; goNext: (updates?: Partial<FunnelState>) => void }) {
  const navigate = useNavigate();
  const { trackLead, trackCustom } = useMetaPixel();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    clinicName: "",
    city: "",
    state: "",
    website: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Nome é obrigatório";
    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }
    if (!formData.whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp é obrigatório";
    } else if (!/^\+?[\d\s\-()]+$/.test(formData.whatsapp)) {
      newErrors.whatsapp = "WhatsApp inválido";
    }
    if (!formData.clinicName.trim()) newErrors.clinicName = "Nome da clínica é obrigatório";
    if (!formData.city.trim()) newErrors.city = "Cidade é obrigatória";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Calcular receita mensal estimada
      const currentCases = Math.round(state.goal * state.conv);
      const monthlyRevenue = currentCases * state.caseVal;

      // Payload completo (incluindo campos obrigatórios do schema)
      const payload = {
        name: formData.name,
        email: formData.email || undefined,
        whatsapp: formData.whatsapp || undefined,
        orthoCount: "N/A - Funil Alinhadores", // Campo obrigatório no schema
        activeCases: "N/A - Funil Alinhadores", // Campo obrigatório no schema
        monthlyRevenue: `${monthlyRevenue.toLocaleString('pt-PT')}€/mês atual (${state.goal} consultas, ${(state.conv * 100).toFixed(0)}% conversão)`,
        goal12m: `Aumentar conversão para 40% com alinhadores invisíveis. Meta: ${state.goal} consultas/mês, valor médio ${state.caseVal}€`,
        readyToInvest: "Sim, estou pronto",
        program: "Sistema Alinhadores Invisíveis",
        source: "Funil Alinhadores",
      };

      const response = await fetch('/api/save-application', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error || `Erro ${response.status}`);
      }

      // ✅ CONVERSÃO: Rastrear Lead (evento padrão do Meta Pixel)
      trackLead({
        content_name: 'Funil Alinhadores - Formulário Completo',
        content_category: 'Sistema Alinhadores Invisíveis',
        value: monthlyRevenue,
        currency: 'EUR',
        predicted_ltv: monthlyRevenue * 12,
      });

      // ✅ CONVERSÃO: Evento customizado com dados detalhados
      trackCustom('AlignersApplicationSubmitted', {
        name: formData.name,
        email: formData.email,
        clinic_name: formData.clinicName,
        city: formData.city,
        goal_cases: state.goal,
        current_conversion: state.conv,
        avg_case_value: state.caseVal,
        monthly_revenue: monthlyRevenue,
        program: 'Sistema Alinhadores Invisíveis',
        source: 'Funil Alinhadores',
      });

      // Redirecionar para Calendly (página /agenda)
      navigate('/agenda?status=eligible', {
        state: {
          name: formData.name,
          email: formData.email,
          whatsapp: formData.whatsapp,
        }
      });
    } catch (error: any) {
      console.error("Erro ao enviar:", error);
      alert(error.message || "Ocorreu um erro ao enviar os seus dados. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpar erro do campo ao digitar
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 max-w-[620px] mx-auto">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-primary mb-2">
            Última etapa: reserve a sua vaga para entrevista
          </h2>
          <p className="text-sm text-gray-500">
            Vagas limitadas a apenas 1 clínica por cidade. Após preencher, marcará uma entrevista estratégica gratuita (45min).
          </p>
        </div>

      {/* Box de exclusividade */}
      <div className="p-3 bg-accent border border-secondary/20 rounded-lg flex items-center gap-2">
        <Lock className="w-4 h-4 text-secondary flex-shrink-0" />
        <p className="text-xs text-primary font-medium">
          Programa de implementação exclusivo — aceitamos apenas clínicas com perfil alinhado aos resultados esperados
        </p>
      </div>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-primary mb-1.5">
            O seu nome completo *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1a56db] ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Dr(a). João Silva"
          />
          {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-primary mb-1.5">
            Email profissional *
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1a56db] ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="contacto@clinica.pt"
          />
          {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-primary mb-1.5">
            WhatsApp (com indicativo) *
          </label>
          <input
            type="tel"
            value={formData.whatsapp}
            onChange={(e) => updateField("whatsapp", e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1a56db] ${
              errors.whatsapp ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="+351 91 234 5678"
          />
          {errors.whatsapp && <p className="text-xs text-red-600 mt-1">{errors.whatsapp}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-primary mb-1.5">
            Nome da clínica *
          </label>
          <input
            type="text"
            value={formData.clinicName}
            onChange={(e) => updateField("clinicName", e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1a56db] ${
              errors.clinicName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Clínica Dentária Exemplo"
          />
          {errors.clinicName && <p className="text-xs text-red-600 mt-1">{errors.clinicName}</p>}
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-semibold text-primary mb-1.5">
              Cidade *
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => updateField("city", e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1a56db] ${
                errors.city ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Lisboa"
            />
            {errors.city && <p className="text-xs text-red-600 mt-1">{errors.city}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-primary mb-1.5">
              Distrito
            </label>
            <input
              type="text"
              value={formData.state}
              onChange={(e) => updateField("state", e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1a56db]"
              placeholder="Porto"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-primary mb-1.5">
            Site da clínica (se tiver)
          </label>
          <input
            type="text"
            value={formData.website}
            onChange={(e) => updateField("website", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-[15px] focus:outline-none focus:ring-2 focus:ring-[#1a56db]"
            placeholder="clinica.pt ou www.clinica.pt"
          />
          <p className="text-xs text-gray-500 mt-1">Pode inserir com ou sem https://</p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-secondary text-primary font-bold text-base rounded-lg hover:bg-secondary/90 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            "A enviar..."
          ) : (
            <>
              Reservar a minha vaga
              <ChevronRight className="w-5 h-5" />
            </>
          )}
        </button>

        <p className="text-xs text-center text-gray-500">
          Ao clicar acima, concorda em receber contacto da equipa OdontoGrowth para marcação da entrevista
        </p>
      </form>
      </div>
    </div>
  );
}

// ============================================================================
// PASSO 6 — Tela de sucesso
// ============================================================================
function Step6() {
  return (
    <div className="space-y-6 text-center py-12">
      <div className="w-16 h-16 mx-auto bg-secondary rounded-full flex items-center justify-center">
        <Check className="w-8 h-8 text-primary" />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-primary mb-2">
          Inscrição confirmada!
        </h2>
        <p className="text-base text-gray-700">
          Em até 24h receberá um email com o link para marcar a sua entrevista estratégica.
        </p>
      </div>

      {/* Box dourado */}
      <div className="p-5 bg-accent border border-secondary/20 rounded-xl text-left">
        <div className="font-bold text-primary mb-3 flex items-center gap-2">
          <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center text-primary text-sm font-bold">
            ✓
          </div>
          O que acontece agora
        </div>
        <ol className="space-y-2 text-sm text-primary">
          <li className="flex items-start gap-2">
            <span className="font-bold text-secondary flex-shrink-0">1.</span>
            <span>A nossa equipa analisa o perfil da sua clínica e os dados que forneceu</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-secondary flex-shrink-0">2.</span>
            <span>Receberá um email com link para marcar entrevista estratégica de 30min</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-secondary flex-shrink-0">3.</span>
            <span>Na entrevista, desenhamos o plano de implementação específico para a sua clínica</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-secondary flex-shrink-0">4.</span>
            <span>Se houver encaixe mútuo, receberá proposta comercial e cronograma de implementação</span>
          </li>
        </ol>
      </div>

      <div className="pt-4">
        <p className="text-sm text-gray-600 mb-4">
          Enquanto isso, fique à vontade para explorar mais sobre o Método RNS
        </p>
        <a
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-primary font-semibold rounded-lg hover:bg-gray-50 transition-all"
        >
          Voltar ao site
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
