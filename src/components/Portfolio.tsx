import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const projects = [
  {
    title: "TechFlow SaaS",
    category: "Plataforma SaaS",
    description: "Dashboard de gestão de projetos com analytics em tempo real",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
  },
  {
    title: "Luxe Commerce",
    category: "MVP",
    description: "Marketplace de moda com checkout otimizado para conversão",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
  },
  {
    title: "FinanceHub",
    category: "Landing Page",
    description: "Página de captação para fintech com 12% de conversão",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
  },
  {
    title: "Studio Arch",
    category: "Website",
    description: "Presença digital premium para escritório de arquitetura",
    image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=600&fit=crop",
  },
  {
    title: "AutoTask AI",
    category: "Automação",
    description: "Sistema de workflows com IA que economiza 40h/mês",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
  },
  {
    title: "GreenLife",
    category: "Plataforma",
    description: "Marketplace B2B sustentável com gestão de fornecedores",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop",
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => (
  <div
    className="reveal group cursor-pointer h-full"
    style={{ transitionDelay: `${index * 100}ms` }}
  >
    <div className="relative overflow-hidden rounded-xl sm:rounded-2xl mb-3 sm:mb-6">
      <img
        src={project.image}
        alt={project.title}
        className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all duration-500 transform sm:translate-y-4 group-hover:translate-y-0">
        <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
      </div>
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
