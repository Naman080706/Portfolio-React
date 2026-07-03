import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// Standard shadcn/Magic UI helper: merge class names with Tailwind conflict resolution.
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
