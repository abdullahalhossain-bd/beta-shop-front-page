
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { theme } from "@/lib/theme";

const CtaBanner = () => {
  // Set countdown date to 48 hours from now
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Set end date to 2 days from now
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 2);
    
    const calculateTimeLeft = () => {
      const difference = endDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, []);

  const padWithZero = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <section 
      className="py-16"
      style={{
        background: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.secondary})`,
        color: "white"
      }}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold">Summer Sale is Live!</h2>
          <p className="text-lg opacity-90">Get up to 50% off on all products. Hurry up, limited time offer!</p>

          <div className="flex flex-wrap justify-center gap-6">
            <div className="bg-white/10 rounded-lg p-4 min-w-24 backdrop-blur-sm">
              <div className="text-3xl md:text-4xl font-bold">{padWithZero(timeLeft.days)}</div>
              <div className="text-xs uppercase tracking-wider mt-1">Days</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 min-w-24 backdrop-blur-sm">
              <div className="text-3xl md:text-4xl font-bold">{padWithZero(timeLeft.hours)}</div>
              <div className="text-xs uppercase tracking-wider mt-1">Hours</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 min-w-24 backdrop-blur-sm">
              <div className="text-3xl md:text-4xl font-bold">{padWithZero(timeLeft.minutes)}</div>
              <div className="text-xs uppercase tracking-wider mt-1">Minutes</div>
            </div>
            <div className="bg-white/10 rounded-lg p-4 min-w-24 backdrop-blur-sm">
              <div className="text-3xl md:text-4xl font-bold">{padWithZero(timeLeft.seconds)}</div>
              <div className="text-xs uppercase tracking-wider mt-1">Seconds</div>
            </div>
          </div>

          <Button 
            className="text-lg px-8 py-6 rounded-full" 
            style={{ backgroundColor: "white", color: theme.colors.primary }}
          >
            Shop Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaBanner;
