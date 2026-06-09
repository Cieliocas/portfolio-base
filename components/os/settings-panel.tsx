"use client"

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Monitor } from 'lucide-react'
import { useSiteSettings } from '@/hooks/use-site-settings'

const BOOT = Date.now()

function useUptime() {
  const [, tick] = useState(0)
  useEffect(() => {
    const id = setInterval(() => tick((n) => n + 1), 1000)
    return () => clearInterval(id)
  }, [])
  const s = Math.floor((Date.now() - BOOT) / 1000)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  const p = (n: number) => String(n).padStart(2, '0')
  return h > 0 ? `${h}h ${p(m)}m` : `${p(m)}:${p(sec)}`
}

type Props = { open: boolean; onClose: () => void }

export function SettingsPanel({ open, onClose }: Props) {
  const { theme, setTheme, language, setLanguage } = useSiteSettings()
  const ref = useRef<HTMLDivElement>(null)
  const uptime = useUptime()

  // Close on outside click / Esc
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  const t = language === 'pt'
  const about: { k: string; v: string }[] = [
    { k: t ? 'Desenvolvedor' : 'Developer', v: 'Francielio Castro' },
    { k: 'Engine', v: 'Next.js 16 · React 19' },
    { k: 'Design', v: 'Acrylic Innovation' },
    { k: t ? 'Sessão' : 'Session', v: uptime },
  ]

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          className="os-settings"
          initial={{ opacity: 0, y: -8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.97 }}
          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
          role="dialog"
          aria-label={t ? 'Sistema' : 'System'}
        >
          {/* About header */}
          <div className="os-settings-head">
            <span className="os-settings-logo"><Monitor className="w-4 h-4" strokeWidth={2.5} /></span>
            <div className="min-w-0">
              <p className="os-settings-title">CielioOS</p>
              <p className="os-settings-ver">{t ? 'versão' : 'version'} 1.0.4</p>
            </div>
          </div>

          {/* About info */}
          <div className="os-settings-about">
            {about.map((r) => (
              <div key={r.k} className="os-settings-row">
                <span className="os-settings-k">{r.k}</span>
                <span className="os-settings-v">{r.v}</span>
              </div>
            ))}
          </div>

          {/* Appearance */}
          <div className="os-settings-ctl">
            <span className="os-settings-label">{t ? 'Aparência' : 'Appearance'}</span>
            <div className="os-seg">
              <button className={`os-seg-btn ${theme === 'light' ? 'active' : ''}`} onClick={() => setTheme('light')}>
                {t ? 'Claro' : 'Light'}
              </button>
              <button className={`os-seg-btn ${theme === 'dark' ? 'active' : ''}`} onClick={() => setTheme('dark')}>
                {t ? 'Escuro' : 'Dark'}
              </button>
            </div>
          </div>

          {/* Language */}
          <div className="os-settings-ctl">
            <span className="os-settings-label">{t ? 'Idioma' : 'Language'}</span>
            <div className="os-seg">
              <button className={`os-seg-btn ${language === 'pt' ? 'active' : ''}`} onClick={() => setLanguage('pt')}>
                PT-BR
              </button>
              <button className={`os-seg-btn ${language === 'en' ? 'active' : ''}`} onClick={() => setLanguage('en')}>
                English
              </button>
            </div>
          </div>

          {/* Footer */}
          <a
            href="https://github.com/Cieliocas/portfolio-base"
            target="_blank"
            rel="noopener noreferrer"
            className="os-settings-link"
          >
            <Github className="w-3.5 h-3.5" />
            {t ? 'Ver código no GitHub' : 'View source on GitHub'}
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
