import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-nexcode-white via-nexcode-white to-nexcode-gray/20" />
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-nexcode-gray/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-nexcode-gray/10 rounded-full blur-3xl animate-float animation-delay-300" />
      
      <div className="container-custom relative z-10 text-center">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full mb-8 opacity-0 animate-fade-up">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse-slow" />
            <span className="text-sm font-montserrat text-muted-foreground">Agência Premium de Tecnologia</span>
          </div>
          
          {/* Main headline */}
          <h1 className="font-poppins font-black text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-tight tracking-tight text-foreground mb-8 opacity-0 animate-fade-up animation-delay-100">
            Transformamos
            <br />
            <span className="text-gradient">ideias em código.</span>
          </h1>
          
          {/* Subheadline */}
          <p className="font-montserrat text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed opacity-0 animate-fade-up animation-delay-200">
            Sites, sistemas e automações que elevam sua presença digital 
            ao próximo nível. Design premium, código limpo, resultados reais.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up animation-delay-300">
            <a href="#contato" className="btn-primary group">
              Solicitar projeto
              <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#portfolio" className="btn-secondary">
              Ver portfólio
            </a>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-20 opacity-0 animate-fade-up animation-delay-400">
            <div className="text-center">
              <div className="font-poppins font-black text-4xl md:text-5xl text-foreground">50+</div>
              <div className="font-montserrat text-sm text-muted-foreground mt-1">Projetos entregues</div>
            </div>
            <div className="text-center">
              <div className="font-poppins font-black text-4xl md:text-5xl text-foreground">98%</div>
              <div className="font-montserrat text-sm text-muted-foreground mt-1">Satisfação</div>
            </div>
            <div className="text-center">
              <div className="font-poppins font-black text-4xl md:text-5xl text-foreground">5★</div>
              <div className="font-montserrat text-sm text-muted-foreground mt-1">Avaliação média</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-0 animate-fade-up animation-delay-500">
        <div className="w-6 h-10 border-2 border-muted rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-muted-foreground rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
