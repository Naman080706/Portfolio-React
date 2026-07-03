import { profile } from '../data.js'
import { Icon } from './Icons.jsx'
import { ShinyButton } from '@/components/ui/shiny-button'

// Full-screen black landing hero: grid backdrop, huge white name, centered
// cutout, role + description bottom-left, orange shiny social buttons right.
export default function HeroLanding() {
  const [first, ...rest] = profile.name.split(' ')
  const last = rest.join(' ')

  return (
    <header className="landing">
      <div className="landing__card">
        <div className="landing__stage">
          <h1 className="landing__name">
            <span className="landing__name-outline">{first.toUpperCase()}</span>
            <span className="landing__name-solid">{last.toUpperCase()}</span>
          </h1>

          <img className="landing__photo" src="/naman.png" alt={profile.name} />

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
