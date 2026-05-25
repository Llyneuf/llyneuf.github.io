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

function App() {
  const [route, setRoute] = useState(() => window.location.hash)

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash)

    window.addEventListener('hashchange', handleHashChange)

    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    if (route === '#/projects' || route.startsWith('#/projects/')) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
  }, [route])

  const projectMatch = route.match(/^#\/projects\/([^/]+)$/)

  if (route === '#/projects') {
    return (
      <div className="site-shell">
        <Navbar />
        <main>
          <Projects hub />
        </main>
        <Footer />
      </div>
    )
  }

  if (projectMatch) {
    return (
      <div className="site-shell">
        <Navbar />
        <ProjectPage slug={projectMatch[1]} />
        <Footer />
      </div>
    )
  }

  return (
    <div className="site-shell">
      <Navbar />
      <main>
        <Hero />
        <BlogPreview />
        <Projects />
        <Links />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
