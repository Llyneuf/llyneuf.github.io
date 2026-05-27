const fields = {
  slug: document.querySelector('#slugInput'),
  date: document.querySelector('#dateInput'),
  cardTitle: document.querySelector('#cardTitleInput'),
  cardStatus: document.querySelector('#cardStatusInput'),
  cardType: document.querySelector('#cardTypeInput'),
  cardSummary: document.querySelector('#cardSummaryInput'),
  cardProgress: document.querySelector('#cardProgressInput'),
  cardImage: document.querySelector('#cardImageInput'),
  cardImageAlt: document.querySelector('#cardImageAltInput'),
  cardImageFit: document.querySelector('#cardImageFitInput'),
  cardImagePosition: document.querySelector('#cardImagePositionInput'),
  cardImageScale: document.querySelector('#cardImageScaleInput'),
  cardTags: document.querySelector('#cardTagsInput'),
  cardDetails: document.querySelector('#cardDetailsInput'),
  pageTitle: document.querySelector('#pageTitleInput'),
  pageStatus: document.querySelector('#pageStatusInput'),
  pageType: document.querySelector('#pageTypeInput'),
  pageSummary: document.querySelector('#pageSummaryInput'),
  pageProgress: document.querySelector('#pageProgressInput'),
  pageImage: document.querySelector('#pageImageInput'),
  pageImageAlt: document.querySelector('#pageImageAltInput'),
  pageImageFit: document.querySelector('#pageImageFitInput'),
  pageImagePosition: document.querySelector('#pageImagePositionInput'),
  pageImageScale: document.querySelector('#pageImageScaleInput'),
  pageTags: document.querySelector('#pageTagsInput'),
  body: document.querySelector('#bodyInput'),
}

const elements = {
  contentList: document.querySelector('#contentList'),
  newDevlogBox: document.querySelector('#newDevlogBox'),
  newDevlogButton: document.querySelector('#newDevlogButton'),
  assetList: document.querySelector('#assetList'),
  currentSlug: document.querySelector('#currentSlug'),
  editorTitle: document.querySelector('#editorTitle'),
  languageSelect: document.querySelector('#languageSelect'),
  saveButton: document.querySelector('#saveButton'),
  saveState: document.querySelector('#saveState'),
  liveCurrentLink: document.querySelector('#liveCurrentLink'),
  translationModeButton: document.querySelector('#translationModeButton'),
  translationPanel: document.querySelector('#translationPanel'),
  sourceLanguageSelect: document.querySelector('#sourceLanguageSelect'),
  targetLanguageSelect: document.querySelector('#targetLanguageSelect'),
  copyAllButton: document.querySelector('#copyAllButton'),
  copyMissingButton: document.querySelector('#copyMissingButton'),
  copyStructureButton: document.querySelector('#copyStructureButton'),
  saveTranslationButton: document.querySelector('#saveTranslationButton'),
  translationProgress: document.querySelector('#translationProgress'),
  sourceLiveLink: document.querySelector('#sourceLiveLink'),
  targetLiveLink: document.querySelector('#targetLiveLink'),
  sourceTranslationTitle: document.querySelector('#sourceTranslationTitle'),
  targetTranslationTitle: document.querySelector('#targetTranslationTitle'),
  translationSourceFields: document.querySelector('#translationSourceFields'),
  translationTargetFields: document.querySelector('#translationTargetFields'),
  editorGrid: document.querySelector('.editor-grid'),
  projectsTab: document.querySelector('#projectsTab'),
  devlogsTab: document.querySelector('#devlogsTab'),
  devlogMetaSection: document.querySelector('#devlogMetaSection'),
  cardSectionTitle: document.querySelector('#cardSectionTitle'),
  pageSectionTitle: document.querySelector('#pageSectionTitle'),
  cardStatusLabel: document.querySelector('#cardStatusLabel'),
  cardTypeLabel: document.querySelector('#cardTypeLabel'),
  cardProgressLabel: document.querySelector('#cardProgressLabel'),
  cardTagsLabel: document.querySelector('#cardTagsLabel'),
  cardDetailsLabel: document.querySelector('#cardDetailsLabel'),
  pageStatusLabel: document.querySelector('#pageStatusLabel'),
  pageTypeLabel: document.querySelector('#pageTypeLabel'),
  pageProgressLabel: document.querySelector('#pageProgressLabel'),
  pageTagsLabel: document.querySelector('#pageTagsLabel'),
  cardImageControls: document.querySelector('#cardImageControls'),
  pageImageControls: document.querySelector('#pageImageControls'),
  cardPreviewHeading: document.querySelector('#cardPreviewHeading'),
  pagePreviewHeading: document.querySelector('#pagePreviewHeading'),
  cardPreviewIndex: document.querySelector('#cardPreviewIndex'),
  cardPreviewStatus: document.querySelector('#cardPreviewStatus'),
  cardPreviewTitle: document.querySelector('#cardPreviewTitle'),
  cardPreviewSummary: document.querySelector('#cardPreviewSummary'),
  cardPreviewProgress: document.querySelector('#cardPreviewProgress'),
  cardPreviewDetails: document.querySelector('#cardPreviewDetails'),
  cardPreviewTags: document.querySelector('#cardPreviewTags'),
  cardPreviewImage: document.querySelector('#cardPreviewImage'),
  previewStatus: document.querySelector('#previewStatus'),
  previewTitle: document.querySelector('#previewTitle'),
  previewSummary: document.querySelector('#previewSummary'),
  previewProgress: document.querySelector('#previewProgress'),
  previewTags: document.querySelector('#previewTags'),
  previewImage: document.querySelector('#previewImage'),
  markdownPreview: document.querySelector('#markdownPreview'),
}

