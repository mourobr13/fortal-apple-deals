
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { ImageUpload } from './ImageUpload';
import { Save, X, Globe } from 'lucide-react';
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

interface AdminProductFormProps {
  product?: Product | null;
  onSave: () => void;
  onCancel: () => void;
}

export const AdminProductForm = ({ product, onSave, onCancel }: AdminProductFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    category: '',
    description: '',
    details: ''
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        image: product.image,
        category: product.category,
        description: product.description || '',
        details: product.details || ''
      });
    } else {
      setFormData({
        name: '',
        price: '',
        image: '',
        category: '',
        description: '',
        details: ''
      });
    }
  }, [product]);

  const validateForm = () => {
    // Required field validation
    if (!formData.name.trim()) {
      toast.error('Nome do produto é obrigatório');
      return false;
    }
    if (!formData.price) {
      toast.error('Preço é obrigatório');
      return false;
    }
    if (!formData.category) {
      toast.error('Categoria é obrigatória');
      return false;
    }
    if (!formData.image) {
      toast.error('Imagem é obrigatória');
      return false;
    }

    // Length validation
    if (formData.name.trim().length > 200) {
      toast.error('Nome do produto deve ter no máximo 200 caracteres');
      return false;
    }
    if (formData.description && formData.description.length > 1000) {
      toast.error('Descrição deve ter no máximo 1000 caracteres');
      return false;
    }
    if (formData.details && formData.details.length > 2000) {
      toast.error('Detalhes devem ter no máximo 2000 caracteres');
      return false;
    }

    // Price validation
    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      toast.error('Preço deve ser um número positivo');
      return false;
    }

    // URL validation for image
    try {
      new URL(formData.image);
    } catch {
      toast.error('URL da imagem inválida');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const productData = {
        name: formData.name.trim(),
        price: parseFloat(formData.price),
        image: formData.image.trim(),
        category: formData.category,
        description: formData.description.trim() || null,
        details: formData.details.trim() || null
      };

      if (product) {
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', product.id);

        if (error) throw error;
        toast.success('Produto atualizado com sucesso!');
      } else {
        const { error } = await supabase
          .from('products')
          .insert([productData]);

        if (error) throw error;
        toast.success('Produto criado com sucesso!');
      }

      onSave();
    } catch (error: any) {
      console.error('Form submission error:', error);
      toast.error('Erro ao salvar produto: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['iPhone', 'iPad', 'MacBook', 'Apple Watch', 'AirPods'];

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">
            {product ? 'Editar Produto' : 'Novo Produto'}
          </CardTitle>
          <Button variant="outline" size="sm" onClick={onCancel}>
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Informações Básicas</TabsTrigger>
              <TabsTrigger value="image">Imagem</TabsTrigger>
              <TabsTrigger value="details">Detalhes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">
                    Nome do Produto *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: iPhone 15 Pro"
                    className="mt-1"
                    required
                    maxLength={200}
                  />
                </div>
                
                <div>
                  <Label htmlFor="price" className="text-sm font-medium">
                    Preço ($) *
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="999.99"
                    className="mt-1"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="category" className="text-sm font-medium">
                  Categoria *
                </Label>
                <Select 
                  value={formData.category} 
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-medium">
                  Descrição
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descrição breve do produto..."
                  rows={3}
                  className="mt-1"
                  maxLength={1000}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="image" className="space-y-4 mt-6">
              <ImageUpload
                currentImage={formData.image}
                onImageUploaded={(url) => setFormData({ ...formData, image: url })}
                onRemoveImage={() => setFormData({ ...formData, image: '' })}
              />
              
              <div className="mt-4">
                <Label htmlFor="image-url" className="text-sm font-medium">
                  Ou cole uma URL de imagem
                </Label>
                <div className="flex gap-2 mt-1">
                  <Globe className="h-4 w-4 text-gray-400 mt-3" />
                  <Input
                    id="image-url"
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://exemplo.com/imagem.jpg"
                  />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="details" className="space-y-4 mt-6">
              <div>
                <Label htmlFor="details" className="text-sm font-medium">
                  Detalhes Técnicos
                </Label>
                <Textarea
                  id="details"
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Especificações técnicas detalhadas..."
                  rows={6}
                  className="mt-1"
                  maxLength={2000}
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex gap-3 pt-6 border-t">
            <Button 
              type="submit" 
              disabled={loading}
              className="flex-1 md:flex-none md:px-8"
            >
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Salvando...' : 'Salvar Produto'}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              className="flex-1 md:flex-none md:px-8"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
