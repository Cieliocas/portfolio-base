"use client"

import Image from 'next/image'
import { Terminal, FileText, FolderOpen, ExternalLink, Copy, Check, Mail, Phone } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSiteSettings } from '@/hooks/use-site-settings'
import { siteCopy } from '@/lib/site-copy'
import { Window } from '@/components/os/window'
import type { AppId } from '@/app/page'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handle = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={handle}
      className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-black/6 transition-all"
      title="Copy"
    >
      {copied
        ? <Check className="w-3.5 h-3.5 text-lime-dark" />
        : <Copy className="w-3.5 h-3.5 text-secondary" />}
    </button>
  )
}

type Props = { onNavigate: (app: AppId) => void }

export function HomeApp({ onNavigate }: Props) {
  const { language } = useSiteSettings()
  const t       = siteCopy[language]
  const hero    = t.hero
  const contact = t.contact

  const contactLinks = [
    {
      label: 'LinkedIn',
      value: '/in/cieliocas',
      href: 'https://linkedin.com/in/cieliocas',
      icon: ExternalLink,
    },
    {
      label: 'GitHub',
      value: '@cieliocas',
      href: 'https://github.com/cieliocas',
      icon: ExternalLink,
    },
    {
      label: 'Email',
      value: 'hamtarf2@gmail.com',
      href: 'mailto:hamtarf2@gmail.com',
      icon: Mail,
    },
    {
      label: language === 'pt' ? 'WhatsApp' : 'Phone',
      value: '+55 (86) 9 8821-7293',
      href: `https://wa.me/5586988217293?text=${encodeURIComponent(contact.whatsappText)}`,
      icon: Phone,
    },
  ]

  return (
    <div className="home-layout">
      {/* ── Main window ── */}
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 340, damping: 32 }}
      >
        <Window title={`Francielio Castro — DevOps`}>
          {/* Profile area */}
          <div className="flex flex-col sm:flex-row gap-5 p-7 pb-5">
            {/* Photo */}
            <div className="flex-shrink-0 self-start">
              <div
                className="w-28 h-28 rounded-full overflow-hidden border-[3px] border-white/55 shadow-md"
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
              >
                <Image
                  src="/profile-1758510032384.jpeg"
                  alt={hero.photoAlt}
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>

            {/* Text */}
            <div className="flex flex-col gap-3 flex-1 min-w-0">
              {/* Badge */}
              <span
                className="inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-[10.5px] font-semibold tracking-[0.08em] uppercase border"
                style={{
                  background: 'var(--lime-bg)',
                  color: 'var(--lime-dark)',
                  borderColor: 'var(--lime)',
                }}
              >
                {hero.badge}
              </span>

              {/* Headline */}
              <h1
                className="text-2xl md:text-[1.7rem] font-bold leading-tight tracking-tight"
                style={{ color: 'var(--os-on-surface)' }}
              >
                {language === 'pt'
                  ? 'Inovando em Cloud & Infraestrutura.'
                  : 'Innovating Cloud Infrastructures.'}
              </h1>

              {/* Description */}
              <p className="text-[13.5px] leading-relaxed" style={{ color: 'var(--secondary)' }}>
                {hero.description}
              </p>

              {/* Highlight tags */}
              <div className="flex flex-wrap gap-1.5 mt-0.5">
                {hero.highlights.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full px-3 py-1 text-[11px] font-medium"
                    style={{
                      background: 'rgba(0,0,0,0.05)',
                      color: 'var(--os-on-variant)',
                      border: '1px solid rgba(0,0,0,0.08)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div className="home-stats-row">
            {[
              { k: hero.locationLabel, v: 'Teresina, PI' },
              { k: hero.roleLabel,     v: 'Infra & HPC' },
              { k: hero.stackLabel,    v: 'Go + Linux' },
              { k: hero.statusLabel,   v: hero.statusValue },
            ].map(({ k, v }, i) => (
              <div key={k} className="home-stat-cell" style={{ borderRight: i < 3 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
                <span
                  className="text-[9.5px] font-bold uppercase tracking-[0.14em]"
                  style={{ color: 'var(--os-on-dim)' }}
                >
                  {k}
                </span>
                <span
                  className="text-[13px] font-semibold truncate"
                  style={{ color: i === 3 ? 'var(--lime-dark)' : 'var(--os-on-surface)' }}
                >
                  {v}
                </span>
              </div>
            ))}
          </div>

          {/* CTA row */}
          <div
            className="flex flex-wrap items-center gap-2.5 px-6 py-4"
            style={{ borderTop: '1px solid rgba(0,0,0,0.05)' }}
          >
            <button
              onClick={() => onNavigate('terminal')}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-[12.5px] font-bold transition-all active:scale-95 hover:brightness-105"
              style={{
                background: 'var(--lime)',
                color: 'var(--lime-dark)',
                boxShadow: '0 0 18px var(--lime-glow)',
              }}
            >
              <Terminal className="w-3.5 h-3.5" />
              {language === 'pt' ? 'Abrir Terminal' : 'Launch Terminal'}
            </button>

            <a
              href="/resume-francielio.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-[12.5px] font-medium transition-all hover:bg-white/40"
              style={{
                borderColor: 'rgba(255,255,255,0.5)',
                background: 'rgba(255,255,255,0.25)',
                color: 'var(--os-on-surface)',
              }}
            >
              <FileText className="w-3.5 h-3.5" />
              {language === 'pt' ? 'Ver CV' : 'View Resume'}
            </a>

            <button
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-[12.5px] font-medium transition-all hover:bg-white/40"
              style={{
                borderColor: 'rgba(255,255,255,0.5)',
                background: 'rgba(255,255,255,0.25)',
                color: 'var(--os-on-surface)',
              }}
            >
              <FolderOpen className="w-3.5 h-3.5" />
              {language === 'pt' ? 'Projetos' : 'Projects'}
            </button>
          </div>
        </Window>
      </motion.div>

      {/* ── Contact sticky-note window ── */}
      <motion.div
        className="home-contact-window"
        initial={{ opacity: 0, y: 22, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 340, damping: 32, delay: 0.07 }}
      >
        <Window
          title={language === 'pt' ? 'Contato' : 'Contact Details'}
          className="h-full"
        >
          {/* Slightly warm tint inside */}
          <div className="p-5 flex flex-col gap-4" style={{ background: 'rgba(255,253,230,0.22)' }}>
            {/* Available badge */}
            <div
              className="inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em]"
              style={{ background: 'var(--lime-bg)', color: 'var(--lime-dark)', border: '1px solid var(--lime)' }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: 'var(--lime-dark)' }}
              />
              {contact.summary.split(' ').slice(0, 2).join(' ')}
            </div>

            {/* Links */}
            <div className="flex flex-col gap-0" style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '12px' }}>
              <p
                className="text-[9.5px] font-bold uppercase tracking-[0.14em] pb-2"
                style={{ color: 'var(--os-on-dim)' }}
              >
                {language === 'pt' ? 'Redes' : 'Socials'}
              </p>
              {contactLinks.slice(0, 2).map((link) => (
                <div key={link.label} className="group flex items-center justify-between py-2" style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                  <div className="flex items-center gap-2">
                    <link.icon className="w-3.5 h-3.5" style={{ color: 'var(--secondary)' }} />
                    <span className="text-[13px] font-medium" style={{ color: 'var(--os-on-surface)' }}>{link.label}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-black/5 transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" style={{ color: 'var(--secondary)' }} />
                    </a>
                    <CopyButton text={link.value} />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-0" style={{ borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '12px' }}>
              <p
                className="text-[9.5px] font-bold uppercase tracking-[0.14em] pb-2"
                style={{ color: 'var(--os-on-dim)' }}
              >
                {language === 'pt' ? 'Contato Direto' : 'Direct Contact'}
              </p>
              {contactLinks.slice(2).map((link) => (
                <div key={link.label} className="group flex items-center justify-between py-2" style={{ borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                  <div className="flex items-center gap-2">
                    <link.icon className="w-3.5 h-3.5" style={{ color: 'var(--secondary)' }} />
                    <span className="text-[12.5px]" style={{ color: 'var(--os-on-surface)' }}>{link.value}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-black/5 transition-all"
                    >
                      <ExternalLink className="w-3.5 h-3.5" style={{ color: 'var(--secondary)' }} />
                    </a>
                    <CopyButton text={link.value} />
                  </div>
                </div>
              ))}
            </div>

            {/* Tags */}
            <p className="text-[10px] italic mt-1" style={{ color: 'var(--os-on-dim)' }}>
              {language === 'pt'
                ? 'Tags: #DevOps #HPC #CloudEngineering'
                : 'Tags: #DevOps #HPC #CloudEngineering'}
            </p>
          </div>
        </Window>
      </motion.div>
    </div>
  )
}
