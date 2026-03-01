import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Send, Loader2, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { toast } from 'sonner'

export default function Aplicacao() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    monthlyRevenue: '',
    readyToInvest: '',
    mainGoal: '',
    biggestChallenge: '',
    whyNow: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validação básica
    if (!formData.name || !formData.email || !formData.whatsapp || !formData.monthlyRevenue || !formData.readyToInvest) {
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

      setIsSuccess(true)
      toast.success('Formulário enviado com sucesso!')
    } catch (error: any) {
      toast.error(error.message || 'Erro ao enviar formulário. Tenta novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl text-center">
          <div className="bg-white rounded-2xl shadow-premium border border-border p-8 lg:p-12">
            <div className="w-20 h-20 bg-secondary/20 border-2 border-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-secondary" />
            </div>

            <h1 className="heading-premium text-2xl lg:text-3xl mb-4 text-foreground">
              Formulário <span className="text-gradient-gold">Recebido</span>
            </h1>

            <p className="text-premium text-lg mb-6">
              Obrigado por submeteres a tua candidatura ao <strong>Programa RNS de Integração Ortodôntica</strong>.
            </p>

            <div className="bg-secondary/10 border-2 border-secondary rounded-xl p-6 mb-8">
              <h3 className="font-bold text-lg mb-3 text-foreground">
                📅 Próximo Passo: Entrevista Estratégica
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
                onClick={() => window.open('https://calendly.com/leonardomachado-rns/entrevista-estrategica', '_blank')}
                className="w-full btn-gold hover-glow-gold"
                size="lg"
              >
                Agendar Entrevista Estratégica (45 min)
              </Button>
            </div>

            <p className="text-xs text-muted-foreground">
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
            Formulário de <span className="text-gradient-gold">Pré-Elegibilidade</span>
          </h1>
          <p className="text-premium text-lg max-w-xl mx-auto">
            Último passo antes da tua Entrevista Estratégica com o Dr. Leonardo Machado.
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-premium border border-border p-6 lg:p-8 space-y-6">
          {/* 1. Nome Completo */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-semibold text-foreground">
              1. Nome Completo <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Ex: Dr. João Silva"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              maxLength={255}
              className="text-base"
            />
          </div>

          {/* 2. Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold text-foreground">
              2. Email Profissional <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="email@clinica.pt"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              maxLength={255}
              className="text-base"
            />
          </div>

          {/* 3. WhatsApp */}
          <div className="space-y-2">
            <Label htmlFor="whatsapp" className="text-sm font-semibold text-foreground">
              3. WhatsApp (com código do país) <span className="text-destructive">*</span>
            </Label>
            <Input
              id="whatsapp"
              type="tel"
              placeholder="+351 912 345 678"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              required
              maxLength={50}
              className="text-base"
            />
          </div>

          {/* 4. Faturamento Mensal Ortodôntico */}
          <div className="space-y-2">
            <Label htmlFor="monthlyRevenue" className="text-sm font-semibold text-foreground">
              4. Faturamento Mensal Ortodôntico Atual (aproximado) <span className="text-destructive">*</span>
            </Label>
            <RadioGroup
              value={formData.monthlyRevenue}
              onValueChange={(value) => setFormData({ ...formData, monthlyRevenue: value })}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <RadioGroupItem value="Menos de €5.000/mês" id="r1" />
                <Label htmlFor="r1" className="flex-1 cursor-pointer">Menos de €5.000/mês</Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <RadioGroupItem value="€5.000 - €10.000/mês" id="r2" />
                <Label htmlFor="r2" className="flex-1 cursor-pointer">€5.000 - €10.000/mês</Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <RadioGroupItem value="€10.000 - €20.000/mês" id="r3" />
                <Label htmlFor="r3" className="flex-1 cursor-pointer">€10.000 - €20.000/mês</Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <RadioGroupItem value="€20.000 - €40.000/mês" id="r4" />
                <Label htmlFor="r4" className="flex-1 cursor-pointer">€20.000 - €40.000/mês</Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <RadioGroupItem value="Mais de €40.000/mês" id="r5" />
                <Label htmlFor="r5" className="flex-1 cursor-pointer">Mais de €40.000/mês</Label>
              </div>
            </RadioGroup>
          </div>

          {/* 5. Pronto para Investir */}
          <div className="space-y-2">
            <Label htmlFor="readyToInvest" className="text-sm font-semibold text-foreground">
              5. Tens capacidade de investimento para um programa de transformação institucional? <span className="text-destructive">*</span>
            </Label>
            <p className="text-xs text-muted-foreground mb-3">
              O Programa RNS de Integração Ortodôntica requer investimento financeiro e dedicação de tempo da equipa clínica.
            </p>
            <RadioGroup
              value={formData.readyToInvest}
              onValueChange={(value) => setFormData({ ...formData, readyToInvest: value })}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <RadioGroupItem value="Sim" id="invest-yes" />
                <Label htmlFor="invest-yes" className="flex-1 cursor-pointer">Sim, tenho capacidade de investimento</Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <RadioGroupItem value="Não" id="invest-no" />
                <Label htmlFor="invest-no" className="flex-1 cursor-pointer">Não neste momento</Label>
              </div>
              <div className="flex items-center space-x-2 p-3 border border-border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                <RadioGroupItem value="Depende" id="invest-maybe" />
                <Label htmlFor="invest-maybe" className="flex-1 cursor-pointer">Depende do valor e condições</Label>
              </div>
            </RadioGroup>
          </div>

          {/* 6. Objectivo Principal (opcional) */}
          <div className="space-y-2">
            <Label htmlFor="mainGoal" className="text-sm font-semibold text-foreground">
              6. Qual é o teu principal objectivo com o Programa RNS? (opcional)
            </Label>
            <Textarea
              id="mainGoal"
              placeholder="Ex: Escalar a ortodontia da minha clínica de 30 para 80 casos/ano com previsibilidade clínica e comercial."
              value={formData.mainGoal}
              onChange={(e) => setFormData({ ...formData, mainGoal: e.target.value })}
              maxLength={500}
              rows={3}
              className="text-base resize-none"
            />
          </div>

          {/* 7. Maior Desafio (opcional) */}
          <div className="space-y-2">
            <Label htmlFor="biggestChallenge" className="text-sm font-semibold text-foreground">
              7. Qual é o teu maior desafio actual na ortodontia? (opcional)
            </Label>
            <Textarea
              id="biggestChallenge"
              placeholder="Ex: Casos complexos sem método claro, equipa sem protocolo de acompanhamento, imprevisibilidade no tempo de tratamento."
              value={formData.biggestChallenge}
              onChange={(e) => setFormData({ ...formData, biggestChallenge: e.target.value })}
              maxLength={500}
              rows={3}
              className="text-base resize-none"
            />
          </div>

          {/* 8. Por que agora? (opcional) */}
          <div className="space-y-2">
            <Label htmlFor="whyNow" className="text-sm font-semibold text-foreground">
              8. Por que é importante para ti resolver isto agora? (opcional)
            </Label>
            <Textarea
              id="whyNow"
              placeholder="Ex: Quero consolidar a ortodontia como pilar principal da clínica nos próximos 12 meses."
              value={formData.whyNow}
              onChange={(e) => setFormData({ ...formData, whyNow: e.target.value })}
              maxLength={500}
              rows={3}
              className="text-base resize-none"
            />
          </div>

          {/* Botão de Envio */}
          <div className="pt-4">
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
                  Enviar Formulário
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
