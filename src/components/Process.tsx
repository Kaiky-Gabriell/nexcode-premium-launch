import { Search, Lightbulb, PenTool, Code2, Rocket, LucideIcon } from "lucide-react";
import { Timeline } from "@/components/ui/timeline";

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: Search,
    title: "Diagnóstico",
    description: "Entendemos profundamente seu negócio, objetivos e desafios.",
  },
  {
    icon: Lightbulb,
    title: "Estratégia",
    description: "Definimos a melhor abordagem técnica e de design para seu projeto.",
  },
  {
    icon: PenTool,
    title: "Design",
    description: "Criamos interfaces premium que encantam e convertem.",
  },
  {
    icon: Code2,
    title: "Código",
    description: "Desenvolvemos com as melhores práticas e tecnologias do mercado.",
  },
  {
    icon: Rocket,
    title: "Lançamento",
    description: "Publicamos e acompanhamos os resultados do seu projeto.",
  },
];

const Process = () => {
  const timelineData = steps.map((step) => ({
    title: step.title,
    icon: <step.icon className="w-6 h-6 text-primary" />,
    content: (
      <p className="font-montserrat text-base text-primary-foreground/70 leading-relaxed">
        {step.description}
      </p>
    ),
  }));

  return (
    <section id="processo" className="section-padding bg-primary text-primary-foreground">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16 lg:mb-20">
          <span className="font-montserrat text-sm sm:text-sm uppercase tracking-widest text-primary-foreground/60 mb-2 sm:mb-4 block">
            Nosso Processo
          </span>
          <h2 className="font-poppins font-black text-[2.5rem] leading-[1.05] sm:text-4xl md:text-5xl lg:text-6xl sm:leading-tight mb-3 sm:mb-6">
            Do briefing
            <br />
            ao lançamento.
          </h2>
          <p className="font-montserrat text-base sm:text-lg text-primary-foreground/70">
            Uma metodologia clara e eficiente para entregar 
            resultados excepcionais em cada projeto.
          </p>
        </div>
        
        {/* Timeline */}
        <Timeline data={timelineData} />
      </div>
    </section>
  );
};

export default Process;
