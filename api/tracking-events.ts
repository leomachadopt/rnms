/**
 * API endpoint para gerenciar eventos de tracking
 * CRUD de tracking_events
 */

import type { VercelRequest, VercelResponse } from '@vercel/node'
import { db } from './db/client'
import { trackingEvents } from './db/schema'
import { desc, eq, and, gte, lte, sql } from 'drizzle-orm'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { method } = req

  try {
    switch (method) {
      case 'GET':
        return await handleGet(req, res)
      case 'POST':
        return await handlePost(req, res)
      default:
        res.setHeader('Allow', ['GET', 'POST'])
        return res.status(405).json({ error: `Method ${method} not allowed` })
    }
  } catch (error: any) {
    console.error('[Tracking Events API] Error:', error)
    return res.status(500).json({ error: error.message })
  }
}

/**
 * GET - Lista eventos de tracking com filtros
 */
async function handleGet(req: VercelRequest, res: VercelResponse) {
  const {
    limit = '50',
    offset = '0',
    eventName,
    utmSource,
    utmCampaign,
    startDate,
    endDate,
  } = req.query

  try {
    const conditions: any[] = []

    if (eventName) {
      conditions.push(eq(trackingEvents.eventName, eventName as string))
    }

    if (utmSource) {
      conditions.push(eq(trackingEvents.utmSource, utmSource as string))
    }

    if (utmCampaign) {
      conditions.push(eq(trackingEvents.utmCampaign, utmCampaign as string))
    }

    if (startDate) {
      conditions.push(gte(trackingEvents.createdAt, new Date(startDate as string)))
    }

    if (endDate) {
      conditions.push(lte(trackingEvents.createdAt, new Date(endDate as string)))
    }

    const whereClause = conditions.length > 0 ? and(...conditions) : undefined

    const events = await db
      .select()
      .from(trackingEvents)
      .where(whereClause)
      .orderBy(desc(trackingEvents.createdAt))
      .limit(parseInt(limit as string))
      .offset(parseInt(offset as string))

    const totalResult = await db
      .select({ count: sql<number>`count(*)` })
      .from(trackingEvents)
      .where(whereClause)

    const total = Number(totalResult[0]?.count || 0)

    return res.status(200).json({
      events,
      pagination: {
        total,
        limit: parseInt(limit as string),
        offset: parseInt(offset as string),
      },
    })
  } catch (error: any) {
    console.error('[Tracking Events] GET error:', error)
    return res.status(500).json({ error: error.message })
  }
}

/**
 * POST - Cria novo evento de tracking
 */
async function handlePost(req: VercelRequest, res: VercelResponse) {
  const {
    eventName,
    eventId,
    userFingerprint,
    fbp,
    fbc,
    utmSource,
    utmMedium,
    utmCampaign,
    utmContent,
    utmTerm,
    ipAddress,
    userAgent,
    referrer,
    eventData,
    evaluationId,
  } = req.body

  if (!eventName) {
    return res.status(400).json({ error: 'eventName is required' })
  }

  try {
    const [newEvent] = await db
      .insert(trackingEvents)
      .values({
        eventName,
        eventId,
        userFingerprint,
        fbp,
        fbc,
        utmSource,
        utmMedium,
        utmCampaign,
        utmContent,
        utmTerm,
        ipAddress,
        userAgent,
        referrer,
        eventData,
        evaluationId,
      })
      .returning()

    return res.status(201).json(newEvent)
  } catch (error: any) {
    console.error('[Tracking Events] POST error:', error)
    return res.status(500).json({ error: error.message })
  }
}
