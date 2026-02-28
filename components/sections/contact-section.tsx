"use client"

import { useReveal } from '@/hooks/use-reveal'
import { Linkedin, Github, Mail, Phone, Download } from 'lucide-react'

const links = [
  {
    label: 'LinkedIn',
    value: '/in/cieliocas',
    href: 'https://www.linkedin.com/in/cieliocas/',
    icon: Linkedin,
  },
  {
    label: 'GitHub',
    value: '@cieliocas',
    href: 'https://github.com/cieliocas',
    icon: Github,
  },
  {
    label: 'Email',
    value: 'Meu e-mail',
    href: 'mailto:francielioevangelista@hotmail.com',
    icon: Mail,
  },
  {
    label: 'Telefone',
    value: '+55 (86) 9 8821-7293',
    href: 'https://wa.me/5586988217293?text=Ola%2C%20Francielio!%20Vim%20pelo%20seu%20portfolio.',
    icon: Phone,
  },
]

export function ContactSection() {
  const { ref, visible } = useReveal()

  return (
    <section id="contato" className="section-wrap pb-20">
      <div ref={ref} className={`mx-auto max-w-6xl space-y-8 reveal ${visible ? 'visible' : ''}`}>
        <div className="section-head">
          <p className="section-kicker">Contato</p>
          <h2 className="section-title">Vamos construir algo robusto juntos</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {links.map((item) => {
            const Icon = item.icon
            return (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('http') ? '_blank' : undefined}
                rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="glass-panel flex w-full min-w-0 items-center gap-3 p-4 sm:gap-4 sm:p-5 transition-transform hover:-translate-y-0.5"
              >
                <span className="shrink-0 rounded-lg border border-white/15 bg-white/5 p-2.5">
                  <Icon className="h-4 w-4 text-cyber-cyan" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[10px] uppercase tracking-[0.14em] text-white/45">{item.label}</span>
                  <span className="block break-all text-sm leading-snug text-white/85 sm:break-normal">{item.value}</span>
                </span>
              </a>
            )
          })}
        </div>

        <div className="glass-panel flex flex-col items-start gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <p className="max-w-2xl text-sm leading-relaxed text-white/75">
            Disponivel para estagio e projetos em infraestrutura, platform engineering, cloud e AI ops.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="/resume-francielio.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-neon-cyan w-full justify-center sm:w-auto"
            >
              <Download className="h-4 w-4" />
              Baixar CV
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
