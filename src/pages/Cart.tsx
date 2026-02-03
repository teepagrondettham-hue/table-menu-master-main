import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Minus, Plus, Trash2, ShoppingBag, MessageSquare } from "lucide-react";
import { CartItem } from "@/types";

// สร้าง cart key สำหรับแยกสินค้า
const getCartKey = (item: CartItem): string => {
  const proteinId = item.selectedProtein?.id || 'none';
  const sizeId = item.selectedSize?.id || 'none';
  const soupType = item.soupType || 'none';
  
  if (proteinId !== 'none' || sizeId !== 'none' || soupType !== 'none') {
    return `${item.id}-${proteinId}-${sizeId}-${soupType}`;
  }
  return item.id;
};

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getTotalPrice, getItemCount } =
    useCart();

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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">ตะกร้าสั่งอาหาร</h1>

          <div className="space-y-4 mb-8">
            {cart.map((item) => {
              const cartKey = getCartKey(item);
              const displayPrice = item.finalPrice || item.price;

              return (
                <Card key={cartKey} className="p-4 shadow-medium">
                  <div className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{item.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.description}
                      </p>

                      {/* แสดงตัวเลือกที่เลือก */}
                      {(item.selectedSize || item.selectedProtein || item.soupType) && (
                        <div className="flex flex-wrap gap-2 mb-2">
                          {item.selectedSize && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                              {item.selectedSize.label}
                            </span>
                          )}
                          {item.selectedProtein && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground">
                              {item.selectedProtein.label}
                              {item.selectedProtein.extraPrice > 0 && ` (+฿${item.selectedProtein.extraPrice})`}
                            </span>
                          )}
                          {item.soupType && (
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-accent text-accent-foreground">
                              {item.soupType === "clear" ? "น้ำใส" : "น้ำข้น"}
                            </span>
                          )}
                        </div>
                      )}

                      {/* แสดงความคิดเห็น */}
                      {item.comment && (
                        <div className="flex items-start gap-1 mb-2 text-sm text-muted-foreground">
                          <MessageSquare className="h-4 w-4 mt-0.5 shrink-0" />
                          <span>{item.comment}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-primary">
                          ฿{displayPrice * item.quantity}
                        </span>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-2 bg-secondary rounded-lg p-1">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.quantity - 1,
                                  cartKey
                                )
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  item.quantity + 1,
                                  cartKey
                                )
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => removeFromCart(item.id, cartKey)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          <Card className="p-6 shadow-elevated">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold">ราคารวมทั้งหมด</span>
              <span className="text-3xl font-bold text-primary">
                ฿{getTotalPrice()}
              </span>
            </div>
            <div className="space-y-3">
              <Link to="/checkout" className="block">
                <Button className="w-full" size="lg" variant="action">
                  ดำเนินการสั่งอาหาร
                </Button>
              </Link>
              <Link to="/menu" className="block">
                <Button className="w-full" size="lg" variant="outline">
                  เพิ่มเมนูอีก
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;