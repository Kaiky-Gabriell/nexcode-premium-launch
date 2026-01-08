import { useEffect, useRef } from "react";
import { Globe, Layout, Settings, Cpu } from "lucide-react";
import { InteractiveImageAccordion } from "@/components/ui/interactive-image-accordion";

const services = [
  {
    icon: Layout,
    title: "Landing Pages",
    description: "Páginas de alta conversão para validar ideias, captar leads e lançar produtos com velocidade.",
    features: ["Alta conversão", "Otimização SEO", "Testes A/B"],
    imageUrl: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop",
  },
  {
    icon: Globe,
    title: "MVPs & SaaS",
    description: "Produtos digitais escaláveis, do conceito ao lançamento. Arquitetura sólida para crescer.",
    features: ["Arquitetura escalável", "Deploy contínuo", "Product-market fit"],
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
  },
  {
    icon: Settings,
    title: "Plataformas Web",
    description: "Aplicações robustas com dashboards, APIs e integrações para operações complexas.",
    features: ["Dashboard em tempo real", "APIs RESTful", "Multi-tenant"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
  },
  {
    icon: Cpu,
    title: "Automações",
    description: "Workflows inteligentes que eliminam trabalho manual e aceleram processos.",
    features: ["Integração de APIs", "Webhooks", "Economia de tempo"],
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
            O que construímos
          </span>
          <h2 className="reveal font-poppins font-black text-[2.5rem] leading-[1.05] sm:text-4xl md:text-5xl lg:text-6xl text-foreground sm:leading-tight mb-3 sm:mb-6">
            Produtos digitais
            <br />
            <span className="text-gradient">que geram tração.</span>
          </h2>
          <p className="reveal font-montserrat text-base sm:text-lg text-muted-foreground">
            Da validação ao scale-up, entregamos a tecnologia que sua 
            startup precisa para conquistar mercado.
          </p>
        </div>
        
        {/* Interactive Image Accordion - All screens */}
        <div className="reveal">
          <InteractiveImageAccordion items={accordionItems} defaultActiveIndex={0} />
        </div>
      </div>
    </section>
  );
};

export default Services;
