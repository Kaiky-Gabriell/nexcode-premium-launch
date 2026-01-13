"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { motion, type PanInfo } from "framer-motion"

interface ImageItem {
  id: number
  src: string
  alt: string
  title?: string
  category?: string
}

interface VerticalImageStackProps {
  images: ImageItem[]
  className?: string
}

export function VerticalImageStack({ images, className = "" }: VerticalImageStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const lastNavigationTime = useRef(0)
  const navigationCooldown = 400
  const containerRef = useRef<HTMLDivElement>(null)

  const navigate = useCallback((newDirection: number) => {
    const now = Date.now()
    if (now - lastNavigationTime.current < navigationCooldown) return
    lastNavigationTime.current = now

    setCurrentIndex((prev) => {
      if (newDirection > 0) {
        return prev === images.length - 1 ? 0 : prev + 1
      }
      return prev === 0 ? images.length - 1 : prev - 1
    })
  }, [images.length])

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50
    if (info.offset.y < -threshold) {
      navigate(1)
    } else if (info.offset.y > threshold) {
      navigate(-1)
    }
  }

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 30) {
        if (e.deltaY > 0) {
          navigate(1)
        } else {
          navigate(-1)
        }
      }
    },
    [navigate],
  )

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const wheelHandler = (e: WheelEvent) => {
      e.preventDefault()
      handleWheel(e)
    }

    container.addEventListener("wheel", wheelHandler, { passive: false })
    return () => container.removeEventListener("wheel", wheelHandler)
  }, [handleWheel])

  const getCardStyle = (index: number) => {
    const total = images.length
    let diff = index - currentIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total

    // Responsive values - smaller on mobile
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

    if (diff === 0) {
      return { y: 0, scale: 1, opacity: 1, zIndex: 5, rotateX: 0 }
    } else if (diff === -1) {
      return { y: isMobile ? -100 : -160, scale: 0.82, opacity: 0.6, zIndex: 4, rotateX: 8 }
    } else if (diff === -2) {
      return { y: isMobile ? -170 : -280, scale: 0.7, opacity: 0.3, zIndex: 3, rotateX: 15 }
    } else if (diff === 1) {
      return { y: isMobile ? 100 : 160, scale: 0.82, opacity: 0.6, zIndex: 4, rotateX: -8 }
    } else if (diff === 2) {
      return { y: isMobile ? 170 : 280, scale: 0.7, opacity: 0.3, zIndex: 3, rotateX: -15 }
    } else {
      return { y: diff > 0 ? 400 : -400, scale: 0.6, opacity: 0, zIndex: 0, rotateX: diff > 0 ? -20 : 20 }
    }
  }

  const isVisible = (index: number) => {
    const total = images.length
    let diff = index - currentIndex
    if (diff > total / 2) diff -= total
    if (diff < -total / 2) diff += total
    return Math.abs(diff) <= 2
  }

  return (
    <div 
      ref={containerRef}
      className={`relative flex min-h-[500px] sm:min-h-[600px] md:min-h-[700px] w-full items-center justify-center overflow-hidden ${className}`}
      style={{ perspective: "1200px" }}
    >
      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div 
          className="h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] rounded-full opacity-20 blur-3xl"
          style={{ background: "hsl(var(--primary) / 0.3)" }}
        />
      </div>

      {/* Card Stack */}
      <div className="relative h-[280px] w-[240px] sm:h-[350px] sm:w-[300px] md:h-[400px] md:w-[350px]">
        {images.map((image, index) => {
          if (!isVisible(index)) return null
          const style = getCardStyle(index)
          const isCurrent = index === currentIndex

          return (
            <motion.div
              key={image.id}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
              animate={{
                y: style.y,
                scale: style.scale,
                opacity: style.opacity,
                rotateX: style.rotateX,
                zIndex: style.zIndex,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
                mass: 1,
              }}
              drag={isCurrent ? "y" : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.1}
              onDragEnd={isCurrent ? handleDragEnd : undefined}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-secondary shadow-2xl">
                {/* Card inner glow */}
                <div 
                  className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-50 pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--foreground) / 0.1) 0%, transparent 50%)",
                  }}
                />

                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover"
                  draggable={false}
                />

                {/* Bottom gradient overlay with title */}
                <div 
                  className="absolute inset-x-0 bottom-0 h-1/2 pointer-events-none"
                  style={{
                    background: "linear-gradient(to top, hsl(var(--background)) 0%, transparent 100%)",
                  }}
                />
                
                {/* Title overlay */}
                {image.title && (
                  <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                    <span className="text-xs sm:text-sm text-primary font-medium">{image.category}</span>
                    <h4 className="text-sm sm:text-lg font-semibold text-foreground mt-1">{image.title}</h4>
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Navigation dots */}
      <div className="absolute right-4 sm:right-8 top-1/2 flex -translate-y-1/2 flex-col gap-2 sm:gap-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (index !== currentIndex) {
                setCurrentIndex(index)
              }
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? "w-2 h-6 bg-primary" 
                : "bg-foreground/30 hover:bg-foreground/50"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Instruction hint */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-2 rounded-full bg-secondary/80 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-muted-foreground">
          <span className="flex flex-col items-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 15l-6-6-6 6"/>
            </svg>
          </span>
          <span className="hidden sm:inline">Scroll ou arraste</span>
          <span className="sm:hidden">Arraste</span>
          <span className="flex flex-col items-center">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </span>
        </div>
      </div>

      {/* Counter */}
      <div className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center text-sm sm:text-base font-mono">
          <span className="text-lg sm:text-2xl font-bold text-foreground">
            {String(currentIndex + 1).padStart(2, "0")}
          </span>
          <div className="my-1 sm:my-2 h-6 sm:h-8 w-px bg-foreground/20" />
          <span className="text-muted-foreground">
            {String(images.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  )
}
