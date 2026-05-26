import { createServer } from 'node:http'
import { readFile, readdir, writeFile } from 'node:fs/promises'
import { extname, join, normalize, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import process from 'node:process'
import { Buffer } from 'node:buffer'

const __dirname = fileURLToPath(new URL('.', import.meta.url))
const rootDir = resolve(__dirname, '../..')
const editorDir = resolve(__dirname, 'static')
const projectContentDir = resolve(rootDir, 'src/content/projects')
const publicDir = resolve(rootDir, 'public')
const port = Number.parseInt(process.env.PORT ?? '5174', 10)
const supportedLanguages = ['ru', 'en', 'es']
const defaultLanguage = 'ru'

const textTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.md', 'text/markdown; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.webp', 'image/webp'],
  ['.ico', 'image/x-icon'],
])

function send(res, statusCode, body, headers = {}) {
  res.writeHead(statusCode, headers)
  res.end(body)
}

function sendJson(res, statusCode, data) {
  send(res, statusCode, JSON.stringify(data), {
    'Content-Type': 'application/json; charset=utf-8',
  })
}

function isInside(parent, child) {
  const path = relative(parent, child)
  return path && !path.startsWith('..') && !path.startsWith('/') && !path.includes('..\\')
}

function isProjectSlug(slug) {
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return false
  }

  return true
}

function getProjectPath(slug, language = defaultLanguage) {
  if (!isProjectSlug(slug) || !supportedLanguages.includes(language)) {
    return null
  }

  const filePath = resolve(projectContentDir, slug, `${language}.md`)
  return isInside(projectContentDir, filePath) ? filePath : null
}

function parseScalar(value) {
  const trimmed = value.trim()

  if (!trimmed) {
    return ''
  }

  if (trimmed === '[]') {
    return []
  }

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1)
  }

  return trimmed
}

function parseFrontmatter(markdown) {
  const normalized = markdown.trim()

  if (!normalized.startsWith('---\n') && !normalized.startsWith('---\r\n')) {
    return {
      data: {},
      body: normalized,
    }
  }

  const match = normalized.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)

  if (!match) {
    return {
      data: {},
      body: normalized,
    }
  }

  const data = {}
  const lines = match[1].split(/\r?\n/)
  let currentArrayKey = null

  lines.forEach((line) => {
    if (!line.trim()) {
      return
    }

    const listItemMatch = line.match(/^\s*-\s+(.+)$/)

    if (listItemMatch && currentArrayKey) {
      if (!Array.isArray(data[currentArrayKey])) {
        data[currentArrayKey] = []
      }

      data[currentArrayKey].push(parseScalar(listItemMatch[1]))
      return
    }

    const fieldMatch = line.match(/^([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/)

    if (!fieldMatch) {
      currentArrayKey = null
      return
    }

    const [, key, rawValue] = fieldMatch

    if (!rawValue.trim()) {
      data[key] = ''
      currentArrayKey = key
      return
    }

    data[key] = parseScalar(rawValue)
    currentArrayKey = null
  })

  return {
    data,
    body: match[2].trim(),
  }
}

function yamlValue(value) {
  if (Array.isArray(value)) {
    return value
  }

  if (value === '') {
    return ''
  }

  const text = String(value)
  if (/[:#\n\r]|^\s|\s$|^[-?{}[\],&*!|>'"%@`]|^(true|false|null|~|\d+(\.\d+)?)$/i.test(text)) {
    return JSON.stringify(text)
  }

  return text
}

function serializeProject(data, body) {
  const orderedKeys = [
    'cardTitle',
    'cardStatus',
    'cardSummary',
    'cardProgress',
    'cardImage',
    'cardImageAlt',
    'cardTags',
    'cardDetails',
    'pageTitle',
    'pageStatus',
    'pageSummary',
    'pageProgress',
    'pageImage',
    'pageImageAlt',
    'pageTags',
  ]
  const extraKeys = Object.keys(data).filter((key) => !orderedKeys.includes(key)).sort()
  const keys = [...orderedKeys, ...extraKeys].filter((key) => Object.prototype.hasOwnProperty.call(data, key))
  const lines = ['---']

  keys.forEach((key) => {
    const value = data[key]

    if (Array.isArray(value)) {
      if (value.length === 0) {
        lines.push(`${key}: []`)
        return
      }

      lines.push(`${key}:`)
      value.forEach((item) => {
        lines.push(`  - ${yamlValue(item)}`)
      })
      return
    }

    lines.push(`${key}: ${yamlValue(value)}`)
  })

  lines.push('---', '', body.trim(), '')
  return lines.join('\n')
}

async function readRequestBody(req) {
  const chunks = []

  for await (const chunk of req) {
    chunks.push(chunk)
  }

  return Buffer.concat(chunks).toString('utf-8')
}

async function serveStatic(res, pathname) {
  const publicFilePath = resolve(publicDir, `.${normalize(pathname)}`)

  if (isInside(publicDir, publicFilePath)) {
    try {
      const content = await readFile(publicFilePath)
      send(res, 200, content, {
        'Content-Type': textTypes.get(extname(publicFilePath).toLowerCase()) ?? 'application/octet-stream',
      })
      return
    } catch {
      // Fall through to editor assets.
    }
  }

  const cleanPath = pathname === '/' ? '/index.html' : pathname
  const filePath = resolve(editorDir, `.${normalize(cleanPath)}`)

  if (!isInside(editorDir, filePath)) {
    send(res, 403, 'Forbidden')
    return
  }

  try {
    const content = await readFile(filePath)
    send(res, 200, content, {
      'Content-Type': textTypes.get(extname(filePath).toLowerCase()) ?? 'application/octet-stream',
    })
  } catch {
    send(res, 404, 'Not found')
  }
}

async function listProjects(res) {
  const entries = await readdir(projectContentDir, { withFileTypes: true })
  const projects = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory() && isProjectSlug(entry.name))
      .map((entry) => entry.name)
      .sort()
      .map(async (slug) => {
        const projectDir = join(projectContentDir, slug)
        const files = await readdir(projectDir)
        const languages = files
          .filter((file) => file.endsWith('.md'))
          .map((file) => file.replace(/\.md$/, ''))
          .filter((language) => supportedLanguages.includes(language))
          .sort((a, b) => supportedLanguages.indexOf(a) - supportedLanguages.indexOf(b))
        const previewLanguage = languages.includes(defaultLanguage) ? defaultLanguage : languages[0]
        const content = await readFile(join(projectDir, `${previewLanguage}.md`), 'utf-8')
        const { data } = parseFrontmatter(content)

        return {
          slug,
          languages,
          title: data.cardTitle || data.pageTitle || data.title || slug,
          status: data.cardStatus || data.pageStatus || data.status || '',
        }
      }),
  )

  sendJson(res, 200, { projects })
}

