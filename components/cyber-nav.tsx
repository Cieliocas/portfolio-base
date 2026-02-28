"use client"

import { useEffect, useState } from 'react'

const navItems = [
  { label: 'sobre', href: '#sobre' },
  { label: 'skills', href: '#skills' },
  { label: 'jornada', href: '#jornada' },
  { label: 'projetos', href: '#projetos' },
  { label: 'contato', href: '#contato' },
]

export function CyberNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-white/10 bg-[#070b1a]/82 shadow-[0_0_30px_rgba(0,220,255,.08)] backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3.5 sm:px-5 md:px-8">
        <a href="#" className="font-heading text-xs tracking-[0.2em] text-cyber-cyan sm:text-sm">
          FC//INFRA
        </a>

        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[11px] uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-cyber-pink"
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden rounded-full border border-white/20 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white"
          aria-label="Abrir menu"
        >
          {menuOpen ? 'Fechar' : 'Menu'}
        </button>
      </div>

      <div
        className={`overflow-hidden border-b border-white/10 bg-[#070b1a]/95 transition-all duration-300 md:hidden ${
          menuOpen ? 'max-h-96' : 'max-h-0'
        }`}
      >
        <div className="mx-auto flex max-w-6xl flex-col px-4 py-1.5 sm:px-5">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="border-b border-white/10 py-3 text-[11px] uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-cyber-cyan"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
