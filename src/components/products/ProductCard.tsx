
import { Card, CardContent } from "../ui/card";
import { ProductImage } from "./ProductImage";
import { ProductInfo } from "./ProductInfo";
import { PurchaseButtons } from "./PurchaseButtons";

interface ProductCardProps {
  name: string;
  price: number;
  image: string;
  category: string;
  description: string | null;
  details: string | null;
  onImageClick?: () => void;
}

export const ProductCard = ({ 
  name, 
  price, 
  image, 
  category, 
  description, 
  details, 
  onImageClick 
}: ProductCardProps) => {
  return (
    <Card className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div onClick={onImageClick} className="cursor-pointer">
        <ProductImage image={image} name={name} />
      </div>
      <CardContent className="p-6">
        <ProductInfo name={name} category={category} price={price} />
        <div className="mt-4">
          <PurchaseButtons name={name} price={price} />
        </div>
      </CardContent>
    </Card>
  );
};
