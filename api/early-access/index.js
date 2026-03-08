const { TableClient } = require('@azure/data-tables')
const { EmailClient } = require('@azure/communication-email')
const crypto = require('crypto')

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const VALID_TEAM_COUNTS = ['1-5', '6-10', '11-20', '20+']
const MAX_BODY_BYTES = 8 * 1024 // 8 KB
const EMAIL_RETRY_ATTEMPTS = 2
const EMAIL_RETRY_DELAY_MS = 1000

// Rate limit: per-IP sliding window (in-memory, resets on cold start)
const rateLimitMap = new Map()
const RATE_LIMIT_WINDOW_MS = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5

// Duplicate protection: per-email cooldown
const recentEmails = new Map()
const DUPLICATE_COOLDOWN_MS = 60 * 1000 // 1 minute

// Stricter email regex — requires 2+ char TLD, no consecutive dots
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})+$/

// ---------------------------------------------------------------------------
// Rate limiting (in-memory, per function instance)
// ---------------------------------------------------------------------------

function isRateLimited(ip) {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry) {
    rateLimitMap.set(ip, { count: 1, windowStart: now })
    return false
  }

  if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now })
    return false
  }

  entry.count++
  return entry.count > RATE_LIMIT_MAX_REQUESTS
}

// ---------------------------------------------------------------------------
// Duplicate protection
// ---------------------------------------------------------------------------

function isDuplicateEmail(email) {
  const normalised = email.trim().toLowerCase()
  const now = Date.now()
  const lastSeen = recentEmails.get(normalised)

  if (lastSeen && now - lastSeen < DUPLICATE_COOLDOWN_MS) {
    return true
  }

  recentEmails.set(normalised, now)
  return false
}

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

function validate(body) {
  const errors = []

  if (!body || typeof body !== 'object') {
    return ['Request body must be a JSON object']
  }

  if (!body.name || typeof body.name !== 'string' || !body.name.trim()) {
    errors.push('name is required')
  } else if (body.name.trim().length > 200) {
    errors.push('name must be 200 characters or fewer')
  }

  if (!body.clubName || typeof body.clubName !== 'string' || !body.clubName.trim()) {
    errors.push('clubName is required')
  } else if (body.clubName.trim().length > 200) {
    errors.push('clubName must be 200 characters or fewer')
  }

  if (!body.email || typeof body.email !== 'string' || !body.email.trim()) {
    errors.push('email is required')
  } else if (!EMAIL_REGEX.test(body.email.trim())) {
    errors.push('email must be a valid email address')
  }

  if (!body.teamCount || !VALID_TEAM_COUNTS.includes(body.teamCount)) {
    errors.push(`teamCount must be one of: ${VALID_TEAM_COUNTS.join(', ')}`)
  }

  if (body.message !== undefined && body.message !== null) {
    if (typeof body.message !== 'string') {
      errors.push('message must be a string')
    } else if (body.message.length > 2000) {
      errors.push('message must be 2000 characters or fewer')
    }
  }

  return errors
}

// ---------------------------------------------------------------------------
// Table Storage – persist the lead
// ---------------------------------------------------------------------------

async function storeLead(body) {
  const connectionString = process.env.STORAGE_CONNECTION_STRING
  if (!connectionString) {
    throw new Error('STORAGE_CONNECTION_STRING is not configured')
  }

  const client = TableClient.fromConnectionString(connectionString, 'EarlyAccessLeads')
  const now = new Date()

  const entity = {
    partitionKey: `${now.getUTCFullYear()}${String(now.getUTCMonth() + 1).padStart(2, '0')}`,
    rowKey: crypto.randomUUID(),
    name: body.name.trim(),
    clubName: body.clubName.trim(),
    email: body.email.trim().toLowerCase(),
    teamCount: body.teamCount,
    message: (body.message || '').trim(),
    createdUtc: now.toISOString(),
  }

  await client.createEntity(entity)
  return entity
}

