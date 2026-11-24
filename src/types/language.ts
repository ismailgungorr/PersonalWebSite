export const supportedLanguages = ['tr', 'en'] as const

export type Language = (typeof supportedLanguages)[number]

export function isLanguage(value: unknown): value is Language {
  return value === 'tr' || value === 'en'
}
