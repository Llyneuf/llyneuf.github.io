import { parseFrontmatter } from './projectContent'

const devlogContentFiles = import.meta.glob('../content/devlog/**/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
})

function hasField(frontmatter, key) {
  return Object.prototype.hasOwnProperty.call(frontmatter, key)
}

function field(frontmatter, key, fallback = '') {
  return hasField(frontmatter, key) ? frontmatter[key] : fallback
}

function parseDate(date) {
  const [day, month, year] = date.split('-')
  return `${year}-${month}-${day}`
}

const devlogContent = Object.entries(devlogContentFiles).reduce((contentBySlug, [path, content]) => {
  const match = path.match(/\/([^/]+)\/([a-z]{2})\.md$/)

  if (!match) {
    return contentBySlug
  }

  const [, folder, language] = match
  const parsed = parseFrontmatter(content)

  contentBySlug[folder] = {
    ...(contentBySlug[folder] ?? {}),
    folder,
    [language]: parsed,
  }

  return contentBySlug
}, {})

function getLocalizedPost(entry, language) {
  return entry[language] ?? entry.en ?? entry.ru
}

export function getDevlogPosts(language) {
  return Object.entries(devlogContent)
    .map(([folder, entry]) => {
      const content = getLocalizedPost(entry, language)
      const frontmatter = content?.data ?? {}
      const date = field(frontmatter, 'date', entry.folder)
      const slug = field(frontmatter, 'slug', folder)

      return {
        slug,
        date,
        sortDate: parseDate(date),
        cardTitle: field(frontmatter, 'cardTitle', slug),
        cardType: field(frontmatter, 'cardType', ''),
        cardSummary: field(frontmatter, 'cardSummary', ''),
        cardImage: field(frontmatter, 'cardImage', ''),
        cardImageAlt: field(frontmatter, 'cardImageAlt', ''),
        cardImageFit: field(frontmatter, 'cardImageFit', 'cover'),
        cardImagePosition: field(frontmatter, 'cardImagePosition', 'center'),
        cardImageScale: field(frontmatter, 'cardImageScale', '1'),
        pageTitle: field(frontmatter, 'pageTitle', field(frontmatter, 'cardTitle', slug)),
        pageType: field(frontmatter, 'pageType', field(frontmatter, 'cardType', '')),
        pageImage: field(frontmatter, 'pageImage', ''),
        pageImageAlt: field(frontmatter, 'pageImageAlt', ''),
        pageImageFit: field(frontmatter, 'pageImageFit', 'cover'),
        pageImagePosition: field(frontmatter, 'pageImagePosition', 'center'),
        pageImageScale: field(frontmatter, 'pageImageScale', '1'),
        pageMarkdown: content?.body ?? '',
      }
    })
    .sort((a, b) => b.sortDate.localeCompare(a.sortDate))
}
