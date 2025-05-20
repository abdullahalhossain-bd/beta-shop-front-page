
import { useState } from "react";
import { toast } from "sonner";
import TrackOrderForm from "./TrackOrderForm";
import OrderList from "./OrderList";
import OrderDetails from "./OrderDetails";
import { fetchOrderByNumber, type Order } from "./trackOrderUtils";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface TrackOrderContainerProps {
  user: any;
  userOrders: Order[];
}

const TrackOrderContainer = ({ user, userOrders }: TrackOrderContainerProps) => {
  const [loading, setLoading] = useState(false);
  const [trackingResult, setTrackingResult] = useState<Order | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleTrackOrder = async (orderNumber: string, orderEmail: string) => {
    setLoading(true);
    
    try {
      if (!orderEmail) {
        toast.error("Please enter your email address");
        setLoading(false);
        return;
      }
      
      const result = await fetchOrderByNumber(orderNumber);
      
      if (result) {
        // Verify the email matches the order's email
        if (result.email && result.email.toLowerCase() === orderEmail.toLowerCase()) {
          setTrackingResult(result);
        } else {
          toast.error("The email address does not match our records for this order.");
          setTrackingResult(null);
        }
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
    <div className="max-w-4xl mx-auto">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <p>Order details content would go here</p>
          </div>
        </DialogContent>
      </Dialog>

      {user ? (
        <>
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
        </>
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

export default TrackOrderContainer;
