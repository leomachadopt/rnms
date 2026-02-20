import { Link } from 'react-router-dom'
import { FileText, MessageSquare, ClipboardCheck, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import useAppStore from '@/stores/useAppStore'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const { blogPosts, testimonials } = useAppStore()
  const [evaluationsCount, setEvaluationsCount] = useState(0)

  useEffect(() => {
    // Carregar contagem de evaluations da API
    fetch('/api/evaluations')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setEvaluationsCount(data.length)
        }
      })
      .catch((err) => console.error('Erro ao carregar evaluations:', err))
  }, [])

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do sistema RNS</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Blog Stats */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Artigos
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{blogPosts.length}</div>
            <p className="text-xs text-muted-foreground mb-4">
              Artigos publicados
            </p>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link to="/admin/blog">
                Gerir Artigos <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Testimonials Stats */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Depoimentos
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{testimonials.length}</div>
            <p className="text-xs text-muted-foreground mb-4">
              Depoimentos cadastrados
            </p>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link to="/admin/testimonials">
                Gerir Depoimentos <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Evaluations Stats */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Diagnósticos IA
            </CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{evaluationsCount}</div>
            <p className="text-xs text-muted-foreground mb-4">
              Conversas de diagnóstico guardadas
            </p>
            <Button asChild variant="outline" size="sm" className="w-full">
              <Link to="/admin/evaluations">
                Ver Diagnósticos <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
