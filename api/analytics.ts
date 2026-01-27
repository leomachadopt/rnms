/**
 * API endpoint para analytics e métricas
 * Retorna dados agregados para dashboard
 */

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { db } from './db/client'
import { trackingEvents, evaluations } from './db/schema'
import { sql, desc, and, gte, lte, eq, count, isNotNull } from 'drizzle-orm'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { method } = req

  if (method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ error: `Method ${method} not allowed` })
  }

  const { type, startDate, endDate } = req.query

  try {
    switch (type) {
      case 'overview':
        return await getOverview(req, res, startDate as string, endDate as string)
      case 'traffic-sources':
        return await getTrafficSources(req, res, startDate as string, endDate as string)
      case 'campaigns':
        return await getCampaigns(req, res, startDate as string, endDate as string)
      case 'funnel':
        return await getFunnel(req, res, startDate as string, endDate as string)
      case 'timeline':
        return await getTimeline(req, res, startDate as string, endDate as string)
      default:
        return res.status(400).json({ error: 'Invalid type parameter' })
    }
  } catch (error: any) {
    console.error('[Analytics API] Error:', error)
    return res.status(500).json({ error: error.message })
  }
}

/**
 * Visão geral das métricas principais
 */
async function getOverview(
  req: VercelRequest,
  res: VercelResponse,
  startDate?: string,
  endDate?: string
) {
  const dateConditions = buildDateConditions(startDate, endDate)

  // Total de PageViews
  const pageViewsResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(trackingEvents)
    .where(
      and(
        eq(trackingEvents.eventName, 'PageView'),
        dateConditions ? dateConditions : undefined
      )
    )

  // Total de Leads
  const leadsResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(trackingEvents)
    .where(
      and(
        eq(trackingEvents.eventName, 'Lead'),
        dateConditions ? dateConditions : undefined
      )
    )

  // Total de CompleteRegistration
  const completedResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(trackingEvents)
    .where(
      and(
        eq(trackingEvents.eventName, 'CompleteRegistration'),
        dateConditions ? dateConditions : undefined
      )
    )

  // Visitantes únicos (por fingerprint)
  const uniqueVisitorsResult = await db
    .selectDistinct({ userFingerprint: trackingEvents.userFingerprint })
    .from(trackingEvents)
    .where(
      and(
        isNotNull(trackingEvents.userFingerprint),
        dateConditions ? dateConditions : undefined
      )
    )

  const pageViews = Number(pageViewsResult[0]?.count || 0)
  const leads = Number(leadsResult[0]?.count || 0)
  const completed = Number(completedResult[0]?.count || 0)
  const uniqueVisitors = uniqueVisitorsResult.length

  // Taxa de conversão
  const conversionRate = uniqueVisitors > 0 ? (leads / uniqueVisitors) * 100 : 0

  return res.status(200).json({
    pageViews,
    uniqueVisitors,
    leads,
    completed,
    conversionRate: Math.round(conversionRate * 100) / 100,
  })
}

/**
 * Fontes de tráfego (UTM Source)
 */
async function getTrafficSources(
  req: VercelRequest,
  res: VercelResponse,
  startDate?: string,
  endDate?: string
) {
  const dateConditions = buildDateConditions(startDate, endDate)

  const sources = await db
    .select({
      source: sql<string>`COALESCE(${trackingEvents.utmSource}, 'direct')`,
      visitors: sql<number>`COUNT(DISTINCT ${trackingEvents.userFingerprint})`,
      pageViews: sql<number>`COUNT(*)`,
    })
    .from(trackingEvents)
    .where(and(
      eq(trackingEvents.eventName, 'PageView'),
      dateConditions ? dateConditions : undefined
    ))
    .groupBy(sql`COALESCE(${trackingEvents.utmSource}, 'direct')`)
    .orderBy(desc(sql`COUNT(*)`))

  return res.status(200).json({ sources })
}

/**
 * Performance por campanha
 */
