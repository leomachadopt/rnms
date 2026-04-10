import type { VercelRequest, VercelResponse } from '@vercel/node'
import { put } from '@vercel/blob'

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { file, filename } = req.body

    if (!file || !filename) {
      return res.status(400).json({ error: 'File and filename are required' })
    }

    // Token do Vercel Blob (deve estar nas environment variables)
    const token = process.env.BLOB_READ_WRITE_TOKEN

    if (!token) {
      console.error('BLOB_READ_WRITE_TOKEN não configurado')
      return res.status(500).json({
        error: 'Upload service not configured',
        message: 'Por favor configure BLOB_READ_WRITE_TOKEN nas variáveis de ambiente'
      })
    }

    // Converter base64 para buffer
    const base64Data = file.replace(/^data:image\/\w+;base64,/, '')
    const buffer = Buffer.from(base64Data, 'base64')

    // Upload para Vercel Blob (acesso público)
    const blob = await put(`uploads/${Date.now()}-${filename}`, buffer, {
      access: 'public',
      token: token,
    })

    return res.status(200).json({ url: blob.url })
  } catch (error) {
    console.error('Erro ao fazer upload:', error)
    return res.status(500).json({
      error: 'Upload failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}
