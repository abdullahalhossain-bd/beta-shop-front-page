
import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/ui/CartDrawer";

const AboutUs = () => {
  const [aboutContent, setAboutContent] = useState({
    title: "🛍️ আমাদের সম্পর্কে – Betagi E-Shop",
    description: "Betagi E-Shop একটি অনলাইন ভিত্তিক মাল্টিপ্রোডাক্ট মার্কেটপ্লেস, যেখানে আপনি একসাথে পাবেন বই, ডিজিটাল পণ্য, হোম অ্যান্ড লিভিং, গিফট আইটেম সহ নানান ধরণের পণ্য – সব এক জায়গায়, সাশ্রয়ী দামে।",
    mission: "আমরা বিশ্বাস করি, বিশ্বাসযোগ্যতা, সেবা ও সঠিক পণ্য ডেলিভারি দিয়ে গ্রাহকের মনে জায়গা করে নেওয়াই আমাদের মূল লক্ষ্য।",
    vision: "প্রযুক্তি ও সৃজনশীলতা ব্যবহার করে আমরা আপনার হাতের কাছেই এনে দিচ্ছি প্রয়োজনীয় সব পণ্য।",
    storyTitle: "👥 আমাদের টিম",
    storyContent: "আমাদের দল অভিজ্ঞ ও দক্ষ পেশাদারদের নিয়ে গঠিত যারা গ্রাহক সেবায় নিবেদিত।",
    teamTitle: "👥 আমাদের টিম",
    teamDescription: "আপনাদের আস্থা ও ভালোবাসাই আমাদের অনুপ্রেরণা।"
  });

  useEffect(() => {
    // Load about content from localStorage (set by admin panel)
    const storedAboutContent = localStorage.getItem("aboutContent");
    if (storedAboutContent) {
      setAboutContent(JSON.parse(storedAboutContent));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">{aboutContent.title}</h1>
              
              <div className="bg-white shadow-md rounded-lg p-8 mb-10">
                <p className="text-lg mb-6 text-center">{aboutContent.description}</p>
                
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3 text-purple-800">আমাদের বিশ্বাস</h3>
                    <p>{aboutContent.mission}</p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-3 text-purple-800">আমাদের লক্ষ্য</h3>
                    <p>{aboutContent.vision}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow-md rounded-lg p-8 mb-10">
                <h2 className="text-2xl font-bold mb-6 text-center">👥 আমাদের টিম</h2>
                
                <div className="space-y-6">
                  <div className="border-l-4 border-purple-500 pl-6">
                    <h3 className="text-xl font-semibold mb-2">🔸 Md Abdullah Al Hossein – Product Lead & Co-Founder</h3>
                    <p className="text-gray-700">
                      পণ্যের মান, সংগ্রহ ও যাচাই-বাছাইয়ের ক্ষেত্রে তিনি সর্বদা দায়িত্বশীল ভূমিকা পালন করেন। প্রতিটি পণ্যের মান যেন গ্রাহকের প্রত্যাশা পূরণ করে, সেটি নিশ্চিত করাই তাঁর লক্ষ্য।
                    </p>
                  </div>
                  
                  <div className="border-l-4 border-purple-500 pl-6">
                    <h3 className="text-xl font-semibold mb-2">🔸 Jawad – Marketing Lead & Co-Founder</h3>
                    <p className="text-gray-700">
                      গ্রাহকের কাছে পৌঁছানো, মার্কেটিং কৌশল তৈরি এবং Betagi E-Shop-এর ব্র্যান্ড পরিচিতি বাড়ানোর মূল দায়িত্বে আছেন।
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white shadow-md rounded-lg p-8 text-center">
                <p className="text-lg font-semibold text-purple-800 mb-4">
                  আপনাদের আস্থা ও ভালোবাসাই আমাদের অনুপ্রেরণা।
                </p>
                <div className="text-gray-700">
                  <p className="mb-2">📞 যোগাযোগ:</p>
                  <p className="font-semibold">+880 1584-013318</p>
                  <p className="font-semibold">+880 1305-006515</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default AboutUs;
