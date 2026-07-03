import { profile } from '../data.js'

// Lamp banner with a glassmorphism profile: name (two lines) on the left,
// photo in a frosted-glass frame on the right, centered on screen.
export default function LampHeader() {
  const [firstName, ...restName] = profile.name.split(' ')
  const lastName = restName.join(' ')

  return (
    <header className="lamp-header">
      <div className="lamp">
        <div className="lamp__cone" />
        <div className="lamp__line" />

        <div className="lamp__content">
          <div className="profile">
            <div className="profile__name">
              <span>{firstName}</span>
              <span>{lastName}</span>
            </div>
            <div className="glass-frame">
              <img className="lamp__photo" src="/naman.png" alt={profile.name} />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
