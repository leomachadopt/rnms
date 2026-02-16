import { ProfessionalDiagnosticChat } from '@/components/ProfessionalDiagnosticChat'

const Avaliacao = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex flex-col items-center justify-center p-4 lg:p-8">
      <div className="text-center mb-8 max-w-2xl animate-fade-in">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">
          Diagnóstico de Necessidades Clínicas
        </h1>
        <p className="text-muted-foreground text-lg">
          Converse com nosso assistente inteligente para identificar suas principais
          dificuldades clínicas e descobrir qual solução do Método RNS é mais adequada para você.
        </p>
      </div>

      <div className="w-full animate-slide-up">
        <ProfessionalDiagnosticChat />
      </div>

      <p className="mt-8 text-xs text-muted-foreground text-center max-w-md">
        Nota: Esta ferramenta ajuda a identificar o serviço mais adequado às suas necessidades.
        Formação Certificada • Consultoria Clínica • Mentoria Profissional
      </p>
    </div>
  )
}

export default Avaliacao
