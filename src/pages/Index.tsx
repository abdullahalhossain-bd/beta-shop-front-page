
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
      <div className="w-full py-2 text-white" style={{
      backgroundColor: theme.colors.primary
    }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:justify-between items-center">
            <h2 className="text-xl font-bold">Betagi E-Shop</h2>
            <div className="flex items-center mt-2 sm:mt-0 text-sm">
              <div className="flex items-center mr-4">
                <Phone size={16} className="mr-2" />
                <span>+880-1584013318, +880-1305006515</span>
              </div>
              <div className="flex items-center">
                <Mail size={16} className="mr-2" />
                <span>betagieshop@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
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
