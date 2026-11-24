import type { Transition, Variants } from 'motion/react'
import { useSyncExternalStore } from 'react'

const media =
  typeof window === 'undefined'
    ? undefined
    : window.matchMedia('(prefers-reduced-motion: reduce)')

function subscribe(listener: () => void) {
  media?.addEventListener('change', listener)
  return () => media?.removeEventListener('change', listener)
}

const readPreference = () => media?.matches ?? false
const readServerPreference = () => false

export function useReducedMotionPreference() {
  return useSyncExternalStore(subscribe, readPreference, readServerPreference)
}

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0 },
}

export const cardViewport = { once: true, amount: 0.15 } as const

export function cardTransition(
  staggerIndex: number,
  immediate: boolean,
): Transition {
  if (immediate) return { duration: 0 }
  return { duration: 0.35, ease: 'easeOut', delay: (staggerIndex % 3) * 0.06 }
}
