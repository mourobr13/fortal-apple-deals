
import { Apple } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-apple-gray-dark py-12 px-4 md:px-6 text-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="flex items-center gap-2 mb-6 md:mb-0">
            <Apple className="h-6 w-6" />
            <span className="text-xl font-semibold">FortalSolutions</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <a href="#home" className="text-gray-300 hover:text-white transition-colors">
              Home
            </a>
            <a href="#products" className="text-gray-300 hover:text-white transition-colors">
              Produtos
            </a>
            <a href="#contact" className="text-gray-300 hover:text-white transition-colors">
              Contato
            </a>
          </nav>
        </div>
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {currentYear} FortalSolutions. Todos os direitos reservados.
            </p>
            <p className="text-gray-400 text-sm text-center md:text-right">
              FortalSolutions não é afiliada à Apple Inc. Apple, iPhone, iPad, Apple Watch, 
              AirPods e seus logotipos são marcas registradas da Apple Inc.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
