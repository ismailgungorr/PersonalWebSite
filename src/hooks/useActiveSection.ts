import { useEffect, useState, type RefObject } from 'react'
import { availableSections } from '../components/layout/navigation'

type Section = (typeof availableSections)[number]

function initialSection(): Section {
  return (
    availableSections.find((section) => location.hash === `#${section}`) ??
    'home'
  )
}

export function useActiveSection(headerRef: RefObject<HTMLElement | null>) {
  const [section, setSection] = useState(initialSection)

  useEffect(() => {
    const header = headerRef.current
    const main = document.querySelector('main')
    if (!header || !main) return

    const root = document.documentElement
    const top = (element: Element) =>
      element.getBoundingClientRect().top + window.scrollY
    let positions: { section: Section; top: number }[] = []
    let maximum = 0
    let inset = 0
    let current = initialSection()
    let frame = 0
    let timer = 0
    let destination: number | undefined

    function publish(next: Section) {
      if (current === next) return
      current = next
      setSection(next)
    }

    function sectionAt(position: number): Section {
      return (
        positions.findLast((point) => point.top <= position)?.section ?? 'home'
      )
    }

    function update() {
      frame = 0
      const y = window.scrollY
      if (destination !== undefined && Math.abs(y - destination) > 4) return
      destination = undefined
      publish(
        y <= 2
          ? 'home'
          : y >= maximum - 2
            ? 'contact'
            : sectionAt(y + inset + 3),
      )
    }

    function schedule() {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    function measure() {
      root.style.setProperty(
        '--site-header-height',
        `${header?.offsetHeight ?? 0}px`,
      )
      inset = Number.parseFloat(getComputedStyle(root).scrollPaddingTop) || 0
      maximum = Math.max(0, root.scrollHeight - root.clientHeight)
      positions = availableSections.map((section) => {
        const target = document.getElementById(section)
        return { section, top: section === 'home' || !target ? 0 : top(target) }
      })
      schedule()
    }

    function cancelNavigation() {
      window.clearTimeout(timer)
      destination = undefined
      schedule()
    }

    function followHash(hash: string) {
      const target = document.getElementById(hash.slice(1))
      if (!target || !main?.contains(target)) return

      const position = top(target)
      destination = Math.max(0, Math.min(maximum, position - inset))
      publish(target === main ? 'home' : sectionAt(position + 1))
      window.clearTimeout(timer)
      timer = window.setTimeout(cancelNavigation, 1200)
      schedule()
    }

    function onClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey ||
        event.shiftKey
      )
        return
      const link =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>('a[href^="#"]')
          : null
      if (link?.hash) followHash(link.hash)
    }

    function onHashChange() {
      if (location.hash) followHash(location.hash)
      else cancelNavigation()
    }

    function onKeyDown(event: KeyboardEvent) {
      if (
        [
          'ArrowUp',
          'ArrowDown',
          'PageUp',
          'PageDown',
          'Home',
          'End',
          ' ',
        ].includes(event.key)
      ) {
        cancelNavigation()
      }
    }

    const observer = new ResizeObserver(measure)
    for (const element of [
      header,
      main,
      ...Array.from(main.children),
      document.body,
    ])
      observer.observe(element)
    measure()
    if (location.hash) followHash(location.hash)

    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', measure)
    window.addEventListener('hashchange', onHashChange)
    window.addEventListener('wheel', cancelNavigation, { passive: true })
    window.addEventListener('touchstart', cancelNavigation, { passive: true })
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('click', onClick)

    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(frame)
      window.clearTimeout(timer)
      root.style.removeProperty('--site-header-height')
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', measure)
      window.removeEventListener('hashchange', onHashChange)
      window.removeEventListener('wheel', cancelNavigation)
      window.removeEventListener('touchstart', cancelNavigation)
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('click', onClick)
    }
  }, [headerRef])

  return section
}
