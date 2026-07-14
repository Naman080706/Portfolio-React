import { useState, useEffect } from 'react'
import { skills } from '../data.js'
import useReveal from './useReveal.js'

// Stylized SVG icons for each language/technology to ensure a highly premium visual.
const skillIcons = {
  // Languages
  'Python': (
    <svg viewBox="0 0 24 24" width="28" height="28" className="skill-svg">
      <path fill="#3776AB" d="M11.9 2c-5.2 0-4.9 2.2-4.9 2.2v2h4.9v.7h-7s-2.1-.2-2.1 4.7 1.8 4.9 1.8 4.9h1.1v-1.5c0-2.4 2-4.4 4.4-4.4h4.7s2.1-.2 2.1-4.7S15 2 15 2h-3.1zm1.2 2.1c.4 0 .8.3.8.8s-.3.8-.8.8-.8-.3-.8-.8.3-.8.8-.8z"/>
      <path fill="#FFD343" d="M12.1 22c5.2 0 4.9-2.2 4.9-2.2v-2h-4.9v-.7h7s2.1.2 2.1-4.7-1.8-4.9-1.8-4.9h-1.1v1.5c0 2.4-2 4.4-4.4 4.4H9.2s-2.1.2-2.1 4.7S9 22 9 22h3.1zm-1.2-2.1c-.4 0-.8-.3-.8-.8s.3-.8.8-.8.8.3.8.8-.3.8-.8.8z"/>
    </svg>
  ),
  'JavaScript': (
    <svg viewBox="0 0 24 24" width="28" height="28" className="skill-svg">
      <rect width="24" height="24" fill="#F7DF1E" rx="3"/>
      <path fill="#000000" d="M18.8 17.2c-.4-.7-.9-1.3-1.6-1.5-.5-.2-.9-.2-1.3.1-.3.2-.4.5-.4.9 0 .8.7 1.2 1.5 1.5.8.3 1.6.6 2.1 1.1.6.6.8 1.4.8 2.2 0 1.2-.5 2.1-1.4 2.8-.8.6-1.9.8-3 .8-1.5 0-2.6-.5-3.3-1.5l1.6-1c.4.6.9.9 1.6.9.5 0 .9-.1 1.2-.4.3-.2.4-.5.4-.8 0-.6-.4-1-1.3-1.3-.9-.3-1.7-.6-2.2-1.1-.6-.5-.9-1.2-.9-2.1 0-1 .4-1.9 1.2-2.5.8-.6 1.8-.8 2.9-.8 1.2 0 2.1.3 2.8 1l-1.5 1.1zm-7.6 2.3c0 .8-.2 1.4-.7 1.8-.4.3-.9.4-1.6.4-.7 0-1.2-.2-1.6-.6-.4-.4-.5-1-.5-1.8V11.2h2.2v8.3zm0-10.7H9V6.6h2.2v2.2z"/>
    </svg>
  ),
  'TypeScript': (
    <svg viewBox="0 0 24 24" width="28" height="28" className="skill-svg">
      <rect width="24" height="24" fill="#3178C6" rx="3"/>
      <path fill="#FFFFFF" d="M19 16.5c-.3-.5-.7-.9-1.2-1.1-.4-.2-.8-.2-1.1.1-.2.1-.3.4-.3.7 0 .6.5.9 1.1 1.1.6.2 1.2.5 1.6.8.5.5.6 1 .6 1.7 0 .9-.4 1.6-1 2.1-.6.5-1.4.6-2.3.6-1.1 0-2-.4-2.5-1.1l1.2-.8c.3.4.7.7 1.2.7.4 0 .7-.1.9-.3.2-.1.3-.4.3-.6 0-.5-.3-.8-1-1-.7-.2-1.3-.5-1.7-.8-.4-.4-.7-.9-.7-1.6 0-.8.3-1.4.9-1.9.6-.4 1.4-.6 2.2-.6.9 0 1.6.2 2.1.8l-1.1.8zM9 13.5v9H6.8v-9H4v-1.8h7.8V13.5H9z"/>
    </svg>
  ),
  'C++': (
    <svg viewBox="0 0 24 24" width="28" height="28" className="skill-svg">
      <rect width="24" height="24" fill="#00599C" rx="3"/>
      <text x="12" y="16" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">C++</text>
    </svg>
  ),
  'C': (
    <svg viewBox="0 0 24 24" width="28" height="28" className="skill-svg">
      <rect width="24" height="24" fill="#283593" rx="3"/>
      <text x="12" y="16" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">C</text>
    </svg>
  ),
  'HTML5': (
    <svg viewBox="0 0 24 24" width="28" height="28" className="skill-svg">
      <rect width="24" height="24" fill="#E44D26" rx="3"/>
      <path fill="#FFFFFF" d="M6 4l.9 12.4L12 18l5.1-1.6L18 4H6zm9.4 4H9.3l.15 1.6h5.8l-.42 4.6-2.83.78-2.83-.78-.19-2.1h1.42l.1 1.05 1.5.4 1.5-.4.16-1.75H6.85L6.4 6.4h11.2L15.4 8z"/>
    </svg>
  ),
  'CSS3': (
    <svg viewBox="0 0 24 24" width="28" height="28" className="skill-svg">
      <rect width="24" height="24" fill="#1572B6" rx="3"/>
      <path fill="#FFFFFF" d="M6 4l.9 12.4L12 18l5.1-1.6L18 4H6zm9.1 4H9l.15 1.55h5.7l-.15 1.5H9.3l.15 1.55h4.9l-.2 2.05-2.15.6-2.15-.6-.13-1.5H8.4l.24 2.6 3.36.95 3.36-.95.5-5.3.05-.5H15.1L15.1 8z"/>
    </svg>
  ),
  'Java': (
    <svg viewBox="0 0 24 24" width="28" height="28" className="skill-svg">
      <path fill="#E76F51" d="M4 18h16a2 2 0 01-2 2H6a2 2 0 01-2-2z"/>
      <path fill="#5391c4" d="M12 2C8 2 8 6 8 6v8s0 2 4 2 4-2 4-2V6s0-4-4-4zm1 5h-2V5h2v2zm0 3h-2V8h2v2zm0 3h-2v-2h2v2z"/>
    </svg>
  ),
  'SQL': (
    <svg viewBox="0 0 24 24" width="28" height="28" className="skill-svg">
      <rect width="24" height="24" fill="#4479A1" rx="3"/>
      <path fill="#FFFFFF" d="M12 3c-4.4 0-8 1.1-8 2.5V9c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5V5.5C20 4.1 16.4 3 12 3zm0 8c-4.4 0-8-1.1-8-2.5v3.5c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5V8.5c0 1.4-3.6 2.5-8 2.5zm0 5.5c-4.4 0-8-1.1-8-2.5v3.5c0 1.4 3.6 2.5 8 2.5s8-1.1 8-2.5v-3.5c0 1.4-3.6 2.5-8 2.5z"/>
    </svg>
  ),

  // Frontend
  'React.js': (
    <svg viewBox="0 0 24 24" width="28" height="28" className="skill-svg react-spin">
      <rect width="24" height="24" fill="#20232A" rx="3"/>
      <circle cx="12" cy="12" r="2" fill="#61DAFB"/>
      <path stroke="#61DAFB" fill="none" strokeWidth="1" d="M12 7c3.9 0 7 1 7 2.5S15.9 12 12 12 5 11 5 9.5 8.1 7 12 7zm0 0c0 3.9 1 7 2.5 7s2.5-3.1 2.5-7-1-5-2.5-5S12 3.1 12 7z" transform="rotate(30 12 12)"/>
      <path stroke="#61DAFB" fill="none" strokeWidth="1" d="M12 7c3.9 0 7 1 7 2.5S15.9 12 12 12 5 11 5 9.5 8.1 7 12 7zm0 0c0 3.9 1 7 2.5 7s2.5-3.1 2.5-7-1-5-2.5-5S12 3.1 12 7z" transform="rotate(90 12 12)"/>
      <path stroke="#61DAFB" fill="none" strokeWidth="1" d="M12 7c3.9 0 7 1 7 2.5S15.9 12 12 12 5 11 5 9.5 8.1 7 12 7zm0 0c0 3.9 1 7 2.5 7s2.5-3.1 2.5-7-1-5-2.5-5S12 3.1 12 7z" transform="rotate(150 12 12)"/>
    </svg>
  ),
  'Next.js': (
    <svg viewBox="0 0 24 24" width="28" height="28" className="skill-svg">
      <rect width="24" height="24" fill="#000000" rx="3"/>
      <path fill="#FFFFFF" d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm3.5 14.5l-4-5.5v5.5H10v-9h1.5l4 5.5V7.5H17v9h-1.5z"/>
    </svg>
  ),
  'Tailwind CSS': (
    <svg viewBox="0 0 24 24" width="28" height="28" className="skill-svg">
      <rect width="24" height="24" fill="#0F172A" rx="3"/>
      <path fill="#38BDF8" d="M12 6c-2.3 0-3.8 1.2-4.5 3.5.8-2.3 2.3-3 4.5-2.2 1.3.4 2.2 1.4 3.2 2.4 1.6 1.7 3.5 3.7 6.8 3.7 2.3 0 3.8-1.2 4.5-3.5-.8 2.3-2.3 3-4.5 2.2-1.3-.4-2.2-1.4-3.2-2.4C17.2 8 15.3 6 12 6zm-6 6c-2.3 0-3.8 1.2-4.5 3.5.8-2.3 2.3-3 4.5-2.2 1.3.4 2.2 1.4 3.2 2.4 1.6 1.7 3.5 3.7 6.8 3.7 2.3 0 3.8-1.2 4.5-3.5-.8 2.3-2.3 3-4.5 2.2-1.3-.4-2.2-1.4-3.2-2.4C11.2 14 9.3 12 6 12z"/>
    </svg>
  ),
  'GSAP': (
    <svg viewBox="0 0 24 24" width="28" height="28" className="skill-svg">
      <rect width="24" height="24" fill="#88CE02" rx="3"/>
      <text x="12" y="15" fill="#000000" fontSize="8" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">GSAP</text>
    </svg>
  ),
  'Framer Motion': (
    <svg viewBox="0 0 24 24" width="28" height="28" className="skill-svg">
      <rect width="24" height="24" fill="#000000" rx="3"/>
      <path fill="#FF008C" d="M12 4l4 4H8l4-4zm0 16l-4-4h8l-4 4zm0-8l4-4v8l-4-4z"/>
    </svg>
  ),

  // Backend
  'FastAPI': (
    <svg viewBox="0 0 24 24" width="28" height="28" className="skill-svg">
      <rect width="24" height="24" fill="#009688" rx="3"/>
      <path fill="#FFFFFF" d="M12 2L2 12h8v10l10-10h-8V2z"/>
    </svg>
  ),
  'Node.js': (
    <svg viewBox="0 0 24 24" width="28" height="28" className="skill-svg">
      <rect width="24" height="24" fill="#333333" rx="3"/>
      <path fill="#68A063" d="M12 3L4.5 7.3v8.7L12 20.3l7.5-4.3V7.3L12 3zm5.5 12l-5.5 3.2-5.5-3.2V8.7l5.5-3.2 5.5 3.2v6.3z"/>
    </svg>
  ),
  'Express.js': (
    <svg viewBox="0 0 24 24" width="28" height="28" className="skill-svg">
      <rect width="24" height="24" fill="#000000" rx="3"/>
      <text x="12" y="16" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="monospace">EX</text>
    </svg>
  ),
  'Flask': (
    <svg viewBox="0 0 24 24" width="28" height="28" className="skill-svg">
      <rect width="24" height="24" fill="#000000" rx="3"/>
      <path fill="#FFFFFF" d="M12 2C9.8 2 8 3.8 8 6v6.5c-.8.6-1.5 1.5-1.8 2.5C5.8 16.5 5 18 5 19v1c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-1c0-1-.8-2.5-1.2-4-.3-1-1-1.9-1.8-2.5V6c0-2.2-1.8-4-4-4zm0 2c1.1 0 2 .9 2 2v2H10V6c0-1.1.9-2 2-2z"/>
    </svg>
  ),

  // AI / ML
  'RAG & LLM Integration': (
    <svg viewBox="0 0 24 24" width="28" height="28" className="skill-svg">
      <rect width="24" height="24" fill="#673AB7" rx="3"/>
      <path fill="#FFFFFF" d="M12 4c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6zm1-8h-2v4h4v-2h-2V10z"/>
    </svg>
  ),
  'LangChain': (
    <svg viewBox="0 0 24 24" width="28" height="28" className="skill-svg">
      <rect width="24" height="24" fill="#1C3C3C" rx="3"/>
      <text x="12" y="16" fill="#F0B030" fontSize="13" textAnchor="middle" fontFamily="sans-serif">🦜</text>
    </svg>
  ),
  'FAISS': (
    <svg viewBox="0 0 24 24" width="28" height="28" className="skill-svg">
      <rect width="24" height="24" fill="#0064FF" rx="3"/>
      <path fill="#FFFFFF" d="M15.5 14h-.8l-.3-.3c1-1.1 1.6-2.6 1.6-4.2C16 5.9 13.1 3 9.5 3S3 5.9 3 9.5 5.9 16 9.5 16c1.6 0 3.1-.6 4.2-1.6l.3.3v.8l5 5 1.5-1.5-5-5zm-6 0C7 14 5 12 5 9.5S7 5 9.5 5 14 7 14 9.5 12 14 9.5 14z"/>
    </svg>
  ),
  'Gemini API': (
    <svg viewBox="0 0 24 24" width="28" height="28" className="skill-svg">
      <rect width="24" height="24" fill="#1A73E8" rx="3"/>
      <path fill="#FFFFFF" d="M12 2l2.5 6.5L21 11l-6.5 2.5L12 22l-2.5-6.5L3 11l6.5-2.5L12 2z"/>
    </svg>
  ),
  'OpenAI API': (
    <svg viewBox="0 0 24 24" width="28" height="28" className="skill-svg">
      <rect width="24" height="24" fill="#10a37f" rx="3"/>
      <path fill="#FFFFFF" d="M19.5 9.5c.2-.5.1-1-.2-1.4l-4.5-4.5c-.4-.4-1-.5-1.4-.2l-5.5 2.5 1.4 3 4.5-2 3.5 3.5-3.3 1.5 1.5 3.2 4-2.1zM4.5 14.5c-.2.5-.1 1 .2 1.4l4.5 4.5c.4.4 1 .5 1.4.2l5.5-2.5-1.4-3-4.5 2-3.5-3.5 3.3-1.5-1.5-3.2-4 2.1z"/>
    </svg>
  ),

  // Databases
  'PostgreSQL': (
    <svg viewBox="0 0 24 24" width="28" height="28" className="skill-svg">
      <rect width="24" height="24" fill="#336791" rx="3"/>
      <path fill="#FFFFFF" d="M12 3c-4 0-7 2-7 5.5 0 2.5 1.5 4 3 4.5-.5.7-1 1.5-1 2.5 0 2.5 2.5 4 5 4s5-1.5 5-4c0-1-.5-1.8-1-2.5 1.5-.5 3-2 3-4.5C19 5 16 3 12 3zm0 3c2.2 0 4 .8 4 2.5S14.2 11 12 11s-4-.8-4-2.5S9.8 6 12 6z"/>
    </svg>
  ),
  'MongoDB': (
    <svg viewBox="0 0 24 24" width="28" height="28" className="skill-svg">
      <rect width="24" height="24" fill="#4DB33D" rx="3"/>
      <path fill="#FFFFFF" d="M12 2s-4 4-4 8 2 6 4 9c2-3 4-5 4-9s-4-8-4-8zm0 13c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
    </svg>
  ),
  'MySQL': (
    <svg viewBox="0 0 24 24" width="28" height="28" className="skill-svg">
      <rect width="24" height="24" fill="#00758F" rx="3"/>
      <path fill="#FFFFFF" d="M12 3C7.6 3 4 5.2 4 8v8c0 2.8 3.6 5 8 5s8-2.2 8-5V8c0-2.8-3.6-5-8-5zm0 15c-3.3 0-6-1.3-6-3v-2.5c1.2.9 3.5 1.5 6 1.5s4.8-.6 6-1.5V15c0 1.7-2.7 3-6 3z"/>
    </svg>
  ),
  'SQLite': (
    <svg viewBox="0 0 24 24" width="28" height="28" className="skill-svg">
      <rect width="24" height="24" fill="#003B57" rx="3"/>
      <path fill="#FFFFFF" d="M19 12v6H5v-6h14m2-2H3v10h18V10zM12 3L4 9h16l-8-6z"/>
    </svg>
  ),
  'Firebase': (
    <svg viewBox="0 0 24 24" width="28" height="28" className="skill-svg">
      <rect width="24" height="24" fill="#FFCA28" rx="3"/>
      <path fill="#F57C00" d="M4 18l6-11 3 5-9 6zm16 0l-5-10-2 4 7 6z"/>
    </svg>
  ),

  // Tools & Platforms
  'Git & GitHub': (
    <svg viewBox="0 0 24 24" width="28" height="28" className="skill-svg">
      <rect width="24" height="24" fill="#F05032" rx="3"/>
      <path fill="#FFFFFF" d="M18.9 10.5c.3-.3.3-.8 0-1.1l-5.3-5.3c-.3-.3-.8-.3-1.1 0l-5.3 5.3c-.3.3-.3.8 0 1.1l5.3 5.3c.3.3.8.3 1.1 0l5.3-5.3zm-6.4 3.7c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9zm0-3.6c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z"/>
    </svg>
  ),
  'Docker': (
    <svg viewBox="0 0 24 24" width="28" height="28" className="skill-svg">
      <rect width="24" height="24" fill="#0db7ed" rx="3"/>
      <path fill="#FFFFFF" d="M3 13.5v1c0 .8.7 1.5 1.5 1.5h15c.8 0 1.5-.7 1.5-1.5v-1H3zm6-5h2V11H9V8.5zm4 0h2V11h-2V8.5zm4 0h2V11h-2V8.5zm-12 0h2V11H5V8.5z"/>
    </svg>
  ),
  'Postman': (
    <svg viewBox="0 0 24 24" width="28" height="28" className="skill-svg">
      <rect width="24" height="24" fill="#FF6C37" rx="3"/>
      <path fill="#FFFFFF" d="M12 3a9 9 0 00-9 9 9 9 0 009 9 9 9 0 009-9 9 9 0 00-9-9zm1 14h-2v-4H8v-2h3V8h2v3h3v2h-3v4z"/>
    </svg>
  ),
  'VS Code': (
    <svg viewBox="0 0 24 24" width="28" height="28" className="skill-svg">
      <rect width="24" height="24" fill="#007ACC" rx="3"/>
      <path fill="#FFFFFF" d="M18.8 6.2l-3-3c-.2-.2-.6-.2-.8 0L9.4 8.8l-3.3-3c-.2-.2-.6-.2-.8 0l-2 2c-.2.2-.2.6 0 .8l3 3-3 3c-.2.2-.2.6 0 .8l2 2c.2.2.6.2.8 0l3.3-3 5.6 5.6c.2.2.6.2.8 0l3-3c.2-.2.2-.6 0-.8l-4.5-4.5 4.5-4.5c.2-.2.2-.6 0-.8z"/>
    </svg>
  ),
}

