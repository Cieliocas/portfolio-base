"use client"

const techs = [
  'Linux',
  'Docker',
  'Kubernetes',
  'SLURM',
  'Proxmox',
  'Golang',
  'Terraform',
  'Grafana',
  'PostgreSQL',
  'Python',
  'React',
  'TypeScript',
  'Cloud',
  'AI Infra',
  'GitHub Codex',
  'Google Antigravity',
  'AI Agents',
  'CI/CD',
]

export function TechMarquee() {
  const repeated = [...techs, ...techs]

  return (
    <section className="marquee-shell relative overflow-hidden border-y border-white/10 py-5">
      <div className="marquee-track">
        {repeated.map((name, idx) => (
          <div key={`${name}-${idx}`} className="marquee-chip">
            <span className="h-1.5 w-1.5 rounded-full bg-cyber-pink" />
            <span>{name}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
