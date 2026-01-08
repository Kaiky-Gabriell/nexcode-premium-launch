import { useEffect, useRef } from "react";
import { Globe, ShoppingCart, Layout, Settings, Cpu, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: Layout,
    title: "Landing Pages",
    description: "Páginas de alta conversão com design premium e copy persuasiva. Perfeitas para campanhas e lançamentos.",
    features: ["Design responsivo", "Otimização SEO", "Alta conversão"],
  },
  {
    icon: Globe,
    title: "Sites Institucionais",
    description: "Presença digital profissional que transmite credibilidade e posiciona sua marca no mercado.",
    features: ["Design exclusivo", "CMS integrado", "Performance otimizada"],
  },
  {
    icon: ShoppingCart,
    title: "E-commerce",
    description: "Lojas virtuais completas, seguras e prontas para escalar suas vendas online.",
    features: ["Checkout otimizado", "Gestão de estoque", "Integrações de pagamento"],
  },
  {
    icon: Settings,
    title: "Sistemas Web",
    description: "Aplicações sob medida para automatizar processos e aumentar a eficiência do seu negócio.",
    features: ["Dashboard personalizado", "API integrada", "Escalável"],
  },
  {
    icon: Cpu,
    title: "Automações",
    description: "Integrações inteligentes que conectam suas ferramentas e eliminam tarefas manuais.",
    features: ["Integração de APIs", "Workflows automatizados", "Relatórios em tempo real"],
  },
];

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
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="reveal font-montserrat text-sm uppercase tracking-widest text-muted-foreground mb-4 block">
            Nossos Serviços
          </span>
          <h2 className="reveal font-poppins font-black text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
            Soluções completas
            <br />
            <span className="text-gradient">para seu negócio.</span>
          </h2>
          <p className="reveal font-montserrat text-lg text-muted-foreground">
            Do conceito ao código, entregamos tudo que você precisa para 
            ter uma presença digital de alto impacto.
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="reveal glass-card-hover p-8 group cursor-pointer"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                  <service.icon className="w-8 h-8 text-foreground group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <ArrowUpRight className="w-6 h-6 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-1 group-hover:translate-x-1" />
              </div>
              
              <h3 className="font-poppins font-bold text-2xl text-foreground mb-4">
                {service.title}
              </h3>
              
              <p className="font-montserrat text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {service.features.map((feature) => (
                  <span
                    key={feature}
                    className="font-montserrat text-xs px-3 py-1 bg-secondary rounded-full text-muted-foreground"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