export default function Skills() {
  useReveal()
  const [activeFolder, setActiveFolder] = useState(null)
  const [hoveredFolder, setHoveredFolder] = useState(null)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1000)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleFolderMouseEnter = (index) => {
    setHoveredFolder(index)
  }

  const handleFolderMouseLeave = () => {
    setHoveredFolder(null)
  }

  const toggleFolder = (index) => {
    setActiveFolder((cur) => (cur === index ? null : index))
  }

  return (
    <section id="skills" className="section container">
      <header className="section__head reveal">
        <h2 className="section__title">Skills &amp; Technologies</h2>
      </header>

      {/* Grid containing categories. Rows shift dynamically on hover to prevent collisions */}
      <div className="skills-folder-grid">
        {skills.map((group, index) => {
          const isUpperRow = index < 3
          const isActive = activeFolder === index
          const isHovered = hoveredFolder === index
          const folderClass = `skills-folder ${isActive ? 'active' : ''} ${
            isUpperRow ? 'upper-row' : 'down-row'
          }`

          // Define vertical translation to prevent overlapping collision
          let transformStyle = {}
          if (isHovered && !isActive) {
            transformStyle = {
              transform: isUpperRow ? 'translateY(-20px)' : 'translateY(20px)',
            }
          }

          return (
            <div
              key={group.category}
              className={folderClass}
              style={transformStyle}
              onMouseEnter={() => handleFolderMouseEnter(index)}
              onMouseLeave={handleFolderMouseLeave}
              onClick={() => toggleFolder(index)}
            >
              {/* Folder tab backdrop sheet stack */}
              <div className="folder-back">
                <div className="folder-tab"></div>
              </div>

              {/* Nested preview cards: fanned symmetrically, peeking out the top;
                  spread a bit more on hover. Each card stays partly visible. */}
              <div className="folder-preview-sheets">
                {group.items.slice(0, 5).map((item, itemIdx, arr) => {
                  const n = arr.length
                  const offset = itemIdx - (n - 1) / 2 // symmetric: e.g. -2..2
                  const spread = isHovered && !isActive ? 30 : 17
                  const rot = offset * (isHovered && !isActive ? 9 : 6)
                  const lift = isHovered && !isActive ? 26 : 0
                  const scale = isHovered && !isActive ? 1.07 : 1
                  const transformStyle = `translate(${offset * spread}px, ${-lift - Math.abs(offset) * 3}px) rotate(${rot}deg) scale(${scale})`
                  return (
                    <div
                      key={item.name}
                      className="preview-sheet"
                      style={{
                        transform: transformStyle,
                        zIndex: 10 - Math.round(Math.abs(offset)), // center card on top
                      }}
                    >
                      {skillIcons[item.name] || <span className="fallback-dot" />}
                    </div>
                  );
                })}
              </div>

              {/* Front Flap of folder */}
              <div className="folder-front">
                <span className="folder-category-title">{group.category}</span>
              </div>

              {/* Popped Out floating icons container */}
              {isActive && (
                <div className="popped-icons-overlay" onClick={(e) => e.stopPropagation()}>
                  {group.items.map((item, itemIdx) => {
                    // Arrange in centered rows above the folder so they stay within
                    // the folder's column and don't overlap neighbours.
                    const totalItems = group.items.length
                    const isMobile = windowWidth < 600
                    const iconSize = isMobile ? 40 : totalItems > 6 ? 42 : 48
                    const halfSize = iconSize / 2

                    // Keep the whole row inside the folder's own column so it never
                    // spills onto neighbours, and use a single row so it never pops
                    // up into the title / the row above.
                    const colWidth = isMobile
                      ? Math.min(windowWidth - 40, 460)
                      : (Math.min(windowWidth, 1120) - 48 - 60) / 3
                    const maxSpan = Math.max(iconSize, colWidth - iconSize - 8)
                    let gapX = isMobile ? 54 : 62
                    if ((totalItems - 1) * gapX > maxSpan) gapX = maxSpan / (totalItems - 1)

                    const startX = -((totalItems - 1) * gapX) / 2
                    const initialX = startX + itemIdx * gapX
                    const initialY = isMobile ? -84 : -100

                    const nodeStyle = {
                      position: 'absolute',
                      left: '50%',
                      top: '0px',
                      width: `${iconSize}px`,
                      height: `${iconSize}px`,
                      // Shift left/top by half icon size for perfect centering
                      transform: `translate(${initialX - halfSize}px, ${initialY - halfSize}px)`,
                      animationDelay: `${itemIdx * 0.05}s`,
                      zIndex: 50,
                    }

                    return (
                      <div
                        key={item.name}
                        className="popped-skill-node tooltip-container"
                        style={nodeStyle}
                      >
                        <div
                          className="skill-icon-wrap"
                          style={{ width: `${iconSize}px`, height: `${iconSize}px`, animationDelay: `${itemIdx * 0.05}s` }}
                        >
                          {skillIcons[item.name] || (
                            <div className="placeholder-icon">
                              {item.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        {/* Tooltip containing skill name only, placed below the icon */}
                        <div className="tooltip-bubble" style={{ top: `${iconSize + 8}px` }}>
                          <span className="tooltip-name">{item.name}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  )
}
