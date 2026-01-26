import { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { useCart } from '@/contexts/CartContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Tag, Clock, Calendar, Copy, Loader2 } from 'lucide-react';

const Promotions = () => {
  const { getItemCount } = useCart();
  const [promotions, setPromotions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPromotions();
  }, []);

  const loadPromotions = async () => {
    const { data, error } = await supabase
      .from('promotions')
      .select('*')
      .eq('is_active', true)
      .lte('start_date', new Date().toISOString())
      .gte('end_date', new Date().toISOString())
      .order('created_at', { ascending: false });

    if (data) {
      setPromotions(data);
    }
    setLoading(false);
  };

  const copyPromoCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: 'คัดลอกสำเร็จ',
      description: `คัดลอกโค้ด "${code}" แล้ว`,
    });
  };

  const getDiscountText = (promo: any) => {
    if (promo.discount_type === 'percentage') {
      return `ลด ${promo.discount_value}%`;
    }
    return `ลด ฿${promo.discount_value}`;
  };

  const getTimeRestriction = (timeRestriction: any) => {
    if (!timeRestriction) return null;
    return `เฉพาะเวลา ${timeRestriction.start_hour}:00 - ${timeRestriction.end_hour}:00 น.`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartItemsCount={getItemCount()} />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            <Tag className="inline h-10 w-10 mr-2 text-primary" />
            โปรโมชั่นพิเศษ
          </h1>
          <p className="text-muted-foreground">
            รับส่วนลดและข้อเสนอพิเศษมากมาย
          </p>
        </div>

        {promotions.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground mb-4">ขณะนี้ยังไม่มีโปรโมชั่น</p>
            <Button onClick={() => (window.location.href = '/menu')}>
              เลือกดูเมนูอาหาร
            </Button>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promotions.map((promo) => (
              <Card key={promo.id} className="overflow-hidden shadow-medium hover:shadow-elevated transition-smooth">
                <div className="bg-gradient-to-br from-primary to-primary/70 p-6 text-primary-foreground">
                  <div className="text-3xl font-bold mb-2">
                    {getDiscountText(promo)}
                  </div>
                  <h3 className="text-xl font-semibold">{promo.title}</h3>
                </div>
                
                <div className="p-6 space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {promo.description}
                  </p>

                  <div className="space-y-2 text-sm">
                    {promo.min_order_amount > 0 && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Badge variant="outline">ขั้นต่ำ ฿{promo.min_order_amount}</Badge>
                      </div>
                    )}
                    
                    {promo.time_restriction && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {getTimeRestriction(promo.time_restriction)}
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      ใช้ได้ถึง {new Date(promo.end_date).toLocaleDateString('th-TH', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>

                    {promo.max_uses && (
                      <div className="text-muted-foreground">
                        เหลือ {promo.max_uses - promo.current_uses} สิทธิ์
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="text-xs text-muted-foreground mb-1">โค้ดส่วนลด</div>
                        <div className="font-mono font-bold text-lg">{promo.code}</div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => copyPromoCode(promo.code)}
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        คัดลอก
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Promotions;
