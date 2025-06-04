
import { useState, useEffect } from 'react';
import { getProducts, subscribeToProducts } from '@/lib/supabase-data';
import type { Product } from '@/lib/store';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadProducts = async () => {
      try {
        setError(null);
        const dbProducts = await getProducts();
        
        if (!mounted) return;
        
        const transformedProducts = dbProducts.map((dbProduct: any) => ({
          id: dbProduct.id,
          name: dbProduct.name,
          description: dbProduct.description,
          price: dbProduct.price,
          oldPrice: dbProduct.old_price,
          image: dbProduct.image,
          category: dbProduct.category,
          featured: dbProduct.featured,
          new: dbProduct.new,
          sale: dbProduct.sale,
          rating: dbProduct.rating,
          reviewCount: dbProduct.review_count
        }));
        
        setProducts(transformedProducts);
      } catch (err) {
        console.error('Failed to load products:', err);
        if (mounted) {
          setError('Failed to load products');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadProducts();

    // Set up real-time subscription
    const unsubscribe = subscribeToProducts((updatedProducts) => {
      if (mounted) {
        setProducts(updatedProducts);
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  return { products, loading, error };
};
