import type { VercelRequest, VercelResponse } from '@vercel/node'
import { db } from './db/client'
import { evaluations } from './db/schema'
import { desc } from 'drizzle-orm'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    if (req.method === 'GET') {
      // Buscar todas as evaluations ordenadas por data (mais recentes primeiro)
      const allEvaluations = await db
        .select()
        .from(evaluations)
        .orderBy(desc(evaluations.createdAt))

      return res.status(200).json(allEvaluations)
    }

    // Método não permitido
    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    console.error('Error in evaluations API:', error)
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
