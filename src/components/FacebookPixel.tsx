import { useEffect } from 'react'
import { fbPixel } from '@/lib/facebook-pixel'

/**
 * Componente que inicializa o Facebook Pixel
 * Deve ser incluído uma vez no App principal
 */
export function FacebookPixel() {
  useEffect(() => {
    const pixelId = import.meta.env.VITE_FACEBOOK_PIXEL_ID

    if (!pixelId) {
      console.warn('[FB Pixel] VITE_FACEBOOK_PIXEL_ID não configurado')
      return
    }

    // Inicializa o pixel (só carrega se tiver consentimento)
    fbPixel.init(pixelId)
  }, [])

  return null // Componente invisível
}
