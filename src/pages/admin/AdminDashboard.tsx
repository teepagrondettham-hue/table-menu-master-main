import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";
import { useUserRole } from "@/hooks/useUserRole";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import {
  UtensilsCrossed,
  ShoppingBag,
  Users,
  TrendingUp,
  ClipboardList,
  Settings,
  LayoutDashboard,
  Shield,
  Loader2,
} from "lucide-react";

const AdminDashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { getItemCount } = useCart();
  const { isAdmin, loading: roleLoading } = useUserRole();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    totalMenuItems: 0,
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const fetchStats = async () => {
      // ดึงจำนวนออเดอร์ทั้งหมด
      const { count: ordersCount } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true });

      // ดึงออเดอร์ที่รอดำเนินการ
      const { count: pendingCount } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

      // ดึงรายได้ทั้งหมด
      const { data: revenueData } = await supabase
        .from("orders")
        .select("total_amount")
        .eq("status", "completed");

      const totalRevenue =
        revenueData?.reduce((sum, order) => sum + (order.total_amount || 0), 0) || 0;

      // ดึงจำนวนเมนู
      const { count: menuCount } = await supabase
        .from("menu_items")
        .select("*", { count: "exact", head: true });

      setStats({
        totalOrders: ordersCount || 0,
        totalRevenue,
        pendingOrders: pendingCount || 0,
        totalMenuItems: menuCount || 0,
      });
    };

    if (user) {
      fetchStats();
    }
  }, [user]);

  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Shield className="h-16 w-16 text-destructive mb-4" />
        <h1 className="text-2xl font-bold mb-2">ไม่มีสิทธิ์เข้าถึง</h1>
        <p className="text-muted-foreground mb-4">คุณต้องเป็น Admin เพื่อเข้าถึงหน้านี้</p>
        <Button asChild>
          <Link to="/">กลับหน้าหลัก</Link>
        </Button>
      </div>
    );
  }

  const adminMenus = [
    {
      title: "จัดการเมนู",
      description: "เพิ่ม แก้ไข ลบเมนูอาหาร",
      icon: UtensilsCrossed,
      path: "/admin/menu",
      color: "text-orange-500",
    },
    {
      title: "จัดการออเดอร์",
      description: "ดูและอัพเดทสถานะออเดอร์",
      icon: ShoppingBag,
      path: "/admin/orders",
      color: "text-blue-500",
    },
    {
      title: "จัดการโปรโมชั่น",
      description: "เพิ่มและจัดการโปรโมชั่น",
      icon: TrendingUp,
      path: "/promotions",
      color: "text-green-500",
    },
    {
      title: "จัดการการจอง",
      description: "ดูและจัดการการจองโต๊ะ",
      icon: ClipboardList,
      path: "/reservations",
      color: "text-purple-500",
    },
    {
      title: "จัดการผู้ใช้งาน",
      description: "กำหนดสิทธิ์และ role ของผู้ใช้",
      icon: Users,
      path: "/admin/users",
      color: "text-pink-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartItemsCount={getItemCount()} />

      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="flex items-center gap-3 mb-8">
          <LayoutDashboard className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">แดชบอร์ดผู้ดูแลระบบ</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                ออเดอร์ทั้งหมด
              </CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                รอดำเนินการ
              </CardTitle>
              <ClipboardList className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-500">
                {stats.pendingOrders}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                รายได้รวม
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                ฿{stats.totalRevenue.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                จำนวนเมนู
              </CardTitle>
              <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalMenuItems}</div>
            </CardContent>
          </Card>
        </div>

        {/* Admin Menu Grid */}
        <h2 className="text-xl font-semibold mb-4">การจัดการ</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {adminMenus.map((menu) => (
            <Card
              key={menu.path}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => navigate(menu.path)}
            >
              <CardContent className="p-6">
                <menu.icon className={`h-10 w-10 ${menu.color} mb-4`} />
                <h3 className="font-semibold text-lg mb-2">{menu.title}</h3>
                <p className="text-sm text-muted-foreground">{menu.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
