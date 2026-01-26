-- Create menu_items table for detailed menu management
CREATE TABLE public.menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric NOT NULL,
  category text NOT NULL,
  image text,
  is_available boolean DEFAULT true,
  popularity_score integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create menu_options table for size, spice level, toppings
CREATE TABLE public.menu_options (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_item_id uuid REFERENCES public.menu_items(id) ON DELETE CASCADE,
  option_type text NOT NULL, -- 'size', 'spice', 'topping'
  option_name text NOT NULL,
  price_adjustment numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create favorites table
CREATE TABLE public.favorites (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  menu_item_id uuid REFERENCES public.menu_items(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, menu_item_id)
);

-- Create reviews table
CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  menu_item_id uuid REFERENCES public.menu_items(id) ON DELETE CASCADE NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  images text[],
  created_at timestamptz DEFAULT now()
);

-- Create promotions table
CREATE TABLE public.promotions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text UNIQUE NOT NULL,
  title text NOT NULL,
  description text,
  discount_type text NOT NULL, -- 'percentage', 'fixed'
  discount_value numeric NOT NULL,
  start_date timestamptz NOT NULL,
  end_date timestamptz NOT NULL,
  min_order_amount numeric DEFAULT 0,
  max_uses integer,
  current_uses integer DEFAULT 0,
  is_active boolean DEFAULT true,
  time_restriction jsonb, -- {start_hour: 11, end_hour: 13}
  created_at timestamptz DEFAULT now()
);

-- Create reservations table (moving from localStorage)
CREATE TABLE public.reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  phone text NOT NULL,
  date date NOT NULL,
  time time NOT NULL,
  guests integer NOT NULL,
  table_number integer NOT NULL,
  status text DEFAULT 'pending', -- 'pending', 'confirmed', 'completed', 'cancelled'
  special_requests text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Update orders table to include new fields
ALTER TABLE public.orders 
  ADD COLUMN IF NOT EXISTS special_requests text,
  ADD COLUMN IF NOT EXISTS promotion_code text,
  ADD COLUMN IF NOT EXISTS table_number integer;

-- Update order_items to link to menu_items
ALTER TABLE public.order_items
  ADD COLUMN IF NOT EXISTS selected_options jsonb; -- Store selected size, spice, toppings

-- Enable RLS on new tables
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for menu_items (public read, admin write)
CREATE POLICY "Anyone can view menu items"
  ON public.menu_items FOR SELECT
  USING (true);

-- RLS Policies for menu_options (public read)
CREATE POLICY "Anyone can view menu options"
  ON public.menu_options FOR SELECT
  USING (true);

-- RLS Policies for favorites
CREATE POLICY "Users can view own favorites"
  ON public.favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own favorites"
  ON public.favorites FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites"
  ON public.favorites FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for reviews
CREATE POLICY "Anyone can view reviews"
  ON public.reviews FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create reviews"
  ON public.reviews FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews"
  ON public.reviews FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own reviews"
  ON public.reviews FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for promotions (public read)
CREATE POLICY "Anyone can view active promotions"
  ON public.promotions FOR SELECT
  USING (is_active = true AND now() BETWEEN start_date AND end_date);

-- RLS Policies for reservations
CREATE POLICY "Users can view own reservations"
  ON public.reservations FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Anyone can create reservations"
  ON public.reservations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update own reservations"
  ON public.reservations FOR UPDATE
  USING (auth.uid() = user_id OR user_id IS NULL);

-- Triggers for updated_at
CREATE TRIGGER update_menu_items_updated_at
  BEFORE UPDATE ON public.menu_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reservations_updated_at
  BEFORE UPDATE ON public.reservations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for order tracking and queue
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.order_items;
ALTER PUBLICATION supabase_realtime ADD TABLE public.reservations;

-- Insert sample menu items (migrating from static data)
INSERT INTO public.menu_items (name, description, price, category, image) VALUES
  ('ผัดไทย', 'เส้นผัดไทยรสชาติดั้งเดิม หอมกรุ่นกับกุ้งสดและผักสดใหม่', 120, 'อาหารคาว', '/assets/menu-padthai.jpg'),
  ('ต้มยำกุ้ง', 'ซุปรสจัดจ้าน เปร้ยว เผ็ด เค็ม หวาน กลมกล่อม', 150, 'อาหารคาว', '/assets/menu-tomyum.jpg'),
  ('แกงเขียวหวาน', 'แกงเขียวหวานหอมกะทิ รสชาติกลมกล่อม', 130, 'อาหารคาว', '/assets/menu-greencurry.jpg'),
  ('ข้าวเหนียวมะม่วง', 'ของหวานไทยคลาสสิก ข้าวเหนียวนุ่ม มะม่วงหวาน กะทิหอม', 80, 'ของหวาน', '/assets/menu-mango.jpg');

-- Insert sample menu options
INSERT INTO public.menu_options (menu_item_id, option_type, option_name, price_adjustment)
SELECT id, 'size', 'เล็ก', 0 FROM public.menu_items WHERE category = 'อาหารคาว'
UNION ALL
SELECT id, 'size', 'ใหญ่', 20 FROM public.menu_items WHERE category = 'อาหารคาว'
UNION ALL
SELECT id, 'spice', 'ไม่เผ็ด', 0 FROM public.menu_items WHERE category = 'อาหารคาว'
UNION ALL
SELECT id, 'spice', 'เผ็ดน้อย', 0 FROM public.menu_items WHERE category = 'อาหารคาว'
UNION ALL
SELECT id, 'spice', 'เผ็ดกลาง', 0 FROM public.menu_items WHERE category = 'อาหารคาว'
UNION ALL
SELECT id, 'spice', 'เผ็ดมาก', 0 FROM public.menu_items WHERE category = 'อาหารคาว';

-- Insert sample promotions
INSERT INTO public.promotions (code, title, description, discount_type, discount_value, start_date, end_date, min_order_amount, max_uses, time_restriction) VALUES
  ('LUNCH10', 'ลด 10% มื้อกลางวัน', 'รับส่วนลด 10% สำหรับออเดอร์ช่วงเวลา 11:00-14:00', 'percentage', 10, now(), now() + interval '30 days', 100, 1000, '{"start_hour": 11, "end_hour": 14}'),
  ('WELCOME50', 'ลด 50 บาท สำหรับลูกค้าใหม่', 'รับส่วนลด 50 บาท สำหรับออเดอร์แรก', 'fixed', 50, now(), now() + interval '90 days', 200, 500, null),
  ('DINNER15', 'ลด 15% มื้อเย็น', 'รับส่วนลด 15% สำหรับออเดอร์ช่วงเวลา 17:00-20:00', 'percentage', 15, now(), now() + interval '30 days', 150, 1000, '{"start_hour": 17, "end_hour": 20}');