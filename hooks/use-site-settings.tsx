"use client"

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { LanguageMode } from '@/lib/site-copy'

type ThemeMode = 'dark' | 'light'

type SiteSettingsContextValue = {
  theme: ThemeMode
  setTheme: (theme: ThemeMode) => void
  language: LanguageMode
  setLanguage: (language: LanguageMode) => void
}

const SiteSettingsContext = createContext<SiteSettingsContextValue | null>(null)

export function SiteSettingsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>('dark')
  const [language, setLanguageState] = useState<LanguageMode>('pt')

  useEffect(() => {
    const savedTheme = localStorage.getItem('site-theme') as ThemeMode | null
    const savedLanguage = localStorage.getItem('site-language') as LanguageMode | null
    const preferredDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    const nextTheme: ThemeMode = savedTheme ?? (preferredDark ? 'dark' : 'light')
    const nextLanguage: LanguageMode = savedLanguage === 'en' ? 'en' : 'pt'

    setThemeState(nextTheme)
    setLanguageState(nextLanguage)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('site-theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en'
    localStorage.setItem('site-language', language)
  }, [language])

  const value = useMemo(
    () => ({
      theme,
      setTheme: setThemeState,
      language,
      setLanguage: setLanguageState,
    }),
    [theme, language],
  )

  return <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>
}

export function useSiteSettings() {
  const context = useContext(SiteSettingsContext)
  if (!context) {
    throw new Error('useSiteSettings must be used inside SiteSettingsProvider')
  }
  return context
}
