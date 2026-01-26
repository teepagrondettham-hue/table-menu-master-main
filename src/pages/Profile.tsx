import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { User, Award, ShoppingBag, Heart, MapPin, Phone, Loader2 } from 'lucide-react';

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const { getItemCount } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      loadProfile();
      loadOrders();
      loadFavorites();
    }
  }, [user]);

  const loadProfile = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user?.id)
      .single();

    if (data) {
      setProfile(data);
    }
    setLoading(false);
  };

  const loadOrders = async () => {
    const { data } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .eq('user_id', user?.id)
      .order('created_at', { ascending: false })
      .limit(10);

    if (data) {
      setOrders(data);
    }
  };

  const loadFavorites = async () => {
    const { data } = await supabase
      .from('favorites')
      .select('*, menu_items(*)')
      .eq('user_id', user?.id);

    if (data) {
      setFavorites(data);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: profile.full_name,
        phone: profile.phone,
        address: profile.address,
      })
      .eq('id', user?.id);

    if (error) {
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถบันทึกข้อมูลได้',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'บันทึกสำเร็จ',
        description: 'ข้อมูลโปรไฟล์ของคุณถูกอัพเดทแล้ว',
      });
    }

    setSaving(false);
  };

  const getTierBadge = (tier: string) => {
    const badges = {
      general: { label: 'ทั่วไป', color: 'bg-gray-500' },
      silver: { label: 'เงิน', color: 'bg-gray-400' },
      gold: { label: 'ทอง', color: 'bg-yellow-500' },
      platinum: { label: 'แพลทินัม', color: 'bg-purple-500' },
    };
    return badges[tier as keyof typeof badges] || badges.general;
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return null;
  }

  const tierBadge = getTierBadge(profile.membership_tier);

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartItemsCount={getItemCount()} />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">โปรไฟล์ของฉัน</h1>
            <p className="text-muted-foreground">จัดการข้อมูลส่วนตัวและดูประวัติการสั่งซื้อ</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 text-center">
              <Award className="h-12 w-12 mx-auto mb-3 text-primary" />
              <div className="text-3xl font-bold mb-1">{profile.points || 0}</div>
              <div className="text-sm text-muted-foreground">แต้มสะสม</div>
            </Card>
            
            <Card className="p-6 text-center">
              <div className={`inline-block px-4 py-2 rounded-full ${tierBadge.color} text-white mb-3`}>
                {tierBadge.label}
              </div>
              <div className="text-sm text-muted-foreground">ระดับสมาชิก</div>
            </Card>
            
            <Card className="p-6 text-center">
              <ShoppingBag className="h-12 w-12 mx-auto mb-3 text-primary" />
              <div className="text-3xl font-bold mb-1">{orders.length}</div>
              <div className="text-sm text-muted-foreground">ออเดอร์ทั้งหมด</div>
            </Card>
          </div>

          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="profile">
                <User className="h-4 w-4 mr-2" />
                ข้อมูลส่วนตัว
              </TabsTrigger>
              <TabsTrigger value="orders">
                <ShoppingBag className="h-4 w-4 mr-2" />
                ประวัติออเดอร์
              </TabsTrigger>
              <TabsTrigger value="favorites">
                <Heart className="h-4 w-4 mr-2" />
                เมนูโปรด
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card className="p-6">
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <Label htmlFor="email">อีเมล</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user?.email || ''}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="full_name">ชื่อ-นามสกุล</Label>
                    <Input
                      id="full_name"
                      value={profile.full_name || ''}
                      onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">
                      <Phone className="inline h-4 w-4 mr-1" />
                      เบอร์โทรศัพท์
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={profile.phone || ''}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      ที่อยู่
                    </Label>
                    <Input
                      id="address"
                      value={profile.address || ''}
                      onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                    />
                  </div>

                  <Button type="submit" disabled={saving}>
                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    บันทึกข้อมูล
                  </Button>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <div className="space-y-4">
                {orders.length === 0 ? (
                  <Card className="p-6 text-center">
                    <p className="text-muted-foreground mb-4">ยังไม่มีประวัติการสั่งซื้อ</p>
                    <Button onClick={() => navigate('/menu')}>เริ่มสั่งอาหาร</Button>
                  </Card>
                ) : (
                  orders.map((order) => (
                    <Card key={order.id} className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="font-semibold">ออเดอร์ #{order.id.slice(0, 8)}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString('th-TH', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-primary">฿{order.total_amount}</div>
                          <div className="text-sm">
                            <span className={`inline-block px-2 py-1 rounded text-xs ${
                              order.status === 'completed' ? 'bg-green-500/20 text-green-700' :
                              order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-700' :
                              'bg-gray-500/20 text-gray-700'
                            }`}>
                              {order.status === 'completed' ? 'เสร็จสิ้น' :
                               order.status === 'pending' ? 'กำลังดำเนินการ' :
                               order.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {order.order_items?.length} รายการ
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="favorites">
              <div className="grid md:grid-cols-2 gap-4">
                {favorites.length === 0 ? (
                  <Card className="p-6 text-center col-span-2">
                    <p className="text-muted-foreground mb-4">ยังไม่มีเมนูโปรด</p>
                    <Button onClick={() => navigate('/menu')}>เลือกเมนูโปรด</Button>
                  </Card>
                ) : (
                  favorites.map((fav) => (
                    <Card key={fav.id} className="overflow-hidden">
                      <img
                        src={fav.menu_items.image}
                        alt={fav.menu_items.name}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold mb-1">{fav.menu_items.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {fav.menu_items.description}
                        </p>
                        <div className="text-primary font-bold">฿{fav.menu_items.price}</div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
