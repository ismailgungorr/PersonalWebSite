import { PanelsTopLeft } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Project } from '../../types/project'
import { BentoCard } from './BentoCard'
import { ProjectLinks } from './ProjectLinks'
import { ProjectMedia } from './ProjectMedia'
import { TechnologyTags } from './TechnologyTags'

interface ProjectCardProps {
  project: Project
  onDetails: (project: Project, trigger: HTMLButtonElement) => void
  staggerIndex: number
}

const statusStyle = {
  active: 'border-accent/25 bg-accent/10 text-accent',
  completed: 'border-border bg-background/50 text-primary',
  learning: 'border-border bg-background/50 text-muted',
} satisfies Record<Project['status'], string>

export function ProjectCard({
  project,
  onDetails,
  staggerIndex,
}: ProjectCardProps) {
  const { t } = useTranslation()
  const title = t(project.titleKey)

  return (
    <BentoCard
      staggerIndex={staggerIndex}
      revealOnScroll
      className={`flex flex-col overflow-hidden md:col-span-3 ${project.featured ? '' : 'lg:col-span-2'}`}
    >
      <ProjectMedia image={project.images?.[0]} />
      <div className="flex min-w-0 flex-1 flex-col p-5 sm:p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span
            className={`rounded-full border px-2.5 py-1 text-sm font-medium ${statusStyle[project.status]}`}
          >
            {t(`projects.status.${project.status}`)}
          </span>
          {project.featured && (
            <span className="font-mono text-sm text-muted">
              {t('projects.featured')}
            </span>
          )}
        </div>
        <h3
          className={`font-semibold tracking-tight ${project.featured ? 'text-2xl' : 'text-xl'}`}
        >
          {title}
        </h3>
        <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm font-medium text-accent">
          {project.categories.map((category) => (
            <li key={category}>{t(`projects.categories.${category}`)}</li>
          ))}
        </ul>
        <p className="mt-3 mb-4 leading-relaxed text-muted">
          {t(project.summaryKey)}
        </p>
        <div className="mt-auto">
          <TechnologyTags technologies={project.technologies} />
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              aria-haspopup="dialog"
              aria-label={t('projects.detailsFor', { title })}
              onClick={(event) => onDetails(project, event.currentTarget)}
              className="press-feedback inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-accent/25 bg-accent/10 px-3 text-sm font-semibold text-accent hover:bg-accent/15"
            >
              <PanelsTopLeft size={16} aria-hidden="true" />
              {t('projects.details')}
            </button>
            <ProjectLinks project={project} />
          </div>
        </div>
      </div>
    </BentoCard>
  )
}
