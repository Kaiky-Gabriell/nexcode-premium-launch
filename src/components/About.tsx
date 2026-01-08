import { useEffect, useRef } from "react";

const About = () => {
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
    <section ref={sectionRef} id="sobre" className="section-padding bg-secondary/30">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <span className="reveal font-montserrat text-sm sm:text-sm uppercase tracking-widest text-muted-foreground mb-2 sm:mb-4 block">
            Quem somos
          </span>
          <h2 className="reveal font-poppins font-black text-[2.5rem] leading-[1.05] sm:text-4xl md:text-5xl lg:text-6xl text-foreground sm:leading-tight mb-4 sm:mb-8">
            Engenharia para 
            <br />
            <span className="text-gradient">startups ambiciosas.</span>
          </h2>
          <p className="reveal font-montserrat text-base sm:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-8">
            A Nexcode é um product studio especializado em construir MVPs, SaaS e 
            plataformas digitais. Combinamos estratégia de produto com engenharia 
            de ponta para acelerar seu time-to-market.
          </p>
          <p className="reveal font-montserrat text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 sm:mb-12">
            Não somos para todos. Trabalhamos com founders que pensam grande 
            e querem escalar rápido. Código limpo, arquitetura sólida, resultados mensuráveis.
          </p>
          
          <a href="#contato" className="reveal btn-primary inline-flex w-full sm:w-auto justify-center">
            Falar com especialista
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
