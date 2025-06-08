import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, LogOut } from "lucide-react";
import { Product, useStore } from "@/lib/store";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { addProduct, updateProduct, deleteProduct, getProducts, subscribeToProducts } from "@/lib/supabase-data";
import OrdersTab from "@/components/admin/OrdersTab";
import CustomersTab from "@/components/admin/CustomersTab";
import SettingsTab from "@/components/admin/SettingsTab";
import AboutBlogTab from "@/components/admin/AboutBlogTab";
import PoliciesTab from "@/components/admin/PoliciesTab";
import SocialMediaTab from "@/components/admin/SocialMediaTab";
import SubscriberTab from "@/components/admin/SubscriberTab";
import CategoriesTab from "@/components/admin/CategoriesTab";

const Admin = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);
  const [formData, setFormData] = useState<{
    id: string;
    name: string;
    description: string;
    price: number;
    oldPrice?: number;
    image: string;
    category: string;
    featured: boolean;
    new: boolean;
    sale: boolean;
    rating: number;
    reviewCount: number;
  }>({
    id: "",
    name: "",
    description: "",
    price: 0,
    oldPrice: 0,
    image: "https://placehold.co/300x400",
    category: "",
    featured: false,
    new: false,
    sale: false,
    rating: 0,
    reviewCount: 0,
  });

  // Check if admin is logged in
  useEffect(() => {
    const adminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
    if (!adminLoggedIn) {
      navigate("/admin-login");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  // Load products from Supabase and set up real-time subscription
  useEffect(() => {
    if (!isAuthenticated) return;

    const loadInitialProducts = async () => {
      try {
        console.log('Loading initial products...');
        const products = await getProducts();
        const transformedProducts = products.map((dbProduct: any) => ({
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
        console.log('Initial products loaded:', transformedProducts.length);
        setAllProducts(transformedProducts);
      } catch (error) {
        console.error('Failed to load products:', error);
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    loadInitialProducts();

    // Set up real-time subscription
    const unsubscribe = subscribeToProducts((products) => {
      console.log('Real-time update received, updating products:', products.length);
      setAllProducts(products);
    });

    return unsubscribe;
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin-login");
  };

  const handleAddProduct = () => {
    setEditProduct(null);
    setFormData({
      id: "",
      name: "",
      description: "",
      price: 0,
      oldPrice: 0,
      image: "https://placehold.co/300x400",
      category: "",
      featured: false,
      new: false,
      sale: false,
      rating: 0,
      reviewCount: 0,
    });
    setShowDialog(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditProduct(product);
    setFormData({
      ...product,
      featured: product.featured || false,
      new: product.new || false,
      sale: product.sale || false,
      rating: product.rating || 0,
      reviewCount: product.reviewCount || 0,
      oldPrice: product.oldPrice || 0
    });
    setShowDialog(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    console.log('Delete button clicked for product:', productId);
    
    if (!productId) {
      toast.error("Invalid product ID");
      return;
    }

    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }
    
    setDeletingProductId(productId);
    
    try {
      await deleteProduct(productId);
      toast.success("Product deleted successfully");
      // The real-time subscription will automatically update the UI
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error("Failed to delete product. Please try again.");
    } finally {
      setDeletingProductId(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (type === "number") {
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.category.trim() || formData.price <= 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      if (editProduct) {
        // Update existing product - make sure we have a valid ID
        if (!editProduct.id) {
          toast.error("Invalid product ID");
          return;
        }
        
        await updateProduct(editProduct.id, {
          name: formData.name,
          description: formData.description,
          price: formData.price,
          oldPrice: formData.oldPrice || undefined,
          image: formData.image,
          category: formData.category,
          featured: formData.featured,
          new: formData.new,
          sale: formData.sale,
          rating: formData.rating,
          reviewCount: formData.reviewCount
        });
        toast.success("Product updated successfully");
      } else {
        // Add new product
        await addProduct({
          name: formData.name,
          description: formData.description,
          price: formData.price,
          oldPrice: formData.oldPrice || undefined,
          image: formData.image,
          category: formData.category,
          featured: formData.featured,
          new: formData.new,
          sale: formData.sale,
          rating: formData.rating,
          reviewCount: formData.reviewCount
        });
        toast.success("Product added successfully");
      }
      setShowDialog(false);
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error("Failed to save product. Please try again.");
    }
  };

  if (!isAuthenticated || loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#040273] mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <Button variant="ghost" className="flex items-center gap-2" onClick={handleLogout}>
            <LogOut size={16} />
            Logout
          </Button>
        </div>

        <Tabs defaultValue="products">
          <TabsList className="mb-6 flex flex-wrap">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="policies">Policies</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Products Management</h2>
              <Button onClick={handleAddProduct} className="flex items-center gap-2 bg-[#040273]">
                <Plus size={16} />
                Add Product
              </Button>
            </div>

            <div className="bg-white rounded-lg shadow">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b">
                      <th className="p-4">Image</th>
                      <th className="p-4">Name</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {allProducts.map((product) => (
                      <tr key={product.id} className="border-b">
                        <td className="p-4">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        </td>
                        <td className="p-4 font-medium">{product.name}</td>
                        <td className="p-4 text-gray-500">{product.category}</td>
                        <td className="p-4">${product.price.toFixed(2)}</td>
                        <td className="p-4">
                          {product.new && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                              New
                            </span>
                          )}
                          {product.sale && (
                            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full ml-1">
                              Sale
                            </span>
                          )}
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditProduct(product)}
                              className="flex items-center gap-1"
                            >
                              <Edit size={14} />
                              Edit
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteProduct(product.id)}
                              disabled={deletingProductId === product.id}
                              className="flex items-center gap-1 text-red-500 hover:text-red-700 disabled:opacity-50"
                            >
                              <Trash2 size={14} />
                              {deletingProductId === product.id ? 'Deleting...' : 'Delete'}
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="categories">
            <CategoriesTab />
          </TabsContent>
          
          <TabsContent value="orders">
            <OrdersTab />
          </TabsContent>
          
          <TabsContent value="customers">
            <CustomersTab />
          </TabsContent>

          <TabsContent value="content">
            <AboutBlogTab />
          </TabsContent>
          
          <TabsContent value="policies">
            <PoliciesTab />
          </TabsContent>
          
          <TabsContent value="social">
            <SocialMediaTab />
          </TabsContent>
          
          <TabsContent value="subscribers">
            <SubscriberTab />
          </TabsContent>
          
          <TabsContent value="settings">
            <SettingsTab />
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Product Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-1">
                  Category
                </label>
                <Input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="price" className="block text-sm font-medium mb-1">
                  Price
                </label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="oldPrice" className="block text-sm font-medium mb-1">
                  Old Price (Optional)
                </label>
                <Input
                  id="oldPrice"
                  name="oldPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.oldPrice || ""}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label htmlFor="image" className="block text-sm font-medium mb-1">
                  Image URL
                </label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="rating" className="block text-sm font-medium mb-1">
                  Rating (0-5)
                </label>
                <Input
                  id="rating"
                  name="rating"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={formData.rating || 0}
                  onChange={handleInputChange}
                />
              </div>
              
              <div>
                <label htmlFor="reviewCount" className="block text-sm font-medium mb-1">
                  Review Count
                </label>
                <Input
                  id="reviewCount"
                  name="reviewCount"
                  type="number"
                  min="0"
                  value={formData.reviewCount || 0}
                  onChange={handleInputChange}
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <input
                    id="featured"
                    name="featured"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-[#040273] focus:ring-[#040273]"
                    checked={formData.featured || false}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="featured" className="ml-2 text-sm font-medium">
                    Featured
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="new"
                    name="new"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-[#040273] focus:ring-[#040273]"
                    checked={formData.new || false}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="new" className="ml-2 text-sm font-medium">
                    New
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="sale"
                    name="sale"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-[#040273] focus:ring-[#040273]"
                    checked={formData.sale || false}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="sale" className="ml-2 text-sm font-medium">
                    Sale
                  </label>
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setShowDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-[#040273]">
                {editProduct ? "Update Product" : "Add Product"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
