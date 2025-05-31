
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
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
  is_active: boolean;
}

export const useAdminProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    console.log('🔍 Iniciando busca de produtos...');
    setLoadingProducts(true);
    setError(null);
    
    try {
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

  const deleteProduct = async (id: string) => {
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

  const toggleProductActive = async (id: string, currentStatus: boolean) => {
    console.log('🔄 Alterando status do produto:', id, 'de', currentStatus, 'para', !currentStatus);
    
    try {
      const { error } = await supabase
        .from('products')
        .update({ is_active: !currentStatus })
        .eq('id', id);

      if (error) {
        console.error('❌ Erro ao atualizar status:', error);
        throw error;
      }
      
      toast.success(`Produto ${!currentStatus ? 'ativado' : 'desativado'} com sucesso!`);
      fetchProducts();
    } catch (error: any) {
      console.error('💥 Falha ao atualizar status do produto:', error);
      toast.error('Erro ao atualizar status: ' + error.message);
    }
  };

  useEffect(() => {
    console.log('🚀 useAdminProducts inicializado, carregando produtos...');
    fetchProducts();
  }, []);

  return {
    products,
    loadingProducts,
    error,
    fetchProducts,
    deleteProduct,
    toggleProductActive
  };
};
