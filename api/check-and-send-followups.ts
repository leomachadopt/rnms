import type { VercelRequest, VercelResponse } from '@vercel/node'
import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import { applications } from './db/schema.js'
import { and, isNull, lte, isNotNull } from 'drizzle-orm'
import { Resend } from 'resend'
import { eq } from 'drizzle-orm'

const DATABASE_URL = process.env.DATABASE_URL || process.env.VITE_DATABASE_URL
const RESEND_API_KEY = process.env.RESEND_API_KEY
const CALENDLY_API_KEY = process.env.CALENDLY_API_KEY
const CALENDLY_URL = process.env.VITE_CALENDLY_URL || 'https://calendly.com/leomachadopt/programa-rns'

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL não está definida')
}

const sql = neon(DATABASE_URL)
const db = drizzle(sql)
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Este endpoint pode ser chamado por um cron job ou manualmente
  // Verificar autenticação básica para evitar chamadas não autorizadas
  const authHeader = req.headers.authorization
  const expectedAuth = `Bearer ${process.env.CRON_SECRET || 'default-secret'}`

  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  // Permitir chamadas sem auth em desenvolvimento
  if (process.env.NODE_ENV === 'production' && authHeader !== expectedAuth) {
    return res.status(401).json({ error: 'Não autorizado' })
  }

  try {
    console.log('🔍 Verificando aplicações que precisam de follow-up...')

    const now = new Date()

    // Buscar aplicações que:
    // 1. Têm email
    // 2. Ainda não agendaram (scheduledAt = null)
    // 3. Follow-up está agendado para agora ou antes
    // 4. Follow-up ainda não foi enviado
    const pendingFollowUps = await db
      .select()
      .from(applications)
      .where(
        and(
          isNotNull(applications.email),
          isNull(applications.scheduledAt),
          isNotNull(applications.followUpScheduledFor),
          lte(applications.followUpScheduledFor, now),
          isNull(applications.followUpSentAt)
        )
      )

    console.log(`📊 Encontradas ${pendingFollowUps.length} aplicações para follow-up`)

    const results = []

    for (const application of pendingFollowUps) {
      try {
        // Verificar no Calendly se agendou (dupla verificação)
        const hasScheduled = await checkCalendlyScheduling(application.email!)

        if (hasScheduled) {
          // Já agendou! Atualizar no banco
          await db
            .update(applications)
            .set({
              scheduledAt: new Date(),
              status: 'interview_scheduled',
              updatedAt: new Date(),
            })
            .where(eq(applications.id, application.id))

          console.log(`✅ Aplicação #${application.id} - já agendou (detectado via API)`)
          results.push({
            applicationId: application.id,
            action: 'already_scheduled',
            email: application.email,
          })
          continue
        }

        // Não agendou - enviar email de follow-up
        if (resend) {
          await sendFollowUpEmail(application)

          // Marcar como enviado
          await db
            .update(applications)
            .set({
              followUpSentAt: new Date(),
              updatedAt: new Date(),
            })
            .where(eq(applications.id, application.id))

          console.log(`📧 Follow-up enviado para ${application.email} (Aplicação #${application.id})`)
          results.push({
            applicationId: application.id,
            action: 'followup_sent',
            email: application.email,
          })
        } else {
          console.warn(`⚠️ Resend não configurado - skip aplicação #${application.id}`)
          results.push({
            applicationId: application.id,
            action: 'skipped_no_resend',
            email: application.email,
          })
        }
      } catch (error: any) {
        console.error(`❌ Erro ao processar aplicação #${application.id}:`, error.message)
        results.push({
          applicationId: application.id,
          action: 'error',
          error: error.message,
        })
      }
    }

    return res.status(200).json({
      success: true,
      processed: pendingFollowUps.length,
      results,
    })
  } catch (error: any) {
    console.error('❌ Erro ao processar follow-ups:', error)
    return res.status(500).json({
      error: 'Erro ao processar follow-ups',
      details: error.message,
    })
  }
}

