import type { VercelRequest, VercelResponse } from '@vercel/node'
import { db } from './db/client.js'
import { settings } from './db/schema.js'
import { eq } from 'drizzle-orm'

const kommoConfig = {
  token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjZkNTYzODNiNTBkYjNlYmQxNGZlMWU1YjQwOTZiNjdlZmU1NzhkNjNiNTI2N2UzYjE2NDJmNmQ3NmUxMTk1ZDc1OTg3NThkZjNjYTEwYjc3In0.eyJhdWQiOiIzZDhmYjA4Ni1iZDI0LTQxZTYtOTdjZi05NTVhNGNhYjgxNzAiLCJqdGkiOiI2ZDU2MzgzYjUwZGIzZWJkMTRmZTFlNWI0MDk2YjY3ZWZlNTc4ZDYzYjUyNjdlM2IxNjQyZjZkNzZlMTE5NWQ3NTk4NzU4ZGYzY2ExMGI3NyIsImlhdCI6MTc2OTc3NjUwOCwibmJmIjoxNzY5Nzc2NTA4LCJleHAiOjE3OTg3NjE2MDAsInN1YiI6IjExMzMxOTM5IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMyOTUzMDkxLCJiYXNlX2RvbWFpbiI6ImtvbW1vLmNvbSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiZDc0Yjg3NTMtN2Y0MC00YzQ0LTgxYzMtYzdiZWFjYTg1ZDMzIiwidXNlcl9mbGFncyI6MCwiYXBpX2RvbWFpbiI6ImFwaS1nLmtvbW1vLmNvbSJ9.JMlpi6M5SP57n_sLmkZI8E9aWjtL39GvXgiqln3h5pf3SCi8OTa1D9mYIFCStzmtG5tI_qSlCASdsOar3plrAn5QPs08hNNEEA4yOwVywBP_la89s2qOjDoMWCrYk9Az9gUZ9KYx-e8sNIWmhD3Bt4fbGt0GXy-PJ2loF6JI5Lr7-zNdoeJ1PlY3CjeMJEBl3t38EW2NUaGzqOcqZRSlkQvPrKZHCmA7hrUTs0lJkJa93TgtSD_X6VDUt-HrSiK4DoHXhytK0DXEmnOHURJLLIiYqhZ1si355ju4mMUaWpDjwYXJ6WmPfRgNuXgf9SPHBJ7mu_v-Mq1S91H7RixYKg',
  domain: 'clinicadentariavitoria.kommo.com',
  pipeline_id: 12346588,
  status_id: 95413152,
  tag_id: 108497,
  fields: {
    parent_name: 1042879,
    child_age: 1042881,
    risk_level: 1042883,
    breathing_signs: 1042885,
    dental_issues: 1042887,
    oral_habits: 1042889,
    posture: 1042891,
    speech_issues: 1042893,
    sleep_quality: 1042895,
    previous_treatment: 1042897
  }
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  try {
    console.log('=== SALVANDO CONFIGURAÇÕES DO KOMMO NO BANCO ===')
    const database = db()

    // Salvar configuração completa como JSON
    const existing = await database
      .select()
      .from(settings)
      .where(eq(settings.key, 'kommo_config'))
      .limit(1)

    if (existing.length > 0) {
      await database
        .update(settings)
        .set({
          value: JSON.stringify(kommoConfig),
          updatedAt: new Date()
        })
        .where(eq(settings.key, 'kommo_config'))
      console.log('✓ Configuração atualizada')
    } else {
      await database
        .insert(settings)
        .values({
          key: 'kommo_config',
          value: JSON.stringify(kommoConfig),
          description: 'Configuração completa do Kommo (pipeline, status, tag, campos)'
        })
      console.log('✓ Configuração criada')
    }

    return res.status(200).json({
      success: true,
      message: 'Configurações do Kommo salvas com sucesso'
    })

  } catch (error: any) {
    console.error('Erro ao salvar configurações:', error)
    return res.status(500).json({
      error: error.message
    })
  }
}
