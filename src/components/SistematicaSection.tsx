
import React from "react";
import { Check } from "lucide-react";

export const SistematicaSection = () => {
  return (
    <section id="sistematica" className="py-20 px-4 md:px-6 bg-gray-50">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
          Como Funciona nossa sistemática de Trabalho:
        </h2>
        <p className="max-w-2xl text-center mx-auto mb-12 text-gray-600">
          Forma simples, descomplicada e segura de comprar seu produto dos sonhos diretamente dos Estados Unidos, com o menor valor do mercado e tratando diretamente com atendentes brasileiro(a) e zero burocracia.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="bg-apple-blue/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-apple-blue font-bold text-xl">1</span>
            </div>
            <h3 className="font-semibold text-xl mb-3">Escolha seu Item</h3>
            <p className="text-gray-600">
              Veja qual produto está querendo comprar e clique em <b>Comprar</b>!
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="bg-apple-blue/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-apple-blue font-bold text-xl">2</span>
            </div>
            <h3 className="font-semibold text-xl mb-3">Redirecionamento</h3>
            <p className="text-gray-600">
              Você falará diretamente com nossa equipe de vendas, atendimento humanizado para fechar sua solicitação e em Português.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="bg-apple-blue/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-apple-blue font-bold text-xl">3</span>
            </div>
            <h3 className="font-semibold text-xl mb-3">Fechamento</h3>
            <p className="text-gray-600">
              Pague via PIX, cartão brasileiro até 12x ou em dólar no seu hotel/casa/Airbnb.
              <br />
              Entregas Miami ou Orlando sem custos e atendimento em português.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
