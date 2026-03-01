/**
 * Configuração centralizada de rotas da aplicação
 *
 * Facilita manutenção e evita hardcoding de rotas em múltiplos componentes.
 * Se a rota do funil mudar, basta actualizar aqui.
 */

/**
 * Rota primária do CTA de conversão (entrada no funil high-ticket)
 * Usada em: Header, Footer, FloatingCTA, páginas de produto, etc.
 */
export const PRIMARY_CTA_ROUTE = '/elegibilidade'

/**
 * Outras rotas importantes da aplicação
 */
export const ROUTES = {
  HOME: '/',
  FORMACAO: '/formacao',
  PROGRAMA_RNS: '/programa-rns',
  LEONARDO: '/leonardo',
  BLOG: '/blog',
  ELEGIBILIDADE: PRIMARY_CTA_ROUTE,
  APLICACAO: '/aplicacao',
  AGENDA: '/agenda',
} as const
