import { BriefcaseBusiness, FlaskConical, PanelsTopLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { BentoCard } from '../components/ui/BentoCard'
import { TechnologyTags } from '../components/ui/TechnologyTags'
import { experienceEntries } from '../data/experience'
import { projects } from '../data/projects'
import type { Project } from '../types/project'

interface ExperienceProps {
  onProjectDetails: (project: Project, trigger: HTMLButtonElement) => void
}

const icons = {
  researchInternship: FlaskConical,
  hospitality: BriefcaseBusiness,
}

export function Experience({ onProjectDetails }: ExperienceProps) {
  const { t } = useTranslation()

  return (
    <section
      id="experience"
      tabIndex={-1}
      aria-labelledby="experience-heading"
      className="col-span-full mt-10 sm:mt-14"
    >
      <h2
        id="experience-heading"
        className="mb-5 text-3xl font-semibold tracking-tight sm:text-4xl"
      >
        {t('experience.title')}
      </h2>
      <ol className="ms-2 space-y-4 border-s border-border sm:space-y-5">
        {experienceEntries.map((entry, index) => {
          const key = `experience.entries.${entry.id}` as const
          const relatedProjects = projects.filter((project) =>
            entry.relatedProjects?.includes(project.id),
          )

          return (
            <li
              key={entry.id}
              className="relative ps-5 before:absolute before:-start-2 before:top-9 before:size-4 before:rounded-full before:border-4 before:border-background before:bg-accent sm:ps-8"
            >
              <BentoCard
                headingLevel="h3"
                title={t(`${key}.role`)}
                icon={icons[entry.id]}
                className="p-5 sm:p-7"
                revealOnScroll
                staggerIndex={index}
              >
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <p className="text-base font-semibold tracking-tight sm:text-lg">
                    {t(`${key}.organization`)}
                  </p>
                  <span className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 text-sm font-medium text-accent">
                    {t(`${key}.type`)}
                  </span>
                </div>
                {entry.period && (
                  <p className="mt-2 font-mono text-sm text-muted">
                    <time dateTime={entry.period.start}>
                      {t(`${key}.start`)}
                    </time>
                    {' – '}
                    <time dateTime={entry.period.end}>{t(`${key}.end`)}</time>
                  </p>
                )}
                <div className="mt-4 grid gap-5 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-8">
                  <div>
                    <p className="max-w-[76ch] leading-relaxed text-muted">
                      {t(`${key}.summary`)}
                    </p>
                    <ul className="mt-3 max-w-[76ch] list-disc space-y-2 ps-5 leading-relaxed text-muted marker:text-accent">
                      {entry.responsibilities.map((responsibility) => (
                        <li key={responsibility}>
                          {t(`${key}.responsibilities.${responsibility}`)}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="min-w-0 space-y-4 border-t border-border pt-4 lg:border-s lg:border-t-0 lg:ps-6 lg:pt-0">
                    {entry.technologies && (
                      <div>
                        <h4 className="mb-2 text-sm font-semibold text-primary">
                          {t('experience.technologies')}
                        </h4>
                        <TechnologyTags technologies={entry.technologies} />
                      </div>
                    )}
                    {entry.competencies && (
                      <div>
                        <h4 className="mb-2 text-sm font-semibold text-primary">
                          {t('experience.competencies')}
                        </h4>
                        <ul className="flex flex-wrap gap-2">
                          {entry.competencies.map((competency) => (
                            <li
                              key={competency}
                              className="rounded-lg border border-border bg-background/60 px-2.5 py-1.5 text-sm font-medium text-primary"
                            >
                              {t(`${key}.competencies.${competency}`)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {relatedProjects.length > 0 && (
                      <div className="border-t border-border pt-4">
                        <h4 className="text-sm font-semibold text-primary">
                          {t('experience.relatedProjects')}
                        </h4>
                        <ul className="mt-2 flex flex-wrap gap-2">
                          {relatedProjects.map((project) => (
                            <li key={project.id} className="min-w-0">
                              <button
                                type="button"
                                aria-haspopup="dialog"
                                onClick={(event) =>
                                  onProjectDetails(project, event.currentTarget)
                                }
                                className="press-feedback inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-accent/25 bg-accent/10 px-3 text-left text-sm font-medium text-accent hover:bg-accent/15"
                              >
                                <PanelsTopLeft
                                  size={16}
                                  className="shrink-0"
                                  aria-hidden="true"
                                />
                                {t(project.titleKey)}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </BentoCard>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
