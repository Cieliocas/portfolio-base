"use client"

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { GraduationCap, Languages as LanguagesIcon, X, ChevronDown } from 'lucide-react'
import { useSiteSettings } from '@/hooks/use-site-settings'
import { siteCopy } from '@/lib/site-copy'
import { Window } from '@/components/os/window'

type Popup = 'courses' | 'languages' | null

export function ViewMenu() {
  const { language } = useSiteSettings()
  const t = siteCopy[language]
  const vm = t.viewMenu

  const [menuOpen, setMenuOpen] = useState(false)
  const [popup, setPopup] = useState<Popup>(null)
  const wrapRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click / Esc
  useEffect(() => {
    if (!menuOpen) return
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setMenuOpen(false)
    }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  // Close popup on Esc
  useEffect(() => {
    if (!popup) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setPopup(null) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [popup])

  const openPopup = (p: Popup) => { setPopup(p); setMenuOpen(false) }

  return (
    <>
      <div className="os-viewmenu-wrap" ref={wrapRef}>
        <button
          className={`os-menubar-item os-viewmenu-btn ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={menuOpen}
        >
          View
          <ChevronDown className="os-viewmenu-chevron" />
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="os-viewmenu-dropdown"
              role="menu"
              initial={{ opacity: 0, y: -6, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 460, damping: 32 }}
            >
              <button className="os-viewmenu-option" role="menuitem" onClick={() => openPopup('courses')}>
                <GraduationCap className="w-4 h-4" />
                <span>{vm.courses}</span>
              </button>
              <button className="os-viewmenu-option" role="menuitem" onClick={() => openPopup('languages')}>
                <LanguagesIcon className="w-4 h-4" />
                <span>{vm.languages}</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Popup modal — portaled to <body> so position:fixed is measured
          against the viewport, not the menubar's backdrop-filter context. */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {popup && (
            <motion.div
              className="os-modal-backdrop"
            onClick={() => setPopup(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="os-modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 360, damping: 32 }}
            >
              <Window
                title={popup === 'courses' ? vm.coursesTitle : vm.languagesTitle}
                titleIcon={
                  popup === 'courses'
                    ? <GraduationCap className="w-3 h-3" />
                    : <LanguagesIcon className="w-3 h-3" />
                }
                rightSlot={
                  <button className="os-modal-close" onClick={() => setPopup(null)} aria-label="Close">
                    <X className="w-3.5 h-3.5" />
                  </button>
                }
                bodyClassName="os-modal-body"
              >
                {popup === 'courses' ? (
                  <ul className="courses-list">
                    {t.courses.map((c) => (
                      <li key={c.org} className="course-item">
                        <div className="course-head">
                          <span className="course-org">{c.org}</span>
                          <span className="course-period">{c.period}</span>
                        </div>
                        <p className="course-desc">{c.desc}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <ul className="langs-list">
                    {t.languages.map((l) => (
                      <li key={l.name} className="lang-item">
                        <div className="lang-head">
                          <span className="lang-name">{l.name}</span>
                          <span className="lang-level">{l.level}</span>
                        </div>
                        <div className="lang-bar">
                          <div className="lang-bar-fill" style={{ width: `${l.pct}%` }} />
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </Window>
            </motion.div>
          </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
