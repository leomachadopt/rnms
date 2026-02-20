import { useState, useMemo } from 'react'
import { FileText, Download, Eye, Users, CheckCircle, Clock, TrendingUp, Trash2 } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import useAppStore from '@/stores/useAppStore'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import jsPDF from 'jspdf'

export default function EvaluationList() {
  const { evaluations, specialists, deleteEvaluation } = useAppStore()
  const [filter, setFilter] = useState<'all' | 'started' | 'completed'>('all')
  const [selectedEvaluation, setSelectedEvaluation] = useState<any>(null)
  const [evaluationToDelete, setEvaluationToDelete] = useState<any>(null)

  // Estatísticas
  const stats = useMemo(() => {
    const total = evaluations.length
    const completed = evaluations.filter(e => e.analysisResult).length
    const started = total - completed

    // Contar profissionais recomendados
    const professionalsCount: Record<number, number> = {}
    evaluations.forEach(e => {
      if (e.recommendedSpecialistId) {
        professionalsCount[e.recommendedSpecialistId] =
          (professionalsCount[e.recommendedSpecialistId] || 0) + 1
      }
    })

    return {
      total,
      completed,
      started,
      professionalsCount,
    }
  }, [evaluations])

  // Filtrar avaliações
  const filteredEvaluations = useMemo(() => {
    switch (filter) {
      case 'started':
        return evaluations.filter(e => !e.analysisResult)
      case 'completed':
        return evaluations.filter(e => e.analysisResult)
      default:
        return evaluations
    }
  }, [evaluations, filter])

  // Função para deletar avaliação
  const handleDeleteEvaluation = async () => {
    if (!evaluationToDelete) return

    try {
      await deleteEvaluation(evaluationToDelete.id)
      setEvaluationToDelete(null)
    } catch (error) {
      console.error('Erro ao deletar avaliação:', error)
    }
  }

  // Função para download em PDF
  const handleDownloadPDF = async (evaluation: any) => {
    if (!evaluation.analysisResult?.report) {
      return
    }

    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    })

    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 20
    const maxWidth = pageWidth - 2 * margin
    let yPosition = margin

    // Função auxiliar para adicionar texto com quebra de linha
    const addText = (text: string, fontSize: number, isBold: boolean = false, isTitle: boolean = false) => {
      doc.setFontSize(fontSize)
      doc.setFont('helvetica', isBold ? 'bold' : 'normal')

      // Remover marcadores de markdown
      const cleanText = text.replace(/\*\*/g, '')

      const lines = doc.splitTextToSize(cleanText, maxWidth)

      lines.forEach((line: string) => {
        // Verificar se precisa de nova página
        if (yPosition + 10 > pageHeight - margin) {
          doc.addPage()
          yPosition = margin
        }

        doc.text(line, margin, yPosition)
        yPosition += fontSize * 0.5 // Espaçamento entre linhas
      })

      yPosition += isTitle ? 8 : 5 // Espaçamento extra após títulos
    }

    // Cabeçalho
    doc.setFillColor(37, 99, 235) // Cor primária
    doc.rect(0, 0, pageWidth, 40, 'F')

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(24)
    doc.setFont('helvetica', 'bold')
    doc.text('Respira Oral', margin, 15)

    doc.setFontSize(12)
    doc.setFont('helvetica', 'normal')
    doc.text('Relatório de Avaliação', margin, 25)

    doc.setTextColor(0, 0, 0)
    yPosition = 50

    // Informações do paciente
    doc.setFontSize(10)
    doc.setFont('helvetica', 'bold')
    doc.text('Informações do Paciente:', margin, yPosition)
    yPosition += 7

    doc.setFont('helvetica', 'normal')
    doc.text(`Nome: ${evaluation.name}`, margin, yPosition)
    yPosition += 6
    doc.text(`Idade: ${evaluation.age || 'Não informada'}`, margin, yPosition)
    yPosition += 6
    doc.text(`Telefone: ${evaluation.phone}`, margin, yPosition)
    yPosition += 6
    doc.text(`Região: ${evaluation.location?.region || 'Não informada'}`, margin, yPosition)
    yPosition += 6
    doc.text(
      `Data da Avaliação: ${format(new Date(evaluation.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}`,
      margin,
      yPosition
    )
    yPosition += 12

    // Linha separadora
    doc.setDrawColor(200, 200, 200)
    doc.line(margin, yPosition, pageWidth - margin, yPosition)
    yPosition += 10

    // Relatório
    const report = evaluation.analysisResult.report
    const paragraphs = report.split('\n').filter((p: string) => p.trim())

    paragraphs.forEach((paragraph: string) => {
      if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**')) {
        // Título
        addText(paragraph, 14, true, true)
      } else if (paragraph.trim()) {
        // Parágrafo normal
        addText(paragraph, 10, false, false)
      }
    })

    // Adicionar texto complementar padrão
    yPosition += 15

    // Linha separadora
    if (yPosition + 10 > pageHeight - margin) {
      doc.addPage()
      yPosition = margin
    }
    doc.setDrawColor(200, 200, 200)
    doc.line(margin, yPosition, pageWidth - margin, yPosition)
    yPosition += 10

    // Título da seção complementar
    doc.setTextColor(37, 99, 235)
    doc.setFontSize(16)
    doc.setFont('helvetica', 'bold')
    const titleLines = doc.splitTextToSize('Avaliação pelo Método Respira e Cresce 360º', maxWidth)
    titleLines.forEach((line: string) => {
      if (yPosition + 10 > pageHeight - margin) {
        doc.addPage()
        yPosition = margin
      }
      doc.text(line, pageWidth / 2, yPosition, { align: 'center' })
      yPosition += 7
    })

    doc.setFontSize(12)
    doc.setFont('helvetica', 'bold')
    const subtitleLines = doc.splitTextToSize('O que é e como funciona na prática', maxWidth)
    subtitleLines.forEach((line: string) => {
      if (yPosition + 10 > pageHeight - margin) {
        doc.addPage()
        yPosition = margin
      }
      doc.text(line, pageWidth / 2, yPosition, { align: 'center' })
      yPosition += 6
    })

    yPosition += 5
    doc.setTextColor(0, 0, 0)

    // Conteúdo padrão
    const standardContent = `Os sinais identificados neste relatório indicam a necessidade de uma avaliação mais aprofundada, com o objetivo de compreender a causa real das alterações observadas e não apenas os seus efeitos. É neste contexto que se enquadra a consulta de avaliação pelo Método Respira e Cresce 360º.

Esta consulta não é uma avaliação convencional nem uma observação rápida. Trata-se de um processo estruturado e integrado, desenhado especificamente para analisar de forma completa como a criança respira, cresce e funciona no seu dia a dia.

O que acontece na consulta de avaliação

A avaliação pelo Método Respira e Cresce 360º é composta por diferentes etapas, que permitem cruzar informação clínica, funcional e postural:

1. Avaliação do crescimento e das funções orais
Nesta fase são analisados:
• A forma como a criança respira (nariz e boca)
• O crescimento do rosto e das arcadas dentárias
• A posição do palato (céu da boca)
• A mastigação, deglutição e fala

Esta análise permite perceber de que forma a função está a influenciar o crescimento.

2. Avaliação postural e do equilíbrio corporal
A respiração oral raramente afeta apenas a boca. Por isso, é avaliado:
• O alinhamento global do corpo
• A posição da cabeça e do pescoço
• Tensões musculares e compensações posturais

Esta etapa ajuda a identificar adaptações do corpo associadas ao padrão respiratório.

3. Exames complementares e registo objetivo
Sempre que indicado, são realizados exames como:
• Avaliação do sono
• Registos fotográficos da postura e da face
• Análise funcional da mastigação
• Exames de imagem

Estes dados permitem confirmar clinicamente o que foi observado e dar mais precisão ao diagnóstico.

Qual é o objetivo desta avaliação

No final da consulta, os responsáveis recebem:
• Uma explicação clara do que está a acontecer
• A identificação do que é causa e do que é consequência
• Uma proposta de plano adequado ao crescimento da criança

O objetivo não é iniciar um tratamento automaticamente, mas sim definir com rigor se existe necessidade de intervenção, qual o tipo de abordagem mais indicada e qual o melhor momento para agir, aproveitando o crescimento de forma inteligente.

Próximo passo

Com base nos sinais identificados neste relatório, recomendamos o agendamento da consulta de avaliação pelo Método Respira e Cresce 360º. Esta avaliação permitirá esclarecer dúvidas, confirmar os achados clínicos e definir, de forma personalizada, o melhor caminho para apoiar o desenvolvimento saudável da criança.

>> Agende a consulta de avaliação e obtenha uma visão completa, integrada e fundamentada sobre a respiração, o crescimento e o funcionamento do seu filho.`

    const standardParagraphs = standardContent.split('\n').filter(p => p.trim())

    standardParagraphs.forEach((para: string) => {
      const cleanPara = para.trim()

      if (cleanPara.match(/^(O que acontece|Qual é o objetivo|Próximo passo)$/)) {
        // Títulos principais
        addText(cleanPara, 12, true, true)
      } else if (cleanPara.match(/^\d+\./)) {
        // Títulos numerados
        addText(cleanPara, 11, true, true)
      } else if (cleanPara.startsWith('>>')) {
        // CTA final
        doc.setTextColor(37, 99, 235)
        addText(cleanPara.replace('>>', '').trim(), 11, true, false)
        doc.setTextColor(0, 0, 0)
      } else if (cleanPara) {
        // Texto normal
        addText(cleanPara, 10, false, false)
      }
    })

    // Rodapé
    const totalPages = doc.getNumberOfPages()
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      doc.setTextColor(128, 128, 128)
      doc.text(
        `Página ${i} de ${totalPages}`,
        pageWidth / 2,
        pageHeight - 10,
        { align: 'center' }
      )
      doc.text(
        'Respira Oral - www.respiraoral.pt',
        pageWidth / 2,
        pageHeight - 5,
        { align: 'center' }
      )
    }

    // Salvar PDF
    const fileName = `relatorio_${evaluation.name.replace(/\s+/g, '_')}_${format(new Date(evaluation.createdAt), 'yyyyMMdd')}.pdf`
    doc.save(fileName)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Avaliações</h1>
        <p className="text-muted-foreground">Gestão e análise de avaliações realizadas</p>
      </div>

      {/* Estatísticas */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Avaliações</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Todas as avaliações</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Iniciadas</CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.started}</div>
            <p className="text-xs text-muted-foreground">Aguardando conclusão</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Finalizadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completed}</div>
            <p className="text-xs text-muted-foreground">Com relatório gerado</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Conclusão</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">Avaliações concluídas</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <div className="flex gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
        >
          Todas ({stats.total})
        </Button>
        <Button
          variant={filter === 'started' ? 'default' : 'outline'}
          onClick={() => setFilter('started')}
        >
          Iniciadas ({stats.started})
        </Button>
        <Button
          variant={filter === 'completed' ? 'default' : 'outline'}
          onClick={() => setFilter('completed')}
        >
          Finalizadas ({stats.completed})
        </Button>
      </div>

      {/* Lista de Avaliações */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Avaliações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredEvaluations.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Nenhuma avaliação encontrada
              </p>
            ) : (
              filteredEvaluations.map((evaluation) => {
                const specialist = specialists.find(s => s.id === evaluation.recommendedSpecialistId)
                const isCompleted = !!evaluation.analysisResult

                return (
                  <div
                    key={evaluation.id}
                    className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{evaluation.name}</h3>
                          {isCompleted ? (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                              Finalizada
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">
                              Iniciada
                            </span>
                          )}
                          {evaluation.analysisResult?.source === 'strategic_agent' ? (
                            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-medium">
                              Agente Estratégico
                            </span>
                          ) : (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                              Diagnóstico Clínico
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-muted-foreground">
                          <div>
                            <span className="font-medium">Telefone:</span> {evaluation.phone}
                          </div>
                          {evaluation.age && (
                            <div>
                              <span className="font-medium">Idade:</span> {evaluation.age}
                            </div>
                          )}
                          {evaluation.location?.region && (
                            <div>
                              <span className="font-medium">Região:</span> {evaluation.location.region}
                            </div>
                          )}
                          <div>
                            <span className="font-medium">Data:</span>{' '}
                            {format(new Date(evaluation.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                          </div>
                        </div>

                        {/* Origem (UTM) */}
                        {(evaluation.utmSource || evaluation.utmCampaign) && (
                          <div className="mt-2 p-2 bg-blue-50 rounded-md text-sm">
                            <span className="font-medium text-blue-900">Origem:</span>{' '}
                            <span className="text-blue-700">
                              {evaluation.utmCampaign ? (
                                `${evaluation.utmSource || 'Unknown'} - ${evaluation.utmCampaign}`
                              ) : (
                                evaluation.utmSource
                              )}
                              {evaluation.utmMedium && ` (${evaluation.utmMedium})`}
                            </span>
                          </div>
                        )}

                        {specialist && (
                          <div className="mt-2 text-sm">
                            <span className="font-medium">Profissional recomendado:</span>{' '}
                            {specialist.name} - {specialist.role}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        {isCompleted && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedEvaluation(evaluation)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              Ver
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDownloadPDF(evaluation)}
                            >
                              <Download className="w-4 h-4 mr-1" />
                              PDF
                            </Button>
                          </>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEvaluationToDelete(evaluation)}
                          className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </CardContent>
      </Card>

      {/* Modal de visualização do relatório */}
      {selectedEvaluation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Relatório de Avaliação</h2>
                <p className="text-muted-foreground">{selectedEvaluation.name}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownloadPDF(selectedEvaluation)}
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download PDF
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setSelectedEvaluation(null)}
                >
                  Fechar
                </Button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              {selectedEvaluation.analysisResult?.messages ? (
                // Mostrar conversa (Diagnóstico IA ou Agente Estratégico)
                <div className="space-y-4">
                  {selectedEvaluation.analysisResult.messages.map((msg: any, idx: number) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-lg ${
                        msg.role === 'user'
                          ? 'bg-blue-50 border border-blue-200'
                          : 'bg-gray-50 border border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={`text-xs font-semibold uppercase ${
                            msg.role === 'user' ? 'text-blue-700' : 'text-gray-700'
                          }`}
                        >
                          {msg.role === 'user' ? 'Utilizador' : 'Assistente RNS'}
                        </span>
                      </div>
                      <div className="prose max-w-none text-sm">
                        {msg.content.split('\n').map((line: string, lineIdx: number) => {
                          if (line.trim().startsWith('**') && line.trim().endsWith('**')) {
                            return (
                              <h3 key={lineIdx} className="font-bold text-base mt-3 mb-1">
                                {line.replace(/\*\*/g, '')}
                              </h3>
                            )
                          }
                          if (line.trim().startsWith('OPTIONS:')) {
                            return (
                              <div key={lineIdx} className="mt-2 p-2 bg-white rounded border text-xs text-gray-600">
                                <code>{line}</code>
                              </div>
                            )
                          }
                          if (line.trim()) {
                            return <p key={lineIdx} className="mb-2">{line}</p>
                          }
                          return <br key={lineIdx} />
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Mostrar relatório antigo (caso exista)
                <div className="prose max-w-none">
                  {selectedEvaluation.analysisResult?.report?.split('\n').map((paragraph: string, idx: number) => {
                    if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**')) {
                      return (
                        <h2 key={idx} className="text-xl font-bold text-primary mt-4 mb-2">
                          {paragraph.replace(/\*\*/g, '')}
                        </h2>
                      )
                    }
                    if (paragraph.trim()) {
                      return <p key={idx} className="mb-4">{paragraph}</p>
                    }
                    return null
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Dialog de confirmação de exclusão */}
      <AlertDialog open={!!evaluationToDelete} onOpenChange={() => setEvaluationToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir a avaliação de <strong>{evaluationToDelete?.name}</strong>?
              <br />
              <br />
              Esta ação não pode ser desfeita. O relatório e todos os dados associados serão permanentemente removidos do sistema.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteEvaluation}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir Avaliação
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Profissionais mais recomendados */}
      {Object.keys(stats.professionalsCount).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Profissionais Mais Recomendados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {Object.entries(stats.professionalsCount)
                .sort(([, a], [, b]) => (b as number) - (a as number))
                .map(([specialistId, count]) => {
                  const specialist = specialists.find(s => s.id === Number(specialistId))
                  if (!specialist) return null

                  return (
                    <div
                      key={specialistId}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{specialist.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {specialist.role} - {specialist.region}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-primary">{count}</p>
                        <p className="text-xs text-muted-foreground">recomendações</p>
                      </div>
                    </div>
                  )
                })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
