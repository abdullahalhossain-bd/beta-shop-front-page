
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

export const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Featured", href: "/featured-products" },
  { name: "FAQs", href: "/faqs" },
];

const Header = () => {
  const cart = useStore((state) => state.cart);
  const clearCart = useStore((state) => state.clearCart);
  const [cartQuantity, setCartQuantity] = useState(0);

  useEffect(() => {
    const totalQuantity = cart.reduce((sum: number, item: Cart) => sum + item.quantity, 0);
    setCartQuantity(totalQuantity);
  }, [cart]);

  const handleClearCart = () => {
    clearCart();
    toast.success("Cart cleared successfully!");
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Betagi E-Shop
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-gray-600 hover:text-gray-800 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="ml-2">Cart</span>
                {cartQuantity > 0 && (
                  <span className="absolute top-[-5px] right-[-5px] bg-red-500 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                    {cartQuantity}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <div>
                  <ul>
                    {cart.map((item) => (
                      <li key={item.id} className="py-2 border-b">
                        {item.name} - Quantity: {item.quantity}
                      </li>
                    ))}
                  </ul>
                  <Button onClick={handleClearCart} variant="destructive" className="mt-4">
                    Clear Cart
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