let currentType = 'projects'
let currentSlug = null
let currentLanguage = 'ru'
let currentExtraData = {}
let isDirty = false
let isTranslationMode = false
let translationSource = null
let translationTarget = null
const localSiteOrigin = 'http://localhost:5173'

const projectTranslationFields = [
  { key: 'cardTitle', label: 'Card title' },
  { key: 'cardStatus', label: 'Card status' },
  { key: 'cardSummary', label: 'Card summary' },
  { key: 'cardProgress', label: 'Card progress' },
  { key: 'cardImage', label: 'Card image' },
  { key: 'cardImageAlt', label: 'Card image alt' },
  { key: 'cardTags', label: 'Card tags', array: true },
  { key: 'cardDetails', label: 'Card details', array: true },
  { key: 'pageTitle', label: 'Page title' },
  { key: 'pageStatus', label: 'Page status' },
  { key: 'pageSummary', label: 'Page summary' },
  { key: 'pageProgress', label: 'Page progress' },
  { key: 'pageImage', label: 'Page image' },
  { key: 'pageImageAlt', label: 'Page image alt' },
  { key: 'pageTags', label: 'Page tags', array: true },
  { key: 'body', label: 'Markdown body', body: true },
]

const devlogTranslationFields = [
  { key: 'slug', label: 'URL slug' },
  { key: 'date', label: 'Date' },
  { key: 'cardTitle', label: 'Card title' },
  { key: 'cardType', label: 'Card type' },
  { key: 'cardSummary', label: 'Card summary' },
  { key: 'cardImage', label: 'Card image' },
  { key: 'cardImageFit', label: 'Card image fit' },
  { key: 'cardImagePosition', label: 'Card image position' },
  { key: 'cardImageScale', label: 'Card image scale' },
  { key: 'cardImageAlt', label: 'Card image alt' },
  { key: 'pageTitle', label: 'Page title' },
  { key: 'pageType', label: 'Page type' },
  { key: 'pageImage', label: 'Page image' },
  { key: 'pageImageFit', label: 'Page image fit' },
  { key: 'pageImagePosition', label: 'Page image position' },
  { key: 'pageImageScale', label: 'Page image scale' },
  { key: 'pageImageAlt', label: 'Page image alt' },
  { key: 'body', label: 'Markdown body', body: true },
]

