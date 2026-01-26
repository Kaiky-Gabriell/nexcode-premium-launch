import { useEffect, useRef, useState, useCallback } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

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

const Portfolio = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: "start",
    dragFree: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

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

  const handleClick = (link: string) => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section ref={sectionRef} id="portfolio" className="section-padding bg-secondary/30">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
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

        {/* Carousel */}
        <div className="reveal relative">
          <div ref={emblaRef} className="overflow-hidden rounded-2xl">
            <div className="flex">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_32%] min-w-0 pl-4 first:pl-0"
                >
                  <div
                    className="group cursor-pointer"
                    onClick={() => handleClick(project.link)}
                  >
                    <div className="relative overflow-hidden rounded-xl sm:rounded-2xl mb-3 sm:mb-4">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        draggable={false}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {project.link && (
                        <div className="absolute top-3 right-3 w-10 h-10 bg-primary rounded-full flex items-center justify-center opacity-80 group-hover:opacity-100 transition-all duration-300">
                          <ArrowUpRight className="w-4 h-4 text-primary-foreground" />
                        </div>
                      )}
                    </div>
                    
                    <span className="font-montserrat text-xs sm:text-sm text-primary uppercase tracking-wider font-medium">
                      {project.category}
                    </span>
                    <h3 className="font-poppins font-bold text-lg sm:text-xl text-foreground mt-1 mb-1 group-hover:text-muted-foreground transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-montserrat text-muted-foreground text-xs sm:text-sm line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows - Desktop only */}
          <button
            onClick={scrollPrev}
            className="hidden sm:flex absolute -left-4 lg:-left-6 top-1/3 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-background border border-border rounded-full items-center justify-center shadow-lg hover:bg-secondary transition-colors z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button
            onClick={scrollNext}
            className="hidden sm:flex absolute -right-4 lg:-right-6 top-1/3 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 bg-background border border-border rounded-full items-center justify-center shadow-lg hover:bg-secondary transition-colors z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center gap-4 mt-6 sm:mt-8">
          <button
            onClick={scrollPrev}
            className="w-9 h-9 sm:w-10 sm:h-10 bg-background border border-border rounded-full flex items-center justify-center shadow-sm hover:bg-secondary transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
          </button>
          
          {/* Dots */}
          <div className="flex gap-2">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "w-6 bg-primary"
                    : "bg-foreground/20 hover:bg-foreground/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={scrollNext}
            className="w-9 h-9 sm:w-10 sm:h-10 bg-background border border-border rounded-full flex items-center justify-center shadow-sm hover:bg-secondary transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
