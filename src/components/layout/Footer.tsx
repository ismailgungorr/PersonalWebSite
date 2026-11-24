import { ArrowUp, Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { emailHref, socialPlatforms } from '../../data/contact'
import { profile } from '../../data/profile'
import { availableSections } from './navigation'

const iconLinkClass =
  'press-feedback grid size-11 place-items-center rounded-xl border border-border bg-card text-muted hover:bg-surface hover:text-accent'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-border">
      <div className="site-container grid gap-5 py-7 sm:py-9 lg:grid-cols-[1fr_auto] lg:items-center">
        <div>
          <p className="font-semibold text-primary">{profile.name}</p>
          <p className="mt-1 text-sm text-muted">{t('profile.degree')}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3 lg:justify-self-end">
          <ul
            className="flex flex-wrap gap-2"
            aria-label={t('footer.socialLabel')}
          >
            {socialPlatforms
              .filter((platform) => platform.enabled)
              .map(({ id, name, url, icon: Icon }) => (
                <li key={id}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t('footer.socialLink', { name })}
                    title={t('footer.socialLink', { name })}
                    className={iconLinkClass}
                  >
                    <Icon size={18} aria-hidden="true" />
                  </a>
                </li>
              ))}
            <li>
              <a
                href={emailHref}
                aria-label={t('contact.email.send')}
                title={t('contact.email.send')}
                className={iconLinkClass}
              >
                <Mail size={18} aria-hidden="true" />
              </a>
            </li>
          </ul>
          <a
            href="#home"
            className="press-feedback inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-medium text-muted hover:text-accent"
          >
            <ArrowUp size={16} aria-hidden="true" />
            {t('footer.backToTop')}
          </a>
        </div>
        <nav
          aria-label={t('footer.navigation')}
          className="border-t border-border pt-3 lg:col-span-2"
        >
          <ul className="flex flex-wrap gap-x-4">
            {availableSections.map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  className="press-feedback inline-flex min-h-11 items-center rounded text-sm text-muted hover:text-accent"
                >
                  {t(`navigation.${section}`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-sm text-muted lg:col-span-2">
          {t('footer.copyright', {
            year: new Date().getFullYear(),
            name: profile.name,
          })}
        </p>
      </div>
    </footer>
  )
}
