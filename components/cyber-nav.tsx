"use client"

import { useEffect, useRef, useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { useSiteSettings } from '@/hooks/use-site-settings'
import { siteCopy } from '@/lib/site-copy'

export function CyberNav() {
  const { theme, setTheme, language, setLanguage } = useSiteSettings()
  const t = siteCopy[language].nav
  const [settingsOpen, setSettingsOpen] = useState(false)
  const settingsRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      if (!settingsRef.current?.contains(event.target as Node)) {
        setSettingsOpen(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSettingsOpen(false)
      }
    }

    document.addEventListener('mousedown', onDocumentClick)
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('mousedown', onDocumentClick)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  return (
    <nav className="quick-dock quick-dock-visible" aria-label={t.ariaLabel}>
      <div className="quick-dock-inner">
        {t.items.map((item) => (
          <a key={item.href} href={item.href} className="quick-link">
            {item.label}
          </a>
        ))}

        <div ref={settingsRef} className="quick-settings-wrap">
          <button
            type="button"
            onClick={() => setSettingsOpen((state) => !state)}
            className="quick-settings-trigger"
            aria-label={t.openSettings}
            aria-expanded={settingsOpen}
          >
            <SlidersHorizontal className="h-3.5 w-3.5" />
          </button>

          {settingsOpen ? (
            <div className="quick-settings-panel" role="menu" aria-label={t.panelTitle}>
              <p className="quick-settings-title">{t.panelTitle}</p>

              <div className="quick-settings-group">
                <span className="quick-settings-label">{t.theme}</span>
                <div className="quick-settings-options">
                  <button
                    type="button"
                    className={`quick-settings-option ${theme === 'dark' ? 'active' : ''}`}
                    onClick={() => setTheme('dark')}
                  >
                    {t.dark}
                  </button>
                  <button
                    type="button"
                    className={`quick-settings-option ${theme === 'light' ? 'active' : ''}`}
                    onClick={() => setTheme('light')}
                  >
                    {t.light}
                  </button>
                </div>
              </div>

              <div className="quick-settings-group">
                <span className="quick-settings-label">{t.language}</span>
                <div className="quick-settings-options">
                  <button
                    type="button"
                    className={`quick-settings-option ${language === 'pt' ? 'active' : ''}`}
                    onClick={() => setLanguage('pt')}
                  >
                    {t.pt}
                  </button>
                  <button
                    type="button"
                    className={`quick-settings-option ${language === 'en' ? 'active' : ''}`}
                    onClick={() => setLanguage('en')}
                  >
                    {t.en}
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  )
}
