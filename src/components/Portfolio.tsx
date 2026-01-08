import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import portfolioCardapio from "@/assets/portfolio-cardapio.png";
import portfolioAcademia from "@/assets/portfolio-academia.png";
import portfolioAutomacoes from "@/assets/portfolio-automacoes.png";

const projects = [
  {
    title: "Pronto Pizza",
    category: "Cardápio Digital",
    description: "Cardápio digital interativo para pizzaria com navegação intuitiva",
    image: portfolioCardapio,
    link: "https://preview--pronto-pizza.lovable.app/",
  },
  {
    title: "Elevati Fit",
    category: "Landing Page",
    description: "Landing page de alta conversão para academia de fitness",
    image: portfolioAcademia,
    link: "https://preview--elevati-fit-showcase.lovable.app/",
  },
  {
    title: "La Chapa Dash",
    category: "Dashboard",
    description: "Dashboard completo para gestão de lanchonete",
    image: portfolioCardapio,
    link: "https://preview--lachapa-dash.lovable.app/",
  },
  {
    title: "String Automações",
    category: "Automação",
    description: "Sistema de automações e workflows para otimização de processos",
    image: portfolioAutomacoes,
    link: null,
  },
];

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
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {project.link && (
          <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-500 transform sm:translate-y-4 group-hover:translate-y-0">
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
          </div>
        )}
      </div>
      
      <span className="font-montserrat text-xs sm:text-sm text-muted-foreground uppercase tracking-wider">
        {project.category}
      </span>
      <h3 className="font-poppins font-bold text-lg sm:text-xl text-foreground mt-1.5 sm:mt-2 mb-1.5 sm:mb-2 group-hover:text-muted-foreground transition-colors">
        {project.title}
      </h3>
      <p className="font-montserrat text-muted-foreground text-sm">
        {project.description}
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

  return (
    <section ref={sectionRef} id="portfolio" className="section-padding bg-secondary/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16 lg:mb-20">
          <span className="reveal font-montserrat text-sm sm:text-sm uppercase tracking-widest text-muted-foreground mb-2 sm:mb-4 block">
            Cases
          </span>
          <h2 className="reveal font-poppins font-black text-[2.5rem] leading-[1.05] sm:text-4xl md:text-5xl lg:text-6xl text-foreground sm:leading-tight mb-3 sm:mb-6">
            Startups que
            <br />
            <span className="text-gradient">já escalaram.</span>
          </h2>
          <p className="reveal font-montserrat text-base sm:text-lg text-muted-foreground">
            Produtos digitais que geraram tração, 
            receita e crescimento real.
          </p>
        </div>
        
        {/* Projects Carousel - Mobile */}
        <div className="block sm:hidden">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2">
              {projects.map((project, index) => (
                <CarouselItem key={project.title} className="pl-2 basis-[85%]">
                  <ProjectCard project={project} index={index} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Projects Grid - Desktop */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
