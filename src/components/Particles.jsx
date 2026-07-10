import { useEffect, useRef, useCallback } from 'react'

/**
 * Canvas particle system — blue particles with mouse-grab interaction.
 * Particles near the cursor get connected with bright lines.
 */
export default function Particles({ className = '' }) {
  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const mouseRef = useRef({ x: -9999, y: -9999, active: false })

  const init = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let w = (canvas.width = canvas.parentElement.offsetWidth)
    let h = (canvas.height = canvas.parentElement.offsetHeight)

    // Far fewer particles on phones so the per-frame O(n²) link pass stays cheap
    // and scrolling/tapping stays smooth.
    const isMobile = window.matchMedia('(max-width: 768px), (pointer: coarse)').matches
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const PARTICLE_COUNT = isMobile ? 45 : 180
    const MAX_LINK_DIST = isMobile ? 120 : 160
    const MOUSE_GRAB_DIST = 240
    const SPEED = 0.45

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * SPEED * 2,
      vy: (Math.random() - 0.5) * SPEED * 2,
      r: Math.random() * 2 + 1,
      opacity: Math.random() * 0.4 + 0.35,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      const mouse = mouseRef.current

      // draw particle-to-particle lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_LINK_DIST) {
            const alpha = (1 - dist / MAX_LINK_DIST) * 0.28
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`
            ctx.lineWidth = 0.7
            ctx.stroke()
          }
        }
      }

      // draw mouse-grab lines (connect nearby particles to cursor)
      if (mouse.active) {
        for (const p of particles) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_GRAB_DIST) {
            const alpha = (1 - dist / MOUSE_GRAB_DIST) * 0.6
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      // move & draw particles
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${p.opacity})`
        ctx.fill()
      }

      animRef.current = requestAnimationFrame(draw)
    }

    draw()

    // Mouse tracking — translate page coords to canvas-relative coords
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      }
    }
    const onMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999, active: false }
    }

    // Listen on the card container so hover works even over section content
    // (skip on touch — there's no cursor and it saves work)
    const container = canvas.parentElement
    if (!isTouch) {
      container.addEventListener('mousemove', onMouseMove)
      container.addEventListener('mouseleave', onMouseLeave)
    }

    const onResize = () => {
      w = canvas.width = canvas.parentElement.offsetWidth
      h = canvas.height = canvas.parentElement.offsetHeight
      for (const p of particles) {
        p.x = Math.min(p.x, w)
        p.y = Math.min(p.y, h)
      }
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animRef.current)
      container.removeEventListener('mousemove', onMouseMove)
      container.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    const cleanup = init()
    return cleanup
  }, [init])

  return (
    <canvas
      ref={canvasRef}
      className={`particles-canvas ${className}`}
      aria-hidden="true"
    />
  )
}
