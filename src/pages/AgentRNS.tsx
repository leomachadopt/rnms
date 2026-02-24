import { ProfessionalDiagnosticChat } from '@/components/ProfessionalDiagnosticChat'

const AgentRNS = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex flex-col items-center justify-center p-4 lg:p-8">
      <div className="text-center mb-8 max-w-2xl animate-fade-in">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">
          Agente Estratégico RNS
        </h1>
        <p className="text-muted-foreground text-lg">
          Fale connosco sobre os seus objetivos profissionais e descubra qual caminho
          do Método RNS está alinhado com o seu momento.
        </p>
      </div>

      <div className="w-full animate-slide-up">
        <ProfessionalDiagnosticChat />
      </div>

      <p className="mt-8 text-xs text-muted-foreground text-center max-w-md">
        Conversa confidencial · Sem compromisso · Orientação estratégica personalizada<br />
        <span className="font-medium">Formação RNS · Programa de Implementação Institucional</span>
      </p>
    </div>
  )
}

export default AgentRNS
