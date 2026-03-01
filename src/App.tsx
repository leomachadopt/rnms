import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AppStoreProvider } from '@/stores/useAppStore'
import { AuthProvider } from '@/contexts/AuthContext'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { FacebookPixel } from '@/components/FacebookPixel'
import { CookieConsent } from '@/components/CookieConsent'
import Layout from './components/Layout'
import AdminLayout from './components/AdminLayout'
import Index from './pages/Index'
import LeonardoMachado from './pages/LeonardoMachado'
import Formacao from './pages/Formacao'
import ProgramaRNS from './pages/ProgramaRNS'
import ProgramaRNSQualificacao from './pages/ProgramaRNSQualificacao'
import Elegibilidade from './pages/Elegibilidade'
import Aplicacao from './pages/Aplicacao'
import Agenda from './pages/Agenda'
import Problema from './pages/Problema'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import AgentRNS from './pages/AgentRNS'
import Agente from './pages/Agente'
import Agendamento from './pages/Agendamento'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Users from './pages/Users'

// Admin Pages
import Dashboard from './pages/admin/Dashboard'
import PostList from './pages/admin/blog/PostList'
import PostForm from './pages/admin/blog/PostForm'
import TestimonialList from './pages/admin/testimonials/TestimonialList'
import TestimonialForm from './pages/admin/testimonials/TestimonialForm'
import Settings from './pages/admin/Settings'
import Conversations from './pages/admin/Conversations'

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Index />,
      },
      {
        path: '/sobre',
        element: <Navigate to="/" replace />,
      },
      {
        path: '/leonardo',
        element: <LeonardoMachado />,
      },
      {
        path: '/formacao',
        element: <Formacao />,
      },
      {
        path: '/programa-rns',
        element: <ProgramaRNS />,
      },
      {
        path: '/programa-rns/qualificacao',
        element: <ProgramaRNSQualificacao />,
      },
      {
        path: '/elegibilidade',
        element: <Elegibilidade />,
      },
      {
        path: '/aplicacao',
        element: <Aplicacao />,
      },
      {
        path: '/agenda',
        element: <Agenda />,
      },
      {
        path: '/problema',
        element: <Problema />,
      },
      {
        path: '/blog',
        element: <Blog />,
      },
      {
        path: '/blog/:slug',
        element: <BlogPost />,
      },
      {
        path: '/agenterns',
        element: <AgentRNS />,
      },
      {
        path: '/agente',
        element: <Agente />,
      },
      {
        path: '/agendamento',
        element: <Agendamento />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'blog',
        element: <PostList />,
      },
      {
        path: 'blog/new',
        element: <PostForm />,
      },
      {
        path: 'blog/:id/edit',
        element: <PostForm />,
      },
      {
        path: 'testimonials',
        element: <TestimonialList />,
      },
      {
        path: 'testimonials/new',
        element: <TestimonialForm />,
      },
      {
        path: 'testimonials/:id/edit',
        element: <TestimonialForm />,
      },
      {
        path: 'conversations',
        element: <Conversations />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
      {
        path: 'users',
        element: <Users />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])

const App = () => {
  return (
    <AuthProvider>
      <AppStoreProvider>
        <TooltipProvider>
          <FacebookPixel />
          <CookieConsent />
          <Toaster />
          <Sonner />
          <RouterProvider router={router} />
        </TooltipProvider>
      </AppStoreProvider>
    </AuthProvider>
  )
}

export default App
