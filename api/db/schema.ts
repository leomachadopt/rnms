import { pgTable, serial, text, varchar, timestamp, integer, jsonb, decimal } from 'drizzle-orm/pg-core'

// Tabela de Especialistas
export const specialists = pgTable('specialists', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  role: varchar('role', { length: 255 }).notNull(),
  region: varchar('region', { length: 50 }), // Norte, Centro, Lisboa e Vale do Tejo, Alentejo, Algarve, Açores, Madeira
  city: varchar('city', { length: 100 }).notNull(),
  address: text('address').notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  whatsapp: varchar('whatsapp', { length: 20 }),
  email: varchar('email', { length: 255 }).notNull(),
  lat: decimal('lat', { precision: 10, scale: 7 }).notNull(),
  lng: decimal('lng', { precision: 10, scale: 7 }).notNull(),
  image: varchar('image', { length: 20 }), // 'male' | 'female'
  seed: integer('seed'),
  customImage: text('custom_image'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

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

// Tabela de Avaliações (dados das consultas com a Dra. Ro)
export const evaluations = pgTable('evaluations', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  age: varchar('age', { length: 50 }),
  location: jsonb('location'), // { city: string, coords?: { lat, lng } }
  breathingSigns: jsonb('breathing_signs'), // Array de strings
  dentalIssues: jsonb('dental_issues'), // Array de strings
  oralHabits: jsonb('oral_habits'), // Array de strings
  posture: varchar('posture', { length: 100 }),
  speechIssues: varchar('speech_issues', { length: 100 }),
  sleepQuality: varchar('sleep_quality', { length: 100 }),
  previousTreatment: varchar('previous_treatment', { length: 100 }),
  riskLevel: varchar('risk_level', { length: 20 }), // baixo, moderado, alto
  analysisResult: jsonb('analysis_result'), // Resultado completo da análise IA
  recommendedSpecialistId: integer('recommended_specialist_id').references(() => specialists.id, { onDelete: 'set null' }),
  // Campos de tracking
  utmSource: varchar('utm_source', { length: 100 }),
  utmMedium: varchar('utm_medium', { length: 100 }),
  utmCampaign: varchar('utm_campaign', { length: 100 }),
  utmContent: varchar('utm_content', { length: 100 }),
  utmTerm: varchar('utm_term', { length: 100 }),
  trackingEventId: integer('tracking_event_id'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
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
  // Relação com avaliação (se aplicável)
  evaluationId: integer('evaluation_id').references(() => evaluations.id, { onDelete: 'set null' }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
})



