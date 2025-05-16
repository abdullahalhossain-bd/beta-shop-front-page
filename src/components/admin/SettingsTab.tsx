
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

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

  const handleStoreSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStoreSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleTaxSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTaxSettings(prev => ({ ...prev, [name]: name === "taxRate" || name === "freeShippingThreshold" || name === "defaultShippingRate" ? parseFloat(value) : value }));
  };

  const handleToggle = (setting: string, section: "email" | "tax") => {
    if (section === "email") {
      setEmailSettings(prev => ({ ...prev, [setting]: !prev[setting as keyof typeof prev] }));
    } else {
      setTaxSettings(prev => ({ ...prev, [setting]: !prev[setting as keyof typeof prev] }));
    }
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
