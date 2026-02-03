import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { useOrders, OrderData } from "@/hooks/useOrders";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  UtensilsCrossed,
  ShoppingBag,
  CreditCard,
  Banknote,
  ArrowLeft,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getTotalPrice, getItemCount, clearCart } = useCart();
  const { user } = useAuth();
  const { createOrder, loading } = useOrders();

  const [orderType, setOrderType] = useState<"dine-in" | "takeaway">("dine-in");
  const [tableNumber, setTableNumber] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "card">("cash");

  const handleSubmit = async () => {
    if (!user) {
      toast.error("กรุณาเข้าสู่ระบบก่อนสั่งอาหาร");
      navigate("/auth");
      return;
    }

    if (cart.length === 0) {
      toast.error("ตะกร้าว่างเปล่า");
      navigate("/menu");
      return;
    }

    if (orderType === "dine-in" && !tableNumber) {
      toast.error("กรุณาระบุหมายเลขโต๊ะ");
      return;
    }

    const orderData: OrderData = {
      orderType,
      tableNumber: tableNumber ? parseInt(tableNumber) : undefined,
      specialRequests: specialRequests || undefined,
      paymentMethod,
    };

    const result = await createOrder(cart, getTotalPrice(), orderData);

    if (result.success) {
      clearCart();
      navigate(`/order-success/${result.orderId}`);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar cartItemsCount={0} />
        <div className="container mx-auto px-4 pt-24 pb-16">
          <Card className="max-w-md mx-auto p-12 text-center shadow-medium">
            <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">ตะกร้าว่างเปล่า</h2>
            <p className="text-muted-foreground mb-6">
              คุณยังไม่ได้เพิ่มเมนูใดๆ ลงในตะกร้า
            </p>
            <Link to="/menu">
              <Button variant="default">ไปดูเมนูอาหาร</Button>
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
        <div className="max-w-2xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/cart")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            กลับไปตะกร้า
          </Button>

          <h1 className="text-3xl font-bold mb-8">ยืนยันการสั่งอาหาร</h1>

          {/* ประเภทการรับอาหาร */}
          <Card className="p-6 mb-6 shadow-medium">
            <h2 className="text-lg font-semibold mb-4">วิธีรับอาหาร</h2>
            <RadioGroup
              value={orderType}
              onValueChange={(value) =>
                setOrderType(value as "dine-in" | "takeaway")
              }
              className="grid grid-cols-2 gap-4"
            >
              <Label
                htmlFor="dine-in"
                className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                  orderType === "dine-in"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <RadioGroupItem value="dine-in" id="dine-in" />
                <UtensilsCrossed className="h-5 w-5" />
                <span>ทานที่ร้าน</span>
              </Label>
              <Label
                htmlFor="takeaway"
                className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                  orderType === "takeaway"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <RadioGroupItem value="takeaway" id="takeaway" />
                <ShoppingBag className="h-5 w-5" />
                <span>กลับบ้าน</span>
              </Label>
            </RadioGroup>

            {orderType === "dine-in" && (
              <div className="mt-4">
                <Label htmlFor="tableNumber">หมายเลขโต๊ะ *</Label>
                <Input
                  id="tableNumber"
                  type="number"
                  min="1"
                  max="50"
                  placeholder="ระบุหมายเลขโต๊ะ"
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="mt-1"
                />
              </div>
            )}
          </Card>

          {/* วิธีชำระเงิน */}
          <Card className="p-6 mb-6 shadow-medium">
            <h2 className="text-lg font-semibold mb-4">วิธีชำระเงิน</h2>
            <RadioGroup
              value={paymentMethod}
              onValueChange={(value) =>
                setPaymentMethod(value as "cash" | "card")
              }
              className="grid grid-cols-2 gap-4"
            >
              <Label
                htmlFor="cash"
                className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                  paymentMethod === "cash"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <RadioGroupItem value="cash" id="cash" />
                <Banknote className="h-5 w-5" />
                <span>เงินสด</span>
              </Label>
              <Label
                htmlFor="card"
                className={`flex items-center gap-3 p-4 border rounded-lg cursor-pointer transition-all ${
                  paymentMethod === "card"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <RadioGroupItem value="card" id="card" />
                <CreditCard className="h-5 w-5" />
                <span>บัตรเครดิต</span>
              </Label>
            </RadioGroup>
          </Card>

          {/* คำขอพิเศษ */}
          <Card className="p-6 mb-6 shadow-medium">
            <h2 className="text-lg font-semibold mb-4">คำขอพิเศษ (ถ้ามี)</h2>
            <Textarea
              placeholder="เช่น ไม่ใส่ผัก, เผ็ดน้อย, แพ้ถั่ว เป็นต้น"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              rows={3}
            />
          </Card>

          {/* สรุปออเดอร์ */}
          <Card className="p-6 mb-6 shadow-medium">
            <h2 className="text-lg font-semibold mb-4">สรุปรายการ</h2>
            <div className="space-y-3">
              {cart.map((item, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>
                    {item.name} x{item.quantity}
                    {item.size && (
                      <span className="text-muted-foreground ml-1">
                        ({item.size === "cup" ? "ถ้วย" : "หม้อ"})
                      </span>
                    )}
                  </span>
                  <span>฿{(item.finalPrice || item.price) * item.quantity}</span>
                </div>
              ))}
              <div className="border-t pt-3 flex justify-between font-bold text-lg">
                <span>รวมทั้งหมด</span>
                <span className="text-primary">฿{getTotalPrice()}</span>
              </div>
            </div>
          </Card>

          {/* ปุ่มยืนยัน */}
          {!user ? (
            <Link to="/auth" className="block">
              <Button className="w-full" size="lg" variant="action">
                เข้าสู่ระบบเพื่อสั่งอาหาร
              </Button>
            </Link>
          ) : (
            <Button
              className="w-full"
              size="lg"
              variant="action"
              onClick={handleSubmit}
              disabled={loading || (orderType === "dine-in" && !tableNumber)}
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  กำลังดำเนินการ...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  ยืนยันสั่งอาหาร
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
