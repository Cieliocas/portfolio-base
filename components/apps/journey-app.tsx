"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSiteSettings } from '@/hooks/use-site-settings'
import { siteCopy } from '@/lib/site-copy'
import { Window } from '@/components/os/window'
import { Briefcase, FlaskConical, Server } from 'lucide-react'

const ICONS = [Briefcase, FlaskConical, Server]

export function JourneyApp() {
  const { language } = useSiteSettings()
  const t = siteCopy[language].journey
  const about = siteCopy[language].about

  const [selected, setSelected] = useState(0)
  const item = t.items[selected]

  return (
    <div className="journey-wrap" style={{ height: 'calc(100dvh - 130px)', maxHeight: '660px' }}>
      <Window
        title={language === 'pt' ? 'experience.md — Cielio OS' : 'experience.md — Cielio OS'}
        className="h-full"
        bodyClassName="overflow-hidden"
      >
        <div className="journey-layout h-full">
          {/* ── Sidebar ── */}
          <div className="journey-sidebar">
            <p className="projects-sidebar-head" style={{ padding: '4px 8px 8px' }}>
              {language === 'pt' ? 'Workspace' : 'Workspace'}
            </p>

            {t.items.map((exp, i) => {
              const Icon = ICONS[i] ?? Briefcase
              return (
                <button
                  key={exp.title}
                  className={`journey-nav-item ${selected === i ? 'active' : ''}`}
                  onClick={() => setSelected(i)}
                >
                  <div className="flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: selected === i ? 'var(--lime-dark)' : 'var(--os-on-dim)' }} />
                    <span className="journey-nav-title">{exp.title}</span>
                  </div>
                  <span className="journey-nav-org">{exp.org}</span>
                  <span className="journey-nav-period">{exp.period}</span>
                </button>
              )
            })}

            {/* About cards in sidebar bottom */}
            <div className="mt-auto pt-4" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
              <p className="projects-sidebar-head" style={{ padding: '4px 8px 8px' }}>
                {language === 'pt' ? 'Sobre' : 'About'}
              </p>
              {about.cards.map((card) => (
                <div key={card.title} className="px-3 py-2">
                  <p className="text-[11px] font-semibold" style={{ color: 'var(--lime-dark)' }}>{card.title}</p>
                  <p className="text-[11px] leading-snug mt-0.5" style={{ color: 'var(--os-on-dim)' }}>{card.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Main file editor view ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              className="journey-detail"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.18 }}
            >
              {/* File header */}
              <div className="journey-file-header">
                {(() => {
                  const Icon = ICONS[selected] ?? Briefcase
                  return <Icon className="w-5 h-5" style={{ color: 'var(--lime-dark)' }} />
                })()}
                <div>
                  <p className="text-[14px] font-bold" style={{ color: 'var(--os-on-surface)' }}>
                    {item.title}
                  </p>
                  <p className="text-[12px]" style={{ color: 'var(--os-on-dim)' }}>
                    {item.org}
                  </p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <span className="journey-active-badge">
                    <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    {item.period}
                  </span>
                </div>
              </div>

              {/* Content as "file" */}
              <div className="space-y-2">
                {/* Metadata block */}
                <div className="space-y-1 mb-4">
                  <p className="journey-comment"># {language === 'pt' ? 'Detalhes do cargo' : 'Position details'}</p>
                  <p>
                    <span className="journey-key">role:       </span>
                    <span className="journey-val">"{item.title}"</span>
                  </p>
                  <p>
                    <span className="journey-key">org:        </span>
                    <span className="journey-val">"{item.org}"</span>
                  </p>
                  <p>
                    <span className="journey-key">period:     </span>
                    <span className="journey-val">"{item.period}"</span>
                  </p>
                </div>

                {/* Bullets */}
                <p className="journey-comment mt-4"># {language === 'pt' ? 'Responsabilidades' : 'Responsibilities'}</p>
                <div className="space-y-2 mt-2">
                  {item.bullets.map((bullet) => (
                    <p key={bullet} className="journey-bullet">
                      {bullet}
                    </p>
                  ))}
                </div>
              </div>

              {/* About notes from current entry */}
              <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                <p className="journey-comment mb-3"># {language === 'pt' ? 'Notas pessoais' : 'Personal notes'}</p>
                {about.notes.map((note, i) => (
                  <p
                    key={i}
                    className="text-[12.5px] leading-relaxed mb-2"
                    style={{ color: 'var(--os-on-surface)', opacity: 0.78 }}
                  >
                    {note}
                  </p>
                ))}
                {about.macText && (
                  <div
                    className="mt-3 flex items-start gap-2 rounded-lg p-3"
                    style={{ background: 'var(--lime-bg)', border: '1px solid var(--lime)' }}
                  >
                    <span className="text-base">💻</span>
                    <p className="text-[12px] leading-relaxed" style={{ color: 'var(--lime-dark)' }}>
                      {about.macText}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </Window>
    </div>
  )
}
