export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface ProductsData {
  watches: Product[];
  airpods: Product[];
  iphones: Product[];
  ipads: Product[];
  macbooks: Product[];
}

export const products: ProductsData = {
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
  ],
  macbooks: [
    {
      id: 14,
      name: "MacBook Air 13\"",
      price: 999,
      image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=600&auto=format&fit=crop",
      category: "MacBook"
    }
  ]
};
