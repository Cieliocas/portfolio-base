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
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [theme, setTheme] = useState<ThemeMode>('dark')

  useEffect(() => {
    const saved = localStorage.getItem('site-theme') as ThemeMode | null
    const preferredDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const nextTheme: ThemeMode = saved ?? (preferredDark ? 'dark' : 'light')
    setTheme(nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const toggleTheme = () => {
    const nextTheme: ThemeMode = theme === 'dark' ? 'light' : 'dark'
    setTheme(nextTheme)
    localStorage.setItem('site-theme', nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
  }

  return (
    <nav className={`nav-dock transition-all duration-300 ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="flex items-center justify-between gap-2 px-3 py-3">
        <a href="#" className="font-heading text-[11px] tracking-[0.2em] text-cyber-cyan">
          FC//INFRA
        </a>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="icon-btn"
            aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
          >
            {theme === 'dark' ? <SunMedium className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          </button>

          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="icon-btn px-2.5 text-[10px] uppercase tracking-[0.18em]"
            aria-label="Abrir menu"
          >
            {menuOpen ? 'Fechar' : 'Menu'}
          </button>
        </div>
      </div>

      <div className={`overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="flex flex-col px-3 pb-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-white/10 py-3 text-[11px] uppercase tracking-[0.16em] text-white/74 transition-colors hover:text-cyber-cyan"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
