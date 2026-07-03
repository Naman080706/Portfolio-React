import { useEffect } from 'react'

// Adds a "is-visible" class to any element with the "reveal" class
// when it scrolls into view. Used for fade-in-on-scroll animations.
export default function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      els.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )

    els.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
