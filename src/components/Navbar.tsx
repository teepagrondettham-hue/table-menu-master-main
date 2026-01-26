import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed, ShoppingCart, User, Shield, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useUserRole } from "@/hooks/useUserRole";

interface NavbarProps {
  cartItemsCount?: number;
}

export const Navbar = ({ cartItemsCount = 0 }: NavbarProps) => {
  const { user, signOut } = useAuth();
  const { isAdmin } = useUserRole();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-smooth">
            <UtensilsCrossed className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">ติดลม-TIDLOM</span>
          </Link>
          
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button variant="ghost" size="sm">หน้าหลัก</Button>
            </Link>
            <Link to="/menu">
              <Button variant="ghost" size="sm">เมนูอาหาร</Button>
            </Link>
            <Link to="/reservation">
              <Button variant="ghost" size="sm">จองโต๊ะ</Button>
            </Link>
          
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Auth buttons */}
            {user ? (
              <div className="flex items-center gap-2 ml-2 border-l border-border pl-4">
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Shield className="h-4 w-4" />
                      แอดมิน
                    </Button>
                  </Link>
                )}
                <Link to="/profile">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    โปรไฟล์
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleSignOut} className="gap-2 text-destructive hover:text-destructive">
                  <LogOut className="h-4 w-4" />
                  ออก
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2 ml-2 border-l border-border pl-4">
                <Link to="/auth">
                  <Button variant="default" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    เข้าสู่ระบบ
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
