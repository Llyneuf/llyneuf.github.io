import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import BlogPreview from './components/BlogPreview'
import Links from './components/Links'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ProjectPage from './components/ProjectPage'
import { useEffect, useState } from 'react'
import './styles/main.css'

const supportedLanguages = ['ru', 'en', 'es']
const defaultLanguage = 'ru'

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
  const projectSlug =
    route.pathSegments.length === 2 && route.pathSegments[0] === 'projects' ? route.pathSegments[1] : null

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

  return (
    <div className="site-shell">
      <Navbar language={route.language} basePath={basePath} currentLanguagePath={currentLanguagePath} />
      <main>
        <Hero language={route.language} basePath={basePath} />
        <BlogPreview language={route.language} />
        <Projects language={route.language} basePath={basePath} />
        <Links language={route.language} />
        <Contact language={route.language} />
      </main>
      <Footer />
    </div>
  )
}

export default App
