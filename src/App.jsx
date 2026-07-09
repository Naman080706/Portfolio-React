import Preloader from './components/Preloader.jsx'
import StarsBackground from './components/StarsBackground.jsx'
import HeroLanding from './components/HeroLanding.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Experience from './components/Experience.jsx'
import Contact from './components/Contact.jsx'
import ContainerScroll from './components/ContainerScroll.jsx'

export default function App() {
  return (
    <>
      <Preloader />
      <StarsBackground />
      <HeroLanding />
      <main>
        {/* Everything after the hero lives inside one long tilt card */}
        <ContainerScroll>
          <div className="screen">
            <About />
            <Skills />
            <Projects />
            <Experience />
          </div>
        </ContainerScroll>
        {/* Contact sits outside the card — the card ends before "Get in Touch" */}
        <Contact />
      </main>
    </>
  )
}
