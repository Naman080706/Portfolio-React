import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { profile } from '../data.js'
import { Icon } from './Icons.jsx'
import { ShinyButton } from '@/components/ui/shiny-button'

// Floating grid nav — casual phrasing scattered across the backdrop grid.
// `pos` places each item on a grid line (66px cell) of the landing hero.
const navLinks = [
  { id: 'about', label: 'the human behind the screen', cls: 'hn--about' },
  { id: 'projects', label: "stuff i've built", cls: 'hn--projects' },
  { id: 'timeline', label: 'my timeline so far', cls: 'hn--timeline' },
  { id: 'experience', label: 'small wins', cls: 'hn--experience' },
  { id: 'skills', label: "things i'm good at", cls: 'hn--skills' },
  { id: 'contact', label: "let's vibe", cls: 'hn--contact' },
]

// Sum offsetTop up the chain — this is the element's *layout* position, which
// ignores the tilt card's CSS transform, so sections inside ContainerScroll
// (About, Skills, Projects…) scroll to the right spot instead of overshooting.
function layoutTop(el) {
  let y = 0
  while (el) {
    y += el.offsetTop
    el = el.offsetParent
  }
  return y
}

function scrollToSection(e, id) {
  e.preventDefault()
  const el = document.getElementById(id)
  if (el) window.scrollTo({ top: Math.max(0, layoutTop(el) - 24), behavior: 'smooth' })
}

// Playful one-liners that pop up beside the shoulder on photo hover.
const quips = [
  'Yes, this photo is AI-generated.',
  "I'm probably sleepy right now.",
  'I promise my code is more organized than my sleep schedule.',
  'I have 99 problems, and 98 of them are missing semicolons.',
  "I'm a 100% sweatpants developer.",
  'Currently listening to the same song on loop for the 47th time today.',
]

// Full-screen black landing hero: grid backdrop, huge white name, centered
// cutout, role + description bottom-left, orange shiny social buttons right.
export default function HeroLanding() {
  const [first, ...rest] = profile.name.split(' ')
  const last = rest.join(' ')

  const reduced = useReducedMotion()
  const [hovered, setHovered] = useState(false)
  const [quip, setQuip] = useState(null)
  // Remembers the last two shown indices so a phrase can't reappear until at
  // least two other phrases have played (e.g. 1 → 4 → 2 → 1 is allowed).
  const recent = useRef([])

  // On each hover, pick ONE quip and keep it until the cursor leaves. The next
  // hover picks again with the same rule (no repeat until two others have shown).
  useEffect(() => {
    if (!hovered) return
    let i
    do {
      i = Math.floor(Math.random() * quips.length)
    } while (recent.current.includes(i))
    recent.current = [...recent.current, i].slice(-2)
    // Date.now() key remounts the node so the pop-in animation replays.
    setQuip({ text: quips[i], key: Date.now() })
  }, [hovered])

  return (
    <header className="landing">
      <nav className="hero-nav" aria-label="Section navigation">
        {navLinks.map((l, i) => (
          <a
            key={l.id}
            href={`#${l.id}`}
            className={`hero-nav__item ${l.cls}`}
            style={{ animationDelay: `${1 + i * 0.12}s` }}
            onClick={(e) => scrollToSection(e, l.id)}
          >
            <span className="hero-nav__bracket">[</span> {l.label}{' '}
            <span className="hero-nav__bracket">]</span>
          </a>
        ))}
      </nav>

      <div className="landing__card">
        <div className="landing__stage">
          <h1 className="landing__name">
            <span className="landing__name-outline">{first.toUpperCase()}</span>
            <span className="landing__name-solid">{last.toUpperCase()}</span>
          </h1>

          <img
            className="landing__photo"
            src="/naman.png"
            alt={profile.name}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => {
              setHovered(false)
              setQuip(null)
            }}
          />

          <AnimatePresence mode="wait">
            {hovered && quip && (
              <motion.p
                className="landing__quip"
                key={quip.key}
                aria-hidden="true"
                initial={reduced ? { opacity: 0 } : { opacity: 0, x: -6, y: 8, scale: 0.94 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.96 }}
                transition={{ duration: 0.32, ease: [0.34, 1.4, 0.64, 1] }}
              >
                {quip.text}
              </motion.p>
            )}
          </AnimatePresence>

          <div className="landing__info">
            <h2 className="landing__role">Full-Stack &amp; AI / ML Developer</h2>
            <div style={{ marginTop: '16px' }}>
              <ShinyButton
                onClick={() => window.open('/resume.pdf', '_blank', 'noopener,noreferrer')}
              >
                <Icon name="download" size={16} /> Resume
              </ShinyButton>
            </div>
          </div>

          <div className="landing__socials">
            {profile.socials.map((s) => (
              <ShinyButton
                key={s.label}
                className="w-full"
                onClick={() => window.open(s.url, '_blank', 'noopener,noreferrer')}
              >
                <Icon name={s.icon} size={16} /> {s.label}
              </ShinyButton>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
