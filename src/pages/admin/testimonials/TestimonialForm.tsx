import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, Save, Star } from 'lucide-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'
import { ImageUploader } from '@/components/editor/ImageUploader'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const formSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  text: z.string().min(20, 'Depoimento deve ter pelo menos 20 caracteres'),
  role: z.string().min(3, 'Cargo/função é obrigatório'),
  rating: z.number().min(1).max(5).default(5),
  avatarGender: z.enum(['male', 'female']).default('female'),
  avatarSeed: z.number().min(0).max(100).default(42),
  customAvatar: z.string().optional(),
  featured: z.boolean().default(false),
})

type FormValues = z.infer<typeof formSchema>

export default function TestimonialForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEditing = !!id
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      text: '',
      role: '',
      rating: 5,
      avatarGender: 'female',
      avatarSeed: 42,
      customAvatar: '',
      featured: false,
    },
  })

  // Load existing testimonial data if editing
  useEffect(() => {
    if (isEditing) {
      const loadTestimonial = async () => {
        setIsLoading(true)
        try {
          const response = await fetch(`/api/testimonials/${id}`)
          if (!response.ok) throw new Error('Falha ao carregar depoimento')
          const data = await response.json()

          form.reset({
            name: data.name,
            text: data.text,
            role: data.role,
            rating: data.rating || 5,
            avatarGender: data.avatarGender || 'female',
            avatarSeed: data.avatarSeed || 42,
            customAvatar: data.customAvatar || '',
            featured: !!data.featured,
          })
        } catch (error) {
          toast.error('Erro ao carregar depoimento')
          navigate('/admin/testimonials')
        } finally {
          setIsLoading(false)
        }
      }
      loadTestimonial()
    }
  }, [id, isEditing, navigate, form])

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    try {
      const endpoint = isEditing
        ? `/api/testimonials/${id}`
        : '/api/testimonials'
      const method = isEditing ? 'PUT' : 'POST'

      const response = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          featured: data.featured ? 1 : 0,
        }),
      })

      if (!response.ok) throw new Error('Falha ao salvar depoimento')

      toast.success(
        isEditing
          ? 'Depoimento atualizado com sucesso!'
          : 'Depoimento criado com sucesso!',
      )
      navigate('/admin/testimonials')
    } catch (error) {
      toast.error('Erro ao salvar depoimento')
    } finally {
      setIsLoading(false)
    }
  }

  const watchedRating = form.watch('rating')

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link to="/admin/testimonials">
            <ArrowLeft className="w-5 h-5" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {isEditing ? 'Editar Depoimento' : 'Novo Depoimento'}
          </h1>
          <p className="text-muted-foreground">
            Adicione ou edite depoimentos de profissionais.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações do Depoimento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome do Profissional</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Ex: Dra. Ana Ferreira"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cargo/Especialidade · Cidade</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Dentista · Porto" {...field} />
                        </FormControl>
                        <FormDescription>
                          Formato: Profissão · Localização
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Depoimento</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Escreva o depoimento completo..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          O texto do depoimento que aparecerá no site
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Avaliação</FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => field.onChange(star)}
                                  className="focus:outline-none transition-transform hover:scale-110"
                                >
                                  <Star
                                    className={`w-8 h-8 ${
                                      star <= watchedRating
                                        ? 'fill-yellow-400 text-yellow-400'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                </button>
                              ))}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {watchedRating}{' '}
                              {watchedRating === 1 ? 'estrela' : 'estrelas'}
                            </p>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Avatar</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="customAvatar"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Foto Personalizada (Opcional)</FormLabel>
                        <FormControl>
                          <ImageUploader
                            onImageSelect={field.onChange}
                            currentImage={field.value || ''}
                            label="Upload de Foto"
                            aspectRatio="aspect-square"
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          Se não enviar foto, será usado avatar gerado
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="border-t pt-4 space-y-4">
                    <p className="text-sm font-medium text-muted-foreground">
                      Configurações do Avatar Gerado
                    </p>

                    <FormField
                      control={form.control}
                      name="avatarGender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Género</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="female">Feminino</SelectItem>
                              <SelectItem value="male">Masculino</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="avatarSeed"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Variação do Avatar (0-100)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min="0"
                              max="100"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value) || 0)
                              }
                            />
                          </FormControl>
                          <FormDescription className="text-xs">
                            Altere para gerar diferentes avatares
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Destaque</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="featured"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Depoimento em Destaque
                          </FormLabel>
                          <FormDescription>
                            Aparece na página inicial
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Button
                type="submit"
                size="lg"
                className="w-full"
                disabled={isLoading}
              >
                <Save className="w-4 h-4 mr-2" />
                {isLoading
                  ? 'Salvando...'
                  : isEditing
                    ? 'Salvar Alterações'
                    : 'Criar Depoimento'}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
