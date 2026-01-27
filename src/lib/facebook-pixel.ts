// Facebook Pixel SDK wrapper
// Documentação: https://developers.facebook.com/docs/meta-pixel

declare global {
  interface Window {
    fbq: (
      command: string,
      eventName?: string,
      data?: Record<string, unknown>
    ) => void
    _fbq: typeof window.fbq
  }
}

export type FacebookPixelEvent =
  | 'PageView'
  | 'ViewContent'
  | 'Lead'
  | 'CompleteRegistration'
  | 'Contact'
  | 'Search'
  | 'Schedule'

export interface FacebookPixelOptions {
  eventID?: string
  eventData?: Record<string, unknown>
}

class FacebookPixel {
  private initialized = false
  private pixelId: string | null = null
  private consentGiven = false

  constructor() {
    // Verifica se já existe consentimento armazenado
    const consent = localStorage.getItem('cookie-consent')
    if (consent === 'accepted') {
      this.consentGiven = true
    }
  }

  /**
   * Inicializa o Facebook Pixel
   */
  init(pixelId: string): void {
    if (!pixelId || this.initialized) return

    this.pixelId = pixelId

    // Só inicializa se tiver consentimento
    if (!this.consentGiven) {
      console.log('[FB Pixel] Aguardando consentimento de cookies')
      return
    }

    this._loadPixel()
  }

  /**
   * Carrega o script do Facebook Pixel
   */
  private _loadPixel(): void {
    if (typeof window === 'undefined' || !this.pixelId) return

    // Script do Facebook Pixel
    const fbq = function(...args: unknown[]) {
      if (fbq.callMethod) {
        // @ts-expect-error - FB Pixel dynamic args
        fbq.callMethod.apply(fbq, args)
      } else {
        // @ts-expect-error - FB Pixel queue
        fbq.queue.push(args)
      }
    }

    if (!window.fbq) {
      window.fbq = fbq
    }
    // @ts-expect-error - FB Pixel initialization
    fbq.push = fbq
    // @ts-expect-error - FB Pixel queue
    fbq.loaded = true
    // @ts-expect-error - FB Pixel version
    fbq.version = '2.0'
    // @ts-expect-error - FB Pixel queue
    fbq.queue = []

    const script = document.createElement('script')
    script.async = true
    script.src = 'https://connect.facebook.net/en_US/fbevents.js'

    const firstScript = document.getElementsByTagName('script')[0]
    firstScript.parentNode?.insertBefore(script, firstScript)

    // Inicializa o pixel
    window.fbq('init', this.pixelId)

    this.initialized = true
    console.log('[FB Pixel] Inicializado com sucesso')
  }

  /**
   * Processa consentimento de cookies
   */
  grantConsent(): void {
    this.consentGiven = true
    localStorage.setItem('cookie-consent', 'accepted')

    // Se já tem pixelId mas ainda não foi inicializado, inicializa agora
    if (this.pixelId && !this.initialized) {
      this._loadPixel()
    }
  }

  /**
   * Revoga consentimento de cookies
   */
  revokeConsent(): void {
    this.consentGiven = false
    localStorage.removeItem('cookie-consent')
    // Remove o script se existir
    const script = document.querySelector('script[src*="fbevents.js"]')
    if (script) {
      script.remove()
    }
    this.initialized = false
  }

  /**
   * Verifica se o pixel está inicializado
   */
  isInitialized(): boolean {
    return this.initialized && this.consentGiven
  }

  /**
   * Envia um evento para o Facebook Pixel
   */
  track(
    eventName: FacebookPixelEvent,
    options?: FacebookPixelOptions
  ): void {
    if (!this.isInitialized()) {
      console.warn('[FB Pixel] Tentativa de track sem inicialização ou consentimento')
      return
    }

    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', eventName, options?.eventData || {})
      console.log(`[FB Pixel] Evento enviado: ${eventName}`, options?.eventData)

      // Envia também para o servidor (Conversions API)
      this._sendToServer(eventName, options)
    }
  }

  /**
   * Envia evento customizado
   */
  trackCustom(
    eventName: string,
    options?: FacebookPixelOptions
  ): void {
    if (!this.isInitialized()) return

    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', eventName, options?.eventData || {})
      console.log(`[FB Pixel] Evento customizado: ${eventName}`, options?.eventData)

      // Envia também para o servidor
      this._sendToServer(eventName, options)
    }
  }

  /**
   * Envia evento para o servidor (Conversions API)
   */
  private async _sendToServer(
    eventName: string,
    options?: FacebookPixelOptions
  ): Promise<void> {
    try {
      // Coleta dados do navegador
      const fbp = this._getCookie('_fbp')
      const fbc = this._getCookie('_fbc')

      await fetch('/api/conversions-api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventName,
          eventId: options?.eventID || this._generateEventId(),
          eventData: options?.eventData || {},
          fbp,
          fbc,
          url: window.location.href,
          referrer: document.referrer,
        }),
      })
    } catch (error) {
      console.error('[FB Pixel] Erro ao enviar para Conversions API:', error)
    }
  }

  /**
   * Obtém cookie pelo nome
   */
  private _getCookie(name: string): string | null {
    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) {
      return parts.pop()?.split(';').shift() || null
    }
    return null
  }

  /**
   * Gera ID único para evento (deduplicação)
   */
  private _generateEventId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }
}

// Exporta instância única (singleton)
export const fbPixel = new FacebookPixel()
