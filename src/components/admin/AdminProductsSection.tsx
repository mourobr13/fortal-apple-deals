
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminProductsList } from './AdminProductsList';
import { Plus, RefreshCw } from 'lucide-react';

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

interface AdminProductsSectionProps {
  products: Product[];
  isLoading: boolean;
  showForm: boolean;
  onAddNew: () => void;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onToggleActive: (id: string, currentStatus: boolean) => void;
}

export const AdminProductsSection = ({ 
  products, 
  isLoading, 
  showForm, 
  onAddNew, 
  onEdit, 
  onDelete,
  onToggleActive
}: AdminProductsSectionProps) => {
  return (
    <Card className="shadow-lg">
      <CardHeader className="bg-white border-b">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <CardTitle className="text-xl">Produtos Cadastrados</CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              {products.length} produto{products.length !== 1 ? 's' : ''} cadastrado{products.length !== 1 ? 's' : ''}
            </p>
          </div>
          <Button 
            onClick={onAddNew} 
            disabled={showForm}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Produto
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        {isLoading ? (
          <div className="text-center py-12">
            <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
            <div className="text-lg font-medium">Carregando produtos...</div>
            <div className="text-sm text-gray-500 mt-1">Por favor, aguarde</div>
          </div>
        ) : (
          <AdminProductsList
            products={products}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleActive={onToggleActive}
          />
        )}
      </CardContent>
    </Card>
  );
};
