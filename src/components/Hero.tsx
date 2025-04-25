
import React from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section
      id="home"
      className="pt-28 pb-8 md:py-32 px-4 md:px-6 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1609334761848-77b4d1994040')" }}
    >
      <div className="container mx-auto max-w-4xl bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow">
        <div className="mx-auto text-center mb-12">
          <img
            src="/lovable-uploads/a41a14b0-06c5-4ade-aa43-cdb1cbe22d18.png"
            alt="Logo FortalezaSolutions"
            className="mx-auto mb-6 h-16 md:h-24 w-auto"
            draggable={false}
          />
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Produtos Apple Originais e Novos com menor valor de mercado
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            A FortalezaSolutions oferece os melhores produtos Apple com preços imbatíveis, entrega VIP em Orlando e Miami, atendimento em português e cobrimos qualquer oferta!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-apple-blue hover:bg-apple-blue-dark text-white px-8 py-6 rounded-lg shadow font-semibold text-lg">
              <a href="#products">
                Explorar produtos
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-apple-blue text-apple-blue hover:bg-apple-blue/10 px-8 py-6 rounded-lg">
              <a href="#contact">Entrar em contato</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
