import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Send, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from 'sonner'

export default function Aplicacao() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    monthlyRevenue: '',
    goal12m: '',
    readyToInvest: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validação básica
    if (!formData.name || !formData.monthlyRevenue || !formData.goal12m || !formData.readyToInvest) {
      toast.error('Por favor, preenche todos os campos obrigatórios.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/save-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const err = await response.json().catch(() => ({}))
        throw new Error(err.error || `Erro ${response.status}`)
      }

      // Redirecionar baseado na resposta Q5
      if (formData.readyToInvest === 'Não neste momento') {
        navigate('/aplicacao?status=not_ready')
      } else {
        navigate('/agenda?status=eligible')
      }
    } catch (error: any) {
      toast.error(error.message || 'Erro ao enviar formulário. Tenta novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Breadcrumb / Back */}
        <div className="mb-6">
          <Link
            to="/elegibilidade"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar à Avaliação de Elegibilidade
          </Link>
        </div>

        {/* Título */}
        <div className="text-center mb-8">
          <h1 className="heading-premium text-3xl lg:text-4xl mb-4 text-foreground">
            Aplicação —<br />
            <span className="text-gradient-gold">Entrevista Estratégica de Elegibilidade</span>
          </h1>
          <p className="text-premium text-base max-w-xl mx-auto">
            Para garantir alinhamento e proteger a qualidade da implementação,
            precisamos confirmar alguns dados antes de liberar a agenda.
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-premium border border-border p-6 lg:p-8 space-y-6">
          {/* Campos de Contacto */}
          <div className="space-y-4 pb-6 border-b border-border">
            <h3 className="font-bold text-lg text-foreground">Dados de Contacto</h3>

            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-semibold text-foreground">
                Nome Completo <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Dr. João Silva"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                maxLength={255}
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-foreground">
                Email Profissional
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="email@clinica.pt"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                maxLength={255}
                className="text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="whatsapp" className="text-sm font-semibold text-foreground">
                WhatsApp (recomendado)
              </Label>
              <Input
                id="whatsapp"
                type="tel"
                placeholder="+351 912 345 678"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                maxLength={50}
                className="text-base"
              />
            </div>
          </div>

          {/* 3 Perguntas Obrigatórias */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-foreground">Contexto da Clínica</h3>

            {/* Q1: Faturação mensal */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-foreground">
                1. Faturação média mensal aproximada <span className="text-destructive">*</span>
              </Label>
              <RadioGroup
                value={formData.monthlyRevenue}
                onValueChange={(value) => setFormData({ ...formData, monthlyRevenue: value })}
                className="space-y-2"
              >
                {["Até 50.000€", "50.000–100.000€", "100.000–250.000€", "250.000€+"].map((option) => (
                  <div key={option} className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <RadioGroupItem value={option} id={`revenue-${option}`} />
                    <Label htmlFor={`revenue-${option}`} className="flex-1 cursor-pointer">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Q2: Objetivo 12 meses */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-foreground">
                2. Objetivo principal nos próximos 12 meses <span className="text-destructive">*</span>
              </Label>
              <RadioGroup
                value={formData.goal12m}
                onValueChange={(value) => setFormData({ ...formData, goal12m: value })}
                className="space-y-2"
              >
                {[
                  "Organizar clínica com previsibilidade",
                  "Aumentar faturação com consistência"
                ].map((option) => (
                  <div key={option} className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <RadioGroupItem value={option} id={`goal-${option}`} />
                    <Label htmlFor={`goal-${option}`} className="flex-1 cursor-pointer">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Q3: Preparação para investir */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-foreground">
                3. Preparação para investir num programa de implementação estrutural com acompanhamento direto (6 meses) <span className="text-destructive">*</span>
              </Label>
              <RadioGroup
                value={formData.readyToInvest}
                onValueChange={(value) => setFormData({ ...formData, readyToInvest: value })}
                className="space-y-2"
              >
                {[
                  "Sim",
                  "Preciso avaliar internamente",
                  "Não neste momento"
                ].map((option) => (
                  <div key={option} className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <RadioGroupItem value={option} id={`ready-${option}`} />
                    <Label htmlFor={`ready-${option}`} className="flex-1 cursor-pointer">{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>

          {/* Botão de Envio */}
          <div className="pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-gold hover-glow-gold"
              size="lg"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  A enviar...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Aplicação
                </>
              )}
            </Button>
          </div>

          {/* Nota de Privacidade */}
          <p className="text-xs text-muted-foreground text-center mt-4">
            Os teus dados são tratados com confidencialidade e utilizados exclusivamente para avaliação de elegibilidade ao Programa RNS.
          </p>
        </form>
      </div>
    </div>
  )
}
