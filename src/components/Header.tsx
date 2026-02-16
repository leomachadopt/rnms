import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Método RNS', path: '/sobre' },
    { name: 'Leonardo Machado', path: '/leonardo' },
    { name: 'Formação', path: '/formacao' },
    { name: 'Diagnóstico IA', path: '/avaliacao' },
    { name: 'Blog', path: '/blog' },
  ]

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled
          ? 'glass-premium shadow-premium border-b border-secondary/20 py-3'
          : 'bg-white/90 backdrop-blur-md shadow-sm py-5',
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/logo_ro.png"
            alt="Método RNS"
            className="w-12 h-12 object-contain transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 drop-shadow-lg"
          />
          <span className="heading-premium text-2xl text-gradient-gold hidden sm:block transition-all duration-300 group-hover:scale-105 drop-shadow-lg">
            Método RNS
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link, idx) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-sm font-semibold transition-all duration-300 hover:text-secondary hover:scale-105 relative group',
                location.pathname === link.path
                  ? 'text-secondary'
                  : 'text-foreground',
              )}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-secondary shadow-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Button
            asChild
            className="btn-gold hover-glow-gold px-6"
          >
            <Link to="/avaliacao" className="group">
              <MessageCircle className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              Diagnóstico IA
            </Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:bg-secondary/10"
              >
                <Menu className="w-6 h-6" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[80vw] sm:w-[350px] flex flex-col glass-premium border-l border-secondary/20"
            >
              <SheetTitle className="text-left text-lg heading-premium text-primary">
                Menu
              </SheetTitle>
              <SheetDescription className="sr-only">
                Navegação principal
              </SheetDescription>
              <nav className="flex flex-col gap-6 mt-8">
                {navLinks.map((link, idx) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'text-lg font-semibold transition-all duration-300 hover:text-secondary hover:translate-x-2 hover:scale-105',
                      location.pathname === link.path
                        ? 'text-secondary'
                        : 'text-foreground',
                    )}
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    {link.name}
                  </Link>
                ))}
                <Button
                  asChild
                  className="mt-4 w-full btn-gold hover-glow-gold"
                >
                  <Link to="/avaliacao" onClick={() => setIsOpen(false)}>
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Diagnóstico IA
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
