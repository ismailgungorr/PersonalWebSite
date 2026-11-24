import { isLanguage, type Language } from '../types/language'

interface ResumeConfig {
  fileName: string
  available: boolean
}

export const resumeConfig: Record<Language, ResumeConfig> = {
  tr: { fileName: 'ismail-gungor-cv-tr.pdf', available: false },
  en: { fileName: 'ismail-gungor-cv-en.pdf', available: false },
}

export function getResumeUrl(language: string | undefined): string | undefined {
  if (!isLanguage(language)) return undefined

  const resume = resumeConfig[language]
  return resume.available
    ? `${import.meta.env.BASE_URL}resume/${resume.fileName}`
    : undefined
}
