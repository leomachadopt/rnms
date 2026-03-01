import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL!)

async function createConversationsTable() {
  try {
    console.log('Criando tabela agent_conversations...')

    await sql`
      CREATE TABLE IF NOT EXISTS agent_conversations (
        id SERIAL PRIMARY KEY,
        session_id VARCHAR(255) NOT NULL UNIQUE,
        chat_type VARCHAR(50) NOT NULL,
        user_email VARCHAR(255),
        user_name VARCHAR(255),
        user_fingerprint VARCHAR(255),
        ip_address VARCHAR(45),
        user_agent TEXT,
        messages JSONB NOT NULL,
        metadata JSONB,
        status VARCHAR(50) DEFAULT 'active',
        started_at TIMESTAMP DEFAULT NOW() NOT NULL,
        last_message_at TIMESTAMP DEFAULT NOW() NOT NULL,
        completed_at TIMESTAMP
      )
    `

    console.log('✅ Tabela agent_conversations criada com sucesso!')
  } catch (error) {
    console.error('Erro ao criar tabela:', error)
    process.exit(1)
  }
}

createConversationsTable()
