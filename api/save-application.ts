import type { VercelRequest, VercelResponse } from '@vercel/node'
import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import { applications } from './db/schema.js'
import { Resend } from 'resend'

const DATABASE_URL = process.env.DATABASE_URL || process.env.VITE_DATABASE_URL
const RESEND_API_KEY = process.env.RESEND_API_KEY

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL não está definida')
}

const sql = neon(DATABASE_URL)
const db = drizzle(sql)

// Inicializar Resend apenas se a API key estiver disponível
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  )

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  try {
    const {
      name,
      email,
      whatsapp,
      monthlyRevenue,
      goal12m,
      readyToInvest,
      sessionId,
      source,
    } = req.body

    // Validação básica (apenas campos obrigatórios)
    if (!name || !monthlyRevenue || !goal12m || !readyToInvest) {
      return res.status(400).json({ error: 'Campos obrigatórios em falta' })
    }

    // Captura metadados
    const ipAddress =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0] ||
      (req.headers['x-real-ip'] as string) ||
      req.socket?.remoteAddress ||
      null

    const userAgent = req.headers['user-agent'] || null

    // Metadata adicional
    const metadata = {
      source: source || 'direct_url',
      timestamp: new Date().toISOString(),
      userAgent,
      sessionId: sessionId || null,
    }

    // Calcular quando enviar follow-up (30 minutos a partir de agora)
    const followUpScheduledFor = new Date(Date.now() + 30 * 60 * 1000) // 30 minutos

    // Salvar aplicação na base de dados
    const [newApplication] = await db
      .insert(applications)
      .values({
        name,
        email: email || null,
        whatsapp: whatsapp || null,
        orthoCount: null, // Removido do formulário (já perguntado no chat de elegibilidade)
        activeCases: null, // Removido do formulário (já perguntado no chat de elegibilidade)
        monthlyRevenue,
        goal12m,
        readyToInvest,
        metadata,
        sessionId: sessionId || null,
        source: source || 'direct_url',
        ipAddress,
        userAgent,
        status: 'submitted',
        followUpScheduledFor: email ? followUpScheduledFor : null, // Só agendar se tiver email
      })
      .returning()

    console.log('✅ Aplicação salva:', newApplication.id)

    // Enviar emails (não bloqueia a resposta se falhar)
    if (resend) {
      try {
        await sendApplicationEmails({
          name,
          email: email || undefined,
          whatsapp: whatsapp || undefined,
          monthlyRevenue,
          goal12m,
          readyToInvest,
          applicationId: newApplication.id,
        })
        console.log('📧 Emails enviados com sucesso')
      } catch (emailError: any) {
        console.error('⚠️ Erro ao enviar emails (aplicação salva com sucesso):', emailError.message)
        // Não falha a requisição se emails falharem
      }
    } else {
      console.warn('⚠️ RESEND_API_KEY não configurada - emails não enviados')
    }

    return res.status(200).json({
      success: true,
      applicationId: newApplication.id,
      readyToInvest: readyToInvest, // Para frontend redirecionar condicionalmente
    })
  } catch (error: any) {
    console.error('❌ Erro ao salvar aplicação:', error)
    return res.status(500).json({
      error: 'Erro ao salvar aplicação',
      details: error.message,
    })
  }
}

// Função auxiliar para enviar emails
interface ApplicationEmailData {
  name: string
  email?: string
  whatsapp?: string
  monthlyRevenue: string
  goal12m: string
  readyToInvest: string
  applicationId: number
}

