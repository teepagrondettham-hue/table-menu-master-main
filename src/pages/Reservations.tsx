import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Reservation } from "@/types";
import { Search, Calendar, Clock, Users, Phone } from "lucide-react";

const Reservations = () => {
  const { getItemCount } = useCart();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("reservations");
    if (stored) {
      setReservations(JSON.parse(stored));
    }
  }, []);

  const filteredReservations = reservations.filter(
    (res) =>
      res.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      res.phone.includes(searchTerm) ||
      res.id.includes(searchTerm)
  );

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      pending: "secondary",
      confirmed: "default",
      completed: "secondary",
      cancelled: "destructive",
    };
    
    const labels: Record<string, string> = {
      pending: "รอยืนยัน",
      confirmed: "ยืนยันแล้ว",
      completed: "เสร็จสิ้น",
      cancelled: "ยกเลิก",
    };

    return (
      <Badge variant={variants[status] || "default"}>
        {labels[status] || status}
      </Badge>
    );
  };

  if (reservations.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar cartItemsCount={getItemCount()} />
        <div className="container mx-auto px-4 pt-24 pb-16">
          <Card className="max-w-md mx-auto p-12 text-center shadow-medium">
            <Calendar className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">ยังไม่มีการจอง</h2>
            <p className="text-muted-foreground mb-6">
              ยังไม่มีรายการจองในระบบ
            </p>
            <Link to="/reservation">
              <Button variant="default">จองโต๊ะเลย</Button>
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">รายการจองทั้งหมด</h1>
          <p className="text-muted-foreground">
            จำนวนการจองทั้งหมด: {reservations.length} รายการ
          </p>
        </div>

        <Card className="p-4 mb-6 shadow-soft">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="ค้นหาด้วยชื่อ, เบอร์โทร หรือหมายเลขการจอง"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        <div className="space-y-4">
          {filteredReservations.map((reservation) => (
            <Card key={reservation.id} className="p-6 shadow-medium hover:shadow-elevated transition-smooth">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-semibold">{reservation.name}</h3>
                    {getStatusBadge(reservation.status)}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      {reservation.phone}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {reservation.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {reservation.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      {reservation.guests} คน
                    </div>
                  </div>

                  <div className="mt-3 flex gap-4 text-sm">
                    <span className="font-medium">
                      โต๊ะ: <span className="text-primary">#{reservation.tableNumber}</span>
                    </span>
                    <span className="font-medium">
                      หมายเลขการจอง: <span className="text-primary">{reservation.id}</span>
                    </span>
                  </div>

                  {reservation.orders && reservation.orders.length > 0 && (
                    <div className="mt-3 text-sm text-muted-foreground">
                      📦 มีออเดอร์ล่วงหน้า {reservation.orders.length} รายการ
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Link to={`/reservation/${reservation.id}`}>
                    <Button variant="outline" size="sm">
                      ดูรายละเอียด
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reservations;
