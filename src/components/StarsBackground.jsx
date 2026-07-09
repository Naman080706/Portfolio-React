import { useEffect, useMemo, useRef } from 'react'

// Build a CSS box-shadow string of `count` randomly placed dots.
function generateStars(count, color) {
  const shadows = []
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 4000) - 2000
    const y = Math.floor(Math.random() * 4000) - 2000
    shadows.push(`${x}px ${y}px ${color}`)
  }
  return shadows.join(', ')
}

// One drifting layer. Two stacked copies (offset by 2000px) make the
// upward scroll seamless as it loops.
function StarLayer({ count, size, duration, color }) {
  const shadow = useMemo(() => generateStars(count, color), [count, color])
  const dot = {
    width: `${size}px`,
    height: `${size}px`,
    boxShadow: shadow,
  }
  return (
    <div className="star-layer" style={{ animationDuration: `${duration}s` }}>
      <div className="star-dot" style={dot} />
      <div className="star-dot star-dot--2" style={dot} />
    </div>
  )
}

// Fixed full-screen starfield used as the site background.
export default function StarsBackground({ speed = 50, starColor = '#ffffff', factor = 0.04 }) {
  const parallaxRef = useRef(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const onMove = (e) => {
      const x = -(e.clientX - window.innerWidth / 2) * factor
      const y = -(e.clientY - window.innerHeight / 2) * factor
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translate(${x}px, ${y}px)`
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [factor])

  // Far fewer stars on phones — thousands of box-shadows are expensive to paint.
  const mobile =
    typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches
  const counts = mobile ? [300, 120, 60] : [1000, 400, 200]

  return (
    <div className="stars-bg" aria-hidden="true">
      <div className="stars-parallax" ref={parallaxRef}>
        <StarLayer count={counts[0]} size={1} duration={speed} color={starColor} />
        <StarLayer count={counts[1]} size={2} duration={speed * 2} color={starColor} />
        <StarLayer count={counts[2]} size={3} duration={speed * 3} color={starColor} />
      </div>
    </div>
  )
}
