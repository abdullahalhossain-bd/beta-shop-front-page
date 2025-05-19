
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { theme } from "@/lib/theme";
import { supabase } from "@/integrations/supabase/client";

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState("");
  const [orderEmail, setOrderEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [userOrders, setUserOrders] = useState<any[]>([]);
  const [trackingResult, setTrackingResult] = useState<null | {
    id: string;
    customer: string;
    date: string;
    total: number;
    status: string;
    items: string[];
    estimatedDelivery?: string;
    trackingHistory: {
      status: string;
      date: string;
      location?: string;
    }[];
  }>(null);
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        setUser(data.session.user);
        fetchUserOrders(data.session.user.id);
      }
    };

    fetchUser();
  }, []);

  // Fetch user orders
  const fetchUserOrders = (userId: string) => {
    // In a real app, this would be an API call to get user orders
    // For now, using mock data
    const mockOrders = [
      {
        id: "ORD-001",
        customer: "John Doe",
        date: "2023-05-15",
        total: 125.99,
        status: "delivered",
        items: ["Cotton T-shirt", "Denim Jeans"],
        estimatedDelivery: "2023-05-20",
        trackingHistory: [
          {
            status: "Order Placed",
            date: "2023-05-10 09:15",
            location: "Online"
          },
          {
            status: "Processing",
            date: "2023-05-11 11:30",
            location: "Warehouse"
          },
          {
            status: "Shipped",
            date: "2023-05-12 14:45",
            location: "Distribution Center"
          },
          {
            status: "In Transit",
            date: "2023-05-13 08:20",
            location: "Shipping Carrier"
          },
          {
            status: "Delivered",
            date: "2023-05-15 14:30",
            location: "Customer Address"
          }
        ]
      },
      {
        id: "ORD-002",
        customer: "John Doe",
        date: "2023-05-10",
        total: 78.50,
        status: "shipped",
        items: ["Wireless Earbuds", "Phone Case"],
        estimatedDelivery: "2023-05-18",
        trackingHistory: [
          {
            status: "Order Placed",
            date: "2023-05-05 14:22",
            location: "Online"
          },
          {
            status: "Processing",
            date: "2023-05-06 09:45",
            location: "Warehouse"
          },
          {
            status: "Shipped",
            date: "2023-05-07 16:30",
            location: "Distribution Center"
          },
          {
            status: "In Transit",
            date: "2023-05-09 10:15",
            location: "Shipping Carrier"
          }
        ]
      }
    ];
    
    setUserOrders(mockOrders);
  };

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      if (orderNumber === "ORD-001" || orderNumber === "ORD-002" || orderNumber === "ORD-003") {
        const mockData = {
          id: orderNumber,
          customer: "John Doe",
          email: "john@example.com",
          date: "2023-05-15",
          total: 125.99,
          status: orderNumber === "ORD-001" ? "delivered" : orderNumber === "ORD-002" ? "shipped" : "processing",
          items: [
            "Cotton T-shirt", 
            "Denim Jeans"
          ],
          estimatedDelivery: "2023-05-20",
          trackingHistory: [
            {
              status: "Order Placed",
              date: "2023-05-10 09:15",
              location: "Online"
            },
            {
              status: "Processing",
              date: "2023-05-11 11:30",
              location: "Warehouse"
            },
            {
              status: orderNumber === "ORD-001" || orderNumber === "ORD-002" ? "Shipped" : "Processing",
              date: "2023-05-12 14:45",
              location: "Distribution Center"
            }
          ]
        };
        
        if (orderNumber === "ORD-001" || orderNumber === "ORD-002") {
          mockData.trackingHistory.push({
            status: "In Transit",
            date: "2023-05-13 08:20",
            location: "Shipping Carrier"
          });
        }
        
        if (orderNumber === "ORD-001") {
          mockData.trackingHistory.push({
            status: "Delivered",
            date: "2023-05-15 14:30",
            location: "Customer Address"
          });
        }
        
        setTrackingResult(mockData);
        setLoading(false);
      } else {
        toast.error("Order not found. Please check your order number and email.");
        setLoading(false);
        setTrackingResult(null);
      }
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch(status.toLowerCase()) {
      case "delivered": return "bg-green-100 text-green-800";
      case "shipped": 
      case "in transit": return "bg-blue-100 text-blue-800";
      case "processing": return "bg-yellow-100 text-yellow-800";
      case "order placed": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleWriteReview = () => {
    if (trackingResult) {
      navigate(`/review/${trackingResult.id}`);
    }
  };

  const handleViewOrderDetails = (order: any) => {
    setTrackingResult(order);
  };

  return (
    <div className="container mx-auto px-4 py-12 min-h-[80vh]">
      <h1 className="text-3xl font-bold text-center mb-8">Track Your Order</h1>
      
      {user ? (
        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-100 p-4 rounded-lg mb-6">
            <p className="text-blue-800">Welcome back! Here are your recent orders:</p>
          </div>
          
          {userOrders.length > 0 ? (
            <div className="grid gap-4 mb-8">
              {userOrders.map((order) => (
                <div 
                  key={order.id} 
                  className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-all"
                  onClick={() => handleViewOrderDetails(order)}
                >
                  <div className="flex flex-wrap justify-between items-center">
                    <div>
                      <h3 className="font-medium">Order #{order.id}</h3>
                      <p className="text-sm text-gray-500">Placed on {order.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <p>You don't have any orders yet.</p>
            </div>
          )}
          
          <div className="border-t border-gray-200 pt-8 mt-6">
            <h2 className="text-xl font-semibold mb-4">Track Another Order</h2>
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
              <form onSubmit={handleTrackOrder} className="space-y-4">
                <div>
                  <label htmlFor="orderNumber" className="block text-sm font-medium mb-1">
                    Order Number
                  </label>
                  <Input
                    id="orderNumber"
                    placeholder="e.g. ORD-001"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="orderEmail" className="block text-sm font-medium mb-1">
                    Email Address (optional)
                  </label>
                  <Input
                    id="orderEmail"
                    type="email"
                    placeholder="Email used for order"
                    value={orderEmail}
                    onChange={(e) => setOrderEmail(e.target.value)}
                  />
                </div>
                <Button 
                  type="submit"
                  className="w-full flex items-center justify-center gap-2"
                  disabled={loading || !orderNumber}
                  style={{ backgroundColor: theme.colors.primary }}
                >
                  {loading ? "Searching..." : (
                    <>
                      <Search size={16} /> Track Order
                    </>
                  )}
                </Button>
                <div className="text-center text-xs text-gray-500 mt-2">
                  Try with demo order numbers: ORD-001, ORD-002, or ORD-003
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-blue-50 rounded-lg shadow-md p-6 mb-10">
          <form onSubmit={handleTrackOrder} className="space-y-4">
            <div>
              <label htmlFor="orderNumber" className="block text-sm font-medium mb-1">
                Order Number
              </label>
              <Input
                id="orderNumber"
                placeholder="e.g. ORD-001"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="orderEmail" className="block text-sm font-medium mb-1">
                Email Address (optional)
              </label>
              <Input
                id="orderEmail"
                type="email"
                placeholder="Email used for order"
                value={orderEmail}
                onChange={(e) => setOrderEmail(e.target.value)}
              />
            </div>
            <Button 
              type="submit"
              className="w-full flex items-center justify-center gap-2"
              disabled={loading || !orderNumber}
              style={{ backgroundColor: theme.colors.primary }}
            >
              {loading ? "Searching..." : (
                <>
                  <Search size={16} /> Track Order
                </>
              )}
            </Button>
            <div className="text-center text-xs text-gray-500 mt-2">
              Try with demo order numbers: ORD-001, ORD-002, or ORD-003
            </div>
          </form>
        </div>
      )}

      {/* Order tracking result */}
      {trackingResult && (
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mt-6">
          <div className="border-b pb-4 mb-4">
            <h2 className="text-2xl font-semibold mb-2">Order #{trackingResult.id}</h2>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Order Date</p>
                <p className="font-medium">{trackingResult.date}</p>
              </div>
              <div>
                <p className="text-gray-500">Total Amount</p>
                <p className="font-medium">${trackingResult.total.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-gray-500">Status</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(trackingResult.status)}`}>
                  {trackingResult.status.charAt(0).toUpperCase() + trackingResult.status.slice(1)}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Ordered Items</h3>
            <ul className="space-y-2">
              {trackingResult.items.map((item, index) => (
                <li key={index} className="px-3 py-2 bg-gray-50 rounded">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-3">Estimated Delivery</h3>
            <p className="font-medium">{trackingResult.estimatedDelivery || "To be determined"}</p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Tracking History</h3>
            <div className="relative">
              {/* Timeline connector */}
              <div className="absolute top-0 left-4 w-0.5 h-full bg-gray-200"></div>
              
              {/* Timeline items */}
              <div className="space-y-6">
                {trackingResult.trackingHistory.map((event, index) => (
                  <div key={index} className="relative pl-10">
                    <div className={`absolute left-0 top-1 w-8 h-8 rounded-full flex items-center justify-center ${index === 0 ? 'bg-[#6a0dad] text-white' : 'bg-gray-200'}`}>
                      {index + 1}
                    </div>
                    <div className="mb-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">{event.date}</span>
                    </div>
                    {event.location && (
                      <p className="text-sm text-gray-600">{event.location}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {trackingResult.status.toLowerCase() === "delivered" && (
            <div className="mt-8 border-t pt-6">
              <p className="mb-3">How was your experience? Share your feedback!</p>
              <Button 
                onClick={handleWriteReview} 
                style={{ backgroundColor: theme.colors.secondary }}
              >
                Write a Review
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
