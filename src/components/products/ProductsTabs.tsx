
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Watch as WatchIcon, Phone as IPhone, Tablet as IPad, Headphones as Airpods } from "lucide-react";
import { ProductsList } from "./ProductsList";
import { Product } from "./ProductsData";

interface ProductsTabsProps {
  products: {
    watches: Product[];
    airpods: Product[];
    iphones: Product[];
    ipads: Product[];
  };
}

export const ProductsTabs = ({ products }: ProductsTabsProps) => {
  return (
    <Tabs defaultValue="iphones" className="w-full">
      <div className="flex justify-center mb-8">
        <TabsList>
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
          <TabsTrigger value="ipads" className="flex items-center gap-2">
            <IPad className="h-5 w-5" />
            <span className="inline">iPads</span>
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
    </Tabs>
  );
};
