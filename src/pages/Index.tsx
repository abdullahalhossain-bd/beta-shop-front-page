
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

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-center">
            <Link 
              to="/faqs" 
              className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors rounded-lg text-gray-800"
            >
              Frequently Asked Questions
            </Link>
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
    </div>
  );
};

export default Index;
