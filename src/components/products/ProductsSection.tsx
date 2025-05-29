
import React from "react";
import { ProductsTabs } from "./ProductsTabs";

export const ProductsSection = () => {
  return (
    <section className="py-20 bg-gray-50" id="produtos">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Nossos Produtos Apple</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Descubra nossa seleção completa de produtos Apple. Desde iPhones até MacBooks, 
            temos tudo que você precisa para se manter conectado e produtivo.
          </p>
        </div>
        
        <ProductsTabs />
      </div>
    </section>
  );
};
