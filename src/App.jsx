import { MotionConfig } from 'framer-motion'
import { LangProvider } from './i18n.jsx'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import About, { Marquee } from './components/About.jsx'
import Experience from './components/Experience.jsx'
import Services from './components/Services.jsx'
import Portfolio from './components/Portfolio.jsx'
import Contact from './components/Contact.jsx'

export default function App() {
  return (
    <LangProvider>
      <MotionConfig reducedMotion="user">
        <Nav />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Experience />
          <Services />
          <Portfolio />
          <Contact />
        </main>
      </MotionConfig>
    </LangProvider>
  )
}
