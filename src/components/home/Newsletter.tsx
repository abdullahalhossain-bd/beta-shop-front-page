
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { theme } from "@/lib/theme";
import { toast } from "sonner";
import { Send } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    
    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    
    // Store subscriber in localStorage
    const subscribers = JSON.parse(localStorage.getItem("newsletter_subscribers") || "[]");
    
    // Check if already subscribed
    if (subscribers.includes(email)) {
      toast.info("You're already subscribed to our newsletter!");
      setIsSubmitting(false);
      setEmail("");
      return;
    }
    
    // Add new subscriber
    subscribers.push(email);
    localStorage.setItem("newsletter_subscribers", JSON.stringify(subscribers));
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Thank you for subscribing to our newsletter!");
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };
  
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#040273] relative inline-block pb-4">
            Subscribe to Our Newsletter
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-[#6a0dad]"></span>
          </h2>
          <p className="text-gray-600 mb-8">
            "আমাদের প্রতিটি নতুন অফার, পণ্য ও এক্সক্লুসিভ ডিলের সব আপডেট পেতে আমাদের সঙ্গেই থাকুন।"
          </p>
          
          <form onSubmit={handleSubmit} className="relative max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="py-6 px-6 sm:flex-1 rounded-full"
              />
              <Button 
                type="submit"
                className="py-6 px-8 rounded-full font-medium flex items-center gap-2"
                style={{ backgroundColor: theme.colors.secondary }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
                <Send size={16} />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
