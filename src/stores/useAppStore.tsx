import React, { createContext, useContext, useEffect, useState } from 'react'
import { BlogPost, Testimonial } from '@/types'

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface AppContextType {
  specialists: any[]
  blogPosts: BlogPost[]
  testimonials: Testimonial[]
  evaluations: any[]
  isLoading: boolean
  refreshBlogPosts: () => Promise<void>
  refreshTestimonials: () => Promise<void>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppStoreProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const refreshBlogPosts = async () => {
    try {
      const response = await fetch('/api/blog-posts')
      if (response.ok) {
        const data = await response.json()
        setBlogPosts(data)
      }
    } catch (error) {
      console.error('Erro ao carregar blog posts:', error)
    }
  }

  const refreshTestimonials = async () => {
    try {
      const response = await fetch('/api/testimonials')
      if (response.ok) {
        const data = await response.json()
        setTestimonials(data)
      }
    } catch (error) {
      console.error('Erro ao carregar testimonials:', error)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      await Promise.all([refreshBlogPosts(), refreshTestimonials()])
      setIsLoading(false)
    }
    loadData()
  }, [])

  return (
    <AppContext.Provider
      value={{
        specialists: [],
        blogPosts,
        testimonials,
        evaluations: [],
        isLoading,
        refreshBlogPosts,
        refreshTestimonials,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppStore = () => {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppStore must be used within AppStoreProvider')
  }
  return context
}

export default useAppStore
