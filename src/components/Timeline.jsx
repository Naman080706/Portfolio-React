import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useSpring, useMotionValueEvent } from 'motion/react'
import { timeline } from '../data.js'

// Centered timeline with rounded hover boxes and a vertical line that fills as
// you scroll. Each dot turns fully orange exactly when the fill line reaches it.
export default function Timeline() {
  const ref = useRef(null)
  const itemRefs = useRef([])
  const ratiosRef = useRef([])
  const [active, setActive] = useState(() => new Set())

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 75%', 'end 65%'],
  })
  const fill = useSpring(scrollYProgress, { stiffness: 100, damping: 30, mass: 0.4 })

  // Measure each dot's position as a 0–1 ratio along the fill track.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const measure = () => {
      const trackH = Math.max(1, el.clientHeight - 16)
      ratiosRef.current = itemRefs.current.map((it) =>
        it ? Math.min(1, Math.max(0, (it.offsetTop + 21) / trackH)) : 1,
      )
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  // Activate dots as the fill value passes their ratio.
  useMotionValueEvent(fill, 'change', (v) => {
    const rs = ratiosRef.current
    setActive((prev) => {
      let changed = false
      const next = new Set(prev)
      rs.forEach((r, i) => {
        if (v >= r && !next.has(i)) {
          next.add(i)
          changed = true
        }
      })
      return changed ? next : prev
    })
  })

  return (
    <div className="tl" ref={ref}>
      <div className="tl__track">
        <motion.div className="tl__fill" style={{ scaleY: fill }} />
      </div>

      <ol className="tl__list">
        {timeline.map((item, i) => (
          <li
            className="tl__item reveal"
            key={i}
            ref={(el) => (itemRefs.current[i] = el)}
            style={{ transitionDelay: `${i * 80}ms` }}
          >
            <span className={`tl__dot ${active.has(i) ? 'tl__dot--active' : ''}`} />
            <div className="tl__box">
              <span className="tl__period">{item.period}</span>
              <h3 className="tl__title">{item.title}</h3>
              <span className="tl__place">{item.place}</span>
              <p className="tl__desc">{item.description}</p>
              {item.tags && (
                <ul className="tl__tags">
                  {item.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              )}
              {item.link && (
                <a className="tl__visit" href={item.link} target="_blank" rel="noreferrer">
                  {item.linkLabel || 'Visit'} <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
