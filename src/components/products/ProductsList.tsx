
import React from "react";
import { ProductCard } from "./ProductCard";
import { Product } from "./ProductsData";

interface ProductsListProps {
  products: Product[];
}

export const ProductsList = ({ products }: ProductsListProps) => {
  // Determine the grid layout based on the number of products
  const gridCols = products.length <= 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  
  return (
    <div className={`grid ${gridCols} gap-6`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          category={product.category}
        />
      ))}
    </div>
  );
};
