import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { fbPixel } from '@/lib/facebook-pixel'
import { X, Cookie, Settings } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Switch } from './ui/switch'
import { Label } from './ui/label'

/**
 * Banner de consentimento de cookies (LGPD/GDPR)
 * Aparece na primeira visita e permite configurar preferências
 */
export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [preferences, setPreferences] = useState({
    necessary: true, // Sempre true (não pode desabilitar)
    analytics: true,
    marketing: true,
  })

  useEffect(() => {
    // Verifica se já tem consentimento armazenado
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Aguarda 1 segundo para mostrar o banner (melhor UX)
      setTimeout(() => setShowBanner(true), 1000)
    }
  }, [])

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    localStorage.setItem(
      'cookie-preferences',
      JSON.stringify({
        necessary: true,
        analytics: true,
        marketing: true,
      })
    )

    // Ativa o Facebook Pixel
    fbPixel.grantConsent()

    setShowBanner(false)
    console.log('[Cookies] Todos aceitos')
  }

  const handleRejectAll = () => {
    localStorage.setItem('cookie-consent', 'rejected')
    localStorage.setItem(
      'cookie-preferences',
      JSON.stringify({
        necessary: true,
        analytics: false,
        marketing: false,
      })
    )

    // Revoga consentimento do Facebook Pixel
    fbPixel.revokeConsent()

    setShowBanner(false)
    console.log('[Cookies] Apenas necessários aceitos')
  }

  const handleSavePreferences = () => {
    const status = preferences.analytics || preferences.marketing ? 'accepted' : 'rejected'
    localStorage.setItem('cookie-consent', status)
    localStorage.setItem('cookie-preferences', JSON.stringify(preferences))

    // Ativa/desativa Facebook Pixel conforme preferências
    if (preferences.analytics && preferences.marketing) {
      fbPixel.grantConsent()
    } else {
      fbPixel.revokeConsent()
    }

    setShowSettings(false)
    setShowBanner(false)
    console.log('[Cookies] Preferências salvas:', preferences)
  }

  if (!showBanner) return null

  return (
    <>
      {/* Banner Principal */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom-5">
        <Card className="mx-auto max-w-4xl border-2 shadow-lg">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-start gap-4">
              {/* Ícone */}
              <div className="hidden sm:block">
                <Cookie className="h-8 w-8 text-primary" />
              </div>

              {/* Conteúdo */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">
                  🍪 Este site usa cookies
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Usamos cookies para melhorar sua experiência, analisar o tráfego do site e
                  personalizar conteúdo. Ao clicar em "Aceitar todos", você concorda com o uso de
                  cookies. Você pode gerenciar suas preferências a qualquer momento.
                </p>

                {/* Botões */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button onClick={handleAcceptAll} className="flex-1 sm:flex-none">
                    Aceitar todos
                  </Button>
                  <Button
                    onClick={handleRejectAll}
                    variant="outline"
                    className="flex-1 sm:flex-none"
                  >
                    Apenas necessários
                  </Button>
                  <Button
                    onClick={() => setShowSettings(true)}
                    variant="ghost"
                    className="flex-1 sm:flex-none"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Configurar
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground mt-3">
                  Saiba mais na nossa{' '}
                  <a href="/privacidade" className="underline hover:text-foreground">
                    Política de Privacidade
                  </a>
                </p>
              </div>

              {/* Botão Fechar */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRejectAll}
                className="flex-shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modal de Configurações */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Preferências de Cookies</DialogTitle>
            <DialogDescription>
              Escolha quais tipos de cookies você deseja permitir
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Cookies Necessários */}
            <div className="flex items-start justify-between space-x-4">
              <div className="flex-1">
                <Label className="font-semibold">Cookies Necessários</Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Essenciais para o funcionamento do site. Não podem ser desativados.
                </p>
              </div>
              <Switch checked disabled />
            </div>

            {/* Cookies de Analytics */}
            <div className="flex items-start justify-between space-x-4">
              <div className="flex-1">
                <Label className="font-semibold">Cookies de Analytics</Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Nos ajudam a entender como você usa o site para melhorar a experiência.
                </p>
              </div>
              <Switch
                checked={preferences.analytics}
                onCheckedChange={(checked) =>
                  setPreferences((prev) => ({ ...prev, analytics: checked }))
                }
              />
            </div>

            {/* Cookies de Marketing */}
            <div className="flex items-start justify-between space-x-4">
              <div className="flex-1">
                <Label className="font-semibold">Cookies de Marketing</Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Usados para mostrar anúncios relevantes e medir campanhas de marketing.
                </p>
              </div>
              <Switch
                checked={preferences.marketing}
                onCheckedChange={(checked) =>
                  setPreferences((prev) => ({ ...prev, marketing: checked }))
                }
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleSavePreferences} className="flex-1">
              Salvar Preferências
            </Button>
            <Button onClick={handleAcceptAll} variant="outline" className="flex-1">
              Aceitar Todos
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
