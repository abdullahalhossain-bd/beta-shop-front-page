
import { useState } from "react";
import { ShoppingCart, Heart, User, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "@/lib/store";
import { Badge } from "@/components/ui/badge";
import { theme } from "@/lib/theme";
import { Link } from "react-router-dom";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { cartOpen, toggleCart, getCartItemCount, getWishlistCount } = useStore();
  const cartCount = getCartItemCount();
  const wishlistCount = getWishlistCount();

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Header */}
      <div className="w-full py-2" style={{ backgroundColor: theme.colors.primary, color: "white" }}>
        <div className="container mx-auto px-4 flex justify-between items-center flex-col sm:flex-row gap-2">
          <div className="flex items-center text-sm">
            <span className="mr-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-1">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              +880 1584-013318 +880 1305-006515
            </span>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-1">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              betagieshop@gmail.com
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/account" className="hover:text-[#e0b3ff] transition-colors">
              <User className="inline-block mr-1 h-4 w-4" /> Account
            </Link>
            <Link to="/wishlist" className="hover:text-[#e0b3ff] transition-colors">
              <Heart className="inline-block mr-1 h-4 w-4" /> Wishlist
            </Link>
            <Link to="/track-order" className="hover:text-[#e0b3ff] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block mr-1">
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
              Track Order
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold" style={{ color: theme.colors.primary }}>
                <ShoppingCart className="inline-block mr-2" style={{ color: theme.colors.secondary }} />
                Betagi E-Shop
              </Link>
            </div>

            <div className="order-3 w-full lg:w-auto lg:order-none lg:flex-1 px-4 max-w-md mx-auto">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for products..."
                  className="pl-3 pr-10 py-2 w-full rounded-full border-2 focus-visible:ring-[#6a0dad]"
                />
                <Button
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full w-8 h-8"
                  style={{ backgroundColor: theme.colors.secondary }}
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <button className="relative">
                <Heart className="h-6 w-6 text-gray-700 hover:text-[#6a0dad]" />
                {wishlistCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs" style={{ backgroundColor: theme.colors.danger }}>
                    {wishlistCount}
                  </Badge>
                )}
              </button>

              <button className="relative" onClick={toggleCart}>
                <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-[#6a0dad]" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs" style={{ backgroundColor: theme.colors.danger }}>
                    {cartCount}
                  </Badge>
                )}
              </button>

              <button>
                <User className="h-6 w-6 text-gray-700 hover:text-[#6a0dad]" />
              </button>

              <Button 
                variant="ghost" 
                size="icon" 
                className="lg:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-y border-gray-200">
        <div className="container mx-auto px-4">
          <ul className={`${mobileMenuOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row justify-center py-0 lg:py-4 text-gray-800`}>
            <li>
              <Link to="/" className="block py-3 px-4 hover:text-[#6a0dad] font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#6a0dad] after:transition-all">Home</Link>
            </li>
            <li>
              <Link to="/shop" className="block py-3 px-4 hover:text-[#6a0dad] font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#6a0dad] after:transition-all">Shop</Link>
            </li>
            <li>
              <Link to="/categories" className="block py-3 px-4 hover:text-[#6a0dad] font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#6a0dad] after:transition-all">Categories</Link>
            </li>
            <li>
              <Link to="/new-arrivals" className="block py-3 px-4 hover:text-[#6a0dad] font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#6a0dad] after:transition-all">New Arrivals</Link>
            </li>
            <li>
              <Link to="/featured" className="block py-3 px-4 hover:text-[#6a0dad] font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#6a0dad] after:transition-all">Featured</Link>
            </li>
            <li>
              <Link to="/deals" className="block py-3 px-4 text-[#dc3545] hover:text-[#c82333] font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#dc3545] after:transition-all">Deals</Link>
            </li>
            <li>
              <Link to="/about" className="block py-3 px-4 hover:text-[#6a0dad] font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#6a0dad] after:transition-all">About</Link>
            </li>
            <li>
              <Link to="/contact" className="block py-3 px-4 hover:text-[#6a0dad] font-medium relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-[#6a0dad] after:transition-all">Contact</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
