interface UploadSessionResponse {
  session_id: number
  upload_url: string
  max_part_size: number
  max_file_size: number
}

interface UploadCompleteResponse {
  uuid: string
  version_uuid: string
  name: string
  size: number
  id: number
  metadata: {
    extension: string
    mime_type: string
  }
}

/**
 * Obtém o domínio do drive do Kommo
 */
async function getDriveDomain(token: string, accountDomain: string): Promise<string> {
  console.log('Buscando drive domain...')

  const accountResponse = await fetch(`https://${accountDomain}/api/v4/account?with=drive_url`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  })

  if (!accountResponse.ok) {
    throw new Error(`Erro ao buscar informações da conta: ${accountResponse.status}`)
  }

  const accountData = await accountResponse.json()
  const driveUrl = accountData.drive_url || accountData._embedded?.drive_url

  if (!driveUrl) {
    console.log('Account data:', JSON.stringify(accountData, null, 2))
    throw new Error('Drive URL não encontrada na resposta da API')
  }

  // Extrair domínio da URL (ex: https://drive-c.kommo.com/v1.0/files -> drive-c.kommo.com)
  const driveDomain = new URL(driveUrl).hostname
  console.log('Drive domain encontrado:', driveDomain)

  return driveDomain
}

/**
 * Faz upload de um arquivo PDF para o Kommo CRM
 * @param pdfBuffer - Buffer do PDF
 * @param fileName - Nome do arquivo
 * @param token - Token de acesso do Kommo
 * @param accountDomain - Domínio da conta (ex: clinicadentariavitoria.kommo.com)
 * @returns UUID do arquivo no Kommo
 */
export async function uploadPDFToKommo(
  pdfBuffer: Buffer,
  fileName: string,
  token: string,
  accountDomain: string = 'clinicadentariavitoria.kommo.com'
): Promise<string> {
  console.log('=== UPLOAD PDF PARA KOMMO ===')
  console.log('Tamanho do arquivo:', pdfBuffer.length, 'bytes')
  console.log('Nome do arquivo:', fileName)
  console.log('Token (primeiros 20 chars):', token.substring(0, 20) + '...')

  // PASSO 0: Obter drive domain
  const DRIVE_DOMAIN = await getDriveDomain(token, accountDomain)

  // PASSO 1: Criar sessão de upload
  console.log('Passo 1: Criando sessão de upload...')
  console.log('URL completa:', `https://${DRIVE_DOMAIN}/v1.0/sessions`)

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
    const responseText = await sessionResponse.text()
    console.error('Erro ao criar sessão - Status:', sessionResponse.status)
    console.error('Response Headers:', JSON.stringify(Object.fromEntries(sessionResponse.headers.entries()), null, 2))
    console.error('Response Body:', responseText.substring(0, 500))
    throw new Error(`Erro ao criar sessão de upload (${sessionResponse.status}): ${responseText.substring(0, 200)}`)
  }

  const responseText = await sessionResponse.text()
  console.log('Session Response:', responseText.substring(0, 500))

  let sessionData: UploadSessionResponse
  try {
    sessionData = JSON.parse(responseText)
  } catch (parseError) {
    console.error('Erro ao fazer parse do JSON:', parseError)
    console.error('Response completo:', responseText)
    throw new Error('Resposta da API não é JSON válido')
  }
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

  const uploadResultText = await uploadResponse.text()
  console.log('Upload response completo:', uploadResultText.substring(0, 500))

  let uploadResult: UploadCompleteResponse
  try {
    uploadResult = JSON.parse(uploadResultText)
  } catch (error) {
    console.error('Erro ao fazer parse do upload result')
    throw new Error('Upload response não é JSON válido')
  }

  console.log('Upload concluído!')
  console.log('Upload result completo:', JSON.stringify(uploadResult, null, 2))
  console.log('File UUID extraído:', uploadResult.uuid)
  console.log('File ID:', uploadResult.id)

  return uploadResult.uuid
}

/**
 * Anexa um arquivo ao lead no Kommo
 * @param fileUuid - UUID do arquivo no Kommo
 * @param leadId - ID do lead
 * @param token - Token de acesso do Kommo
 * @param accountDomain - Domínio da conta
 */
export async function attachFileToLead(
  fileUuid: string,
  leadId: number,
  token: string,
  accountDomain: string = 'clinicadentariavitoria.kommo.com'
): Promise<void> {
  console.log('=== ANEXANDO ARQUIVO AO LEAD ===')
  console.log('File UUID recebido:', fileUuid)
  console.log('Type do UUID:', typeof fileUuid)
  console.log('Lead ID:', leadId)

  // Endpoint correto: /api/v4/leads/{id}/files (não é no drive domain)
  const attachUrl = `https://${accountDomain}/api/v4/leads/${leadId}/files`
  console.log('Attach URL:', attachUrl)

  // Testar diferentes formatos de body
  const requestBody = {
    file_uuid: fileUuid
  }

  console.log('Request body:', JSON.stringify(requestBody, null, 2))

  const attachResponse = await fetch(attachUrl, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })

  if (!attachResponse.ok) {
    const error = await attachResponse.json()
    console.error('Erro ao anexar arquivo:', JSON.stringify(error, null, 2))
    throw new Error(`Erro ao anexar arquivo ao lead: ${JSON.stringify(error)}`)
  }

  console.log('Arquivo anexado ao lead com sucesso!')
}
