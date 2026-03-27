import type { VercelRequest, VercelResponse } from '@vercel/node'
import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import { applications } from './db/schema.js'
import { eq, and, isNull } from 'drizzle-orm'

const DATABASE_URL = process.env.DATABASE_URL || process.env.VITE_DATABASE_URL

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL não está definida')
}

const sql = neon(DATABASE_URL)
const db = drizzle(sql)

interface CalendlyWebhookPayload {
  event: string // 'invitee.created', 'invitee.canceled'
  payload: {
    event_type_uri: string
    event: {
      uri: string
      start_time: string
      end_time: string
    }
    invitee: {
      uri: string
      email: string
      name: string
      created_at: string
    }
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  try {
    const webhookData: CalendlyWebhookPayload = req.body

    console.log('📅 Calendly Webhook recebido:', webhookData.event)

    // Se for criação de evento (agendamento)
    if (webhookData.event === 'invitee.created') {
      const inviteeEmail = webhookData.payload.invitee.email.toLowerCase()
      const eventUri = webhookData.payload.event.uri
      const scheduledTime = new Date(webhookData.payload.event.start_time)

      console.log(`📧 Procurando aplicação para email: ${inviteeEmail}`)

      // Buscar aplicação pendente com este email que ainda não agendou
      const [application] = await db
        .select()
        .from(applications)
        .where(
          and(
            eq(applications.email, inviteeEmail),
            isNull(applications.scheduledAt)
          )
        )
        .orderBy(applications.createdAt)
        .limit(1)

      if (application) {
        // Atualizar aplicação com dados do agendamento
        await db
          .update(applications)
          .set({
            calendlyEventUri: eventUri,
            scheduledAt: new Date(),
            status: 'interview_scheduled',
            updatedAt: new Date(),
          })
          .where(eq(applications.id, application.id))

        console.log(`✅ Aplicação #${application.id} atualizada - agendamento confirmado`)
        console.log(`📅 Data do agendamento: ${scheduledTime.toLocaleString('pt-PT')}`)

        return res.status(200).json({
          success: true,
          message: 'Agendamento registrado',
          applicationId: application.id,
        })
      } else {
        console.log(`⚠️ Nenhuma aplicação encontrada para ${inviteeEmail}`)
        // Retorna 200 mesmo se não encontrar (Calendly espera 200)
        return res.status(200).json({
          success: true,
          message: 'Webhook recebido, mas nenhuma aplicação correspondente encontrada',
        })
      }
    }

    // Se for cancelamento
    if (webhookData.event === 'invitee.canceled') {
      const eventUri = webhookData.payload.event.uri

      // Buscar aplicação com este evento
      const [application] = await db
        .select()
        .from(applications)
        .where(eq(applications.calendlyEventUri, eventUri))
        .limit(1)

      if (application) {
        // Limpar dados do agendamento e agendar novo follow-up
        const newFollowUpTime = new Date(Date.now() + 30 * 60 * 1000)

        await db
          .update(applications)
          .set({
            calendlyEventUri: null,
            scheduledAt: null,
            status: 'submitted',
            followUpScheduledFor: newFollowUpTime,
            updatedAt: new Date(),
          })
          .where(eq(applications.id, application.id))

        console.log(`⚠️ Aplicação #${application.id} - agendamento cancelado`)
        console.log(`📧 Novo follow-up agendado para ${newFollowUpTime.toLocaleString('pt-PT')}`)

        return res.status(200).json({
          success: true,
          message: 'Cancelamento registrado',
          applicationId: application.id,
        })
      }
    }

    // Outros eventos do Calendly
    return res.status(200).json({
      success: true,
      message: 'Webhook recebido',
      event: webhookData.event,
    })
  } catch (error: any) {
    console.error('❌ Erro ao processar webhook do Calendly:', error)
    // Retorna 200 para não fazer o Calendly retentar
    return res.status(200).json({
      error: 'Erro ao processar webhook',
      details: error.message,
    })
  }
}
