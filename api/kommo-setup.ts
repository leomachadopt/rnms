import type { VercelRequest, VercelResponse } from '@vercel/node'

// Script temporário para descobrir IDs do Kommo
// Usar apenas uma vez para configuração inicial

const KOMMO_TOKEN = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjZkNTYzODNiNTBkYjNlYmQxNGZlMWU1YjQwOTZiNjdlZmU1NzhkNjNiNTI2N2UzYjE2NDJmNmQ3NmUxMTk1ZDc1OTg3NThkZjNjYTEwYjc3In0.eyJhdWQiOiIzZDhmYjA4Ni1iZDI0LTQxZTYtOTdjZi05NTVhNGNhYjgxNzAiLCJqdGkiOiI2ZDU2MzgzYjUwZGIzZWJkMTRmZTFlNWI0MDk2YjY3ZWZlNTc4ZDYzYjUyNjdlM2IxNjQyZjZkNzZlMTE5NWQ3NTk4NzU4ZGYzY2ExMGI3NyIsImlhdCI6MTc2OTc3NjUwOCwibmJmIjoxNzY5Nzc2NTA4LCJleHAiOjE3OTg3NjE2MDAsInN1YiI6IjExMzMxOTM5IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMyOTUzMDkxLCJiYXNlX2RvbWFpbiI6ImtvbW1vLmNvbSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiZDc0Yjg3NTMtN2Y0MC00YzQ0LTgxYzMtYzdiZWFjYTg1ZDMzIiwidXNlcl9mbGFncyI6MCwiYXBpX2RvbWFpbiI6ImFwaS1nLmtvbW1vLmNvbSJ9.JMlpi6M5SP57n_sLmkZI8E9aWjtL39GvXgiqln3h5pf3SCi8OTa1D9mYIFCStzmtG5tI_qSlCASdsOar3plrAn5QPs08hNNEEA4yOwVywBP_la89s2qOjDoMWCrYk9Az9gUZ9KYx-e8sNIWmhD3Bt4fbGt0GXy-PJ2loF6JI5Lr7-zNdoeJ1PlY3CjeMJEBl3t38EW2NUaGzqOcqZRSlkQvPrKZHCmA7hrUTs0lJkJa93TgtSD_X6VDUt-HrSiK4DoHXhytK0DXEmnOHURJLLIiYqhZ1si355ju4mMUaWpDjwYXJ6WmPfRgNuXgf9SPHBJ7mu_v-Mq1S91H7RixYKg'
const KOMMO_DOMAIN = 'clinicadentariavitoria.kommo.com'

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  try {
    console.log('=== DESCOBRINDO IDS DO KOMMO ===')

    // 1. Buscar pipelines
    console.log('\n1. Buscando pipelines...')
    const pipelinesRes = await fetch(`https://${KOMMO_DOMAIN}/api/v4/leads/pipelines`, {
      headers: {
        'Authorization': `Bearer ${KOMMO_TOKEN}`,
        'Content-Type': 'application/json'
      }
    })

    if (!pipelinesRes.ok) {
      const error = await pipelinesRes.text()
      throw new Error(`Erro ao buscar pipelines: ${error}`)
    }

    const pipelinesData = await pipelinesRes.json()
    console.log('Pipelines encontrados:', JSON.stringify(pipelinesData, null, 2))

    // Encontrar pipeline "Campanha Angel - Respirador oral"
    const targetPipeline = Object.values(pipelinesData._embedded.pipelines).find((p: any) =>
      p.id === 12346588
    )

    if (!targetPipeline) {
      throw new Error('Pipeline ID 12346588 não encontrado')
    }

    console.log('\nPipeline encontrado:', targetPipeline.name)
    console.log('Statuses:', JSON.stringify(targetPipeline._embedded.statuses, null, 2))

    // Encontrar status "Contato inicial"
    const contactoStatus = Object.values(targetPipeline._embedded.statuses).find((s: any) =>
      s.name.toLowerCase().includes('contato') || s.name.toLowerCase().includes('inicial')
    )

    // 2. Buscar tags
    console.log('\n2. Buscando tags...')
    const tagsRes = await fetch(`https://${KOMMO_DOMAIN}/api/v4/leads/tags`, {
      headers: {
        'Authorization': `Bearer ${KOMMO_TOKEN}`,
        'Content-Type': 'application/json'
      }
    })

    if (!tagsRes.ok) {
      const error = await tagsRes.text()
      throw new Error(`Erro ao buscar tags: ${error}`)
    }

    const tagsData = await tagsRes.json()
    console.log('Tags encontradas:', JSON.stringify(tagsData, null, 2))

    // Encontrar tag "Campanha RO - Questionário"
    const targetTag = tagsData._embedded?.tags?.find((t: any) =>
      t.name.toLowerCase().includes('campanha ro') || t.name.toLowerCase().includes('questionário')
    )

    // 3. Buscar campos customizados de leads
    console.log('\n3. Buscando campos customizados...')
    const fieldsRes = await fetch(`https://${KOMMO_DOMAIN}/api/v4/leads/custom_fields`, {
      headers: {
        'Authorization': `Bearer ${KOMMO_TOKEN}`,
        'Content-Type': 'application/json'
      }
    })

    if (!fieldsRes.ok) {
      const error = await fieldsRes.text()
      throw new Error(`Erro ao buscar campos: ${error}`)
    }

    const fieldsData = await fieldsRes.json()
    console.log('Campos customizados:', JSON.stringify(fieldsData, null, 2))

    // Resultado final
    const result = {
      pipeline: {
        id: targetPipeline.id,
        name: targetPipeline.name
      },
      status: contactoStatus ? {
        id: contactoStatus.id,
        name: contactoStatus.name
      } : null,
      tag: targetTag ? {
        id: targetTag.id,
        name: targetTag.name
      } : null,
      customFields: fieldsData._embedded?.custom_fields || []
    }

    console.log('\n=== RESULTADO ===')
    console.log(JSON.stringify(result, null, 2))

    return res.status(200).json(result)

  } catch (error: any) {
    console.error('Erro:', error.message)
    return res.status(500).json({
      error: error.message,
      stack: error.stack
    })
  }
}
