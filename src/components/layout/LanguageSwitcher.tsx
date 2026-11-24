import { useTranslation } from 'react-i18next'
import { supportedLanguages } from '../../types/language'

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation()

  return (
    <div
      role="group"
      aria-label={t('language.label')}
      className="inline-flex items-center gap-1 rounded-xl border border-border bg-card p-1"
    >
      {supportedLanguages.map((language) => (
        <button
          key={language}
          type="button"
          aria-label={t(`language.${language}`)}
          aria-pressed={i18n.resolvedLanguage === language}
          onClick={() => void i18n.changeLanguage(language)}
          className="press-feedback min-h-11 min-w-11 cursor-pointer rounded-lg px-3 font-mono text-sm font-semibold uppercase text-muted hover:bg-surface hover:text-primary aria-pressed:bg-surface aria-pressed:text-accent"
        >
          {language}
        </button>
      ))}
    </div>
  )
}
