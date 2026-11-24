import { useTranslation } from 'react-i18next'
import { BentoCard } from '../components/ui/BentoCard'
import { expertise } from '../data/expertise'

export function Expertise() {
  const { t } = useTranslation()

  return (
    <section
      aria-labelledby="expertise-heading"
      className="col-span-full mt-10 sm:mt-14"
    >
      <h2
        id="expertise-heading"
        className="mb-5 text-3xl font-semibold tracking-tight sm:text-4xl"
      >
        {t('expertise.title')}
      </h2>
      <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
        {expertise.map(({ id, icon, tags }, index) => (
          <BentoCard
            key={id}
            headingLevel="h3"
            title={t(`expertise.areas.${id}.title`)}
            description={t(`expertise.areas.${id}.description`)}
            icon={icon}
            revealOnScroll
            staggerIndex={index}
            className="flex flex-col p-5 sm:p-7"
          >
            <ul className="mt-auto flex flex-wrap gap-2 pt-4">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-lg border border-border bg-background/60 px-2.5 py-1.5 text-sm font-medium text-primary"
                >
                  {t(`expertise.tags.${tag}`)}
                </li>
              ))}
            </ul>
          </BentoCard>
        ))}
      </div>
    </section>
  )
}
