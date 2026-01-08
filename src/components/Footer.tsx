import { Instagram, Linkedin, Github, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-10 sm:py-16 bg-background border-t border-border">
      <div className="container-custom">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 mb-10 sm:mb-16">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-2 md:col-span-2">
            <div className="font-poppins font-black text-xl sm:text-2xl text-foreground mb-3 sm:mb-4">
              NEXCODE
            </div>
            <p className="font-montserrat text-sm sm:text-base text-muted-foreground max-w-sm mb-5 sm:mb-6">
              Agência premium de tecnologia. Transformamos ideias em código 
              e código em resultados.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <a 
                href="#" 
                className="w-11 h-11 sm:w-10 sm:h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-11 h-11 sm:w-10 sm:h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-11 h-11 sm:w-10 sm:h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Github"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="mailto:contato@nexcode.com.br" 
                className="w-11 h-11 sm:w-10 sm:h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-poppins font-bold text-sm sm:text-base text-foreground mb-3 sm:mb-4">Links</h4>
            <ul className="space-y-2.5 sm:space-y-3">
              <li>
                <a href="#sobre" className="font-montserrat text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors py-1 inline-block">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#servicos" className="font-montserrat text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors py-1 inline-block">
                  Serviços
                </a>
              </li>
              <li>
                <a href="#portfolio" className="font-montserrat text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors py-1 inline-block">
                  Portfólio
                </a>
              </li>
              <li>
                <a href="#contato" className="font-montserrat text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors py-1 inline-block">
                  Contato
                </a>
              </li>
            </ul>
          </div>
          
          {/* Serviços */}
          <div>
            <h4 className="font-poppins font-bold text-sm sm:text-base text-foreground mb-3 sm:mb-4">Serviços</h4>
            <ul className="space-y-2.5 sm:space-y-3">
              <li>
                <a href="#servicos" className="font-montserrat text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors py-1 inline-block">
                  Landing Pages
                </a>
              </li>
              <li>
                <a href="#servicos" className="font-montserrat text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors py-1 inline-block">
                  Sites Institucionais
                </a>
              </li>
              <li>
                <a href="#servicos" className="font-montserrat text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors py-1 inline-block">
                  E-commerce
                </a>
              </li>
              <li>
                <a href="#servicos" className="font-montserrat text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors py-1 inline-block">
                  Sistemas Web
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="pt-6 sm:pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
          <div className="font-montserrat text-xs sm:text-sm text-muted-foreground">
            © {currentYear} Nexcode. Todos os direitos reservados.
          </div>
          <div className="font-montserrat text-xs sm:text-sm text-muted-foreground">
            Feito com ♥ pela Nexcode
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
