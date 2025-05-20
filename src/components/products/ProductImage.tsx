
import { AspectRatio } from "../ui/aspect-ratio";

interface ProductImageProps {
  image: string;
  name: string;
}

export const ProductImage = ({ image, name }: ProductImageProps) => {
  return (
    <div className="p-6 bg-apple-gray-light">
      <AspectRatio ratio={1/1} className="flex items-center justify-center">
        <img 
          src={image} 
          alt={name} 
          className="max-h-full object-contain rounded-lg shadow-sm" 
        />
      </AspectRatio>
    </div>
  );
};
