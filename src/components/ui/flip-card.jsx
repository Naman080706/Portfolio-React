'use client'

import { cn } from '@/lib/utils'
import { ArrowUpRight, Code2, FolderGit2 } from 'lucide-react'
import { useState } from 'react'
import { Icon } from '../Icons.jsx'

// Flip card for a project: front shows title + tech stack, hover flips to the
// back which shows the description + a centered repo button.
export default function FlipCard({ title, tagline, tech = [], description, repoUrl, index = 0 }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [activating, setActivating] = useState(false)
  const isRepo = repoUrl && repoUrl.includes('github.com')

  // Play the button's light-up animation, then redirect.
  const handleActivate = (e) => {
    e.preventDefault()
    if (!repoUrl || activating) return
    setActivating(true)
    setTimeout(() => {
      window.open(repoUrl, '_blank', 'noopener,noreferrer')
      setActivating(false)
    }, 750)
  }

  return (
    <div
      className="group relative h-[360px] w-full max-w-[320px] [perspective:2000px]"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={cn(
          'relative h-full w-full [transform-style:preserve-3d] transition-all duration-700',
          isFlipped ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]',
        )}
      >
        {/* Front */}
        <div
          className={cn(
            'absolute inset-0 h-full w-full overflow-hidden rounded-2xl p-6 [backface-visibility:hidden]',
            'border border-white/10 bg-gradient-to-br from-zinc-900 via-zinc-900 to-black shadow-xl',
            'transition-colors duration-500 group-hover:border-orange-500/40',
          )}
        >
          {/* big faint project number filling the empty space */}
          <span className="pointer-events-none absolute right-4 top-1 select-none text-[5rem] font-black leading-none text-white/[0.045]">
            {String(index + 1).padStart(2, '0')}
          </span>

          <div className="relative flex h-full flex-col">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-400 shadow-lg shadow-orange-500/30">
              <FolderGit2 className="h-6 w-6 text-black" />
            </div>

            {/* The orange tagline + tech sit at a fixed offset so they align
               across every card; the title fills a fixed-height box above and
               is bottom-aligned, so it always sits right on top of the orange
               line (growing upward for longer names). */}
            <div className="mt-4 flex flex-1 flex-col justify-start gap-3">
              <div className="space-y-1.5">
                <h3 className="flex min-h-[5.6rem] items-end text-2xl font-bold leading-tight text-white">{title}</h3>
                {tagline && (
                  <p className="line-clamp-1 text-sm font-medium leading-snug text-orange-300/90">{tagline}</p>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/10 pt-3">
              <span className="text-xs font-medium text-zinc-400">View details</span>
              <ArrowUpRight className="h-4 w-4 text-orange-400 transition-transform duration-300 group-hover:translate-x-0.5" />
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className={cn(
            'absolute inset-0 flex h-full w-full flex-col rounded-2xl p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]',
            'border border-orange-500/25 bg-gradient-to-br from-zinc-900 via-zinc-900 to-black shadow-xl',
          )}
        >
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-orange-400">
              <Code2 className="h-4 w-4 text-black" />
            </div>
            <h3 className="text-base font-bold text-white">{title}</h3>
          </div>

          <p className="mt-4 flex-1 overflow-hidden text-xs leading-relaxed text-zinc-400">
            {description}
          </p>

          <div className="mt-5 flex justify-center">
            {repoUrl ? (
              <a
                href={repoUrl}
                onClick={handleActivate}
                aria-label={isRepo ? 'View repository' : 'Visit site'}
                className={cn('keycap', activating && 'keycap--on')}
              >
                <span className="keycap__cap">
                  <span className="keycap__face">
                    {isRepo ? (
                      <Icon name="github" size={26} />
                    ) : (
                      <img src="/logo192.png" alt="IEEE TEMS" className="keycap__img" />
                    )}
                  </span>
                </span>
                <span className="keycap__led" aria-hidden="true" />
              </a>
            ) : (
              <span className="keycap keycap--disabled" aria-label="Repo coming soon">
                <span className="keycap__cap">
                  <span className="keycap__face">
                    <Icon name="github" size={26} />
                  </span>
                </span>
                <span className="keycap__led" aria-hidden="true" />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
