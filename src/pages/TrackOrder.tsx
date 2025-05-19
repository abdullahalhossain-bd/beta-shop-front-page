
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import TrackOrderContainer from "@/components/track-order/TrackOrderContainer";
import { fetchUserOrders } from "@/components/track-order/trackOrderUtils";
import type { Order } from "@/components/track-order/trackOrderUtils";

const TrackOrder = () => {
  const [userOrders, setUserOrders] = useState<Order[]>([]);
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

  return (
    <div className="container mx-auto px-4 py-12 min-h-[80vh]">
      <h1 className="text-3xl font-bold text-center mb-8">Track Your Order</h1>
      <TrackOrderContainer user={user} userOrders={userOrders} />
    </div>
  );
};

export default TrackOrder;
