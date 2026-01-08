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
    title: "Discovery",
    description: "Mapeamos seu mercado, usuários e oportunidades de produto.",
  },
  {
    icon: Lightbulb,
    title: "Estratégia",
    description: "Definimos escopo, roadmap e arquitetura para escalar.",
  },
  {
    icon: PenTool,
    title: "Design",
    description: "Criamos interfaces focadas em conversão e experiência.",
  },
  {
    icon: Code2,
    title: "Engenharia",
    description: "Código limpo, testes e deploy contínuo desde o dia um.",
  },
  {
    icon: Rocket,
    title: "Lançamento",
    description: "Go-to-market com monitoramento e iteração rápida.",
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
            Nossa Metodologia
          </span>
          <h2 className="font-poppins font-black text-[2.5rem] leading-[1.05] sm:text-4xl md:text-5xl lg:text-6xl sm:leading-tight mb-3 sm:mb-6">
            Da ideia ao
            <br />
            go-to-market.
          </h2>
          <p className="font-montserrat text-base sm:text-lg text-primary-foreground/70">
            Processo ágil e transparente para entregar 
            seu produto no menor tempo possível.
          </p>
        </div>
        
        {/* Timeline */}
        <Timeline data={timelineData} />
      </div>
    </section>
  );
};

export default Process;
