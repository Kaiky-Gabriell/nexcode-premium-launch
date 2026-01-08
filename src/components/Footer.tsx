import { Instagram, Linkedin, Github, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-16 bg-background border-t border-border">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="font-poppins font-black text-2xl text-foreground mb-4">
              NEXCODE
            </div>
            <p className="font-montserrat text-muted-foreground max-w-sm mb-6">
              Agência premium de tecnologia. Transformamos ideias em código 
              e código em resultados.
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="mailto:contato@nexcode.com.br" 
                className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-poppins font-bold text-foreground mb-4">Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#sobre" className="font-montserrat text-muted-foreground hover:text-foreground transition-colors">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#servicos" className="font-montserrat text-muted-foreground hover:text-foreground transition-colors">
                  Serviços
                </a>
              </li>
              <li>
                <a href="#portfolio" className="font-montserrat text-muted-foreground hover:text-foreground transition-colors">
                  Portfólio
                </a>
              </li>
              <li>
                <a href="#contato" className="font-montserrat text-muted-foreground hover:text-foreground transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>
          
          {/* Serviços */}
          <div>
            <h4 className="font-poppins font-bold text-foreground mb-4">Serviços</h4>
            <ul className="space-y-3">
              <li>
                <a href="#servicos" className="font-montserrat text-muted-foreground hover:text-foreground transition-colors">
                  Landing Pages
                </a>
              </li>
              <li>
                <a href="#servicos" className="font-montserrat text-muted-foreground hover:text-foreground transition-colors">
                  Sites Institucionais
                </a>
              </li>
              <li>
                <a href="#servicos" className="font-montserrat text-muted-foreground hover:text-foreground transition-colors">
                  E-commerce
                </a>
              </li>
              <li>
                <a href="#servicos" className="font-montserrat text-muted-foreground hover:text-foreground transition-colors">
                  Sistemas Web
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-montserrat text-sm text-muted-foreground">
            © {currentYear} Nexcode. Todos os direitos reservados.
          </div>
          <div className="font-montserrat text-sm text-muted-foreground">
            Feito com ♥ pela Nexcode
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