async function sendApplicationEmails(data: ApplicationEmailData) {
  if (!resend) {
    throw new Error('Resend não está inicializado')
  }

  // Email para o admin
  const adminEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .header h1 { margin: 0; font-size: 24px; }
    .badge { display: inline-block; background: #f59e0b; color: white; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: bold; margin-top: 10px; }
    .content { background: #f8fafc; padding: 30px; }
    .section { background: white; padding: 20px; margin-bottom: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; }
    .section h2 { margin-top: 0; color: #1e293b; font-size: 18px; }
    .info-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e2e8f0; }
    .info-row:last-child { border-bottom: none; }
    .info-label { font-weight: 600; color: #64748b; }
    .info-value { color: #1e293b; text-align: right; }
    .highlight { background: #fef3c7; padding: 15px; border-radius: 8px; margin-top: 20px; }
    .footer { text-align: center; padding: 20px; color: #64748b; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎯 Nova Aplicação - OdontoGrowth 360</h1>
      <div class="badge">ID: #${data.applicationId}</div>
    </div>

    <div class="content">
      <div class="section">
        <h2>📋 Dados do Candidato</h2>
        <div class="info-row">
          <span class="info-label">Nome:</span>
          <span class="info-value">${data.name}</span>
        </div>
        ${data.email ? `
        <div class="info-row">
          <span class="info-label">Email:</span>
          <span class="info-value">${data.email}</span>
        </div>
        ` : ''}
        ${data.whatsapp ? `
        <div class="info-row">
          <span class="info-label">WhatsApp:</span>
          <span class="info-value">${data.whatsapp}</span>
        </div>
        ` : ''}
      </div>

      <div class="section">
        <h2>💼 Informações da Clínica</h2>
        <div class="info-row">
          <span class="info-label">Faturamento Mensal:</span>
          <span class="info-value"><strong>${data.monthlyRevenue}</strong></span>
        </div>
        <div class="info-row">
          <span class="info-label">Objetivo 12 meses:</span>
          <span class="info-value">${data.goal12m}</span>
        </div>
      </div>

      <div class="highlight">
        <strong>Prontidão para investir:</strong><br>
        <span style="font-size: 18px; color: ${data.readyToInvest === 'Sim, estou pronto' ? '#16a34a' : data.readyToInvest === 'Preciso avaliar internamente' ? '#ea580c' : '#dc2626'};">
          ${data.readyToInvest}
        </span>
      </div>
    </div>

    <div class="footer">
      <p>Aplicação recebida via OdontoGrowth 360<br>
      Método RNS © 2026</p>
    </div>
  </div>
</body>
</html>
  `

  // Email de confirmação para o candidato
  const candidateEmailHtml = `
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
    .checkmark { width: 60px; height: 60px; margin: 0 auto 20px; background: #16a34a; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 30px; }
    h2 { color: #1e293b; margin-top: 30px; }
    .highlight-box { background: #fef3c7; padding: 20px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0; }
    .next-steps { background: #f1f5f9; padding: 20px; border-radius: 8px; margin-top: 20px; }
    .step { padding: 10px 0; }
    .step-number { display: inline-block; width: 30px; height: 30px; background: #1e293b; color: white; border-radius: 50%; text-align: center; line-height: 30px; margin-right: 10px; font-weight: bold; }
    .footer { text-align: center; padding: 30px; color: #64748b; font-size: 14px; background: #f8fafc; border-radius: 0 0 8px 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Aplicação Recebida!</h1>
      <p>OdontoGrowth 360</p>
    </div>

    <div class="content">
      <div class="checkmark">✓</div>

      <p style="text-align: center; font-size: 18px; color: #1e293b;">
        Olá <strong>${data.name}</strong>,
      </p>

      <p>
        Recebemos sua aplicação para o <strong>OdontoGrowth 360</strong> e agradecemos seu interesse em estruturar sua clínica com previsibilidade e escala.
      </p>

      <div class="highlight-box">
        <strong>⏱️ Próximos Passos:</strong><br>
        Nossa equipe analisará sua aplicação nas próximas 24-48 horas.
      </div>

      <h2>📋 O que vai acontecer agora?</h2>

      <div class="next-steps">
        <div class="step">
          <span class="step-number">1</span>
          <strong>Análise da aplicação</strong> - Avaliaremos se o perfil da sua clínica está alinhado com o programa
        </div>
        <div class="step">
          <span class="step-number">2</span>
          <strong>Retorno por email/WhatsApp</strong> - Entraremos em contato para confirmar elegibilidade
        </div>
        <div class="step">
          <span class="step-number">3</span>
          <strong>Entrevista Estratégica</strong> - Se aprovado, agendaremos uma conversa para alinhar expectativas
        </div>
      </div>

      <p style="margin-top: 30px;">
        <strong>Importante:</strong> Este é um processo seletivo. Trabalhamos com um número limitado de clínicas para garantir acompanhamento de qualidade.
      </p>

      <p style="margin-top: 20px; color: #64748b; font-size: 14px;">
        Se tiver dúvidas, responda a este email ou entre em contato via WhatsApp.
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

  const emails = []

  // Enviar email para o admin
  emails.push(
    resend.emails.send({
      from: 'OdontoGrowth 360 <noreply@metodorns.com>',
      to: 'leomachadopt@gmail.com',
      subject: `🎯 Nova Aplicação - ${data.name} (#${data.applicationId})`,
      html: adminEmailHtml,
    })
  )

  // Enviar email de confirmação para o candidato (se tiver email)
  if (data.email) {
    emails.push(
      resend.emails.send({
        from: 'Leonardo Machado - Método RNS <noreply@metodorns.com>',
        to: data.email,
        subject: '✅ Aplicação Recebida - OdontoGrowth 360',
        html: candidateEmailHtml,
      })
    )
  }

  // Aguardar envio de todos os emails
  await Promise.all(emails)
}
