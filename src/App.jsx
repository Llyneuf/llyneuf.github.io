import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import BlogPreview from './components/BlogPreview'
import Links from './components/Links'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './styles/main.css'

function App() {
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
