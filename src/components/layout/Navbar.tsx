import { Menu, X } from 'lucide-react'
import { useId, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { profile } from '../../data/profile'
import { useActiveSection } from '../../hooks/useActiveSection'
import { LanguageSwitcher } from './LanguageSwitcher'
import { availableSections } from './navigation'

export function Navbar() {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const header = useRef<HTMLElement>(null)
  const currentSection = useActiveSection(header)
  const menuId = useId()
  const menuButton = useRef<HTMLButtonElement>(null)

  return (
    <header
      ref={header}
      className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur-md"
    >
      <div className="site-container relative flex min-h-[4.5rem] items-center gap-2 sm:gap-5">
        <a
          href="#home"
          onClick={() => setMenuOpen(false)}
          className="flex min-h-11 items-center gap-2 rounded-lg sm:gap-3"
        >
          <span
            aria-hidden="true"
            className="grid size-9 shrink-0 place-items-center rounded-lg border border-accent/25 bg-accent/10 font-mono text-sm font-bold text-accent"
          >
            {profile.monogram}
          </span>
          <span className="text-sm font-semibold tracking-tight sm:text-[0.9375rem]">
            {profile.name}
          </span>
        </a>

        <nav
          aria-label={t('navigation.label')}
          className="ml-auto"
          onKeyDown={(event) => {
            if (event.key === 'Escape' && menuOpen) {
              event.preventDefault()
              setMenuOpen(false)
              menuButton.current?.focus()
            }
          }}
        >
          <button
            ref={menuButton}
            type="button"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? t('navigation.close') : t('navigation.open')}
            onClick={() => setMenuOpen(!menuOpen)}
            className="press-feedback grid size-11 cursor-pointer place-items-center rounded-xl border border-border text-primary hover:bg-surface lg:hidden"
          >
            {menuOpen ? (
              <X size={20} aria-hidden="true" />
            ) : (
              <Menu size={20} aria-hidden="true" />
            )}
          </button>

          <ul
            id={menuId}
            className={`${menuOpen ? 'flex' : 'hidden'} absolute inset-x-0 top-full mt-2 flex-col gap-1 rounded-2xl border border-border bg-card p-2 shadow-lg shadow-black/20 lg:static lg:mt-0 lg:flex lg:flex-row lg:items-center lg:gap-1 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none`}
          >
            {availableSections.map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  aria-current={
                    currentSection === section ? 'location' : undefined
                  }
                  onClick={() => setMenuOpen(false)}
                  className="press-feedback flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-muted hover:bg-surface hover:text-primary aria-[current=location]:bg-accent/10 aria-[current=location]:text-accent"
                >
                  {t(`navigation.${section}`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <LanguageSwitcher />
      </div>
    </header>
  )
}
