import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import BlogPreview from './components/BlogPreview'
import Links from './components/Links'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProjectPage from './components/ProjectPage'
import { useEffect, useState } from 'react'
import { projects } from './data/projects'
import { getProjectPage } from './data/projectView'
import { getUiText } from './data/i18n'
import './styles/main.css'

const supportedLanguages = ['ru', 'en', 'es']
const defaultLanguage = 'ru'
const siteOrigin = 'https://llyneuf.xyz'
const defaultImage = `${siteOrigin}/og-image.png`

const homeDescriptions = {
  ru: 'Личный хаб Llyneuf: проекты, devlog, стримы, ссылки и творческая работа с играми, VTubing, 3D и вебом.',
  en: 'Personal hub for Llyneuf projects, devlog, streams, links and creative work across games, VTubing, 3D and web.',
  es: 'Hub personal de Llyneuf para proyectos, devlog, streams, enlaces y trabajo creativo entre juegos, VTubing, 3D y web.',
}

function setMetaAttribute(selector, attribute, value) {
  const element = document.head.querySelector(selector)

  if (element) {
    element.setAttribute(attribute, value)
  }
}

function getMetadata({ language, pathSegments }) {
  const t = getUiText(language)
  const pagePath = pathSegments.length > 0 ? `/${pathSegments.join('/')}` : '/'
  const canonicalPath = `/${language}${pagePath}`.replace(/\/+$/, '/') || `/${language}/`
  const alternates = supportedLanguages.map((item) => ({
    language: item,
    href: `${siteOrigin}${`/${item}${pagePath}`.replace(/\/+$/, '/') || `/${item}/`}`,
  }))

  if (pathSegments[0] === 'projects' && pathSegments[1]) {
    const project = projects.find((item) => item.slug === pathSegments[1])

    if (project) {
      const page = getProjectPage(project, language)

      return {
        title: `${page.title} | Llyneuf`,
        description: page.summary || `${page.title} project page on the Llyneuf site.`,
        url: `${siteOrigin}${canonicalPath}`,
        alternates,
      }
    }
  }

  if (pathSegments[0] === 'projects') {
    return {
      title: `${t.allProjects} | Llyneuf`,
      description: t.projectsHubDescription,
      url: `${siteOrigin}${canonicalPath}`,
      alternates,
    }
  }

  if (pathSegments[0] === 'devlog') {
    return {
      title: `${t.devlogHubTitle} | Llyneuf`,
      description: t.devlogHubDescription,
      url: `${siteOrigin}${canonicalPath}`,
      alternates,
    }
  }

  return {
    title: 'Llyneuf',
    description: homeDescriptions[language] ?? homeDescriptions.ru,
    url: `${siteOrigin}${canonicalPath}`,
    alternates,
  }
}

function updateDocumentMetadata(metadata) {
  document.title = metadata.title
  setMetaAttribute('meta[name="description"]', 'content', metadata.description)
  setMetaAttribute('meta[property="og:title"]', 'content', metadata.title)
  setMetaAttribute('meta[property="og:description"]', 'content', metadata.description)
  setMetaAttribute('meta[property="og:url"]', 'content', metadata.url)
  setMetaAttribute('meta[property="og:image"]', 'content', defaultImage)
  setMetaAttribute('meta[name="twitter:title"]', 'content', metadata.title)
  setMetaAttribute('meta[name="twitter:description"]', 'content', metadata.description)
  setMetaAttribute('meta[name="twitter:image"]', 'content', defaultImage)
  setMetaAttribute('link[rel="canonical"]', 'href', metadata.url)

  metadata.alternates.forEach((alternate) => {
    setMetaAttribute(`link[rel="alternate"][hreflang="${alternate.language}"]`, 'href', alternate.href)
  })

  setMetaAttribute('link[rel="alternate"][hreflang="x-default"]', 'href', metadata.alternates[0].href)
}

function getRoute() {
  const segments = window.location.pathname.split('/').filter(Boolean)
  const language = supportedLanguages.includes(segments[0]) ? segments[0] : defaultLanguage
  const pathSegments = supportedLanguages.includes(segments[0]) ? segments.slice(1) : segments

  return {
    language,
    pathSegments,
    hash: window.location.hash,
  }
}

