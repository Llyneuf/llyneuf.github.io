import Navbar from './components/Navbar'
import IntroTitle from './components/IntroTitle'
import Hero from './components/Hero'
import Identity from './components/Identity'
import Focus from './components/Focus'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './styles/main.css'

function App() {
  return (
    <div className="site-shell">
      <Navbar />
      <main>
        <IntroTitle />
        <Hero />
        <Identity />
        <Focus />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App