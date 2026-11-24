import { useTranslation } from 'react-i18next'
import { BentoCard } from '../components/ui/BentoCard'
import { TechnologyTags } from '../components/ui/TechnologyTags'
import { skillGroups } from '../data/skills'

export function Skills() {
  const { t } = useTranslation()

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="col-span-full mt-10 sm:mt-14"
    >
      <h2
        id="skills-heading"
        className="mb-5 text-3xl font-semibold tracking-tight sm:text-4xl"
      >
        {t('skills.title')}
      </h2>
      <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map(({ id, icon, technologies }, index) => (
          <BentoCard
            key={id}
            headingLevel="h3"
            title={t(`skills.categories.${id}`)}
            icon={icon}
            revealOnScroll
            staggerIndex={index}
            className="p-5 sm:p-7"
          >
            <div className="mt-4">
              <TechnologyTags technologies={technologies} />
            </div>
            {id === 'storage' && (
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {t('skills.storageNote')}
              </p>
            )}
          </BentoCard>
        ))}
      </div>
    </section>
  )
}
