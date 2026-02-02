interface UploadSessionResponse {
  session_id: number
  upload_url: string
  max_part_size: number
  max_file_size: number
}

interface UploadCompleteResponse {
  file_uuid: string
  file_name: string
  file_size: number
}

/**
 * Faz upload de um arquivo PDF para o Kommo CRM
 * @param pdfBuffer - Buffer do PDF
 * @param fileName - Nome do arquivo
 * @param token - Token de acesso do Kommo
 * @returns UUID do arquivo no Kommo
 */
export async function uploadPDFToKommo(
  pdfBuffer: Buffer,
  fileName: string,
  token: string
): Promise<string> {
  const DRIVE_DOMAIN = 'clinicadentariavitoria.kommo.com'

  console.log('=== UPLOAD PDF PARA KOMMO ===')
  console.log('Tamanho do arquivo:', pdfBuffer.length, 'bytes')
  console.log('Nome do arquivo:', fileName)

  // PASSO 1: Criar sessão de upload
  console.log('Passo 1: Criando sessão de upload...')

  const sessionResponse = await fetch(`https://${DRIVE_DOMAIN}/v1.0/sessions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      file_name: fileName,
      file_size: pdfBuffer.length,
      content_type: 'application/pdf',
      with_preview: true, // Gerar preview do PDF
    }),
  })

  if (!sessionResponse.ok) {
    const error = await sessionResponse.json()
    console.error('Erro ao criar sessão:', JSON.stringify(error, null, 2))
    throw new Error(`Erro ao criar sessão de upload: ${JSON.stringify(error)}`)
  }

  const sessionData: UploadSessionResponse = await sessionResponse.json()
  console.log('Sessão criada:', sessionData.session_id)
  console.log('Upload URL:', sessionData.upload_url)
  console.log('Max part size:', sessionData.max_part_size)

  // PASSO 2: Upload do arquivo
  // Se o arquivo for menor que max_part_size, enviamos tudo de uma vez
  // Caso contrário, precisamos dividir em partes
  console.log('Passo 2: Fazendo upload do arquivo...')

  const uploadResponse = await fetch(sessionData.upload_url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/pdf',
    },
    body: pdfBuffer,
  })

  if (!uploadResponse.ok) {
    const error = await uploadResponse.json()
    console.error('Erro ao fazer upload:', JSON.stringify(error, null, 2))
    throw new Error(`Erro ao fazer upload do arquivo: ${JSON.stringify(error)}`)
  }

  const uploadResult: UploadCompleteResponse = await uploadResponse.json()
  console.log('Upload concluído!')
  console.log('File UUID:', uploadResult.file_uuid)

  return uploadResult.file_uuid
}

/**
 * Anexa um arquivo ao lead no Kommo
 * @param fileUuid - UUID do arquivo no Kommo
 * @param leadId - ID do lead
 * @param token - Token de acesso do Kommo
 */
export async function attachFileToLead(
  fileUuid: string,
  leadId: number,
  token: string
): Promise<void> {
  const DRIVE_DOMAIN = 'clinicadentariavitoria.kommo.com'

  console.log('=== ANEXANDO ARQUIVO AO LEAD ===')
  console.log('File UUID:', fileUuid)
  console.log('Lead ID:', leadId)

  const attachResponse = await fetch(`https://${DRIVE_DOMAIN}/v1.0/files/attached-to-entity`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      file_uuid: fileUuid,
      entity_type: 'lead',
      entity_id: leadId,
    }),
  })

  if (!attachResponse.ok) {
    const error = await attachResponse.json()
    console.error('Erro ao anexar arquivo:', JSON.stringify(error, null, 2))
    throw new Error(`Erro ao anexar arquivo ao lead: ${JSON.stringify(error)}`)
  }

  console.log('Arquivo anexado ao lead com sucesso!')
}
