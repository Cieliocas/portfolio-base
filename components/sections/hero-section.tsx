"use client"

import Image from 'next/image'
import { Download, ArrowDown, Sparkles, Server, Cloud, Cpu } from 'lucide-react'

const highlights = [
  { icon: Server, label: 'HPC Clusters' },
  { icon: Cloud, label: 'DevOps & Cloud' },
  { icon: Cpu, label: 'AI Infrastructure' },
]

export function HeroSection() {
  return (
    <section className="hero-bg relative overflow-hidden px-4 pb-16 pt-28">
      <div className="ambient-orb ambient-orb-cyan" />
      <div className="ambient-orb ambient-orb-pink" />

      <div className="space-y-5">
        <div className="neon-sign-board">
          <span className="neon-sign-text">CODE. DEPLOY. REPEAT.</span>
        </div>

        <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[10px] uppercase tracking-[0.16em] text-cyber-cyan">
          <Sparkles className="h-3.5 w-3.5" />
          Computer Science @ UFPI
        </p>

        <div className="space-y-3">
          <h1 className="font-heading text-[1.7rem] leading-tight text-white">
            Francielio Castro
          </h1>
          <p className="text-sm leading-relaxed text-white/75">
            Construo plataformas confiaveis para infraestrutura, cloud e workloads de alta performance.
            Hoje atuo com Linux, Proxmox, SLURM, Docker e automacoes focadas em escala.
          </p>
          <p className="text-[11px] uppercase tracking-[0.14em] text-white/55">
            Workflow diario em macOS com foco em terminal, automacao e observabilidade.
          </p>
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
            <p><span className="prompt">$</span> deploy --mode=stable</p>
          </div>
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

        <div className="flex flex-wrap gap-2.5 pt-1">
          <a
            href="/resume-linkedin.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neon-cyan"
          >
            <Download className="h-4 w-4" />
            CV LinkedIn
          </a>
          <a
            href="/resume-francielio.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-neon-pink"
          >
            <Download className="h-4 w-4" />
            CV Pessoal
          </a>
        </div>

        <div className="profile-card mt-2">
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

      <a href="#sobre" className="scroll-indicator" aria-label="Ir para a secao sobre">
        <span>Explorar</span>
        <ArrowDown className="h-4 w-4" />
      </a>
    </section>
  )
}
