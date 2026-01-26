import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { useOrders, Order } from "@/hooks/useOrders";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  CheckCircle2,
  Clock,
  UtensilsCrossed,
  ShoppingBag,
  Receipt,
  Loader2,
} from "lucide-react";

const OrderSuccess = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { getOrderById } = useOrders();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      if (orderId) {
        const orderData = await getOrderById(orderId);
        setOrder(orderData);
      }
      setLoading(false);
    };
    fetchOrder();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar cartItemsCount={0} />
        <div className="container mx-auto px-4 pt-24 pb-16 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartItemsCount={0} />

      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-lg mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">สั่งอาหารสำเร็จ!</h1>
            <p className="text-muted-foreground">
              ขอบคุณที่ใช้บริการร้านติดลม-TIDLOM
            </p>
          </div>

          {order && (
            <Card className="p-6 mb-6 shadow-medium text-left">
              <div className="flex items-center gap-2 mb-4 pb-4 border-b">
                <Receipt className="h-5 w-5 text-primary" />
                <span className="font-semibold">รายละเอียดออเดอร์</span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">หมายเลขออเดอร์</span>
                  <span className="font-mono text-xs">
                    {order.id.slice(0, 8).toUpperCase()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">ประเภท</span>
                  <span className="flex items-center gap-1">
                    {order.order_type === "dine-in" ? (
                      <>
                        <UtensilsCrossed className="h-4 w-4" />
                        ทานที่ร้าน
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="h-4 w-4" />
                        กลับบ้าน
                      </>
                    )}
                  </span>
                </div>

                {order.table_number && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">โต๊ะ</span>
                    <span>โต๊ะ {order.table_number}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-muted-foreground">สถานะ</span>
                  <span className="flex items-center gap-1 text-amber-600">
                    <Clock className="h-4 w-4" />
                    กำลังเตรียมอาหาร
                  </span>
                </div>

                <div className="border-t pt-3 mt-3">
                  <p className="font-semibold mb-2">รายการอาหาร</p>
                  {order.items?.map((item, index) => (
                    <div key={index} className="flex justify-between py-1">
                      <span>
                        {item.menu_item_name} x{item.quantity}
                      </span>
                      <span>฿{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>รวมทั้งหมด</span>
                  <span className="text-primary">฿{order.total_amount}</span>
                </div>
              </div>
            </Card>
          )}

          <div className="space-y-3">
            <Link to="/orders" className="block">
              <Button className="w-full" variant="default">
                ดูประวัติการสั่งอาหาร
              </Button>
            </Link>
            <Link to="/menu" className="block">
              <Button className="w-full" variant="outline">
                สั่งอาหารเพิ่มเติม
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
