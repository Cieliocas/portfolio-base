import type { Metadata, Viewport } from 'next'
import { Orbitron, Space_Grotesk } from 'next/font/google'
import './globals.css'

const headingFont = Orbitron({
  subsets: ['latin'],
  variable: '--font-heading',
})

const bodyFont = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-body',
})

export const metadata: Metadata = {
  title: 'Francielio Castro | DevOps, Cloud & HPC',
  description: 'Portfolio de Francielio Castro com foco em DevOps, Cloud Engineering, HPC e Infraestrutura de IA.',
  icons: {
    icon: [{ url: '/favicon-f.png', type: 'image/png' }],
    shortcut: '/favicon-f.png',
    apple: '/favicon-f.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#070b1a',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${headingFont.variable} ${bodyFont.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
