import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Calendar, Clock, Users, Table as TableIcon } from "lucide-react";

const tables = [
  { id: 1, seats: 2, status: "available" },
  { id: 2, seats: 2, status: "available" },
  { id: 3, seats: 4, status: "available" },
  { id: 4, seats: 4, status: "reserved" },
  { id: 5, seats: 6, status: "available" },
  { id: 6, seats: 8, status: "available" },
];

const Reservation = () => {
  const navigate = useNavigate();
  const { getItemCount, cart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    tableNumber: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.date || !formData.time || !formData.guests || !formData.tableNumber) {
      toast.error("กรุณากรอกข้อมูลให้ครบทุกช่อง");
      return;
    }

    // Generate reservation ID
    const reservationId = `RES${Date.now().toString().slice(-6)}`;
    
    toast.success(`จองสำเร็จ! หมายเลขการจอง: ${reservationId}`, {
      description: `โต๊ะหมายเลข ${formData.tableNumber} วันที่ ${formData.date} เวลา ${formData.time}`,
      duration: 5000,
    });

    // Store reservation in localStorage
    const reservations = JSON.parse(localStorage.getItem("reservations") || "[]");
    reservations.push({
      id: reservationId,
      ...formData,
      status: "confirmed",
      orders: cart,
      createdAt: new Date().toISOString(),
    });
    localStorage.setItem("reservations", JSON.stringify(reservations));

    setTimeout(() => {
      navigate("/reservations");
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartItemsCount={getItemCount()} />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">จองโต๊ะ</h1>
            <p className="text-muted-foreground">
              กรอกข้อมูลเพื่อจองโต๊ะของคุณ
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Reservation Form */}
            <Card className="p-6 shadow-medium">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">ชื่อผู้จอง *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="กรอกชื่อของคุณ"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">เบอร์โทร *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="0XX-XXX-XXXX"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="date">
                    <Calendar className="inline mr-2 h-4 w-4" />
                    วันที่ *
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="time">
                    <Clock className="inline mr-2 h-4 w-4" />
                    เวลา *
                  </Label>
                  <Input
                    id="time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="guests">
                    <Users className="inline mr-2 h-4 w-4" />
                    จำนวนลูกค้า *
                  </Label>
                  <Input
                    id="guests"
                    name="guests"
                    type="number"
                    min="1"
                    max="20"
                    placeholder="จำนวนคน"
                    value={formData.guests}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="tableNumber">
                    <TableIcon className="inline mr-2 h-4 w-4" />
                    เลือกโต๊ะ *
                  </Label>
                  <Input
                    id="tableNumber"
                    name="tableNumber"
                    type="number"
                    placeholder="หมายเลขโต๊ะ"
                    value={formData.tableNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" variant="action">
                  ยืนยันการจอง
                </Button>
              </form>
            </Card>

            {/* Table Status */}
            <div>
              <Card className="p-6 shadow-medium mb-6">
                <h3 className="text-xl font-semibold mb-4">สถานะโต๊ะ</h3>
                <div className="grid grid-cols-3 gap-3">
                  {tables.map((table) => (
                    <button
                      key={table.id}
                      type="button"
                      onClick={() =>
                        table.status === "available" &&
                        setFormData({ ...formData, tableNumber: table.id.toString() })
                      }
                      disabled={table.status === "reserved"}
                      className={`
                        p-4 rounded-lg border-2 transition-smooth
                        ${
                          table.status === "available"
                            ? "border-available bg-available/10 hover:bg-available/20 cursor-pointer"
                            : "border-reserved bg-reserved/10 cursor-not-allowed opacity-60"
                        }
                        ${
                          formData.tableNumber === table.id.toString()
                            ? "ring-2 ring-primary"
                            : ""
                        }
                      `}
                    >
                      <div className="text-center">
                        <TableIcon className="h-8 w-8 mx-auto mb-2" />
                        <div className="font-semibold">โต๊ะ {table.id}</div>
                        <div className="text-sm text-muted-foreground">
                          {table.seats} ที่นั่ง
                        </div>
                        <div className="text-xs mt-1">
                          {table.status === "available" ? "🟢 ว่าง" : "🔴 จองแล้ว"}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </Card>

              {cart.length > 0 && (
                <Card className="p-6 shadow-medium">
                  <h3 className="text-xl font-semibold mb-4">
                    ออเดอร์ล่วงหน้า ({cart.length} รายการ)
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    รายการอาหารที่คุณเลือกจะถูกเตรียมให้พร้อมเมื่อคุณมาถึง
                  </p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
