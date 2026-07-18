import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import Aurora from './components/effects/Aurora'

export default function App() {
  return (
    <>
      <span id="top" />
      <Aurora />
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Stats />
          <Skills />
          <Projects />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </>
  )
}