// ---------------------------------------------------------------------------
// Email notification via Azure Communication Services (with retry)
// ---------------------------------------------------------------------------

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function sendNotification(entity, logger) {
  const connectionString = process.env.ACS_EMAIL_CONNECTION_STRING
  const senderAddress = process.env.ACS_EMAIL_FROM
  const recipientAddress = process.env.ACS_EMAIL_TO

  if (!connectionString || !senderAddress || !recipientAddress) {
    logger.warn('Email environment variables not configured – skipping notification')
    return
  }

  const emailClient = new EmailClient(connectionString)

  const htmlBody = `
    <h2>New MatchdayOS Early Access Signup</h2>
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      <tr><td style="padding:6px 12px;font-weight:bold;">Name</td><td style="padding:6px 12px;">${escapeHtml(entity.name)}</td></tr>
      <tr><td style="padding:6px 12px;font-weight:bold;">Club</td><td style="padding:6px 12px;">${escapeHtml(entity.clubName)}</td></tr>
      <tr><td style="padding:6px 12px;font-weight:bold;">Email</td><td style="padding:6px 12px;"><a href="mailto:${escapeHtml(entity.email)}">${escapeHtml(entity.email)}</a></td></tr>
      <tr><td style="padding:6px 12px;font-weight:bold;">Team Count</td><td style="padding:6px 12px;">${escapeHtml(entity.teamCount)}</td></tr>
      <tr><td style="padding:6px 12px;font-weight:bold;">Message</td><td style="padding:6px 12px;">${escapeHtml(entity.message || '—')}</td></tr>
    </table>
    <p style="margin-top:16px;font-size:12px;color:#888;">Submitted ${entity.createdUtc}</p>
  `

  const plainText = [
    'New MatchdayOS Early Access Signup',
    '',
    `Name:       ${entity.name}`,
    `Club:       ${entity.clubName}`,
    `Email:      ${entity.email}`,
    `Team Count: ${entity.teamCount}`,
    `Message:    ${entity.message || '—'}`,
    '',
    `Submitted ${entity.createdUtc}`,
  ].join('\n')

  const message = {
    senderAddress,
    recipients: { to: [{ address: recipientAddress }] },
    content: {
      subject: 'New MatchdayOS Early Access Signup',
      html: htmlBody,
      plainText,
    },
  }

  let lastError
  for (let attempt = 1; attempt <= EMAIL_RETRY_ATTEMPTS; attempt++) {
    try {
      const poller = await emailClient.beginSend(message)
      await poller.pollUntilDone()
      logger.info(`Email notification sent for ${entity.rowKey}`)
      return
    } catch (err) {
      lastError = err
      logger.warn(`Email attempt ${attempt}/${EMAIL_RETRY_ATTEMPTS} failed for ${entity.rowKey}: ${err.message}`)
      if (attempt < EMAIL_RETRY_ATTEMPTS) {
        await sleep(EMAIL_RETRY_DELAY_MS * attempt)
      }
    }
  }

  logger.error(`Email notification failed after ${EMAIL_RETRY_ATTEMPTS} attempts for ${entity.rowKey}: ${lastError.message}`)
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

const ALLOWED_ORIGINS = ['https://matchdayos.com', 'https://www.matchdayos.com']

const NO_CACHE_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
}

module.exports = async function (context, req) {
  // --- Origin check (skip in local dev where origin may be localhost) ---
  const origin = req.headers.origin
  if (origin && !ALLOWED_ORIGINS.includes(origin) && !origin.startsWith('http://localhost')) {
    context.res = {
      status: 403,
      headers: NO_CACHE_HEADERS,
      body: { error: 'Forbidden' },
    }
    return
  }

  // --- Content-Type check ---
  const contentType = (req.headers['content-type'] || '').split(';')[0].trim()
  if (contentType !== 'application/json') {
    context.res = {
      status: 415,
      headers: NO_CACHE_HEADERS,
      body: { error: 'Content-Type must be application/json' },
    }
    return
  }

  // --- Payload size check ---
  const rawBody = JSON.stringify(req.body || '')
  if (Buffer.byteLength(rawBody, 'utf8') > MAX_BODY_BYTES) {
    context.res = {
      status: 413,
      headers: NO_CACHE_HEADERS,
      body: { error: 'Request payload too large' },
    }
    return
  }

  // --- Rate limiting ---
  const clientIp = (req.headers['x-forwarded-for'] || req.headers['client-ip'] || 'unknown').split(',')[0].trim()
  if (isRateLimited(clientIp)) {
    context.res = {
      status: 429,
      headers: { ...NO_CACHE_HEADERS, 'Retry-After': '60' },
      body: { error: 'Too many requests. Please try again in a minute.' },
    }
    return
  }

  // --- Validation ---
  const body = req.body
  const errors = validate(body)

  if (errors.length > 0) {
    context.res = {
      status: 400,
      headers: NO_CACHE_HEADERS,
      body: { error: 'Validation failed' },
    }
    return
  }

  // --- Duplicate protection ---
  if (isDuplicateEmail(body.email)) {
    context.res = {
      status: 409,
      headers: NO_CACHE_HEADERS,
      body: { error: 'This email was submitted recently. Please wait before trying again.' },
    }
    return
  }

  // --- Store and notify ---
  try {
    const entity = await storeLead(body)
    context.log.info(`Lead stored: ${entity.rowKey} (${entity.clubName})`)

    // Email with retry — don't block the response
    sendNotification(entity, context.log).catch((err) => {
      context.log.error('Unhandled email error:', err.message)
    })

    context.res = {
      status: 200,
      headers: NO_CACHE_HEADERS,
      body: { success: true, message: 'Thank you for registering your interest.' },
    }
  } catch (err) {
    context.log.error('Failed to store lead:', err.message)
    context.res = {
      status: 500,
      headers: NO_CACHE_HEADERS,
      body: { error: 'Something went wrong. Please try again later.' },
    }
  }
}
