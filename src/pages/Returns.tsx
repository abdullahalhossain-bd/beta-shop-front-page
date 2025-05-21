
import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Returns = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Returns & Exchanges</h1>
        
        <div className="max-w-3xl mx-auto prose">
          <h2 className="text-2xl font-semibold mb-4">Return Policy</h2>
          <p className="mb-4">
            We offer a 30-day return policy for all unused and unopened items. To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">Exchange Policy</h2>
          <p className="mb-4">
            If you received a defective or damaged product, we will exchange it for the same item. If the same item is not available, we will offer you a refund or the option to choose a different product of equal value.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">How to Initiate a Return</h2>
          <ol className="list-decimal pl-6 mb-4 space-y-2">
            <li>Contact our customer service team at betagieshop@gmail.com with your order number and reason for return.</li>
            <li>Our team will provide you with a return authorization and instructions.</li>
            <li>Package your item securely with all the original packaging and tags.</li>
            <li>Ship your return to the address provided in the return instructions.</li>
          </ol>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">Refunds</h2>
          <p className="mb-4">
            Once we receive and inspect your return, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 5-7 business days.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">Non-Returnable Items</h2>
          <p className="mb-4">
            The following items cannot be returned or exchanged:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Items that show signs of use or wear</li>
            <li>Gift cards</li>
            <li>Downloadable products</li>
            <li>Personal care items</li>
            <li>Sale items (unless defective)</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mb-4 mt-8">Return Shipping</h2>
          <p className="mb-4">
            Customers are responsible for return shipping costs unless the item was received defective or damaged. In such cases, we will reimburse you for the return shipping cost.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Returns;
