import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import GalleryHoverCarousel, { type GalleryHoverCarouselItem } from "@/components/ui/gallery-hover-carousel";

import portfolioCardapio from "@/assets/portfolio-cardapio.png";
import portfolioAcademia from "@/assets/portfolio-academia.png";
import portfolioDashboard from "@/assets/portfolio-dashboard.png";
import portfolioAutomacoes from "@/assets/portfolio-automacoes.png";

const projects = [
  {
    id: "1",
    title: "Pronto Pizza",
    category: "Cardápio Digital",
    summary: "Cardápio digital interativo para pizzaria com navegação intuitiva",
    image: portfolioCardapio,
    url: "https://preview--pronto-pizza.lovable.app/",
  },
  {
    id: "2",
    title: "Elevati Fit",
    category: "Landing Page",
    summary: "Landing page de alta conversão para academia de fitness",
    image: portfolioAcademia,
    url: "https://preview--elevati-fit-showcase.lovable.app/",
  },
  {
    id: "3",
    title: "La Chapa Dash",
    category: "Dashboard",
    summary: "Dashboard completo para gestão de lanchonete",
    image: portfolioDashboard,
    url: "https://preview--lachapa-dash.lovable.app/",
  },
  {
    id: "4",
    title: "String Automações",
    category: "Automação",
    summary: "Sistema de automações e workflows para otimização de processos",
    image: portfolioAutomacoes,
    url: "https://wa.me/message/Z3CKX7WEX2ZCJ1",
  },
];

// Desktop Project Card Component
const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const handleClick = () => {
    if (project.url) {
      window.open(project.url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className={`reveal group h-full ${project.url ? "cursor-pointer" : "cursor-default"}`}
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
        {project.url && (
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
        {project.summary}
      </p>
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

  // Convert projects to carousel format
  const carouselItems: GalleryHoverCarouselItem[] = projects.map((p) => ({
    id: p.id,
    title: p.title,
    summary: p.summary,
    url: p.url,
    image: p.image,
    category: p.category,
  }));

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

      {/* Mobile Carousel - Visible only on mobile */}
      <div className="sm:hidden">
        <GalleryHoverCarousel items={carouselItems} showHeader={false} />
      </div>
    </section>
  );
};

export default Portfolio;
