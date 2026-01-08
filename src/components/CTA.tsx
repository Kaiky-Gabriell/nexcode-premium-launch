import { useEffect, useRef } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";

const CTA = () => {
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
    <section ref={sectionRef} id="contato" className="section-padding bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative elements - hidden on mobile */}
      <div className="hidden sm:block absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="hidden sm:block absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="reveal font-montserrat text-xs sm:text-sm uppercase tracking-widest text-primary-foreground/60 mb-2 sm:mb-4 block">
            Pronto para começar?
          </span>
          
          <h2 className="reveal font-poppins font-black text-[1.75rem] sm:text-4xl md:text-5xl lg:text-7xl leading-tight mb-4 sm:mb-8">
            Vamos transformar
            <br />
            sua ideia em realidade.
          </h2>
          
          <p className="reveal font-montserrat text-sm sm:text-lg md:text-xl text-primary-foreground/70 mb-6 sm:mb-12 max-w-2xl mx-auto">
            Entre em contato e receba uma proposta personalizada 
            para o seu projeto em até 24 horas.
          </p>
          
          <div className="reveal flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-4">
            <a 
              href="https://wa.me/5511999999999" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-primary-foreground text-primary font-poppins font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl group min-h-[48px]"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Falar no WhatsApp
            </a>
            
            <a 
              href="mailto:contato@nexcode.com.br"
              className="inline-flex items-center justify-center w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-transparent border-2 border-primary-foreground text-primary-foreground font-poppins font-semibold rounded-full transition-all duration-300 hover:bg-primary-foreground hover:text-primary hover:scale-105 group min-h-[48px]"
            >
              Enviar e-mail
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
          
          {/* Quick info */}
          <div className="reveal mt-8 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 pt-8 sm:pt-16 border-t border-primary-foreground/10">
            <div className="text-center sm:text-center">
              <div className="font-poppins font-bold text-base sm:text-lg mb-0.5 sm:mb-2">Resposta rápida</div>
              <div className="font-montserrat text-sm sm:text-base text-primary-foreground/60">
                Retornamos em até 2 horas úteis
              </div>
            </div>
            <div className="text-center sm:text-center">
              <div className="font-poppins font-bold text-base sm:text-lg mb-0.5 sm:mb-2">Proposta gratuita</div>
              <div className="font-montserrat text-sm sm:text-base text-primary-foreground/60">
                Orçamento detalhado sem compromisso
              </div>
            </div>
            <div className="text-center sm:text-center">
              <div className="font-poppins font-bold text-base sm:text-lg mb-0.5 sm:mb-2">Reunião online</div>
              <div className="font-montserrat text-sm sm:text-base text-primary-foreground/60">
                Agende uma call para apresentarmos
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
