
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
  const { signOut, user, loading: authLoading } = useAuth();
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
      console.log('📝 Sessão atual:', {
        hasSession: !!session,
        hasUser: !!session?.user,
        sessionError: sessionError?.message || 'nenhum erro'
      });
      
      console.log('🔗 Fazendo query para products...');
      
      const { data, error, status, statusText } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      console.log('📊 Resultado da query:', { 
        data: data ? `${data.length} produtos encontrados` : 'data é null',
        error: error ? `${error.code}: ${error.message}` : 'sem erro',
        status: status,
        statusText: statusText
      });

      if (error) {
        console.error('❌ Erro detalhado:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        });
        
        const errorMessage = `Erro ao carregar produtos: ${error.message} (Código: ${error.code})`;
        setError(errorMessage);
        toast.error(errorMessage);
        return;
      }
      
      if (!data) {
        console.log('⚠️ Data é null mas sem erro');
        setProducts([]);
        toast.info('Nenhum produto encontrado no banco de dados');
        return;
      }
      
      console.log('✅ Produtos carregados com sucesso:', data.length);
      console.log('📦 Dados dos produtos:', data);
      setProducts(data);
      
      if (data.length === 0) {
        console.log('ℹ️ Array vazio - nenhum produto cadastrado');
        toast.info('Nenhum produto encontrado. Adicione o primeiro produto!');
      } else {
        toast.success(`${data.length} produto(s) carregado(s) com sucesso!`);
      }
    } catch (error: any) {
      console.error('💥 Erro inesperado ao buscar produtos:', {
        name: error.name,
        message: error.message,
        stack: error.stack
      });
      const errorMessage = `Erro inesperado: ${error.message}`;
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoadingProducts(false);
      console.log('🏁 Busca de produtos finalizada');
    }
  };

  // Aguardar autenticação antes de carregar produtos
  useEffect(() => {
    if (authLoading) {
      console.log('⏳ Aguardando autenticação...');
      return;
    }
    
    console.log('🚀 Admin component pronto, iniciando busca de produtos...');
    console.log('👤 Estado do usuário:', { 
      hasUser: !!user, 
      userId: user?.id,
      userEmail: user?.email 
    });
    
    fetchProducts();
  }, [authLoading, user]);

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
    console.log('🔄 Produto salvo, recarregando lista...');
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

  // Mostrar loading enquanto autentica
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-blue-600" />
          <div className="text-lg font-medium">Verificando autenticação...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Painel Administrativo</h1>
            <p className="text-gray-600 mt-2">Gerenciar produtos da loja</p>
            {user && (
              <p className="text-sm text-gray-500 mt-1">
                Logado como: {user.email}
              </p>
            )}
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
              <div className="font-medium mb-1">Erro detectado:</div>
              {error}
              <div className="mt-2">
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={fetchProducts}
                  className="text-xs"
                >
                  Tentar novamente
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Debug Info */}
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <div className="text-sm text-blue-800">
              <div className="font-medium mb-2">🔍 Informações de Debug:</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <strong>Autenticação:</strong> {user ? 'Logado' : 'Não logado'}
                </div>
                <div>
                  <strong>Produtos:</strong> {products.length} carregados
                </div>
                <div>
                  <strong>Status:</strong> {loadingProducts ? 'Carregando...' : 'Pronto'}
                </div>
              </div>
              <div className="mt-2 text-xs text-blue-600">
                Abra o Console do navegador (F12) para ver logs detalhados
              </div>
            </div>
          </CardContent>
        </Card>

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
