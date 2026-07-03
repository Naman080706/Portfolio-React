import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useReducedMotion } from 'motion/react'

// Per-section 3D scroll reveal, driven by framer-motion for smooth,
// spring-eased motion as each section scrolls into view.
export default function ScrollReveal3D({ children, max = 14 }) {
  const ref = useRef(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start center'],
  })
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.5 })

  const rotateX = useTransform(p, [0, 1], reduced ? [0, 0] : [max, 0])
  const y = useTransform(p, [0, 1], reduced ? [0, 0] : [40, 0])
  const opacity = useTransform(p, [0, 1], reduced ? [1, 1] : [0.4, 1])

  return (
    <div className="reveal3d" ref={ref}>
      <motion.div
        className="reveal3d__inner"
        style={{ rotateX, y, opacity, transformPerspective: 1200 }}
      >
        {children}
      </motion.div>
    </div>
  )
}
