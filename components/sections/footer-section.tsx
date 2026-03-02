"use client"

import { useSiteSettings } from '@/hooks/use-site-settings'
import { siteCopy } from '@/lib/site-copy'

export function FooterSection() {
  const { language } = useSiteSettings()
  const t = siteCopy[language].footer

  return (
    <footer className="footer-shell border-t border-white/10">
      <div className="flex flex-col items-center justify-between gap-3 px-4 py-7 text-center">
        <p className="font-heading text-[10px] tracking-[0.16em] text-cyber-cyan">@cieliocas</p>
        <p className="footer-note text-[11px] text-white/55">{t.note}</p>
      </div>
    </footer>
  )
}
