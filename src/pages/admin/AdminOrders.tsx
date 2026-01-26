import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  ArrowLeft,
  ShoppingBag,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
} from "lucide-react";
import { format } from "date-fns";
import { th } from "date-fns/locale";

interface OrderItem {
  id: string;
  menu_item_name: string;
  quantity: number;
  price: number;
  selected_options: any;
}

interface Order {
  id: string;
  created_at: string;
  status: string;
  order_type: string;
  total_amount: number;
  table_number: number | null;
  special_requests: string | null;
  payment_method: string | null;
  items: OrderItem[];
}

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  pending: { label: "รอดำเนินการ", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  confirmed: { label: "ยืนยันแล้ว", color: "bg-blue-100 text-blue-800", icon: CheckCircle },
  preparing: { label: "กำลังเตรียม", color: "bg-purple-100 text-purple-800", icon: ShoppingBag },
  ready: { label: "พร้อมเสิร์ฟ", color: "bg-green-100 text-green-800", icon: Truck },
  completed: { label: "เสร็จสิ้น", color: "bg-gray-100 text-gray-800", icon: CheckCircle },
  cancelled: { label: "ยกเลิก", color: "bg-red-100 text-red-800", icon: XCircle },
};

const AdminOrders = () => {
  const { user, loading } = useAuth();
  const { getItemCount } = useCart();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>("all");

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    fetchOrders();

    // Realtime subscription
    const channel = supabase
      .channel("orders-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        () => {
          fetchOrders();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchOrders = async () => {
    const { data: ordersData, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("ไม่สามารถโหลดข้อมูลออเดอร์ได้");
      return;
    }

    // Fetch order items for each order
    const ordersWithItems = await Promise.all(
      (ordersData || []).map(async (order) => {
        const { data: items } = await supabase
          .from("order_items")
          .select("*")
          .eq("order_id", order.id);

        return {
          ...order,
          items: items || [],
        };
      })
    );

    setOrders(ordersWithItems);
  };

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", orderId);

    if (error) {
      toast.error("ไม่สามารถอัพเดทสถานะได้");
      return;
    }

    toast.success("อัพเดทสถานะสำเร็จ");
    fetchOrders();
  };

  const filteredOrders =
    filterStatus === "all"
      ? orders
      : orders.filter((order) => order.status === filterStatus);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>กำลังโหลด...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartItemsCount={getItemCount()} />

      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <ShoppingBag className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">จัดการออเดอร์</h1>
          </div>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="กรองสถานะ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ทั้งหมด</SelectItem>
              <SelectItem value="pending">รอดำเนินการ</SelectItem>
              <SelectItem value="confirmed">ยืนยันแล้ว</SelectItem>
              <SelectItem value="preparing">กำลังเตรียม</SelectItem>
              <SelectItem value="ready">พร้อมเสิร์ฟ</SelectItem>
              <SelectItem value="completed">เสร็จสิ้น</SelectItem>
              <SelectItem value="cancelled">ยกเลิก</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => {
            const status = statusConfig[order.status || "pending"];
            const StatusIcon = status.icon;

            return (
              <Card key={order.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-lg">
                        #{order.id.slice(0, 8).toUpperCase()}
                      </CardTitle>
                      <Badge className={status.color}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {status.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(order.created_at), "d MMM yyyy HH:mm", {
                        locale: th,
                      })}
                    </p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">
                        ประเภท:{" "}
                        <span className="text-foreground">
                          {order.order_type === "dine-in"
                            ? `ทานที่ร้าน (โต๊ะ ${order.table_number})`
                            : "สั่งกลับบ้าน"}
                        </span>
                      </p>
                      <p className="text-sm text-muted-foreground mb-2">
                        ชำระเงิน:{" "}
                        <span className="text-foreground">
                          {order.payment_method === "cash" ? "เงินสด" : "โอนเงิน"}
                        </span>
                      </p>
                      {order.special_requests && (
                        <p className="text-sm text-muted-foreground">
                          หมายเหตุ:{" "}
                          <span className="text-foreground">
                            {order.special_requests}
                          </span>
                        </p>
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">รายการอาหาร:</p>
                      <ul className="text-sm space-y-1">
                        {order.items.map((item) => (
                          <li key={item.id} className="flex justify-between">
                            <span>
                              {item.menu_item_name} x{item.quantity}
                            </span>
                            <span>฿{item.price * item.quantity}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="border-t mt-2 pt-2">
                        <p className="font-bold text-right">
                          รวม: ฿{order.total_amount}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Status Update */}
                  {order.status !== "completed" && order.status !== "cancelled" && (
                    <div className="flex gap-2 mt-4 pt-4 border-t">
                      {order.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => handleUpdateStatus(order.id, "confirmed")}
                          >
                            ยืนยัน
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleUpdateStatus(order.id, "cancelled")}
                          >
                            ยกเลิก
                          </Button>
                        </>
                      )}
                      {order.status === "confirmed" && (
                        <Button
                          size="sm"
                          onClick={() => handleUpdateStatus(order.id, "preparing")}
                        >
                          เริ่มเตรียมอาหาร
                        </Button>
                      )}
                      {order.status === "preparing" && (
                        <Button
                          size="sm"
                          onClick={() => handleUpdateStatus(order.id, "ready")}
                        >
                          อาหารพร้อมเสิร์ฟ
                        </Button>
                      )}
                      {order.status === "ready" && (
                        <Button
                          size="sm"
                          onClick={() => handleUpdateStatus(order.id, "completed")}
                        >
                          เสร็จสิ้น
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">ไม่มีออเดอร์</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOrders;
