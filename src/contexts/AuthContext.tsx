import React, { createContext, useContext, useState, useEffect } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Credenciais hardcoded (em produção, isso deveria vir de um backend)
const ADMIN_EMAIL = 'leomachadopt@gmail.com'
const ADMIN_PASSWORD = 'Admin123!'

const AUTH_STORAGE_KEY = 'respira_oral_auth'

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Verificar se há sessão salva ao carregar
  useEffect(() => {
    const checkAuth = () => {
      try {
        const stored = localStorage.getItem(AUTH_STORAGE_KEY)
        if (stored) {
          const { authenticated, expiry } = JSON.parse(stored)

          // Verificar se a sessão ainda é válida (24 horas)
          if (authenticated && expiry > Date.now()) {
            setIsAuthenticated(true)
          } else {
            // Sessão expirada, limpar
            localStorage.removeItem(AUTH_STORAGE_KEY)
          }
        }
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error)
        localStorage.removeItem(AUTH_STORAGE_KEY)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simular delay de rede
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)

      // Salvar sessão no localStorage (válida por 24 horas)
      const expiry = Date.now() + 24 * 60 * 60 * 1000 // 24 horas
      localStorage.setItem(
        AUTH_STORAGE_KEY,
        JSON.stringify({ authenticated: true, expiry })
      )

      return true
    }

    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
