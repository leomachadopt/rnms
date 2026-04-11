import { Link, useLocation } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PRIMARY_CTA_ROUTE } from '@/config/routes'

export function FloatingCTA() {
  const location = useLocation()

  // Don't show on the eligibility page itself
  if (location.pathname === PRIMARY_CTA_ROUTE) return null

  // Don't show on DentalGrowth funnel pages
  const isDentalGrowthFunnel =
    location.pathname === '/odontogrowth' ||
    location.pathname === '/aplicacao-br' ||
    (location.pathname === '/agenda' && location.search.includes('status=eligible'))

  if (isDentalGrowthFunnel) return null

  return (
    <Link
      to={PRIMARY_CTA_ROUTE}
      className={cn(
        'fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-primary text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-bounce-slow hover-lift group',
        'py-3 px-6 min-w-[60px] h-[60px] md:h-auto animate-glow',
      )}
      aria-label="Avaliar Elegibilidade"
    >
      <MessageCircle className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
      <span className="font-semibold hidden md:inline">Avaliar Elegibilidade</span>
    </Link>
  )
}
