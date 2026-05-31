import { createI18n } from 'vue-i18n'

import en from '@/locales/en'
import ptBR from '@/locales/pt-BR'

export const SUPPORTED_LOCALES = ['en', 'pt-BR'] as const
export type SupportedLocale = typeof SUPPORTED_LOCALES[number]

export const LOCALE_STORAGE_KEY = 'locale'

export const isSupportedLocale = (value: string): value is SupportedLocale =>
  value === 'en' || value === 'pt-BR'

const resolveLocale = (value: string): SupportedLocale | null => {
  if (isSupportedLocale(value)) {
    return value
  }

  const normalized = value.toLowerCase()
  if (normalized.startsWith('pt')) {
    return 'pt-BR'
  }
  if (normalized.startsWith('en')) {
    return 'en'
  }

  return null
}

const detectLocale = (): SupportedLocale => {
  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY)
    if (stored) {
      const resolved = resolveLocale(stored)
      if (resolved) {
        return resolved
      }
    }
  }

  if (typeof navigator !== 'undefined') {
    const languages =
      Array.isArray(navigator.languages) && navigator.languages.length > 0
        ? navigator.languages
        : [navigator.language]

    for (const language of languages) {
      const resolved = resolveLocale(language)

      if (resolved) {
        return resolved
      }
    }
  }

  return 'en'
}

export const i18n = createI18n({
  legacy: false,
  locale: detectLocale(),
  fallbackLocale: 'en',
  messages: {
    en,
    'pt-BR': ptBR
  }
})
