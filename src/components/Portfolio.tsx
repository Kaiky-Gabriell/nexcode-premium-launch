import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import ReactLenis from "lenis/react";

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

// Desktop Project Card Component
const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const handleClick = () => {
    if (project.link) {
      window.open(project.link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className={`reveal group h-full ${project.link ? "cursor-pointer" : "cursor-default"}`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onClick={handleClick}
    >
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl mb-3 sm:mb-6">
        <img
          src={project.image}
          alt={project.title}
          className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {project.link && (
          <div className="absolute bottom-4 right-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
            <ArrowUpRight className="w-5 h-5 text-primary-foreground" />
          </div>
        )}
      </div>
      
      <span className="font-montserrat text-sm text-muted-foreground uppercase tracking-wider">
        {project.category}
      </span>
      <h3 className="font-poppins font-bold text-xl text-foreground mt-2 mb-2 group-hover:text-muted-foreground transition-colors">
        {project.title}
      </h3>
      <p className="font-montserrat text-muted-foreground text-sm">
        {project.description}
      </p>
    </div>
  );
};

// Mobile Sticky Card Component
const MobileStickyCard = ({
  i,
  project,
  progress,
  range,
  targetScale,
}: {
  i: number;
  project: typeof projects[0];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  targetScale: number;
}) => {
  const container = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  const handleClick = () => {
    if (project.link) {
      window.open(project.link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      ref={container}
      className="h-screen flex items-center justify-center sticky top-0"
    >
      <motion.div
        style={{ scale }}
        className="relative w-[85vw] max-w-[400px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
        onClick={handleClick}
      >
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(to top, hsl(var(--background) / 0.9) 0%, hsl(var(--background) / 0.4) 40%, transparent 100%)",
          }}
        />
        
        {/* Project info */}
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <span className="text-xs text-primary font-medium uppercase tracking-wider">
            {project.category}
          </span>
          <h4 className="text-lg font-bold text-foreground mt-1">
            {project.title}
          </h4>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Link indicator */}
        {project.link && (
          <div className="absolute top-3 right-3 w-9 h-9 bg-primary rounded-full flex items-center justify-center z-10">
            <ArrowUpRight className="w-4 h-4 text-primary-foreground" />
          </div>
        )}
      </motion.div>
    </div>
  );
};

// Mobile Scrolling Animation Component
const MobileScrollingAnimation = () => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <ReactLenis root>
      <div ref={container} className="relative" style={{ height: `${projects.length * 100}vh` }}>
        {projects.map((project, i) => {
          const targetScale = Math.max(0.7, 1 - (projects.length - i - 1) * 0.06);
          return (
            <MobileStickyCard
              key={project.id}
              i={i}
              project={project}
              progress={scrollYProgress}
              range={[i * (1 / projects.length), 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>
    </ReactLenis>
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
    <section ref={sectionRef} id="portfolio" className="bg-secondary/30">
      {/* Header */}
      <div className="section-padding pb-8 sm:pb-12">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <span className="reveal font-montserrat text-sm uppercase tracking-widest text-muted-foreground mb-2 sm:mb-4 block">
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
        </div>
      </div>

      {/* Desktop Grid - Hidden on mobile */}
      <div className="hidden sm:block section-padding pt-0">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Scrolling Animation - Visible only on mobile */}
      <div className="sm:hidden">
        <MobileScrollingAnimation />
      </div>
    </section>
  );
};

export default Portfolio;
