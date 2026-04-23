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
      <div ref={ref} className={`mx-auto max-w-6xl space-y-7 reveal ${visible ? 'visible' : ''}`}>
        <div className="section-head">
          <p className="section-kicker">{t.kicker}</p>
          <h2 className="section-title">{t.title}</h2>
        </div>

        <div className="journey-hardware-strip">
          <span className="status-dot status-dot-ok" />
          <span className="journey-hardware-label">
            {language === 'pt' ? 'Hardware operado no cluster' : 'Hardware operated on cluster'}
          </span>
          <span className="journey-hardware-meta">CUDA 12.4 · NVLink 4.0 · Driver 550.x · 8× H100 SXM5</span>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {t.items.map((item, index) => (
            <article
              key={item.title}
              className="glass-panel journey-card p-5 md:p-6"
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              <div className="mb-3 flex flex-wrap items-center gap-2.5">
                <span className="journey-status-led" />
                <span className="rounded-md border border-cyber-cyan/40 bg-cyber-cyan/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-cyber-cyan">
                  {item.period}
                </span>
              </div>
              <h3 className="mb-2 font-heading text-sm tracking-[0.06em] text-white md:text-[15px]">
                {item.title}
              </h3>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.08em] text-white/55">
                {item.org}
              </p>
              <ul className="space-y-2">
                {item.bullets.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 text-[13px] leading-relaxed text-white/78"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyber-pink" />
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
