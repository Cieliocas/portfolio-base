"use client"

import Image from 'next/image'
import { Sparkles, Server, Cloud, Cpu } from 'lucide-react'

const highlights = [
  { icon: Server, label: 'HPC Clusters' },
  { icon: Cloud, label: 'DevOps & Cloud' },
  { icon: Cpu, label: 'AI Infrastructure + Agents' },
]

export function HeroSection() {
  return (
    <section className="hero-bg relative overflow-hidden pb-10 pt-8">
      <div className="ambient-orb ambient-orb-cyan" />
      <div className="ambient-orb ambient-orb-pink" />

      <div className="space-y-4">
        <div className="neon-sign-board">
          <span className="neon-sign-text">CODE. DEPLOY. REPEAT.</span>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.25fr_0.75fr] md:items-start">
          <div className="space-y-4">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[10px] uppercase tracking-[0.16em] text-cyber-cyan">
              <Sparkles className="h-3.5 w-3.5" />
              Computer Science @ UFPI
            </p>

            <div className="space-y-2.5">
              <h1 className="font-heading text-[1.65rem] leading-tight text-white">Francielio Castro</h1>
              <p className="text-sm leading-relaxed text-white/75">
                Infraestrutura, Cloud e HPC com foco em confiabilidade, automacao e observabilidade.
              </p>
              <p className="text-[11px] uppercase tracking-[0.14em] text-white/55">
                macOS workflow + terminal-first development
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {highlights.map((item) => {
                const Icon = item.icon
                return (
                  <span key={item.label} className="neon-tag">
                    <Icon className="h-3.5 w-3.5" />
                    {item.label}
                  </span>
                )
              })}
            </div>
          </div>

          <div className="profile-card md:mt-1">
            <div className="profile-image-wrap">
              <Image
                src="/profile-1758510032384.jpeg"
                alt="Foto de Francielio Castro"
                width={420}
                height={420}
                className="h-full w-full object-cover"
                priority
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5 text-sm">
              <div className="data-tile">
                <span className="data-k">Base</span>
                <span className="data-v">Teresina, PI</span>
              </div>
              <div className="data-tile">
                <span className="data-k">Role</span>
                <span className="data-v">Infra & HPC</span>
              </div>
              <div className="data-tile">
                <span className="data-k">Stack</span>
                <span className="data-v">Go + Linux</span>
              </div>
              <div className="data-tile">
                <span className="data-k">Status</span>
                <span className="data-v text-cyber-cyan">Open to work</span>
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
            <p className="out">OS: macOS · Shell: zsh · Focus: HPC/DevOps</p>
            <p><span className="prompt">$</span> ssh gpunode01</p>
            <p className="out">Connected to Cluster TECHNE (Slurm + NVIDIA L4)</p>
          </div>
        </div>
      </div>
    </section>
  )
}
