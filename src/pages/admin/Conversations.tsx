import { useState, useEffect } from 'react'
import { MessageSquare, Eye, Calendar, User, Mail, Clock, Filter } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import ReactMarkdown from 'react-markdown'

type ConversationMessage = {
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

type Conversation = {
  id: number
  session_id: string
  chat_type: string
  user_email: string | null
  user_name: string | null
  user_fingerprint: string | null
  ip_address: string | null
  user_agent: string | null
  messages: ConversationMessage[]
  metadata: any
  status: string
  started_at: string
  last_message_at: string
  completed_at: string | null
}

export default function Conversations() {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [chatTypeFilter, setChatTypeFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    loadConversations()
  }, [chatTypeFilter, statusFilter])

  const loadConversations = async () => {
    setIsLoading(true)
    try {
      let url = '/api/get-conversations?limit=100'

      if (chatTypeFilter !== 'all') {
        url += `&chatType=${chatTypeFilter}`
      }

      if (statusFilter !== 'all') {
        url += `&status=${statusFilter}`
      }

      const response = await fetch(url)
      const data = await response.json()

      if (data.success) {
        setConversations(data.conversations)
      }
    } catch (error) {
      console.error('Erro ao carregar conversas:', error)
      toast.error('Erro ao carregar conversas')
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getChatTypeLabel = (type: string) => {
    switch (type) {
      case 'diagnostic':
        return 'Diagnóstico'
      case 'programa_rns':
        return 'Programa RNS'
      case 'eligibility_chat':
      case 'eligibility': // Compatibilidade com registros antigos
        return 'Elegibilidade'
      default:
        return type
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Ativa</Badge>
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Completa</Badge>
      case 'abandoned':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Abandonada</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Conversas com Agente IA</h1>
        <p className="text-muted-foreground">Histórico de todas as conversas geradas pelo agente</p>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtros
          </CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Tipo de Chat</label>
            <Select value={chatTypeFilter} onValueChange={setChatTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Selecionar tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="diagnostic">Diagnóstico</SelectItem>
                <SelectItem value="programa_rns">Programa RNS</SelectItem>
                <SelectItem value="eligibility_chat">Elegibilidade</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Status</label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Selecionar status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Ativa</SelectItem>
                <SelectItem value="completed">Completa</SelectItem>
                <SelectItem value="abandoned">Abandonada</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total de Conversas</p>
                <p className="text-2xl font-bold">{conversations.length}</p>
              </div>
              <MessageSquare className="w-8 h-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Diagnóstico</p>
                <p className="text-2xl font-bold">
                  {conversations.filter(c => c.chat_type === 'diagnostic').length}
                </p>
              </div>
              <MessageSquare className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Programa RNS</p>
                <p className="text-2xl font-bold">
                  {conversations.filter(c => c.chat_type === 'programa_rns').length}
                </p>
              </div>
              <MessageSquare className="w-8 h-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Elegibilidade</p>
                <p className="text-2xl font-bold">
                  {conversations.filter(c => c.chat_type === 'eligibility_chat' || c.chat_type === 'eligibility').length}
                </p>
              </div>
              <MessageSquare className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de conversas */}
      <Card>
        <CardHeader>
          <CardTitle>Conversas Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              Carregando conversas...
            </div>
          ) : conversations.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Nenhuma conversa encontrada
            </div>
          ) : (
            <div className="space-y-3">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className="p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedConversation(conversation)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="outline">{getChatTypeLabel(conversation.chat_type)}</Badge>
                        {getStatusBadge(conversation.status)}
                        {conversation.user_name && (
                          <span className="text-sm font-medium flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {conversation.user_name}
                          </span>
                        )}
                        {conversation.user_email && (
                          <span className="text-sm text-muted-foreground flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {conversation.user_email}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Início: {formatDate(conversation.started_at)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Última msg: {formatDate(conversation.last_message_at)}
                        </span>
                        <span>
                          {conversation.messages.length} mensagens
                        </span>
                      </div>
                      {conversation.ip_address && (
                        <div className="text-xs text-muted-foreground">
                          IP: {conversation.ip_address}
                        </div>
                      )}
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal de detalhes da conversa */}
      <Dialog open={!!selectedConversation} onOpenChange={() => setSelectedConversation(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle>Detalhes da Conversa</DialogTitle>
          </DialogHeader>
          {selectedConversation && (
            <div className="space-y-4">
              {/* Info da conversa */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg text-sm">
                <div>
                  <span className="font-medium">Tipo:</span> {getChatTypeLabel(selectedConversation.chat_type)}
                </div>
                <div>
                  <span className="font-medium">Status:</span> {getStatusBadge(selectedConversation.status)}
                </div>
                {selectedConversation.user_name && (
                  <div>
                    <span className="font-medium">Nome:</span> {selectedConversation.user_name}
                  </div>
                )}
                {selectedConversation.user_email && (
                  <div>
                    <span className="font-medium">Email:</span> {selectedConversation.user_email}
                  </div>
                )}
                <div>
                  <span className="font-medium">Início:</span> {formatDate(selectedConversation.started_at)}
                </div>
                <div>
                  <span className="font-medium">Última msg:</span> {formatDate(selectedConversation.last_message_at)}
                </div>
                {selectedConversation.ip_address && (
                  <div>
                    <span className="font-medium">IP:</span> {selectedConversation.ip_address}
                  </div>
                )}
                <div>
                  <span className="font-medium">Mensagens:</span> {selectedConversation.messages.length}
                </div>
              </div>

              {/* Mensagens */}
              <div>
                <h4 className="font-medium mb-3">Histórico da Conversa</h4>
                <ScrollArea className="h-[400px] border rounded-lg p-4">
                  <div className="space-y-4">
                    {selectedConversation.messages.map((msg, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-lg ${
                          msg.role === 'user'
                            ? 'bg-[hsl(0,0%,15%)] text-white ml-8'
                            : 'bg-muted mr-8'
                        }`}
                      >
                        <div className="text-xs font-medium mb-1 opacity-70">
                          {msg.role === 'user' ? 'Utilizador' : 'Assistente'}
                        </div>
                        <ReactMarkdown className="text-sm prose prose-sm max-w-none">
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Metadata */}
              {selectedConversation.metadata && (
                <div>
                  <h4 className="font-medium mb-2">Metadata</h4>
                  <pre className="text-xs bg-muted p-3 rounded overflow-auto max-h-32">
                    {JSON.stringify(selectedConversation.metadata, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
