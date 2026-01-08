import { Home, User, Briefcase, Layers, FolderOpen, Phone } from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";

const navItems = [
  { name: "Início", url: "#", icon: Home },
  { name: "Sobre", url: "#sobre", icon: User },
  { name: "Serviços", url: "#servicos", icon: Briefcase },
  { name: "Processo", url: "#processo", icon: Layers },
  { name: "Portfólio", url: "#portfolio", icon: FolderOpen },
  { name: "Contato", url: "#contato", icon: Phone },
];

const Navbar = () => {
  return <NavBar items={navItems} />;
};

export default Navbar;
