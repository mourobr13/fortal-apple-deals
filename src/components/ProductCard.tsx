
import { Button } from "./ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  category: string;
}

export const ProductCard = ({ name, price, image, category }: ProductCardProps) => {
  const handleBuyClick = () => {
    const message = `Olá, estou interessado(a) no produto: ${name} por $${price}. Gostaria de mais informações para realizar a compra.`;
    const whatsappLink = `https://wa.me/5585997131313?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-square p-6 flex items-center justify-center bg-apple-gray-light">
        <img src={image} alt={name} className="max-h-full object-contain" />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="text-sm text-apple-blue mb-1 uppercase font-medium">{category}</p>
            <h3 className="font-semibold text-xl">{name}</h3>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 mb-1">À partir de</p>
            <p className="font-bold text-xl">${price}</p>
          </div>
        </div>
        <div className="mt-4">
          <Button
            onClick={handleBuyClick}
            className="w-full bg-apple-blue hover:bg-apple-blue-dark gap-2 rounded-lg py-3 font-semibold text-base text-white shadow-md transition-all"
          >
            <ShoppingCart className="h-4 w-4" />
            Comprar no WhatsApp
          </Button>
        </div>
      </div>
    </div>
  );
};
