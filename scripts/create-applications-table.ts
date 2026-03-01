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

async function createApplicationsTable() {
  try {
    console.log('🔄 Criando tabela applications...')

    await db.execute(sql`
      CREATE TABLE IF NOT EXISTS applications (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        whatsapp VARCHAR(50) NOT NULL,
        monthly_revenue VARCHAR(100) NOT NULL,
        ready_to_invest VARCHAR(10) NOT NULL,
        main_goal TEXT,
        biggest_challenge TEXT,
        why_now TEXT,
        metadata JSONB,
        ip_address VARCHAR(45),
        user_agent TEXT,
        status VARCHAR(50) DEFAULT 'submitted',
        created_at TIMESTAMP DEFAULT NOW() NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      )
    `)

    console.log('✅ Tabela applications criada com sucesso!')
  } catch (error: any) {
    console.error('❌ Erro ao criar tabela applications:', error.message)
    process.exit(1)
  }
}

createApplicationsTable()
