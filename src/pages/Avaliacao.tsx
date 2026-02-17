import { ProfessionalDiagnosticChat } from '@/components/ProfessionalDiagnosticChat'

const Avaliacao = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50 flex flex-col items-center justify-center p-4 lg:p-8">
      <div className="text-center mb-8 max-w-2xl animate-fade-in">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">
          Diagnóstico Gratuito — Método RNS
        </h1>
        <p className="text-muted-foreground text-lg">
          Responda a algumas perguntas sobre os seus desafios reais e descubra qual serviço
          do Método RNS é o mais adequado para o seu momento profissional.
        </p>
      </div>

      <div className="w-full animate-slide-up">
        <ProfessionalDiagnosticChat />
      </div>

      <p className="mt-8 text-xs text-muted-foreground text-center max-w-md">
        Diagnóstico confidencial · Sem compromisso · Recomendação personalizada ao seu perfil<br />
        <span className="font-medium">Formação Certificada · Day Clinic In Loco · Mentoria Premium · In Company</span>
      </p>
    </div>
  )
}

export default Avaliacao
