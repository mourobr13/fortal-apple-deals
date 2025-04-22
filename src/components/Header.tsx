
import React from "react";
import { Button } from "./ui/button";
import { Apple, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-sm z-50">
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Apple className="h-6 w-6" />
          <span className="text-lg font-semibold">FortalSolutions</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#home" className="text-gray-800 hover:text-apple-blue transition-colors">
            Home
          </a>
          <a href="#products" className="text-gray-800 hover:text-apple-blue transition-colors">
            Produtos
          </a>
          <a href="#contact" className="text-gray-800 hover:text-apple-blue transition-colors">
            Contato
          </a>
          <Button asChild variant="default" className="bg-apple-blue hover:bg-apple-blue-dark">
            <a href="#products">Ver produtos</a>
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
              href="#home" 
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-800 hover:text-apple-blue transition-colors"
            >
              Home
            </a>
            <a 
              href="#products" 
              onClick={() => setIsMenuOpen(false)}
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
              <a href="#products" onClick={() => setIsMenuOpen(false)}>Ver produtos</a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};
