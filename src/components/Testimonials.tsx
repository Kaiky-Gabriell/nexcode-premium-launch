import { useEffect, useRef } from "react";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Carlos Mendes",
    role: "CEO, TechFlow",
    content: "A Nexcode entregou muito além do esperado. O sistema que desenvolveram revolucionou nossa operação. Profissionalismo impecável.",
    rating: 5,
  },
  {
    name: "Marina Silva",
    role: "Diretora, Luxe Brand",
    content: "Nosso e-commerce ficou incrível. As vendas aumentaram 200% após o lançamento. Recomendo fortemente.",
    rating: 5,
  },
  {
    name: "Ricardo Santos",
    role: "Fundador, FinanceHub",
    content: "Design premium e código limpo. A landing page converteu muito acima da média do mercado. Parceria que se renova.",
    rating: 5,
  },
];

const Testimonials = () => {
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
    <section ref={sectionRef} className="section-padding bg-background">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-20">
          <span className="reveal font-montserrat text-xs sm:text-sm uppercase tracking-widest text-muted-foreground mb-3 sm:mb-4 block">
            Depoimentos
          </span>
          <h2 className="reveal font-poppins font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-4 sm:mb-6">
            O que nossos
            <br />
            <span className="text-gradient">clientes dizem.</span>
          </h2>
        </div>
        
        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="reveal glass-card-hover p-6 sm:p-8 relative"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 sm:top-8 sm:right-8 w-8 h-8 sm:w-10 sm:h-10 text-secondary" />
              
              {/* Stars */}
              <div className="flex gap-1 mb-4 sm:mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-primary text-primary" />
                ))}
              </div>
              
              {/* Content */}
              <p className="font-montserrat text-sm sm:text-base text-foreground leading-relaxed mb-6 sm:mb-8 pr-8 sm:pr-0">
                "{testimonial.content}"
              </p>
              
              {/* Author */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-poppins font-bold text-base sm:text-lg text-foreground">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div className="min-w-0">
                  <div className="font-poppins font-bold text-sm sm:text-base text-foreground truncate">
                    {testimonial.name}
                  </div>
                  <div className="font-montserrat text-xs sm:text-sm text-muted-foreground truncate">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Trust Badges */}
        <div className="reveal mt-12 sm:mt-20 text-center">
          <p className="font-montserrat text-xs sm:text-sm text-muted-foreground mb-6 sm:mb-8">
            Empresas que confiam na Nexcode
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 lg:gap-12 opacity-40">
            {["TechFlow", "Luxe", "FinanceHub", "Studio Arch", "GreenLife"].map((brand) => (
              <span key={brand} className="font-poppins font-bold text-lg sm:text-xl lg:text-2xl text-foreground">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
