import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowUpRight, ChevronUp, ChevronDown } from "lucide-react";
import { motion, type PanInfo } from "framer-motion";

import portfolioCardapio from "@/assets/portfolio-cardapio.png";
import portfolioAcademia from "@/assets/portfolio-academia.png";
import portfolioDashboard from "@/assets/portfolio-dashboard.png";
import portfolioAutomacoes from "@/assets/portfolio-automacoes.png";

const projects = [
  {
    id: 1,
    title: "Pronto Pizza",
    category: "Cardápio Digital",
    description: "Cardápio digital interativo para pizzaria com navegação intuitiva",
    image: portfolioCardapio,
    link: "https://preview--pronto-pizza.lovable.app/",
  },
  {
    id: 2,
    title: "Elevati Fit",
    category: "Landing Page",
    description: "Landing page de alta conversão para academia de fitness",
    image: portfolioAcademia,
    link: "https://preview--elevati-fit-showcase.lovable.app/",
  },
  {
    id: 3,
    title: "La Chapa Dash",
    category: "Dashboard",
    description: "Dashboard completo para gestão de lanchonete",
    image: portfolioDashboard,
    link: "https://preview--lachapa-dash.lovable.app/",
  },
  {
    id: 4,
    title: "String Automações",
    category: "Automação",
    description: "Sistema de automações e workflows para otimização de processos",
    image: portfolioAutomacoes,
    link: "https://wa.me/message/Z3CKX7WEX2ZCJ1",
  },
];

