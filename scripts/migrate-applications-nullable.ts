import { neon } from '@neondatabase/serverless'

const DATABASE_URL = process.env.DATABASE_URL || process.env.VITE_DATABASE_URL

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL não está definida')
}

const sql = neon(DATABASE_URL)

async function migrateApplicationsNullable() {
  try {
    console.log('🔄 Alterando colunas ortho_count e active_cases para nullable...')

    // Alterar ortho_count para nullable
    await sql`
      ALTER TABLE applications
      ALTER COLUMN ortho_count DROP NOT NULL
    `
    console.log('✅ ortho_count agora é nullable')

    // Alterar active_cases para nullable
    await sql`
      ALTER TABLE applications
      ALTER COLUMN active_cases DROP NOT NULL
    `
    console.log('✅ active_cases agora é nullable')

    console.log('🎉 Migração concluída com sucesso!')
  } catch (error: any) {
    console.error('❌ Erro ao migrar:', error)
    throw error
  }
}

migrateApplicationsNullable()
