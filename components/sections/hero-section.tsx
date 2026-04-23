"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Sparkles, Server, Cloud, Cpu } from 'lucide-react'
import { useSiteSettings } from '@/hooks/use-site-settings'
import { siteCopy } from '@/lib/site-copy'

const highlightIcons = [Server, Cloud, Cpu]
const heroName = 'Franciélio Castro'

type StatusState = 'ok' | 'warn' | 'neutral'

const statusChunks: { label: string; value: string; state: StatusState }[] = [
  { label: 'slurmctld', value: 'ready', state: 'ok' },
  { label: 'nodes', value: '4/4 up', state: 'ok' },
  { label: 'partition gpu', value: 'idle', state: 'ok' },
  { label: 'queue', value: '0', state: 'ok' },
  { label: 'cuda', value: '12.4', state: 'neutral' },
  { label: 'torch', value: 'ready', state: 'ok' },
  { label: 'nccl', value: 'ok', state: 'ok' },
  { label: 'gpu mem', value: '38%', state: 'warn' },
  { label: 'uptime', value: '124d', state: 'neutral' },
]

function StatusRow() {
  return (
    <div className="status-ticker-row">
      {statusChunks.map((chunk, idx) => (
        <span key={`${chunk.label}-${idx}`} className="status-chunk">
          <span className={`status-dot status-dot-${chunk.state}`} />
          <span className="status-key">{chunk.label}</span>
          <span className="status-val">{chunk.value}</span>
        </span>
      ))}
    </div>
  )
}

const GPU_SM_COLS = 8
const GPU_SM_ROWS = 3

function GpuDie() {
  const cells: React.ReactElement[] = []
  for (let r = 0; r < GPU_SM_ROWS; r++) {
    for (let c = 0; c < GPU_SM_COLS; c++) {
      const x = 14 + c * 27
      const y = 10 + r * 14
      const idx = r * GPU_SM_COLS + c
      const kindClass =
        idx % 7 === 0 ? ' gpu-sm-green' : idx % 5 === 0 ? ' gpu-sm-violet' : ''
      cells.push(
        <rect
          key={`sm-${r}-${c}`}
          x={x}
          y={y}
          width={22}
          height={10}
          rx={2}
          className={`gpu-sm${kindClass}`}
          style={{ animationDelay: `${idx * 0.05}s`, transitionDelay: `${idx * 0.035}s` }}
        />,
      )
    }
  }

  return (
    <div className="gpu-die" aria-hidden>
      <div className="gpu-die-head">
        <span className="status-dot status-dot-ok" />
        <span>GPU · NVIDIA L4</span>
        <span className="gpu-die-meta">24 SM · CUDA 12.4</span>
      </div>
      <svg viewBox="0 0 240 64" xmlns="http://www.w3.org/2000/svg">
        <rect x="2" y="2" width="236" height="56" rx="8" className="gpu-die-outline" />
        {cells}
        <path d="M 24 56 L 24 64" className="gpu-trace" style={{ transitionDelay: '0.1s' }} />
        <path d="M 60 56 L 60 64" className="gpu-trace" style={{ transitionDelay: '0.2s' }} />
        <path d="M 120 56 L 120 64" className="gpu-trace" style={{ transitionDelay: '0.3s' }} />
        <path d="M 180 56 L 180 64" className="gpu-trace" style={{ transitionDelay: '0.4s' }} />
        <path d="M 216 56 L 216 64" className="gpu-trace" style={{ transitionDelay: '0.5s' }} />
      </svg>
    </div>
  )
}

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
        <div className="status-ticker" aria-label="Cluster status">
          <div className="status-ticker-track">
            <StatusRow />
            <StatusRow />
          </div>
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

            <GpuDie />
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
