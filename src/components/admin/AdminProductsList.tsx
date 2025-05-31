
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Edit, Trash2, Package, Calendar } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string | null;
  details: string | null;
  created_at: string;
  updated_at: string;
  is_active: boolean;
}

interface AdminProductsListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onToggleActive: (id: string, currentStatus: boolean) => void;
}

export const AdminProductsList = ({ products, onEdit, onDelete, onToggleActive }: AdminProductsListProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <div className="text-gray-500 text-xl mb-2 font-medium">Nenhum produto encontrado</div>
        <div className="text-gray-400 text-base">
          Clique em "Novo Produto" para adicionar o primeiro produto
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <div className="space-y-4">      
      {products.map((product) => (
        <Card key={product.id} className={`hover:shadow-lg transition-all duration-200 border-l-4 ${product.is_active ? 'border-l-blue-500' : 'border-l-gray-400 opacity-60'}`}>
          <CardContent className="p-6">
            <div className="flex gap-4">
              {/* Product Image */}
              <div className="flex-shrink-0">
                <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-24 h-24 object-cover transition-transform hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder.svg';
                    }}
                  />
                  {!product.is_active && (
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                      <span className="text-white text-xs font-medium">INATIVO</span>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1 mr-4">
                    <h3 className={`font-semibold text-lg truncate mb-1 ${product.is_active ? 'text-gray-900' : 'text-gray-500'}`}>
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-3 mb-2">
                      <Badge variant={product.is_active ? "secondary" : "outline"} className={product.is_active ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-500"}>
                        {product.category}
                      </Badge>
                      <span className={`font-bold text-xl ${product.is_active ? 'text-green-600' : 'text-gray-500'}`}>
                        {formatPrice(product.price)}
                      </span>
                      {!product.is_active && (
                        <Badge variant="destructive" className="bg-red-100 text-red-800">
                          Inativo
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        checked={product.is_active}
                        onCheckedChange={() => onToggleActive(product.id, product.is_active)}
                        className="h-5 w-5"
                      />
                      <span className="text-sm text-gray-600">Ativo</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onEdit(product)}
                        className="hover:bg-blue-50 hover:border-blue-300"
                        title="Editar produto"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => onDelete(product.id)}
                        className="hover:bg-red-600"
                        title="Excluir produto"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Description */}
                {product.description && (
                  <p className={`text-sm mb-3 line-clamp-2 leading-relaxed ${product.is_active ? 'text-gray-700' : 'text-gray-500'}`}>
                    {product.description}
                  </p>
                )}
                
                {/* Metadata */}
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>Criado: {formatDate(product.created_at)}</span>
                  </div>
                  {product.updated_at !== product.created_at && (
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      <span>Atualizado: {formatDate(product.updated_at)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
