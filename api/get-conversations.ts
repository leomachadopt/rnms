import { neon } from '@neondatabase/serverless'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const sql = neon(process.env.DATABASE_URL!)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Apenas aceitar GET
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { chatType, status, limit = '50', offset = '0' } = req.query

    // Construir query base
    let query = `
      SELECT
        id,
        session_id,
        chat_type,
        user_email,
        user_name,
        user_fingerprint,
        ip_address,
        user_agent,
        messages,
        metadata,
        status,
        started_at,
        last_message_at,
        completed_at
      FROM agent_conversations
      WHERE 1=1
    `

    const params: any[] = []
    let paramIndex = 1

    // Filtrar por tipo de chat
    if (chatType) {
      query += ` AND chat_type = $${paramIndex}`
      params.push(chatType)
      paramIndex++
    }

    // Filtrar por status
    if (status) {
      query += ` AND status = $${paramIndex}`
      params.push(status)
      paramIndex++
    }

    // Ordenar por mais recentes
    query += ` ORDER BY last_message_at DESC`

    // Paginação
    query += ` LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`
    params.push(parseInt(limit as string), parseInt(offset as string))

    // Executar query
    const conversations = await sql(query, params)

    // Contar total
    let countQuery = `SELECT COUNT(*) as total FROM agent_conversations WHERE 1=1`
    const countParams: any[] = []
    let countParamIndex = 1

    if (chatType) {
      countQuery += ` AND chat_type = $${countParamIndex}`
      countParams.push(chatType)
      countParamIndex++
    }

    if (status) {
      countQuery += ` AND status = $${countParamIndex}`
      countParams.push(status)
    }

    const countResult = await sql(countQuery, countParams)
    const total = parseInt(countResult[0]?.total || '0')

    return res.status(200).json({
      success: true,
      conversations,
      pagination: {
        total,
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
        hasMore: parseInt(offset as string) + parseInt(limit as string) < total
      }
    })
  } catch (error) {
    console.error('Erro ao buscar conversas:', error)
    return res.status(500).json({ error: 'Erro ao buscar conversas' })
  }
}
