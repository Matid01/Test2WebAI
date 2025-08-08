import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/hooks/use-theme'
import { ProjectsProvider } from '@/hooks/use-projects'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Proyecto Agentes IA - Dashboard',
  description: 'Sistema de gestión y monitoreo de agentes de inteligencia artificial',
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <ProjectsProvider>
            {children}
          </ProjectsProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
