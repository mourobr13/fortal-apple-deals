
import React from "react";
import { Badge } from "./ui/badge";
import { ArrowRight, Check, DollarSign, Shield, Truck } from "lucide-react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature = ({ icon, title, description }: FeatureProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-full bg-apple-blue/10 text-apple-blue">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export const FeaturesSection = () => {
  return (
    <section className="py-8 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-3 bg-apple-blue/10 text-apple-blue hover:bg-apple-blue/20 px-4 py-1">
            Por que escolher a FortalezaSolutions?
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Produtos Apple Originais e Novos com menor valor de mercado
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Oferecemos a melhor experiência para você adquirir seu produto Apple com segurança, preço imbatível e atendimento premium. Cobrimos qualquer oferta!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          <Feature
            icon={<DollarSign className="h-6 w-6" />}
            title="Preços Oficiais"
            description="Trabalhamos com os valores mais baixos do mercado. Se achar oferta melhor, igualamos para você!"
          />
          
          <Feature
            icon={<Shield className="h-6 w-6" />}
            title="100% Confiável"
            description="Garantimos a autenticidade e procedência de todos os produtos Apple que comercializamos."
          />
          
          <Feature
            icon={<Truck className="h-6 w-6" />}
            title="Entrega VIP"
            description="Entregamos em Orlando e Miami no seu hotel, Airbnb ou residência, sem custos e atendimento em português."
          />
          
          <Feature
            icon={<Check className="h-6 w-6" />}
            title="Suporte Completo"
            description="Oferecemos suporte total antes, durante e após a compra para sua satisfação."
          />
        </div>
      </div>
    </section>
  );
};

