
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { AdminProductForm } from '@/components/admin/AdminProductForm';
import { AdminProductsList } from '@/components/admin/AdminProductsList';
import { LogOut, Plus } from 'lucide-react';
import { toast } from 'sonner';

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
}

const Admin = () => {
  const { signOut } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);

  const fetchProducts = async () => {
    console.log('Fetching products...');
    setLoadingProducts(true);
    
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        toast.error('Erro ao carregar produtos');
        return;
      }
      
      console.log('Products loaded:', data?.length);
      setProducts(data || []);
    } catch (error: any) {
      console.error('Failed to fetch products:', error);
      toast.error('Erro ao carregar produtos');
    } finally {
      setLoadingProducts(false);
    }
  };

  // Carregar produtos quando component montar
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Logout realizado com sucesso!');
      window.location.href = '/auth';
    } catch (error: any) {
      console.error('Logout error:', error);
      toast.error('Erro ao fazer logout');
    }
  };

  const handleProductSaved = () => {
    fetchProducts();
    setShowForm(false);
    setEditingProduct(null);
    toast.success('Produto salvo com sucesso!');
  };

  const handleEdit = (product: Product) => {
    console.log('Editing product:', product.name);
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    console.log('Deleting product:', id);
    
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Delete error:', error);
        throw error;
      }
      
      toast.success('Produto excluído com sucesso!');
      fetchProducts();
    } catch (error: any) {
      console.error('Failed to delete product:', error);
      toast.error('Erro ao excluir produto');
    }
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Painel Administrativo</h1>
            <p className="text-gray-600 mt-1">Gerenciar produtos da loja</p>
          </div>
          <Button onClick={handleSignOut} variant="outline">
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Produtos</CardTitle>
                <Button onClick={handleAddNew} disabled={showForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Produto
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {showForm && (
                <div className="mb-6 p-4 border rounded-lg bg-white">
                  <AdminProductForm
                    product={editingProduct}
                    onSave={handleProductSaved}
                    onCancel={handleCancelForm}
                  />
                </div>
              )}
              
              {loadingProducts ? (
                <div className="text-center py-8">
                  <div className="text-lg">Carregando produtos...</div>
                </div>
              ) : (
                <AdminProductsList
                  products={products}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
