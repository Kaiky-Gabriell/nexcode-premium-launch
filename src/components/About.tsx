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
            Código que 
            <br />
            <span className="text-gradient">gera resultados.</span>
          </h2>
          <p className="reveal font-montserrat text-base sm:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-8">
            A Nexcode é uma agência de tecnologia focada em entregar soluções digitais 
            premium. Combinamos design de alto nível com desenvolvimento de ponta para 
            criar experiências que convertem e impressionam.
          </p>
          <p className="reveal font-montserrat text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 sm:mb-12">
            Nossa abordagem é simples: entendemos seu negócio, projetamos a solução 
            ideal e entregamos com excelência. Sem enrolação, sem surpresas.
          </p>
          
          <a href="#contato" className="reveal btn-primary inline-flex w-full sm:w-auto justify-center">
            Fale com a gente
          </a>
        </div>
      </div>
    </section>
  );
};

export default About;
