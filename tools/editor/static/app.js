const fields = {
  cardTitle: document.querySelector('#cardTitleInput'),
  cardStatus: document.querySelector('#cardStatusInput'),
  cardSummary: document.querySelector('#cardSummaryInput'),
  cardProgress: document.querySelector('#cardProgressInput'),
  cardImage: document.querySelector('#cardImageInput'),
  cardImageAlt: document.querySelector('#cardImageAltInput'),
  cardTags: document.querySelector('#cardTagsInput'),
  cardDetails: document.querySelector('#cardDetailsInput'),
  pageTitle: document.querySelector('#pageTitleInput'),
  pageStatus: document.querySelector('#pageStatusInput'),
  pageSummary: document.querySelector('#pageSummaryInput'),
  pageProgress: document.querySelector('#pageProgressInput'),
  pageImage: document.querySelector('#pageImageInput'),
  pageImageAlt: document.querySelector('#pageImageAltInput'),
  pageTags: document.querySelector('#pageTagsInput'),
  body: document.querySelector('#bodyInput'),
}

const elements = {
  projectList: document.querySelector('#projectList'),
  assetList: document.querySelector('#assetList'),
  currentSlug: document.querySelector('#currentSlug'),
  languageSelect: document.querySelector('#languageSelect'),
  saveButton: document.querySelector('#saveButton'),
  saveState: document.querySelector('#saveState'),
  previewStatus: document.querySelector('#previewStatus'),
  previewTitle: document.querySelector('#previewTitle'),
  previewSummary: document.querySelector('#previewSummary'),
  previewProgress: document.querySelector('#previewProgress'),
  previewTags: document.querySelector('#previewTags'),
  previewImage: document.querySelector('#previewImage'),
  markdownPreview: document.querySelector('#markdownPreview'),
}

let currentSlug = null
let currentLanguage = 'ru'
let isDirty = false

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

function inlineMarkdown(text) {
  return escapeHtml(text)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
}

function renderMarkdown(source) {
  const blocks = []
  const paragraph = []

  function flushParagraph() {
    if (paragraph.length === 0) {
      return
    }

    blocks.push(`<p>${inlineMarkdown(paragraph.join(' '))}</p>`)
    paragraph.length = 0
  }

  source.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim()

    if (!trimmed) {
      flushParagraph()
      return
    }

    if (trimmed === '---') {
      flushParagraph()
      blocks.push('<hr>')
      return
    }

    const imageMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
    if (imageMatch) {
      flushParagraph()
      blocks.push(`<img src="${escapeHtml(imageMatch[2])}" alt="${escapeHtml(imageMatch[1])}" loading="lazy">`)
      return
    }

    const headingMatch = trimmed.match(/^(#{1,4})\s+(.+)$/)
    if (headingMatch) {
      flushParagraph()
      blocks.push(`<h${headingMatch[1].length}>${inlineMarkdown(headingMatch[2])}</h${headingMatch[1].length}>`)
      return
    }

    const listMatch = trimmed.match(/^[-*]\s+(.+)$/)
    if (listMatch) {
      flushParagraph()
      const previous = blocks.at(-1)
      const item = `<li>${inlineMarkdown(listMatch[1])}</li>`

      if (previous?.startsWith('<ul>')) {
        blocks[blocks.length - 1] = previous.replace('</ul>', `${item}</ul>`)
      } else {
        blocks.push(`<ul>${item}</ul>`)
      }
      return
    }

    paragraph.push(trimmed)
  })

  flushParagraph()
  return blocks.join('\n')
}

function setSaveState(text, state = '') {
  elements.saveState.textContent = text
  elements.saveState.className = `save-state ${state}`.trim()
}

function setDirty(dirty) {
  isDirty = dirty
  if (dirty) {
    setSaveState('Unsaved changes', 'is-dirty')
  } else {
    setSaveState('Saved')
  }
}

function listFromTextarea(field) {
  const value = field.value.trim()

  if (value === '[]') {
    return []
  }

  return value
    .split(/\r?\n/)
    .map((tag) => tag.trim())
    .filter(Boolean)
}

function collectData() {
  return {
    cardTitle: fields.cardTitle.value,
    cardStatus: fields.cardStatus.value,
    cardSummary: fields.cardSummary.value,
    cardProgress: fields.cardProgress.value,
    cardImage: fields.cardImage.value,
    cardImageAlt: fields.cardImageAlt.value,
    cardTags: listFromTextarea(fields.cardTags),
    cardDetails: listFromTextarea(fields.cardDetails),
    pageTitle: fields.pageTitle.value,
    pageStatus: fields.pageStatus.value,
    pageSummary: fields.pageSummary.value,
    pageProgress: fields.pageProgress.value,
    pageImage: fields.pageImage.value,
    pageImageAlt: fields.pageImageAlt.value,
    pageTags: listFromTextarea(fields.pageTags),
  }
}

function updatePreview() {
  const data = collectData()

  elements.previewStatus.textContent = data.pageStatus
  elements.previewStatus.hidden = !data.pageStatus
  elements.previewTitle.textContent = data.pageTitle || currentSlug || 'Untitled project'
  elements.previewSummary.textContent = data.pageSummary
  elements.previewSummary.hidden = !data.pageSummary
  elements.previewProgress.textContent = data.pageProgress
  elements.previewProgress.hidden = !data.pageProgress
  elements.previewTags.replaceChildren(
    ...data.pageTags.map((tag) => {
      const item = document.createElement('span')
      item.textContent = tag
      return item
    }),
  )

  if (data.pageImage) {
    elements.previewImage.src = data.pageImage
    elements.previewImage.alt = data.pageImageAlt
    elements.previewImage.classList.remove('is-hidden')
  } else {
    elements.previewImage.removeAttribute('src')
    elements.previewImage.classList.add('is-hidden')
  }

  elements.markdownPreview.innerHTML = renderMarkdown(fields.body.value)
}

