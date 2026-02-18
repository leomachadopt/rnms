import React, { createContext, useContext } from 'react'
import { BlogPost, Testimonial } from '@/types'

// ---------------------------------------------------------------------------
// Static mock data — replace API calls from previous project
// ---------------------------------------------------------------------------

const STATIC_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Dra. Ana Ferreira',
    text: 'O Método RNS transformou completamente a minha prática clínica. Os resultados com os pacientes melhoraram significativamente e a minha segurança técnica aumentou muito.',
    role: 'Dentista · Porto',
    rating: 5,
    avatarGender: 'female',
    avatarSeed: 42,
    featured: true,
  },
  {
    id: 2,
    name: 'Dr. Carlos Mendes',
    text: 'A formação é extremamente prática e aplicável no dia a dia. Em poucos meses consegui resultados que nunca tinha alcançado antes na área de neuro-oclusão.',
    role: 'Médico Dentista · Lisboa',
    rating: 5,
    avatarGender: 'male',
    avatarSeed: 17,
    featured: true,
  },
  {
    id: 3,
    name: 'Dra. Sofia Costa',
    text: 'A mentoria do Dr. Leonardo Machado é única. O acompanhamento personalizado e o rigor científico fazem toda a diferença. Recomendo a todos os colegas.',
    role: 'Ortodontista · Braga',
    rating: 5,
    avatarGender: 'female',
    avatarSeed: 83,
    featured: true,
  },
]

const STATIC_BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'A Relação entre Postura e Oclusão Dentária',
    excerpt: 'Descubra como a postura corporal influencia directamente o equilíbrio oclusal e como abordar esta relação na prática clínica diária.',
    content: '',
    category: 'Clínica',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
    date: '2024-11-15',
    author: 'Dr. Leonardo Machado',
    slug: 'relacao-postura-oclusao-dentaria',
    seoTitle: 'Postura e Oclusão Dentária — Método RNS',
    seoDescription: 'Como a postura corporal influencia o equilíbrio oclusal na prática clínica.',
  },
  {
    id: 2,
    title: 'Neuro-oclusão: O Futuro da Odontologia Funcional',
    excerpt: 'A neuro-oclusão representa uma abordagem integrativa que considera o sistema nervoso como eixo central do equilíbrio estomatognático.',
    content: '',
    category: 'Formação',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    date: '2024-10-28',
    author: 'Dr. Leonardo Machado',
    slug: 'neuro-oclusao-futuro-odontologia-funcional',
    seoTitle: 'Neuro-oclusão e Odontologia Funcional — Método RNS',
    seoDescription: 'Compreenda os fundamentos da neuro-oclusão e a sua importância na odontologia moderna.',
  },
  {
    id: 3,
    title: 'Como Estruturar uma Clínica de Alta Performance',
    excerpt: 'Gestão, cultura de equipa e posicionamento premium: os pilares para transformar a sua clínica num negócio de alta performance.',
    content: '',
    category: 'Gestão',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
    date: '2024-10-10',
    author: 'Dr. Leonardo Machado',
    slug: 'estruturar-clinica-alta-performance',
    seoTitle: 'Clínica de Alta Performance — Método RNS',
    seoDescription: 'Estratégias de gestão e posicionamento para transformar a sua clínica.',
  },
]

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface AppContextType {
  blogPosts: BlogPost[]
  testimonials: Testimonial[]
  isLoading: boolean
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const AppStoreProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <AppContext.Provider
      value={{
        blogPosts: STATIC_BLOG_POSTS,
        testimonials: STATIC_TESTIMONIALS,
        isLoading: false,
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
