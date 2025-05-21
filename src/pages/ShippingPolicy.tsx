
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Shipping Policy</h1>
        
        <div className="max-w-3xl mx-auto prose">
          <h2 className="text-2xl font-semibold mb-4">Domestic Shipping</h2>
          <p className="mb-4">
            We currently offer shipping to all major cities within Bangladesh. Standard shipping typically takes 2-4 business days for delivery.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">International Shipping</h2>
          <p className="mb-4">
            For international customers, we offer shipping to select countries. International shipping typically takes 7-14 business days depending on the destination country and local customs procedures.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">Shipping Rates</h2>
          <p className="mb-4">
            Shipping rates are calculated based on the destination, weight, and dimensions of the ordered items. The exact shipping cost will be displayed during checkout before payment is processed.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">Free Shipping</h2>
          <p className="mb-4">
            We offer free shipping on all orders above 2000 BDT within Bangladesh. International orders do not qualify for free shipping at this time.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">Order Tracking</h2>
          <p className="mb-4">
            Once your order ships, you will receive a shipping confirmation email with a tracking number. You can use this tracking number on our <a href="/track-order" className="text-blue-600 hover:underline">Track Order</a> page to monitor your shipment's progress.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">Shipping Delays</h2>
          <p className="mb-4">
            Please note that delivery times may be affected by factors outside our control such as weather conditions, customs delays, or local holidays. We appreciate your understanding in such situations.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">Damaged Items</h2>
          <p className="mb-4">
            If your item arrives damaged, please contact our customer service team within 48 hours of receipt with photos of the damaged item and packaging. We will arrange for a replacement or refund as appropriate.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShippingPolicy;