function escapeHtml(value = '') {
  return String(value)
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

function toggle(element, isVisible) {
  element.classList.toggle('is-hidden', !isVisible)
}

function setSaveState(text, state = '') {
  elements.saveState.textContent = text
  elements.saveState.className = `save-state ${state}`.trim()
}

function setDirty(dirty) {
  isDirty = dirty
  setSaveState(dirty ? 'Unsaved changes' : 'Saved', dirty ? 'is-dirty' : '')
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

function applyImageStyle(image, fit, position, scale) {
  image.style.objectFit = fit || ''
  image.style.objectPosition = position || ''
  image.style.transform = scale && scale !== '1' ? `scale(${scale})` : ''
}

function setImage(image, src, alt, fit = '', position = '', scale = '') {
  if (src) {
    image.src = src
    image.alt = alt || ''
    image.classList.remove('is-hidden')
    applyImageStyle(image, fit, position, scale)
    return
  }

  image.removeAttribute('src')
  image.alt = ''
  image.classList.add('is-hidden')
  applyImageStyle(image, '', '', '')
}

function renderTagList(container, tags) {
  container.replaceChildren(
    ...tags.map((tag) => {
      const item = document.createElement('span')
      item.textContent = tag
      return item
    }),
  )
}

function renderDetails(container, details) {
  container.replaceChildren(
    ...details.map((detail) => {
      const item = document.createElement('li')
      item.textContent = detail
      return item
    }),
  )
}

function getLivePath(language = currentLanguage) {
  if (!currentSlug) {
    return '#'
  }

  if (currentType === 'devlogs') {
    return `${localSiteOrigin}/${language}/devlog`
  }

  return `${localSiteOrigin}/${language}/projects/${currentSlug}`
}

function updateLiveLinks() {
  elements.liveCurrentLink.href = getLivePath(currentLanguage)
  elements.liveCurrentLink.textContent = currentSlug ? `Open ${currentLanguage.toUpperCase()} live` : 'Open live'
  elements.sourceLiveLink.href = getLivePath(elements.sourceLanguageSelect.value)
  elements.targetLiveLink.href = getLivePath(elements.targetLanguageSelect.value)
}

function getTranslationFields() {
  return currentType === 'devlogs' ? devlogTranslationFields : projectTranslationFields
}

function markdownStructureOnly(source) {
  return source
    .split(/\r?\n/)
    .map((line) => {
      const trimmed = line.trim()

      if (!trimmed) {
        return ''
      }

      if (
        /^#{1,6}\s+/.test(trimmed) ||
        /^!\[[^\]]*\]\([^)]+\)$/.test(trimmed) ||
        /^[-*]\s+/.test(trimmed) ||
        /^---$/.test(trimmed)
      ) {
        return line
      }

      return '[translate]'
    })
    .join('\n')
}

function formatTranslationValue(value) {
  if (Array.isArray(value)) {
    return value.join('\n')
  }

  return value ?? ''
}

function parseTranslationValue(value, field) {
  if (!field.array) {
    return value
  }

  if (value.trim() === '[]') {
    return []
  }

  return value
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean)
}

function getTranslationData(item) {
  return {
    ...(item?.data ?? {}),
    body: item?.body ?? '',
  }
}

function createTranslationField(field, value, { readonly = false } = {}) {
  const wrapper = document.createElement('label')
  wrapper.className = 'translation-field'

  const meta = document.createElement('span')
  meta.className = 'translation-field__meta'
  meta.innerHTML = `<span>${escapeHtml(field.label)}</span><span>${field.body ? 'markdown' : field.array ? 'list' : 'field'}</span>`

  const textarea = document.createElement('textarea')
  textarea.dataset.field = field.key
  textarea.value = formatTranslationValue(value)
  textarea.readOnly = readonly
  textarea.rows = field.body ? 16 : field.array ? 5 : 3

  if (!readonly) {
    textarea.addEventListener('input', () => {
      wrapper.classList.toggle('is-empty', !textarea.value.trim())
      updateTranslationProgress()
      setDirty(true)
    })
  }

  wrapper.classList.toggle('is-empty', !readonly && !textarea.value.trim())
  wrapper.append(meta, textarea)
  return wrapper
}

function updateTranslationProgress() {
  const inputs = [...elements.translationTargetFields.querySelectorAll('textarea')]
  const filled = inputs.filter((input) => input.value.trim()).length

  elements.translationProgress.textContent = `${filled}/${inputs.length} fields filled`
}

function renderTranslationColumns() {
  const fieldsConfig = getTranslationFields()
  const sourceData = getTranslationData(translationSource)
  const targetData = getTranslationData(translationTarget)

  elements.sourceTranslationTitle.textContent = `Source: ${elements.sourceLanguageSelect.value.toUpperCase()}`
  elements.targetTranslationTitle.textContent = `Target: ${elements.targetLanguageSelect.value.toUpperCase()}`
  elements.translationSourceFields.replaceChildren(
    ...fieldsConfig.map((field) => createTranslationField(field, sourceData[field.key], { readonly: true })),
  )
  elements.translationTargetFields.replaceChildren(
    ...fieldsConfig.map((field) => createTranslationField(field, targetData[field.key])),
  )
  updateTranslationProgress()
  updateLiveLinks()
}

