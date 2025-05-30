
import React from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FeaturesSection } from "@/components/FeaturesSection";
import { SistematicaSection } from "@/components/SistematicaSection";
import { ProductsSection } from "@/components/products/ProductsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main>
        <Hero />
        <FeaturesSection />
        <SistematicaSection />
        <ProductsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
