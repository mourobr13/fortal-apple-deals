
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

export const ContactSection = () => {
  const handleWhatsAppClick = () => {
    const message = "Olá, estou interessado em produtos Apple da FortalSolutions. Poderia me ajudar?";
    const whatsappLink = `https://wa.me/558491234567?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert("Mensagem enviada! Entraremos em contato em breve.");
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-2xl shadow-md">
            <h3 className="text-2xl font-semibold mb-6">Envie uma mensagem</h3>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Nome completo
                  </label>
                  <Input id="name" placeholder="Seu nome" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    E-mail
                  </label>
                  <Input id="email" type="email" placeholder="seu@email.com" required />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-1">
                    Telefone
                  </label>
                  <Input id="phone" placeholder="(84) 9XXXX-XXXX" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Mensagem
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Como podemos ajudar?"
                    className="min-h-[120px]"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-apple-blue hover:bg-apple-blue-dark">
                  Enviar mensagem
                </Button>
              </div>
            </form>
          </div>

          <div className="flex flex-col justify-between gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-md">
              <h3 className="text-2xl font-semibold mb-6">Informações de contato</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-apple-blue mt-0.5" />
                  <div>
                    <p className="font-medium">E-mail</p>
                    <a href="mailto:contato@fortalsolutions.com" className="text-apple-blue hover:underline">
                      contato@fortalsolutions.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-apple-blue mt-0.5" />
                  <div>
                    <p className="font-medium">Telefone</p>
                    <a href="tel:+5584912345678" className="text-apple-blue hover:underline">
                      +55 84 9XXXX-XXXX
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-apple-blue mt-0.5" />
                  <div>
                    <p className="font-medium">Endereço</p>
                    <p className="text-gray-600">
                      Av. Exemplo, 123 - Fortaleza, CE
                      <br />
                      CEP: 60000-000
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-md text-center">
              <h3 className="text-2xl font-semibold mb-4">Atendimento pelo WhatsApp</h3>
              <p className="text-gray-700 mb-6">
                Prefere conversar pelo WhatsApp? Clique no botão abaixo para iniciar um chat.
              </p>
              <Button
                onClick={handleWhatsAppClick}
                className="w-full bg-[#25D366] hover:bg-[#20BD5C] flex items-center gap-2 justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Entre em contato agora!
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
