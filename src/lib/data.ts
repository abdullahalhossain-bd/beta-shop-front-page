import { Product, Category } from './store';
import { getProducts } from './supabase-data';

// Static categories for now - these will be loaded from database
export const categories: Category[] = [
  {
    id: "books",
    name: "Books",
    image: "/lovable-uploads/f0f5ef17-cb9c-48ad-8afb-ec6c2747ac34.png",
    productCount: 120
  },
  {
    id: "digital",
    name: "Digital Products",
    image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0",
    productCount: 85
  },
  {
    id: "lights",
    name: "Decor LED Lights",
    image: "https://images.unsplash.com/photo-1558002038-1055e2e095a1",
    productCount: 95
  },
  {
    id: "handmade",
    name: "Handmade",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
    productCount: 70
  },
  {
    id: "electronics",
    name: "Electronic Devices",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    productCount: 150
  },
  {
    id: "health",
    name: "Medicine & Health",
    image: "https://images.unsplash.com/photo-1576678927484-cc907957088c",
    productCount: 110
  }
];

// Dynamic products - loaded from Supabase
export let products: Product[] = [];

// Load products from Supabase
export const loadProducts = async (): Promise<Product[]> => {
  try {
    const dbProducts = await getProducts();
    products = dbProducts.map((dbProduct: any) => ({
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
    return products;
  } catch (error) {
    console.error('Failed to load products:', error);
    return [];
  }
};

export const teamMembers = [
  {
    id: "1",
    name: "Jawad Noor Tahim",
    nickname: "Tahim",
    role: "CO-FOUNDER, MARKETING HEAD, PRODUCT SUPPORT",
    image: "https://images.unsplash.com/photo-1549068106-b024baf5062d"
  },
  {
    id: "3",
    name: "MD Abdullah Al Hossain",
    nickname: "Abdullah",
    role: "CO-FOUNDER, PRODUCT LEAD, MARKETING SUPPORT",
    image: "https://images.unsplash.com/photo-1549068106-b024baf5062d"
  }
];

export const features = [
  {
    id: "1",
    title: "Free Shipping",
    description: "Free shipping on all orders over $50",
    icon: "truck"
  },
  {
    id: "2",
    title: "Easy Returns",
    description: "30-day return policy for all items",
    icon: "arrows-right-left"
  },
  {
    id: "3",
    title: "Secure Payment",
    description: "All payments are securely processed",
    icon: "credit-card"
  },
  {
    id: "4",
    title: "24/7 Support",
    description: "Get support anytime via chat or email",
    icon: "headphones"
  }
];
