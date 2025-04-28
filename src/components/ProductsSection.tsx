import React from "react";
import { ProductCard } from "./ProductCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Watch as WatchIcon, Phone as IPhone, Tablet as IPad, Headphones as Airpods } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const products = {
  watches: [
    {
      id: 1,
      name: "Apple Watch S10 42 mm",
      price: 399,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&auto=format&fit=crop",
      category: "Apple Watch"
    },
    {
      id: 2,
      name: "Apple Watch S10 46 mm",
      price: 429,
      image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?q=80&w=600&auto=format&fit=crop",
      category: "Apple Watch"
    }
  ],
  airpods: [
    {
      id: 3,
      name: "AirPod 4",
      price: 179,
      image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?q=80&w=600&auto=format&fit=crop",
      category: "AirPods"
    },
    {
      id: 4,
      name: "AirPod 3",
      price: 149,
      image: "https://images.unsplash.com/photo-1638430079585-8c6f2754c8f8?q=80&w=600&auto=format&fit=crop",
      category: "AirPods"
    },
    {
      id: 5,
      name: "AirPod Pro",
      price: 249,
      image: "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?q=80&w=600&auto=format&fit=crop",
      category: "AirPods"
    }
  ],
  iphones: [
    {
      id: 6,
      name: "iPhone 16e 256 GB White",
      price: 799,
      image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?q=80&w=600&auto=format&fit=crop",
      category: "iPhone"
    },
    {
      id: 7,
      name: "iPhone 16 Pro 128 GB Desert",
      price: 999,
      image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a?q=80&w=600&auto=format&fit=crop",
      category: "iPhone"
    },
    {
      id: 8,
      name: "iPhone 16 Pro 256 GB",
      price: 1099,
      image: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=600&auto=format&fit=crop",
      category: "iPhone"
    },
    {
      id: 9,
      name: "iPhone 16 Pro 512 GB",
      price: 1299,
      image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=600&auto=format&fit=crop",
      category: "iPhone"
    },
    {
      id: 10,
      name: "iPhone 16 Pro Max 256 GB Natural",
      price: 1199,
      image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?q=80&w=600&auto=format&fit=crop",
      category: "iPhone"
    },
    {
      id: 11,
      name: "iPhone 16 Pro Max 256 GB Desert",
      price: 1199,
      image: "https://images.unsplash.com/photo-1709306413255-2fff2dc4277a?q=80&w=600&auto=format&fit=crop",
      category: "iPhone"
    }
  ],
  ipads: [
    {
      id: 12,
      name: "iPad 11",
      price: 599,
      image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=600&auto=format&fit=crop",
      category: "iPad"
    },
    {
      id: 13,
      name: "iPad 10",
      price: 449,
      image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=600&auto=format&fit=crop",
      category: "iPad"
    }
  ]
};

export const ProductsSection = () => {
  const isMobile = useIsMobile();

  return (
    <section id="products" className="py-20 px-4 md:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossos Produtos Apple</h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-8">
            Confira nossas categorias e escolha seu produto Apple!
          </p>
        </div>

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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
              {products.watches.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  category={product.category}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="airpods" className="mt-4" id="airpods">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.airpods.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  category={product.category}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="iphones" className="mt-4" id="iphones">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.iphones.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  category={product.category}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ipads" className="mt-4" id="ipads">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {products.ipads.map((product) => (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  category={product.category}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