function fillForm(project) {
  const data = project.data ?? {}
  fields.cardTitle.value = data.cardTitle ?? data.title ?? ''
  fields.cardStatus.value = data.cardStatus ?? data.status ?? ''
  fields.cardSummary.value = data.cardSummary ?? data.summary ?? ''
  fields.cardProgress.value = data.cardProgress ?? data.progress ?? ''
  fields.cardImage.value = data.cardImage ?? data.image ?? ''
  fields.cardImageAlt.value = data.cardImageAlt ?? data.imageAlt ?? ''
  fields.cardTags.value = Array.isArray(data.cardTags)
    ? data.cardTags.join('\n')
    : (Array.isArray(data.tags) ? data.tags.join('\n') : '')
  fields.cardDetails.value = Array.isArray(data.cardDetails) ? data.cardDetails.join('\n') : ''
  fields.pageTitle.value = data.pageTitle ?? data.title ?? ''
  fields.pageStatus.value = data.pageStatus ?? data.status ?? ''
  fields.pageSummary.value = data.pageSummary ?? data.summary ?? ''
  fields.pageProgress.value = data.pageProgress ?? data.progress ?? ''
  fields.pageImage.value = data.pageImage ?? data.image ?? ''
  fields.pageImageAlt.value = data.pageImageAlt ?? data.imageAlt ?? ''
  fields.pageTags.value = Array.isArray(data.pageTags)
    ? data.pageTags.join('\n')
    : (Array.isArray(data.tags) ? data.tags.join('\n') : '')
  fields.body.value = project.body ?? ''
  updatePreview()
  setDirty(false)
}

async function loadProjects({ selectFirst = false } = {}) {
  const response = await fetch('/api/projects')
  const data = await response.json()

  elements.projectList.replaceChildren(
    ...data.projects.map((project) => {
      const button = document.createElement('button')
      button.type = 'button'
      button.className = 'project-button'
      button.dataset.slug = project.slug
      const languages = project.languages.length > 0 ? project.languages.join(' / ').toUpperCase() : 'No language files'
      button.innerHTML = `<strong>${escapeHtml(project.title)}</strong><span>${escapeHtml(project.status || project.slug)} · ${escapeHtml(languages)}</span>`
      button.addEventListener('click', () => selectProject(project.slug))
      return button
    }),
  )

  if (selectFirst && data.projects[0]) {
    await selectProject(data.projects[0].slug)
  }
}

async function loadAssets() {
  const response = await fetch('/api/assets')
  const data = await response.json()

  elements.assetList.replaceChildren(
    ...data.assets.map((asset) => {
      const option = document.createElement('option')
      option.value = asset
      return option
    }),
  )
}

async function selectProject(slug) {
  if (isDirty && !window.confirm('You have unsaved changes. Switch project anyway?')) {
    return
  }

  currentSlug = slug
  elements.languageSelect.value = currentLanguage
  document.querySelectorAll('.project-button').forEach((button) => {
    button.classList.toggle('is-active', button.dataset.slug === slug)
  })

  const response = await fetch(`/api/projects/${slug}/${currentLanguage}`)
  const project = await response.json()

  if (!response.ok) {
    fillForm({
      data: {
        cardTitle: slug,
        cardStatus: '',
        cardSummary: '',
        cardProgress: '',
        cardImage: '',
        cardImageAlt: '',
        cardTags: [],
        cardDetails: [],
        pageTitle: slug,
        pageStatus: '',
        pageSummary: '',
        pageProgress: '',
        pageImage: '',
        pageImageAlt: '',
        pageTags: [],
      },
      body: '',
    })
    elements.currentSlug.textContent = `${slug} / ${currentLanguage}`
    setSaveState(project.error ?? 'New language file', 'is-dirty')
    isDirty = true
    return
  }

  currentLanguage = project.language
  elements.languageSelect.value = currentLanguage
  elements.currentSlug.textContent = `${slug} / ${currentLanguage}`
  fillForm(project)
}

async function saveProject() {
  if (!currentSlug) {
    return
  }

  setSaveState('Saving...')
  const response = await fetch(`/api/projects/${currentSlug}/${currentLanguage}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: collectData(),
      body: fields.body.value,
    }),
  })
  const result = await response.json()

  if (!response.ok) {
    setSaveState(result.error ?? 'Save failed', 'is-error')
    return
  }

  setDirty(false)
  setSaveState(`Saved ${new Date(result.savedAt).toLocaleTimeString()}`)
  await loadProjects()
  document.querySelectorAll('.project-button').forEach((button) => {
    button.classList.toggle('is-active', button.dataset.slug === currentSlug)
  })
}

Object.values(fields).forEach((field) => {
  field.addEventListener('input', () => {
    updatePreview()
    setDirty(true)
  })
})

elements.saveButton.addEventListener('click', saveProject)
elements.languageSelect.addEventListener('change', async () => {
  if (isDirty && !window.confirm('You have unsaved changes. Switch language anyway?')) {
    elements.languageSelect.value = currentLanguage
    return
  }

  currentLanguage = elements.languageSelect.value
  if (currentSlug) {
    await selectProject(currentSlug)
  }
})

window.addEventListener('beforeunload', (event) => {
  if (!isDirty) {
    return
  }

  event.preventDefault()
  event.returnValue = ''
})

await Promise.all([loadAssets(), loadProjects({ selectFirst: true })])
