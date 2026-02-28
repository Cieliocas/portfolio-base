"use client"

import { useReveal } from '@/hooks/use-reveal'
import { GraduationCap, Building2, Rocket, Workflow } from 'lucide-react'

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

export function AboutSection() {
  const { ref, visible } = useReveal()

  return (
    <section id="sobre" className="section-wrap px-5 md:px-8">
      <div ref={ref} className={`mx-auto max-w-6xl space-y-8 reveal ${visible ? 'visible' : ''}`}>
        <div className="section-head">
          <p className="section-kicker">Sobre</p>
          <h2 className="section-title">Engenharia de infraestrutura com mentalidade de produto</h2>
        </div>

        <div className="glass-panel space-y-5 p-6 md:p-8">
          <p className="text-sm leading-relaxed text-white/80 md:text-base">
            Sou estudante de Ciencia da Computacao e pesquisador com atuacao em ambientes Linux,
            virtualizacao e computacao de alto desempenho. Trabalho com setup e operacao de cluster
            usando Proxmox e SLURM, com foco em estabilidade e uso eficiente de recursos.
          </p>
          <p className="text-sm leading-relaxed text-white/70 md:text-base">
            Minha base de desenvolvimento para infraestrutura e Golang. Tambem atuo com containers,
            fundamentos de CI/CD e monitoramento com Grafana + PostgreSQL para suporte de workloads
            tecnicos e projetos academicos.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {cards.map((card) => {
            const Icon = card.icon
            return (
              <article key={card.title} className="glass-panel p-5">
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
