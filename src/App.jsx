import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Identity from './components/Identity'
import Focus from './components/Focus'
import Projects from './components/Projects'
import Services from './components/Services'
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
        <Identity />
        <Focus />
        <Projects />
        <Services />
        <BlogPreview />
        <Links />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
