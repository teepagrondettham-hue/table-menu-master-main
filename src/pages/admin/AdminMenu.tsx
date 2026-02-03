import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Plus,
  Pencil,
  Trash2,
  ArrowLeft,
  UtensilsCrossed,
} from "lucide-react";

interface MenuItemDB {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: string;
  image: string | null;
  is_available: boolean | null;
}

interface MenuFormData {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  is_available: boolean;
}

const categories = [
  "อาหารจานเดียว",
  "ส้มตำ/ยำ/ลาบ",
  "ต้ม/นึ่ง/ลวกจิ้ม",
  "ของทอด / ของกินเล่น",
  "เครื่องดื่ม",
];

const AdminMenu = () => {
  const { user, loading } = useAuth();
  const { getItemCount } = useCart();
  const navigate = useNavigate();
  const [menuItems, setMenuItems] = useState<MenuItemDB[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItemDB | null>(null);
  const [formData, setFormData] = useState<MenuFormData>({
    name: "",
    description: "",
    price: 0,
    category: "อาหารจานเดียว",
    image: "",
    is_available: true,
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    const { data, error } = await supabase
      .from("menu_items")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("ไม่สามารถโหลดข้อมูลเมนูได้");
      return;
    }

    setMenuItems(data || []);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: 0,
      category: "อาหารจานเดียว",
      image: "",
      is_available: true,
    });
    setEditingItem(null);
  };

  const handleOpenDialog = (item?: MenuItemDB) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        description: item.description || "",
        price: item.price,
        category: item.category,
        image: item.image || "",
        is_available: item.is_available ?? true,
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    resetForm();
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.price) {
      toast.error("กรุณากรอกชื่อและราคา");
      return;
    }

    if (editingItem) {
      // Update
      const { error } = await supabase
        .from("menu_items")
        .update({
          name: formData.name,
          description: formData.description || null,
          price: formData.price,
          category: formData.category,
          image: formData.image || null,
          is_available: formData.is_available,
        })
        .eq("id", editingItem.id);

      if (error) {
        toast.error("ไม่สามารถแก้ไขเมนูได้");
        return;
      }

      toast.success("แก้ไขเมนูสำเร็จ");
    } else {
      // Create
      const { error } = await supabase.from("menu_items").insert({
        name: formData.name,
        description: formData.description || null,
        price: formData.price,
        category: formData.category,
        image: formData.image || null,
        is_available: formData.is_available,
      });

      if (error) {
        toast.error("ไม่สามารถเพิ่มเมนูได้");
        return;
      }

      toast.success("เพิ่มเมนูสำเร็จ");
    }

    handleCloseDialog();
    fetchMenuItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("ต้องการลบเมนูนี้หรือไม่?")) return;

    const { error } = await supabase.from("menu_items").delete().eq("id", id);

    if (error) {
      toast.error("ไม่สามารถลบเมนูได้");
      return;
    }

    toast.success("ลบเมนูสำเร็จ");
    fetchMenuItems();
  };

  const handleToggleAvailable = async (id: string, isAvailable: boolean) => {
    const { error } = await supabase
      .from("menu_items")
      .update({ is_available: isAvailable })
      .eq("id", id);

    if (error) {
      toast.error("ไม่สามารถอัพเดทสถานะได้");
      return;
    }

    fetchMenuItems();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>กำลังโหลด...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartItemsCount={getItemCount()} />

      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/admin")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <UtensilsCrossed className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">จัดการเมนูอาหาร</h1>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="mr-2 h-4 w-4" />
                เพิ่มเมนู
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? "แก้ไขเมนู" : "เพิ่มเมนูใหม่"}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="name">ชื่อเมนู *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="ชื่อเมนู"
                  />
                </div>

                <div>
                  <Label htmlFor="description">รายละเอียด</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder="รายละเอียดเมนู"
                    rows={2}
                  />
                </div>

                <div>
                  <Label htmlFor="price">ราคา (บาท) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: Number(e.target.value) })
                    }
                    placeholder="0"
                  />
                </div>

                <div>
                  <Label htmlFor="category">หมวดหมู่</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      setFormData({ ...formData, category: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="เลือกหมวดหมู่" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="image">URL รูปภาพ</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({ ...formData, image: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    id="is_available"
                    checked={formData.is_available}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, is_available: checked })
                    }
                  />
                  <Label htmlFor="is_available">พร้อมจำหน่าย</Label>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={handleCloseDialog}>
                  ยกเลิก
                </Button>
                <Button onClick={handleSubmit}>
                  {editingItem ? "บันทึก" : "เพิ่มเมนู"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {menuItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="aspect-video bg-muted flex items-center justify-center">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <UtensilsCrossed className="h-12 w-12 text-muted-foreground" />
                )}
              </div>
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                  </div>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      item.is_available
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.is_available ? "พร้อมขาย" : "หมด"}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                  {item.description || "-"}
                </p>

                <p className="text-lg font-bold text-primary mb-4">
                  ฿{item.price}
                </p>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleOpenDialog(item)}
                  >
                    <Pencil className="h-4 w-4 mr-1" />
                    แก้ไข
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {menuItems.length === 0 && (
          <div className="text-center py-12">
            <UtensilsCrossed className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">ยังไม่มีเมนู</p>
            <Button className="mt-4" onClick={() => handleOpenDialog()}>
              <Plus className="mr-2 h-4 w-4" />
              เพิ่มเมนูแรก
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMenu;
