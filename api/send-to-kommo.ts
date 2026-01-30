import type { VercelRequest, VercelResponse } from '@vercel/node'
import { db } from './db/client.js'
import { settings } from './db/schema.js'
import { eq } from 'drizzle-orm'

interface EvaluationData {
  name: string // Nome da criança
  parentName?: string // Nome do responsável
  phone: string
  age: string
  breathingSigns?: string[]
  dentalIssues?: string[]
  oralHabits?: string[]
  posture?: string
  speechIssues?: string
  sleepQuality?: string
  previousTreatment?: string
  riskLevel?: string
  report?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmContent?: string
  utmTerm?: string
}

async function getKommoConfig() {
  try {
    const database = db()
    const result = await database
      .select()
      .from(settings)
      .where(eq(settings.key, 'kommo_config'))
      .limit(1)

    if (result.length === 0) {
      return null
    }

    return JSON.parse(result[0].value)
  } catch (error) {
    console.error('Erro ao buscar configuração do Kommo:', error)
    return null
  }
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Content-Type', 'application/json')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  try {
    const evaluationData: EvaluationData = req.body

    console.log('=== ENVIANDO LEAD PARA KOMMO ===')
    console.log('Dados:', JSON.stringify(evaluationData, null, 2))

    // Buscar configuração
    const config = await getKommoConfig()

    if (!config) {
      console.log('Configuração do Kommo não encontrada - pulando envio')
      return res.status(200).json({
        success: true,
        message: 'Configuração do Kommo não encontrada',
        skipped: true
      })
    }

    console.log('Configuração encontrada:', {
      domain: config.domain,
      pipeline_id: config.pipeline_id,
      status_id: config.status_id
    })

    // PASSO 1: Criar ou buscar contato primeiro
    console.log('Criando contato...')
    const contactData = [
      {
        name: evaluationData.parentName || evaluationData.name,
        custom_fields_values: [
          {
            field_code: 'PHONE',
            values: [
              {
                value: evaluationData.phone,
                enum_code: 'WORK'
              }
            ]
          }
        ]
      }
    ]

    const contactResponse = await fetch(`https://${config.domain}/api/v4/contacts`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contactData)
    })

    if (!contactResponse.ok) {
      const contactError = await contactResponse.json()
      console.error('Erro ao criar contato:', JSON.stringify(contactError, null, 2))
      throw new Error(`Erro ao criar contato: ${JSON.stringify(contactError)}`)
    }

    const contactResult = await contactResponse.json()
    const contactId = contactResult._embedded.contacts[0].id
    console.log('Contato criado com ID:', contactId)

    // PASSO 2: Preparar dados do lead
    const leadData: any = {
      name: evaluationData.name, // Nome da criança
      pipeline_id: config.pipeline_id,
      status_id: config.status_id,
      price: 0,
      _embedded: {
        tags: [
          {
            id: config.tag_id
          }
        ],
        contacts: [
          {
            id: contactId
          }
        ]
      },
      custom_fields_values: []
    }

    // Adicionar campos customizados
    if (evaluationData.parentName) {
      leadData.custom_fields_values.push({
        field_id: config.fields.parent_name,
        values: [{ value: evaluationData.parentName }]
      })
    }

    if (evaluationData.age) {
      leadData.custom_fields_values.push({
        field_id: config.fields.child_age,
        values: [{ value: evaluationData.age }]
      })
    }

    if (evaluationData.riskLevel) {
      leadData.custom_fields_values.push({
        field_id: config.fields.risk_level,
        values: [{ value: evaluationData.riskLevel }]
      })
    }

    if (evaluationData.breathingSigns && evaluationData.breathingSigns.length > 0) {
      leadData.custom_fields_values.push({
        field_id: config.fields.breathing_signs,
        values: [{ value: evaluationData.breathingSigns.join(', ') }]
      })
    }

    if (evaluationData.dentalIssues && evaluationData.dentalIssues.length > 0) {
      leadData.custom_fields_values.push({
        field_id: config.fields.dental_issues,
        values: [{ value: evaluationData.dentalIssues.join(', ') }]
      })
    }

    if (evaluationData.oralHabits && evaluationData.oralHabits.length > 0) {
      leadData.custom_fields_values.push({
        field_id: config.fields.oral_habits,
        values: [{ value: evaluationData.oralHabits.join(', ') }]
      })
    }

    if (evaluationData.posture) {
      leadData.custom_fields_values.push({
        field_id: config.fields.posture,
        values: [{ value: evaluationData.posture }]
      })
    }

    if (evaluationData.speechIssues) {
      leadData.custom_fields_values.push({
        field_id: config.fields.speech_issues,
        values: [{ value: evaluationData.speechIssues }]
      })
    }

    if (evaluationData.sleepQuality) {
      leadData.custom_fields_values.push({
        field_id: config.fields.sleep_quality,
        values: [{ value: evaluationData.sleepQuality }]
      })
    }

    if (evaluationData.previousTreatment) {
      leadData.custom_fields_values.push({
        field_id: config.fields.previous_treatment,
        values: [{ value: evaluationData.previousTreatment }]
      })
    }

    console.log('Payload do lead:', JSON.stringify(leadData, null, 2))

    // Enviar para Kommo
    const response = await fetch(`https://${config.domain}/api/v4/leads`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${config.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify([leadData])
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Erro do Kommo:', JSON.stringify(errorData, null, 2))
      throw new Error(JSON.stringify(errorData))
    }

    const result = await response.json()
    console.log('Lead criado com sucesso:', result._embedded.leads[0].id)

    const leadId = result._embedded.leads[0].id

    // Adicionar nota com relatório e dados UTM
    if (evaluationData.report || evaluationData.utmSource) {
      let noteText = ''

      if (evaluationData.report) {
        // Converter markdown para texto simples para melhor compatibilidade
        const reportText = evaluationData.report
          .replace(/#{1,6}\s/g, '') // Remove markdown headers
          .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
          .replace(/\*(.*?)\*/g, '$1') // Remove italic

        noteText += `📄 RELATÓRIO DETALHADO\n\n${reportText}\n\n`
      }

      if (evaluationData.utmSource) {
        noteText += `📊 ORIGEM DO LEAD\n`
        noteText += `• Fonte: ${evaluationData.utmSource || '-'}\n`
        noteText += `• Meio: ${evaluationData.utmMedium || '-'}\n`
        noteText += `• Campanha: ${evaluationData.utmCampaign || '-'}\n`
        noteText += `• Conteúdo: ${evaluationData.utmContent || '-'}\n`
        noteText += `• Termo: ${evaluationData.utmTerm || '-'}\n`
      }

      if (noteText) {
        console.log('Tamanho da nota:', noteText.length, 'caracteres')
        console.log('Preview da nota:', noteText.substring(0, 200) + '...')

        const noteResponse = await fetch(`https://${config.domain}/api/v4/leads/${leadId}/notes`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${config.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify([
            {
              note_type: 'common',
              params: {
                text: noteText
              }
            }
          ])
        })

        if (noteResponse.ok) {
          const noteResult = await noteResponse.json()
          console.log('Nota adicionada ao lead:', noteResult._embedded.notes[0].id)
        } else {
          const noteError = await noteResponse.json()
          console.error('Erro ao adicionar nota:', JSON.stringify(noteError, null, 2))
        }
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Lead enviado para Kommo com sucesso',
      leadId: leadId
    })

  } catch (error: any) {
    console.error('=== ERRO AO ENVIAR PARA KOMMO ===')
    console.error('Mensagem:', error?.message)
    console.error('Stack:', error?.stack)

    return res.status(500).json({
      error: 'Erro ao enviar para Kommo',
      details: error?.message || 'Erro desconhecido'
    })
  }
}
