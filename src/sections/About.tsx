import { CircleCheck, UserRound } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { BentoCard } from '../components/ui/BentoCard'
import { profile } from '../data/profile'

export function About() {
  const { t } = useTranslation()
  const highlights = [
    t('about.highlights.militaryService'),
    t('about.highlights.learning'),
    t('profile.location.description', { city: profile.city }),
  ]

  return (
    <section
      id="about"
      tabIndex={-1}
      aria-labelledby="about-heading"
      className="col-span-full mt-10 sm:mt-14"
    >
      <div className="mb-5">
        <p className="font-mono text-sm font-medium text-accent">
          {t('about.eyebrow')}
        </p>
        <h2
          id="about-heading"
          className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl"
        >
          {t('about.title')}
        </h2>
      </div>

      <div className="grid gap-4 sm:gap-5 md:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:grid-cols-3">
        <BentoCard
          headingLevel="h3"
          title={t('about.cardTitle')}
          icon={UserRound}
          revealOnScroll
          className="p-5 sm:p-7 lg:col-span-2"
        >
          <div className="mt-4 max-w-[72ch] space-y-3 leading-relaxed text-muted">
            <p>
              {t('about.introduction', {
                university: t('profile.education.university'),
                program: t('profile.education.program'),
              })}
            </p>
            <p>{t('about.experience')}</p>
            <p>{t('about.goal')}</p>
          </div>
        </BentoCard>

        <BentoCard
          headingLevel="h3"
          title={t('about.highlights.title')}
          icon={CircleCheck}
          revealOnScroll
          staggerIndex={1}
          className="p-5 sm:p-7"
        >
          <ul className="mt-4 divide-y divide-border text-primary">
            {highlights.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 py-3 first:pt-0 last:pb-0"
              >
                <span
                  aria-hidden="true"
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </BentoCard>
      </div>
    </section>
  )
}
