import type { LucideIcon } from 'lucide-react'
import * as m from 'motion/react-m'
import { useState, type ReactNode } from 'react'
import {
  cardTransition,
  cardViewport,
  fadeUp,
  useReducedMotionPreference,
} from '../../lib/motion'

interface BentoCardProps {
  title?: string
  description?: string
  icon?: LucideIcon
  children?: ReactNode
  className?: string
  staggerIndex?: number
  headingLevel?: 'h2' | 'h3'
  revealOnScroll?: boolean
  priority?: boolean
}

export function BentoCard({
  title,
  description,
  icon: Icon,
  children,
  className = '',
  staggerIndex = 0,
  headingLevel: Heading = 'h2',
  revealOnScroll = false,
  priority = false,
}: BentoCardProps) {
  const reduceMotion = useReducedMotionPreference()
  const [focused, setFocused] = useState(false)
  const immediate = reduceMotion || focused
  const waitForViewport = revealOnScroll && !immediate

  return (
    <m.article
      variants={fadeUp}
      initial={reduceMotion || priority ? false : 'hidden'}
      animate={waitForViewport ? undefined : 'visible'}
      whileInView={waitForViewport ? 'visible' : undefined}
      viewport={cardViewport}
      transition={cardTransition(staggerIndex, immediate)}
      onFocusCapture={revealOnScroll ? () => setFocused(true) : undefined}
      className={`bento-card min-w-0 rounded-3xl border border-border bg-card hover:border-accent/35 focus-within:border-accent/40 ${className}`}
    >
      {title && (
        <Heading className="flex items-center gap-3 font-mono text-sm font-medium text-muted">
          {Icon && (
            <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-border bg-background text-accent">
              <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
            </span>
          )}
          {title}
        </Heading>
      )}
      {description && (
        <p className="mt-3 leading-relaxed text-muted">{description}</p>
      )}
      {children}
    </m.article>
  )
}
