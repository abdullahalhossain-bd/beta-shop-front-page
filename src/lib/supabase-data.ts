
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
  console.log('Starting delete operation for product ID:', id);
  
  if (!id || id.trim() === '') {
    throw new Error('Invalid product ID provided');
  }

  // First verify the product exists
  const { data: existingProduct, error: checkError } = await supabase
    .from('products')
    .select('id, name')
    .eq('id', id)
    .maybeSingle();
  
  if (checkError) {
    console.error('Error checking if product exists:', checkError);
    throw new Error(`Failed to verify product exists: ${checkError.message}`);
  }
  
  if (!existingProduct) {
    console.error('Product not found for deletion:', id);
    throw new Error('Product not found');
  }

  console.log('Product found, proceeding with deletion:', existingProduct);

  // Perform the actual deletion
  const { error: deleteError, count } = await supabase
    .from('products')
    .delete({ count: 'exact' })
    .eq('id', id);
  
  if (deleteError) {
    console.error('Error during deletion:', deleteError);
    throw new Error(`Failed to delete product: ${deleteError.message}`);
  }
  
  console.log('Delete operation completed. Rows affected:', count);
  
  if (count === 0) {
    throw new Error('No rows were deleted. Product may not exist or deletion was blocked.');
  }
  
  // Verify the product was actually deleted
  const { data: verifyProduct, error: verifyError } = await supabase
    .from('products')
    .select('id')
    .eq('id', id)
    .maybeSingle();
    
  if (verifyError) {
    console.error('Error verifying deletion:', verifyError);
    // Don't throw here as the deletion might have succeeded
  }
  
  if (verifyProduct) {
    console.error('Product still exists after deletion attempt:', verifyProduct);
    throw new Error('Product deletion failed - product still exists in database');
  }
  
  console.log('Product successfully deleted and verified');
  return { success: true, deletedCount: count };
};

// Real-time subscriptions
export const subscribeToProducts = (callback: (products: Product[]) => void) => {
  console.log('Setting up real-time subscription for products');
  
  const channel = supabase
    .channel('products-changes')
    .on(
      'postgres_changes',
      {
        event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
        schema: 'public',
        table: 'products'
      },
      async (payload) => {
        console.log('Real-time change detected:', payload.eventType, payload);
        
        // Fetch updated products when any change occurs
        try {
          const products = await getProducts();
          const transformedProducts = products.map(transformDatabaseProduct);
          console.log('Sending updated products to callback:', transformedProducts.length);
          callback(transformedProducts);
        } catch (error) {
          console.error('Error fetching updated products:', error);
        }
      }
    )
    .subscribe((status) => {
      console.log('Subscription status:', status);
    });

  return () => {
    console.log('Cleaning up real-time subscription');
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
