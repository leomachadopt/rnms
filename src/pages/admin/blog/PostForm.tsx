import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, Save, Globe, Eye } from 'lucide-react'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import useAppStore from '@/stores/useAppStore'
import { BlogPost } from '@/types'
import { slugify } from '@/lib/utils'
import { RichTextEditor } from '@/components/editor/RichTextEditor'
import { ImageUploader } from '@/components/editor/ImageUploader'
import ReactMarkdown from 'react-markdown'

const formSchema = z.object({
  title: z.string().min(5, 'Título deve ter pelo menos 5 caracteres'),
  category: z.string().min(2, 'Categoria é obrigatória'),
  author: z.string().min(2, 'Autor é obrigatório'),
  image: z.string().min(2, 'Imagem de capa é obrigatória'),
  excerpt: z.string().min(10, 'Resumo deve ter pelo menos 10 caracteres'),
  content: z.string().min(20, 'Conteúdo deve ter pelo menos 20 caracteres'),
  // SEO Fields
  slug: z
    .string()
    .min(3, 'Slug obrigatório')
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Slug inválido (use letras minúsculas e hífens)',
    ),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  seoKeywords: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function PostForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { blogPosts, addBlogPost, updateBlogPost } = useAppStore()
  const isEditing = !!id
  const [showPreview, setShowPreview] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      category: '',
      author: '',
      image: '',
      excerpt: '',
      content: '',
      slug: '',
      seoTitle: '',
      seoDescription: '',
      seoKeywords: '',
    },
  })

  useEffect(() => {
    if (isEditing) {
      const post = blogPosts.find((p) => p.id === Number(id))
      if (post) {
        form.reset({
          title: post.title,
          category: post.category,
          author: post.author,
          image: post.image,
          excerpt: post.excerpt,
          content: post.content,
          slug: post.slug,
          seoTitle: post.seoTitle || '',
          seoDescription: post.seoDescription || '',
          seoKeywords: post.seoKeywords || '',
        })
      } else {
        navigate('/admin/blog')
      }
    }
  }, [id, isEditing, blogPosts, navigate, form])

  // Auto-generate slug from title if slug is empty
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value
    form.setValue('title', title)
    if (!form.getValues('slug')) {
      form.setValue('slug', slugify(title))
    }
  }

  const onSubmit = (data: FormValues) => {
    const postData: Omit<BlogPost, 'id'> = {
      ...data,
      date: isEditing
        ? blogPosts.find((p) => p.id === Number(id))?.date ||
          format(new Date(), 'dd MMM yyyy')
        : format(new Date(), 'dd MMM yyyy'),
    }

    if (isEditing) {
      updateBlogPost(Number(id), postData)
    } else {
      addBlogPost(postData)
    }
    navigate('/admin/blog')
  }

  const previewData = form.watch()

  return (
    <>
      <div className="max-w-7xl mx-auto space-y-6 animate-fade-in pb-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button asChild variant="ghost" size="icon">
              <Link to="/admin/blog">
                <ArrowLeft className="w-5 h-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {isEditing ? 'Editar Artigo' : 'Novo Artigo'}
              </h1>
              <p className="text-muted-foreground">
                Escreva e otimize seu conteúdo para o blog.
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowPreview(true)}
          >
            <Eye className="w-4 h-4 mr-2" />
            Visualizar
          </Button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Content Column */}
              <div className="lg:col-span-2 space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Conteúdo do Artigo</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Título do Artigo</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ex: A importância do sono..."
                              {...field}
                              onChange={handleTitleChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="excerpt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Resumo (Excerpt)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Um breve resumo para aparecer no card..."
                              className="min-h-[80px]"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Aparece nos cards de preview e nas redes sociais
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Conteúdo Completo</FormLabel>
                          <FormControl>
                            <RichTextEditor
                              content={field.value}
                              onChange={field.onChange}
                              placeholder="Comece a escrever seu artigo..."
                            />
                          </FormControl>
                          <FormDescription>
                            Use a barra de ferramentas para formatar o texto,
                            adicionar imagens, links e mais
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* SEO Section */}
                <Card className="border-blue-100 bg-blue-50/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-800">
                      <Globe className="w-5 h-5" />
                      Otimização SEO
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Slug (URL)</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <span className="text-sm text-muted-foreground bg-muted/50 px-3 py-2 border border-r-0 rounded-l-md whitespace-nowrap hidden sm:block">
                                /blog/
                              </span>
                              <Input
                                placeholder="titulo-do-artigo"
                                className="sm:rounded-l-none"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(slugify(e.target.value))
                                }
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            O identificador único do artigo na URL. Use apenas
                            letras minúsculas e hífens.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="seoTitle"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Título SEO (Title Tag)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Título que aparecerá no Google"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Deixe em branco para usar o título do artigo.
                            Recomendado: 50-60 caracteres.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="seoDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Meta Descrição</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Breve descrição para os resultados de busca..."
                              className="h-24"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Idealmente entre 140 e 160 caracteres.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="seoKeywords"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Palavra-chave de Foco</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Ex: respiração oral infantil"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Principal termo de busca para este artigo
                          </FormDescription>
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
                    <CardTitle className="text-base">Imagem de Capa</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="image"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <ImageUploader
                              onImageSelect={field.onChange}
                              currentImage={field.value}
                              label="Imagem Principal"
                              aspectRatio="aspect-video"
                            />
                          </FormControl>
                          <FormDescription className="mt-2">
                            Esta imagem aparecerá no topo do artigo e nos cards
                            de preview
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Detalhes</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Categoria</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Sintomas">Sintomas</SelectItem>
                              <SelectItem value="Educação">Educação</SelectItem>
                              <SelectItem value="Prevenção">
                                Prevenção
                              </SelectItem>
                              <SelectItem value="Tratamento">
                                Tratamento
                              </SelectItem>
                              <SelectItem value="Novidades">
                                Novidades
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="author"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Autor</FormLabel>
                          <FormControl>
                            <Input placeholder="Ex: Dra. Ana" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Button type="submit" size="lg" className="w-full sticky top-24">
                  <Save className="w-4 h-4 mr-2" />
                  {isEditing ? 'Salvar Alterações' : 'Publicar Artigo'}
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>

      {/* Preview Dialog */}
      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Preview do Artigo</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {previewData.image && (
              <div className="aspect-video w-full rounded-lg overflow-hidden">
                <img
                  src={previewData.image}
                  alt={previewData.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
                <span className="px-2 py-1 bg-primary/10 text-primary rounded-md">
                  {previewData.category || 'Categoria'}
                </span>
                <span>{previewData.author || 'Autor'}</span>
                <span>•</span>
                <span>{format(new Date(), 'dd MMM yyyy')}</span>
              </div>
              <h1 className="text-3xl font-bold mb-4">
                {previewData.title || 'Título do Artigo'}
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                {previewData.excerpt || 'Resumo do artigo...'}
              </p>
            </div>
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: previewData.content || '<p>Conteúdo do artigo...</p>' }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
