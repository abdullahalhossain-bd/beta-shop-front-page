
import { useStore, WishlistItem } from "@/lib/store";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/ui/CartDrawer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { theme } from "@/lib/theme";
import { motion } from "framer-motion";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useStore();

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const handleAddToCart = (product: WishlistItem) => {
    addToCart(product);
    // Optionally remove from wishlist after adding to cart
    // removeFromWishlist(product.id);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-[#040273] relative inline-block">
            My Wishlist
            <span className="absolute bottom-0 left-0 right-0 h-1 bg-[#6a0dad] transform translate-y-2"></span>
          </h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Your favorite items all in one place. Add them to your cart when you're ready to purchase.
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-lg">
            <Heart className="mx-auto mb-4 h-16 w-16 text-gray-300" />
            <h2 className="text-2xl font-medium mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8">
              Add items you love to your wishlist. Review them anytime and easily move them to your cart.
            </p>
            <Link to="/shop">
              <Button 
                size="lg"
                style={{ backgroundColor: theme.colors.primary }}
                className="font-medium px-8"
              >
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {wishlist.map((item) => (
              <motion.div key={item.id} variants={item}>
                <Card className="overflow-hidden h-full flex flex-col transition-all hover:shadow-lg">
                  <div className="relative h-64 overflow-hidden bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                    {(item.new || item.sale) && (
                      <div 
                        className={`absolute top-3 left-3 py-1 px-3 text-xs font-bold text-white rounded-full ${
                          item.new ? 'bg-[#040273]' : 'bg-[#dc3545]'
                        }`}
                      >
                        {item.new ? 'NEW' : 'SALE'}
                      </div>
                    )}
                    <button 
                      onClick={() => removeFromWishlist(item.id)}
                      className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#dc3545] hover:text-white transition-colors"
                      aria-label="Remove from wishlist"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <CardContent className="p-5 flex flex-col flex-grow">
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">{item.category}</div>
                    <h3 className="font-medium text-lg mb-2 line-clamp-1">{item.name}</h3>
                    
                    {item.rating && (
                      <div className="flex items-center mb-3">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg 
                              key={i}
                              className={`h-4 w-4 ${i < Math.floor(item.rating) ? "text-yellow-400" : "text-gray-300"}`} 
                              fill="currentColor" 
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-2">({item.reviewCount})</span>
                      </div>
                    )}
                    
                    <div className="flex items-center mt-auto mb-4">
                      <span className="text-[#040273] text-lg font-bold">${item.price.toFixed(2)}</span>
                      {item.oldPrice && (
                        <span className="text-gray-500 line-through ml-2">${item.oldPrice.toFixed(2)}</span>
                      )}
                    </div>

                    <Button 
                      onClick={() => handleAddToCart(item)}
                      className="w-full flex items-center justify-center gap-2"
                      style={{ backgroundColor: theme.colors.secondary }}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default Wishlist;
