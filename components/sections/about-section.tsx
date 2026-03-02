"use client"

import { useReveal } from '@/hooks/use-reveal'
import { useSiteSettings } from '@/hooks/use-site-settings'
import { siteCopy } from '@/lib/site-copy'
import { GraduationCap, Building2, Rocket, Workflow, Laptop } from 'lucide-react'

const icons = [GraduationCap, Building2, Workflow, Rocket]
const macosStack = ['macOS', 'zsh', 'Homebrew', 'iTerm2', 'Raycast', 'OrbStack', 'GitHub Codex', 'Google Antigravity', 'AI Agents']

export function AboutSection() {
  const { ref, visible } = useReveal()
  const { language } = useSiteSettings()
  const t = siteCopy[language].about

  return (
    <section id="sobre" className="section-wrap">
      <div ref={ref} className={`mx-auto max-w-6xl space-y-8 reveal ${visible ? 'visible' : ''}`}>
        <div className="section-head">
          <p className="section-kicker">{t.kicker}</p>
          <h2 className="section-title">{t.title}</h2>
        </div>

        <article className="notes-card">
          <div className="notes-toolbar">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
            <span className="notes-title">{t.notesTitle}</span>
          </div>
          <div className="notes-body">
            {t.notes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>
        </article>

        <article className="glass-panel p-5 sm:p-6">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
            <Laptop className="h-3.5 w-3.5 text-cyber-cyan" />
            <span className="text-[10px] uppercase tracking-[0.16em] text-white/75">{t.macBadge}</span>
          </div>
          <p className="mb-4 text-sm leading-relaxed text-white/72">{t.macText}</p>
          <div className="flex flex-wrap gap-2.5">
            {macosStack.map((tool) => (
              <span key={tool} className="neon-tag-soft">
                {tool}
              </span>
            ))}
          </div>
        </article>

        <div className="grid gap-4 sm:grid-cols-2">
          {t.cards.map((card, index) => {
            const Icon = icons[index]
            return (
              <article key={card.title} className="glass-panel card-rise p-5">
                <div className="mb-3 inline-flex rounded-lg border border-white/15 bg-white/5 p-2.5">
                  <Icon className="h-4 w-4 text-cyber-cyan" />
                </div>
                <h3 className="mb-2 font-heading text-sm tracking-[0.1em] text-white">{card.title}</h3>
                <p className="text-sm leading-relaxed text-white/70">{card.text}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
