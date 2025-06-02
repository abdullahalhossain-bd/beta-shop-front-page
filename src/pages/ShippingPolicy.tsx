
import React, { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface Section {
  id: string;
  title: string;
  content: string;
}

interface ShippingPolicyType {
  title: string;
  sections: Section[];
}

const ShippingPolicy = () => {
  const [policy, setPolicy] = useState<ShippingPolicyType>({
    title: "🚚 শিপিং নীতিমালা – Betagi E-Shop",
    sections: [
      {
        id: "introduction",
        title: "ভূমিকা",
        content: "Betagi E-Shop থেকে আপনি যেকোনো প্রোডাক্ট অর্ডার করলে আমরা চেষ্টা করি দ্রুততম সময়ে আপনার হাতে পৌঁছে দিতে। নিচে আমাদের শিপিং সম্পর্কিত সকল নীতিমালা উল্লেখ করা হলো:"
      },
      {
        id: "service-area",
        title: "📍 সার্ভিস এলাকা",
        content: "আমরা বাংলাদেশের যেকোনো স্থানে হোম ডেলিভারি অথবা কুরিয়ার সার্ভিসের মাধ্যমে পণ্য প্রেরণ করে থাকি।"
      },
      {
        id: "delivery-time",
        title: "⏳ ডেলিভারি সময়সীমা",
        content: "ঢাকা শহরের মধ্যে: ২-৩ কার্যদিবস। ঢাকার বাইরে: ৩-৫ কার্যদিবস (বিশেষ দিনে বা দুর্যোগপূর্ণ পরিস্থিতিতে সময় কিছুটা বাড়তে পারে)"
      },
      {
        id: "delivery-charge",
        title: "💰 ডেলিভারি চার্জ",
        content: "ঢাকার মধ্যে: ৳৬০–৳৮০। ঢাকার বাইরে: ৳১০০–৳১৩০ (কুরিয়ারের উপর নির্ভরশীল)। কিছু বিশেষ বা ওভারসাইজ পণ্যের ক্ষেত্রে অতিরিক্ত চার্জ প্রযোজ্য হতে পারে।"
      },
      {
        id: "payment-methods",
        title: "💳 পেমেন্ট পদ্ধতি",
        content: "ক্যাশ অন ডেলিভারি (COD) – বেশিরভাগ পণ্যের ক্ষেত্রে প্রযোজ্য। অ্যাডভান্স পেমেন্ট – কিছু প্রোডাক্টের ক্ষেত্রে বাধ্যতামূলক (বিশেষ করে কাস্টম প্রোডাক্ট বা ডিজিটাল পণ্য)"
      },
      {
        id: "order-confirmation",
        title: "📦 অর্ডার কনফার্মেশন",
        content: "অর্ডার করার পর আমাদের প্রতিনিধি ফোন অথবা ম্যাসেজের মাধ্যমে কনফার্মেশন নেবে। কনফার্মেশন ছাড়া কোনো অর্ডার প্রক্রিয়াকরণ হবে না।"
      },
      {
        id: "delivery-failure",
        title: "❗ ডেলিভারি ব্যর্থ হলে",
        content: "গ্রাহক যদি নির্ধারিত সময় বা ঠিকানায় উপস্থিত না থাকেন, তবে ডেলিভারি বাতিল হতে পারে। বারবার অর্ডার বাতিল করা হলে ভবিষ্যতে অর্ডার নেওয়া বন্ধ রাখা হতে পারে।"
      },
      {
        id: "support",
        title: "📞 সাহায্য প্রয়োজন?",
        content: "আমাদের কাস্টমার কেয়ার নম্বরে (📞 01305-006515) যোগাযোগ করুন অথবা আমাদের ফেসবুক পেজে ইনবক্স করুন। Betagi E-Shop – আপনার বিশ্বাস, আমাদের দায়িত্ব।"
      }
    ]
  });

  useEffect(() => {
    // Load shipping policy from localStorage if available
    const storedPolicy = localStorage.getItem("shippingPolicy");
    if (storedPolicy) {
      setPolicy(JSON.parse(storedPolicy));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">{policy.title}</h1>
        
        <div className="max-w-3xl mx-auto prose">
          {policy.sections.map((section) => (
            <div key={section.id}>
              <h2 className="text-2xl font-semibold mb-4 mt-8">{section.title}</h2>
              <p className="mb-4">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShippingPolicy;
