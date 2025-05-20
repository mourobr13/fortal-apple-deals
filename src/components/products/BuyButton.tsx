
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";

interface BuyButtonProps {
  name: string;
  price: number;
}

export const BuyButton = ({ name, price }: BuyButtonProps) => {
  const handleBuyClick = () => {
    const message = `Olá, estou interessado(a) no produto: ${name} por $${price}. Gostaria de mais informações para realizar a compra.`;
    const whatsappLink = `https://wa.me/5585997131313?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <Button
      onClick={handleBuyClick}
      className="w-full bg-apple-blue hover:bg-apple-blue-dark gap-2 rounded-lg py-3 font-semibold text-base text-white shadow-md transition-all"
    >
      <ShoppingCart className="h-4 w-4" />
      Comprar no WhatsApp
    </Button>
  );
};
