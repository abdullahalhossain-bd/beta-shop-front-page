
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import TrackOrderForm from "@/components/track-order/TrackOrderForm";
import OrderList from "@/components/track-order/OrderList";
import OrderDetails from "@/components/track-order/OrderDetails";
import { 
  fetchOrderByNumber, 
  fetchUserOrders, 
  type Order 
} from "@/components/track-order/trackOrderUtils";

const TrackOrder = () => {
  const [loading, setLoading] = useState(false);
  const [userOrders, setUserOrders] = useState<Order[]>([]);
  const [trackingResult, setTrackingResult] = useState<Order | null>(null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in
    const fetchUser = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        setUser(data.session.user);
        const orders = fetchUserOrders(data.session.user.id);
        setUserOrders(orders);
      }
    };

    fetchUser();
  }, []);

  const handleTrackOrder = async (orderNumber: string, orderEmail: string) => {
    setLoading(true);
    
    try {
      const result = await fetchOrderByNumber(orderNumber);
      
      if (result) {
        setTrackingResult(result);
      } else {
        toast.error("Order not found. Please check your order number and email.");
        setTrackingResult(null);
      }
    } catch (error) {
      toast.error("An error occurred while tracking your order.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewOrderDetails = (order: Order) => {
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
            <OrderList 
              orders={userOrders} 
              onViewOrderDetails={handleViewOrderDetails} 
            />
          ) : (
            <div className="bg-gray-50 p-6 rounded-lg text-center">
              <p>You don't have any orders yet.</p>
            </div>
          )}
          
          <div className="border-t border-gray-200 pt-8 mt-6">
            <h2 className="text-xl font-semibold mb-4">Track Another Order</h2>
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
              <TrackOrderForm 
                onTrackOrder={handleTrackOrder} 
                loading={loading} 
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto bg-blue-50 rounded-lg shadow-md p-6 mb-10">
          <TrackOrderForm 
            onTrackOrder={handleTrackOrder} 
            loading={loading} 
          />
        </div>
      )}

      {/* Order tracking result */}
      <OrderDetails order={trackingResult} />
    </div>
  );
};

export default TrackOrder;
