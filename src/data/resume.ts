import { isLanguage, type Language } from '../types/language'

interface ResumeConfig {
  fileName: string
  available: boolean
}

export const resumeConfig: Record<Language, ResumeConfig> = {
  tr: { fileName: 'ismail-gungor-cv-tr.pdf', available: true },
  en: { fileName: 'ismail-gungor-cv-en.pdf', available: true },
}

export function getAvailableResume(language: string | undefined) {
  if (!isLanguage(language)) return undefined

  const resume = resumeConfig[language]
  if (!resume.available) return undefined

  return {
    fileName: resume.fileName,
    url: `${import.meta.env.BASE_URL}resume/${resume.fileName}`,
  }
}
