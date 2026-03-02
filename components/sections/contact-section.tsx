"use client"

import { useMemo } from 'react'
import { useReveal } from '@/hooks/use-reveal'
import { useSiteSettings } from '@/hooks/use-site-settings'
import { siteCopy } from '@/lib/site-copy'
import { Linkedin, Github, Mail, Phone, Download } from 'lucide-react'

const linkIcons = [Linkedin, Github, Mail, Phone]
const hrefs = [
  'https://www.linkedin.com/in/cieliocas/',
  'https://github.com/cieliocas',
  'mailto:francielioevangelista@hotmail.com',
]

export function ContactSection() {
  const { ref, visible } = useReveal()
  const { language } = useSiteSettings()
  const t = siteCopy[language].contact

  const links = useMemo(
    () => [
      { ...t.links[0], href: hrefs[0] },
      { ...t.links[1], href: hrefs[1] },
      { ...t.links[2], href: hrefs[2] },
      {
        ...t.links[3],
        href: `https://wa.me/5586988217293?text=${encodeURIComponent(t.whatsappText)}`,
      },
    ],
    [t],
  )

  return (
    <section id="contato" className="section-wrap pb-20">
      <div ref={ref} className={`mx-auto max-w-6xl space-y-8 reveal ${visible ? 'visible' : ''}`}>
        <div className="section-head">
          <p className="section-kicker">{t.kicker}</p>
          <h2 className="section-title">{t.title}</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {links.map((item, index) => {
            const Icon = linkIcons[index]
            return (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="glass-panel flex w-full min-w-0 items-center gap-3 p-4 transition-transform hover:-translate-y-0.5 sm:gap-4 sm:p-5"
              >
                <span className="shrink-0 rounded-lg border border-white/15 bg-white/5 p-2.5">
                  <Icon className="h-4 w-4 text-cyber-cyan" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] uppercase tracking-[0.14em] text-white/45">{item.label}</span>
                  <span className="block break-all text-sm leading-snug text-white/85 sm:break-normal">{item.value}</span>
                </span>
              </a>
            )
          })}
        </div>

        <div className="glass-panel flex flex-col items-start gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <p className="max-w-2xl text-sm leading-relaxed text-white/75">{t.summary}</p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/resume-francielio.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-neon-cyan w-full justify-center sm:w-auto"
            >
              <Download className="h-4 w-4" />
              {t.downloadCv}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
