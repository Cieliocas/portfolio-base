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
    <section className="hero-bg relative overflow-hidden px-5 pb-16 pt-28 md:px-8 md:pt-36">
      <div className="ambient-orb ambient-orb-cyan" />
      <div className="ambient-orb ambient-orb-pink" />

      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-center">
        <div className="space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[11px] uppercase tracking-[0.16em] text-cyber-cyan">
            <Sparkles className="h-3.5 w-3.5" />
            Computer Science @ UFPI
          </p>

          <div className="space-y-4">
            <h1 className="font-heading text-3xl leading-tight text-white sm:text-4xl md:text-5xl">
              Francielio Castro
            </h1>
            <p className="max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
              Construo plataformas confiaveis para infraestrutura, cloud e workloads de alta performance.
              Hoje atuo com Linux, Proxmox, SLURM, Docker e automacoes focadas em escala.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
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

          <div className="flex flex-wrap gap-3 pt-2">
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
        </div>

        <div className="profile-card">
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

          <div className="grid grid-cols-2 gap-3 text-sm">
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
