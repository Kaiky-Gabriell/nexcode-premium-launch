import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { HeroScrollAnimation } from "@/components/ui/hero-scroll-animation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroScrollAnimation
        heroContent={<Hero />}
        nextSectionContent={<About />}
      />
      <Services />
      <Process />
      <Portfolio />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
