import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ProjectCard } from '../components/ui/ProjectCard'
import { projectFilters, projects, type ProjectFilter } from '../data/projects'
import type { Project, ProjectCategory } from '../types/project'

const filters = Object.keys(projectFilters) as ProjectFilter[]

interface ProjectsProps {
  onDetails: (project: Project, trigger: HTMLButtonElement) => void
}

export function Projects({ onDetails }: ProjectsProps) {
  const { t } = useTranslation()
  const [filter, setFilter] = useState<ProjectFilter>('all')
  const categories: readonly ProjectCategory[] = projectFilters[filter]
  const visibleProjects =
    filter === 'all'
      ? projects
      : projects.filter((project) =>
          project.categories.some((category) => categories.includes(category)),
        )

  return (
    <section
      id="projects"
      tabIndex={-1}
      aria-labelledby="projects-heading"
      className="col-span-full mt-10 sm:mt-14"
    >
      <h2
        id="projects-heading"
        className="mb-5 text-3xl font-semibold tracking-tight sm:text-4xl"
      >
        {t('projects.title')}
      </h2>
      <div
        role="group"
        aria-label={t('projects.filterLabel')}
        className="mb-5 flex flex-wrap gap-2"
      >
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={filter === item}
            onClick={() => setFilter(item)}
            className="press-feedback min-h-11 cursor-pointer rounded-xl border border-border bg-card px-3 text-sm font-medium text-muted hover:bg-surface hover:text-primary aria-pressed:border-accent/30 aria-pressed:bg-accent/10 aria-pressed:text-accent"
          >
            {t(`projects.filters.${item}`)}
          </button>
        ))}
      </div>
      <p role="status" className="sr-only">
        {t('projects.results', { count: visibleProjects.length })}
      </p>
      <div className="grid gap-4 sm:gap-5 md:grid-cols-6">
        {visibleProjects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            onDetails={onDetails}
            staggerIndex={index}
          />
        ))}
      </div>
    </section>
  )
}
