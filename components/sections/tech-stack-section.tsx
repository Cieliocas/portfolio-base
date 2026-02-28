"use client"

import { useReveal } from '@/hooks/use-reveal'

const journey = [
  {
    title: 'Auxiliar de Infraestrutura e HPC',
    org: 'Infra NCAD | UFPI',
    period: '2025 - Atual',
    bullets: [
      'Configuracao e gerenciamento de ambientes Linux virtualizados com Proxmox.',
      'Gestao de workloads e alocacao de recursos no cluster com SLURM.',
      'Suporte para execucao de aplicacoes de IA em GPUs NVIDIA (L4 e H100).',
      'Monitoramento com Grafana + PostgreSQL e automacao de rotinas administrativas.',
    ],
  },
  {
    title: 'Desenvolvimento de Ferramenta (Iniciacao Tecnologica e Cientifica)',
    org: 'CNPq | UFPI',
    period: '2025 - Atual',
    bullets: [
      'Desenvolvimento de ferramenta de apoio ao diagnostico com redes neurais.',
      'Integracao de processamento, testes e infraestrutura em ambiente Linux.',
    ],
  },
  {
    title: 'TechNE Cluster - Projeto Academico',
    org: 'Ambiente de Cluster para IA e HPC',
    period: '2025 - Atual',
    bullets: [
      'Configuracao experimental de cluster com Proxmox e SLURM.',
      'Simulacao de arquitetura distribuida para execucao de workloads.',
    ],
  },
]

export function TechStackSection() {
  const { ref, visible } = useReveal()

  return (
    <section id="jornada" className="section-wrap">
      <div ref={ref} className={`mx-auto max-w-6xl space-y-8 reveal ${visible ? 'visible' : ''}`}>
        <div className="section-head">
          <p className="section-kicker">Jornada</p>
          <h2 className="section-title">Experiencia e projetos em infraestrutura</h2>
        </div>

        <div className="space-y-4">
          {journey.map((item) => (
            <article key={item.title} className="glass-panel p-6 md:p-7">
              <div className="mb-4 flex flex-wrap items-center gap-3">
                <h3 className="font-heading text-sm tracking-[0.08em] text-white md:text-base">{item.title}</h3>
                <span className="rounded-full border border-cyber-cyan/40 bg-cyber-cyan/10 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-cyber-cyan">
                  {item.period}
                </span>
              </div>
              <p className="mb-4 text-sm text-white/70">{item.org}</p>
              <ul className="space-y-2">
                {item.bullets.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm leading-relaxed text-white/75">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyber-pink" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
