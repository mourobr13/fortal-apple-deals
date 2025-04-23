
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Mail, Phone } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import React, { useState } from "react";

export const ContactSection = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleWhatsAppClick = () => {
    const message = "Olá, estou interessado em produtos Apple da FortalezaSolutions. Poderia me ajudar?";
    const whatsappLink = `https://wa.me/5585997131313?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const name = formData.get('name');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const message = formData.get('message');

    const mailto = `mailto:contato@fortalezasolutions.com.br?subject=Contato FortalezaSolutions&body=Nome: ${name}%0DE-mail: ${email}%0DTelefone: ${phone}%0DMensagem: ${message}`;
    window.location.href = mailto;

    setTimeout(() => {
      toast({
        title: "Mensagem iniciada!",
        description: "Seu cliente de e-mail abrirá uma nova mensagem.",
        duration: 4000,
      });
      setLoading(false);
      form.reset();
    }, 1000);
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
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Nome completo
                </label>
                <Input id="name" name="name" placeholder="Seu nome" required />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  E-mail
                </label>
                <Input id="email" name="email" type="email" placeholder="seu@email.com" required />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Telefone
                </label>
                <Input id="phone" name="phone" placeholder="(85) 99713-1313" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Mensagem
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Como podemos ajudar?"
                  className="min-h-[120px]"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-apple-blue hover:bg-apple-blue-dark" disabled={loading}>
                {loading ? "Enviando..." : "Enviar mensagem"}
              </Button>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-8">
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
                    <p className="font-medium">Telefone</p>
                    <a href="tel:+5585997131313" className="text-apple-blue hover:underline">
                      +55 85 99713-1313
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <svg className="w-6 h-6 text-apple-blue mt-0.5" viewBox="0 0 24 24" fill="none"><path d="M20 10v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V10" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/><path d="M9 21h6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/><path d="M9 3h6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/><rect x="3" y="3" width="18" height="7" rx="2" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <div>
                    <p className="font-medium">Entregas</p>
                    <p className="text-gray-600">
                      Entregas em Orlando e Miami diretamente no seu hotel, Airbnb etc, sem custos e com atendimento em português.
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

