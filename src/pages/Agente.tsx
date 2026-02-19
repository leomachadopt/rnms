import { StrategicAgentChat } from '@/components/StrategicAgentChat'

const Agente = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex flex-col items-center justify-center p-4 lg:p-8">
      <div className="text-center mb-8 max-w-3xl animate-fade-in">
        <h1 className="text-3xl lg:text-5xl font-bold mb-4 text-foreground">
          Consultor Técnico Estratégico
        </h1>
        <p className="text-muted-foreground text-lg lg:text-xl leading-relaxed">
          Compreenda como o Método RNS pode transformar a sua prática clínica através de uma nova lente de pensamento sistémico e preditivo.
        </p>
        <div className="mt-6 inline-block px-6 py-2 bg-secondary/10 border border-secondary/30 rounded-full">
          <p className="text-sm font-medium text-foreground">
            Uma nova lente clínica para uma nova geração de decisões
          </p>
        </div>
      </div>

      <div className="w-full animate-slide-up">
        <StrategicAgentChat />
      </div>

      <p className="mt-8 text-xs text-muted-foreground text-center max-w-2xl leading-relaxed">
        Consulta confidencial · Assistente com IA · Acesso público<br />
        <span className="font-medium">Ver · Antecipar · Decidir — A progressão cognitiva do RNS</span>
      </p>
    </div>
  )
}

export default Agente
