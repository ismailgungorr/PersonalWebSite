import { X } from 'lucide-react'
import { useEffect, useId, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import type { Project } from '../../types/project'
import { LanguageSwitcher } from '../layout/LanguageSwitcher'
import { ProjectLinks } from './ProjectLinks'
import { ProjectMedia } from './ProjectMedia'
import { TechnologyTags } from './TechnologyTags'

interface ProjectDetailsProps {
  project: Project
  onClose: () => void
}

const headingClass = 'text-base font-semibold text-primary'

export function ProjectDetails({ project, onClose }: ProjectDetailsProps) {
  const { t } = useTranslation()
  const dialog = useRef<HTMLDialogElement>(null)
  const heading = useRef<HTMLHeadingElement>(null)
  const headingId = useId()

  useEffect(() => {
    const panel = dialog.current
    if (panel && !panel.open) {
      panel.showModal()
      heading.current?.focus({ preventScroll: true })
    }
  }, [])

  return (
    <dialog
      ref={dialog}
      aria-labelledby={headingId}
      onClose={onClose}
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return

        const controls = event.currentTarget.querySelectorAll<HTMLElement>(
          'button:not(:disabled), a[href]',
        )
        const first = controls[0]
        const last = controls[controls.length - 1]
        const current = document.activeElement

        if (
          event.shiftKey &&
          (current === first || current === heading.current)
        ) {
          event.preventDefault()
          last?.focus()
        } else if (!event.shiftKey && current === last) {
          event.preventDefault()
          first?.focus()
        }
      }}
      className="project-dialog fixed m-auto max-w-none overflow-auto overscroll-contain rounded-3xl border border-border bg-card p-0 text-primary backdrop:bg-black/75"
    >
      <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-border bg-card px-5 py-4 sm:px-7">
        <h2
          id={headingId}
          ref={heading}
          tabIndex={-1}
          className="pt-1 text-xl font-semibold tracking-tight outline-none sm:text-2xl"
        >
          {t(project.titleKey)}
        </h2>
        <button
          type="button"
          aria-label={t('projects.close')}
          onClick={() => dialog.current?.close()}
          className="press-feedback grid size-11 shrink-0 cursor-pointer place-items-center rounded-xl border border-border hover:bg-surface"
        >
          <X size={20} aria-hidden="true" />
        </button>
      </div>

      <div className="space-y-6 p-5 sm:p-7">
        <div className="flex justify-end">
          <LanguageSwitcher />
        </div>
        <section>
          <h3 className={headingClass}>{t('projects.problem')}</h3>
          <p className="mt-2 leading-relaxed text-muted">
            {t(project.problemKey)}
          </p>
        </section>
        <section>
          <h3 className={headingClass}>{t('projects.solution')}</h3>
          <p className="mt-2 leading-relaxed text-muted">
            {t(project.solutionKey)}
          </p>
        </section>
        <section>
          <h3 className={headingClass}>{t('projects.features')}</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed text-muted marker:text-accent">
            {project.featuresKeys.map((feature) => (
              <li key={feature}>{t(feature)}</li>
            ))}
          </ul>
        </section>
        {project.valueKey && (
          <section>
            <h3 className={headingClass}>{t('projects.value')}</h3>
            <p className="mt-2 leading-relaxed text-muted">
              {t(project.valueKey)}
            </p>
          </section>
        )}
        <section>
          <h3 className={headingClass}>{t('projects.tech')}</h3>
          <div className="mt-2">
            <TechnologyTags technologies={project.technologies} />
          </div>
        </section>
        {project.images?.length ? (
          <section>
            <h3 className={headingClass}>{t('projects.media')}</h3>
            {project.imageNoteKey && (
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {t(project.imageNoteKey)}
              </p>
            )}
            <div
              className={`mt-3 grid gap-4 ${project.images.length > 1 ? 'sm:grid-cols-2' : ''}`}
            >
              {project.images.map((image) => (
                <ProjectMedia key={image.src} image={image} gallery />
              ))}
            </div>
          </section>
        ) : null}
        {(project.liveUrl || project.githubUrl) && (
          <div className="flex flex-wrap gap-2">
            <ProjectLinks project={project} />
          </div>
        )}
      </div>
    </dialog>
  )
}
