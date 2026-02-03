// ประเภทน้ำซุป สำหรับเมนูต้ม
export type SoupType = "clear" | "creamy";

// ตัวเลือกโปรตีน
export interface ProteinOption {
  id: string;
  label: string;
  extraPrice: number;
}

// ตัวเลือกขนาด
export interface SizeOption {
  id: string;
  label: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  // ตัวเลือกโปรตีนแบบยืดหยุ่น
  proteinOptions?: ProteinOption[];
  // ตัวเลือกขนาดแบบยืดหยุ่น
  sizeOptions?: SizeOption[];
  // สำหรับเมนูต้ม - เลือกน้ำข้น/น้ำใส
  hasSoupOption?: boolean;
  // Legacy fields (backward compatible)
  hasOptions?: boolean;
  priceBySize?: {
    cup: number;
    pot: number;
  };
  proteinExtra?: {
    pork: number;
    seafood: number;
  };
}

export interface CartItem extends MenuItem {
  quantity: number;
  comment?: string;
  selectedProtein?: ProteinOption;
  selectedSize?: SizeOption;
  soupType?: SoupType;
  finalPrice?: number;
  // Legacy fields
  size?: "cup" | "pot";
  protein?: "pork" | "seafood";
}

export interface Reservation {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  tableNumber: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  orders?: CartItem[];
  createdAt: string;
}

export interface Table {
  id: number;
  seats: number;
  status: 'available' | 'reserved';
}
