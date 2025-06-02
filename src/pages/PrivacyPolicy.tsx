
import React, { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface Section {
  id: string;
  title: string;
  content: string;
}

interface PrivacyPolicyType {
  title: string;
  lastUpdated: string;
  sections: Section[];
}

const PrivacyPolicy = () => {
  const [policy, setPolicy] = useState<PrivacyPolicyType>({
    title: "গোপনীয়তা নীতিমালা",
    lastUpdated: "May 21, 2025",
    sections: [
      {
        id: "introduction",
        title: "ভূমিকা",
        content: "আমরা, Betagi eShop, আমাদের গ্রাহকদের গোপনীয়তা রক্ষা করার জন্য প্রতিশ্রুতিবদ্ধ। আপনার ব্যক্তিগত তথ্য আমাদের কাছে কিভাবে সংগ্রহ হয়, ব্যবহৃত হয় এবং রক্ষা করা হয় – সেই সম্পর্কে এই নীতিমালায় বিস্তারিত ব্যাখ্যা করা হয়েছে।"
      },
      {
        id: "information",
        title: "📌 ১. তথ্য সংগ্রহ",
        content: "আমরা নিম্নলিখিত তথ্য সংগ্রহ করতে পারি:"
      },
      {
        id: "usage",
        title: "🛡️ ২. তথ্যের ব্যবহার",
        content: "আমরা আপনার তথ্য ব্যবহার করি শুধুমাত্র:"
      },
      {
        id: "security",
        title: "🔒 ৩. তথ্যের নিরাপত্তা",
        content: "আমরা আপনার তথ্য গোপন রাখি এবং কোনো তৃতীয় পক্ষের (third party) সাথে বিক্রি বা ভাগ করি না, যতক্ষণ না তা আইনত প্রয়োজন হয়।"
      },
      {
        id: "consent",
        title: "✅ ৪. সম্মতি",
        content: "আমাদের সাথে অর্ডার বা যোগাযোগ করলে, আপনি এই গোপনীয়তা নীতিমালার সাথে সম্মত হচ্ছেন।"
      },
      {
        id: "changes",
        title: "📝 ৫. পরিবর্তন",
        content: "আমরা যেকোনো সময় এই নীতিমালা হালনাগাদ করতে পারি। পরিবর্তন হলে আমাদের ফেসবুক পেজে বা ওয়েবসাইটে তা জানানো হবে।"
      },
      {
        id: "contact",
        title: "📞 যোগাযোগ",
        content: "আপনার গোপনীয়তা সংক্রান্ত কোনো প্রশ্ন থাকলে আমাদের হটলাইনে যোগাযোগ করুন: 📱 01584013318"
      }
    ]
  });

  useEffect(() => {
    // Load privacy policy from localStorage if available
    const storedPolicy = localStorage.getItem("privacyPolicy");
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
          <p className="mb-4">
            সর্বশেষ হালনাগাদ: {policy.lastUpdated}
          </p>
          
          {policy.sections.map((section) => (
            <div key={section.id}>
              <h2 className="text-2xl font-semibold mb-4 mt-8">{section.title}</h2>
              <p className="mb-4">
                {section.content}
              </p>
              {section.id === "information" && (
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>আপনার নাম</li>
                  <li>মোবাইল নাম্বার</li>
                  <li>ঠিকানা (ডেলিভারির জন্য)</li>
                  <li>আপনার অর্ডার সংক্রান্ত তথ্য</li>
                  <li>পেমেন্ট মাধ্যম সংক্রান্ত তথ্য (Bkash, Nagad, Rocket ইত্যাদি)</li>
                </ul>
              )}
              {section.id === "usage" && (
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>পণ্য ডেলিভারি নিশ্চিত করতে</li>
                  <li>অর্ডার এবং পেমেন্ট যাচাই করতে</li>
                  <li>গ্রাহক সেবা দিতে</li>
                  <li>অফার বা প্রমোশন জানাতে (SMS বা কলের মাধ্যমে)</li>
                </ul>
              )}
            </div>
          ))}
          
          <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-center font-semibold text-blue-800">
              Betagi eShop আপনার বিশ্বাসকে সম্মান করে। আমাদের কাছে আপনার নিরাপত্তা সবসময় অগ্রাধিকার।
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
