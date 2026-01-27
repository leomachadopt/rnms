/**
 * Facebook Conversions API Endpoint
 * Envia eventos server-side para melhorar tracking e deduplicação
 * Documentação: https://developers.facebook.com/docs/marketing-api/conversions-api
 */

import type { VercelRequest, VercelResponse } from '@vercel/node'
import crypto from 'crypto'

const FACEBOOK_PIXEL_ID = process.env.VITE_FACEBOOK_PIXEL_ID
const CONVERSIONS_API_TOKEN = process.env.FACEBOOK_CONVERSIONS_API_TOKEN
const CONVERSIONS_API_VERSION = 'v21.0' // Versão da API do Facebook

interface ConversionEvent {
  eventName: string
  eventId: string
  eventData?: Record<string, unknown>
  fbp?: string | null
  fbc?: string | null
  url?: string
  referrer?: string
}

/**
 * Hash de dados para privacidade (SHA256)
 */
function hashData(data: string): string {
  return crypto.createHash('sha256').update(data.toLowerCase().trim()).digest('hex')
}

/**
 * Extrai IP do request
 */
function getClientIp(req: VercelRequest): string | undefined {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string') {
    return forwarded.split(',')[0].trim()
  }
  return req.socket?.remoteAddress
}

/**
 * Handler principal
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Apenas POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Valida configuração
  if (!FACEBOOK_PIXEL_ID || !CONVERSIONS_API_TOKEN) {
    console.error('[Conversions API] Credenciais não configuradas')
    return res.status(500).json({ error: 'Facebook Conversions API not configured' })
  }

  try {
    const { eventName, eventId, eventData, fbp, fbc, url, referrer } = req.body as ConversionEvent

    if (!eventName || !eventId) {
      return res.status(400).json({ error: 'eventName and eventId are required' })
    }

    // Extrai dados do usuário
    const clientIp = getClientIp(req)
    const userAgent = req.headers['user-agent']

    // Monta payload da Conversions API
    const eventTime = Math.floor(Date.now() / 1000)

    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: eventTime,
          event_id: eventId, // Para deduplicação com browser pixel
          event_source_url: url || req.headers.referer,
          action_source: 'website',
          user_data: {
            client_ip_address: clientIp,
            client_user_agent: userAgent,
            fbp: fbp || undefined, // Cookie _fbp
            fbc: fbc || undefined, // Cookie _fbc (click ID)
          },
          custom_data: eventData || {},
        },
      ],
    }

    // Envia para Facebook Conversions API
    const fbApiUrl = `https://graph.facebook.com/${CONVERSIONS_API_VERSION}/${FACEBOOK_PIXEL_ID}/events`

    const response = await fetch(fbApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        access_token: CONVERSIONS_API_TOKEN,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      console.error('[Conversions API] Erro do Facebook:', result)
      return res.status(response.status).json({
        error: 'Facebook API error',
        details: result
      })
    }

    console.log(`[Conversions API] Evento enviado: ${eventName} (${eventId})`, result)

    return res.status(200).json({
      success: true,
      eventId,
      facebookResponse: result
    })

  } catch (error: any) {
    console.error('[Conversions API] Erro:', error)
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message
    })
  }
}
