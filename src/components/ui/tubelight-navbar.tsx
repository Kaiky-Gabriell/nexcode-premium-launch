"use client"

import React, { useEffect, useState, useCallback } from "react"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isMobile, setIsMobile] = useState(false)
  const [isDarkSection, setIsDarkSection] = useState(false)

  const checkDarkSection = useCallback(() => {
    // Get the navbar position (center point)
    // On mobile (bottom navbar), check near the bottom of the screen
    // On desktop (top navbar), check near the top
    const isMobileView = window.innerWidth < 640
    const navbarY = isMobileView 
      ? window.innerHeight - 60 // Bottom position on mobile (navbar is at bottom)
      : 60 // Top position on desktop

    // Get all dark sections (bg-primary sections)
    const darkSections = document.querySelectorAll('#hero, #processo, #contato')
    
    let isOverDark = false
    darkSections.forEach((section) => {
      const rect = section.getBoundingClientRect()
      if (navbarY >= rect.top && navbarY <= rect.bottom) {
        isOverDark = true
      }
    })
    
    setIsDarkSection(isOverDark)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      checkDarkSection()
    }

    const handleScroll = () => {
      checkDarkSection()
    }

    handleResize()
    checkDarkSection()
    
    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [checkDarkSection])

  return (
    <div
      className={cn(
        "fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-300",
        // Mobile: bottom position with safe area
        "bottom-4 sm:bottom-auto",
        // Desktop: top position
        "sm:top-0 sm:pt-6",
        className,
      )}
    >
      <div 
        className={cn(
          "flex items-center border backdrop-blur-lg rounded-full shadow-lg transition-all duration-300",
          // Responsive padding and gaps
          "gap-1 sm:gap-3 py-1.5 px-2 sm:py-1 sm:px-1",
          isDarkSection 
            ? "bg-white/10 border-white/20" 
            : "bg-background/80 sm:bg-background/5 border-border"
        )}
      >
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={(e) => {
                e.preventDefault()
                setActiveTab(item.name)
                const hash = item.url.startsWith("#") ? item.url.slice(1) : ""
                if (!hash) {
                  window.scrollTo({ top: 0, behavior: "smooth" })
                  history.replaceState(null, "", window.location.pathname + window.location.search)
                } else {
                  const el = document.getElementById(hash)
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "start" })
                    history.replaceState(null, "", `#${hash}`)
                  }
                }
              }}
              className={cn(
                "relative cursor-pointer font-semibold rounded-full transition-colors",
                // Responsive text and padding
                "text-xs sm:text-sm px-3 py-2 sm:px-6 sm:py-2",
                isDarkSection
                  ? "text-white/80 hover:text-white"
                  : "text-foreground/80 hover:text-primary",
                isActive && (isDarkSection ? "bg-white/10 text-white" : "bg-muted text-primary"),
              )}
            >
              {/* Show text on desktop, icons on mobile */}
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className={cn(
                    "absolute inset-0 w-full rounded-full -z-10",
                    isDarkSection ? "bg-white/5" : "bg-primary/5"
                  )}
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  {/* Lamp effect - positioned at top on desktop, bottom on mobile */}
                  <div className={cn(
                    "absolute left-1/2 -translate-x-1/2 w-6 sm:w-8 h-1 rounded-full",
                    // Mobile: lamp at bottom (since navbar is at bottom)
                    "-top-2 sm:-top-2",
                    isDarkSection ? "bg-white" : "bg-primary"
                  )}>
                    <div className={cn(
                      "absolute w-8 sm:w-12 h-4 sm:h-6 rounded-full blur-md -top-2 -left-1 sm:-left-2",
                      isDarkSection ? "bg-white/20" : "bg-primary/20"
                    )} />
                    <div className={cn(
                      "absolute w-6 sm:w-8 h-4 sm:h-6 rounded-full blur-md -top-1",
                      isDarkSection ? "bg-white/20" : "bg-primary/20"
                    )} />
                    <div className={cn(
                      "absolute w-3 sm:w-4 h-3 sm:h-4 rounded-full blur-sm top-0 left-1.5 sm:left-2",
                      isDarkSection ? "bg-white/20" : "bg-primary/20"
                    )} />
                  </div>
                </motion.div>
              )}
            </a>
          )
        })}
      </div>
    </div>
  )
}
