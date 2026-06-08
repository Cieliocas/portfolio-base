"use client"

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menubar }     from '@/components/os/menubar'
import { Dock }        from '@/components/os/dock'
import { HomeApp }     from '@/components/apps/home-app'
import { TerminalApp } from '@/components/apps/terminal-app'
import { ProjectsApp } from '@/components/apps/projects-app'
import { JourneyApp }  from '@/components/apps/journey-app'

export type AppId = 'home' | 'terminal' | 'projects' | 'journey'

const VALID_APPS: AppId[] = ['home', 'terminal', 'projects', 'journey']

export default function Home() {
  const [activeApp, setActiveApp] = useState<AppId>('home')

  // Sync with URL hash on first load
  useEffect(() => {
    const hash = window.location.hash.replace('#', '') as AppId
    if (VALID_APPS.includes(hash)) setActiveApp(hash)
  }, [])

  const navigate = (app: AppId) => {
    setActiveApp(app)
    window.history.pushState(null, '', `#${app}`)
  }

  return (
    <div className="os-shell">
      {/* Background layer */}
      <div className="os-bg-layer" aria-hidden>
        <div className="os-bg-dots" />
        <div className="os-bg-blob os-bg-blob-1" />
        <div className="os-bg-blob os-bg-blob-2" />
        <div className="os-bg-blob os-bg-blob-3" />
      </div>

      {/* Menubar */}
      <Menubar activeApp={activeApp} />

      {/* Desktop canvas */}
      <main className="os-desktop">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeApp}
            className="os-canvas"
            initial={{ opacity: 0, y: 16, scale: 0.975 }}
            animate={{ opacity: 1, y: 0,  scale: 1 }}
            exit={{    opacity: 0, y: 10, scale: 0.975 }}
            transition={{ type: 'spring', stiffness: 360, damping: 34 }}
          >
            {activeApp === 'home'     && <HomeApp     onNavigate={navigate} />}
            {activeApp === 'terminal' && <TerminalApp onNavigate={navigate} />}
            {activeApp === 'projects' && <ProjectsApp />}
            {activeApp === 'journey'  && <JourneyApp />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Dock */}
      <Dock activeApp={activeApp} onNavigate={navigate} />
    </div>
  )
}
