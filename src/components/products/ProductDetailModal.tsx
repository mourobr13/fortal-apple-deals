
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
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
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-6">
          <div className="w-full max-w-md mx-auto bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-64 object-contain"
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-blue-600 font-medium uppercase">
                  {product.category}
                </p>
                <h2 className="text-2xl font-bold">{product.name}</h2>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">A partir de</p>
                <p className="text-3xl font-bold text-blue-600">${product.price}</p>
              </div>
            </div>
            
            {product.description && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Descrição</h3>
                <p className="text-gray-700">{product.description}</p>
              </div>
            )}
            
            {product.details && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Características</h3>
                <p className="text-gray-700 whitespace-pre-line">{product.details}</p>
              </div>
            )}
            
            <div className="space-y-3 pt-4">
              <Button
                onClick={handleBuyClickBR}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                size="lg"
              >
                <img src="/lovable-uploads/0bd28f91-d412-4642-ab16-b99584d04c01.png" alt="Brasil" className="w-4 h-4 mr-2" />
                <ShoppingCart className="h-5 w-5 mr-2" />
                Whatsapp BR
              </Button>
              
              <Button
                onClick={handleBuyClickUSA}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                size="lg"
              >
                <img src="/lovable-uploads/021b6702-bcbd-47bd-bea1-17cba1b827cd.png" alt="EUA" className="w-4 h-4 mr-2" />
                <ShoppingCart className="h-5 w-5 mr-2" />
                Whatsapp EUA
              </Button>

              <Button
                onClick={onClose}
                variant="outline"
                size="lg"
                className="w-full"
              >
                <X className="h-5 w-5 mr-2" />
                Fechar
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
