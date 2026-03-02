"use client"

import { useReveal } from '@/hooks/use-reveal'
import { useSiteSettings } from '@/hooks/use-site-settings'
import { siteCopy } from '@/lib/site-copy'

export function TechStackSection() {
  const { ref, visible } = useReveal()
  const { language } = useSiteSettings()
  const t = siteCopy[language].journey

  return (
    <section id="jornada" className="section-wrap">
      <div ref={ref} className={`mx-auto max-w-6xl space-y-8 reveal ${visible ? 'visible' : ''}`}>
        <div className="section-head">
          <p className="section-kicker">{t.kicker}</p>
          <h2 className="section-title">{t.title}</h2>
        </div>

        <div className="space-y-4">
          {t.items.map((item) => (
            <article key={item.title} className="glass-panel p-6 md:p-7">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <h3 className="font-heading text-sm tracking-[0.08em] text-white md:text-base">{item.title}</h3>
                <span className="rounded-full border border-cyber-cyan/40 bg-cyber-cyan/10 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-cyber-cyan">
                  {item.period}
                </span>
              </div>
              <p className="mb-4 text-sm text-white/70">{item.org}</p>
              <ul className="space-y-2">
                {item.bullets.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm leading-relaxed text-white/75">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyber-pink" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
