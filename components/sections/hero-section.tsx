"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Sparkles, Server, Cloud, Cpu } from 'lucide-react'
import { useSiteSettings } from '@/hooks/use-site-settings'
import { siteCopy } from '@/lib/site-copy'

const highlightIcons = [Server, Cloud, Cpu]
const heroName = 'Franciélio Castro'

export function HeroSection() {
  const { language } = useSiteSettings()
  const t = siteCopy[language].hero
  const [typedName, setTypedName] = useState('')

  useEffect(() => {
    let i = 0
    const timer = setInterval(() => {
      i += 1
      setTypedName(heroName.slice(0, i))
      if (i >= heroName.length) {
        clearInterval(timer)
      }
    }, 85)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="hero-bg relative overflow-hidden pb-10 pt-8">
      <div className="space-y-4">
        <div className="neon-sign-board">
          <span className="neon-sign-text">CODE. DEPLOY. REPEAT.</span>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.25fr_0.75fr] md:items-start">
          <div className="space-y-4">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[10px] uppercase tracking-[0.16em] text-cyber-cyan">
              <Sparkles className="h-3.5 w-3.5" />
              {t.badge}
            </p>

            <div className="space-y-2.5">
              <h1 className="font-heading text-[1.65rem] leading-tight text-white">
                {typedName}
                <span className="typing-caret" aria-hidden="true">|</span>
              </h1>
              <p className="text-sm leading-relaxed text-white/75">{t.description}</p>
              <p className="text-[11px] uppercase tracking-[0.14em] text-white/55">{t.workflow}</p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {t.highlights.map((label, index) => {
                const Icon = highlightIcons[index]
                return (
                  <span key={label} className="neon-tag">
                    <Icon className="h-3.5 w-3.5" />
                    {label}
                  </span>
                )
              })}
            </div>
          </div>

          <div className="profile-card md:mt-1">
            <div className="profile-image-wrap">
              <Image
                src="/profile-1758510032384.jpeg"
                alt={t.photoAlt}
                width={420}
                height={420}
                className="h-full w-full object-cover"
                priority
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-sm">
              <div className="data-tile">
                <span className="data-k">{t.locationLabel}</span>
                <span className="data-v">Teresina, PI</span>
              </div>
              <div className="data-tile">
                <span className="data-k">{t.roleLabel}</span>
                <span className="data-v">Infra & HPC</span>
              </div>
              <div className="data-tile">
                <span className="data-k">{t.stackLabel}</span>
                <span className="data-v">Go + Linux</span>
              </div>
              <div className="data-tile">
                <span className="data-k">{t.statusLabel}</span>
                <span className="data-v text-cyber-cyan">{t.statusValue}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mac-terminal">
          <div className="mac-topbar">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
            <span className="title">zsh — francielio@macbook-pro</span>
          </div>
          <div className="terminal-content">
            <p><span className="prompt">$</span> neofetch --off</p>
            <p className="out">{t.terminalOutput1}</p>
            <p><span className="prompt">$</span> ssh gpunode01</p>
            <p className="out">{t.terminalOutput2}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
