import { neon } from '@neondatabase/serverless'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const DATABASE_URL = process.env.DATABASE_URL || process.env.VITE_DATABASE_URL

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL não está definida')
}

const sql = neon(DATABASE_URL)

async function addFollowUpColumns() {
  try {
    console.log('🔄 Adicionando colunas de follow-up à tabela applications...')

    // Adicionar colunas uma por uma (caso alguma já exista, ignora erro)
    await sql`ALTER TABLE applications ADD COLUMN IF NOT EXISTS calendly_event_uri VARCHAR(255)`
    console.log(`✅ Coluna calendly_event_uri adicionada`)

    await sql`ALTER TABLE applications ADD COLUMN IF NOT EXISTS scheduled_at TIMESTAMP`
    console.log(`✅ Coluna scheduled_at adicionada`)

    await sql`ALTER TABLE applications ADD COLUMN IF NOT EXISTS follow_up_sent_at TIMESTAMP`
    console.log(`✅ Coluna follow_up_sent_at adicionada`)

    await sql`ALTER TABLE applications ADD COLUMN IF NOT EXISTS follow_up_scheduled_for TIMESTAMP`
    console.log(`✅ Coluna follow_up_scheduled_for adicionada`)

    console.log('\n✅ Colunas adicionadas com sucesso!')
    console.log('\n📊 Atualizando registros existentes...')

    // Definir follow_up_scheduled_for para aplicações existentes que ainda não agendaram
    // (30 minutos após a criação)
    await sql`
      UPDATE applications
      SET follow_up_scheduled_for = created_at + INTERVAL '30 minutes'
      WHERE follow_up_scheduled_for IS NULL
        AND scheduled_at IS NULL
        AND email IS NOT NULL
        AND email != ''
    `

    console.log('✅ Registros atualizados!')
    console.log('\n🎉 Migração concluída com sucesso!')
  } catch (error: any) {
    console.error('❌ Erro na migração:', error.message)
    process.exit(1)
  }
}

addFollowUpColumns()
