"use client"

import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import { useSiteSettings } from '@/hooks/use-site-settings'
import type { AppId } from '@/app/page'

const APP_MENUS: Record<AppId, string[]> = {
  home:     ['System', 'Files', 'Edit', 'View'],
  terminal: ['Shell',  'Edit',  'View', 'Window'],
  projects: ['File',   'Edit',  'View', 'Run'],
  journey:  ['File',   'Edit',  'Format', 'View'],
}

const APP_DISPLAY: Record<AppId, { pt: string; en: string }> = {
  home:     { pt: 'Desktop',  en: 'Desktop'  },
  terminal: { pt: 'Terminal', en: 'Terminal' },
  projects: { pt: 'Projetos', en: 'Projects' },
  journey:  { pt: 'Jornada',  en: 'Journey'  },
}

type Props = {
  activeApp: AppId
}

export function Menubar({ activeApp }: Props) {
  const { language, setLanguage, theme, setTheme } = useSiteSettings()
  const [time, setTime] = useState('')

  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    setTime(fmt())
    const id = setInterval(() => setTime(fmt()), 20_000)
    return () => clearInterval(id)
  }, [])

  const appName = APP_DISPLAY[activeApp][language]
  const menus   = APP_MENUS[activeApp]

  return (
    <header className="os-menubar">
      {/* Left */}
      <div className="os-menubar-left">
        <span className="os-menubar-brand">Cielio OS</span>
        <span className="os-menubar-app">{appName}</span>
        <nav className="os-menubar-nav hidden sm:flex" aria-label="App menu">
          {menus.map((item) => (
            <span key={item} className="os-menubar-item">{item}</span>
          ))}
        </nav>
      </div>

      {/* Right — system tray */}
      <div className="os-menubar-right">
        {/* Theme toggle */}
        <button
          className="os-theme-btn"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
        >
          {theme === 'dark'
            ? <Sun className="w-3.5 h-3.5" />
            : <Moon className="w-3.5 h-3.5" />}
        </button>

        {/* Language toggle */}
        <div className="os-lang-toggle" role="group" aria-label="Language">
          <button
            className={`os-lang-btn ${language === 'pt' ? 'active' : ''}`}
            onClick={() => setLanguage('pt')}
            aria-pressed={language === 'pt'}
          >
            PT
          </button>
          <button
            className={`os-lang-btn ${language === 'en' ? 'active' : ''}`}
            onClick={() => setLanguage('en')}
            aria-pressed={language === 'en'}
          >
            EN
          </button>
        </div>

        <span className="os-clock" aria-label="Current time">{time}</span>
      </div>
    </header>
  )
}
