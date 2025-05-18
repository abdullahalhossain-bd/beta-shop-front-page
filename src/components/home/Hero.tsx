
import { Button } from "@/components/ui/button";
import { theme } from "@/lib/theme";
import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";

const Hero = () => {
  return (
    <section 
      className="py-20 lg:py-32 relative"
      style={{ 
        background: `linear-gradient(rgba(4, 2, 115, 0.8), rgba(106, 13, 173, 0.8)), url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop') no-repeat center/cover` 
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center text-white space-y-6">
          <h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold animate-fade-in"
            style={{ animationDuration: "1s" }}
          >
            Welcome to Betagi E-Shop
          </h1>
          <p 
            className="text-lg md:text-xl opacity-90 animate-fade-in" 
            style={{ animationDuration: "1s", animationDelay: "0.3s" }}
          >
            Discover a world of quality products at unbeatable prices. From fashion to electronics, we've got everything you need.
          </p>
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
            style={{ animationDuration: "1s", animationDelay: "0.6s" }}
          >
            <Button 
              size="lg" 
              className="text-lg px-8 rounded-full"
              style={{ backgroundColor: theme.colors.primary }}
              asChild
            >
              <Link to="/featured-products">Explore Now</Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-8 rounded-full border-white text-white hover:bg-white hover:text-gray-900"
              asChild
            >
              <Link to="/shop">Browse Shop</Link>
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 animate-fade-in"
               style={{ animationDuration: "1s", animationDelay: "0.9s" }}>
            <a 
              href="tel:+1234567890" 
              className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors"
            >
              <Phone className="h-5 w-5" />
              <span>+1 (234) 567-890</span>
            </a>
            <a 
              href="mailto:contact@betagi-eshop.com" 
              className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors"
            >
              <Mail className="h-5 w-5" />
              <span>contact@betagi-eshop.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
