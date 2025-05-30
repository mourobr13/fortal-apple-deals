
import { Mail, Phone, MapPin } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

export const ContactSection = () => {
  const handleWhatsAppBRClick = () => {
    const message = "Olá, estou interessado em produtos Apple da FortalezaSolutions. Poderia me ajudar?";
    const whatsappLink = `https://wa.me/5585997131313?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  };

  const handleWhatsAppUSAClick = () => {
    const message = "Olá, estou interessado em produtos Apple da FortalezaSolutions. Poderia me ajudar?";
    const whatsappLink = `https://wa.me/14077576972?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <section id="contact" className="py-20 px-4 md:px-6 bg-apple-gray-light">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Entre em Contato</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Estamos disponíveis para responder suas dúvidas e ajudar com sua compra.
            Entre em contato conosco por qualquer um dos canais abaixo.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-md">
            <h3 className="text-2xl font-semibold mb-6">Informações de contato</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-apple-blue mt-0.5" />
                <div>
                  <p className="font-medium">E-mail</p>
                  <a href="mailto:contato@fortalezasolutions.com.br" className="text-apple-blue hover:underline">
                    contato@fortalezasolutions.com.br
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-apple-blue mt-0.5" />
                <div>
                  <p className="font-medium">WhatsApp BR</p>
                  <div className="flex items-center gap-2">
                    <img src="/lovable-uploads/0bd28f91-d412-4642-ab16-b99584d04c01.png" alt="Brasil" className="w-4 h-4" />
                    <button 
                      onClick={handleWhatsAppBRClick}
                      className="text-apple-blue hover:underline cursor-pointer"
                    >
                      +55 85 99713-1313
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-apple-blue mt-0.5" />
                <div>
                  <p className="font-medium">WhatsApp EUA</p>
                  <div className="flex items-center gap-2">
                    <img src="/lovable-uploads/021b6702-bcbd-47bd-bea1-17cba1b827cd.png" alt="EUA" className="w-4 h-4" />
                    <button 
                      onClick={handleWhatsAppUSAClick}
                      className="text-apple-blue hover:underline cursor-pointer"
                    >
                      +1 407 757-6972
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-apple-blue mt-0.5" />
                <div>
                  <p className="font-medium">Endereço</p>
                  <p className="text-gray-700">
                    2121 South Hiawasse Road<br />
                    Sala 118 Metrowest<br />
                    Orlando FL. Zip Code. 32835
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-2xl font-semibold mb-4 text-center">Atendimento pelo WhatsApp</h3>
              <p className="text-gray-700 mb-6 text-center">
                Prefere conversar pelo WhatsApp? Clique nos botões abaixo para iniciar um chat.
              </p>
              <div className="space-y-3">
                <Button
                  onClick={handleWhatsAppBRClick}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 justify-center"
                >
                  <img src="/lovable-uploads/0bd28f91-d412-4642-ab16-b99584d04c01.png" alt="Brasil" className="w-4 h-4" />
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  WhatsApp BR
                </Button>
                
                <Button
                  onClick={handleWhatsAppUSAClick}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 justify-center"
                >
                  <img src="/lovable-uploads/021b6702-bcbd-47bd-bea1-17cba1b827cd.png" alt="EUA" className="w-4 h-4" />
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  WhatsApp EUA
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
