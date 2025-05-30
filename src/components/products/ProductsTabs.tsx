import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Watch as WatchIcon, Phone as IPhone, Tablet as IPad, Headphones as Airpods, Laptop } from "lucide-react";
import { ProductsList } from "./ProductsList";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string | null;
  details: string | null;
}

interface ProductsData {
  watches: Product[];
  airpods: Product[];
  iphones: Product[];
  ipads: Product[];
  macbooks: Product[];
}

export const ProductsTabs = () => {
  const [products, setProducts] = useState<ProductsData>({
    watches: [],
    airpods: [],
    iphones: [],
    ipads: [],
    macbooks: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Group products by category
      const groupedProducts: ProductsData = {
        watches: [],
        airpods: [],
        iphones: [],
        ipads: [],
        macbooks: []
      };

      data?.forEach((product) => {
        switch (product.category) {
          case 'Apple Watch':
            groupedProducts.watches.push(product);
            break;
          case 'AirPods':
            groupedProducts.airpods.push(product);
            break;
          case 'iPhone':
            groupedProducts.iphones.push(product);
            break;
          case 'iPad':
            groupedProducts.ipads.push(product);
            break;
          case 'MacBook':
            groupedProducts.macbooks.push(product);
            break;
        }
      });

      setProducts(groupedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-lg">Carregando produtos...</div>
      </div>
    );
  }

  return (
    <Tabs defaultValue="iphones" className="w-full">
      <div className="flex flex-col items-center mb-8 space-y-2">
        {/* Primeira linha - 3 botões */}
        <TabsList className="grid grid-cols-3 gap-2 h-auto p-1">
          <TabsTrigger value="iphones" className="flex items-center gap-2">
            <IPhone className="h-5 w-5" />
            <span className="inline">iPhones</span>
          </TabsTrigger>
          <TabsTrigger value="watches" className="flex items-center gap-2">
            <WatchIcon className="h-5 w-5" />
            <span className="inline">Apple Watch</span>
          </TabsTrigger>
          <TabsTrigger value="airpods" className="flex items-center gap-2">
            <Airpods className="h-5 w-5" />
            <span className="inline">AirPods</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Segunda linha - 2 botões */}
        <TabsList className="grid grid-cols-2 gap-2 h-auto p-1">
          <TabsTrigger value="ipads" className="flex items-center gap-2">
            <IPad className="h-5 w-5" />
            <span className="inline">iPads</span>
          </TabsTrigger>
          <TabsTrigger value="macbooks" className="flex items-center gap-2">
            <Laptop className="h-5 w-5" />
            <span className="inline">MacBooks</span>
          </TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="watches" className="mt-4" id="watches">
        <ProductsList products={products.watches} />
      </TabsContent>

      <TabsContent value="airpods" className="mt-4" id="airpods">
        <ProductsList products={products.airpods} />
      </TabsContent>

      <TabsContent value="iphones" className="mt-4" id="iphones">
        <ProductsList products={products.iphones} />
      </TabsContent>

      <TabsContent value="ipads" className="mt-4" id="ipads">
        <ProductsList products={products.ipads} />
      </TabsContent>

      <TabsContent value="macbooks" className="mt-4" id="macbooks">
        <ProductsList products={products.macbooks} />
      </TabsContent>
    </Tabs>
  );
};