function collectTranslationTargetData() {
  const fieldsConfig = getTranslationFields()
  const targetData = { ...(translationTarget?.data ?? {}) }

  fieldsConfig.forEach((field) => {
    const input = elements.translationTargetFields.querySelector(`[data-field="${field.key}"]`)

    if (!input) {
      return
    }

    if (field.body) {
      return
    }

    targetData[field.key] = parseTranslationValue(input.value, field)
  })

  const bodyInput = elements.translationTargetFields.querySelector('[data-field="body"]')

  return {
    data: targetData,
    body: bodyInput?.value ?? '',
  }
}

function copyTranslationFields({ missingOnly = false } = {}) {
  const fieldsConfig = getTranslationFields()

  fieldsConfig.forEach((field) => {
    const sourceInput = elements.translationSourceFields.querySelector(`[data-field="${field.key}"]`)
    const targetInput = elements.translationTargetFields.querySelector(`[data-field="${field.key}"]`)

    if (!sourceInput || !targetInput) {
      return
    }

    if (missingOnly && targetInput.value.trim()) {
      return
    }

    targetInput.value = sourceInput.value
    targetInput.closest('.translation-field')?.classList.toggle('is-empty', !targetInput.value.trim())
  })

  updateTranslationProgress()
  setDirty(true)
}

function copyMarkdownStructure() {
  const sourceInput = elements.translationSourceFields.querySelector('[data-field="body"]')
  const targetInput = elements.translationTargetFields.querySelector('[data-field="body"]')

  if (!sourceInput || !targetInput) {
    return
  }

  targetInput.value = markdownStructureOnly(sourceInput.value)
  targetInput.closest('.translation-field')?.classList.toggle('is-empty', !targetInput.value.trim())
  updateTranslationProgress()
  setDirty(true)
}

async function loadTranslationPair() {
  if (!currentSlug) {
    return
  }

  const sourceLanguage = elements.sourceLanguageSelect.value
  const targetLanguage = elements.targetLanguageSelect.value
  const sourceResponse = await fetch(`/api/${currentType}/${currentSlug}/${sourceLanguage}`)
  const targetResponse = await fetch(`/api/${currentType}/${currentSlug}/${targetLanguage}`)
  translationSource = sourceResponse.ok ? await sourceResponse.json() : { data: {}, body: '' }
  translationTarget = targetResponse.ok ? await targetResponse.json() : { data: {}, body: '' }

  renderTranslationColumns()
}

