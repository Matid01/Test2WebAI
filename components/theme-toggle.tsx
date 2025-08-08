"use client"

import * as React from "react"
import { Moon, Sun } from 'lucide-react'
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  isDark: boolean
  onToggle: () => void
  className?: string
}

export function ThemeToggle({ isDark, onToggle, className }: ThemeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={cn(
        "relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black",
        isDark ? "bg-purple-600" : "bg-gray-300",
        className
      )}
      role="switch"
      aria-checked={isDark}
      aria-label="Toggle theme"
    >
      {/* Slider track glow effect */}
      <div 
        className={cn(
          "absolute inset-0 rounded-full transition-all duration-300",
          isDark 
            ? "shadow-[0_0_20px_rgba(147,51,234,0.3)] bg-gradient-to-r from-purple-600 to-blue-600" 
            : "shadow-[0_0_20px_rgba(251,191,36,0.3)] bg-gradient-to-r from-yellow-400 to-orange-400"
        )}
      />
      
      {/* Slider button */}
      <div
        className={cn(
          "relative inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-all duration-300 ease-in-out",
          isDark ? "translate-x-7" : "translate-x-1",
          "shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
        )}
      >
        {/* Icon container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Sun 
            className={cn(
              "h-3 w-3 text-yellow-500 transition-all duration-300",
              isDark ? "opacity-0 rotate-180 scale-0" : "opacity-100 rotate-0 scale-100"
            )}
          />
          <Moon 
            className={cn(
              "absolute h-3 w-3 text-purple-600 transition-all duration-300",
              isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-180 scale-0"
            )}
          />
        </div>
      </div>
      
      {/* Background icons */}
      <Sun 
        className={cn(
          "absolute left-1.5 h-3 w-3 text-white/70 transition-all duration-300",
          !isDark ? "opacity-0" : "opacity-100"
        )}
      />
      <Moon 
        className={cn(
          "absolute right-1.5 h-3 w-3 text-white/70 transition-all duration-300",
          isDark ? "opacity-0" : "opacity-100"
        )}
      />
    </button>
  )
}
