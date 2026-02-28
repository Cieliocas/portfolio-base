"use client"

import { useReveal } from '@/hooks/use-reveal'

const stacks = [
  {
    title: 'Infraestrutura e HPC',
    items: ['Linux', 'Proxmox', 'SLURM', 'Cluster Operations', 'Observabilidade', 'Shell Script'],
  },
  {
    title: 'Cloud e DevOps',
    items: ['Docker', 'Kubernetes (base)', 'CI/CD', 'GitHub Actions', 'AWS Fundamentals', 'Google Cloud Fundamentals'],
  },
  {
    title: 'Programacao e Dados',
    items: ['Golang', 'Python', 'TypeScript', 'Node.js', 'PostgreSQL', 'MySQL'],
  },
]

export function SkillsSection() {
  const { ref, visible } = useReveal()

  return (
    <section id="skills" className="section-wrap">
      <div ref={ref} className={`mx-auto max-w-6xl space-y-8 reveal ${visible ? 'visible' : ''}`}>
        <div className="section-head">
          <p className="section-kicker">Skills</p>
          <h2 className="section-title">Stack para operar, escalar e automatizar</h2>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {stacks.map((group) => (
            <article key={group.title} className="glass-panel p-5">
              <h3 className="mb-4 font-heading text-sm tracking-[0.1em] text-cyber-pink">{group.title}</h3>
              <div className="flex flex-wrap gap-2.5">
                {group.items.map((item) => (
                  <span key={item} className="neon-tag-soft">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
