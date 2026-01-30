import type { VercelRequest, VercelResponse } from '@vercel/node'
import { db } from './db/client.js'
import { settings } from './db/schema.js'
import { eq } from 'drizzle-orm'

interface EmailData {
  name: string
  parentName?: string
  phone: string
  age: string
  report: string
  evaluationId?: number
}

async function getEmailSettings() {
  try {
    const database = db()
    const result = await database
      .select()
      .from(settings)
      .where(eq(settings.key, 'notification_email'))
      .limit(1)

    if (result.length === 0) {
      return null
    }

    return result[0].value
  } catch (error) {
    console.error('Erro ao buscar email de notificação:', error)
    return null
  }
}

async function getResendKey() {
  try {
    const database = db()
    const result = await database
      .select()
      .from(settings)
      .where(eq(settings.key, 'resend_api_key'))
      .limit(1)

    if (result.length === 0) {
      return null
    }

    return result[0].value
  } catch (error) {
    console.error('Erro ao buscar chave Resend:', error)
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
    const emailData: EmailData = req.body

    console.log('=== INICIANDO ENVIO DE EMAIL ===')
    console.log('Nome:', emailData.name)
    console.log('Email Data:', JSON.stringify(emailData, null, 2))

    // Buscar configurações
    console.log('Buscando configurações do banco...')
    const [notificationEmail, resendKey] = await Promise.all([
      getEmailSettings(),
      getResendKey(),
    ])

    console.log('Email de notificação:', notificationEmail ? 'Configurado' : 'NÃO configurado')
    console.log('Chave Resend:', resendKey ? 'Configurada' : 'NÃO configurada')

    if (!notificationEmail) {
      console.log('Email de notificação não configurado - pulando envio')
      return res.status(200).json({
        success: true,
        message: 'Email de notificação não configurado',
      })
    }

    if (!resendKey) {
      console.log('Chave Resend não configurada - pulando envio')
      return res.status(200).json({
        success: true,
        message: 'Chave Resend não configurada',
      })
    }

    // Processar múltiplos emails (separados por vírgula, ponto-e-vírgula ou espaço)
    const emailList = notificationEmail
      .split(/[,;\s]+/)
      .map(email => email.trim())
      .filter(email => email.length > 0)

    console.log('Emails de destino:', emailList)

    // Formatar o relatório para HTML
    const reportHtml = emailData.report
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>')

    // Criar HTML do email
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background-color: #1e40af; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background-color: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
    .info-box { background-color: white; padding: 15px; margin: 15px 0; border-left: 4px solid #1e40af; }
    .report { background-color: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔔 Nova Avaliação Concluída</h1>
    </div>

    <div class="content">
      <div class="info-box">
        <h3>📋 Dados do Responsável</h3>
        ${emailData.parentName ? `<p><strong>Nome do Responsável:</strong> ${emailData.parentName}</p>` : ''}
        <p><strong>Nome da Criança:</strong> ${emailData.name}</p>
        <p><strong>WhatsApp:</strong> ${emailData.phone}</p>
        <p><strong>Idade da Criança:</strong> ${emailData.age}</p>
        ${emailData.evaluationId ? `<p><strong>ID da Avaliação:</strong> #${emailData.evaluationId}</p>` : ''}
      </div>

      <div class="report">
        <h3>📄 Relatório Gerado pela IA</h3>
        <div style="color: #374151;">
          <p>${reportHtml}</p>
        </div>
      </div>

      <div class="info-box" style="background-color: #fef3c7; border-left-color: #f59e0b;">
        <p><strong>⚡ Ação Recomendada:</strong> Entre em contacto com o responsável através do WhatsApp para agendar consulta na Clínica Kids & Family.</p>
      </div>
    </div>

    <div class="footer">
      <p>Este email foi enviado automaticamente pelo sistema de avaliação Respira Oral</p>
      <p>Clínica Kids & Family - Oliveira de Azeméis</p>
    </div>
  </div>
</body>
</html>
`

    // Enviar email via Resend
    console.log('Enviando email via Resend...')
    console.log('Para:', emailList.join(', '))
    console.log('De: Respira Oral <onboarding@resend.dev>')

    const emailPayload = {
      from: 'Respira Oral <onboarding@resend.dev>', // Usar domínio verificado em produção
      to: emailList,
      subject: `🔔 Nova Avaliação - ${emailData.parentName || emailData.name}`,
      html: emailHtml,
    }

    console.log('Payload:', JSON.stringify(emailPayload, null, 2))

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify(emailPayload),
    })

    console.log('Resposta Resend - Status:', response.status)

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Erro da API Resend:', JSON.stringify(errorData, null, 2))
      throw new Error(JSON.stringify(errorData))
    }

    const result = await response.json()
    console.log('Email enviado com sucesso:', result.id)

    return res.status(200).json({
      success: true,
      message: 'Email enviado com sucesso',
      emailId: result.id,
    })
  } catch (error: any) {
    console.error('=== ERRO AO ENVIAR EMAIL ===')
    console.error('Tipo:', error?.constructor?.name)
    console.error('Mensagem:', error?.message)
    console.error('Stack:', error?.stack)

    return res.status(500).json({
      error: 'Erro ao enviar email',
      details: error?.message || 'Erro desconhecido',
      stack: error?.stack,
    })
  }
}
