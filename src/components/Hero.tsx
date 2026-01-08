import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-background pt-20 pb-8 sm:pt-0 sm:pb-0 sm:min-h-screen sm:flex sm:items-center sm:justify-center">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-nexcode-white via-nexcode-white to-nexcode-gray/20" />
      
      {/* Floating decorative elements - hidden on mobile for performance */}
      <div className="hidden sm:block absolute top-20 right-20 w-72 h-72 bg-nexcode-gray/10 rounded-full blur-3xl animate-float" />
      <div className="hidden sm:block absolute bottom-20 left-20 w-96 h-96 bg-nexcode-gray/10 rounded-full blur-3xl animate-float animation-delay-300" />
      
      <div className="container-custom relative z-10 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-secondary rounded-full mb-4 sm:mb-8 opacity-0 animate-fade-up">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full animate-pulse-slow" />
            <span className="text-sm sm:text-sm font-montserrat text-muted-foreground">Agência Premium de Tecnologia</span>
          </div>
          
          {/* Main headline */}
          <h1 className="font-poppins font-black text-[2.25rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl sm:leading-tight tracking-tight text-foreground mb-4 sm:mb-8 opacity-0 animate-fade-up animation-delay-100">
            Transformamos
            <br />
            <span className="text-gradient">ideias em código.</span>
          </h1>
          
          {/* Subheadline */}
          <p className="font-montserrat text-lg sm:text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-12 leading-relaxed opacity-0 animate-fade-up animation-delay-200">
            Sites, sistemas e automações que elevam sua presença digital 
            ao próximo nível. Design premium, código limpo, resultados reais.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 opacity-0 animate-fade-up animation-delay-300">
            <a href="#contato" className="btn-primary group w-full sm:w-auto">
              Solicitar projeto
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#portfolio" className="btn-secondary w-full sm:w-auto">
              Ver portfólio
            </a>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-8 max-w-2xl mx-auto mt-8 sm:mt-20 opacity-0 animate-fade-up animation-delay-400">
            <div className="text-center">
              <div className="font-poppins font-black text-3xl sm:text-4xl md:text-5xl text-foreground">50+</div>
              <div className="font-montserrat text-sm sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">Projetos entregues</div>
            </div>
            <div className="text-center">
              <div className="font-poppins font-black text-3xl sm:text-4xl md:text-5xl text-foreground">98%</div>
              <div className="font-montserrat text-sm sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">Satisfação</div>
            </div>
            <div className="text-center">
              <div className="font-poppins font-black text-3xl sm:text-4xl md:text-5xl text-foreground">5★</div>
              <div className="font-montserrat text-sm sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">Avaliação média</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator - hidden on mobile */}
      <div className="hidden sm:block absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 animate-fade-up animation-delay-500">
        <div className="w-6 h-10 border-2 border-muted rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-muted-foreground rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
