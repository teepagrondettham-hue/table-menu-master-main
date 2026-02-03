import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useOrders, Order } from "@/hooks/useOrders";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  UtensilsCrossed,
  ShoppingBag,
  Clock,
  CheckCircle2,
  XCircle,
  Package,
  Loader2,
  Receipt,
} from "lucide-react";
import { format } from "date-fns";
import { th } from "date-fns/locale";

const statusConfig: Record<
  string,
  { label: string; icon: React.ElementType; color: string }
> = {
  pending: {
    label: "รอยืนยัน",
    icon: Clock,
    color: "bg-amber-100 text-amber-800",
  },
  confirmed: {
    label: "กำลังเตรียม",
    icon: Package,
    color: "bg-blue-100 text-blue-800",
  },
  completed: {
    label: "เสร็จสิ้น",
    icon: CheckCircle2,
    color: "bg-green-100 text-green-800",
  },
  cancelled: {
    label: "ยกเลิก",
    icon: XCircle,
    color: "bg-red-100 text-red-800",
  },
};

const Orders = () => {
  const { user, loading: authLoading } = useAuth();
  const { getItemCount } = useCart();
  const { getOrders } = useOrders();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        const data = await getOrders();
        setOrders(data);
      }
      setLoading(false);
    };
    fetchOrders();
  }, [user]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar cartItemsCount={getItemCount()} />
        <div className="container mx-auto px-4 pt-24 pb-16 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar cartItemsCount={getItemCount()} />
        <div className="container mx-auto px-4 pt-24 pb-16">
          <Card className="max-w-md mx-auto p-12 text-center shadow-medium">
            <Receipt className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">กรุณาเข้าสู่ระบบ</h2>
            <p className="text-muted-foreground mb-6">
              เข้าสู่ระบบเพื่อดูประวัติการสั่งอาหาร
            </p>
            <Link to="/auth">
              <Button variant="default">เข้าสู่ระบบ</Button>
            </Link>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartItemsCount={getItemCount()} />

      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">ประวัติการสั่งอาหาร</h1>

          {orders.length === 0 ? (
            <Card className="p-12 text-center shadow-medium">
              <Receipt className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="text-xl font-semibold mb-2">ยังไม่มีประวัติออเดอร์</h2>
              <p className="text-muted-foreground mb-6">
                คุณยังไม่เคยสั่งอาหารกับเรา
              </p>
              <Link to="/menu">
                <Button variant="default">เริ่มสั่งอาหาร</Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const status = statusConfig[order.status] || statusConfig.pending;
                const StatusIcon = status.icon;

                return (
                  <Card key={order.id} className="p-5 shadow-medium">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(order.created_at), "d MMMM yyyy เวลา HH:mm น.", {
                            locale: th,
                          })}
                        </p>
                        <p className="font-mono text-xs text-muted-foreground mt-1">
                          #{order.id.slice(0, 8).toUpperCase()}
                        </p>
                      </div>
                      <Badge className={status.color}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {status.label}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        {order.order_type === "dine-in" ? (
                          <>
                            <UtensilsCrossed className="h-4 w-4" />
                            <span>ทานที่ร้าน</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="h-4 w-4" />
                            <span>กลับบ้าน</span>
                          </>
                        )}
                      </div>
                      {order.table_number && (
                        <span className="text-sm text-muted-foreground">
                          โต๊ะ {order.table_number}
                        </span>
                      )}
                    </div>

                    <div className="border-t pt-3">
                      <div className="space-y-1 text-sm mb-3">
                        {order.items?.slice(0, 3).map((item, index) => (
                          <div key={index} className="flex justify-between">
                            <span className="text-muted-foreground">
                              {item.menu_item_name} x{item.quantity}
                            </span>
                            <span>฿{item.price * item.quantity}</span>
                          </div>
                        ))}
                        {order.items && order.items.length > 3 && (
                          <p className="text-muted-foreground text-xs">
                            +{order.items.length - 3} รายการเพิ่มเติม
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="font-semibold">รวมทั้งหมด</span>
                        <span className="text-lg font-bold text-primary">
                          ฿{order.total_amount}
                        </span>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
