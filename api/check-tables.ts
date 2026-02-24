import type { VercelRequest, VercelResponse } from '@vercel/node'
import { neon } from '@neondatabase/serverless'

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    const databaseUrl = process.env.DATABASE_URL || process.env.VITE_DATABASE_URL
    
    if (!databaseUrl) {
      return res.status(500).json({
        error: 'DATABASE_URL não está definida',
      })
    }

    // Remover channel_binding se existir
    const cleanUrl = databaseUrl.replace(/[&?]channel_binding=require/g, '')
    
    const sql = neon(cleanUrl)
    
    // Verificar se as tabelas existem
    // Usar template literal para queries (nova API do Neon serverless)
    const tablesResult = await sql`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
      ORDER BY table_name;
    `

    return res.status(200).json({
      success: true,
      tables: tablesResult.map((t: any) => t.table_name) || [],
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error('Erro ao verificar tabelas:', error)
    return res.status(500).json({
      error: error?.message || 'Erro desconhecido',
      stack: error?.stack,
    })
  }
}