async function getProject(res, slug, language = defaultLanguage) {
  const filePath = getProjectPath(slug, language)

  if (!filePath) {
    sendJson(res, 400, { error: 'Invalid project slug or language.' })
    return
  }

  try {
    const raw = await readFile(filePath, 'utf-8')
    const parsed = parseFrontmatter(raw)
    sendJson(res, 200, {
      slug,
      language,
      raw,
      data: parsed.data,
      body: parsed.body,
    })
  } catch {
    sendJson(res, 404, { error: 'Project language file not found.' })
  }
}

async function saveProject(req, res, slug, language = defaultLanguage) {
  const filePath = getProjectPath(slug, language)

  if (!filePath) {
    sendJson(res, 400, { error: 'Invalid project slug or language.' })
    return
  }

  try {
    const payload = JSON.parse(await readRequestBody(req))
    const nextContent = serializeProject(payload.data ?? {}, payload.body ?? '')
    await writeFile(filePath, nextContent, 'utf-8')
    sendJson(res, 200, {
      ok: true,
      slug,
      language,
      savedAt: new Date().toISOString(),
    })
  } catch (error) {
    sendJson(res, 400, {
      error: error instanceof Error ? error.message : 'Could not save project.',
    })
  }
}

async function listAssets(res) {
  const files = await readdir(publicDir)
  const assets = files
    .filter((file) => ['.png', '.jpg', '.jpeg', '.webp', '.svg'].includes(extname(file).toLowerCase()))
    .sort()
    .map((file) => `/${file}`)

  sendJson(res, 200, { assets })
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', `http://${req.headers.host}`)
  const pathname = url.pathname

  try {
    if (req.method === 'GET' && pathname === '/api/projects') {
      await listProjects(res)
      return
    }

    if (req.method === 'GET' && pathname === '/api/assets') {
      await listAssets(res)
      return
    }

    const projectMatch = pathname.match(/^\/api\/projects\/([a-z0-9-]+)(?:\/([a-z]{2}))?$/)

    if (projectMatch && req.method === 'GET') {
      await getProject(res, projectMatch[1], projectMatch[2] ?? defaultLanguage)
      return
    }

    if (projectMatch && req.method === 'PUT') {
      await saveProject(req, res, projectMatch[1], projectMatch[2] ?? defaultLanguage)
      return
    }

    if (req.method === 'GET') {
      await serveStatic(res, pathname)
      return
    }

    sendJson(res, 405, { error: 'Method not allowed.' })
  } catch (error) {
    sendJson(res, 500, {
      error: error instanceof Error ? error.message : 'Internal server error.',
    })
  }
})

server.listen(port, () => {
  console.log(`Llyneuf content editor: http://localhost:${port}`)
})
