import { db } from '../api/db/client.js'
import { blogPosts } from '../api/db/schema.js'

const INITIAL_BLOG_POSTS = [
  {
    title: 'A Relação entre Postura e Oclusão Dentária',
    excerpt: 'Descubra como a postura corporal influencia directamente o equilíbrio oclusal e como abordar esta relação na prática clínica diária.',
    content: `# A Relação entre Postura e Oclusão Dentária

## Introdução

A postura corporal e a oclusão dentária estão intrinsecamente ligadas através de cadeias musculares e fasciais que conectam o sistema estomatognático ao restante do corpo.

## O Sistema Integrado

O Método RNS compreende o corpo como um sistema integrado onde:
- Alterações posturais influenciam a oclusão
- Maloclusões geram compensações posturais
- O sistema nervoso coordena ambos os sistemas

## Aplicação Clínica

Na prática, isso significa:
1. Avaliar sempre a postura durante exame oclusal
2. Identificar padrões de compensação
3. Tratar de forma sistémica, não isolada

## Conclusão

A compreensão desta relação é fundamental para resultados clínicos previsíveis e duradouros.`,
    category: 'Clínica',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
    date: '2024-11-15',
    author: 'Dr. Leonardo Machado',
    slug: 'relacao-postura-oclusao-dentaria',
    seoTitle: 'Postura e Oclusão Dentária — Método RNS',
    seoDescription: 'Como a postura corporal influencia o equilíbrio oclusal na prática clínica.',
    seoKeywords: 'postura, oclusão, método rns, neuro-oclusão',
  },
  {
    title: 'Neuro-oclusão: O Futuro da Odontologia Funcional',
    excerpt: 'A neuro-oclusão representa uma abordagem integrativa que considera o sistema nervoso como eixo central do equilíbrio estomatognático.',
    content: `# Neuro-oclusão: O Futuro da Odontologia Funcional

## Uma Nova Perspectiva

A neuro-oclusão não é apenas mais uma técnica, mas uma forma fundamentalmente diferente de compreender o funcionamento do sistema estomatognático.

## Os Pilares da Neuro-oclusão

### 1. Sistema Nervoso Central
O SNC coordena e regula todas as funções oclusais através de feedback contínuo.

### 2. Adaptação Sistémica
O corpo adapta-se constantemente às condições oclusais através de mecanismos neuroplásticos.

### 3. Previsibilidade Clínica
Com a lente neuro-oclusal, conseguimos prever o comportamento do sistema antes de intervir.

## Método RNS

O Método RNS estrutura esta abordagem numa arquitectura clínica clara, replicável e baseada em evidência científica.`,
    category: 'Formação',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    date: '2024-10-28',
    author: 'Dr. Leonardo Machado',
    slug: 'neuro-oclusao-futuro-odontologia-funcional',
    seoTitle: 'Neuro-oclusão e Odontologia Funcional — Método RNS',
    seoDescription: 'Compreenda os fundamentos da neuro-oclusão e a sua importância na odontologia moderna.',
    seoKeywords: 'neuro-oclusão, odontologia funcional, método rns',
  },
  {
    title: 'Como Estruturar uma Clínica de Alta Performance',
    excerpt: 'Gestão, cultura de equipa e posicionamento premium: os pilares para transformar a sua clínica num negócio de alta performance.',
    content: `# Como Estruturar uma Clínica de Alta Performance

## Além da Excelência Clínica

Ter excelência clínica não é suficiente para construir um negócio próspero. É necessário estrutura, gestão e posicionamento estratégico.

## Os 3 Pilares

### 1. Gestão Estratégica
- Processos claros e replicáveis
- KPIs mensuráveis
- Tomada de decisão baseada em dados

### 2. Cultura de Equipa
- Alinhamento de valores
- Formação contínua
- Ambiente de alta performance

### 3. Posicionamento Premium
- Comunicação de valor
- Atração de pacientes qualificados
- Precificação estratégica

## Mentoria Clínica e Comercial

O Método RNS oferece mentoria que integra excelência clínica com estratégia comercial e gestão de alto nível.

## Próximos Passos

A transformação começa com a decisão de evoluir estruturalmente, não apenas tecnicamente.`,
    category: 'Gestão',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80',
    date: '2024-10-10',
    author: 'Dr. Leonardo Machado',
    slug: 'estruturar-clinica-alta-performance',
    seoTitle: 'Clínica de Alta Performance — Método RNS',
    seoDescription: 'Estratégias de gestão e posicionamento para transformar a sua clínica.',
    seoKeywords: 'gestão clínica, alta performance, clínica premium',
  },
]

async function seedBlogPosts() {
  const database = db()

  console.log('📝 Populando banco com blog posts iniciais...')
  console.log(`Total de posts: ${INITIAL_BLOG_POSTS.length}`)

  try {
    for (const post of INITIAL_BLOG_POSTS) {
      console.log(`\n➕ Inserindo: "${post.title}"`)

      await database.insert(blogPosts).values(post)

      console.log(`✅ Inserido com sucesso!`)
    }

    console.log('\n✨ Todos os blog posts foram inseridos!')
    console.log('\n📋 Posts criados:')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    INITIAL_BLOG_POSTS.forEach((post, index) => {
      console.log(`${index + 1}. ${post.title}`)
      console.log(`   Categoria: ${post.category}`)
      console.log(`   Slug: ${post.slug}`)
    })
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  } catch (error: any) {
    if (error.message?.includes('duplicate key')) {
      console.log('\n⚠️  Posts já existem no banco. Pulando inserção.')
    } else {
      console.error('\n❌ Erro ao inserir posts:', error)
      throw error
    }
  }
}

seedBlogPosts()
  .then(() => {
    console.log('\n✅ Script executado com sucesso!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Erro fatal:', error)
    process.exit(1)
  })