function getLanguagePath(language, path = '') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  return `/${language}${normalizedPath}`.replace(/\/+$/, '/') || `/${language}/`
}

function prepareInitialUrl() {
  if (typeof window === 'undefined') {
    return
  }

  const redirectPath = window.sessionStorage.getItem('llyneuf:redirect-path')

  if (redirectPath) {
    window.sessionStorage.removeItem('llyneuf:redirect-path')
    window.history.replaceState(null, '', redirectPath)
    return
  }

  const oldProjectHash = window.location.hash.match(/^#\/projects(?:\/([^/]+))?$/)

  if (oldProjectHash) {
    const path = oldProjectHash[1] ? `/projects/${oldProjectHash[1]}` : '/projects'
    window.history.replaceState(null, '', getLanguagePath(defaultLanguage, path))
    return
  }

  if (window.location.pathname === '/') {
    window.history.replaceState(null, '', getLanguagePath(defaultLanguage))
  }
}

function App() {
  const [route, setRoute] = useState(() => {
    prepareInitialUrl()
    return getRoute()
  })

  useEffect(() => {
    const redirectPath = window.sessionStorage.getItem('llyneuf:redirect-path')

    if (redirectPath) {
      window.sessionStorage.removeItem('llyneuf:redirect-path')
      window.history.replaceState(null, '', redirectPath)
      return
    }

    const oldProjectHash = window.location.hash.match(/^#\/projects(?:\/([^/]+))?$/)

    if (oldProjectHash) {
      const path = oldProjectHash[1] ? `/projects/${oldProjectHash[1]}` : '/projects'
      window.history.replaceState(null, '', getLanguagePath(defaultLanguage, path))
      return
    }

    if (window.location.pathname === '/') {
      window.history.replaceState(null, '', getLanguagePath(defaultLanguage))
    }
  }, [])

  useEffect(() => {
    const handleRouteChange = () => setRoute(getRoute())

    window.addEventListener('popstate', handleRouteChange)
    window.addEventListener('hashchange', handleHashChange)

    function handleHashChange() {
      setRoute(getRoute())
    }

    return () => {
      window.removeEventListener('popstate', handleRouteChange)
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  useEffect(() => {
    if (route.pathSegments[0] === 'projects') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [route])

  const basePath = `/${route.language}`
  const currentLanguagePath = route.pathSegments.length > 0 ? `/${route.pathSegments.join('/')}` : '/'
  const isProjectsHub = route.pathSegments.length === 1 && route.pathSegments[0] === 'projects'
  const isDevlogHub = route.pathSegments.length === 1 && route.pathSegments[0] === 'devlog'
  const projectSlug =
    route.pathSegments.length === 2 && route.pathSegments[0] === 'projects' ? route.pathSegments[1] : null

  useEffect(() => {
    updateDocumentMetadata(getMetadata(route))
  }, [route])

  if (isProjectsHub) {
    return (
      <div className="site-shell">
        <Navbar language={route.language} basePath={basePath} currentLanguagePath={currentLanguagePath} />
        <main>
          <Projects hub language={route.language} basePath={basePath} />
        </main>
        <Footer />
      </div>
    )
  }

  if (projectSlug) {
    return (
      <div className="site-shell">
        <Navbar language={route.language} basePath={basePath} currentLanguagePath={currentLanguagePath} />
        <ProjectPage slug={projectSlug} language={route.language} basePath={basePath} />
        <Footer />
      </div>
    )
  }

  if (isDevlogHub) {
    return (
      <div className="site-shell">
        <Navbar language={route.language} basePath={basePath} currentLanguagePath={currentLanguagePath} />
        <main>
          <BlogPreview hub language={route.language} basePath={basePath} />
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="site-shell">
      <Navbar language={route.language} basePath={basePath} currentLanguagePath={currentLanguagePath} />
      <main>
        <Hero language={route.language} basePath={basePath} />
        <BlogPreview language={route.language} basePath={basePath} limit={3} showArchiveLink />
        <Projects language={route.language} basePath={basePath} />
        <Links language={route.language} />
        <Contact language={route.language} />
      </main>
      <Footer />
    </div>
  )
}

export default App
