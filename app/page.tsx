import { AIMeshBackground } from '@/components/ai-mesh-bg'
import { BackToTop } from '@/components/back-to-top'
import { CyberNav } from '@/components/cyber-nav'
import { TechMarquee } from '@/components/tech-marquee'
import { HeroSection } from '@/components/sections/hero-section'
import { AboutSection } from '@/components/sections/about-section'
import { SkillsSection } from '@/components/sections/skills-section'
import { TechStackSection } from '@/components/sections/tech-stack-section'
import { ProjectsSection } from '@/components/sections/projects-section'
import { ContactSection } from '@/components/sections/contact-section'
import { FooterSection } from '@/components/sections/footer-section'

export default function Home() {
  return (
    <div className="app-shell min-h-screen bg-background text-foreground page-enter">
      <AIMeshBackground />
      <CyberNav />
      <div className="device-shell">
        <span className="circuit-trace circuit-trace-left" aria-hidden />
        <span className="circuit-trace circuit-trace-right" aria-hidden />
        <main className="mobile-main">
          <HeroSection />
          <TechMarquee />
          <div className="scroll-bridge" aria-hidden />
          <AboutSection />
          <div className="scroll-bridge" aria-hidden />
          <SkillsSection />
          <div className="scroll-bridge" aria-hidden />
          <TechStackSection />
          <div className="scroll-bridge" aria-hidden />
          <ProjectsSection />
          <div className="scroll-bridge" aria-hidden />
          <ContactSection />
        </main>
        <FooterSection />
      </div>
      <BackToTop />
    </div>
  )
}
