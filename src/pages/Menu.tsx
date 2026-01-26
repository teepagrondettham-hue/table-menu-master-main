import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { menuData, categories } from "@/data/menuData";
import { ShoppingCart, MessageSquare } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { MenuItem, SoupType, ProteinOption, SizeOption } from "@/types";

interface ItemOptions {
  selectedProtein?: ProteinOption;
  selectedSize?: SizeOption;
  soupType?: SoupType;
}

const Menu = () => {
  const { addToCart, getItemCount } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>("ทั้งหมด");
  const [comments, setComments] = useState<Record<string, string>>({});
  const [options, setOptions] = useState<Record<string, ItemOptions>>({});

  const filteredMenu =
    selectedCategory === "ทั้งหมด"
      ? menuData ?? []
      : (menuData ?? []).filter((item) => item.category === selectedCategory);

  // คำนวณราคาสุดท้าย
  const getFinalPrice = (item: MenuItem): number => {
    const opt = options?.[item.id];
    
    // ถ้ามี sizeOptions ใช้ราคาจาก size ที่เลือก
    if (item.sizeOptions && opt?.selectedSize) {
      const sizePrice = opt.selectedSize.price;
      const proteinExtra = opt?.selectedProtein?.extraPrice ?? 0;
      return sizePrice + proteinExtra;
    }
    
    // ถ้ามีแค่ proteinOptions ใช้ราคาพื้นฐาน + extra
    if (item.proteinOptions && opt?.selectedProtein) {
      return item.price + opt.selectedProtein.extraPrice;
    }
    
    return item.price;
  };

  // เช็กว่าเลือกตัวเลือกครบหรือยัง
  const isOptionComplete = (item: MenuItem): boolean => {
    const opt = options?.[item.id];
    
    // ถ้ามี proteinOptions ต้องเลือก
    if (item.proteinOptions && !opt?.selectedProtein) {
      return false;
    }
    
    // ถ้ามี sizeOptions ต้องเลือก
    if (item.sizeOptions && !opt?.selectedSize) {
      return false;
    }
    
    // ถ้ามี soupOption ต้องเลือก
    if (item.hasSoupOption && !opt?.soupType) {
      return false;
    }
    
    return true;
  };

  // อัพเดทตัวเลือกโปรตีน
  const selectProtein = (itemId: string, protein: ProteinOption) => {
    setOptions((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        selectedProtein: protein,
      },
    }));
  };

  // อัพเดทตัวเลือกขนาด
  const selectSize = (itemId: string, size: SizeOption) => {
    setOptions((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        selectedSize: size,
      },
    }));
  };

  // อัพเดทประเภทน้ำซุป
  const selectSoupType = (itemId: string, soupType: SoupType) => {
    setOptions((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        soupType: soupType,
      },
    }));
  };

  // เพิ่มลงตะกร้า
  const handleAddToCart = (item: MenuItem) => {
    const opt = options[item.id];
    addToCart(item, {
      comment: comments[item.id],
      selectedProtein: opt?.selectedProtein,
      selectedSize: opt?.selectedSize,
      soupType: opt?.soupType,
      finalPrice: getFinalPrice(item),
    });
    // ล้างความคิดเห็นและตัวเลือกหลังเพิ่มลงตะกร้า
    setComments((prev) => ({ ...prev, [item.id]: "" }));
    setOptions((prev) => ({ ...prev, [item.id]: {} }));
  };

  // เช็กว่าต้องเลือกอะไรบ้าง
  const hasAnyOptions = (item: MenuItem): boolean => {
    return !!(item.proteinOptions || item.sizeOptions || item.hasSoupOption);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartItemsCount={getItemCount()} />

      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">เมนูอาหาร</h1>
          <p className="text-muted-foreground">
            เลือกเมนูอาหารโปรดของคุณ แล้วเพิ่มลงตะกร้า
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <Button
            variant={selectedCategory === "ทั้งหมด" ? "default" : "outline"}
            onClick={() => setSelectedCategory("ทั้งหมด")}
          >
            ทั้งหมด
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {(filteredMenu ?? []).map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden shadow-medium hover:shadow-elevated transition-smooth group"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                />
              </div>
              <div className="p-4">
                <div className="mb-2">
                  <span className="text-xs text-muted-foreground">
                    {item.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {item.description}
                </p>

                {/* ตัวเลือกขนาด */}
                {item.sizeOptions && (
                  <div className="mb-3">
                    <p className="text-sm font-medium mb-2">ขนาด:</p>
                    <div className="flex flex-wrap gap-2">
                      {item.sizeOptions.map((size) => (
                        <Button
                          key={size.id}
                          size="sm"
                          variant={
                            options[item.id]?.selectedSize?.id === size.id
                              ? "default"
                              : "outline"
                          }
                          onClick={() => selectSize(item.id, size)}
                          className="flex-1 min-w-[80px]"
                        >
                          {size.label} (฿{size.price})
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ตัวเลือกโปรตีน */}
                {item.proteinOptions && (
                  <div className="mb-3">
                    <p className="text-sm font-medium mb-2">เลือกโปรตีน:</p>
                    <div className="flex flex-wrap gap-2">
                      {item.proteinOptions.map((protein) => (
                        <Button
                          key={protein.id}
                          size="sm"
                          variant={
                            options[item.id]?.selectedProtein?.id === protein.id
                              ? "default"
                              : "outline"
                          }
                          onClick={() => selectProtein(item.id, protein)}
                          className="text-xs"
                        >
                          {protein.label}
                          {protein.extraPrice > 0 && ` +฿${protein.extraPrice}`}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ตัวเลือกน้ำข้น/น้ำใส สำหรับเมนูต้ม */}
                {item.hasSoupOption && (
                  <div className="mb-3">
                    <p className="text-sm font-medium mb-2">ประเภทน้ำซุป:</p>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={
                          options[item.id]?.soupType === "clear"
                            ? "default"
                            : "outline"
                        }
                        onClick={() => selectSoupType(item.id, "clear")}
                        className="flex-1"
                      >
                        น้ำใส
                      </Button>
                      <Button
                        size="sm"
                        variant={
                          options[item.id]?.soupType === "creamy"
                            ? "default"
                            : "outline"
                        }
                        onClick={() => selectSoupType(item.id, "creamy")}
                        className="flex-1"
                      >
                        น้ำข้น
                      </Button>
                    </div>
                  </div>
                )}

                {/* ช่องความคิดเห็น */}
                <div className="mb-4">
                  <div className="flex items-center gap-1 mb-2">
                    <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      หมายเหตุ
                    </span>
                  </div>
                  <Textarea
                    placeholder="เช่น ไม่ใส่ผัก, เผ็ดน้อย..."
                    value={comments[item.id] || ""}
                    onChange={(e) =>
                      setComments({
                        ...comments,
                        [item.id]: e.target.value,
                      })
                    }
                    className="resize-none text-sm"
                    rows={2}
                    maxLength={100}
                  />
                </div>

                {/* แจ้งเตือนถ้ายังไม่เลือกตัวเลือก */}
                {hasAnyOptions(item) && !isOptionComplete(item) && (
                  <p className="text-xs text-destructive mb-2">
                    กรุณาเลือกตัวเลือกให้ครบ
                  </p>
                )}

                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary">
                    ฿{getFinalPrice(item)}
                  </span>
                  <Button
                    size="sm"
                    variant="default"
                    onClick={() => handleAddToCart(item)}
                    disabled={hasAnyOptions(item) && !isOptionComplete(item)}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    เพิ่มลงตะกร้า
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;