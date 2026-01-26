import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { CartItem } from "@/types";
import { toast } from "sonner";

export interface OrderData {
  orderType: "dine-in" | "takeaway";
  tableNumber?: number;
  specialRequests?: string;
  paymentMethod?: string;
  promotionCode?: string;
}

export interface Order {
  id: string;
  order_type: string;
  status: string;
  total_amount: number;
  table_number?: number;
  special_requests?: string;
  payment_method?: string;
  created_at: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  menu_item_id: string;
  menu_item_name: string;
  quantity: number;
  price: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selected_options?: any;
}

export const useOrders = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const createOrder = async (
    cart: CartItem[],
    totalAmount: number,
    orderData: OrderData
  ): Promise<{ success: boolean; orderId?: string; error?: string }> => {
    if (!user) {
      return { success: false, error: "กรุณาเข้าสู่ระบบก่อนสั่งอาหาร" };
    }

    if (cart.length === 0) {
      return { success: false, error: "ตะกร้าว่างเปล่า" };
    }

    setLoading(true);

    try {
      // สร้างออเดอร์
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          order_type: orderData.orderType,
          total_amount: totalAmount,
          table_number: orderData.tableNumber || null,
          special_requests: orderData.specialRequests || null,
          payment_method: orderData.paymentMethod || null,
          promotion_code: orderData.promotionCode || null,
          status: "pending",
        })
        .select()
        .single();

      if (orderError) {
        console.error("Order creation error:", orderError);
        throw new Error("ไม่สามารถสร้างออเดอร์ได้");
      }

      // สร้างรายการอาหารในออเดอร์
      const orderItems = cart.map((item) => ({
        order_id: order.id,
        menu_item_id: item.id,
        menu_item_name: item.name,
        quantity: item.quantity,
        price: item.finalPrice || item.price,
        selected_options: {
          size: item.size || null,
          protein: item.protein || null,
          comment: item.comment || null,
        },
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) {
        console.error("Order items error:", itemsError);
        throw new Error("ไม่สามารถบันทึกรายการอาหารได้");
      }

      toast.success("สั่งอาหารสำเร็จ!");
      return { success: true, orderId: order.id };
    } catch (error: any) {
      console.error("Create order error:", error);
      toast.error(error.message || "เกิดข้อผิดพลาด");
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const getOrders = async (): Promise<Order[]> => {
    if (!user) return [];

    try {
      const { data: orders, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // ดึงรายการอาหารสำหรับแต่ละออเดอร์
      const ordersWithItems = await Promise.all(
        (orders || []).map(async (order) => {
          const { data: items } = await supabase
            .from("order_items")
            .select("*")
            .eq("order_id", order.id);

          return {
            ...order,
            items: (items || []) as OrderItem[],
          } as Order;
        })
      );

      return ordersWithItems;
    } catch (error) {
      console.error("Get orders error:", error);
      return [];
    }
  };

  const getOrderById = async (orderId: string): Promise<Order | null> => {
    try {
      const { data: order, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .maybeSingle();

      if (error || !order) return null;

      const { data: items } = await supabase
        .from("order_items")
        .select("*")
        .eq("order_id", orderId);

      return {
        ...order,
        items: (items || []) as OrderItem[],
      } as Order;
    } catch (error) {
      console.error("Get order by ID error:", error);
      return null;
    }
  };

  return {
    createOrder,
    getOrders,
    getOrderById,
    loading,
  };
};
