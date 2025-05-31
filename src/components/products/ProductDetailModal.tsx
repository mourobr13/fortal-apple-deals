
import React from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ShoppingCart, X } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string | null;
  details: string | null;
}

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ProductDetailModal = ({ product, isOpen, onClose }: ProductDetailModalProps) => {
  if (!product) return null;

  const handleBuyClickBR = () => {
    const message = `Olá, estou interessado(a) no produto: ${product.name} por $${product.price}. Gostaria de mais informações para realizar a compra.`;
    const whatsappLink = `https://wa.me/5585997131313?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  };

  const handleBuyClickUSA = () => {
    const message = `Olá, estou interessado(a) no produto: ${product.name} por $${product.price}. Gostaria de mais informações para realizar a compra.`;
    const whatsappLink = `https://wa.me/14077576972?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <div className="grid gap-4">
          <div className="w-full max-w-sm mx-auto bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-48 object-contain"
            />
          </div>
          
          <div className="space-y-3">
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-500">A partir de</p>
              <p className="text-2xl font-bold text-blue-600">${product.price}</p>
            </div>
            
            {product.description && (
              <div>
                <p className="text-gray-700 text-sm">{product.description}</p>
              </div>
            )}
            
            {product.details && (
              <div>
                <h3 className="text-base font-semibold mb-1">Características</h3>
                <p className="text-gray-700 text-sm whitespace-pre-line">{product.details}</p>
              </div>
            )}
            
            <div className="space-y-2 pt-3">
              <Button
                onClick={handleBuyClickBR}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                size="default"
              >
                <img src="/lovable-uploads/0bd28f91-d412-4642-ab16-b99584d04c01.png" alt="Brasil" className="w-4 h-4 mr-2" />
                <ShoppingCart className="h-4 w-4 mr-2" />
                Whatsapp BR
              </Button>
              
              <Button
                onClick={handleBuyClickUSA}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                size="default"
              >
                <img src="/lovable-uploads/021b6702-bcbd-47bd-bea1-17cba1b827cd.png" alt="EUA" className="w-4 h-4 mr-2" />
                <ShoppingCart className="h-4 w-4 mr-2" />
                Whatsapp EUA
              </Button>

              <Button
                onClick={onClose}
                variant="outline"
                size="default"
                className="w-full"
              >
                <X className="h-4 w-4 mr-2" />
                Fechar
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
