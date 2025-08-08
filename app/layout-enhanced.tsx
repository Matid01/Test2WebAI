import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { ThemeProvider } from "@/hooks/use-theme"
import { ProjectsProvider } from "@/hooks/use-projects"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Project Dashboard - Enhanced",
  description: "Futuristic AI project management dashboard with CRUD operations",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
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
