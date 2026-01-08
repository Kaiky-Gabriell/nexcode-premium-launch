import { useEffect, useRef } from "react";
import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee";
import { InfiniteSlider } from "@/components/ui/infinite-slider";

const partners = [
  { name: "Lovable", logo: "https://lovable.dev/icon.svg" },
  { name: "Supabase", logo: "https://supabase.com/favicon/favicon-196x196.png" },
  { name: "Cursor", logo: "https://cursor.sh/favicon.ico" },
  { name: "Figma", logo: "https://static.figma.com/app/icon/1/favicon.svg" },
  { name: "ChatGPT", logo: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" },
  { name: "Claude", logo: "https://claude.ai/favicon.ico" },
  { name: "Gemini", logo: "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg" },
];

const testimonials = [
  {
    name: "Carlos Mendes",
    username: "@carlosmendes",
    role: "CEO, TechFlow",
    content: "A Nexcode entregou muito além do esperado. O sistema que desenvolveram revolucionou nossa operação.",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
  },
  {
    name: "Marina Silva",
    username: "@marinasilva",
    role: "Diretora, Luxe Brand",
    content: "Nosso e-commerce ficou incrível. As vendas aumentaram 200% após o lançamento.",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
  },
  {
    name: "Ricardo Santos",
    username: "@ricardosantos",
    role: "Fundador, FinanceHub",
    content: "Design premium e código limpo. A landing page converteu muito acima da média.",
    img: "https://randomuser.me/api/portraits/men/67.jpg",
    rating: 5,
  },
  {
    name: "Ana Paula Costa",
    username: "@anapaula",
    role: "CMO, GreenLife",
    content: "Profissionalismo impecável do início ao fim. Recomendo fortemente a Nexcode!",
    img: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 5,
  },
  {
    name: "João Pedro Lima",
    username: "@joaopedro",
    role: "CTO, AutoTask AI",
    content: "Automações que funcionam perfeitamente. Economizamos horas de trabalho manual.",
    img: "https://randomuser.me/api/portraits/men/22.jpg",
    rating: 5,
  },
  {
    name: "Fernanda Oliveira",
    username: "@fernandaoliveira",
    role: "Fundadora, Studio Arch",
    content: "O site ficou elegante e moderno. Recebemos muitos elogios dos clientes!",
    img: "https://randomuser.me/api/portraits/women/53.jpg",
    rating: 5,
  },
  {
    name: "Lucas Ferreira",
    username: "@lucasferreira",
    role: "Diretor, TechStart",
    content: "Parceria excepcional. A equipe entendeu perfeitamente nossa visão.",
    img: "https://randomuser.me/api/portraits/men/51.jpg",
    rating: 5,
  },
  {
    name: "Beatriz Almeida",
    username: "@beatrizalmeida",
    role: "CEO, Moda Plus",
    content: "E-commerce robusto e fácil de gerenciar. Superou todas as expectativas!",
    img: "https://randomuser.me/api/portraits/women/45.jpg",
    rating: 5,
  },
];

function TestimonialCard({ img, name, username, content, rating }: typeof testimonials[number]) {
  return (
    <Card className="w-[280px] sm:w-[320px] shrink-0 bg-card border-border/50 shadow-card">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="h-10 w-10 border-2 border-secondary">
            <AvatarImage src={img} alt={name} />
            <AvatarFallback className="bg-secondary text-foreground font-bold">
              {name[0]}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-poppins font-bold text-sm text-foreground truncate">
                {name}
              </span>
            </div>
            <p className="font-montserrat text-xs text-muted-foreground truncate">
              {username}
            </p>
          </div>
        </div>
        <div className="flex gap-0.5 mb-2">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
          ))}
        </div>
        <p className="font-montserrat text-sm text-foreground leading-relaxed">
          "{content}"
        </p>
      </CardContent>
    </Card>
  );
}

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

  const firstRow = testimonials.slice(0, 4);
  const secondRow = testimonials.slice(4, 8);

  return (
    <section ref={sectionRef} className="section-padding bg-background overflow-hidden">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-16 lg:mb-20">
          <span className="reveal font-montserrat text-sm sm:text-sm uppercase tracking-widest text-muted-foreground mb-2 sm:mb-4 block">
            Depoimentos
          </span>
          <h2 className="reveal font-poppins font-black text-[2.5rem] leading-[1.05] sm:text-4xl md:text-5xl lg:text-6xl text-foreground sm:leading-tight mb-3 sm:mb-6">
            O que nossos
            <br />
            <span className="text-gradient">clientes dizem.</span>
          </h2>
        </div>
      </div>
      
      {/* Marquee Container */}
      <div className="reveal relative">
        {/* First Row - Left to Right */}
        <Marquee pauseOnHover className="[--duration:35s] mb-4">
          {firstRow.map((testimonial) => (
            <TestimonialCard key={testimonial.username} {...testimonial} />
          ))}
        </Marquee>
        
        {/* Second Row - Right to Left */}
        <Marquee reverse pauseOnHover className="[--duration:35s]">
          {secondRow.map((testimonial) => (
            <TestimonialCard key={testimonial.username} {...testimonial} />
          ))}
        </Marquee>
        
        {/* Gradient overlays */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-background to-transparent" />
      </div>
      
      <div className="container-custom">
        {/* Partners Section */}
        <div className="reveal mt-10 sm:mt-20 text-center">
          <p className="font-montserrat text-sm sm:text-base text-muted-foreground mb-6 sm:mb-10">
            Nossos Parceiros
          </p>
        </div>
      </div>
      
      {/* Partners Infinite Slider */}
      <div className="reveal relative">
        <InfiniteSlider gap={48} duration={30} durationOnHover={60} className="py-4">
          {partners.map((partner) => (
            <div
              key={partner.name}
              className="flex items-center gap-3 px-4 py-2 bg-secondary/50 rounded-full hover:bg-secondary transition-colors duration-300"
            >
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="font-poppins font-semibold text-sm sm:text-lg text-foreground">
                {partner.name}
              </span>
            </div>
          ))}
        </InfiniteSlider>
        
        {/* Gradient overlays */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/12 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/12 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  );
};

export default Testimonials;
