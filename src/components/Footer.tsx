
import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const scrollToCategory = (categoryId: string) => {
    const element = document.querySelector(categoryId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="text-white py-12 bg-stone-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center justify-center md:justify-start mb-4">
              <img src="/lovable-uploads/fortaleza-logo-footer.png" alt="Fortaleza Solutions" className="h-16 w-auto" />
            </div>
            <p className="text-gray-400 text-sm text-center md:text-left">
              Sua loja especializada em produtos Apple. Qualidade e inovação em cada produto.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Produtos</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <button onClick={() => scrollToCategory('#iphones')} className="hover:text-white transition-colors text-left">
                  iPhones
                </button>
              </li>
              <li>
                <button onClick={() => scrollToCategory('#ipads')} className="hover:text-white transition-colors text-left">
                  iPads
                </button>
              </li>
              <li>
                <button onClick={() => scrollToCategory('#macbooks')} className="hover:text-white transition-colors text-left">
                  MacBooks
                </button>
              </li>
              <li>
                <button onClick={() => scrollToCategory('#watches')} className="hover:text-white transition-colors text-left">
                  Apple Watch
                </button>
              </li>
              <li>
                <button onClick={() => scrollToCategory('#airpods')} className="hover:text-white transition-colors text-left">
                  AirPods
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>WhatsApp: (85) 99713-1313</li>
              <li>Email: contato@fortaleza.com</li>
              <li>Segunda a Sexta: 9h às 18h</li>
              <li>
                <Link to="/auth" className="hover:text-white transition-colors text-blue-400">
                  Área Administrativa
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; 2024 Fortaleza Solutions. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
