import { useState, useEffect } from 'react'
import { Save, Loader2, Activity, CheckCircle, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { getSetting, saveSetting } from '@/services/settings'

export default function TrackingSettings() {
  const [pixelId, setPixelId] = useState('')
  const [conversionsToken, setConversionsToken] = useState('')
  const [pixelEnabled, setPixelEnabled] = useState(true)
  const [conversionsEnabled, setConversionsEnabled] = useState(true)
  const [testMode, setTestMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [hasPixelId, setHasPixelId] = useState(false)
  const [hasToken, setHasToken] = useState(false)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      setIsLoading(true)

      const [pixelSetting, tokenSetting, pixelEnabledSetting, conversionsEnabledSetting, testModeSetting] =
        await Promise.all([
          getSetting('facebook_pixel_id'),
          getSetting('facebook_conversions_api_token'),
          getSetting('facebook_pixel_enabled'),
          getSetting('facebook_conversions_api_enabled'),
          getSetting('facebook_test_mode'),
        ])

      if (pixelSetting && pixelSetting.value !== '***configurada***') {
        setPixelId(pixelSetting.value)
        setHasPixelId(true)
      } else if (pixelSetting) {
        setHasPixelId(true)
      }

      if (tokenSetting) {
        setHasToken(tokenSetting.value === '***configurada***')
      }

      setPixelEnabled(pixelEnabledSetting?.value === 'true')
      setConversionsEnabled(conversionsEnabledSetting?.value === 'true')
      setTestMode(testModeSetting?.value === 'true')
    } catch (error) {
      console.error('Erro ao carregar configurações:', error)
      toast.error('Erro ao carregar configurações')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!pixelId.trim()) {
      toast.error('Por favor, insira o Facebook Pixel ID')
      return
    }

    try {
      setIsSaving(true)

      const promises = [
        saveSetting('facebook_pixel_id', pixelId, 'Facebook Pixel ID para tracking'),
        saveSetting('facebook_pixel_enabled', pixelEnabled.toString(), 'Ativar/desativar Facebook Pixel'),
        saveSetting(
          'facebook_conversions_api_enabled',
          conversionsEnabled.toString(),
          'Ativar/desativar Conversions API'
        ),
        saveSetting('facebook_test_mode', testMode.toString(), 'Enviar eventos para Test Events'),
      ]

      // Só salvar token se usuário digitou um novo
      if (conversionsToken.trim().length > 0) {
        promises.push(
          saveSetting(
            'facebook_conversions_api_token',
            conversionsToken,
            'Facebook Conversions API Access Token'
          )
        )
      }

      await Promise.all(promises)

      if (conversionsToken.trim().length > 0) {
        setHasToken(true)
        setConversionsToken('')
      }

      setHasPixelId(true)
      toast.success('Configurações salvas com sucesso!')
    } catch (error) {
      console.error('Erro ao salvar configurações:', error)
      toast.error('Erro ao salvar configurações')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[600px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Activity className="w-6 h-6 text-primary" />
          Configurações de Tracking
        </h1>
        <p className="text-muted-foreground mt-1">
          Configure o Facebook Pixel e Conversions API para tracking de campanhas
        </p>
      </div>

      {/* Status Cards */}
      <div className="grid sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              {hasPixelId && pixelEnabled ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-gray-400" />
              )}
              Facebook Pixel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              {hasPixelId && pixelEnabled
                ? 'Configurado e ativo'
                : hasPixelId
                  ? 'Configurado mas desativado'
                  : 'Não configurado'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              {hasToken && conversionsEnabled ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <XCircle className="h-4 w-4 text-gray-400" />
              )}
              Conversions API
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              {hasToken && conversionsEnabled
                ? 'Configurada e ativa'
                : hasToken
                  ? 'Configurada mas desativada'
                  : 'Não configurada'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Configurações */}
      <Card>
        <CardHeader>
          <CardTitle>Facebook Pixel</CardTitle>
          <CardDescription>
            Obtenha seu Pixel ID em{' '}
            <a
              href="https://business.facebook.com/events_manager"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Facebook Events Manager
            </a>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pixelId">Pixel ID</Label>
            {hasPixelId && pixelId === '' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-2">
                <p className="text-sm text-green-800">✓ Pixel ID já configurado</p>
              </div>
            )}
            <Input
              id="pixelId"
              value={pixelId}
              onChange={(e) => setPixelId(e.target.value)}
              placeholder="123456789012345"
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground">
              Código numérico de 15 dígitos do seu Facebook Pixel
            </p>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label htmlFor="pixelEnabled">Ativar Facebook Pixel</Label>
              <p className="text-xs text-muted-foreground">Tracking no navegador do usuário</p>
            </div>
            <Switch id="pixelEnabled" checked={pixelEnabled} onCheckedChange={setPixelEnabled} />
          </div>
        </CardContent>
      </Card>

      {/* Conversions API */}
      <Card>
        <CardHeader>
          <CardTitle>Conversions API (Server-Side)</CardTitle>
          <CardDescription>
            Obtenha seu Access Token em Events Manager → Configurações → Conversions API
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="conversionsToken">Conversions API Access Token</Label>
            {hasToken && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-2">
                <p className="text-sm text-green-800">
                  ✓ Token já configurado e armazenado de forma segura no servidor
                </p>
              </div>
            )}
            <Input
              id="conversionsToken"
              type="password"
              value={conversionsToken}
              onChange={(e) => setConversionsToken(e.target.value)}
              placeholder={hasToken ? 'Digite para atualizar o token...' : 'EAAx...'}
              className="font-mono"
            />
            <p className="text-xs text-muted-foreground">
              {hasToken ? 'Token armazenado de forma segura. Digite apenas para atualizar.' : 'Token gerado no Events Manager'}
            </p>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label htmlFor="conversionsEnabled">Ativar Conversions API</Label>
              <p className="text-xs text-muted-foreground">Tracking server-side para melhor precisão</p>
            </div>
            <Switch
              id="conversionsEnabled"
              checked={conversionsEnabled}
              onCheckedChange={setConversionsEnabled}
            />
          </div>
        </CardContent>
      </Card>

      {/* Opções Avançadas */}
      <Card>
        <CardHeader>
          <CardTitle>Opções Avançadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <Label htmlFor="testMode">Modo de Teste</Label>
              <p className="text-xs text-muted-foreground">
                Envia eventos para Test Events (não conta nas métricas)
              </p>
            </div>
            <Switch id="testMode" checked={testMode} onCheckedChange={setTestMode} />
          </div>
        </CardContent>
      </Card>

      {/* Botão Salvar */}
      <Button onClick={handleSave} disabled={isSaving} className="w-full">
        {isSaving ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            A guardar...
          </>
        ) : (
          <>
            <Save className="w-4 h-4 mr-2" />
            Guardar Configurações
          </>
        )}
      </Button>

      {/* Informações */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            ℹ️ Como funciona o tracking
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-blue-900 space-y-2">
          <p>
            <strong>Facebook Pixel:</strong> Rastreia eventos no navegador do usuário (PageView, Lead,
            CompleteRegistration)
          </p>
          <p>
            <strong>Conversions API:</strong> Envia os mesmos eventos do servidor, melhorando a precisão e
            evitando perda de dados por bloqueadores
          </p>
          <p>
            <strong>Deduplicação:</strong> Os eventos são automaticamente deduplicados pelo Facebook usando IDs únicos
          </p>
        </CardContent>
      </Card>

      {/* Segurança */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-sm flex items-center gap-2">
            🔒 Segurança
          </CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-green-900 space-y-1">
          <ul className="list-disc list-inside space-y-1">
            <li>O Access Token é armazenado de forma criptografada no servidor</li>
            <li>O token NUNCA é enviado ao navegador ou exposto no frontend</li>
            <li>Todas as chamadas à Conversions API são feitas exclusivamente pelo backend</li>
            <li>Conformidade com LGPD: banner de consentimento de cookies implementado</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
