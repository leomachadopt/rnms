import { db } from '../api/db/client.js'
import { users } from '../api/db/schema.js'
import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'

async function createAdmin() {
  const database = db()

  const email = 'leomachadopt@gmail.com'
  const password = 'Admin123!'
  const name = 'Leonardo Machado'
  const role = 'super_admin'

  console.log('🔐 Criando usuário administrador...')
  console.log(`📧 Email: ${email}`)
  console.log(`👤 Nome: ${name}`)
  console.log(`🔑 Role: ${role}`)

  try {
    // Verificar se usuário já existe
    const [existing] = await database
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    if (existing) {
      console.log('\n⚠️  Usuário já existe! Atualizando senha...')

      const hashedPassword = await bcrypt.hash(password, 10)

      await database
        .update(users)
        .set({
          password: hashedPassword,
          name,
          role,
          updatedAt: new Date()
        })
        .where(eq(users.email, email))

      console.log('✅ Senha atualizada com sucesso!')
    } else {
      console.log('\n➕ Criando novo usuário...')

      const hashedPassword = await bcrypt.hash(password, 10)

      await database
        .insert(users)
        .values({
          email,
          password: hashedPassword,
          name,
          role,
          active: 1
        })

      console.log('✅ Usuário criado com sucesso!')
    }

    console.log('\n📋 Credenciais de acesso:')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log(`Email:    ${email}`)
    console.log(`Senha:    ${password}`)
    console.log(`Role:     ${role}`)
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    console.log('\n🚀 Pode fazer login em /login')

  } catch (error) {
    console.error('❌ Erro ao criar usuário:', error)
    throw error
  }
}

createAdmin()
  .then(() => {
    console.log('\n✨ Script executado com sucesso!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Erro fatal:', error)
    process.exit(1)
  })
