
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";

interface PurchaseButtonsProps {
  name: string;
  price: number;
}

export const PurchaseButtons = ({ name, price }: PurchaseButtonsProps) => {
  const handleBuyClickBR = () => {
    const message = `Olá, estou interessado(a) no produto: ${name} por $${price}. Gostaria de mais informações para realizar a compra.`;
    const whatsappLink = `https://wa.me/5585997131313?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  };

  const handleBuyClickUSA = () => {
    const message = `Hello, I'm interested in the product: ${name} for $${price}. I would like more information to make the purchase.`;
    const whatsappLink = `https://wa.me/14077576972?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="space-y-2">
      <Button
        onClick={handleBuyClickBR}
        className="w-full bg-green-600 hover:bg-green-700 gap-2 rounded-lg py-3 font-semibold text-base text-white shadow-md transition-all"
      >
        <img src="/lovable-uploads/0bd28f91-d412-4642-ab16-b99584d04c01.png" alt="Brasil" className="w-4 h-4" />
        <ShoppingCart className="h-4 w-4" />
        Compra Whats BR
      </Button>
      
      <Button
        onClick={handleBuyClickUSA}
        className="w-full bg-blue-600 hover:bg-blue-700 gap-2 rounded-lg py-3 font-semibold text-base text-white shadow-md transition-all"
      >
        <img src="/lovable-uploads/021b6702-bcbd-47bd-bea1-17cba1b827cd.png" alt="EUA" className="w-4 h-4" />
        <ShoppingCart className="h-4 w-4" />
        Compra Whats EUA
      </Button>
    </div>
  );
};
