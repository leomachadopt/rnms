import type { VercelRequest, VercelResponse } from '@vercel/node'
import { Resend } from 'resend'

const RESEND_API_KEY = process.env.RESEND_API_KEY

if (!RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY não está definida')
}

const resend = new Resend(RESEND_API_KEY)

interface ApplicationEmailData {
  name: string
  email?: string
  whatsapp?: string
  monthlyRevenue: string
  goal12m: string
  readyToInvest: string
  applicationId: number
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
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
    const applicationData: ApplicationEmailData = req.body

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
      <h1>🎯 Nova Aplicação - DentalGrowth 360</h1>
      <div class="badge">ID: #${applicationData.applicationId}</div>
    </div>

    <div class="content">
      <div class="section">
        <h2>📋 Dados do Candidato</h2>
        <div class="info-row">
          <span class="info-label">Nome:</span>
          <span class="info-value">${applicationData.name}</span>
        </div>
        ${applicationData.email ? `
        <div class="info-row">
          <span class="info-label">Email:</span>
          <span class="info-value">${applicationData.email}</span>
        </div>
        ` : ''}
        ${applicationData.whatsapp ? `
        <div class="info-row">
          <span class="info-label">WhatsApp:</span>
          <span class="info-value">${applicationData.whatsapp}</span>
        </div>
        ` : ''}
      </div>

      <div class="section">
        <h2>💼 Informações da Clínica</h2>
        <div class="info-row">
          <span class="info-label">Faturamento Mensal:</span>
          <span class="info-value"><strong>${applicationData.monthlyRevenue}</strong></span>
        </div>
        <div class="info-row">
          <span class="info-label">Objetivo 12 meses:</span>
          <span class="info-value">${applicationData.goal12m}</span>
        </div>
      </div>

      <div class="highlight">
        <strong>Prontidão para investir:</strong><br>
        <span style="font-size: 18px; color: ${applicationData.readyToInvest === 'Sim, estou pronto' ? '#16a34a' : applicationData.readyToInvest === 'Preciso avaliar internamente' ? '#ea580c' : '#dc2626'};">
          ${applicationData.readyToInvest}
        </span>
      </div>
    </div>

    <div class="footer">
      <p>Aplicação recebida via DentalGrowth 360<br>
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
    .cta-button { display: inline-block; background: #f59e0b; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Aplicação Recebida!</h1>
      <p>DentalGrowth 360</p>
    </div>

    <div class="content">
      <div class="checkmark">✓</div>

      <p style="text-align: center; font-size: 18px; color: #1e293b;">
        Olá <strong>${applicationData.name}</strong>,
      </p>

      <p>
        Recebemos sua aplicação para o <strong>DentalGrowth 360</strong> e agradecemos seu interesse em estruturar sua clínica com previsibilidade e escala.
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
      formacao@metodorns.pt</p>
    </div>
  </div>
</body>
</html>
    `

    const emails = []

    // Enviar email para o admin
    emails.push(
      resend.emails.send({
        from: 'DentalGrowth 360 <noreply@metodorns.pt>',
        to: 'leomachadopt@gmail.com',
        subject: `🎯 Nova Aplicação - ${applicationData.name} (#${applicationData.applicationId})`,
        html: adminEmailHtml,
      })
    )

    // Enviar email de confirmação para o candidato (se tiver email)
    if (applicationData.email) {
      emails.push(
        resend.emails.send({
          from: 'Leonardo Machado - Método RNS <noreply@metodorns.pt>',
          to: applicationData.email,
          subject: '✅ Aplicação Recebida - DentalGrowth 360',
          html: candidateEmailHtml,
        })
      )
    }

    // Aguardar envio de todos os emails
    const results = await Promise.allSettled(emails)

    console.log('📧 Emails enviados:', results)

    return res.status(200).json({
      success: true,
      emailsSent: results.filter(r => r.status === 'fulfilled').length,
      emailsFailed: results.filter(r => r.status === 'rejected').length,
    })
  } catch (error: any) {
    console.error('❌ Erro ao enviar emails:', error)
    return res.status(500).json({
      error: 'Erro ao enviar emails',
      details: error.message,
    })
  }
}
