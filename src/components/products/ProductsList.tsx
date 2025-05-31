
import React, { useState } from "react";
import { ProductCard } from "./ProductCard";
import { ProductDetailModal } from "./ProductDetailModal";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string | null;
  details: string | null;
  is_active?: boolean;
}

interface ProductsListProps {
  products: Product[];
}

export const ProductsList = ({ products }: ProductsListProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Filter only active products for the main site
  const activeProducts = products.filter(product => product.is_active !== false);

  // Determine the grid layout based on the number of active products
  const gridCols = activeProducts.length <= 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  
  return (
    <>
      <div className={`grid ${gridCols} gap-6`}>
        {activeProducts.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            category={product.category}
            description={product.description}
            details={product.details}
            onImageClick={() => handleImageClick(product)}
          />
        ))}
      </div>
      
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
};
