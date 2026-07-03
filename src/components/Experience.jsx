import { motion, useReducedMotion } from 'motion/react'
import { certifications } from '../data.js'
import useReveal from './useReveal.js'

// Small inline trophy so the rank badge doesn't depend on an icon set.
function Trophy() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  )
}

export default function Experience() {
  useReveal()
  const reduced = useReducedMotion()

  if (!certifications || certifications.length === 0) return null

  return (
    <section id="experience" className="section container">
      <header className="section__head reveal">
        <h2 className="section__title">Achievements</h2>
      </header>

      <div className="achv">
        {certifications.map((c, i) => (
          <motion.article
            key={c.name}
            className="achv__card"
            initial={reduced ? false : { opacity: 0, y: 40 }}
            whileInView={reduced ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="achv__rank">
              <Trophy />
              {c.rank}
            </div>

            <div className="achv__head">
              <h3 className="achv__title">{c.name}</h3>
              <span className="achv__year">{c.year}</span>
            </div>

            {c.project && <div className="achv__project">{c.project}</div>}
            <div className="achv__award">{c.award}</div>

            <p className="achv__summary">{c.summary}</p>

            <div className="achv__meta">
              {c.host && <span>{c.host}</span>}
              {c.scale && <span>{c.scale}</span>}
            </div>

            {c.tags && (
              <ul className="achv__tags">
                {c.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  )
}
