import { useEffect, useRef } from "react";
import { Globe, ShoppingCart, Layout, Settings, Cpu, ArrowUpRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { InteractiveImageAccordion } from "@/components/ui/interactive-image-accordion";

const services = [
  {
    icon: Layout,
    title: "Landing Pages",
    description: "Páginas de alta conversão com design premium e copy persuasiva. Perfeitas para campanhas e lançamentos.",
    features: ["Design responsivo", "Otimização SEO", "Alta conversão"],
    imageUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
  },
  {
    icon: Globe,
    title: "Sites Institucionais",
    description: "Presença digital profissional que transmite credibilidade e posiciona sua marca no mercado.",
    features: ["Design exclusivo", "CMS integrado", "Performance otimizada"],
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Lojas virtuais completas, seguras e prontas para escalar suas vendas online.",
    features: ["Checkout otimizado", "Gestão de estoque", "Integrações de pagamento"],
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
  },
  {
    icon: Settings,
    title: "Sistemas Web",
    description: "Aplicações sob medida para automatizar processos e aumentar a eficiência do seu negócio.",
    features: ["Dashboard personalizado", "API integrada", "Escalável"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
  },
  {
    icon: Cpu,
    title: "Automações",
    description: "Integrações inteligentes que conectam suas ferramentas e eliminam tarefas manuais.",
    features: ["Integração de APIs", "Workflows automatizados", "Relatórios em tempo real"],
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
  },
];

const accordionItems = services.map((service, index) => ({
  id: index + 1,
  title: service.title,
  description: service.description,
  imageUrl: service.imageUrl,
  icon: service.icon,
  features: service.features,
}));

const Services = () => {
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
    <section ref={sectionRef} id="servicos" className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16 lg:mb-20">
          <span className="reveal font-montserrat text-sm sm:text-sm uppercase tracking-widest text-muted-foreground mb-2 sm:mb-4 block">
            Nossos Serviços
          </span>
          <h2 className="reveal font-poppins font-black text-[2.5rem] leading-[1.05] sm:text-4xl md:text-5xl lg:text-6xl text-foreground sm:leading-tight mb-3 sm:mb-6">
            Soluções completas
            <br />
            <span className="text-gradient">para seu negócio.</span>
          </h2>
          <p className="reveal font-montserrat text-base sm:text-lg text-muted-foreground">
            Do conceito ao código, entregamos tudo que você precisa para 
            ter uma presença digital de alto impacto.
          </p>
        </div>
        
        {/* Services Carousel - Mobile */}
        <div className="block lg:hidden">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2">
              {services.map((service, index) => (
                <CarouselItem key={service.title} className="pl-2 basis-[85%] sm:basis-[45%]">
                  <div
                    className="reveal glass-card-hover p-5 group cursor-pointer h-full"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                        <service.icon className="w-6 h-6 text-foreground group-hover:text-primary-foreground transition-colors duration-300" />
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-100 transition-all duration-300" />
                    </div>
                    
                    <h3 className="font-poppins font-bold text-xl text-foreground mb-2">
                      {service.title}
                    </h3>
                    
                    <p className="font-montserrat text-base text-muted-foreground mb-3 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {service.features.map((feature) => (
                        <span
                          key={feature}
                          className="font-montserrat text-xs px-2.5 py-1 bg-secondary rounded-full text-muted-foreground"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Interactive Image Accordion - Desktop */}
        <div className="hidden lg:block reveal">
          <InteractiveImageAccordion items={accordionItems} defaultActiveIndex={2} />
        </div>
      </div>
    </section>
  );
};

export default Services;
