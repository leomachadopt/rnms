import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart, TrendingUp, Users, Target, Activity } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

interface AnalyticsData {
  overview?: {
    pageViews: number
    uniqueVisitors: number
    leads: number
    completed: number
    conversionRate: number
  }
  sources?: Array<{
    source: string
    visitors: number
    pageViews: number
  }>
  campaigns?: Array<{
    campaign: string
    source: string
    visitors: number
    leads: number
    conversionRate: number
  }>
  funnel?: Array<{
    step: string
    count: number
  }>
}

export default function Analytics() {
  const [data, setData] = useState<AnalyticsData>({})
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState('30') // dias

  useEffect(() => {
    loadAnalytics()
  }, [dateRange])

  const loadAnalytics = async () => {
    setLoading(true)
    try {
      const endDate = new Date()
      const startDate = new Date()
      startDate.setDate(startDate.getDate() - parseInt(dateRange))

      const API_URL = import.meta.env.VITE_API_URL || '/api'

      // Carrega todos os tipos de analytics em paralelo
      const [overview, sources, campaigns, funnel] = await Promise.all([
        fetch(
          `${API_URL}/analytics?type=overview&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
        ).then((r) => r.json()),
        fetch(
          `${API_URL}/analytics?type=traffic-sources&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
        ).then((r) => r.json()),
        fetch(
          `${API_URL}/analytics?type=campaigns&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
        ).then((r) => r.json()),
        fetch(
          `${API_URL}/analytics?type=funnel&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`
        ).then((r) => r.json()),
      ])

      setData({
        overview,
        sources: sources.sources,
        campaigns: campaigns.campaigns,
        funnel: funnel.funnel,
      })
    } catch (error) {
      console.error('Erro ao carregar analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
            <BarChart className="h-8 w-8" />
            Analytics & Marketing
          </h1>
          <p className="text-muted-foreground">
            Monitoramento de tráfego e campanhas de marketing
          </p>
        </div>

        <select
          className="border rounded-md px-3 py-2"
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
        >
          <option value="7">Últimos 7 dias</option>
          <option value="30">Últimos 30 dias</option>
          <option value="90">Últimos 90 dias</option>
        </select>
      </div>

      {/* Cards de Métricas Principais */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Visitantes Únicos"
          value={data.overview?.uniqueVisitors}
          icon={<Users className="h-4 w-4" />}
          loading={loading}
        />
        <MetricCard
          title="Page Views"
          value={data.overview?.pageViews}
          icon={<Activity className="h-4 w-4" />}
          loading={loading}
        />
        <MetricCard
          title="Leads"
          value={data.overview?.leads}
          icon={<Target className="h-4 w-4" />}
          loading={loading}
        />
        <MetricCard
          title="Taxa de Conversão"
          value={data.overview?.conversionRate}
          suffix="%"
          icon={<TrendingUp className="h-4 w-4" />}
          loading={loading}
        />
      </div>

      {/* Tabs de Detalhes */}
      <Tabs defaultValue="campaigns" className="space-y-4">
        <TabsList>
          <TabsTrigger value="campaigns">Campanhas</TabsTrigger>
          <TabsTrigger value="sources">Origens de Tráfego</TabsTrigger>
          <TabsTrigger value="funnel">Funil de Conversão</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns">
          <Card>
            <CardHeader>
              <CardTitle>Performance por Campanha</CardTitle>
              <CardDescription>
                Análise de leads e conversões por campanha de marketing
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : data.campaigns && data.campaigns.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3">Campanha</th>
                        <th className="text-left p-3">Origem</th>
                        <th className="text-right p-3">Visitantes</th>
                        <th className="text-right p-3">Leads</th>
                        <th className="text-right p-3">Taxa Conv.</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.campaigns.map((camp, i) => (
                        <tr key={i} className="border-b hover:bg-muted/50">
                          <td className="p-3 font-medium">{camp.campaign}</td>
                          <td className="p-3 text-muted-foreground">{camp.source}</td>
                          <td className="p-3 text-right">{camp.visitors}</td>
                          <td className="p-3 text-right font-semibold">{camp.leads}</td>
                          <td className="p-3 text-right">
                            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                              {camp.conversionRate}%
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Nenhuma campanha com dados no período selecionado
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources">
          <Card>
            <CardHeader>
              <CardTitle>Origens de Tráfego</CardTitle>
              <CardDescription>
                De onde vêm os visitantes do site
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-16 w-full" />
                  ))}
                </div>
              ) : data.sources && data.sources.length > 0 ? (
                <div className="space-y-4">
                  {data.sources.map((source, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold capitalize">{source.source}</h3>
                        <p className="text-sm text-muted-foreground">
                          {source.visitors} visitantes únicos
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{source.pageViews}</div>
                        <p className="text-xs text-muted-foreground">page views</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Nenhum dado de tráfego no período selecionado
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="funnel">
          <Card>
            <CardHeader>
              <CardTitle>Funil de Conversão</CardTitle>
              <CardDescription>
                Jornada do visitante até a conversão
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-24 w-full" />
                  ))}
                </div>
              ) : data.funnel && data.funnel.length > 0 ? (
                <div className="space-y-4">
                  {data.funnel.map((step, i) => {
                    const prevCount = i > 0 ? data.funnel![i - 1].count : step.count
                    const dropRate = prevCount > 0 ? ((prevCount - step.count) / prevCount) * 100 : 0

                    return (
                      <div key={i} className="relative">
                        <div className="flex items-center justify-between p-6 border rounded-lg bg-gradient-to-r from-primary/10 to-transparent">
                          <div>
                            <h3 className="font-semibold text-lg">{step.step}</h3>
                            {i > 0 && (
                              <p className="text-sm text-muted-foreground">
                                -{dropRate.toFixed(1)}% vs etapa anterior
                              </p>
                            )}
                          </div>
                          <div className="text-3xl font-bold">{step.count}</div>
                        </div>
                        {i < data.funnel!.length - 1 && (
                          <div className="flex justify-center my-2">
                            <div className="text-2xl text-muted-foreground">↓</div>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-8">
                  Nenhum dado de funil no período selecionado
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function MetricCard({
  title,
  value,
  suffix = '',
  icon,
  loading,
}: {
  title: string
  value?: number
  suffix?: string
  icon: React.ReactNode
  loading: boolean
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="h-8 w-24" />
        ) : (
          <div className="text-2xl font-bold">
            {value !== undefined ? value.toLocaleString() : '0'}
            {suffix}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
