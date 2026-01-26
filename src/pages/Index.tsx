import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";
import { Clock, Star, MapPin, Calendar } from "lucide-react";
import heroImg from "@/assets/hero-restaurant.jpg";

const Index = () => {
  const { getItemCount } = useCart();

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartItemsCount={getItemCount()} />
      
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImg})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            ยินดีต้อนรับสู่ ติดลม-TIDLOM
          </h1>
          <p className="text-xl text-muted-foreground mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            ร้านอาหาร ร้านนั่งชิลของคนแพร่
          </p>
          
          <div className="flex gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <Link to="/reservation">
              <Button size="xl" variant="action">
                <Calendar className="mr-2" />
                จองโต๊ะ
              </Button>
            </Link>
            <Link to="/menu">
              <Button size="xl" variant="hero">
                ดูเมนูอาหาร
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 shadow-medium hover:shadow-elevated transition-smooth">
              <Clock className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">เวลาเปิด-ปิด</h3>
              <p className="text-muted-foreground">
                จันทร์-ศุกร์: 18:00 - 22:00<br />
                เสาร์-อาทิตย์: 18:00 - 22:00
              </p>
            </Card>
            
            <Card className="p-6 shadow-medium hover:shadow-elevated transition-smooth">
              <MapPin className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">ที่อยู่</h3>
              <p className="text-muted-foreground">
                  170/166 ถนน ยันตรกิจโกศล<br />
                  ต.ในเวียง อ.เมือง จ.แพร่ 54000
                  เส้นหลังขนส่งผู้โดยสารแพร่ ตรงข้ามสนามฟุตบอล TD.SOCCER
              </p>
            </Card>
            
            <Card className="p-6 shadow-medium hover:shadow-elevated transition-smooth">
              <Star className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">โปรโมชั่น</h3>
              <p className="text-muted-foreground">
                เช็คอินที่ร้านรับเฟรนฟรายส์ ฟรี 1 จาน<br />
                สำหรับทุกออเดอร์
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">พร้อมรับประทานอาหารแล้วหรือยัง?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            จองโต๊ะล่วงหน้าเพื่อความสะดวกสบาย หรือสั่งอาหารไว้ก่อนเลย
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/reservation">
              <Button size="lg" variant="default">
                จองโต๊ะเลย
              </Button>
            </Link>
            <Link to="/menu">
              <Button size="lg" variant="outline">
                ดูเมนูทั้งหมด
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