// Verificar se o usuário agendou no Calendly via API
async function checkCalendlyScheduling(email: string): Promise<boolean> {
  if (!CALENDLY_API_KEY) {
    return false
  }

  try {
    // Buscar eventos agendados para este email nos últimos 7 dias
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const response = await fetch(
      `https://api.calendly.com/scheduled_events?invitee_email=${encodeURIComponent(email)}&min_start_time=${sevenDaysAgo.toISOString()}`,
      {
        headers: {
          Authorization: `Bearer ${CALENDLY_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      console.warn(`⚠️ Erro ao verificar Calendly para ${email}: ${response.status}`)
      return false
    }

    const data = await response.json()
    return data.collection && data.collection.length > 0
  } catch (error: any) {
    console.error(`❌ Erro na API do Calendly:`, error.message)
    return false
  }
}

// Enviar email de follow-up
async function sendFollowUpEmail(application: any) {
  if (!resend) {
    throw new Error('Resend não está inicializado')
  }

  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); color: white; padding: 40px 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .header h1 { margin: 0; font-size: 28px; }
    .header p { margin: 10px 0 0 0; opacity: 0.9; }
    .content { background: white; padding: 40px 30px; }
    .icon { width: 60px; height: 60px; margin: 0 auto 20px; background: #f59e0b; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 30px; }
    h2 { color: #1e293b; margin-top: 30px; }
    .highlight-box { background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0; }
    .cta-button { display: inline-block; background: #f59e0b; color: white; padding: 18px 40px; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 20px; font-size: 16px; transition: all 0.3s; }
    .cta-button:hover { background: #d97706; transform: scale(1.05); }
    .steps { background: #f1f5f9; padding: 20px; border-radius: 8px; margin-top: 20px; }
    .step { padding: 15px; margin: 10px 0; background: white; border-radius: 6px; border-left: 3px solid #f59e0b; }
    .footer { text-align: center; padding: 30px; color: #64748b; font-size: 14px; background: #f8fafc; border-radius: 0 0 8px 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Próximo Passo: Agendar Entrevista</h1>
      <p>DentalGrowth 360</p>
    </div>

    <div class="content">
      <div class="icon">📅</div>

      <p style="text-align: center; font-size: 18px; color: #1e293b;">
        Olá <strong>${application.name}</strong>,
      </p>

      <p>
        Recebemos sua aplicação para o <strong>DentalGrowth 360</strong> há alguns minutos e estamos prontos para o próximo passo!
      </p>

      <div class="highlight-box">
        <strong>⏱️ Falta apenas 1 passo:</strong><br>
        Agende sua <strong>Entrevista Estratégica</strong> para avaliarmos se sua clínica está alinhada com o programa.
      </div>

      <h2>📋 O que acontece na entrevista?</h2>

      <div class="steps">
        <div class="step">
          <strong>1. Análise do perfil da clínica</strong><br>
          Validamos faturamento, estrutura e objetivos
        </div>
        <div class="step">
          <strong>2. Alinhamento de expectativas</strong><br>
          Explicamos em detalhe como funciona o programa
        </div>
        <div class="step">
          <strong>3. Definição de próximos passos</strong><br>
          Se aprovado, você recebe acesso imediato
        </div>
      </div>

      <div style="text-align: center; margin: 40px 0;">
        <a href="${CALENDLY_URL}" class="cta-button">
          📅 Agendar Minha Entrevista Agora
        </a>
      </div>

      <p style="margin-top: 30px; font-size: 14px; color: #64748b;">
        <strong>Importante:</strong> As vagas são limitadas. Recomendamos agendar o quanto antes para garantir sua posição.
      </p>
    </div>

    <div class="footer">
      <p><strong>Método RNS</strong><br>
      Reequilíbrio Neuromuscular Sistêmico<br>
      formacao@metodorns.com</p>
    </div>
  </div>
</body>
</html>
  `

  await resend.emails.send({
    from: 'Leonardo Machado - Método RNS <noreply@metodorns.com>',
    to: application.email,
    subject: '📅 Falta apenas 1 passo - Agendar sua Entrevista',
    html: emailHtml,
  })
}
