import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Calendar, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Agenda() {
  const [searchParams] = useSearchParams()
  const status = searchParams.get('status')
  const [calendlyUrl, setCalendlyUrl] = useState('')

  useEffect(() => {
    // Obter URL do Calendly da variável de ambiente
    const url = import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/leonardomachado-rns/entrevista-estrategica'
    setCalendlyUrl(url)
  }, [])

  // Estado: "not_ready" - Q5 = "Não neste momento"
  if (status === 'not_ready') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl text-center">
          <div className="bg-white rounded-2xl shadow-premium border border-border p-8 lg:p-12">
            <div className="w-20 h-20 bg-muted border-2 border-border rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle className="w-10 h-10 text-muted-foreground" />
            </div>

            <h1 className="heading-premium text-2xl lg:text-3xl mb-4 text-foreground">
              Obrigado pelo Interesse
            </h1>

            <p className="text-premium text-base mb-6">
              Pelo teu contexto actual, talvez ainda não seja o momento ideal para um programa de implementação estrutural de 6 meses.
            </p>

            <div className="bg-secondary/10 border-2 border-secondary rounded-xl p-6 mb-8">
              <h3 className="font-bold text-lg mb-3 text-foreground">
                💡 Sugestão
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                O melhor passo agora pode ser consolidar base e clareza através da <strong>Formação RNS Presencial</strong> (4 dias).
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Ela reorganiza o raciocínio clínico ortodôntico sistêmico antes de escalar estruturalmente a clínica.
              </p>
              <p className="text-sm text-muted-foreground">
                Para mais informações: <a href="mailto:formacao@metodorns.pt" className="text-secondary hover:underline font-semibold">formacao@metodorns.pt</a>
              </p>
            </div>

            <div className="mt-8">
              <Link
                to="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar à página inicial
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Estado: "eligible" - Q5 = "Sim" ou "Preciso avaliar internamente"
  if (status === 'eligible') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl text-center">
          <div className="bg-white rounded-2xl shadow-premium border border-border p-8 lg:p-12">
            <div className="w-20 h-20 bg-secondary/20 border-2 border-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-secondary" />
            </div>

            <h1 className="heading-premium text-2xl lg:text-3xl mb-4 text-foreground">
              Aplicação <span className="text-gradient-gold">Recebida</span>
            </h1>

            <p className="text-premium text-lg mb-6">
              O teu perfil está alinhado com o Programa RNS de Integração Ortodôntica.
            </p>

            <div className="bg-secondary/10 border-2 border-secondary rounded-xl p-6 mb-8">
              <h3 className="font-bold text-lg mb-3 text-foreground">
                📅 Próximo Passo: Entrevista Estratégica de Elegibilidade
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Agenda agora a tua <strong>Entrevista Estratégica</strong> de 45 minutos com o Dr. Leonardo Machado.
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                Nesta sessão, vamos:
              </p>
              <ul className="text-sm text-muted-foreground text-left list-disc list-inside space-y-1 mb-6">
                <li>Analisar em profundidade o estado actual da tua clínica</li>
                <li>Mapear os bloqueios específicos ao crescimento ortodôntico</li>
                <li>Validar se o Programa RNS é adequado ao teu momento</li>
                <li>Apresentar o investimento e estrutura de implementação</li>
              </ul>

              <Button
                onClick={() => window.open(calendlyUrl, '_blank')}
                className="w-full btn-gold hover-glow-gold"
                size="lg"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Agendar Entrevista Estratégica (45 min)
              </Button>
            </div>

            <div className="bg-muted/50 border border-border rounded-xl p-6">
              <p className="text-xs text-muted-foreground mb-2">
                ⚠️ <strong>Capacidade limitada:</strong> O Programa pode integrar apenas <strong>mais 4 clínicas</strong> neste momento para garantir qualidade de implementação.
              </p>
              <p className="text-xs text-muted-foreground">
                <strong>Entrevista diagnóstica e seletiva.</strong> Não é uma sessão comercial — é uma avaliação mútua de alinhamento.
              </p>
            </div>

            <p className="text-xs text-muted-foreground mt-6">
              Não consegues agendar agora? Sem problema — vais receber um email com o link de agendamento.
            </p>

            <div className="mt-8">
              <Link
                to="/"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar à página inicial
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Estado: acesso direto sem status (não deveria acontecer, mas é fail-safe)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center">
        <div className="bg-white rounded-2xl shadow-premium border border-border p-8 lg:p-12">
          <h1 className="heading-premium text-2xl lg:text-3xl mb-4 text-foreground">
            Acesso Inválido
          </h1>

          <p className="text-premium text-base mb-6">
            Esta página só pode ser acedida após submissão do formulário de aplicação.
          </p>

          <Button
            asChild
            className="btn-gold hover-glow-gold"
            size="lg"
          >
            <Link to="/elegibilidade">
              Iniciar Avaliação de Elegibilidade
            </Link>
          </Button>

          <div className="mt-8">
            <Link
              to="/"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar à página inicial
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
