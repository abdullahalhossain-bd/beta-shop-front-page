
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import Products from "@/components/home/Products";
import Features from "@/components/home/Features";
import CtaBanner from "@/components/home/CtaBanner";
import Team from "@/components/home/Team";
import Newsletter from "@/components/home/Newsletter";
import CartDrawer from "@/components/ui/CartDrawer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Categories />
        <Products />
        <CtaBanner />
        <Features />
        <Team />
        <Newsletter />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default Index;
