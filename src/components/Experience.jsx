import { experience, certifications } from '../data.js'
import useReveal from './useReveal.js'

export default function Experience() {
  useReveal()

  const hasExp = experience && experience.length > 0
  const hasCerts = certifications && certifications.length > 0
  if (!hasExp && !hasCerts) return null

  return (
    <section id="experience" className="section container">
      <header className="section__head reveal">
        <h2 className="section__title">Achievements</h2>
      </header>

      <div className="xp">
        {hasExp && (
          <div className="xp__col">
            {experience.map((e, i) => (
              <div key={i} className="xp__item reveal">
                <span className="xp__period">{e.period}</span>
                <h3 className="xp__role">{e.role}</h3>
                <span className="xp__company">{e.company}</span>
                <ul className="xp__points">
                  {e.points.map((pt, j) => (
                    <li key={j}>{pt}</li>
                  ))}
                </ul>
                {e.tags && (
                  <ul className="xp__tags">
                    {e.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {hasCerts && (
          <div className="xp__col">
            <div className="certs reveal">
              {certifications.map((c, i) => (
                <div key={i} className="cert">
                  <div className="cert__name">{c.name}</div>
                  <div className="cert__meta">
                    {c.issuer} · {c.year}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
