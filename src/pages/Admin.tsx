
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { ProductForm } from '@/components/admin/ProductForm';
import { ProductsList } from '@/components/admin/ProductsList';
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
}

const Admin = () => {
  const { user, isAdmin, signOut, loading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    if (isAdmin) {
      fetchProducts();
    }
  }, [isAdmin]);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      toast.error('Erro ao carregar produtos');
    } finally {
      setLoadingProducts(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Logout realizado com sucesso!');
    } catch (error: any) {
      toast.error('Erro ao fazer logout');
    }
  };

  const handleProductSaved = () => {
    fetchProducts();
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast.success('Produto excluído com sucesso!');
      fetchProducts();
    } catch (error: any) {
      toast.error('Erro ao excluir produto');
    }
  };

  // Show loading state while checking auth
  if (loading || loadingProducts) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg">Carregando...</div>
      </div>
    );
  }

  // Redirect if not admin - moved after all hooks
  if (!user || !isAdmin) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Painel Administrativo</h1>
          <Button onClick={handleSignOut} variant="outline">
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Gerenciar Produtos</CardTitle>
                <Button 
                  onClick={() => setShowForm(true)}
                  disabled={showForm}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Produto
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {showForm && (
                <div className="mb-6">
                  <ProductForm
                    product={editingProduct}
                    onSave={handleProductSaved}
                    onCancel={() => {
                      setShowForm(false);
                      setEditingProduct(null);
                    }}
                  />
                </div>
              )}
              
              <ProductsList
                products={products}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
