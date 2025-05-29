
import React from "react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="/lovable-uploads/fortaleza-logo-footer.png" 
                alt="Fortaleza Solutions" 
                className="h-8 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm">
              Sua loja especializada em produtos Apple. Qualidade e inovação em cada produto.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Produtos</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#iphones" className="hover:text-white transition-colors">iPhones</a></li>
              <li><a href="#ipads" className="hover:text-white transition-colors">iPads</a></li>
              <li><a href="#macbooks" className="hover:text-white transition-colors">MacBooks</a></li>
              <li><a href="#watches" className="hover:text-white transition-colors">Apple Watch</a></li>
              <li><a href="#airpods" className="hover:text-white transition-colors">AirPods</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Suporte</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Atendimento</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Garantia</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Trocas</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>WhatsApp: (85) 99713-1313</li>
              <li>Email: contato@fortaleza.com</li>
              <li>Segunda a Sexta: 9h às 18h</li>
              <li>
                <Link 
                  to="/auth" 
                  className="hover:text-white transition-colors text-blue-400"
                >
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
