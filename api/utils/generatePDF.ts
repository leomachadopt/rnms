interface PDFData {
  childName: string
  parentName?: string
  age: string
  phone: string
  report: string
  date?: Date
}

export async function generateReportPDF(data: PDFData): Promise<Buffer> {
  return new Promise(async (resolve, reject) => {
    try {
      // Dynamic import para compatibilidade com Vercel
      const PDFDocument = (await import('pdfkit')).default

      const doc = new PDFDocument({
        size: 'A4',
        margins: {
          top: 50,
          bottom: 50,
          left: 50,
          right: 50,
        },
      })

      const chunks: Buffer[] = []

      doc.on('data', (chunk) => chunks.push(chunk))
      doc.on('end', () => resolve(Buffer.concat(chunks)))
      doc.on('error', reject)

      // Cabeçalho
      doc
        .fontSize(20)
        .font('Helvetica-Bold')
        .text('Relatório de Avaliação', { align: 'center' })
        .moveDown(0.5)

      doc
        .fontSize(16)
        .font('Helvetica-Bold')
        .fillColor('#2563eb')
        .text('Respiração Oral', { align: 'center' })
        .moveDown(1.5)

      // Linha separadora
      doc
        .strokeColor('#e5e7eb')
        .lineWidth(1)
        .moveTo(50, doc.y)
        .lineTo(545, doc.y)
        .stroke()
        .moveDown(1)

      // Dados do paciente
      doc.fontSize(12).font('Helvetica-Bold').fillColor('#000000').text('Dados do Paciente')
      doc.moveDown(0.5)

      doc.fontSize(10).font('Helvetica')

      if (data.parentName) {
        doc.text(`Responsável: ${data.parentName}`)
      }
      doc.text(`Nome da Criança: ${data.childName}`)
      doc.text(`Idade: ${data.age}`)
      doc.text(`Telefone: ${data.phone}`)
      if (data.date) {
        doc.text(
          `Data da Avaliação: ${new Date(data.date).toLocaleDateString('pt-PT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })}`
        )
      }

      doc.moveDown(1.5)

      // Linha separadora
      doc
        .strokeColor('#e5e7eb')
        .lineWidth(1)
        .moveTo(50, doc.y)
        .lineTo(545, doc.y)
        .stroke()
        .moveDown(1)

      // Relatório
      doc.fontSize(12).font('Helvetica-Bold').text('Relatório Detalhado')
      doc.moveDown(0.5)

      // Processar o relatório removendo markdown e formatando
      const reportLines = data.report.split('\n')

      reportLines.forEach((line) => {
        // Remover markdown
        let cleanLine = line
          .replace(/#{1,6}\s/g, '') // Remove headers
          .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
          .replace(/\*(.*?)\*/g, '$1') // Remove italic
          .trim()

        if (!cleanLine) {
          doc.moveDown(0.3)
          return
        }

        // Detectar títulos (linhas que terminam com :)
        const isTitle = cleanLine.endsWith(':') || cleanLine.match(/^[A-Z\s]+:?$/)

        if (isTitle) {
          // Verificar se precisa de nova página
          if (doc.y > 700) {
            doc.addPage()
          }

          doc
            .fontSize(11)
            .font('Helvetica-Bold')
            .fillColor('#1f2937')
            .text(cleanLine, {
              continued: false,
            })
          doc.moveDown(0.3)
        } else {
          // Verificar se precisa de nova página
          if (doc.y > 720) {
            doc.addPage()
          }

          doc
            .fontSize(10)
            .font('Helvetica')
            .fillColor('#374151')
            .text(cleanLine, {
              align: 'justify',
              continued: false,
            })
          doc.moveDown(0.2)
        }
      })

      // Adicionar texto padrão complementar
      doc.moveDown(2)

      // Verificar se precisa de nova página
      if (doc.y > 650) {
        doc.addPage()
      }

      // Linha separadora antes do texto padrão
      doc
        .strokeColor('#e5e7eb')
        .lineWidth(1)
        .moveTo(50, doc.y)
        .lineTo(545, doc.y)
        .stroke()
        .moveDown(1)

      // Título da seção complementar
      doc
        .fontSize(14)
        .font('Helvetica-Bold')
        .fillColor('#2563eb')
        .text('Avaliação pelo Método Respira e Cresce 360º', { align: 'center' })
        .moveDown(0.3)

      doc
        .fontSize(12)
        .font('Helvetica-Bold')
        .fillColor('#1f2937')
        .text('O que é e como funciona na prática', { align: 'center' })
        .moveDown(1)

      // Conteúdo padrão
      const standardText = `Os sinais identificados neste relatório indicam a necessidade de uma avaliação mais aprofundada, com o objetivo de compreender a causa real das alterações observadas e não apenas os seus efeitos. É neste contexto que se enquadra a consulta de avaliação pelo Método Respira e Cresce 360º.

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

Com base nos sinais identificados neste relatório, recomendamos o agendamento da consulta de avaliação pelo Método Respira e Cresce 360º. Esta avaliação permitirá esclarecer dúvidas, confirmar os achados clínicos e definir, de forma personalizada, o melhor caminho para apoiar o desenvolvimento saudável da criança.`

      const standardLines = standardText.split('\n')

      standardLines.forEach((line) => {
        const cleanLine = line.trim()

        if (!cleanLine) {
          doc.moveDown(0.3)
          return
        }

        // Verificar se precisa de nova página
        if (doc.y > 720) {
          doc.addPage()
        }

        // Detectar títulos
        const isMainTitle = cleanLine.match(/^(O que acontece|Qual é o objetivo|Próximo passo)/)
        const isNumberedTitle = cleanLine.match(/^\d+\. /)

        if (isMainTitle) {
          doc
            .fontSize(12)
            .font('Helvetica-Bold')
            .fillColor('#1f2937')
            .text(cleanLine, {
              continued: false,
            })
          doc.moveDown(0.4)
        } else if (isNumberedTitle) {
          doc
            .fontSize(11)
            .font('Helvetica-Bold')
            .fillColor('#1f2937')
            .text(cleanLine, {
              continued: false,
            })
          doc.moveDown(0.3)
        } else {
          doc
            .fontSize(10)
            .font('Helvetica')
            .fillColor('#374151')
            .text(cleanLine, {
              align: 'justify',
              continued: false,
            })
          doc.moveDown(0.2)
        }
      })

      // CTA final destacado
      doc.moveDown(1)

      // Verificar se precisa de nova página para o CTA
      if (doc.y > 700) {
        doc.addPage()
      }

      doc
        .fontSize(11)
        .font('Helvetica-Bold')
        .fillColor('#2563eb')
        .text('>> Agende a consulta de avaliação e obtenha uma visão completa, integrada e fundamentada sobre a respiração, o crescimento e o funcionamento do seu filho.', {
          align: 'justify',
          continued: false,
        })

      // Rodapé
      doc.moveDown(2)
      doc
        .strokeColor('#e5e7eb')
        .lineWidth(1)
        .moveTo(50, doc.y)
        .lineTo(545, doc.y)
        .stroke()
        .moveDown(0.5)

      doc
        .fontSize(8)
        .font('Helvetica')
        .fillColor('#6b7280')
        .text('Este relatório foi gerado automaticamente pelo sistema de avaliação Respiração Oral.', {
          align: 'center',
        })
        .text('Para mais informações, visite: https://respiracaooral.pt', {
          align: 'center',
          link: 'https://respiracaooral.pt',
        })

      // Finalizar documento
      doc.end()
    } catch (error) {
      reject(error)
    }
  })
}
