import { profile } from '../../data.js'
import { Icon } from '../Icons.jsx'

// 3D hover-tilt glass card for the Contact section: thank-you line, email,
// location, and GitHub / LinkedIn / Email buttons.
export default function ContactCard() {
  const initials = profile.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')

  return (
    <div className="group mx-auto h-[380px] w-full max-w-[330px] [perspective:1000px]">
      <div className="relative h-full rounded-[50px] bg-gradient-to-br from-[#050f1e] to-[#020712] shadow-2xl transition-all duration-500 ease-in-out [transform-style:preserve-3d] group-hover:[box-shadow:rgba(0,0,0,0.3)_30px_50px_25px_-40px,rgba(0,0,0,0.1)_0px_25px_30px_0px] group-hover:[transform:rotate3d(1,1,0,30deg)]">
        <div className="absolute inset-2 rounded-[55px] border-b border-l border-white/20 bg-gradient-to-b from-white/20 to-white/[0.06] backdrop-blur-sm [transform-style:preserve-3d] [transform:translate3d(0,0,25px)]" />

        <div className="absolute [transform:translate3d(0,0,26px)]">
          <div className="px-7 pt-[90px] pb-0">
            <span className="block text-xl font-black text-white">Let’s build something</span>
            <span className="mt-8 block text-[13.5px] leading-relaxed text-zinc-300">
              Thanks for scrolling all the way here! I’m always open to new projects,
              collaborations, or just a good conversation.
            </span>
            <div className="mt-14 space-y-8 text-[13px] text-zinc-200">
              <div className="flex items-center gap-2.5">
                <span className="flex w-4 shrink-0 justify-center text-orange-400">
                  <Icon name="mail" size={15} />
                </span>
                {profile.email}
              </div>
              <div className="flex items-center gap-2.5">
                <span className="flex w-4 shrink-0 justify-center text-orange-400">
                  <Icon name="location" size={15} />
                </span>
                {profile.location}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-5 left-5 right-5 flex items-center justify-center [transform-style:preserve-3d] [transform:translate3d(0,0,26px)]">
          <div className="flex gap-3.5 [transform-style:preserve-3d]">
            {profile.socials.map((s, i) => (
              <button
                key={s.label}
                aria-label={s.label}
                onClick={() => window.open(s.url, '_blank', 'noopener,noreferrer')}
                className="group/social grid h-[34px] w-[34px] place-content-center rounded-full border-none bg-white text-black shadow-[rgba(0,0,0,0.5)_0px_7px_5px_-5px] transition-all duration-200 ease-in-out group-hover:[transform:translate3d(0,0,50px)] hover:bg-orange-500 hover:text-white active:bg-orange-600"
                style={{ transitionDelay: `${400 + i * 200}ms` }}
              >
                <Icon name={s.icon} size={16} />
              </button>
            ))}
          </div>
        </div>

        <div className="absolute top-0 right-0 [transform-style:preserve-3d]">
          {[
            { size: '170px', pos: '8px', z: '20px', delay: '0s' },
            { size: '140px', pos: '10px', z: '40px', delay: '0.4s' },
            { size: '110px', pos: '17px', z: '60px', delay: '0.8s' },
            { size: '80px', pos: '23px', z: '80px', delay: '1.2s' },
          ].map((circle, index) => (
            <div
              key={index}
              className="absolute aspect-square rounded-full bg-white/10 shadow-[rgba(100,100,111,0.2)_-10px_10px_20px_0px] transition-all duration-500 ease-in-out"
              style={{
                width: circle.size,
                top: circle.pos,
                right: circle.pos,
                transform: `translate3d(0, 0, ${circle.z})`,
                transitionDelay: circle.delay,
              }}
            />
          ))}
          <div
            className="absolute grid aspect-square w-[52px] place-content-center rounded-full bg-white text-black shadow-[rgba(100,100,111,0.2)_-10px_10px_20px_0px] transition-all duration-500 ease-in-out [transform:translate3d(0,0,100px)] [transition-delay:1.6s] group-hover:[transform:translate3d(0,0,120px)]"
            style={{ top: '30px', right: '30px' }}
          >
            <span className="text-sm font-black">{initials}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
