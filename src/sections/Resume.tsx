import { Download, ExternalLink, FileText } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { BentoCard } from '../components/ui/BentoCard'
import { getResumeUrl } from '../data/resume'

const actionClass =
  'press-feedback inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold'

export function Resume() {
  const { t, i18n } = useTranslation()
  const resumeUrl = getResumeUrl(i18n.resolvedLanguage)

  return (
    <section
      id="resume"
      aria-labelledby="resume-heading"
      className="col-span-full mt-10 sm:mt-14"
    >
      <BentoCard revealOnScroll className="p-5 sm:p-7">
        <div className="flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-border bg-background text-accent">
            <FileText size={20} aria-hidden="true" />
          </span>
          <h2
            id="resume-heading"
            className="text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            {t('resume.title')}
          </h2>
        </div>
        <p className="mt-4 max-w-[68ch] leading-relaxed text-muted">
          {t('resume.description')}
        </p>
        {resumeUrl ? (
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={resumeUrl}
              download
              className={`${actionClass} border-accent/30 bg-accent/10 text-accent hover:bg-accent/15`}
            >
              <Download size={16} aria-hidden="true" />
              {t('resume.download')}
            </a>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${actionClass} border-border text-primary hover:bg-surface`}
            >
              <ExternalLink size={16} aria-hidden="true" />
              {t('resume.view')}
            </a>
          </div>
        ) : (
          <p className="mt-4 border-t border-border pt-4 text-sm font-medium text-muted">
            {t('resume.unavailable')}
          </p>
        )}
      </BentoCard>
    </section>
  )
}
