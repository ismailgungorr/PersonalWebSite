import { Download, ExternalLink, FileText } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { BentoCard } from '../components/ui/BentoCard'
import { getAvailableResume } from '../data/resume'
import { supportedLanguages } from '../types/language'

const actionClass =
  'press-feedback inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold'

export function Resume() {
  const { t, i18n } = useTranslation()
  const languages =
    i18n.resolvedLanguage === 'en'
      ? (['en', 'tr'] as const)
      : supportedLanguages

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
        <ul className="mt-4 space-y-3">
          {languages.map((language) => {
            const resume = getAvailableResume(language)
            const label = t(`resume.languages.${language}`)

            return (
              <li key={language} className="flex flex-wrap gap-2">
                {resume ? (
                  <>
                    <a
                      href={resume.url}
                      download={resume.fileName}
                      className={`${actionClass} border-accent/30 bg-accent/10 text-accent hover:bg-accent/15`}
                    >
                      <Download size={16} aria-hidden="true" />
                      {t('resume.downloadLanguage', { language: label })}
                    </a>
                    <a
                      href={resume.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${actionClass} border-border text-primary hover:bg-surface`}
                    >
                      <ExternalLink size={16} aria-hidden="true" />
                      {t('resume.viewLanguage', { language: label })}
                    </a>
                  </>
                ) : (
                  <p className="text-sm font-medium text-muted">
                    {t('resume.unavailable', { language: label })}
                  </p>
                )}
              </li>
            )
          })}
        </ul>
      </BentoCard>
    </section>
  )
}
