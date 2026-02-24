export interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  category: string
  image: string
  date: string
  author: string
  slug: string
  seoTitle?: string
  seoDescription?: string
  seoKeywords?: string
}


export interface Testimonial {
  id: number
  name: string
  text: string
  role: string // Ex: "Mãe do Pedro, 5 anos"
  rating: number // 1-5
  avatarGender: 'male' | 'female'
  avatarSeed: number
  customAvatar?: string
  featured: boolean // Destaque na home
}
