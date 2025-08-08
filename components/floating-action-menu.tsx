"use client"

import * as React from "react"
import { GlowButton } from "@/components/ui/glow-button"
import { Plus, Settings, Download, RefreshCw, Filter, BarChart3 } from 'lucide-react'

export function FloatingActionMenu() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Main FAB */}
      <div className="relative">
        {/* Secondary buttons */}
        <div 
          className={cn(
            "absolute bottom-16 right-0 flex flex-col gap-3 transition-all duration-300 ease-out",
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          )}
        >
          <GlowButton variant="accent" size="default" className="rounded-full w-12 h-12 p-0">
            <BarChart3 className="h-5 w-5" />
          </GlowButton>
          <GlowButton variant="secondary" size="default" className="rounded-full w-12 h-12 p-0">
            <Filter className="h-5 w-5" />
          </GlowButton>
          <GlowButton variant="ghost" size="default" className="rounded-full w-12 h-12 p-0">
            <Download className="h-5 w-5" />
          </GlowButton>
          <GlowButton variant="primary" size="default" className="rounded-full w-12 h-12 p-0">
            <RefreshCw className="h-5 w-5" />
          </GlowButton>
        </div>

        {/* Main button */}
        <GlowButton 
          variant="primary" 
          size="lg" 
          glow="intense"
          className="rounded-full w-14 h-14 p-0 shadow-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className={cn(
            "transition-transform duration-300",
            isOpen ? "rotate-45" : "rotate-0"
          )}>
            <Plus className="h-6 w-6" />
          </div>
        </GlowButton>
      </div>
    </div>
  )
}

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}
