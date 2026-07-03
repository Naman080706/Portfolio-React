import { useEffect, useState } from 'react'
import { profile, stats } from '../data.js'
import { Icon } from './Icons.jsx'

// Typewriter effect that cycles through profile.roles
function useTypewriter(words, speed = 90, pause = 1400) {
  const [text, setText] = useState('')
  const [i, setI] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[i % words.length]
    let timeout

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text === '') {
      setDeleting(false)
      setI((v) => v + 1)
    } else {
      timeout = setTimeout(
        () => {
          setText((prev) =>
            deleting
              ? current.slice(0, prev.length - 1)
              : current.slice(0, prev.length + 1),
          )
        },
        deleting ? speed / 2 : speed,
      )
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, i, words, speed, pause])

  return text
}

export default function Hero() {
  const typed = useTypewriter(profile.roles)
  return (
    <section id="home" className="hero">
      <div className="hero__grid container">
        <div className="hero__content">
          <p className="hero__hello">👋 Hello, I’m</p>
          <h1 className="hero__name">{profile.name}</h1>
          <h2 className="hero__role">
            <span className="hero__role-text">{typed}</span>
            <span className="hero__caret">|</span>
          </h2>
          <p className="hero__tagline">{profile.tagline}</p>

          <div className="hero__actions">
            <a href="#projects" className="btn btn--primary">
              View My Work <Icon name="arrow" size={18} />
            </a>
            <a href="#contact" className="btn btn--ghost">
              Get in Touch
            </a>
            <a href={profile.resumeUrl} download className="btn btn--ghost">
              <Icon name="download" size={18} /> Resume
            </a>
          </div>

          <div className="hero__socials">
            {profile.socials.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label}>
                <Icon name={s.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="hero__stats container">
        {stats.map((s) => (
          <div key={s.label} className="stat">
            <div className="stat__value">{s.value}</div>
            <div className="stat__label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
