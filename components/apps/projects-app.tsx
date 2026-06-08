"use client"

import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { useSiteSettings } from '@/hooks/use-site-settings'
import { siteCopy } from '@/lib/site-copy'
import { Window } from '@/components/os/window'

type ImgItem = { src: string; alt: string }
type LightboxState = { images: readonly ImgItem[]; index: number } | null

export function ProjectsApp() {
  const { language } = useSiteSettings()
  const t = siteCopy[language].projects
  const items = t.items

  const [selected, setSelected] = useState(0)
  const [lightbox, setLightbox] = useState<LightboxState>(null)

  const project = items[selected]

  const openLightbox = (images: readonly ImgItem[], index: number) => {
    setLightbox({ images, index })
  }

  const closeLightbox = () => setLightbox(null)

  const prevImg = () =>
    setLightbox((lb) => lb ? { ...lb, index: (lb.index - 1 + lb.images.length) % lb.images.length } : lb)

  const nextImg = () =>
    setLightbox((lb) => lb ? { ...lb, index: (lb.index + 1) % lb.images.length } : lb)

  const statusClass = (status: string) => {
    if (status.toLowerCase().includes('ativa') || status.toLowerCase().includes('active')) return 'active-research'
    return 'infra-ativa'
  }

  return (
    <>
      <div className="projects-wrap" style={{ height: 'calc(100dvh - 130px)', maxHeight: '700px' }}>
        <Window
          title={`${language === 'pt' ? 'Projetos' : 'Projects'} — DevOps OS`}
          className="h-full"
          bodyClassName="overflow-hidden"
        >
          <div className="projects-layout h-full">
            {/* ── Sidebar ── */}
            <div className="projects-sidebar">
              <p className="projects-sidebar-head">
                {language === 'pt' ? 'Workspace' : 'Workspace'}
              </p>
              {items.map((item, i) => (
                <button
                  key={item.title}
                  className={`projects-nav-item ${selected === i ? 'active' : ''}`}
                  onClick={() => setSelected(i)}
                >
                  <span className={`projects-nav-dot ${statusClass(item.status)}`} />
                  <span className="projects-nav-name">{item.title}</span>
                </button>
              ))}

              {/* Divider */}
              <div className="mt-3 pt-3" style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                <p className="projects-sidebar-head">Stack</p>
                {project.stack.slice(0, 5).map((s) => (
                  <div key={s} className="px-3 py-1 text-[11.5px]" style={{ color: 'var(--os-on-dim)' }}>
                    {s}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Detail panel ── */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                className="projects-detail"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.18 }}
              >
                {/* Header */}
                <div className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <h2
                        className="text-xl font-bold tracking-tight leading-tight"
                        style={{ color: 'var(--os-on-surface)' }}
                      >
                        {project.title}
                      </h2>
                      <p className="mt-1 text-[13px]" style={{ color: 'var(--secondary)' }}>
                        {project.subtitle}
                      </p>
                    </div>
                    <span className={`project-status-badge ${statusClass(project.status)} flex-shrink-0`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      {project.status}
                    </span>
                  </div>

                  {/* Stack tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tag) => (
                      <span key={tag} className="project-stack-tag">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div>
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.14em] mb-2"
                    style={{ color: 'var(--os-on-dim)' }}
                  >
                    {language === 'pt' ? 'Destaques' : 'Highlights'}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5 text-[13px] leading-relaxed" style={{ color: 'var(--os-on-surface)', opacity: 0.85 }}>
                        <span
                          className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: 'var(--lime-dark)' }}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Images */}
                {project.images && project.images.length > 0 && (
                  <div>
                    <p
                      className="text-[10px] font-bold uppercase tracking-[0.14em] mb-2"
                      style={{ color: 'var(--os-on-dim)' }}
                    >
                      {language === 'pt' ? 'Capturas' : 'Screenshots'}
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {project.images.map((img, i) => (
                        <div key={img.src} className="relative">
                          <Image
                            src={img.src}
                            alt={img.alt}
                            width={280}
                            height={158}
                            className="project-img-thumb"
                            onClick={() => openLightbox(project.images, i)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Footer / link */}
                <div
                  className="flex flex-col gap-2 pt-3"
                  style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
                >
                  <p className="text-[11.5px]" style={{ color: 'var(--os-on-dim)' }}>
                    {project.footer}
                  </p>
                  <a
                    href={
                      selected === 0
                        ? 'https://github.com/cieliocas'
                        : 'https://github.com/ncad-ufpi'
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[12.5px] font-medium transition-opacity hover:opacity-70"
                    style={{ color: 'var(--lime-dark)' }}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    {project.linkLabel}
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Window>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Close */}
            <button
              className="absolute top-4 right-4 p-2 rounded-full"
              style={{ background: 'rgba(0,0,0,0.5)', color: '#fff' }}
              onClick={closeLightbox}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Prev */}
            {lightbox.images.length > 1 && (
              <button
                className="absolute left-4 p-2 rounded-full"
                style={{ background: 'rgba(0,0,0,0.5)', color: '#fff' }}
                onClick={(e) => { e.stopPropagation(); prevImg() }}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            <motion.img
              key={lightbox.index}
              src={lightbox.images[lightbox.index].src}
              alt={lightbox.images[lightbox.index].alt}
              className="lightbox-img"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next */}
            {lightbox.images.length > 1 && (
              <button
                className="absolute right-4 p-2 rounded-full"
                style={{ background: 'rgba(0,0,0,0.5)', color: '#fff' }}
                onClick={(e) => { e.stopPropagation(); nextImg() }}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Dot indicators */}
            {lightbox.images.length > 1 && (
              <div className="absolute bottom-6 flex gap-2">
                {lightbox.images.map((_, i) => (
                  <span
                    key={i}
                    className="w-2 h-2 rounded-full transition-all"
                    style={{ background: i === lightbox.index ? '#fff' : 'rgba(255,255,255,0.4)' }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
