import { drizzle } from 'drizzle-orm/neon-http'
import { neon } from '@neondatabase/serverless'
import { sql } from 'drizzle-orm'

const DATABASE_URL = process.env.DATABASE_URL || process.env.VITE_DATABASE_URL

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL não definida')
  process.exit(1)
}

const client = neon(DATABASE_URL)
const db = drizzle(client)

async function migrateApplicationsTable() {
  try {
    console.log('🔄 Migrando tabela applications para nova estrutura...')

    // Drop tabela antiga (se existir)
    await db.execute(sql`DROP TABLE IF EXISTS applications CASCADE`)

    console.log('✅ Tabela antiga removida')

    // Criar nova tabela com estrutura atualizada
    await db.execute(sql`
      CREATE TABLE applications (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255),
        whatsapp VARCHAR(50),
        ortho_count VARCHAR(50) NOT NULL,
        active_cases VARCHAR(50) NOT NULL,
        monthly_revenue VARCHAR(100) NOT NULL,
        goal_12m VARCHAR(255) NOT NULL,
        ready_to_invest VARCHAR(100) NOT NULL,
        metadata JSONB,
        session_id VARCHAR(255),
        source VARCHAR(100),
        ip_address VARCHAR(45),
        user_agent TEXT,
        status VARCHAR(50) DEFAULT 'submitted',
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `)

    console.log('✅ Tabela applications criada com nova estrutura!')
    console.log('')
    console.log('Nova estrutura:')
    console.log('- ortho_count: Quantos ortodontistas')
    console.log('- active_cases: Casos ativos')
    console.log('- monthly_revenue: Faturação mensal')
    console.log('- goal_12m: Objetivo 12 meses')
    console.log('- ready_to_invest: Preparação para investir')
    console.log('- session_id: Link para agent_conversations')
    console.log('- source: Origem da aplicação')
  } catch (error: any) {
    console.error('❌ Erro ao migrar tabela applications:', error.message)
    process.exit(1)
  }
}

migrateApplicationsTable()
