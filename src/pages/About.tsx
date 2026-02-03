import { Navbar } from '@/components/Navbar';
import { useCart } from '@/contexts/CartContext';
import { Card } from '@/components/ui/card';
import { MapPin, Clock, Phone, Mail, Facebook, Instagram } from 'lucide-react';

const About = () => {
  const { getItemCount } = useCart();

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartItemsCount={getItemCount()} />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">เกี่ยวกับเรา</h1>
            <p className="text-xl text-muted-foreground">
              ติดลม-TIDLOM ร้านอาหาร ร้านนั่งชิลของคนแพร่
            </p>
          </div>

          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">เรื่องราวของเรา</h2>
            <p className="text-muted-foreground mb-4">
              ติดลม-TIDLOM ใช้วัตถุดิบมีคุณภาพ อาหารที่เอร็ดอร่อย บริการดี
              และความใส่ใจในทุกรายละเอียด เพื่อให้ลูกค้าทุกท่านมีความสุขในการรับประทานอาหาร
            </p>
            <p className="text-muted-foreground">
              เปิดร้านมา 2 ปีกว่า เรายังคงรักษามาตรฐานคุณภาพของอาหารและการให้บริการบริการ 
              พร้อมบริการที่อบอุ่นและเป็นกันเอง
            </p>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6">
              <MapPin className="h-8 w-8 mb-3 text-primary" />
              <h3 className="font-bold mb-2">ที่อยู่</h3>
              <p className="text-muted-foreground">
                170/166 ถนน ยันตรกิจโกศล<br />
                ต.ในเวียง อ.เมือง จ.แพร่ 54000<br />
                เส้นหลังขนส่งผู้โดยสารแพร่ ตรงข้ามสนามฟุตบอล TD.SOCCER
              </p>
            </Card>

            <Card className="p-6">
              <Clock className="h-8 w-8 mb-3 text-primary" />
              <h3 className="font-bold mb-2">เวลาเปิด-ปิด</h3>
              <div className="text-muted-foreground space-y-1">
                <div>จันทร์ - ศุกร์: 18:00 - 22:00</div>
                <div>เสาร์ - อาทิตย์: 18:00 - 22:00</div>
              </div>
            </Card>

            <Card className="p-6">
              <Phone className="h-8 w-8 mb-3 text-primary" />
              <h3 className="font-bold mb-2">โทรศัพท์</h3>
              <p className="text-muted-foreground">
                <a href="tel:0212345678" className="hover:text-primary">
                  064-194 3655
                </a>
                <br />
              </p>
            </Card>

            <Card className="p-6">
              <Mail className="h-8 w-8 mb-3 text-primary" />
              <h3 className="font-bold mb-2">อีเมล</h3>
              <p className="text-muted-foreground">
                <a href="mailto:info@thairestaurant.com" className="hover:text-primary">
                  tidlom.2024@gmail.com
                </a>
              </p>
            </Card>
          </div>

          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">ติดตามเรา</h2>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Facebook className="h-6 w-6" />
                <span>Facebook</span>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="h-6 w-6" />
                <span>Instagram</span>
              </a>
            </div>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">แผนที่</h2>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3875.6973945871415!2d100.56100731483059!3d13.736717190357!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDQ0JzEyLjIiTiAxMDDCsDMzJzQ5LjIiRQ!5e0!3m2!1sth!2sth!4v1234567890123!5m2!1sth!2sth"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '0.5rem' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
