import type { Metadata, Viewport } from 'next'
import { Geist, JetBrains_Mono } from 'next/font/google'
import { SiteSettingsProvider } from '@/hooks/use-site-settings'
import './globals.css'

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500', '700'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'Francielio Castro | DevOps, Cloud & HPC',
  description:
    'Portfolio de Francielio Castro com foco em DevOps, Cloud Engineering, HPC e Infraestrutura de IA.',
  icons: {
    icon: [{ url: '/favicon-f.png', type: 'image/png' }],
    shortcut: '/favicon-f.png',
    apple: '/favicon-f.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#f9f9fb',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${geist.variable} ${jetbrainsMono.variable} antialiased`}>
        <SiteSettingsProvider>{children}</SiteSettingsProvider>
      </body>
    </html>
  )
}
