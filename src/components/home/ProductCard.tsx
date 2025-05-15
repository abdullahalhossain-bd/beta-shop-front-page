
import { Heart, ShoppingCart } from "lucide-react";
import { Product } from "@/lib/store";
import { useStore } from "@/lib/store";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart, addToWishlist } = useStore();

  return (
    <div className="product-card group">
      <div className="relative h-64 overflow-hidden rounded-t-lg">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {(product.new || product.sale) && (
          <div 
            className={`absolute top-3 left-3 py-1 px-3 text-xs font-bold text-white rounded-full ${
              product.new ? 'bg-[#040273]' : 'bg-[#dc3545]'
            }`}
          >
            {product.new ? 'NEW' : 'SALE'}
          </div>
        )}
        
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          <button 
            onClick={() => addToWishlist(product)}
            className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#6a0dad] hover:text-white transition-colors"
          >
            <Heart className="h-4 w-4" />
          </button>
          <button 
            onClick={() => addToCart(product)}
            className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-[#6a0dad] hover:text-white transition-colors"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <div className="p-4 bg-white rounded-b-lg">
        <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">{product.category}</div>
        <h3 className="font-medium text-lg mb-2 line-clamp-1">{product.name}</h3>
        
        {product.rating && (
          <div className="flex items-center mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg 
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-2">({product.reviewCount})</span>
          </div>
        )}
        
        <div className="flex items-center">
          <span className="text-[#040273] text-lg font-bold">${product.price.toFixed(2)}</span>
          {product.oldPrice && (
            <span className="text-gray-500 line-through ml-2">${product.oldPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
