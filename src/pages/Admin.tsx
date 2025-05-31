import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { AdminProductForm } from '@/components/admin/AdminProductForm';
import { AdminProductsList } from '@/components/admin/AdminProductsList';
import { LogOut, Plus, RefreshCw, AlertTriangle } from 'lucide-react';
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
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    console.log('🔍 Iniciando busca de produtos...');
    setLoadingProducts(true);
    setError(null);
    
    try {
      // Verificar se há sessão ativa
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      console.log('📝 Sessão atual:', !!session, sessionError);
      
      console.log('🔗 Fazendo query para products...');
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('📊 Resultado da query:', { 
        data: data ? `${data.length} produtos` : 'null', 
        error: error ? error.message : 'sem erro' 
      });

      if (error) {
        console.error('❌ Erro ao buscar produtos:', error);
        setError('Erro ao carregar produtos: ' + error.message);
        toast.error('Erro ao carregar produtos: ' + error.message);
        return;
      }
      
      console.log('✅ Produtos carregados com sucesso:', data?.length || 0);
      setProducts(data || []);
      
      if (data && data.length === 0) {
        console.log('ℹ️ Nenhum produto encontrado no banco');
        toast.info('Nenhum produto encontrado. Adicione o primeiro produto!');
      }
    } catch (error: any) {
      console.error('💥 Erro inesperado ao buscar produtos:', error);
      const errorMessage = 'Erro ao carregar produtos: ' + error.message;
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoadingProducts(false);
      console.log('🏁 Busca de produtos finalizada');
    }
  };

  // Carregar produtos quando component montar
  useEffect(() => {
    console.log('🚀 Admin component montado, iniciando busca de produtos...');
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
  };

  const handleEdit = (product: Product) => {
    console.log('✏️ Editando produto:', product.name);
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    console.log('🗑️ Deletando produto:', id);
    
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('❌ Erro ao deletar:', error);
        throw error;
      }
      
      toast.success('Produto excluído com sucesso!');
      fetchProducts();
    } catch (error: any) {
      console.error('💥 Falha ao deletar produto:', error);
      toast.error('Erro ao excluir produto: ' + error.message);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
            <p className="text-gray-600 mt-2">Gerenciar produtos da loja</p>
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={fetchProducts} 
              variant="outline" 
              disabled={loadingProducts}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loadingProducts ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
            <Button onClick={handleSignOut} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Form Section */}
        {showForm && (
          <div className="mb-8">
            <AdminProductForm
              product={editingProduct}
              onSave={handleProductSaved}
              onCancel={handleCancelForm}
            />
          </div>
        )}

        {/* Products Section */}
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
                onClick={handleAddNew} 
                disabled={showForm}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Novo Produto
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-6">
            {loadingProducts ? (
              <div className="text-center py-12">
                <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
                <div className="text-lg font-medium">Carregando produtos...</div>
                <div className="text-sm text-gray-500 mt-1">Por favor, aguarde</div>
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
  );
};

export default Admin;
