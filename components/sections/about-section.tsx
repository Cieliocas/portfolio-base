"use client"

import { useReveal } from '@/hooks/use-reveal'
import { GraduationCap, Building2, Rocket, Workflow, Laptop } from 'lucide-react'

const cards = [
  {
    icon: GraduationCap,
    title: 'Formacao',
    text: 'Ciencia da Computacao na UFPI, com previsao de conclusao em 2027.',
  },
  {
    icon: Building2,
    title: 'Atuacao atual',
    text: 'Auxiliar de Infraestrutura e HPC no NCAD/UFPI (2025 - atual).',
  },
  {
    icon: Workflow,
    title: 'Foco tecnico',
    text: 'Cluster management, observabilidade, automacao e engenharia de plataforma.',
  },
  {
    icon: Rocket,
    title: 'Direcao',
    text: 'Evolucao em cloud, DevOps e infraestrutura para IA/ML.',
  },
]

const macosStack = [
  'macOS',
  'zsh',
  'Homebrew',
  'iTerm2',
  'Raycast',
  'OrbStack',
  'GitHub Codex',
  'Google Antigravity',
  'AI Agents',
]

export function AboutSection() {
  const { ref, visible } = useReveal()

  return (
    <section id="sobre" className="section-wrap">
      <div ref={ref} className={`mx-auto max-w-6xl space-y-8 reveal ${visible ? 'visible' : ''}`}>
        <div className="section-head">
          <p className="section-kicker">Sobre</p>
          <h2 className="section-title">Engenharia de infraestrutura com mentalidade de produto</h2>
        </div>

        <article className="notes-card">
          <div className="notes-toolbar">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
            <span className="notes-title">Notas · Sobre mim</span>
          </div>
          <div className="notes-body">
            <p>
              Sou estudante de Ciencia da Computacao e pesquisador com atuacao em ambientes Linux,
              virtualizacao e computacao de alto desempenho. Trabalho com setup e operacao de cluster
              usando Proxmox e SLURM, com foco em estabilidade e uso eficiente de recursos.
            </p>
            <p>
              Minha base de desenvolvimento para infraestrutura e Golang. Tambem atuo com containers,
              fundamentos de CI/CD e monitoramento com Grafana + PostgreSQL para suporte de workloads
              tecnicos e projetos academicos.
            </p>
          </div>
        </article>

        <article className="glass-panel p-5 sm:p-6">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5">
            <Laptop className="h-3.5 w-3.5 text-cyber-cyan" />
            <span className="text-[10px] uppercase tracking-[0.16em] text-white/75">MacOS-first workflow</span>
          </div>
          <p className="mb-4 text-sm leading-relaxed text-white/72">
            Meu ambiente principal e macOS, com fluxo orientado a terminal e automacao para produtividade em desenvolvimento de infraestrutura.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {macosStack.map((tool) => (
              <span key={tool} className="neon-tag-soft">
                {tool}
              </span>
            ))}
          </div>
        </article>

        <div className="grid gap-4 sm:grid-cols-2">
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <article key={card.title} className="glass-panel card-rise p-5">
                <div className="mb-3 inline-flex rounded-lg border border-white/15 bg-white/5 p-2.5">
                  <Icon className="h-4 w-4 text-cyber-cyan" />
                </div>
                <h3 className="mb-2 font-heading text-sm tracking-[0.1em] text-white">{card.title}</h3>
                <p className="text-sm leading-relaxed text-white/70">{card.text}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
