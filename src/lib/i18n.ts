import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '../locales/en.json'
import tr from '../locales/tr.json'
import { applyPageMetadata } from './pageMetadata'
import {
  isLanguage,
  supportedLanguages,
  type Language,
} from '../types/language'

const languageStorageKey = 'personal-website.language'
const defaultLanguage: Language = 'tr'

function readLanguage(): Language {
  try {
    const stored = localStorage.getItem(languageStorageKey)
    return isLanguage(stored) ? stored : defaultLanguage
  } catch {
    return defaultLanguage
  }
}

const i18n = i18next.createInstance()

i18n.on('languageChanged', (language) => {
  if (!isLanguage(language)) return

  const t = i18n.getFixedT(language)
  applyPageMetadata(language, {
    title: t('meta.title'),
    description: t('meta.description'),
    imageAlt: t('meta.imageAlt'),
  })

  try {
    localStorage.setItem(languageStorageKey, language)
  } catch {
    // The current language still applies when browser storage is unavailable.
  }
})

export const i18nReady = i18n.use(initReactI18next).init({
  resources: { tr: { translation: tr }, en: { translation: en } },
  lng: readLanguage(),
  fallbackLng: defaultLanguage,
  supportedLngs: [...supportedLanguages],
  interpolation: { escapeValue: false },
})
