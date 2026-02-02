import type { VercelRequest, VercelResponse } from '@vercel/node'
import { db } from '../db/client.js'
import { users } from '../db/schema.js'
import { eq } from 'drizzle-orm'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-this'

// Middleware para verificar autenticação e permissões
function verifyToken(req: VercelRequest): { id: number; email: string; name: string; role: string } | null {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.substring(7)

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any
    return decoded
  } catch (error) {
    return null
  }
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Verificar autenticação
  const currentUser = verifyToken(req)
  if (!currentUser) {
    return res.status(401).json({ error: 'Não autenticado' })
  }

  const database = db()

  try {
    // GET - Listar usuários
    if (req.method === 'GET') {
      const allUsers = await database
        .select({
          id: users.id,
          email: users.email,
          name: users.name,
          role: users.role,
          active: users.active,
          lastLogin: users.lastLogin,
          createdAt: users.createdAt
        })
        .from(users)
        .orderBy(users.createdAt)

      return res.status(200).json(allUsers)
    }

    // POST - Criar novo usuário (apenas super_admin)
    if (req.method === 'POST') {
      if (currentUser.role !== 'super_admin') {
        return res.status(403).json({ error: 'Sem permissão para criar usuários' })
      }

      const { email, password, name, role } = req.body

      if (!email || !password || !name) {
        return res.status(400).json({ error: 'Email, password e name são obrigatórios' })
      }

      // Verificar se email já existe
      const [existing] = await database
        .select()
        .from(users)
        .where(eq(users.email, email.toLowerCase()))
        .limit(1)

      if (existing) {
        return res.status(400).json({ error: 'Email já cadastrado' })
      }

      // Hash da senha
      const hashedPassword = await bcrypt.hash(password, 10)

      // Criar usuário
      const [newUser] = await database
        .insert(users)
        .values({
          email: email.toLowerCase(),
          password: hashedPassword,
          name,
          role: role || 'editor', // Default: editor
          active: 1
        })
        .returning({
          id: users.id,
          email: users.email,
          name: users.name,
          role: users.role
        })

      return res.status(201).json(newUser)
    }

    // PUT - Atualizar usuário
    if (req.method === 'PUT') {
      const { id, name, email, password, role, active } = req.body

      if (!id) {
        return res.status(400).json({ error: 'ID é obrigatório' })
      }

      // Apenas super_admin pode editar usuários
      // Editores não têm permissão
      if (currentUser.role !== 'super_admin') {
        return res.status(403).json({ error: 'Sem permissão para editar usuários' })
      }

      const updateData: any = {}

      if (name) updateData.name = name
      if (email) updateData.email = email.toLowerCase()
      if (role) updateData.role = role
      if (typeof active !== 'undefined') updateData.active = active
      if (password) {
        updateData.password = await bcrypt.hash(password, 10)
      }

      updateData.updatedAt = new Date()

      const [updated] = await database
        .update(users)
        .set(updateData)
        .where(eq(users.id, id))
        .returning({
          id: users.id,
          email: users.email,
          name: users.name,
          role: users.role,
          active: users.active
        })

      return res.status(200).json(updated)
    }

    // DELETE - Deletar usuário (apenas super_admin)
    if (req.method === 'DELETE') {
      if (currentUser.role !== 'super_admin') {
        return res.status(403).json({ error: 'Sem permissão para deletar usuários' })
      }

      const { id } = req.query

      if (!id) {
        return res.status(400).json({ error: 'ID é obrigatório' })
      }

      // Não permitir deletar a si mesmo
      if (Number(id) === currentUser.id) {
        return res.status(400).json({ error: 'Não pode deletar seu próprio usuário' })
      }

      await database
        .delete(users)
        .where(eq(users.id, Number(id)))

      return res.status(200).json({ message: 'Usuário deletado com sucesso' })
    }

    return res.status(405).json({ error: 'Método não permitido' })

  } catch (error: any) {
    console.error('Erro na gestão de usuários:', error)
    return res.status(500).json({ error: 'Erro ao processar requisição' })
  }
}
