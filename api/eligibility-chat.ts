import OpenAI from 'openai'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { db } from './db/client.js'
import { settings } from './db/schema.js'
import { eq } from 'drizzle-orm'
import { readFileSync } from 'fs'
import { join } from 'path'

// Prompt de elegibilidade do Programa RNS
const SYSTEM_PROMPT_FALLBACK = readFileSync(
  join(process.cwd(), 'prompts', 'eligibility-chat.md'),
  'utf-8'
)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'Configuração incompleta no servidor' })
  }

  const { messages } = req.body as {
    messages: { role: 'user' | 'assistant'; content: string }[]
  }

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Payload inválido' })
  }

  try {
    const openai = new OpenAI({ apiKey })

    // Buscar prompt do banco de dados (opcional override)
    const database = db()
    let systemPrompt = SYSTEM_PROMPT_FALLBACK

    try {
      const promptResult = await database
        .select()
        .from(settings)
        .where(eq(settings.key, 'eligibility_chat_prompt'))
        .limit(1)

      if (promptResult.length > 0 && promptResult[0].value) {
        systemPrompt = promptResult[0].value
      }
    } catch (dbError) {
      console.warn('Erro ao buscar prompt do banco, usando fallback:', dbError)
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      max_tokens: 1500,
      temperature: 0.7,
    })

    const reply = completion.choices[0]?.message?.content ?? ''

    return res.status(200).json({ reply })
  } catch (error: any) {
    console.error('Erro OpenAI:', error?.message)
    return res.status(500).json({
      error: 'Erro ao contactar o assistente. Tente novamente.',
    })
  }
}
