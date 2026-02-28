"use client"

import { useReveal } from '@/hooks/use-reveal'
import { Brain, ServerCog, Image as ImageIcon, Cpu, Database, Monitor, ExternalLink } from 'lucide-react'

const projects = [
  {
    title: 'Mamografia BI-RADS AI',
    subtitle: 'Ferramenta de Anotacao Semiautomatica de Achados Radiologicos em Mamografia',
    status: 'Pesquisa ativa',
    icon: Brain,
    stack: ['Python', 'TensorFlow', 'Flask', 'Next.js', 'Tailwind', 'Slurm', 'NVIDIA L4'],
    highlights: [
      'Pipeline de segmentacao com U-Net para suporte a classificacao BI-RADS.',
      'Leitura DICOM com pydicom + preprocessamento com OpenCV.',
      'Fluxo semiautomatico para validacao medica com segunda opiniao em tempo real.',
      'Treinamento em cluster TechNE com GPUs NVIDIA L4 e jobs via Slurm.',
    ],
    footer: 'CNPq · UFPI · NCAD/Cluster TechNE · Orientacao Prof. Andre Castelo Branco Soares',
    link: 'https://github.com/Cieliocas/mamografia-bi-rads-ia',
    linkLabel: 'Repositorio do projeto',
  },
  {
    title: 'Cluster HPC TECHNE',
    subtitle: 'Documentacao tecnica da arquitetura, operacao e monitoramento do cluster',
    status: 'Infra ativa',
    icon: ServerCog,
    stack: ['Slurm 23.11', 'Munge', 'PostgreSQL', 'MariaDB', 'Grafana', 'Python', 'CUDA'],
    highlights: [
      'Topologia com no controlador + nos heterogeneos com GPU NVIDIA L4.',
      'Configuracao centralizada do Slurm com particoes de GPU e accounting.',
      'Pipeline customizado de metricas (Python + PostgreSQL) alimentando dashboards Grafana.',
      'Operacao Linux com foco em observabilidade, fila de jobs e uso de recursos.',
    ],
    footer: 'INFRA NCAD/UFPI · Documentacao e evolucao continua da plataforma',
    link: 'https://github.com/NCAD-UFPI',
    linkLabel: 'Organizacao NCAD/UFPI',
  },
]

const projectMeta = [
  { icon: Cpu, text: 'HPC + IA' },
  { icon: Database, text: 'Dados Clinicos e Telemetria' },
  { icon: Monitor, text: 'UX Tecnica + Observabilidade' },
]

export function ProjectsSection() {
  const { ref, visible } = useReveal()

  return (
    <section id="projetos" className="section-wrap">
      <div ref={ref} className={`mx-auto max-w-6xl space-y-8 reveal ${visible ? 'visible' : ''}`}>
        <div className="section-head">
          <p className="section-kicker">Projetos</p>
          <h2 className="section-title">Projetos em desenvolvimento e pesquisa aplicada</h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {projectMeta.map((item) => {
            const Icon = item.icon
            return (
              <div key={item.text} className="glass-panel flex items-center gap-2.5 p-3.5">
                <Icon className="h-4 w-4 text-cyber-cyan" />
                <span className="text-xs uppercase tracking-[0.1em] text-white/80">{item.text}</span>
              </div>
            )
          })}
        </div>

        <div className="space-y-4">
          {projects.map((project, idx) => {
            const Icon = project.icon
            return (
              <article key={project.title} className="glass-panel project-card p-5 sm:p-6" style={{ transitionDelay: `${idx * 90}ms` }}>
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className="rounded-lg border border-cyber-cyan/35 bg-cyber-cyan/10 p-2">
                    <Icon className="h-4 w-4 text-cyber-cyan" />
                  </span>
                  <span className="rounded-full border border-cyber-pink/35 bg-cyber-pink/10 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-cyber-pink">
                    {project.status}
                  </span>
                </div>

                <h3 className="mb-2 font-heading text-base tracking-[0.04em] text-white sm:text-lg">{project.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-white/70">{project.subtitle}</p>

                <div className="project-image-placeholder mb-4">
                  <ImageIcon className="h-4 w-4 text-cyber-cyan" />
                  <span>Espaco pronto para imagem do projeto (voce anexa depois)</span>
                </div>

                <div className="mb-4 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span key={tech} className="neon-tag-soft">
                      {tech}
                    </span>
                  ))}
                </div>

                <ul className="mb-4 space-y-2">
                  {project.highlights.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm leading-relaxed text-white/78">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyber-pink" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-xs leading-relaxed tracking-[0.04em] text-white/55">{project.footer}</p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-cyber-cyan hover:text-cyber-pink transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  {project.linkLabel}
                </a>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
