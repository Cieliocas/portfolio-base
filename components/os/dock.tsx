"use client"

import { Home, Terminal, FolderOpen, Route } from 'lucide-react'
import { useSiteSettings } from '@/hooks/use-site-settings'
import type { AppId } from '@/app/page'

type DockApp = {
  id: AppId
  pt: string
  en: string
  Icon: React.ElementType
}

const APPS: DockApp[] = [
  { id: 'home',     pt: 'Home',     en: 'Home',     Icon: Home },
  { id: 'terminal', pt: 'Terminal', en: 'Terminal',  Icon: Terminal },
  { id: 'projects', pt: 'Projetos', en: 'Projects',  Icon: FolderOpen },
  { id: 'journey',  pt: 'Jornada',  en: 'Journey',   Icon: Route },
]

type Props = {
  activeApp: AppId
  onNavigate: (app: AppId) => void
}

export function Dock({ activeApp, onNavigate }: Props) {
  const { language } = useSiteSettings()

  return (
    <div className="os-dock-wrap">
      <nav className="os-dock" role="navigation" aria-label="Application dock">
        {APPS.map(({ id, pt, en, Icon }) => {
          const label = language === 'pt' ? pt : en
          return (
            <button
              key={id}
              className={`os-dock-btn ${activeApp === id ? 'active' : ''}`}
              onClick={() => onNavigate(id)}
              aria-label={label}
              aria-current={activeApp === id ? 'page' : undefined}
              title={label}
            >
              <Icon className="os-dock-icon" strokeWidth={activeApp === id ? 2.2 : 1.6} />
              <span className="os-dock-label">{label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
