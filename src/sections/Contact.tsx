import {
  BriefcaseBusiness,
  Check,
  Copy,
  ExternalLink,
  Mail,
  MapPin,
  Send,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AvailabilityIndicator } from '../components/ui/AvailabilityIndicator'
import { BentoCard } from '../components/ui/BentoCard'
import { contact, emailHref, socialPlatforms } from '../data/contact'
import { profile } from '../data/profile'

const actionClass =
  'press-feedback inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-3 text-sm font-semibold'
type CopyStatus = 'idle' | 'pending' | 'copied' | 'error'

function EmailCard() {
  const { t } = useTranslation()
  const [status, setStatus] = useState<CopyStatus>('idle')
  const copied = status === 'copied'
  const copyLocked = status === 'pending' || copied

  useEffect(() => {
    if (!copied) return

    const timeout = window.setTimeout(() => setStatus('idle'), 2500)
    return () => window.clearTimeout(timeout)
  }, [copied])

  async function copyEmail() {
    if (copyLocked) return

    if (!navigator.clipboard?.writeText) {
      setStatus('error')
      return
    }

    setStatus('pending')
    try {
      await navigator.clipboard.writeText(contact.email)
      setStatus('copied')
    } catch {
      setStatus('error')
    }
  }

  return (
    <BentoCard
      headingLevel="h3"
      title={t('contact.email.title')}
      icon={Mail}
      className="border-accent/25 p-5 sm:p-7 md:col-span-2 lg:col-span-6"
      revealOnScroll
    >
      <p className="mt-4 text-lg font-semibold tracking-tight select-text [overflow-wrap:anywhere] sm:text-2xl">
        {contact.email}
      </p>
      <p className="mt-2 max-w-[45ch] leading-relaxed text-muted">
        {t('contact.email.description')}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        <a
          href={emailHref}
          className={`${actionClass} border-accent/30 bg-accent text-background hover:bg-emerald-400`}
        >
          <Send size={16} aria-hidden="true" />
          {t('contact.email.send')}
        </a>
        <button
          type="button"
          aria-disabled={copyLocked}
          onClick={() => void copyEmail()}
          className={`${actionClass} cursor-pointer border-border bg-background/50 text-primary hover:bg-surface aria-disabled:cursor-default`}
        >
          {copied ? (
            <Check size={16} className="text-accent" aria-hidden="true" />
          ) : (
            <Copy size={16} aria-hidden="true" />
          )}
          {t(copied ? 'contact.email.copied' : 'contact.email.copy')}
        </button>
      </div>
      <p
        role="status"
        aria-live="polite"
        className={status === 'error' ? 'mt-3 text-sm text-primary' : 'sr-only'}
      >
        {status === 'error' && t('contact.email.copyError')}
        {copied && t('contact.email.copied')}
      </p>
    </BentoCard>
  )
}

export function Contact() {
  const { t } = useTranslation()

  return (
    <section
      id="contact"
      tabIndex={-1}
      aria-labelledby="contact-heading"
      className="col-span-full mt-10 sm:mt-14"
    >
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4 sm:items-center">
        <div>
          <h2
            id="contact-heading"
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            {t('contact.title')}
          </h2>
          <p className="mt-2 max-w-[66ch] leading-relaxed text-muted">
            {t('contact.description')}
          </p>
        </div>
        <AvailabilityIndicator>{t('contact.status')}</AvailabilityIndicator>
      </div>

      <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-12">
        <EmailCard />
        {socialPlatforms
          .filter((platform) => platform.enabled)
          .map(({ id, name, url, username, icon }, index) => (
            <BentoCard
              key={id}
              headingLevel="h3"
              title={name}
              icon={icon}
              className="flex flex-col p-5 sm:p-6 lg:col-span-3"
              revealOnScroll
              staggerIndex={index + 1}
            >
              {username && (
                <p className="mt-3 font-mono text-sm text-primary [overflow-wrap:anywhere]">
                  @{username}
                </p>
              )}
              <p className="mt-3 leading-relaxed text-muted">
                {t(`contact.social.${id}`)}
              </p>
              <div className="mt-auto pt-4">
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t('contact.social.profileLabel', { name })}
                  className={`${actionClass} border-border bg-background/50 text-primary hover:bg-surface`}
                >
                  {t('contact.social.view')}
                  <ExternalLink size={16} aria-hidden="true" />
                </a>
              </div>
            </BentoCard>
          ))}
        <BentoCard
          headingLevel="h3"
          title={t('profile.location.title')}
          icon={MapPin}
          className="p-5 sm:p-6 lg:col-span-4"
          revealOnScroll
        >
          <p className="mt-3 text-lg font-semibold tracking-tight">
            {t('profile.location.name', { city: profile.city })}
          </p>
        </BentoCard>
        <BentoCard
          headingLevel="h3"
          title={t('contact.careerFocus')}
          icon={BriefcaseBusiness}
          className="p-5 sm:p-6 lg:col-span-8"
          revealOnScroll
          staggerIndex={1}
        >
          <ul className="mt-3 flex flex-wrap gap-2">
            {contact.careerFocus.map((interest) => (
              <li
                key={interest}
                className="rounded-lg border border-border bg-background/60 px-2.5 py-1.5 text-sm font-medium text-primary"
              >
                {t(`profile.interests.${interest}`)}
              </li>
            ))}
          </ul>
        </BentoCard>
      </div>
    </section>
  )
}
