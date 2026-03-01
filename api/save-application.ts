import type { VercelRequest, VercelResponse } from '@vercel/node'
import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import { applications } from './db/schema'

const DATABASE_URL = process.env.DATABASE_URL || process.env.VITE_DATABASE_URL

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL não está definida')
}

const sql = neon(DATABASE_URL)
const db = drizzle(sql)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  )

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  try {
    const {
      name,
      email,
      whatsapp,
      monthlyRevenue,
      readyToInvest,
      mainGoal,
      biggestChallenge,
      whyNow,
    } = req.body

    // Validação básica
    if (!name || !email || !whatsapp || !monthlyRevenue || !readyToInvest) {
      return res.status(400).json({ error: 'Campos obrigatórios em falta' })
    }

    // Captura metadados
    const ipAddress =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
      (req.headers['x-real-ip'] as string) ||
      req.socket?.remoteAddress ||
      null

    const userAgent = req.headers['user-agent'] || null

    // Metadados adicionais
    const metadata = {
      source: 'elegibilidade_chat',
      timestamp: new Date().toISOString(),
      userAgent,
    }

    // Salva aplicação na base de dados
    const [newApplication] = await db
      .insert(applications)
      .values({
        name,
        email,
        whatsapp,
        monthlyRevenue,
        readyToInvest,
        mainGoal: mainGoal || null,
        biggestChallenge: biggestChallenge || null,
        whyNow: whyNow || null,
        metadata,
        ipAddress,
        userAgent,
        status: 'submitted',
      })
      .returning()

    console.log('✅ Aplicação salva:', newApplication.id)

    return res.status(200).json({
      success: true,
      applicationId: newApplication.id,
    })
  } catch (error: any) {
    console.error('❌ Erro ao salvar aplicação:', error)
    return res.status(500).json({
      error: 'Erro ao salvar aplicação',
      details: error.message,
    })
  }
}
