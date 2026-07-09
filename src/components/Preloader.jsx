import { useEffect, useState } from 'react'

// Full-screen loader shown until the page is fully ready (all assets loaded +
// fonts ready), then it fades out to reveal the finished UI as a whole. Landing
// entrance animations are paused via `body.is-loading` so they play *after*.
export default function Preloader() {
  const [progress, setProgress] = useState(0)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    const body = document.body
    body.classList.add('is-loading')

    let raf = 0
    let cap = 85 // creep toward this while still loading
    let cur = 0
    const ready = {
      loaded: document.readyState === 'complete',
      fonts: false,
      min: false,
    }
    const check = () => {
      if (ready.loaded && ready.fonts && ready.min) cap = 100
    }

    const onLoad = () => {
      ready.loaded = true
      check()
    }
    window.addEventListener('load', onLoad)

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        ready.fonts = true
        check()
      })
    } else {
      ready.fonts = true
    }

    // brief minimum so it never just flashes, and a hard cap so a stuck asset
    // can never trap the visitor on the loader
    const minT = setTimeout(() => {
      ready.min = true
      check()
    }, 700)
    const hardT = setTimeout(() => {
      cap = 100
    }, 6000)

    check()

    const tick = () => {
      cur += (cap - cur) * 0.08
      const p = Math.min(100, Math.round(cur))
      setProgress(p)
      if (cap === 100 && p >= 100) {
        setTimeout(() => {
          setHidden(true)
          body.classList.remove('is-loading')
        }, 200)
        return
      }
      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(minT)
      clearTimeout(hardT)
      window.removeEventListener('load', onLoad)
      body.classList.remove('is-loading')
    }
  }, [])

  return (
    <div className={`preloader${hidden ? ' preloader--hidden' : ''}`} aria-hidden={hidden}>
      <div className="preloader__inner">
        <div className="preloader__mark">
          <span className="preloader__mark-outline">NAMAN</span>
          <span className="preloader__mark-solid">JAIN</span>
        </div>
        <div className="preloader__bar">
          <div className="preloader__fill" style={{ width: `${progress}%` }} />
        </div>
        <div className="preloader__pct">{progress}%</div>
      </div>
    </div>
  )
}
