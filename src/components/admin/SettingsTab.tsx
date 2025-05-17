
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Truck, MapPin } from "lucide-react";
import { products } from "@/lib/data";
import { Product } from "@/lib/store";

const SettingsTab = () => {
  // Store settings
  const [storeSettings, setStoreSettings] = useState({
    storeName: "Fashion Store",
    storeEmail: "contact@fashionstore.com",
    storePhone: "+1 (555) 123-4567",
    storeAddress: "123 Fashion Street, Style City, SC 12345",
    currencySymbol: "$",
    logo: "https://placehold.co/200x60",
  });

  // Email settings
  const [emailSettings, setEmailSettings] = useState({
    enableOrderConfirmation: true,
    enableShippingNotifications: true,
    enableAbandonedCart: false,
    enableNewProductNotifications: true,
    adminEmailCopy: true,
  });

  // Tax and shipping settings
  const [taxSettings, setTaxSettings] = useState({
    enableTax: true,
    taxRate: 7.5,
    enableFreeShipping: true,
    freeShippingThreshold: 100,
    defaultShippingRate: 9.99,
  });

  // Featured products management
  const [allProducts, setAllProducts] = useState<Product[]>(products);
  
  // Delivery settings
  const [deliverySettings, setDeliverySettings] = useState({
    standardDeliveryCharge: 5.99,
    expressDeliveryCharge: 12.99,
    internationalDeliveryCharge: 24.99,
  });
  
  // Delivery locations
  const [deliveryLocations, setDeliveryLocations] = useState([
    { id: '1', name: 'New York', isActive: true },
    { id: '2', name: 'Los Angeles', isActive: true },
    { id: '3', name: 'Chicago', isActive: true },
    { id: '4', name: 'Houston', isActive: true },
    { id: '5', name: 'Phoenix', isActive: false },
  ]);
  
  // New location input
  const [newLocation, setNewLocation] = useState('');

  const handleStoreSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStoreSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleTaxSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTaxSettings(prev => ({ ...prev, [name]: name === "taxRate" || name === "freeShippingThreshold" || name === "defaultShippingRate" ? parseFloat(value) : value }));
  };
  
  const handleDeliverySettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeliverySettings(prev => ({ ...prev, [name]: parseFloat(value) }));
  };

  const handleToggle = (setting: string, section: "email" | "tax") => {
    if (section === "email") {
      setEmailSettings(prev => ({ ...prev, [setting]: !prev[setting as keyof typeof prev] }));
    } else {
      setTaxSettings(prev => ({ ...prev, [setting]: !prev[setting as keyof typeof prev] }));
    }
  };
  
  const toggleProductFeatured = (productId: string) => {
    setAllProducts(prev => 
      prev.map(product => 
        product.id === productId 
          ? { ...product, featured: !product.featured } 
          : product
      )
    );
    toast.success("Product featured status updated");
  };
  
  const toggleLocationActive = (locationId: string) => {
    setDeliveryLocations(prev => 
      prev.map(location => 
        location.id === locationId 
          ? { ...location, isActive: !location.isActive } 
          : location
      )
    );
    toast.success("Delivery location status updated");
  };
  
  const addDeliveryLocation = () => {
    if (newLocation.trim() === '') {
      toast.error("Location name cannot be empty");
      return;
    }
    
    setDeliveryLocations(prev => [
      ...prev, 
      { 
        id: `location-${Date.now()}`, 
        name: newLocation.trim(), 
        isActive: true 
      }
    ]);
    setNewLocation('');
    toast.success("Delivery location added successfully");
  };
  
  const removeDeliveryLocation = (locationId: string) => {
    setDeliveryLocations(prev => prev.filter(location => location.id !== locationId));
    toast.success("Delivery location removed");
  };

  const handleSaveSettings = (section: string) => {
    toast.success(`${section} settings saved successfully`);
  };

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-semibold">Store Settings</h2>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">General Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="storeName" className="text-sm font-medium">
                Store Name
              </label>
              <Input
                id="storeName"
                name="storeName"
                value={storeSettings.storeName}
                onChange={handleStoreSettingsChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="storeEmail" className="text-sm font-medium">
                Store Email
              </label>
              <Input
                id="storeEmail"
                name="storeEmail"
                type="email"
                value={storeSettings.storeEmail}
                onChange={handleStoreSettingsChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="storePhone" className="text-sm font-medium">
                Store Phone
              </label>
              <Input
                id="storePhone"
                name="storePhone"
                value={storeSettings.storePhone}
                onChange={handleStoreSettingsChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="currencySymbol" className="text-sm font-medium">
                Currency Symbol
              </label>
              <Input
                id="currencySymbol"
                name="currencySymbol"
                value={storeSettings.currencySymbol}
                onChange={handleStoreSettingsChange}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="storeAddress" className="text-sm font-medium">
                Store Address
              </label>
              <Textarea
                id="storeAddress"
                name="storeAddress"
                value={storeSettings.storeAddress}
                onChange={handleStoreSettingsChange}
                rows={2}
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="logo" className="text-sm font-medium">
                Logo URL
              </label>
              <Input
                id="logo"
                name="logo"
                value={storeSettings.logo}
                onChange={handleStoreSettingsChange}
              />
              <div className="mt-2">
                <p className="text-sm text-gray-500 mb-2">Current logo:</p>
                <img 
                  src={storeSettings.logo} 
                  alt="Store logo" 
                  className="h-12 object-contain border rounded p-1" 
                />
              </div>
            </div>
          </div>
          <div className="pt-2">
            <Button 
              onClick={() => handleSaveSettings("General")}
              className="bg-[#040273]"
            >
              Save General Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Featured Products</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Featured</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-10 w-10 rounded-md object-cover"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>${product.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Switch
                        checked={product.featured || false}
                        onCheckedChange={() => toggleProductFeatured(product.id)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="pt-2">
            <Button 
              onClick={() => handleSaveSettings("Featured Products")}
              className="bg-[#040273]"
            >
              Save Featured Products
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck size={18} />
            Delivery Charges
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label htmlFor="standardDeliveryCharge" className="text-sm font-medium">
                Standard Delivery Charge ({storeSettings.currencySymbol})
              </label>
              <Input
                id="standardDeliveryCharge"
                name="standardDeliveryCharge"
                type="number"
                step="0.01"
                value={deliverySettings.standardDeliveryCharge}
                onChange={handleDeliverySettingsChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="expressDeliveryCharge" className="text-sm font-medium">
                Express Delivery Charge ({storeSettings.currencySymbol})
              </label>
              <Input
                id="expressDeliveryCharge"
                name="expressDeliveryCharge"
                type="number"
                step="0.01"
                value={deliverySettings.expressDeliveryCharge}
                onChange={handleDeliverySettingsChange}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="internationalDeliveryCharge" className="text-sm font-medium">
                International Delivery Charge ({storeSettings.currencySymbol})
              </label>
              <Input
                id="internationalDeliveryCharge"
                name="internationalDeliveryCharge"
                type="number"
                step="0.01"
                value={deliverySettings.internationalDeliveryCharge}
                onChange={handleDeliverySettingsChange}
              />
            </div>
          </div>
          <div className="pt-2">
            <Button 
              onClick={() => handleSaveSettings("Delivery Charges")}
              className="bg-[#040273]"
            >
              Save Delivery Charges
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin size={18} />
            Delivery Locations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <label htmlFor="newLocation" className="text-sm font-medium block mb-2">
                Add New Location
              </label>
              <Input
                id="newLocation"
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                placeholder="Enter city or region name"
              />
            </div>
            <Button 
              onClick={addDeliveryLocation}
              className="bg-[#040273]"
            >
              Add Location
            </Button>
          </div>
          
          <div className="rounded-md border mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Location Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deliveryLocations.map((location) => (
                  <TableRow key={location.id}>
                    <TableCell className="font-medium">{location.name}</TableCell>
                    <TableCell>
                      <Switch
                        checked={location.isActive}
                        onCheckedChange={() => toggleLocationActive(location.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => removeDeliveryLocation(location.id)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {deliveryLocations.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-4 text-gray-500">
                      No delivery locations added yet
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="pt-2">
            <Button 
              onClick={() => handleSaveSettings("Delivery Locations")}
              className="bg-[#040273]"
            >
              Save Delivery Locations
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Email Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Order Confirmation</p>
                <p className="text-sm text-gray-500">Send emails when orders are placed</p>
              </div>
              <Switch 
                checked={emailSettings.enableOrderConfirmation}
                onCheckedChange={() => handleToggle('enableOrderConfirmation', 'email')}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Shipping Notifications</p>
                <p className="text-sm text-gray-500">Send emails when orders are shipped</p>
              </div>
              <Switch 
                checked={emailSettings.enableShippingNotifications}
                onCheckedChange={() => handleToggle('enableShippingNotifications', 'email')}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Abandoned Cart Reminders</p>
                <p className="text-sm text-gray-500">Send reminder emails for abandoned carts</p>
              </div>
              <Switch 
                checked={emailSettings.enableAbandonedCart}
                onCheckedChange={() => handleToggle('enableAbandonedCart', 'email')}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">New Product Notifications</p>
                <p className="text-sm text-gray-500">Send emails when new products are added</p>
              </div>
              <Switch 
                checked={emailSettings.enableNewProductNotifications}
                onCheckedChange={() => handleToggle('enableNewProductNotifications', 'email')}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Admin Email Copy</p>
                <p className="text-sm text-gray-500">Send a copy of customer emails to admin</p>
              </div>
              <Switch 
                checked={emailSettings.adminEmailCopy}
                onCheckedChange={() => handleToggle('adminEmailCopy', 'email')}
              />
            </div>
          </div>
          <div className="pt-2">
            <Button 
              onClick={() => handleSaveSettings("Email")}
              className="bg-[#040273]"
            >
              Save Email Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tax & Shipping</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enable Tax</p>
                  <p className="text-sm text-gray-500">Apply tax to orders</p>
                </div>
                <Switch 
                  checked={taxSettings.enableTax}
                  onCheckedChange={() => handleToggle('enableTax', 'tax')}
                />
              </div>
              
              {taxSettings.enableTax && (
                <div className="space-y-2">
                  <label htmlFor="taxRate" className="text-sm font-medium">
                    Tax Rate (%)
                  </label>
                  <Input
                    id="taxRate"
                    name="taxRate"
                    type="number"
                    step="0.01"
                    value={taxSettings.taxRate}
                    onChange={handleTaxSettingsChange}
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Enable Free Shipping</p>
                  <p className="text-sm text-gray-500">Offer free shipping above a threshold</p>
                </div>
                <Switch 
                  checked={taxSettings.enableFreeShipping}
                  onCheckedChange={() => handleToggle('enableFreeShipping', 'tax')}
                />
              </div>
              
              {taxSettings.enableFreeShipping && (
                <div className="space-y-2">
                  <label htmlFor="freeShippingThreshold" className="text-sm font-medium">
                    Free Shipping Threshold ({storeSettings.currencySymbol})
                  </label>
                  <Input
                    id="freeShippingThreshold"
                    name="freeShippingThreshold"
                    type="number"
                    step="0.01"
                    value={taxSettings.freeShippingThreshold}
                    onChange={handleTaxSettingsChange}
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <label htmlFor="defaultShippingRate" className="text-sm font-medium">
                  Default Shipping Rate ({storeSettings.currencySymbol})
                </label>
                <Input
                  id="defaultShippingRate"
                  name="defaultShippingRate"
                  type="number"
                  step="0.01"
                  value={taxSettings.defaultShippingRate}
                  onChange={handleTaxSettingsChange}
                />
              </div>
            </div>
          </div>
          
          <div className="pt-2">
            <Button 
              onClick={() => handleSaveSettings("Tax & Shipping")}
              className="bg-[#040273]"
            >
              Save Tax & Shipping Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsTab;
