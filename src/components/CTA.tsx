import { useEffect, useRef, useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CTA = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    projeto: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.nome.trim() || !formData.email.trim() || !formData.telefone.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Formatar mensagem para WhatsApp
    const mensagem = `🚀 *Nova Solicitação de Call*

👤 *Nome:* ${formData.nome.trim()}
📧 *Email:* ${formData.email.trim()}
📱 *Telefone:* ${formData.telefone.trim()}
💡 *Sobre o Projeto:* ${formData.projeto.trim() || "Não informado"}

_Enviado pelo site NEXCODE_`;

    // Codificar mensagem para URL
    const mensagemCodificada = encodeURIComponent(mensagem);
    
    // Número do WhatsApp (substitua pelo seu número)
    const numeroWhatsApp = "5511999999999";
    
    // Abrir WhatsApp com a mensagem
    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensagemCodificada}`, "_blank");

    toast({
      title: "Redirecionando para WhatsApp",
      description: "Complete o envio da mensagem no WhatsApp.",
    });

    setIsSubmitting(false);
  };

  return (
    <section ref={sectionRef} id="contato" className="section-padding bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative elements - hidden on mobile */}
      <div className="hidden sm:block absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="hidden sm:block absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
      
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="reveal font-montserrat text-sm sm:text-sm uppercase tracking-widest text-primary-foreground/60 mb-2 sm:mb-4 block">
            Pronto para escalar?
          </span>
          
          <h2 className="reveal font-poppins font-black text-[2.5rem] leading-[1.05] sm:text-4xl md:text-5xl lg:text-7xl sm:leading-tight mb-4 sm:mb-8">
            Vamos construir
            <br />
            seu próximo produto.
          </h2>
          
          <p className="reveal font-montserrat text-base sm:text-lg md:text-xl text-primary-foreground/70 mb-6 sm:mb-12 max-w-2xl mx-auto">
            Agende uma call estratégica e descubra como 
            podemos acelerar seu time-to-market.
          </p>
          
          {/* Formulário */}
          <form onSubmit={handleSubmit} className="reveal max-w-xl mx-auto space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="nome"
                placeholder="Seu nome *"
                value={formData.nome}
                onChange={handleInputChange}
                className="w-full px-4 py-3.5 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full text-primary-foreground placeholder:text-primary-foreground/50 font-montserrat focus:outline-none focus:border-primary-foreground/40 transition-colors"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Seu email *"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3.5 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full text-primary-foreground placeholder:text-primary-foreground/50 font-montserrat focus:outline-none focus:border-primary-foreground/40 transition-colors"
                required
              />
            </div>
            
            <input
              type="tel"
              name="telefone"
              placeholder="Seu telefone/WhatsApp *"
              value={formData.telefone}
              onChange={handleInputChange}
              className="w-full px-4 py-3.5 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full text-primary-foreground placeholder:text-primary-foreground/50 font-montserrat focus:outline-none focus:border-primary-foreground/40 transition-colors"
              required
            />
            
            <textarea
              name="projeto"
              placeholder="Conte um pouco sobre seu projeto (opcional)"
              value={formData.projeto}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3.5 bg-primary-foreground/10 border border-primary-foreground/20 rounded-2xl text-primary-foreground placeholder:text-primary-foreground/50 font-montserrat focus:outline-none focus:border-primary-foreground/40 transition-colors resize-none"
            />
            
            <button 
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center w-full px-6 sm:px-8 py-3.5 sm:py-4 bg-primary-foreground text-primary font-poppins font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl group min-h-[48px] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              {isSubmitting ? "Enviando..." : "Agendar call via WhatsApp"}
              <Send className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
          
          {/* Quick info */}
          <div className="reveal mt-8 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 pt-8 sm:pt-16 border-t border-primary-foreground/10">
            <div className="text-center sm:text-center">
              <div className="font-poppins font-bold text-base sm:text-lg mb-0.5 sm:mb-2">Resposta em 2h</div>
              <div className="font-montserrat text-sm sm:text-base text-primary-foreground/60">
                Retorno rápido em horário comercial
              </div>
            </div>
            <div className="text-center sm:text-center">
              <div className="font-poppins font-bold text-base sm:text-lg mb-0.5 sm:mb-2">Proposta gratuita</div>
              <div className="font-montserrat text-sm sm:text-base text-primary-foreground/60">
                Escopo, timeline e investimento
              </div>
            </div>
            <div className="text-center sm:text-center">
              <div className="font-poppins font-bold text-base sm:text-lg mb-0.5 sm:mb-2">Call estratégica</div>
              <div className="font-montserrat text-sm sm:text-base text-primary-foreground/60">
                30 min para alinhar visão de produto
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
