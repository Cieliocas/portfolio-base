"use client"

import { useReveal } from '@/hooks/use-reveal'
import { useSiteSettings } from '@/hooks/use-site-settings'
import { siteCopy } from '@/lib/site-copy'

export function SkillsSection() {
  const { ref, visible } = useReveal()
  const { language } = useSiteSettings()
  const t = siteCopy[language].skills

  return (
    <section id="skills" className="section-wrap">
      <div ref={ref} className={`mx-auto max-w-6xl space-y-8 reveal ${visible ? 'visible' : ''}`}>
        <div className="section-head">
          <p className="section-kicker">{t.kicker}</p>
          <h2 className="section-title">{t.title}</h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {t.groups.map((group) => (
            <article key={group.title} className="glass-panel p-5">
              <h3 className="mb-4 font-heading text-sm tracking-[0.1em] text-cyber-pink">{group.title}</h3>
              <div className="flex flex-wrap gap-2.5">
                {group.items.map((item) => (
                  <span key={item} className="neon-tag-soft">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
