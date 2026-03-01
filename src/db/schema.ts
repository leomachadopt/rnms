import { pgTable, serial, text, varchar, timestamp, integer, jsonb } from 'drizzle-orm/pg-core'

// Tabela de Posts do Blog
export const blogPosts = pgTable('blog_posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  excerpt: text('excerpt').notNull(),
  content: text('content').notNull(),
  category: varchar('category', { length: 50 }).notNull(),
  image: varchar('image', { length: 255 }).notNull(),
  date: varchar('date', { length: 50 }).notNull(),
  author: varchar('author', { length: 100 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  seoTitle: varchar('seo_title', { length: 255 }),
  seoDescription: text('seo_description'),
  seoKeywords: varchar('seo_keywords', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Tabela de Depoimentos
export const testimonials = pgTable('testimonials', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  text: text('text').notNull(),
  role: varchar('role', { length: 255 }).notNull(), // Ex: "Mãe do Pedro, 5 anos"
  rating: integer('rating').notNull().default(5), // 1-5 estrelas
  avatarGender: varchar('avatar_gender', { length: 10 }).default('female'), // 'male' | 'female'
  avatarSeed: integer('avatar_seed').default(0),
  customAvatar: text('custom_avatar'), // URL opcional de foto personalizada
  featured: integer('featured').default(0), // 0 = não, 1 = sim (destaque na home)
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Tabela de Configurações do Sistema
export const settings = pgTable('settings', {
  id: serial('id').primaryKey(),
  key: varchar('key', { length: 100 }).notNull().unique(), // Ex: 'ai_report_prompt', 'openai_api_key'
  value: text('value').notNull(), // Valor da configuração
  description: text('description'), // Descrição para ajudar na admin
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Tabela de Usuários do Sistema
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  password: varchar('password', { length: 255 }).notNull(), // Hash bcrypt
  name: varchar('name', { length: 255 }).notNull(),
  role: varchar('role', { length: 50 }).notNull().default('editor'), // 'super_admin' | 'editor'
  active: integer('active').default(1).notNull(), // 1 = ativo, 0 = inativo
  lastLogin: timestamp('last_login'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Tabela de Eventos de Tracking
export const trackingEvents = pgTable('tracking_events', {
  id: serial('id').primaryKey(),
  eventName: varchar('event_name', { length: 100 }).notNull(), // PageView, Lead, Contact, etc.
  eventId: varchar('event_id', { length: 255 }).unique(), // Para deduplicação
  userFingerprint: varchar('user_fingerprint', { length: 255 }), // Hash único do visitante
  fbp: varchar('fbp', { length: 255 }), // Cookie _fbp
  fbc: varchar('fbc', { length: 255 }), // Cookie _fbc
  // Parâmetros UTM
  utmSource: varchar('utm_source', { length: 100 }),
  utmMedium: varchar('utm_medium', { length: 100 }),
  utmCampaign: varchar('utm_campaign', { length: 100 }),
  utmContent: varchar('utm_content', { length: 100 }),
  utmTerm: varchar('utm_term', { length: 100 }),
  // Dados do navegador
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  referrer: text('referrer'),
  // Dados customizados do evento
  eventData: jsonb('event_data'), // Dados específicos do evento
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

export type BlogPost = typeof blogPosts.$inferSelect
export type NewBlogPost = typeof blogPosts.$inferInsert
export type Testimonial = typeof testimonials.$inferSelect
export type NewTestimonial = typeof testimonials.$inferInsert
export type Setting = typeof settings.$inferSelect
export type NewSetting = typeof settings.$inferInsert
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type TrackingEvent = typeof trackingEvents.$inferSelect
export type NewTrackingEvent = typeof trackingEvents.$inferInsert

// Tabela de Conversas com o Agente
export const agentConversations = pgTable('agent_conversations', {
  id: serial('id').primaryKey(),
  sessionId: varchar('session_id', { length: 255 }).notNull().unique(), // UUID da sessão
  chatType: varchar('chat_type', { length: 50 }).notNull(), // 'diagnostic' | 'programa_rns'
  userEmail: varchar('user_email', { length: 255 }), // Email fornecido pelo utilizador (se disponível)
  userName: varchar('user_name', { length: 255 }), // Nome fornecido pelo utilizador (se disponível)
  // Informações do utilizador
  userFingerprint: varchar('user_fingerprint', { length: 255 }), // Hash único do visitante
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  // Dados da conversa
  messages: jsonb('messages').notNull(), // Array de mensagens [{role, content, timestamp}]
  metadata: jsonb('metadata'), // Informações extraídas da conversa (perfil, dores, etc)
  status: varchar('status', { length: 50 }).default('active'), // 'active' | 'completed' | 'abandoned'
  // Timestamps
  startedAt: timestamp('started_at').defaultNow().notNull(),
  lastMessageAt: timestamp('last_message_at').defaultNow().notNull(),
  completedAt: timestamp('completed_at'),
})

export type AgentConversation = typeof agentConversations.$inferSelect
export type NewAgentConversation = typeof agentConversations.$inferInsert

// Tabela de Aplicações (Formulário Pré-Call)
export const applications = pgTable('applications', {
  id: serial('id').primaryKey(),
  // Dados do utilizador
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  whatsapp: varchar('whatsapp', { length: 50 }).notNull(),
  // Respostas do formulário
  monthlyRevenue: varchar('monthly_revenue', { length: 100 }).notNull(), // Faturamento mensal ortodôntico
  readyToInvest: varchar('ready_to_invest', { length: 10 }).notNull(), // 'Sim' | 'Não'
  mainGoal: text('main_goal'), // Objectivo principal (texto livre)
  biggestChallenge: text('biggest_challenge'), // Maior desafio (texto livre)
  whyNow: text('why_now'), // Por que agora? (texto livre)
  // Metadata
  metadata: jsonb('metadata'), // Informações adicionais (source, utm, etc)
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  // Status do processo
  status: varchar('status', { length: 50 }).default('submitted'), // 'submitted' | 'interview_scheduled' | 'approved' | 'rejected'
  // Timestamps
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

export type Application = typeof applications.$inferSelect
export type NewApplication = typeof applications.$inferInsert
