import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { fbPixel, FacebookPixelEvent, FacebookPixelOptions } from '@/lib/facebook-pixel'

/**
 * Hook para tracking de eventos do Facebook Pixel
 * Inclui tracking automático de PageView em mudanças de rota
 */
export function useFacebookPixel() {
  const location = useLocation()

  // Track PageView automaticamente em cada mudança de rota
  useEffect(() => {
    if (fbPixel.isInitialized()) {
      fbPixel.track('PageView')
    }
  }, [location.pathname])

  /**
   * Envia um evento para o Facebook Pixel
   */
  const trackEvent = (
    eventName: FacebookPixelEvent,
    options?: FacebookPixelOptions
  ) => {
    fbPixel.track(eventName, options)
  }

  /**
   * Envia um evento customizado
   */
  const trackCustomEvent = (
    eventName: string,
    options?: FacebookPixelOptions
  ) => {
    fbPixel.trackCustom(eventName, options)
  }

  return {
    trackEvent,
    trackCustomEvent,
    isInitialized: fbPixel.isInitialized(),
  }
}
