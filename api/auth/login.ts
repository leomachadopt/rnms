import type { VercelRequest, VercelResponse } from '@vercel/node'
import { db } from '../db/client.js'
import { users } from '../db/schema.js'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this'

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  try {
    console.log('=== LOGIN ATTEMPT ===')
    const { email, password } = req.body
    console.log('Email recebido:', email)

    if (!email || !password) {
      console.log('Email ou password não fornecidos')
      return res.status(400).json({ error: 'Email e password são obrigatórios' })
    }

    console.log('Conectando ao banco de dados...')
    const database = db()

    console.log('Buscando usuário:', email.toLowerCase())
    const [user] = await database
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1)

    if (!user) {
      console.log('Usuário não encontrado')
      return res.status(401).json({ error: 'Credenciais inválidas' })
    }

    console.log('Usuário encontrado:', user.email, 'Role:', user.role, 'Active:', user.active)

    if (user.active === 0) {
      console.log('Usuário desativado')
      return res.status(401).json({ error: 'Usuário desativado' })
    }

    console.log('Verificando senha...')
    const isValidPassword = await bcrypt.compare(password, user.password)
    console.log('Senha válida:', isValidPassword)

    if (!isValidPassword) {
      console.log('Senha inválida')
      return res.status(401).json({ error: 'Credenciais inválidas' })
    }

    console.log('Login bem-sucedido!')

    // Atualizar last login
    await database
      .update(users)
      .set({ lastLogin: new Date() })
      .where(eq(users.id, user.id))

    // Gerar JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      },
      JWT_SECRET,
      { expiresIn: '7d' }
    )

    return res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    })

  } catch (error: any) {
    console.error('Erro no login:', error)
    return res.status(500).json({ error: 'Erro ao fazer login' })
  }
}
