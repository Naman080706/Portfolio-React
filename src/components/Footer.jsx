import { profile } from '../data.js'
import { Icon } from './Icons.jsx'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <p className="footer__name">{profile.name}</p>
        <div className="footer__socials">
          {profile.socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label}>
              <Icon name={s.icon} size={18} />
            </a>
          ))}
        </div>
        <p className="footer__note">
          © {new Date().getFullYear()} {profile.name}. Built with React.
        </p>
      </div>
    </footer>
  )
}
