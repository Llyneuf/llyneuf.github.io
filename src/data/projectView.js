import { projectContent } from './projectContent'

export function hasFrontmatterField(frontmatter, key) {
  return Object.prototype.hasOwnProperty.call(frontmatter, key)
}

export function frontmatterOr(frontmatter, key, fallback) {
  return hasFrontmatterField(frontmatter, key) ? frontmatter[key] : fallback
}

export function getLocalizedProjectContent(project, language) {
  const contentGroup = projectContent[project.content ?? project.slug]
  return contentGroup?.[language] ?? contentGroup?.ru ?? contentGroup?.en
}

function arrayField(frontmatter, key, fallback = []) {
  if (!hasFrontmatterField(frontmatter, key)) {
    return fallback
  }

  return Array.isArray(frontmatter[key]) ? frontmatter[key] : []
}

function usesSplitProjectFields(frontmatter) {
  return Object.keys(frontmatter).some((key) => key.startsWith('card') || key.startsWith('page'))
}

export function getProjectCard(project, language) {
  const content = getLocalizedProjectContent(project, language)
  const frontmatter = content?.data ?? {}
  const splitFields = usesSplitProjectFields(frontmatter)

  if (splitFields) {
    return {
      title: frontmatterOr(frontmatter, 'cardTitle', project.title),
      status: frontmatterOr(frontmatter, 'cardStatus', ''),
      summary: frontmatterOr(frontmatter, 'cardSummary', ''),
      progress: frontmatterOr(frontmatter, 'cardProgress', ''),
      image: frontmatterOr(frontmatter, 'cardImage', ''),
      imageAlt: frontmatterOr(frontmatter, 'cardImageAlt', ''),
      tags: arrayField(frontmatter, 'cardTags'),
      details: arrayField(frontmatter, 'cardDetails'),
    }
  }

  const titleFallback = frontmatterOr(frontmatter, 'pageTitle', frontmatterOr(frontmatter, 'title', project.title))
  const statusFallback = frontmatterOr(frontmatter, 'pageStatus', frontmatterOr(frontmatter, 'status', project.status))
  const summaryFallback = frontmatterOr(
    frontmatter,
    'pageSummary',
    frontmatterOr(frontmatter, 'summary', project.pageSummary ?? project.summary),
  )
  const progressFallback = frontmatterOr(
    frontmatter,
    'pageProgress',
    frontmatterOr(frontmatter, 'progress', project.pageProgress ?? project.progress),
  )
  const imageFallback = frontmatterOr(frontmatter, 'pageImage', frontmatterOr(frontmatter, 'image', project.image))
  const imageAltFallback = frontmatterOr(
    frontmatter,
    'pageImageAlt',
    frontmatterOr(frontmatter, 'imageAlt', project.imageAlt),
  )
  const tagsFallback = hasFrontmatterField(frontmatter, 'pageTags')
    ? arrayField(frontmatter, 'pageTags')
    : arrayField(frontmatter, 'tags', project.tags)

  return {
    title: frontmatterOr(frontmatter, 'cardTitle', titleFallback),
    status: frontmatterOr(frontmatter, 'cardStatus', statusFallback),
    summary: frontmatterOr(frontmatter, 'cardSummary', summaryFallback),
    progress: frontmatterOr(frontmatter, 'cardProgress', progressFallback),
    image: frontmatterOr(frontmatter, 'cardImage', imageFallback),
    imageAlt: frontmatterOr(frontmatter, 'cardImageAlt', imageAltFallback),
    tags: arrayField(frontmatter, 'cardTags', tagsFallback),
    details: arrayField(frontmatter, 'cardDetails', project.cardDetails ?? project.details ?? []),
  }
}

export function getProjectPage(project, language) {
  const content = getLocalizedProjectContent(project, language)
  const frontmatter = content?.data ?? {}
  const splitFields = usesSplitProjectFields(frontmatter)

  if (splitFields) {
    return {
      content,
      frontmatter,
      markdown: content?.body,
      title: frontmatterOr(frontmatter, 'pageTitle', project.title),
      status: frontmatterOr(frontmatter, 'pageStatus', ''),
      summary: frontmatterOr(frontmatter, 'pageSummary', ''),
      progress: frontmatterOr(frontmatter, 'pageProgress', ''),
      image: frontmatterOr(frontmatter, 'pageImage', ''),
      imageAlt: frontmatterOr(frontmatter, 'pageImageAlt', ''),
      tags: arrayField(frontmatter, 'pageTags'),
      hasImageOverride: hasFrontmatterField(frontmatter, 'pageImage'),
    }
  }

  return {
    content,
    frontmatter,
    markdown: content?.body,
    title: frontmatterOr(frontmatter, 'pageTitle', frontmatterOr(frontmatter, 'title', project.title)),
    status: frontmatterOr(frontmatter, 'pageStatus', frontmatterOr(frontmatter, 'status', project.status)),
    summary: frontmatterOr(
      frontmatter,
      'pageSummary',
      frontmatterOr(frontmatter, 'summary', project.pageSummary ?? project.summary),
    ),
    progress: frontmatterOr(
      frontmatter,
      'pageProgress',
      frontmatterOr(frontmatter, 'progress', project.pageProgress ?? project.progress),
    ),
    image: frontmatterOr(frontmatter, 'pageImage', frontmatterOr(frontmatter, 'image', project.image)),
    imageAlt: frontmatterOr(frontmatter, 'pageImageAlt', frontmatterOr(frontmatter, 'imageAlt', project.imageAlt)),
    tags: hasFrontmatterField(frontmatter, 'pageTags')
      ? arrayField(frontmatter, 'pageTags')
      : arrayField(frontmatter, 'tags', project.tags),
    hasImageOverride:
      hasFrontmatterField(frontmatter, 'pageImage') ||
      (!hasFrontmatterField(frontmatter, 'pageImage') && hasFrontmatterField(frontmatter, 'image')),
  }
}
