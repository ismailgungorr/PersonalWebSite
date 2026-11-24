import type { ReactNode } from 'react'
import { contact } from '../../data/contact'

export function AvailabilityIndicator({ children }: { children: ReactNode }) {
  if (!contact.openToWork) return null

  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1.5 text-sm font-medium text-accent">
      <span
        aria-hidden="true"
        className="size-2 shrink-0 rounded-full bg-accent"
      />
      {children}
    </p>
  )
}
