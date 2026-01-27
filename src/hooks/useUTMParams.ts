import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export interface UTMParams {
  utm_source?: string
  utm_medium?: string
  utm_campaign?: string
  utm_content?: string
  utm_term?: string
}

const UTM_STORAGE_KEY = 'utm_params'
const UTM_EXPIRY_DAYS = 30

/**
 * Hook para capturar e persistir parâmetros UTM
 * Armazena no localStorage para associar com conversões futuras
 */
export function useUTMParams() {
  const location = useLocation()
  const [utmParams, setUtmParams] = useState<UTMParams>({})

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    const newUtmParams: UTMParams = {}

    // Captura todos os parâmetros UTM da URL
    const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']
    let hasNewUtm = false

    utmKeys.forEach((key) => {
      const value = searchParams.get(key)
      if (value) {
        newUtmParams[key as keyof UTMParams] = value
        hasNewUtm = true
      }
    })

    // Se encontrou novos parâmetros UTM, salva no localStorage
    if (hasNewUtm) {
      const dataToStore = {
        params: newUtmParams,
        timestamp: Date.now(),
        expiresAt: Date.now() + UTM_EXPIRY_DAYS * 24 * 60 * 60 * 1000,
      }

      localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(dataToStore))
      setUtmParams(newUtmParams)
      console.log('[UTM] Parâmetros capturados:', newUtmParams)
    } else {
      // Tenta recuperar do localStorage
      const stored = localStorage.getItem(UTM_STORAGE_KEY)
      if (stored) {
        try {
          const data = JSON.parse(stored)

          // Verifica se ainda não expirou
          if (data.expiresAt && Date.now() < data.expiresAt) {
            setUtmParams(data.params || {})
          } else {
            // Expirou, remove
            localStorage.removeItem(UTM_STORAGE_KEY)
            setUtmParams({})
          }
        } catch {
          localStorage.removeItem(UTM_STORAGE_KEY)
          setUtmParams({})
        }
      }
    }
  }, [location.search])

  /**
   * Retorna os parâmetros UTM atuais
   */
  const getUTMParams = (): UTMParams => {
    return utmParams
  }

  /**
   * Limpa os parâmetros UTM armazenados
   */
  const clearUTMParams = () => {
    localStorage.removeItem(UTM_STORAGE_KEY)
    setUtmParams({})
  }

  /**
   * Verifica se tem parâmetros UTM ativos
   */
  const hasUTM = (): boolean => {
    return Object.keys(utmParams).length > 0
  }

  /**
   * Retorna string formatada para display
   */
  const getUTMDisplay = (): string => {
    if (!hasUTM()) return 'Direto'

    const { utm_source, utm_medium, utm_campaign } = utmParams

    if (utm_campaign) {
      return `${utm_source || 'Unknown'} - ${utm_campaign}`
    }

    if (utm_source && utm_medium) {
      return `${utm_source} (${utm_medium})`
    }

    return utm_source || 'UTM'
  }

  return {
    utmParams,
    getUTMParams,
    clearUTMParams,
    hasUTM: hasUTM(),
    getUTMDisplay,
  }
}
