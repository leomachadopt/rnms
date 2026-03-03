import { EligibilityChat } from '@/components/EligibilityChat'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Elegibilidade() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-start justify-center p-4 pt-8 pb-8">
      <div className="w-full max-w-5xl">
        {/* Breadcrumb / Back */}
        <div className="mb-6">
          <Link
            to="/programa-rns"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar ao Programa RNS
          </Link>
        </div>

        {/* Título */}
        <div className="text-center mb-8">
          <h1 className="heading-premium text-3xl lg:text-4xl mb-4 text-foreground">
            Avaliação de <span className="text-gradient-gold">Elegibilidade</span>
          </h1>
          <p className="text-premium text-lg max-w-2xl mx-auto">
            Descobre se a tua clínica tem o perfil adequado para integração institucional
            do Programa RNS de Integração Ortodôntica.
          </p>
        </div>

        {/* Chat */}
        <EligibilityChat />

        {/* Nota de Rodapé */}
        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
            Esta conversa é confidencial e não gera compromisso. O Programa RNS aceita
            apenas <strong>2 clínicas adicionais</strong> neste momento para garantir
            qualidade de implementação.
          </p>
        </div>
      </div>
    </div>
  )
}
