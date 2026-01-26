import React, { createContext, useContext, useState, ReactNode } from "react";
import { CartItem, MenuItem, SoupType, ProteinOption, SizeOption } from "@/types";
import { toast } from "sonner";

interface AddToCartOptions {
  comment?: string;
  selectedProtein?: ProteinOption;
  selectedSize?: SizeOption;
  soupType?: SoupType;
  finalPrice?: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: MenuItem, options?: AddToCartOptions) => void;
  removeFromCart: (itemId: string, cartKey?: string) => void;
  updateQuantity: (itemId: string, quantity: number, cartKey?: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// สร้าง key สำหรับแยกสินค้าที่มีตัวเลือกต่างกัน
const generateCartKey = (item: MenuItem | CartItem, options?: AddToCartOptions): string => {
  const proteinId = options?.selectedProtein?.id || (item as CartItem).selectedProtein?.id || 'none';
  const sizeId = options?.selectedSize?.id || (item as CartItem).selectedSize?.id || 'none';
  const soupType = options?.soupType || (item as CartItem).soupType || 'none';
  
  if (proteinId !== 'none' || sizeId !== 'none' || soupType !== 'none') {
    return `${item.id}-${proteinId}-${sizeId}-${soupType}`;
  }
  return item.id;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: MenuItem, options?: AddToCartOptions) => {
    setCart((prevCart) => {
      const cartKey = generateCartKey(item, options);
      const existingItem = prevCart.find((cartItem) => {
        const existingKey = generateCartKey(cartItem);
        return existingKey === cartKey;
      });

      if (existingItem) {
        toast.success("เพิ่มจำนวนในตะกร้าแล้ว");
        return prevCart.map((cartItem) => {
          const existingKey = generateCartKey(cartItem);
          return existingKey === cartKey
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem;
        });
      }

      toast.success("เพิ่มลงตะกร้าแล้ว");
      return [
        ...prevCart,
        {
          ...item,
          quantity: 1,
          comment: options?.comment,
          selectedProtein: options?.selectedProtein,
          selectedSize: options?.selectedSize,
          soupType: options?.soupType,
          finalPrice: options?.finalPrice || item.price,
        },
      ];
    });
  };

  const removeFromCart = (itemId: string, cartKey?: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => {
        if (cartKey) {
          const existingKey = generateCartKey(item);
          return existingKey !== cartKey;
        }
        return item.id !== itemId;
      })
    );
    toast.success("ลบออกจากตะกร้าแล้ว");
  };

  const updateQuantity = (itemId: string, quantity: number, cartKey?: string) => {
    if (quantity <= 0) {
      removeFromCart(itemId, cartKey);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (cartKey) {
          const existingKey = generateCartKey(item);
          return existingKey === cartKey ? { ...item, quantity } : item;
        }
        return item.id === itemId ? { ...item, quantity } : item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const price = item.finalPrice || item.price;
      return total + price * item.quantity;
    }, 0);
  };

  const getItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};