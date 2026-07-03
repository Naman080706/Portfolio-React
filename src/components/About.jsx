import { about, profile } from '../data.js'
import useReveal from './useReveal.js'
import Timeline from './Timeline.jsx'

const notes = [
  {
    t: 'Full-Stack Engineering',
    d: 'I build end-to-end products with React, Next.js and FastAPI — clean typed APIs, fast frontends, and interfaces that hold up under real load.',
  },
  {
    t: 'AI & RAG Systems',
    d: 'Designing LLM-powered apps: retrieval-augmented pipelines, multi-agent workflows, and Gemini / OpenAI integrations that turn messy data into answers.',
  },
  {
    t: 'Blockchain & Building',
    d: 'CS & Blockchain student who ships fast at hackathons — exploring decentralized systems and building side projects weekend by weekend.',
  },
]

export default function About() {
  useReveal()
  const firstName = profile.name.split(' ')[0]

  return (
    <section id="about" className="section container">
      <h2 className="section__title about-title reveal">About Me</h2>

      <div className="about-grid">
        <div className="about-col reveal">
          <p className="about-greeting">Hey, I’m {firstName}</p>
          {about.paragraphs.map((p, i) => (
            <p key={i} className="about-text">{p}</p>
          ))}
        </div>

        <aside className="about-notes reveal">
          {notes.map((n) => (
            <div className="note-card" key={n.t}>
              <h3 className="note-card__title">{n.t}</h3>
              <p className="note-card__desc">{n.d}</p>
            </div>
          ))}
        </aside>
      </div>

      <h3 className="timeline-title reveal">Timeline</h3>
      <Timeline />
    </section>
  )
}
