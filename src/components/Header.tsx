
import React from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToProducts = (e: React.MouseEvent) => {
    e.preventDefault();
    const productsSection = document.querySelector('#products .text-3xl.md\\:text-4xl');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleWhatsAppBR = () => {
    const message = "Olá, estou interessado em produtos Apple da FortalezaSolutions. Poderia me ajudar?";
    const whatsappLink = `https://wa.me/5585997131313?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  };

  const handleWhatsAppUSA = () => {
    const message = "Hello, I'm interested in Apple products from FortalezaSolutions. Could you help me?";
    const whatsappLink = `https://wa.me/14077576972?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <div>
          <img
            src="/lovable-uploads/a41a14b0-06c5-4ade-aa43-cdb1cbe22d18.png"
            alt="Fortaleza Solutions Logo"
            className="h-20 w-auto" 
            draggable={false}
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
          <a href="#products" onClick={scrollToProducts} className="text-gray-800 hover:text-apple-blue transition-colors">
            Produtos
          </a>
          <a href="#contact" className="text-gray-800 hover:text-apple-blue transition-colors">
            Contato
          </a>
          <Button asChild variant="default" className="bg-apple-blue hover:bg-apple-blue-dark">
            <a href="#products" onClick={scrollToProducts}>Ver produtos</a>
          </Button>
          
          {/* WhatsApp Brasil */}
          <Button
            onClick={handleWhatsAppBR}
            variant="outline"
            className="flex items-center gap-2 text-sm"
          >
            🇧🇷
            <span>WhatsApp BR</span>
          </Button>
          
          {/* WhatsApp EUA */}
          <Button
            onClick={handleWhatsAppUSA}
            variant="outline"
            className="flex items-center gap-2 text-sm"
          >
            🇺🇸
            <span>WhatsApp EUA</span>
          </Button>
        </nav>

        {/* Mobile Navigation Button */}
        <button className="md:hidden" onClick={toggleMenu}>
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-800" />
          ) : (
            <Menu className="h-6 w-6 text-gray-800" />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-6 shadow-lg">
          <nav className="flex flex-col space-y-4">
            <a 
              href="#products" 
              onClick={scrollToProducts}
              className="text-gray-800 hover:text-apple-blue transition-colors"
            >
              Produtos
            </a>
            <a 
              href="#contact" 
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-800 hover:text-apple-blue transition-colors"
            >
              Contato
            </a>
            <Button asChild variant="default" className="w-full bg-apple-blue hover:bg-apple-blue-dark">
              <a href="#products" onClick={scrollToProducts}>Ver produtos</a>
            </Button>
            
            {/* WhatsApp Brasil - Mobile */}
            <Button
              onClick={() => {
                handleWhatsAppBR();
                setIsMenuOpen(false);
              }}
              variant="outline"
              className="w-full flex items-center gap-2 justify-center"
            >
              🇧🇷
              <span>WhatsApp BR</span>
            </Button>
            
            {/* WhatsApp EUA - Mobile */}
            <Button
              onClick={() => {
                handleWhatsAppUSA();
                setIsMenuOpen(false);
              }}
              variant="outline"
              className="w-full flex items-center gap-2 justify-center"
            >
              🇺🇸
              <span>WhatsApp EUA</span>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};
