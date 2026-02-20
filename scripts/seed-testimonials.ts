import { db } from '../api/db/client.js'
import { testimonials } from '../api/db/schema.js'

const INITIAL_TESTIMONIALS = [
  {
    name: 'Dra. Ana Ferreira',
    text: 'O Método RNS transformou completamente a minha prática clínica. Os resultados com os pacientes melhoraram significativamente e a minha segurança técnica aumentou muito.',
    role: 'Dentista · Porto',
    rating: 5,
    avatarGender: 'female',
    avatarSeed: 42,
    customAvatar: null,
    featured: 1,
  },
  {
    name: 'Dr. Carlos Mendes',
    text: 'A formação é extremamente prática e aplicável no dia a dia. Em poucos meses consegui resultados que nunca tinha alcançado antes na área de neuro-oclusão.',
    role: 'Médico Dentista · Lisboa',
    rating: 5,
    avatarGender: 'male',
    avatarSeed: 17,
    customAvatar: null,
    featured: 1,
  },
  {
    name: 'Dra. Sofia Costa',
    text: 'A mentoria do Dr. Leonardo Machado é única. O acompanhamento personalizado e o rigor científico fazem toda a diferença. Recomendo a todos os colegas.',
    role: 'Ortodontista · Braga',
    rating: 5,
    avatarGender: 'female',
    avatarSeed: 83,
    customAvatar: null,
    featured: 1,
  },
]

async function seedTestimonials() {
  const database = db()

  console.log('💬 Populando banco com depoimentos iniciais...')
  console.log(`Total de depoimentos: ${INITIAL_TESTIMONIALS.length}`)

  try {
    for (const testimonial of INITIAL_TESTIMONIALS) {
      console.log(`\n➕ Inserindo: "${testimonial.name}"`)

      await database.insert(testimonials).values(testimonial)

      console.log(`✅ Inserido com sucesso!`)
    }

    console.log('\n✨ Todos os depoimentos foram inseridos!')
    console.log('\n📋 Depoimentos criados:')
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
    INITIAL_TESTIMONIALS.forEach((test, index) => {
      console.log(`${index + 1}. ${test.name} - ${test.role}`)
      console.log(`   Rating: ${'⭐'.repeat(test.rating)}`)
      console.log(`   Featured: ${test.featured ? 'Sim' : 'Não'}`)
    })
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
  } catch (error: any) {
    if (error.message?.includes('duplicate key')) {
      console.log('\n⚠️  Depoimentos já existem no banco. Pulando inserção.')
    } else {
      console.error('\n❌ Erro ao inserir depoimentos:', error)
      throw error
    }
  }
}

seedTestimonials()
  .then(() => {
    console.log('\n✅ Script executado com sucesso!')
    process.exit(0)
  })
  .catch((error) => {
    console.error('\n💥 Erro fatal:', error)
    process.exit(1)
  })
