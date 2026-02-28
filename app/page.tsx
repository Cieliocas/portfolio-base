import { CyberNav } from '@/components/cyber-nav'
import { TechMarquee } from '@/components/tech-marquee'
import { HeroSection } from '@/components/sections/hero-section'
import { AboutSection } from '@/components/sections/about-section'
import { SkillsSection } from '@/components/sections/skills-section'
import { TechStackSection } from '@/components/sections/tech-stack-section'
import { ContactSection } from '@/components/sections/contact-section'
import { FooterSection } from '@/components/sections/footer-section'

export default function Home() {
  return (
    <div className="app-shell min-h-screen bg-background text-foreground">
      <CyberNav />
      <main>
        <HeroSection />
        <TechMarquee />
        <AboutSection />
        <SkillsSection />
        <TechStackSection />
        <ContactSection />
      </main>
      <FooterSection />
    </div>
  )
}
