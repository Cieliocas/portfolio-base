"use client"

import { useEffect, useState } from 'react'
import { useReveal } from '@/hooks/use-reveal'
import { useSiteSettings } from '@/hooks/use-site-settings'
import { siteCopy } from '@/lib/site-copy'
import { Brain, ServerCog, Cpu, Database, Monitor, ExternalLink } from 'lucide-react'

const projectIcons = [Brain, ServerCog]
const projectMetaIcons = [Cpu, Database, Monitor]
const projectLinks = ['https://github.com/Cieliocas/mamografia-bi-rads-ia', 'https://github.com/NCAD-UFPI']

type ActiveImage = { src: string; alt: string } | null

export function ProjectsSection() {
  const { ref, visible } = useReveal()
  const { language } = useSiteSettings()
  const t = siteCopy[language].projects
  const [activeImage, setActiveImage] = useState<ActiveImage>(null)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveImage(null)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <>
      <section id="projetos" className="section-wrap">
        <div ref={ref} className={`mx-auto max-w-6xl space-y-8 reveal ${visible ? 'visible' : ''}`}>
          <div className="section-head">
            <p className="section-kicker">{t.kicker}</p>
            <h2 className="section-title">{t.title}</h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {t.meta.map((text, index) => {
              const Icon = projectMetaIcons[index]
              return (
                <div key={text} className="glass-panel flex items-center gap-2.5 p-3.5">
                  <Icon className="h-4 w-4 text-cyber-cyan" />
                  <span className="text-xs uppercase tracking-[0.1em] text-white/80">{text}</span>
                </div>
              )
            })}
          </div>

          <div className="space-y-4">
            {t.items.map((project, index) => {
              const Icon = projectIcons[index]
              const link = projectLinks[index]

              return (
                <article key={project.title} className="glass-panel project-card p-5 sm:p-6" style={{ transitionDelay: `${index * 90}ms` }}>
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

                  {project.images.length ? (
                    <div className="mb-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                      {project.images.map((image) => (
                        <button
                          key={image.src}
                          type="button"
                          onClick={() => setActiveImage({ src: image.src, alt: image.alt })}
                          className="block overflow-hidden rounded-xl border border-cyber-cyan/30 bg-black/30 transition-transform hover:-translate-y-0.5"
                          aria-label={`${t.openImage}: ${image.alt}`}
                        >
                          <img src={image.src} alt={image.alt} className="h-40 w-full object-cover sm:h-48" loading="lazy" />
                        </button>
                      ))}
                    </div>
                  ) : null}

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
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-cyber-cyan transition-colors hover:text-cyber-pink"
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

      {activeImage ? (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-4"
          onClick={() => setActiveImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label={t.dialogLabel}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/20 bg-black/60 shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveImage(null)}
              className="absolute right-3 top-3 z-10 rounded-full border border-white/35 bg-black/65 px-3 py-1 text-xs uppercase tracking-[0.12em] text-white/90"
            >
              {t.close}
            </button>
            <img src={activeImage.src} alt={activeImage.alt} className="max-h-[82vh] w-full object-contain" />
          </div>
        </div>
      ) : null}
    </>
  )
}
