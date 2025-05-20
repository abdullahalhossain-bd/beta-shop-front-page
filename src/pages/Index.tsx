
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import Features from "@/components/home/Features";
import Team from "@/components/home/Team";
import Newsletter from "@/components/home/Newsletter";
import CtaBanner from "@/components/home/CtaBanner";
import CartDrawer from "@/components/ui/CartDrawer";
import { Link } from "react-router-dom";
import { theme } from "@/lib/theme";
import { Phone, Mail } from "lucide-react";

const Index = () => {
  return <div className="min-h-screen flex flex-col">
      {/* Blue banner is now part of Header component */}
      <Header />
      <main className="flex-grow">
        <Hero />
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-center">
            
          </div>
        </div>
        <Categories />
        <Features />
        <CtaBanner />
        <Team />
        <Newsletter />
      </main>
      <Footer />
      <CartDrawer />
    </div>;
};
export default Index;
