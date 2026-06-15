import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { uiText } from '../src/data/i18n.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const projectRoot = join(__dirname, '..')
const distDir = join(projectRoot, 'dist')
const sitemapPath = join(distDir, 'sitemap.xml')
const indexPath = join(distDir, 'index.html')
const siteOrigin = 'https://llyneuf.xyz'
const supportedLanguages = ['ru', 'en', 'es']
const defaultLanguage = 'ru'
const defaultImage = `${siteOrigin}/og-image.png`

const homeDescriptions = {
  ru: 'Личный хаб Llyneuf: проекты, devlog, стримы, ссылки и творческая работа с играми, VTubing, 3D и вебом.',
  en: 'Personal hub for Llyneuf projects, devlog, streams, links and creative work across games, VTubing, 3D and web.',
  es: 'Hub personal de Llyneuf para proyectos, devlog, streams, enlaces y trabajo creativo entre juegos, VTubing, 3D y web.',
}

const sitemap = readFileSync(sitemapPath, 'utf8')
const indexHtml = readFileSync(indexPath, 'utf8')
const routePaths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)]
  .map((match) => match[1])
  .filter((url) => url.startsWith(siteOrigin))
  .map((url) => new URL(url).pathname)
  .filter((pathname) => pathname !== '/')

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
    return {}
  }

  const match = normalized.match(/^---\r?\n([\s\S]*?)\r?\n---/)

  if (!match) {
    return {}
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

  return data
}

function getFrontmatter(contentType, slug, language) {
  const contentDir = join(projectRoot, 'src', 'content', contentType, slug)
  const fallbackLanguages = [...new Set([language, 'en', 'ru'])]

  for (const item of fallbackLanguages) {
    const contentPath = join(contentDir, `${item}.md`)

    if (existsSync(contentPath)) {
      return parseFrontmatter(readFileSync(contentPath, 'utf8'))
    }
  }

  return {}
}

function normalizeLanguagePath(language, pagePath = '/') {
  const normalizedPagePath = pagePath.startsWith('/') ? pagePath : `/${pagePath}`
  const path = `/${language}${normalizedPagePath}`.replace(/\/+$/, '/')

  if (normalizedPagePath === '/') {
    return `/${language}/`
  }

  return path.endsWith('/') ? path.slice(0, -1) : path
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function getMetadata(pathname) {
  const segments = pathname.split('/').filter(Boolean)
  const language = supportedLanguages.includes(segments[0]) ? segments[0] : defaultLanguage
  const pathSegments = supportedLanguages.includes(segments[0]) ? segments.slice(1) : segments
  const pagePath = pathSegments.length > 0 ? `/${pathSegments.join('/')}` : '/'
  const canonicalPath = normalizeLanguagePath(language, pagePath)
  const t = uiText[language] ?? uiText.ru
  const alternates = supportedLanguages.map((item) => ({
    language: item,
    href: `${siteOrigin}${normalizeLanguagePath(item, pagePath)}`,
  }))

  if (pathSegments[0] === 'projects' && pathSegments[1]) {
    const frontmatter = getFrontmatter('projects', pathSegments[1], language)
    const title = frontmatter.pageTitle || frontmatter.cardTitle || pathSegments[1]
    const description =
      frontmatter.pageSummary || frontmatter.cardSummary || `${title} project page on the Llyneuf site.`
    const image = frontmatter.pageImage || frontmatter.cardImage || defaultImage

    return {
      language,
      title: `${title} | Llyneuf`,
      description,
      url: `${siteOrigin}${canonicalPath}`,
      image: image.startsWith('http') ? image : `${siteOrigin}${image}`,
      alternates,
    }
  }

  if (pathSegments[0] === 'devlog' && pathSegments[1]) {
    const frontmatter = getFrontmatter('devlog', pathSegments[1], language)
    const title = frontmatter.pageTitle || frontmatter.cardTitle || pathSegments[1]
    const description = frontmatter.pageSummary || frontmatter.cardSummary || t.devlogHubDescription
    const image = frontmatter.pageImage || frontmatter.cardImage || defaultImage

    return {
      language,
      title: `${title} | Llyneuf`,
      description,
      url: `${siteOrigin}${canonicalPath}`,
      image: image.startsWith('http') ? image : `${siteOrigin}${image}`,
      alternates,
    }
  }

  if (pathSegments[0] === 'projects') {
    return {
      language,
      title: `${t.allProjects} | Llyneuf`,
      description: t.projectsHubDescription,
      url: `${siteOrigin}${canonicalPath}`,
      image: defaultImage,
      alternates,
    }
  }

  if (pathSegments[0] === 'devlog') {
    return {
      language,
      title: `${t.devlogHubTitle} | Llyneuf`,
      description: t.devlogHubDescription,
      url: `${siteOrigin}${canonicalPath}`,
      image: defaultImage,
      alternates,
    }
  }

  return {
    language,
    title: 'Llyneuf',
    description: homeDescriptions[language] ?? homeDescriptions.ru,
    url: `${siteOrigin}${canonicalPath}`,
    image: defaultImage,
    alternates,
  }
}

function replaceMeta(html, selector, value) {
  return html.replace(selector, (_, start) => `${start}${escapeHtml(value)}"`)
}

function renderRouteHtml(html, metadata) {
  let output = html
    .replace(/<html lang="[^"]*">/, `<html lang="${metadata.language}">`)
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(metadata.title)}</title>`)

  output = replaceMeta(output, /(<link rel="canonical" href=")[^"]*"/, metadata.url)
  output = replaceMeta(output, /(<meta\s+name="description"\s+content=")[^"]*"/, metadata.description)
  output = replaceMeta(output, /(<meta property="og:title" content=")[^"]*"/, metadata.title)
  output = replaceMeta(output, /(<meta\s+property="og:description"\s+content=")[^"]*"/, metadata.description)
  output = replaceMeta(output, /(<meta property="og:url" content=")[^"]*"/, metadata.url)
  output = replaceMeta(output, /(<meta property="og:image" content=")[^"]*"/, metadata.image)
  output = replaceMeta(output, /(<meta name="twitter:title" content=")[^"]*"/, metadata.title)
  output = replaceMeta(output, /(<meta\s+name="twitter:description"\s+content=")[^"]*"/, metadata.description)
  output = replaceMeta(output, /(<meta name="twitter:image" content=")[^"]*"/, metadata.image)

  metadata.alternates.forEach((alternate) => {
    output = replaceMeta(
      output,
      new RegExp(`(<link rel="alternate" hreflang="${alternate.language}" href=")[^"]*"`),
      alternate.href,
    )
  })

  output = replaceMeta(output, /(<link rel="alternate" hreflang="x-default" href=")[^"]*"/, metadata.alternates[0].href)

  return output
}

routePaths.forEach((pathname) => {
  const routeDir = join(distDir, pathname.replace(/^\/+|\/+$/g, ''))
  const routeHtml = renderRouteHtml(indexHtml, getMetadata(pathname))

  mkdirSync(routeDir, { recursive: true })
  writeFileSync(join(routeDir, 'index.html'), routeHtml)
})

console.log(`Generated ${routePaths.length} static route entries.`)
