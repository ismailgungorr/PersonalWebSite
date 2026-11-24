import { ExternalLink, GitBranch } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Project } from '../../types/project'

interface ProjectLinksProps {
  project: Project
}

const linkClass =
  'press-feedback inline-flex min-h-11 items-center gap-2 rounded-xl border border-border px-3 text-sm font-medium text-primary hover:bg-surface'

export function ProjectLinks({ project }: ProjectLinksProps) {
  const { t } = useTranslation()

  return (
    <>
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          <ExternalLink size={16} aria-hidden="true" />
          {t('projects.live')}
        </a>
      )}
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          <GitBranch size={16} aria-hidden="true" />
          {t('projects.github')}
        </a>
      )}
    </>
  )
}
