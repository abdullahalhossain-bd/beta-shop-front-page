import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/store";
import { useEffect } from "react";
import { toast } from "sonner";

// Define Cart type inline since @/types is missing
interface Cart {
  id: string;
  name: string;
  quantity: number;
  price: number;
}
export const navigationItems = [{
  name: "Home",
  href: "/"
}, {
  name: "Shop",
  href: "/shop"
}, {
  name: "Featured",
  href: "/featured-products"
}, {
  name: "FAQs",
  href: "/faqs"
}];
const Header = () => {
  const cart = useStore(state => state.cart);
  const clearCart = useStore(state => state.clearCart);
  const [cartQuantity, setCartQuantity] = useState(0);
  useEffect(() => {
    const totalQuantity = cart.reduce((sum: number, item: Cart) => sum + item.quantity, 0);
    setCartQuantity(totalQuantity);
  }, [cart]);
  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared successfully!");
  };
  return <header className="bg-white shadow-md sticky top-0 z-50">
      
    </header>;
};
export default Header;