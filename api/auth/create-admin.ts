import type { VercelRequest, VercelResponse } from '@vercel/node'
import { db } from '../db/client.js'
import { users } from '../db/schema.js'
import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'

/**
 * Endpoint para criar usuário administrador inicial
 * IMPORTANTE: Este endpoint deve ser desativado após criar o admin
 * ou protegido com uma chave secreta
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  // Proteção básica: chave secreta na requisição
  const secretKey = req.headers['x-admin-secret']
  const expectedSecret = process.env.ADMIN_CREATION_SECRET || 'create-admin-rns-2024'

  if (secretKey !== expectedSecret) {
    return res.status(403).json({ error: 'Acesso negado' })
  }

  const database = db()

  const email = 'leomachadopt@gmail.com'
  const password = 'Admin123!'
  const name = 'Leonardo Machado'
  const role = 'super_admin'

  try {
    // Verificar se usuário já existe
    const [existing] = await database
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1)

    if (existing) {
      // Atualizar senha do usuário existente
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

      return res.status(200).json({
        message: 'Usuário atualizado com sucesso',
        user: {
          email,
          name,
          role
        },
        action: 'updated'
      })
    } else {
      // Criar novo usuário
      const hashedPassword = await bcrypt.hash(password, 10)

      const [newUser] = await database
        .insert(users)
        .values({
          email,
          password: hashedPassword,
          name,
          role,
          active: 1
        })
        .returning({
          id: users.id,
          email: users.email,
          name: users.name,
          role: users.role
        })

      return res.status(201).json({
        message: 'Usuário criado com sucesso',
        user: newUser,
        action: 'created'
      })
    }
  } catch (error: any) {
    console.error('Erro ao criar admin:', error)
    return res.status(500).json({
      error: 'Erro ao criar usuário administrador',
      details: error.message
    })
  }
}
