import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react'
import Particles from './Particles.jsx'

// Aceternity-style scroll-tilt container, now driven by framer-motion's
// useScroll for smooth, spring-eased, re-render-free scroll animation.
export default function ContainerScroll({ titleComponent, children }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  // On phones, skip the scroll-linked 3D tilt entirely — a promoted 3D layer
  // that re-transforms on every scroll frame is a big cause of scroll jank.
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 768px)').matches)
  }, [])

  // Flatten quickly as the card's top enters (works for a very long card).
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start 35%'],
  })
  const p = useSpring(scrollYProgress, { stiffness: 80, damping: 22, mass: 0.6 })

  // Gentle tilt: this card is the whole site (very tall), so a big rotateX
  // would push its far end past the perspective plane and flip/mirror it over
  // the hero. A small angle + deep perspective keeps the reveal glitch-free.
  const rotateX = useTransform(p, [0, 1], reduced ? [0, 0] : [12, 0])
  const scale = useTransform(p, [0, 1], reduced ? [1, 1] : [1.04, 1])
  const titleY = useTransform(p, [0, 1], reduced ? [0, 0] : [0, -60])

  return (
    <div className="cscroll" ref={ref}>
      <div className="cscroll__perspective">
        {titleComponent && (
          <motion.div className="cscroll__title" style={{ y: titleY }}>
            {titleComponent}
          </motion.div>
        )}
        <motion.div
          className="cscroll__card"
          style={
            isMobile
              ? undefined
              : { rotateX, scale, transformPerspective: 3500, transformOrigin: 'center top' }
          }
        >
          <div className="cscroll__card-inner">
            <Particles />
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
