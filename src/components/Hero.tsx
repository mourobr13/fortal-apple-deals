
import React from "react";
import { Button } from "./ui/button";
import { ArrowRight, Watch, Phone, Headphones, Tablet } from "lucide-react";
import { cn } from "@/lib/utils";

const gallery = [
  {
    img: "https://images.unsplash.com/photo-1551524559-8af4e6624178?q=80&w=500&auto=format&fit=crop",
    alt: "iPhone",
    label: "iPhones",
    href: "#iphones"
  },
  {
    img: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?q=80&w=500&auto=format&fit=crop",
    alt: "Apple Watch",
    label: "Apple Watch",
    href: "#watches"
  },
  {
    img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=500&auto=format&fit=crop",
    alt: "AirPods",
    label: "AirPods",
    href: "#airpods"
  },
  {
    img: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=500&auto=format&fit=crop",
    alt: "iPad",
    label: "iPads",
    href: "#ipads"
  }
];

export const Hero = () => {
  return (
    <section 
      id="home" 
      className="pt-28 pb-16 md:py-32 px-4 md:px-6 bg-gradient-to-b from-white to-apple-gray-light"
    >
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            Produtos Apple com preço oficial e menor valor do mercado
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            A FortalSolutions oferece os melhores produtos Apple sempre pelo menor preço, com entrega VIP em Orlando e Miami e atendimento em português. Cobrimos qualquer oferta!
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
          {gallery.map((item, idx) => (
            <a
              key={item.label}
              href={`#${item.label.toLowerCase().replace(/\s+/g, "")}`}
              className={cn(
                "aspect-square bg-white rounded-2xl shadow-md p-4 flex flex-col items-center justify-center group hover-scale transition-all"
              )}
              style={{ textDecoration: "none" }}
            >
              <img
                src={item.img}
                alt={item.alt}
                className="max-h-[80px] md:max-h-full object-contain transition-transform duration-200 group-hover:scale-110"
                draggable={false}
              />
              <span className="block mt-4 text-base md:text-lg font-medium text-gray-900 group-hover:text-apple-blue transition-colors">
                {item.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
