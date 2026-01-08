import { useEffect, useRef } from "react";
import { Zap, Target, Award } from "lucide-react";

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
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-24 items-center">
          {/* Left content */}
          <div>
            <span className="reveal font-montserrat text-xs sm:text-sm uppercase tracking-widest text-muted-foreground mb-2 sm:mb-4 block">
              Quem somos
            </span>
            <h2 className="reveal font-poppins font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-4 sm:mb-8">
              Código que 
              <br />
              <span className="text-gradient">gera resultados.</span>
            </h2>
            <p className="reveal font-montserrat text-sm sm:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-8">
              A Nexcode é uma agência de tecnologia focada em entregar soluções digitais
              premium. Combinamos design de alto nível com desenvolvimento de ponta para 
              criar experiências que convertem e impressionam.
            </p>
            <p className="reveal font-montserrat text-sm sm:text-lg text-muted-foreground leading-relaxed mb-6 sm:mb-12">
              Nossa abordagem é simples: entendemos seu negócio, projetamos a solução 
              ideal e entregamos com excelência. Sem enrolação, sem surpresas.
            </p>
            
            <a href="#contato" className="reveal btn-primary inline-flex w-full sm:w-auto justify-center">
              Fale com a gente
            </a>
          </div>
          
          {/* Right content - Values */}
          <div className="space-y-3 sm:space-y-6">
            <div className="reveal glass-card-hover p-5 sm:p-8">
              <div className="w-10 h-10 sm:w-14 sm:h-14 bg-primary rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-6">
                <Zap className="w-5 h-5 sm:w-7 sm:h-7 text-primary-foreground" />
              </div>
              <h3 className="font-poppins font-bold text-base sm:text-xl text-foreground mb-1.5 sm:mb-3">
                Velocidade & Performance
              </h3>
              <p className="font-montserrat text-xs sm:text-base text-muted-foreground">
                Sites rápidos, código otimizado. Cada milissegundo importa para 
                a experiência do usuário e para o SEO.
              </p>
            </div>
            
            <div className="reveal glass-card-hover p-5 sm:p-8">
              <div className="w-10 h-10 sm:w-14 sm:h-14 bg-primary rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-6">
                <Target className="w-5 h-5 sm:w-7 sm:h-7 text-primary-foreground" />
              </div>
              <h3 className="font-poppins font-bold text-base sm:text-xl text-foreground mb-1.5 sm:mb-3">
                Foco em Conversão
              </h3>
              <p className="font-montserrat text-xs sm:text-base text-muted-foreground">
                Não fazemos apenas sites bonitos. Criamos experiências projetadas 
                para transformar visitantes em clientes.
              </p>
            </div>
            
            <div className="reveal glass-card-hover p-5 sm:p-8">
              <div className="w-10 h-10 sm:w-14 sm:h-14 bg-primary rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-6">
                <Award className="w-5 h-5 sm:w-7 sm:h-7 text-primary-foreground" />
              </div>
              <h3 className="font-poppins font-bold text-base sm:text-xl text-foreground mb-1.5 sm:mb-3">
                Qualidade Premium
              </h3>
              <p className="font-montserrat text-xs sm:text-base text-muted-foreground">
                Design refinado, atenção aos detalhes. Cada projeto é tratado 
                como se fosse o nosso próprio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
