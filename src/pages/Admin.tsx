
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useAdminProducts } from '@/hooks/useAdminProducts';
import { AdminProductForm } from '@/components/admin/AdminProductForm';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { AdminErrorAlert } from '@/components/admin/AdminErrorAlert';
import { AdminDebugInfo } from '@/components/admin/AdminDebugInfo';
import { AdminProductsSection } from '@/components/admin/AdminProductsSection';
import { ProtectedRoute } from '@/components/ProtectedRoute';
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

const AdminContent = () => {
  const { signOut, user } = useAuth();
  const { products, loadingProducts, error, fetchProducts, deleteProduct } = useAdminProducts();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

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
        <AdminHeader
          userEmail={user?.email}
          onSignOut={handleSignOut}
          onRefresh={fetchProducts}
          isLoading={loadingProducts}
        />

        {error && (
          <AdminErrorAlert
            error={error}
            onRetry={fetchProducts}
          />
        )}

        <AdminDebugInfo
          isAuthenticated={!!user}
          productsCount={products.length}
          isLoading={loadingProducts}
        />

        {showForm && (
          <div className="mb-8">
            <AdminProductForm
              product={editingProduct}
              onSave={handleProductSaved}
              onCancel={handleCancelForm}
            />
          </div>
        )}

        <AdminProductsSection
          products={products}
          isLoading={loadingProducts}
          showForm={showForm}
          onAddNew={handleAddNew}
          onEdit={handleEdit}
          onDelete={deleteProduct}
        />
      </div>
    </div>
  );
};

const Admin = () => {
  return (
    <ProtectedRoute requireAdmin={true}>
      <AdminContent />
    </ProtectedRoute>
  );
};

export default Admin;