// Vertical Image Stack Component
const VerticalImageStack = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const lastNavigationTime = useRef(0);
  const navigationCooldown = 400;
  const containerRef = useRef<HTMLDivElement>(null);

  const navigate = useCallback((newDirection: number) => {
    const now = Date.now();
    if (now - lastNavigationTime.current < navigationCooldown) return;
    lastNavigationTime.current = now;

    setCurrentIndex((prev) => {
      if (newDirection > 0) {
        return prev === projects.length - 1 ? 0 : prev + 1;
      }
      return prev === 0 ? projects.length - 1 : prev - 1;
    });
  }, []);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 50;
    if (info.offset.y < -threshold) {
      navigate(1);
    } else if (info.offset.y > threshold) {
      navigate(-1);
    }
  };

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > 30) {
        if (e.deltaY > 0) {
          navigate(1);
        } else {
          navigate(-1);
        }
      }
    },
    [navigate]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const wheelHandler = (e: WheelEvent) => {
      e.preventDefault();
      handleWheel(e);
    };

    container.addEventListener("wheel", wheelHandler, { passive: false });
    return () => container.removeEventListener("wheel", wheelHandler);
  }, [handleWheel]);

  const getCardStyle = (index: number) => {
    const total = projects.length;
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    // Responsive values - smaller on mobile
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    if (diff === 0) {
      return { y: 0, scale: 1, opacity: 1, zIndex: 5, rotateX: 0 };
    } else if (diff === -1) {
      return { y: isMobile ? -90 : -140, scale: 0.85, opacity: 0.7, zIndex: 4, rotateX: 6 };
    } else if (diff === -2) {
      return { y: isMobile ? -150 : -240, scale: 0.72, opacity: 0.4, zIndex: 3, rotateX: 12 };
    } else if (diff === 1) {
      return { y: isMobile ? 90 : 140, scale: 0.85, opacity: 0.7, zIndex: 4, rotateX: -6 };
    } else if (diff === 2) {
      return { y: isMobile ? 150 : 240, scale: 0.72, opacity: 0.4, zIndex: 3, rotateX: -12 };
    } else {
      return { y: diff > 0 ? 350 : -350, scale: 0.6, opacity: 0, zIndex: 0, rotateX: diff > 0 ? -15 : 15 };
    }
  };

  const isVisible = (index: number) => {
    const total = projects.length;
    let diff = index - currentIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return Math.abs(diff) <= 2;
  };

  const handleProjectClick = (link: string | null) => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  const currentProject = projects[currentIndex];

  return (
    <div className="relative flex flex-col items-center">
      {/* Stack Container */}
      <div
        ref={containerRef}
        className="relative flex min-h-[420px] sm:min-h-[500px] md:min-h-[550px] w-full items-center justify-center overflow-hidden"
        style={{ perspective: "1200px" }}
      >
        {/* Ambient glow */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div
            className="h-[250px] w-[250px] sm:h-[350px] sm:w-[350px] rounded-full opacity-20 blur-3xl"
            style={{ background: "hsl(var(--primary) / 0.4)" }}
          />
        </div>

        {/* Card Stack */}
        <div className="relative h-[260px] w-[220px] sm:h-[320px] sm:w-[280px] md:h-[380px] md:w-[340px] lg:h-[420px] lg:w-[380px]">
          {projects.map((project, index) => {
            if (!isVisible(index)) return null;
            const style = getCardStyle(index);
            const isCurrent = index === currentIndex;

            return (
              <motion.div
                key={project.id}
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
                onClick={() => isCurrent && handleProjectClick(project.link)}
              >
                <div className="group relative h-full w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-secondary shadow-2xl ring-1 ring-white/10">
                  {/* Inner glow */}
                  <div
                    className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-40 pointer-events-none z-10"
                    style={{
                      background: "linear-gradient(135deg, hsl(var(--foreground) / 0.08) 0%, transparent 50%)",
                    }}
                  />

                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    draggable={false}
                  />

                  {/* Bottom gradient overlay */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
                    style={{
                      background: "linear-gradient(to top, hsl(var(--background) / 0.95) 0%, hsl(var(--background) / 0.6) 40%, transparent 100%)",
                    }}
                  />

                  {/* Project info */}
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <span className="text-xs sm:text-sm text-primary font-medium uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h4 className="text-base sm:text-xl font-bold text-foreground mt-1">
                      {project.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Link indicator */}
                  {project.link && isCurrent && (
                    <div className="absolute top-4 right-4 w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation dots - Right side */}
        <div className="absolute right-2 sm:right-6 md:right-10 top-1/2 flex -translate-y-1/2 flex-col gap-2 sm:gap-3 z-30">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "h-6 sm:h-8 bg-primary"
                  : "h-2 bg-foreground/30 hover:bg-foreground/50"
              }`}
              aria-label={`Ir para projeto ${index + 1}`}
            />
          ))}
        </div>

        {/* Counter - Left side */}
        <div className="absolute left-2 sm:left-6 md:left-10 top-1/2 -translate-y-1/2 z-30">
          <div className="flex flex-col items-center font-mono">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
              {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <div className="my-2 h-6 sm:h-8 w-px bg-foreground/20" />
            <span className="text-sm sm:text-base text-muted-foreground">
              {String(projects.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* Instruction hint */}
      <div className="mt-4 sm:mt-6">
        <div className="flex items-center gap-2 rounded-full bg-secondary/80 backdrop-blur-sm px-4 py-2 text-xs sm:text-sm text-muted-foreground">
          <ChevronUp className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Scroll ou arraste para navegar</span>
          <span className="sm:hidden">Arraste para navegar</span>
          <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="portfolio" className="section-padding bg-secondary/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 lg:mb-16">
          <span className="reveal font-montserrat text-sm sm:text-sm uppercase tracking-widest text-muted-foreground mb-2 sm:mb-4 block">
            Cases
          </span>
          <h2 className="reveal font-poppins font-black text-[2.5rem] leading-[1.05] sm:text-4xl md:text-5xl lg:text-6xl text-foreground sm:leading-tight mb-3 sm:mb-6">
            Startups que
            <br />
            <span className="text-gradient">já escalaram.</span>
          </h2>
          <p className="reveal font-montserrat text-base sm:text-lg text-muted-foreground">
            Produtos digitais que geraram tração, receita e crescimento real.
          </p>
        </div>

        {/* Vertical Image Stack */}
        <div className="reveal">
          <VerticalImageStack />
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
