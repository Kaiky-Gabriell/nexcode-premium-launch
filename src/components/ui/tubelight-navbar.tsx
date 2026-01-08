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
    const navbarY = window.innerWidth < 640 
      ? window.innerHeight - 50 // Bottom position on mobile
      : 50 // Top position on desktop

    // Get all dark sections (bg-primary sections)
    const darkSections = document.querySelectorAll('#processo, #contato')
    
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
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6 transition-all duration-300",
        className,
      )}
    >
      <div 
        className={cn(
          "flex items-center gap-3 border backdrop-blur-lg py-1 px-1 rounded-full shadow-lg transition-all duration-300",
          isDarkSection 
            ? "bg-white/10 border-white/20" 
            : "bg-background/5 border-border"
        )}
      >
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                isDarkSection
                  ? "text-white/80 hover:text-white"
                  : "text-foreground/80 hover:text-primary",
                isActive && (isDarkSection ? "bg-white/10 text-white" : "bg-muted text-primary"),
              )}
            >
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
                  <div className={cn(
                    "absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-t-full",
                    isDarkSection ? "bg-white" : "bg-primary"
                  )}>
                    <div className={cn(
                      "absolute w-12 h-6 rounded-full blur-md -top-2 -left-2",
                      isDarkSection ? "bg-white/20" : "bg-primary/20"
                    )} />
                    <div className={cn(
                      "absolute w-8 h-6 rounded-full blur-md -top-1",
                      isDarkSection ? "bg-white/20" : "bg-primary/20"
                    )} />
                    <div className={cn(
                      "absolute w-4 h-4 rounded-full blur-sm top-0 left-2",
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
