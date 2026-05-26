const projectContentFiles = import.meta.glob('../content/projects/**/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
})

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

export function parseFrontmatter(markdown) {
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

export const projectContent = Object.entries(projectContentFiles).reduce((contentBySlug, [path, content]) => {
    const nestedMatch = path.match(/\/([^/]+)\/([a-z]{2})\.md$/)
    const flatMatch = path.match(/\/([^/]+)\.md$/)
    const slug = nestedMatch?.[1] ?? flatMatch?.[1]
    const language = nestedMatch?.[2] ?? 'ru'

    if (!slug) {
      return contentBySlug
    }

  contentBySlug[slug] = {
    ...(contentBySlug[slug] ?? {}),
      [language]: parseFrontmatter(content),
  }

  return contentBySlug
}, {})
