"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const glowButtonVariants = cva(
  "relative inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 overflow-hidden group",
  {
    variants: {
      variant: {
        primary: [
          "bg-gradient-to-r from-blue-500 to-purple-600 text-white",
          "hover:from-blue-600 hover:to-purple-700",
          "shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-blue-400 before:to-purple-500 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-20",
          "after:absolute after:inset-0 after:rounded-lg after:shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] after:pointer-events-none"
        ],
        secondary: [
          "bg-gradient-to-r from-slate-700 to-slate-800 text-white border border-slate-600",
          "hover:from-slate-600 hover:to-slate-700 hover:border-slate-500",
          "shadow-lg shadow-slate-900/25 hover:shadow-slate-900/40",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-slate-400 before:to-slate-500 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-10"
        ],
        accent: [
          "bg-gradient-to-r from-emerald-500 to-teal-600 text-white",
          "hover:from-emerald-600 hover:to-teal-700",
          "shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-emerald-400 before:to-teal-500 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-20"
        ],
        ghost: [
          "bg-transparent text-purple-300 border border-purple-500/30",
          "hover:bg-purple-500/10 hover:text-purple-200 hover:border-purple-400/50",
          "shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-purple-400 before:to-pink-500 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-5"
        ],
        danger: [
          "bg-gradient-to-r from-red-500 to-pink-600 text-white",
          "hover:from-red-600 hover:to-pink-700",
          "shadow-lg shadow-red-500/25 hover:shadow-red-500/40",
          "before:absolute before:inset-0 before:bg-gradient-to-r before:from-red-400 before:to-pink-500 before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-20"
        ]
      },
      size: {
        sm: "h-8 px-3 text-xs",
        default: "h-10 px-4 py-2 text-sm",
        lg: "h-12 px-6 text-base",
        xl: "h-14 px-8 text-lg"
      },
      glow: {
        none: "",
        subtle: "hover:drop-shadow-[0_0_8px_rgba(var(--glow-color),0.3)]",
        medium: "hover:drop-shadow-[0_0_12px_rgba(var(--glow-color),0.5)]",
        intense: "hover:drop-shadow-[0_0_20px_rgba(var(--glow-color),0.7)]"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      glow: "medium"
    }
  }
)

export interface GlowButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof glowButtonVariants> {
  asChild?: boolean
}

const GlowButton = React.forwardRef<HTMLButtonElement, GlowButtonProps>(
  ({ className, variant, size, glow, asChild = false, children, ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false)
    
    return (
      <button
        className={cn(glowButtonVariants({ variant, size, glow, className }))}
        ref={ref}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      >
        {/* Animated glow effect */}
        <div 
          className={cn(
            "absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300",
            isHovered && "opacity-100",
            variant === "primary" && "bg-gradient-to-r from-blue-400/20 to-purple-500/20 blur-sm",
            variant === "secondary" && "bg-gradient-to-r from-slate-400/20 to-slate-500/20 blur-sm",
            variant === "accent" && "bg-gradient-to-r from-emerald-400/20 to-teal-500/20 blur-sm",
            variant === "ghost" && "bg-gradient-to-r from-purple-400/10 to-pink-500/10 blur-sm",
            variant === "danger" && "bg-gradient-to-r from-red-400/20 to-pink-500/20 blur-sm"
          )}
        />
        
        {/* Content */}
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
        
        {/* Shine effect */}
        <div 
          className={cn(
            "absolute inset-0 rounded-lg opacity-0 transition-all duration-500 group-hover:opacity-100",
            "bg-gradient-to-r from-transparent via-white/10 to-transparent",
            "translate-x-[-100%] group-hover:translate-x-[100%]"
          )}
        />
      </button>
    )
  }
)
GlowButton.displayName = "GlowButton"

export { GlowButton, glowButtonVariants }
