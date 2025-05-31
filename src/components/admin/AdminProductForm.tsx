
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log('Submitting product:', product ? 'update' : 'create');

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
        // Atualizar produto existente
        const { error } = await supabase
          .from('products')
          .update(productData)
          .eq('id', product.id);

        if (error) throw error;
        console.log('Product updated successfully');
      } else {
        // Criar novo produto
        const { error } = await supabase
          .from('products')
          .insert([productData]);

        if (error) throw error;
        console.log('Product created successfully');
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          {product ? 'Editar Produto' : 'Novo Produto'}
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Nome do Produto *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Ex: iPhone 15 Pro"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="price">Preço ($) *</Label>
          <Input
            id="price"
            type="number"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            placeholder="999.99"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="category">Categoria *</Label>
        <Select 
          value={formData.category} 
          onValueChange={(value) => setFormData({ ...formData, category: value })}
        >
          <SelectTrigger>
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
        <Label htmlFor="image">URL da Imagem *</Label>
        <Input
          id="image"
          type="url"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="https://exemplo.com/imagem.jpg"
          required
        />
      </div>

      <div>
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Descrição breve do produto..."
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="details">Detalhes Técnicos</Label>
        <Textarea
          id="details"
          value={formData.details}
          onChange={(e) => setFormData({ ...formData, details: e.target.value })}
          placeholder="Especificações técnicas detalhadas..."
          rows={4}
        />
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" disabled={loading}>
          {loading ? 'Salvando...' : 'Salvar'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
};