async function saveTranslation() {
  if (!currentSlug) {
    return
  }

  const targetLanguage = elements.targetLanguageSelect.value
  const payload = collectTranslationTargetData()

  setSaveState('Saving translation...')
  const response = await fetch(`/api/${currentType}/${currentSlug}/${targetLanguage}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  const result = await response.json()

  if (!response.ok) {
    setSaveState(result.error ?? 'Save failed', 'is-error')
    return
  }

  setDirty(false)
  setSaveState(`Saved ${targetLanguage.toUpperCase()} ${new Date(result.savedAt).toLocaleTimeString()}`)
  await loadItems()
  await loadTranslationPair()
}

function collectProjectData() {
  return {
    ...currentExtraData,
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

function collectDevlogData() {
  return {
    ...currentExtraData,
    slug: fields.slug.value,
    date: fields.date.value,
    cardTitle: fields.cardTitle.value,
    cardType: fields.cardType.value,
    cardSummary: fields.cardSummary.value,
    cardImage: fields.cardImage.value,
    cardImageFit: fields.cardImageFit.value,
    cardImagePosition: fields.cardImagePosition.value,
    cardImageScale: fields.cardImageScale.value,
    cardImageAlt: fields.cardImageAlt.value,
    pageTitle: fields.pageTitle.value,
    pageType: fields.pageType.value,
    pageImage: fields.pageImage.value,
    pageImageFit: fields.pageImageFit.value,
    pageImagePosition: fields.pageImagePosition.value,
    pageImageScale: fields.pageImageScale.value,
    pageImageAlt: fields.pageImageAlt.value,
  }
}

function collectData() {
  return currentType === 'devlogs' ? collectDevlogData() : collectProjectData()
}

function updateProjectPreview(data) {
  elements.cardPreviewHeading.textContent = 'Project card preview'
  elements.pagePreviewHeading.textContent = 'Project page preview'
  elements.cardPreviewIndex.textContent = '01'
  elements.cardPreviewStatus.textContent = data.cardStatus
  elements.cardPreviewTitle.textContent = data.cardTitle || currentSlug || 'Untitled project'
  elements.cardPreviewSummary.textContent = data.cardSummary
  elements.cardPreviewSummary.hidden = !data.cardSummary
  elements.cardPreviewProgress.textContent = data.cardProgress
  elements.cardPreviewProgress.hidden = !data.cardProgress
  renderDetails(elements.cardPreviewDetails, data.cardDetails)
  renderTagList(elements.cardPreviewTags, data.cardTags)
  setImage(elements.cardPreviewImage, data.cardImage, data.cardImageAlt)

  elements.previewStatus.textContent = data.pageStatus
  elements.previewStatus.hidden = !data.pageStatus
  elements.previewTitle.textContent = data.pageTitle || currentSlug || 'Untitled project'
  elements.previewSummary.textContent = data.pageSummary
  elements.previewSummary.hidden = !data.pageSummary
  elements.previewProgress.textContent = data.pageProgress
  elements.previewProgress.hidden = !data.pageProgress
  renderTagList(elements.previewTags, data.pageTags)
  setImage(elements.previewImage, data.pageImage, data.pageImageAlt)
}

function updateDevlogPreview(data) {
  elements.cardPreviewHeading.textContent = 'Devlog card preview'
  elements.pagePreviewHeading.textContent = 'Devlog modal preview'
  elements.cardPreviewIndex.textContent = data.cardType || 'Devlog'
  elements.cardPreviewStatus.textContent = data.date
  elements.cardPreviewTitle.textContent = data.cardTitle || data.slug || currentSlug || 'Untitled devlog'
  elements.cardPreviewSummary.textContent = data.cardSummary
  elements.cardPreviewSummary.hidden = !data.cardSummary
  elements.cardPreviewProgress.hidden = true
  renderDetails(elements.cardPreviewDetails, [])
  renderTagList(elements.cardPreviewTags, [])
  setImage(
    elements.cardPreviewImage,
    data.cardImage,
    data.cardImageAlt,
    data.cardImageFit,
    data.cardImagePosition,
    data.cardImageScale,
  )

  elements.previewStatus.textContent = `${data.pageType || data.cardType || 'Devlog'}${data.date ? ` · ${data.date}` : ''}`
  elements.previewStatus.hidden = false
  elements.previewTitle.textContent = data.pageTitle || data.cardTitle || data.slug || currentSlug || 'Untitled devlog'
  elements.previewSummary.hidden = true
  elements.previewProgress.hidden = true
  renderTagList(elements.previewTags, [])
  setImage(
    elements.previewImage,
    data.pageImage,
    data.pageImageAlt,
    data.pageImageFit,
    data.pageImagePosition,
    data.pageImageScale,
  )
}

function updatePreview() {
  const data = collectData()

  if (currentType === 'devlogs') {
    updateDevlogPreview(data)
  } else {
    updateProjectPreview(data)
  }

  elements.markdownPreview.innerHTML = renderMarkdown(fields.body.value)
}

function getKnownKeys() {
  if (currentType === 'devlogs') {
    return [
      'slug',
      'date',
      'cardTitle',
      'cardType',
      'cardSummary',
      'cardImage',
      'cardImageFit',
      'cardImagePosition',
      'cardImageScale',
      'cardImageAlt',
      'pageTitle',
      'pageType',
      'pageImage',
      'pageImageFit',
      'pageImagePosition',
      'pageImageScale',
      'pageImageAlt',
    ]
  }

  return [
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
}

function rememberExtraData(data) {
  const known = new Set(getKnownKeys())
  currentExtraData = Object.fromEntries(Object.entries(data).filter(([key]) => !known.has(key)))
}

function fillProjectForm(item) {
  const data = item.data ?? {}
  rememberExtraData(data)
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
  fields.body.value = item.body ?? ''
}

function fillDevlogForm(item) {
  const data = item.data ?? {}
  rememberExtraData(data)
  fields.slug.value = data.slug ?? item.slug ?? ''
  fields.date.value = data.date ?? item.slug ?? ''
  fields.cardTitle.value = data.cardTitle ?? ''
  fields.cardType.value = data.cardType ?? ''
  fields.cardSummary.value = data.cardSummary ?? ''
  fields.cardImage.value = data.cardImage ?? ''
  fields.cardImageFit.value = data.cardImageFit ?? ''
  fields.cardImagePosition.value = data.cardImagePosition ?? ''
  fields.cardImageScale.value = data.cardImageScale ?? ''
  fields.cardImageAlt.value = data.cardImageAlt ?? ''
  fields.pageTitle.value = data.pageTitle ?? ''
  fields.pageType.value = data.pageType ?? ''
  fields.pageImage.value = data.pageImage ?? ''
  fields.pageImageFit.value = data.pageImageFit ?? ''
  fields.pageImagePosition.value = data.pageImagePosition ?? ''
  fields.pageImageScale.value = data.pageImageScale ?? ''
  fields.pageImageAlt.value = data.pageImageAlt ?? ''
  fields.body.value = item.body ?? ''
}

function fillForm(item) {
  if (currentType === 'devlogs') {
    fillDevlogForm(item)
  } else {
    fillProjectForm(item)
  }

  updatePreview()
  updateLiveLinks()
  setDirty(false)
}

function configureFormForType() {
  const isDevlog = currentType === 'devlogs'

  elements.editorTitle.textContent = isDevlog ? 'Devlog editor' : 'Project editor'
  elements.cardSectionTitle.textContent = isDevlog ? 'Devlog card' : 'Homepage card'
  elements.pageSectionTitle.textContent = isDevlog ? 'Devlog post' : 'Project page'
  elements.projectsTab.classList.toggle('is-active', !isDevlog)
  elements.devlogsTab.classList.toggle('is-active', isDevlog)
  toggle(elements.newDevlogBox, isDevlog)
  toggle(elements.devlogMetaSection, isDevlog)
  toggle(elements.cardStatusLabel, !isDevlog)
  toggle(elements.pageStatusLabel, !isDevlog)
  toggle(elements.cardTypeLabel, isDevlog)
  toggle(elements.pageTypeLabel, isDevlog)
  toggle(elements.cardProgressLabel, !isDevlog)
  toggle(elements.pageProgressLabel, !isDevlog)
  toggle(elements.cardTagsLabel, !isDevlog)
  toggle(elements.cardDetailsLabel, !isDevlog)
  toggle(elements.pageTagsLabel, !isDevlog)
  toggle(elements.cardImageControls, isDevlog)
  toggle(elements.pageImageControls, isDevlog)
}

async function setTranslationMode(enabled) {
  if (enabled === isTranslationMode) {
    return
  }

  if (isDirty && !window.confirm('You have unsaved changes. Switch editor mode anyway?')) {
    return
  }

  isTranslationMode = enabled
  setDirty(false)
  elements.translationModeButton.textContent = enabled ? 'Edit mode' : 'Translate'
  toggle(elements.translationPanel, enabled)
  toggle(elements.editorGrid, !enabled)

  if (enabled) {
    await loadTranslationPair()
  } else {
    updateLiveLinks()
  }
}

async function loadItems({ selectFirst = false } = {}) {
  const response = await fetch(`/api/${currentType}`)
  const data = await response.json()
  const items = data[currentType] ?? []

  elements.contentList.replaceChildren(
    ...items.map((item) => {
      const button = document.createElement('button')
      button.type = 'button'
      button.className = 'content-button'
      button.dataset.slug = item.slug
      const languages = item.languages.length > 0 ? item.languages.join(' / ').toUpperCase() : 'No language files'
      button.innerHTML = `<strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.status || item.slug)} · ${escapeHtml(languages)}</span>`
      button.addEventListener('click', () => selectItem(item.slug))
      return button
    }),
  )

  if (selectFirst && items[0]) {
    await selectItem(items[0].slug)
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

async function selectItem(slug) {
  if (isDirty && !window.confirm('You have unsaved changes. Switch item anyway?')) {
    return
  }

  currentSlug = slug
  elements.languageSelect.value = currentLanguage
  document.querySelectorAll('.content-button').forEach((button) => {
    button.classList.toggle('is-active', button.dataset.slug === slug)
  })

  const response = await fetch(`/api/${currentType}/${slug}/${currentLanguage}`)
  const item = await response.json()

  if (!response.ok) {
    const fallbackData =
      currentType === 'devlogs'
        ? {
            slug,
            date: slug,
            cardTitle: slug,
            cardType: 'Devlog',
            pageTitle: slug,
            pageType: 'Devlog',
          }
        : {
            cardTitle: slug,
            pageTitle: slug,
            cardTags: [],
            cardDetails: [],
            pageTags: [],
          }

    fillForm({ data: fallbackData, body: '' })
    elements.currentSlug.textContent = `${slug} / ${currentLanguage}`
    setSaveState(item.error ?? 'New language file', 'is-dirty')
    isDirty = true
    return
  }

  currentLanguage = item.language
  elements.languageSelect.value = currentLanguage
  elements.currentSlug.textContent = `${slug} / ${currentLanguage}`
  fillForm(item)

  if (isTranslationMode) {
    await loadTranslationPair()
  }
}

async function saveItem() {
  if (!currentSlug) {
    return
  }

  setSaveState('Saving...')
  const response = await fetch(`/api/${currentType}/${currentSlug}/${currentLanguage}`, {
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
  await loadItems()
  document.querySelectorAll('.content-button').forEach((button) => {
    button.classList.toggle('is-active', button.dataset.slug === currentSlug)
  })
}

function getTodayDevlogFolder() {
  const now = new Date()
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = now.getFullYear()

  return `${day}-${month}-${year}`
}

async function createNewDevlog() {
  if (isDirty && !window.confirm('You have unsaved changes. Create a new devlog anyway?')) {
    return
  }

  const folder = window.prompt('New devlog date folder (DD-MM-YYYY)', getTodayDevlogFolder())

  if (!folder) {
    return
  }

  setSaveState('Creating devlog...')
  const response = await fetch('/api/devlogs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ folder }),
  })
  const result = await response.json()

  if (!response.ok) {
    setSaveState(result.error ?? 'Could not create devlog', 'is-error')
    return
  }

  currentLanguage = 'ru'
  elements.languageSelect.value = currentLanguage
  await loadItems()
  await selectItem(result.slug)
  setSaveState(`Created ${result.slug}`)
}

async function switchType(nextType) {
  if (nextType === currentType) {
    return
  }

  if (isDirty && !window.confirm('You have unsaved changes. Switch content type anyway?')) {
    return
  }

  currentType = nextType
  currentSlug = null
  currentExtraData = {}
  configureFormForType()
  setSaveState('Idle')
  await loadItems({ selectFirst: true })

  if (isTranslationMode) {
    await loadTranslationPair()
  }
}

Object.values(fields).forEach((field) => {
  field.addEventListener('input', () => {
    updatePreview()
    setDirty(true)
  })
})

elements.saveButton.addEventListener('click', saveItem)
elements.translationModeButton.addEventListener('click', () => setTranslationMode(!isTranslationMode))
elements.sourceLanguageSelect.addEventListener('change', loadTranslationPair)
elements.targetLanguageSelect.addEventListener('change', loadTranslationPair)
elements.copyAllButton.addEventListener('click', () => copyTranslationFields())
elements.copyMissingButton.addEventListener('click', () => copyTranslationFields({ missingOnly: true }))
elements.copyStructureButton.addEventListener('click', copyMarkdownStructure)
elements.saveTranslationButton.addEventListener('click', saveTranslation)
elements.newDevlogButton.addEventListener('click', createNewDevlog)
elements.projectsTab.addEventListener('click', () => switchType('projects'))
elements.devlogsTab.addEventListener('click', () => switchType('devlogs'))
elements.languageSelect.addEventListener('change', async () => {
  if (isDirty && !window.confirm('You have unsaved changes. Switch language anyway?')) {
    elements.languageSelect.value = currentLanguage
    return
  }

  currentLanguage = elements.languageSelect.value
  if (currentSlug) {
    await selectItem(currentSlug)
  }
})

window.addEventListener('beforeunload', (event) => {
  if (!isDirty) {
    return
  }

  event.preventDefault()
  event.returnValue = ''
})

configureFormForType()
await Promise.all([loadAssets(), loadItems({ selectFirst: true })])
