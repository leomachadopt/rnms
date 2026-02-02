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
