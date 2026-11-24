import type { Language } from '../types/language'

interface Metadata {
  title: string
  description: string
  imageAlt: string
}

export function applyPageMetadata(language: Language, metadata: Metadata) {
  document.documentElement.lang = language
  document.title = metadata.title

  const fields = {
    'name="description"': metadata.description,
    'property="og:title"': metadata.title,
    'property="og:description"': metadata.description,
    'property="og:locale"': language === 'tr' ? 'tr_TR' : 'en_US',
    'property="og:image:alt"': metadata.imageAlt,
    'name="twitter:title"': metadata.title,
    'name="twitter:description"': metadata.description,
    'name="twitter:image:alt"': metadata.imageAlt,
  }
  for (const [attribute, value] of Object.entries(fields)) {
    const tag = document.querySelector<HTMLMetaElement>(`meta[${attribute}]`)
    if (tag && tag.content !== value) tag.content = value
  }
}
