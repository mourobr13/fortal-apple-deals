
import React from "react";
import { ProductsTabs } from "./ProductsTabs";
import { products } from "./ProductsData";

export const ProductsSection = () => {
  return (
    <section id="products" className="py-20 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossos Produtos Apple</h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-8">
            Confira nossas categorias e escolha seu produto Apple!
          </p>
        </div>

        <ProductsTabs products={products} />
      </div>
    </section>
  );
};
