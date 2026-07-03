import { projects } from '../data.js'
import useReveal from './useReveal.js'
import FlipCard from './ui/flip-card.jsx'

export default function Projects() {
  useReveal()

  return (
    <section id="projects" className="section container">
      <header className="section__head reveal">
        <h2 className="section__title">Featured Projects</h2>
      </header>

      <div className="projects-flip reveal">
        {projects.map((p, i) => (
          <FlipCard
            key={p.title}
            index={i}
            title={p.title}
            tagline={p.tagline}
            tech={p.tags}
            description={p.description}
            repoUrl={p.repoUrl}
          />
        ))}
      </div>
    </section>
  )
}
