import { GraduationCap } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { BentoCard } from '../components/ui/BentoCard'
import { profile } from '../data/profile'

export function Education() {
  const { t } = useTranslation()
  const { startYear, endYear } = profile.education

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="col-span-full mt-10 sm:mt-14"
    >
      <h2
        id="education-heading"
        className="mb-5 text-3xl font-semibold tracking-tight sm:text-4xl"
      >
        {t('education.title')}
      </h2>
      <BentoCard
        headingLevel="h3"
        title={t('profile.education.university')}
        icon={GraduationCap}
        revealOnScroll
        className="p-5 sm:p-7"
      >
        <p className="mt-4 text-lg font-semibold tracking-tight">
          {t('profile.education.program')}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
          <p className="text-sm text-muted">{t('education.degree')}</p>
          <p className="font-mono text-sm text-muted">
            <time dateTime={startYear}>{startYear}</time>
            {' – '}
            <time dateTime={endYear}>{endYear}</time>
          </p>
          <span className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 text-sm font-medium text-accent">
            {t('education.graduated')}
          </span>
        </div>
      </BentoCard>
    </section>
  )
}