async function getCampaigns(
  req: VercelRequest,
  res: VercelResponse,
  startDate?: string,
  endDate?: string
) {
  const dateConditions = buildDateConditions(startDate, endDate)

  // Busca campanhas com leads
  const campaignsData = await db
    .select({
      campaign: sql<string>`COALESCE(${evaluations.utmCampaign}, 'direct')`,
      source: sql<string>`COALESCE(${evaluations.utmSource}, 'direct')`,
      leads: sql<number>`COUNT(*)`,
    })
    .from(evaluations)
    .where(dateConditions ? buildDateConditions(startDate, endDate, evaluations.createdAt) : undefined)
    .groupBy(sql`COALESCE(${evaluations.utmCampaign}, 'direct'), COALESCE(${evaluations.utmSource}, 'direct')`)
    .orderBy(desc(sql`COUNT(*)`))

  // Busca visitantes por campanha
  const visitorsData = await db
    .select({
      campaign: sql<string>`COALESCE(${trackingEvents.utmCampaign}, 'direct')`,
      visitors: sql<number>`COUNT(DISTINCT ${trackingEvents.userFingerprint})`,
    })
    .from(trackingEvents)
    .where(
      and(
        eq(trackingEvents.eventName, 'PageView'),
        dateConditions ? dateConditions : undefined
      )
    )
    .groupBy(sql`COALESCE(${trackingEvents.utmCampaign}, 'direct')`)

  // Combina dados
  const campaigns = campaignsData.map((camp) => {
    const visitorData = visitorsData.find((v) => v.campaign === camp.campaign)
    const visitors = Number(visitorData?.visitors || 0)
    const leads = Number(camp.leads)
    const conversionRate = visitors > 0 ? (leads / visitors) * 100 : 0

    return {
      campaign: camp.campaign,
      source: camp.source,
      visitors,
      leads,
      conversionRate: Math.round(conversionRate * 100) / 100,
    }
  })

  return res.status(200).json({ campaigns })
}

/**
 * Funil de conversão
 */
async function getFunnel(
  req: VercelRequest,
  res: VercelResponse,
  startDate?: string,
  endDate?: string
) {
  const dateConditions = buildDateConditions(startDate, endDate)

  const steps = [
    { name: 'PageView', label: 'Visitantes' },
    { name: 'Lead', label: 'Iniciaram Avaliação' },
    { name: 'CompleteRegistration', label: 'Completaram Avaliação' },
  ]

  const funnelData = await Promise.all(
    steps.map(async (step) => {
      const result = await db
        .select({
          count: sql<number>`COUNT(DISTINCT ${trackingEvents.userFingerprint})`,
        })
        .from(trackingEvents)
        .where(
          and(
            eq(trackingEvents.eventName, step.name),
            dateConditions ? dateConditions : undefined
          )
        )

      return {
        step: step.label,
        count: Number(result[0]?.count || 0),
      }
    })
  )

  return res.status(200).json({ funnel: funnelData })
}

/**
 * Timeline de eventos
 */
async function getTimeline(
  req: VercelRequest,
  res: VercelResponse,
  startDate?: string,
  endDate?: string
) {
  const dateConditions = buildDateConditions(startDate, endDate)

  const timeline = await db
    .select({
      date: sql<string>`DATE(${trackingEvents.createdAt})`,
      eventName: trackingEvents.eventName,
      count: sql<number>`COUNT(*)`,
    })
    .from(trackingEvents)
    .where(dateConditions ? dateConditions : undefined)
    .groupBy(sql`DATE(${trackingEvents.createdAt}), ${trackingEvents.eventName}`)
    .orderBy(sql`DATE(${trackingEvents.createdAt})`)

  return res.status(200).json({ timeline })
}

/**
 * Helper para construir condições de data
 */
function buildDateConditions(startDate?: string, endDate?: string, column = trackingEvents.createdAt) {
  const conditions: any[] = []

  if (startDate) {
    conditions.push(gte(column, new Date(startDate)))
  }

  if (endDate) {
    conditions.push(lte(column, new Date(endDate)))
  }

  return conditions.length > 0 ? and(...conditions) : undefined
}
