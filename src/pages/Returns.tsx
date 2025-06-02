
import React, { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface Section {
  id: string;
  title: string;
  content: string;
}

interface ReturnsPolicyType {
  title: string;
  sections: Section[];
}

const Returns = () => {
  const [policy, setPolicy] = useState<ReturnsPolicyType>({
    title: "রিটার্ন ও এক্সচেঞ্জ নীতিমালা – Betagi E-Shop",
    sections: [
      {
        id: "introduction",
        title: "ভূমিকা",
        content: "আমরা সবসময় চেষ্টায় থাকি আপনাকে সঠিক ও মানসম্মত পণ্য পৌঁছে দিতে। তবুও যদি কোন কারণে আপনি প্রাপ্ত পণ্যে সন্তুষ্ট না হন, তাহলে নিচের শর্তসাপেক্ষে আপনি রিটার্ন বা এক্সচেঞ্জ করতে পারবেন।"
      },
      {
        id: "valid-reasons",
        title: "✅ রিটার্ন করার উপযুক্ত কারণসমূহ:",
        content: "নিম্নলিখিত কারণে আপনি রিটার্ন/এক্সচেঞ্জের জন্য আবেদন করতে পারেন:"
      },
      {
        id: "timeline",
        title: "🕒 রিটার্নের সময়সীমা:",
        content: "পণ্য গ্রহণের ৭ দিনের মধ্যে আমাদের সাথে যোগাযোগ করতে হবে। নির্ধারিত সময়ের বাইরে রিটার্ন/এক্সচেঞ্জ গ্রহণযোগ্য নয়।"
      },
      {
        id: "exchange-conditions",
        title: "🔁 এক্সচেঞ্জ শর্ত:",
        content: "এক্সচেঞ্জ সংক্রান্ত নিয়মাবলী:"
      },
      {
        id: "non-returnable",
        title: "❌ নিচের পণ্যগুলোর রিটার্ন/এক্সচেঞ্জ গ্রহণযোগ্য নয়:",
        content: "কিছু পণ্য রিটার্ন বা এক্সচেঞ্জের আওতার বাইরে:"
      },
      {
        id: "process",
        title: "📦 রিটার্ন প্রক্রিয়া:",
        content: "রিটার্ন/এক্সচেঞ্জের জন্য নিম্নলিখিত ধাপ অনুসরণ করুন:"
      },
      {
        id: "conclusion",
        title: "আমাদের প্রতিশ্রুতি",
        content: "আমাদের লক্ষ্য আপনাকে সর্বোচ্চ সেবা প্রদান করা। আপনার সন্তুষ্টিই আমাদের অগ্রাধিকার। Betagi E-Shop – আপনার পাশে, সবসময়।"
      }
    ]
  });

  useEffect(() => {
    // Load returns policy from localStorage if available
    const storedPolicy = localStorage.getItem("returnsPolicy");
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
              {section.id === "valid-reasons" && (
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>প্রাপ্ত পণ্যটি ভুল (অর্ডারের সাথে মিল নেই)</li>
                  <li>পণ্যটি ভাঙা/ক্ষতিগ্রস্ত অবস্থায় পৌঁছেছে</li>
                  <li>পণ্যের সাইজ বা ভ্যারিয়েন্টে সমস্যা (যদি উল্লেখযোগ্য হয়)</li>
                  <li>পণ্যটির কার্যকারিতা ত্রুটিপূর্ণ</li>
                </ul>
              )}
              {section.id === "exchange-conditions" && (
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>এক্সচেঞ্জ কেবল স্টক থাকা সাপেক্ষে করা সম্ভব</li>
                  <li>একই মূল্যের পণ্যে এক্সচেঞ্জ করা যাবে</li>
                  <li>অতিরিক্ত মূল্যের পণ্য হলে গ্রাহককে পার্থক্য পরিশোধ করতে হবে</li>
                </ul>
              )}
              {section.id === "non-returnable" && (
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>ডিজিটাল পণ্য ও সাবস্ক্রিপশন (যেমন: গিফট কার্ড, সফটওয়্যার লাইসেন্স ইত্যাদি)</li>
                  <li>ব্যবহৃত, ক্ষতিগ্রস্ত বা ট্যাগ/প্যাকেজিং ছাড়া পণ্য</li>
                  <li>অফার বা ডিসকাউন্টেড পণ্যে কিছু ক্ষেত্রে রিটার্ন প্রযোজ্য নয় (নির্দিষ্ট করা থাকবে)</li>
                </ul>
              )}
              {section.id === "process" && (
                <ol className="list-decimal pl-6 mb-4 space-y-2">
                  <li>আমাদের হটলাইনে (📞 01584013318) অথবা ইনবক্সে যোগাযোগ করুন</li>
                  <li>সমস্যাটি বিস্তারিতভাবে জানান এবং প্রয়োজনে ছবিসহ প্রমাণ দিন</li>
                  <li>যাচাই-বাছাই শেষে রিটার্ন বা এক্সচেঞ্জ অনুমোদন দেওয়া হবে</li>
                  <li>আপনাকে নির্ধারিত ঠিকানায় পণ্য পাঠাতে হবে (কন্ডিশন অনুযায়ী)</li>
                </ol>
              )}
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Returns;
