import 'dotenv/config'
import { db } from './client'
import { blogPosts, testimonials } from './schema'

// Dados iniciais dos posts do blog
const INITIAL_POSTS = [
  {
    title: '5 Sinais de que o seu filho respira pela boca',
    excerpt:
      'Aprenda a identificar os sinais subtis que indicam problemas respiratórios durante o dia e a noite.',
    content:
      'Muitos pais acham que o ronco em crianças é "fofo" ou sinal de sono profundo, mas na verdade, pode ser um grito de socorro das vias aéreas. A respiração oral é um problema sério que precisa de atenção.\n\n1. Boca sempre entreaberta\nSe o seu filho assiste televisão, brinca ou dorme com os lábios separados, é o sinal mais óbvio.\n\n2. Baba no travesseiro\nAcordar com a fronha molhada é um indicativo clássico.\n\n3. Olheiras profundas\nA má oxigenação e o sono de má qualidade resultam em olheiras vasculares.',
    category: 'Sintomas',
    image: 'child sleeping',
    date: '28 Nov 2024',
    author: 'Dra. Ana Martins',
    slug: '5-sinais-respiracao-oral',
    seoTitle: '5 Sinais de Respiração Oral Infantil - Guia Completo',
    seoDescription:
      'Descubra se o seu filho respira pela boca. Veja os 5 principais sinais de alerta e saiba quando procurar ajuda especializada.',
    seoKeywords: 'respiração oral, sintomas, crianças, sono infantil',
  },
  {
    title: 'Como a respiração afeta o desempenho escolar',
    excerpt:
      'A falta de oxigenação adequada e o sono ruim podem ser os vilões das notas baixas.',
    content:
      'A respiração oral afeta a qualidade do sono, e uma criança cansada não aprende. O cérebro precisa de oxigénio e descanso para consolidar a memória e manter o foco.',
    category: 'Educação',
    image: 'child studying',
    date: '25 Nov 2024',
    author: 'Dr. Carlos Ferreira',
    slug: 'respiracao-desempenho-escolar',
    seoTitle: 'Respiração Oral e Desempenho Escolar: Qual a Relação?',
    seoDescription:
      'Entenda como a má respiração pode afetar a concentração e o aprendizado do seu filho na escola.',
  },
  {
    title: 'Chupeta e Dedo: O impacto na respiração',
    excerpt:
      'Entenda como hábitos orais podem deformar a arcada dentária e forçar a respiração oral.',
    content:
      'O uso prolongado de chupeta ou o hábito de chupar o dedo altera o formato do palato (céu da boca), deixando-o ogival (fundo e estreito), o que diminui o espaço para a passagem de ar pelo nariz.',
    category: 'Prevenção',
    image: 'baby pacifier',
    date: '20 Nov 2024',
    author: 'Dra. Sofia Costa',
    slug: 'chupeta-dedo-impacto-respiracao',
  },
  {
    title: 'Tratamentos modernos para respiração oral',
    excerpt:
      'Conheça as novas abordagens que evitam cirurgias em muitos casos.',
    content:
      'Hoje em dia, a abordagem multidisciplinar com ortopedia funcional, fonoaudiologia e otorrino permite tratar muitos casos sem intervenção cirúrgica invasiva.',
    category: 'Tratamento',
    image: 'doctor child',
    date: '15 Nov 2024',
    author: 'Dr. Miguel Santos',
    slug: 'tratamentos-respiracao-oral',
  },
]

// Dados iniciais dos depoimentos
const INITIAL_TESTIMONIALS = [
  {
    name: 'Maria Silva',
    text: 'A avaliação foi um divisor de águas. O meu filho dorme muito melhor agora e está mais disposto na escola!',
    role: 'Mãe do Pedro, 5 anos',
    rating: 5,
    avatarGender: 'female',
    avatarSeed: 1,
    featured: 1,
  },
  {
    name: 'João Santos',
    text: 'A equipe é fantástica. Ajudaram-nos a entender o problema sem alarmismo e com muito profissionalismo.',
    role: 'Pai da Ana, 7 anos',
    rating: 5,
    avatarGender: 'male',
    avatarSeed: 2,
    featured: 1,
  },
  {
    name: 'Carla Dias',
    text: 'Recomendo a todos os pais. A Dra. Ro ajudou-nos a perceber que precisávamos de ajuda especializada.',
    role: 'Mãe do Lucas, 4 anos',
    rating: 5,
    avatarGender: 'female',
    avatarSeed: 3,
    featured: 1,
  },
  {
    name: 'Ricardo Alves',
    text: 'O tratamento mudou a vida da minha filha. Ela agora respira melhor e tem muito mais energia.',
    role: 'Pai da Sofia, 6 anos',
    rating: 5,
    avatarGender: 'male',
    avatarSeed: 4,
    featured: 0,
  },
  {
    name: 'Ana Paula Costa',
    text: 'Excelente acompanhamento desde a primeira consulta. A equipe é muito atenciosa e dedicada.',
    role: 'Mãe do Gabriel, 8 anos',
    rating: 5,
    avatarGender: 'female',
    avatarSeed: 5,
    featured: 0,
  },
]

async function seed() {
  console.log('🌱 Iniciando seed do banco de dados...')

  try {
    // Inserir posts do blog
    console.log('📝 Inserindo posts do blog...')
    await db.insert(blogPosts).values(INITIAL_POSTS)
    console.log(`✅ ${INITIAL_POSTS.length} posts do blog inseridos`)

    // Inserir depoimentos
    console.log('💬 Inserindo depoimentos...')
    await db.insert(testimonials).values(INITIAL_TESTIMONIALS)
    console.log(`✅ ${INITIAL_TESTIMONIALS.length} depoimentos inseridos`)

    console.log('✅ Seed concluído com sucesso!')
  } catch (error) {
    console.error('❌ Erro ao fazer seed:', error)
    process.exit(1)
  }
}

seed()
