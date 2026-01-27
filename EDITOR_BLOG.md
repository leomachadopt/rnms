# 📝 Editor de Blog - Guia Completo

## Visão Geral

O editor de blog foi completamente renovado para proporcionar uma experiência profissional similar ao WordPress, com recursos avançados de edição e formatação de conteúdo.

## 🚀 Novas Funcionalidades

### 1. **Editor Rico (WYSIWYG)**
- Editor visual com formatação em tempo real
- Baseado no TipTap (framework moderno e extensível)
- Interface intuitiva similar ao WordPress/Medium

### 2. **Toolbar Completo de Formatação**

#### Controles Básicos
- **Desfazer/Refazer**: Histórico completo de alterações
- **Títulos**: H1, H2, H3 (hierarquia de títulos)
- **Formatação de Texto**:
  - Negrito
  - Itálico
  - Sublinhado
  - Tachado
  - Destacar (highlight)
  - Código inline

#### Alinhamento
- Alinhar à esquerda
- Centralizar
- Alinhar à direita
- Justificar

#### Listas e Citações
- Lista não ordenada (bullets)
- Lista ordenada (numerada)
- Citações (blockquotes)
- Blocos de código com syntax highlighting

#### Inserir Mídia
- **Links**: Adicionar/remover links com popup dedicado
- **Imagens**: Inserir imagens inline via URL

### 3. **Upload de Imagens**

#### Imagem de Capa
- Upload direto para Vercel Blob Storage
- Drag & drop ou clique para selecionar
- Preview em tempo real
- Limite de 5MB por imagem
- Formatos suportados: PNG, JPG, WebP
- Aspect ratio automático (16:9)

#### Imagens no Conteúdo
- Inserir imagens via URL no editor rico
- Upload para CDN
- Redimensionamento automático
- Lazy loading

### 4. **Preview do Post**
- Botão "Visualizar" no canto superior direito
- Modal em tela cheia com preview exato do artigo
- Visualize como o post aparecerá antes de publicar

### 5. **Otimização SEO Avançada**
- **Slug automático**: Gerado automaticamente do título
- **Title Tag personalizado**: Para resultados de busca
- **Meta Description**: Com contador de caracteres recomendado
- **Palavra-chave de foco**: Para otimização de conteúdo

## 📐 Layout do Editor

### Coluna Principal (2/3)
1. **Card de Conteúdo**
   - Título do artigo
   - Resumo (excerpt)
   - Editor rico com todas as ferramentas

2. **Card de SEO** (fundo azul)
   - Slug
   - Título SEO
   - Meta Description
   - Keywords

### Sidebar (1/3)
1. **Card de Imagem de Capa**
   - Upload com drag & drop
   - Preview da imagem
   - Opções de trocar/remover

2. **Card de Detalhes**
   - Categoria (dropdown)
   - Autor

3. **Botão de Publicar/Salvar** (sticky)

## 💡 Como Usar

### Criar um Novo Artigo

1. Acesse **Admin → Blog → Novo Artigo**
2. Preencha o título (o slug será gerado automaticamente)
3. Faça upload da imagem de capa
4. Escreva o resumo para os cards de preview
5. Use o editor rico para escrever o conteúdo:
   - Selecione texto e clique nos botões da toolbar
   - Use atalhos de teclado (Ctrl/Cmd + B para negrito, etc.)
   - Insira links clicando no ícone de corrente
   - Adicione imagens clicando no ícone de foto
6. Configure os campos de SEO
7. Clique em "Visualizar" para ver o preview
8. Clique em "Publicar Artigo"

### Editar um Artigo Existente

1. Acesse **Admin → Blog**
2. Clique em "Editar" no artigo desejado
3. Faça as alterações necessárias
4. Clique em "Salvar Alterações"

## 🎨 Recursos de Design

### Sintaxe de Código
- Syntax highlighting para blocos de código
- Suporte para múltiplas linguagens
- Visual profissional com temas

### Citações
- Estilo visual destacado
- Borda à esquerda colorida
- Background diferenciado

### Imagens
- Arredondamento automático
- Sombras suaves
- Responsivas (100% da largura)
- Espaçamento adequado

## 🔧 Tecnologias Utilizadas

- **TipTap**: Editor WYSIWYG moderno
- **Lowlight**: Syntax highlighting para código
- **Vercel Blob**: Storage para imagens
- **React Hook Form + Zod**: Validação de formulários
- **Shadcn/UI**: Componentes de interface

## 📱 Compatibilidade

- ✅ Desktop (experiência completa)
- ✅ Tablet (layout adaptativo)
- ✅ Mobile (interface simplificada)

## 🚦 Validações

### Campos Obrigatórios
- Título (mínimo 5 caracteres)
- Categoria
- Autor
- Imagem de capa
- Resumo (mínimo 10 caracteres)
- Conteúdo (mínimo 20 caracteres)
- Slug (formato válido)

### Formato do Slug
- Apenas letras minúsculas
- Números permitidos
- Hífens para separar palavras
- Sem espaços ou caracteres especiais

## 💾 Armazenamento

### Conteúdo HTML
- O conteúdo é salvo como HTML no banco de dados
- Renderização segura no frontend
- Suporte total a formatação rica

### Imagens
- Armazenadas no Vercel Blob Storage
- URLs públicas e permanentes
- CDN global para carregamento rápido
- Backup automático

## 🔐 Segurança

- Validação de tipos de arquivo no upload
- Limite de tamanho (5MB)
- Sanitização de HTML no backend
- URLs seguras para imagens

## 📊 Melhorias vs Versão Anterior

| Recurso | Antes | Agora |
|---------|-------|-------|
| Editor | Textarea simples | Editor WYSIWYG completo |
| Imagens | Query para API externa | Upload direto + CDN |
| Formatação | Texto plano | HTML rico com estilos |
| Preview | ❌ Não disponível | ✅ Modal de preview |
| Links | ❌ Não suportado | ✅ Links clicáveis |
| Listas | ❌ Texto manual | ✅ Listas formatadas |
| Código | ❌ Sem destaque | ✅ Syntax highlighting |
| Títulos | ❌ Texto normal | ✅ Hierarquia H1-H6 |

## 🎯 Próximos Passos Sugeridos

1. **Galeria de Mídia**: Biblioteca de imagens reutilizáveis
2. **Auto-save**: Salvamento automático como rascunho
3. **Colaboração**: Múltiplos editores
4. **Versionamento**: Histórico de versões do artigo
5. **Agendamento**: Publicar posts em datas específicas
6. **Tags**: Sistema de tags além de categorias
7. **Estatísticas**: Analytics de visualizações por post

## 🐛 Troubleshooting

### Imagem não faz upload
- Verifique o tamanho (máximo 5MB)
- Confirme que é uma imagem (PNG, JPG, WebP)
- Verifique sua conexão com internet
- Verifique se BLOB_READ_WRITE_TOKEN está configurado

### Editor não aparece
- Limpe o cache do navegador
- Verifique o console para erros
- Recarregue a página

### Formatação não salva
- Certifique-se de clicar em "Salvar" ou "Publicar"
- Verifique se não há erros de validação
- Teste com conteúdo simples primeiro

## 📞 Suporte

Para dúvidas ou problemas, consulte a documentação do TipTap: https://tiptap.dev/docs
