
import { supabase } from "@/integrations/supabase/client";
import type { Product, Category } from "./store";

// Product operations
export const getProducts = async () => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
  
  return data || [];
};

export const addProduct = async (product: Omit<Product, 'id'>) => {
  const { data, error } = await supabase
    .from('products')
    .insert([{
      name: product.name,
      description: product.description,
      price: product.price,
      old_price: product.oldPrice || null,
      image: product.image,
      category: product.category,
      featured: product.featured || false,
      new: product.new || false,
      sale: product.sale || false,
      rating: product.rating || 0,
      review_count: product.reviewCount || 0
    }])
    .select()
    .single();
  
  if (error) {
    console.error('Error adding product:', error);
    throw error;
  }
  
  return data;
};

export const updateProduct = async (id: string, product: Partial<Product>) => {
  // First check if the product exists
  const { data: existingProduct, error: checkError } = await supabase
    .from('products')
    .select('id')
    .eq('id', id)
    .single();
  
  if (checkError || !existingProduct) {
    console.error('Product not found:', checkError);
    throw new Error('Product not found');
  }

  const { data, error } = await supabase
    .from('products')
    .update({
      name: product.name,
      description: product.description,
      price: product.price,
      old_price: product.oldPrice || null,
      image: product.image,
      category: product.category,
      featured: product.featured || false,
      new: product.new || false,
      sale: product.sale || false,
      rating: product.rating || 0,
      review_count: product.reviewCount || 0
    })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    console.error('Error updating product:', error);
    throw error;
  }
  
  return data;
};

export const deleteProduct = async (id: string) => {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
  
  if (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// Real-time subscriptions
export const subscribeToProducts = (callback: (products: Product[]) => void) => {
  const channel = supabase
    .channel('products-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'products'
      },
      async () => {
        // Fetch updated products when any change occurs
        const products = await getProducts();
        callback(products.map(transformDatabaseProduct));
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
};

// Transform database product to frontend Product type
const transformDatabaseProduct = (dbProduct: any): Product => ({
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
});
