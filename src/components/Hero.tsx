
import React from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section 
      id="home" 
      className="pt-28 pb-16 md:py-32 px-4 md:px-6 bg-gradient-to-b from-white to-apple-gray-light"
    >
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Produtos Apple pelo mesmo preço oficial
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            A FortalSolutions oferece os melhores produtos Apple pelo mesmo preço listado no site oficial Apple.com em dólares.
            Qualidade garantida e suporte completo para sua compra.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-apple-blue hover:bg-apple-blue-dark text-white px-8 py-6">
              <a href="#products">
                Explorar produtos
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-apple-blue text-apple-blue hover:bg-apple-blue/10 px-8 py-6">
              <a href="#contact">Entrar em contato</a>
            </Button>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <div className="aspect-square bg-white rounded-2xl shadow-md p-4 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1551524559-8af4e6624178?q=80&w=500&auto=format&fit=crop" 
              alt="iPhone" 
              className="max-h-full object-contain"
            />
          </div>
          <div className="aspect-square bg-white rounded-2xl shadow-md p-4 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=500&auto=format&fit=crop" 
              alt="Apple Watch" 
              className="max-h-full object-contain"
            />
          </div>
          <div className="aspect-square bg-white rounded-2xl shadow-md p-4 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?q=80&w=500&auto=format&fit=crop" 
              alt="AirPods" 
              className="max-h-full object-contain"
            />
          </div>
          <div className="aspect-square bg-white rounded-2xl shadow-md p-4 flex items-center justify-center">
            <img 
              src="https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=500&auto=format&fit=crop" 
              alt="iPad" 
              className="max-h-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
