import { Download, FolderGit2, Mail } from 'lucide-react'
import { Trans, useTranslation } from 'react-i18next'
import { AvailabilityIndicator } from '../components/ui/AvailabilityIndicator'
import { BentoCard } from '../components/ui/BentoCard'
import { profile } from '../data/profile'
import { getResumeUrl } from '../data/resume'

const actionClass =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold disabled:cursor-not-allowed'

export function Hero() {
  const { t, i18n } = useTranslation()
  const resumeUrl = getResumeUrl(i18n.resolvedLanguage)

  return (
    <BentoCard
      priority
      className="grid overflow-hidden md:col-span-6 lg:col-span-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.72fr)]"
    >
      <div className="flex min-w-0 flex-col items-start p-5 sm:p-9 lg:p-12 xl:p-14">
        <AvailabilityIndicator>{t('hero.status')}</AvailabilityIndicator>

        <h1 className="mt-5 text-[clamp(2rem,5.5vw,4.5rem)] leading-[1.06] font-semibold tracking-[-0.055em] wrap-break-word">
          <Trans
            i18nKey="hero.heading"
            values={{ name: profile.name }}
            components={{ highlight: <span className="block text-accent" /> }}
          />
        </h1>
        <p className="mt-4 text-base font-semibold text-primary sm:text-lg">
          {t('profile.degree')}
        </p>
        <p className="mt-3 max-w-[58ch] leading-relaxed text-muted">
          {t('hero.description')}
        </p>

        <div className="mt-6 flex w-full flex-wrap gap-2 sm:mt-8 sm:gap-3">
          <a
            href="#projects"
            className={`${actionClass} press-feedback border-accent/30 bg-accent/10 text-accent hover:bg-accent/15`}
          >
            <FolderGit2 size={16} aria-hidden="true" />
            {t('hero.projects')}
          </a>
          {resumeUrl ? (
            <a
              href={resumeUrl}
              download
              className={`${actionClass} press-feedback border-border bg-background/50 text-primary hover:bg-surface`}
            >
              <Download size={16} aria-hidden="true" />
              {t('resume.download')}
            </a>
          ) : (
            <button
              type="button"
              disabled
              className={`${actionClass} border-border bg-background/50 text-muted`}
            >
              <Download size={16} aria-hidden="true" />
              {t('resume.download')}
            </button>
          )}
          <a
            href="#contact"
            className={`${actionClass} press-feedback border-border bg-background/50 text-primary hover:bg-surface`}
          >
            <Mail size={16} aria-hidden="true" />
            {t('contact.heroAction')}
          </a>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="profile-grid relative grid min-h-32 place-items-center overflow-hidden border-t border-border bg-background/55 p-3 sm:min-h-56 sm:p-6 lg:border-t-0 lg:border-l"
      >
        <div className="hero-ornament grid aspect-square w-24 place-items-center rounded-full border border-accent/25 sm:w-44 lg:w-[min(68%,17rem)]">
          <div className="grid size-[85%] place-items-center rounded-full border border-border">
            <div className="grid size-[73%] place-items-center rounded-2xl border border-accent/35 bg-card">
              <span className="font-mono text-3xl font-semibold tracking-tight text-accent sm:text-5xl xl:text-6xl">
                {profile.monogram}
              </span>
            </div>
          </div>
        </div>
      </div>
    </BentoCard>
  )
}
