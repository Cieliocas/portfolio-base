"use client"

import { useEffect, useState, useRef } from 'react'
import { Terminal as TermIcon, FolderOpen } from 'lucide-react'
import { useSiteSettings } from '@/hooks/use-site-settings'
import { siteCopy } from '@/lib/site-copy'
import { Window } from '@/components/os/window'
import type { AppId } from '@/app/page'

type LineType = 'prompt' | 'empty' | 'dim' | 'success' | 'quote' | 'body' | 'key-val' | 'tag-row' | 'dir-entry'

type Line = {
  type: LineType
  text?: string
  promptDir?: string
  promptCmd?: string
  tags?: string[]
  entries?: string[]
  delay: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function buildLines(about: any, skills: any, lang: 'pt' | 'en'): Line[] {
  return [
    { type: 'dim',    text: lang === 'pt' ? '>>> BEM-VINDO AO CIELIO OS v1.0.4 — KERNEL: ESTÁVEL' : '>>> WELCOME TO CIELIO OS v1.0.4 - KERNEL: STABLE', delay: 0 },
    { type: 'empty', delay: 80 },
    { type: 'prompt', promptDir: '~', promptCmd: 'cd /welcome', delay: 120 },
    { type: 'empty', delay: 80 },
    { type: 'prompt', promptDir: '/welcome', promptCmd: 'cat readme.md', delay: 160 },
    { type: 'empty', delay: 60 },
    { type: 'quote', text: lang === 'pt' ? '"Construindo o futuro através da lógica automatizada."' : '"Architecting the future through automated logic."', delay: 320 },
    { type: 'empty', delay: 60 },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ...about.notes.map((n: any, i: number) => ({ type: 'body' as LineType, text: n, delay: 220 + i * 60 })),
    { type: 'empty', delay: 100 },
    { type: 'prompt', promptDir: '/welcome', promptCmd: 'cat skills.json', delay: 180 },
    { type: 'empty', delay: 60 },
    { type: 'key-val', text: `"${lang === 'pt' ? 'infraestrutura' : 'infrastructure'}":`, delay: 120 },
    { type: 'tag-row', tags: Array.from(skills.groups[0].items as string[]), delay: 80 },
    { type: 'key-val', text: '"cloud_devops":', delay: 80 },
    { type: 'tag-row', tags: Array.from(skills.groups[1].items as string[]), delay: 80 },
    { type: 'key-val', text: `"${lang === 'pt' ? 'programacao' : 'code'}":`, delay: 80 },
    { type: 'tag-row', tags: Array.from(skills.groups[2].items as string[]), delay: 80 },
    { type: 'empty', delay: 100 },
    { type: 'prompt', promptDir: '/welcome', promptCmd: 'ls projects/', delay: 160 },
    { type: 'empty', delay: 60 },
    { type: 'dir-entry', entries: ['mamografia-birads-ai/', 'techne-cluster-hpc/'], delay: 120 },
    { type: 'empty', delay: 100 },
    { type: 'prompt', promptDir: '/welcome', promptCmd: '', delay: 0 },
  ]
}

type Props = { onNavigate: (app: AppId) => void }

export function TerminalApp({ onNavigate }: Props) {
  const { language } = useSiteSettings()
  const t        = siteCopy[language]
  const lines    = buildLines(t.about, t.skills, language)
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const [visible, setVisible] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Progressive reveal
  useEffect(() => {
    setVisible(0)
    let i = 0
    const next = () => {
      if (i >= lines.length) return
      const delay = lines[i].delay
      setTimeout(() => {
        setVisible((v) => v + 1)
        i++
        next()
      }, delay)
    }
    const init = setTimeout(next, 400)
    return () => clearTimeout(init)
  }, [language])  // re-run when language changes

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [visible])

  const renderedLines = lines.slice(0, visible)
  const isLast = (i: number) => i === renderedLines.length - 1

  return (
    <div className="term-wrap">
      <Window
        title={`cieliocas — zsh — 80×24`}
        titleIcon={<TermIcon className="w-3 h-3" />}
        rightSlot={
          <button
            onClick={() => onNavigate('projects')}
            className="flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-medium transition-all hover:bg-black/6"
            style={{ color: 'var(--os-on-dim)' }}
            title="Open Projects"
          >
            <FolderOpen className="w-3 h-3" />
            <span className="hidden sm:inline">{language === 'pt' ? 'Projetos' : 'Projects'}</span>
          </button>
        }
      >
        <div ref={scrollRef} className="term-body" style={{ maxHeight: 'calc(100dvh - 170px)', overflowY: 'auto' }}>
          {renderedLines.map((line, i) => {
            switch (line.type) {
              case 'empty':
                return <div key={i} className="h-2" />

              case 'dim':
                return (
                  <div key={i} className="term-line term-line-dim mb-2">
                    {line.text}
                  </div>
                )

              case 'prompt':
                return (
                  <div key={i} className="prompt-row mt-1">
                    <span className="ps-user">
                      <span>👤</span> cieliocas
                    </span>
                    <span className="ps-dir">
                      <span>📁</span> {line.promptDir}
                    </span>
                    <span className="ps-branch">⚡ 2ms</span>
                    <span className="ps-cmd">
                      {line.promptCmd}
                      {isLast(i) && <span className="term-cursor" />}
                    </span>
                  </div>
                )

              case 'quote':
                return (
                  <div key={i} className="term-line term-line-quote">
                    {line.text}
                  </div>
                )

              case 'success':
                return (
                  <div key={i} className="term-line term-line-success">
                    {line.text}
                  </div>
                )

              case 'body':
                return (
                  <div key={i} className="term-line" style={{ paddingLeft: '4px', color: 'var(--os-on-surface)', opacity: 0.82 }}>
                    {line.text}
                  </div>
                )

              case 'key-val':
                return (
                  <div key={i} className="term-line term-line-key" style={{ paddingLeft: '4px' }}>
                    {line.text}
                  </div>
                )

              case 'tag-row':
                return (
                  <div key={i} className="flex flex-wrap gap-0 pl-4 mb-1 mt-0.5">
                    {line.tags?.map((tag) => (
                      <span key={tag} className="term-tag">{tag}</span>
                    ))}
                  </div>
                )

              case 'dir-entry':
                return (
                  <div key={i} className="flex flex-wrap gap-6 pl-4 term-line" style={{ color: 'var(--lime-dark)', fontWeight: 600 }}>
                    {line.entries?.map((e) => (
                      <span key={e}>{e}</span>
                    ))}
                  </div>
                )

              default:
                return null
            }
          })}
        </div>
      </Window>
    </div>
  )
}
