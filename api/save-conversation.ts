import { neon } from '@neondatabase/serverless'
import type { VercelRequest, VercelResponse } from '@vercel/node'

const sql = neon(process.env.DATABASE_URL!)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Apenas aceitar POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { sessionId, chatType, messages, userEmail, userName, userFingerprint, status, metadata } = req.body

    // Validação básica
    if (!sessionId || !chatType || !messages) {
      return res.status(400).json({ error: 'sessionId, chatType e messages são obrigatórios' })
    }

    // Extrair informações do request
    const ipAddress = (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
                     (req.headers['x-real-ip'] as string) ||
                     'unknown'
    const userAgent = req.headers['user-agent'] || 'unknown'

    // Verificar se já existe uma conversa com esse sessionId
    const existing = await sql`
      SELECT id FROM agent_conversations WHERE session_id = ${sessionId} LIMIT 1
    `

    if (existing.length > 0) {
      // Atualizar conversa existente
      await sql`
        UPDATE agent_conversations
        SET
          messages = ${JSON.stringify(messages)},
          metadata = ${metadata ? JSON.stringify(metadata) : null},
          status = ${status || 'active'},
          user_email = ${userEmail || null},
          user_name = ${userName || null},
          last_message_at = NOW(),
          completed_at = ${status === 'completed' ? sql`NOW()` : null}
        WHERE session_id = ${sessionId}
      `

      return res.status(200).json({
        success: true,
        message: 'Conversa atualizada',
        conversationId: existing[0].id
      })
    } else {
      // Criar nova conversa
      const result = await sql`
        INSERT INTO agent_conversations (
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
          last_message_at
        ) VALUES (
          ${sessionId},
          ${chatType},
          ${userEmail || null},
          ${userName || null},
          ${userFingerprint || null},
          ${ipAddress},
          ${userAgent},
          ${JSON.stringify(messages)},
          ${metadata ? JSON.stringify(metadata) : null},
          ${status || 'active'},
          NOW(),
          NOW()
        )
        RETURNING id
      `

      return res.status(201).json({
        success: true,
        message: 'Conversa criada',
        conversationId: result[0].id
      })
    }
  } catch (error) {
    console.error('Erro ao salvar conversa:', error)
    return res.status(500).json({ error: 'Erro ao salvar conversa' })
  }
}
