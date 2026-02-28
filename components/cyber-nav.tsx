"use client"

import { useEffect, useState } from 'react'
import { Moon, SunMedium } from 'lucide-react'

const navItems = [
  { label: 'sobre', href: '#sobre' },
  { label: 'skills', href: '#skills' },
  { label: 'jornada', href: '#jornada' },
  { label: 'projetos', href: '#projetos' },
  { label: 'contato', href: '#contato' },
]

type ThemeMode = 'dark' | 'light'

export function CyberNav() {
  const [theme, setTheme] = useState<ThemeMode>('dark')

  useEffect(() => {
    const saved = localStorage.getItem('site-theme') as ThemeMode | null
    const preferredDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const nextTheme: ThemeMode = saved ?? (preferredDark ? 'dark' : 'light')
    setTheme(nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
  }, [])

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    localStorage.setItem('site-theme', nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
  }

  return (
    <nav className="quick-dock quick-dock-visible" aria-label="Menu rapido">
      <div className="quick-dock-inner">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} className="quick-link">
            {item.label}
          </a>
        ))}
        <button
          onClick={toggleTheme}
          className="quick-theme-btn"
          aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
        >
          {theme === 'dark' ? <SunMedium className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
        </button>
      </div>
    </nav>
  )
}
