import { useEffect, useRef } from "react";
import { Search, Lightbulb, PenTool, Code2, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Diagnóstico",
    description: "Entendemos profundamente seu negócio, objetivos e desafios.",
  },
  {
    icon: Lightbulb,
    number: "02",
    title: "Estratégia",
    description: "Definimos a melhor abordagem técnica e de design para seu projeto.",
  },
  {
    icon: PenTool,
    number: "03",
    title: "Design",
    description: "Criamos interfaces premium que encantam e convertem.",
  },
  {
    icon: Code2,
    number: "04",
    title: "Código",
    description: "Desenvolvemos com as melhores práticas e tecnologias do mercado.",
  },
  {
    icon: Rocket,
    number: "05",
    title: "Lançamento",
    description: "Publicamos e acompanhamos os resultados do seu projeto.",
  },
];

const Process = () => {
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
    <section ref={sectionRef} id="processo" className="section-padding bg-primary text-primary-foreground">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="reveal font-montserrat text-sm uppercase tracking-widest text-primary-foreground/60 mb-4 block">
            Nosso Processo
          </span>
          <h2 className="reveal font-poppins font-black text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
            Do briefing
            <br />
            ao lançamento.
          </h2>
          <p className="reveal font-montserrat text-lg text-primary-foreground/70">
            Uma metodologia clara e eficiente para entregar 
            resultados excepcionais em cada projeto.
          </p>
        </div>
        
        {/* Process Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-primary-foreground/10" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="reveal text-center relative"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Icon Circle */}
                <div className="relative inline-flex mb-6">
                  <div className="w-20 h-20 bg-primary-foreground rounded-full flex items-center justify-center relative z-10">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-primary border-2 border-primary-foreground rounded-full flex items-center justify-center font-poppins font-bold text-xs">
                    {step.number}
                  </span>
                </div>
                
                <h3 className="font-poppins font-bold text-xl mb-3">
                  {step.title}
                </h3>
                <p className="font-montserrat text-sm text-primary-foreground/70 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
