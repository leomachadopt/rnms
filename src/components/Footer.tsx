import { Link } from 'react-router-dom'
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
} from 'lucide-react'

export function Footer() {
  return (
    <footer className="gradient-luxury border-t border-secondary/20 mt-auto relative overflow-hidden">
      <div className="absolute inset-0 pattern-dots opacity-10"></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4 animate-fade-in-up">
            <div className="flex items-center gap-2 group">
              <img
                src="/logo_RNS_NOVA.png"
                alt="Método RNS"
                className="w-10 h-10 object-contain drop-shadow-lg"
              />
              <span className="heading-premium text-xl text-gradient-gold transition-all duration-300 group-hover:scale-105">
                Método RNS
              </span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed font-light">
              Reequilíbrio Neuro-Oclusal Sistémico. Um modelo de raciocínio clínico
              que integra sistema nervoso, oclusão e organização funcional do corpo
              na compreensão e tratamento da má oclusão.
            </p>
            <div className="flex gap-4">
              {[
                {
                  icon: Facebook,
                  label: 'Facebook',
                  href: 'https://www.facebook.com/clinicacristianemartins'
                },
                {
                  icon: Instagram,
                  label: 'Instagram',
                  href: 'https://www.instagram.com/dracristianemartins'
                },
              ].map(({ icon: Icon, label, href }, idx) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full glass-premium border border-white/20 flex items-center justify-center text-white hover:bg-secondary hover:border-secondary hover:text-primary transition-all duration-300 hover:scale-110 hover:shadow-gold"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="sr-only">{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-base">
              Links Rápidos
            </h3>
            <ul className="space-y-3">
              {[
                { path: '/', label: 'Home' },
                { path: '/sobre', label: 'Método RNS' },
                { path: '/leonardo', label: 'Leonardo Machado' },
                { path: '/formacao', label: 'Formação' },
                { path: '/avaliacao', label: 'Diagnóstico IA' },
                { path: '/blog', label: 'Blog' },
              ].map((link, idx) => (
                <li
                  key={link.path}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <Link
                    to={link.path}
                    className="text-sm text-white/70 hover:text-secondary transition-all duration-300 hover:translate-x-1 inline-block font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-base">Serviços</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/formacao"
                  className="text-sm text-white/70 hover:text-secondary transition-all duration-300 hover:translate-x-1 inline-block font-medium"
                >
                  Formação Certificada
                </Link>
              </li>
              <li>
                <Link
                  to="/consultoria"
                  className="text-sm text-white/70 hover:text-secondary transition-all duration-300 hover:translate-x-1 inline-block font-medium"
                >
                  Consultoria Clínica
                </Link>
              </li>
              <li>
                <Link
                  to="/mentoria"
                  className="text-sm text-white/70 hover:text-secondary transition-all duration-300 hover:translate-x-1 inline-block font-medium"
                >
                  Mentoria Profissional
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-base">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-white/70">
                <div className="w-5 h-5 rounded-full gradient-navy-gold flex items-center justify-center shrink-0 shadow-gold">
                  <MapPin className="w-3 h-3 text-white" />
                </div>
                <span className="font-light">
                  Formação Internacional<br />
                  Método RNS - Portugal
                </span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/70">
                <div className="w-5 h-5 rounded-full gradient-navy-gold flex items-center justify-center shrink-0 shadow-gold">
                  <Mail className="w-3 h-3 text-white" />
                </div>
                <a
                  href="mailto:formacao@metodorns.pt"
                  className="hover:text-secondary transition-colors font-light"
                >
                  formacao@metodorns.pt
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/70">
                <div className="w-5 h-5 rounded-full gradient-navy-gold flex items-center justify-center shrink-0 shadow-gold">
                  <Phone className="w-3 h-3 text-white" />
                </div>
                <span className="text-sm font-light">
                  Informações sobre formação
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center text-sm text-white/60">
          <p className="font-light">
            &copy; {new Date().getFullYear()} Método RNS — Leonardo Machado. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
