import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAuth } from '@/contexts/AuthContext';
import { useUserRole, useManageUserRoles, AppRole } from '@/hooks/useUserRole';
import { ArrowLeft, Users, Shield, Loader2, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { th } from 'date-fns/locale';

const AdminUsers = () => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: roleLoading } = useUserRole();
  const { users, loading: usersLoading, updateUserRole, refetch } = useManageUserRoles();
  const [updatingUserId, setUpdatingUserId] = useState<string | null>(null);

  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
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

  const handleRoleChange = async (userId: string, newRole: AppRole) => {
    if (userId === user.id) {
      toast.error('ไม่สามารถเปลี่ยน role ของตัวเองได้');
      return;
    }

    setUpdatingUserId(userId);
    const result = await updateUserRole(userId, newRole);
    
    if (result.success) {
      toast.success('อัพเดท role สำเร็จ');
    } else {
      toast.error('เกิดข้อผิดพลาดในการอัพเดท role');
    }
    setUpdatingUserId(null);
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'destructive';
      case 'moderator':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return 'ผู้ดูแลระบบ';
      case 'moderator':
        return 'ผู้ดูแล';
      default:
        return 'ผู้ใช้ทั่วไป';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/admin">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-bold">จัดการผู้ใช้งาน</h1>
              <p className="text-sm text-muted-foreground">กำหนดสิทธิ์และ role ของผู้ใช้</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              รายชื่อผู้ใช้งาน ({users.length})
            </CardTitle>
            <Button variant="outline" size="sm" onClick={refetch} disabled={usersLoading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${usersLoading ? 'animate-spin' : ''}`} />
              รีเฟรช
            </Button>
          </CardHeader>
          <CardContent>
            {usersLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                ยังไม่มีผู้ใช้งานในระบบ
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ชื่อ</TableHead>
                      <TableHead>User ID</TableHead>
                      <TableHead>วันที่สมัคร</TableHead>
                      <TableHead>Role ปัจจุบัน</TableHead>
                      <TableHead>เปลี่ยน Role</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((u) => (
                      <TableRow key={u.id}>
                        <TableCell className="font-medium">
                          {u.full_name || 'ไม่ระบุชื่อ'}
                          {u.id === user.id && (
                            <Badge variant="outline" className="ml-2">คุณ</Badge>
                          )}
                        </TableCell>
                        <TableCell className="font-mono text-xs">
                          {u.id.slice(0, 8)}...
                        </TableCell>
                        <TableCell>
                          {u.created_at 
                            ? format(new Date(u.created_at), 'dd MMM yyyy', { locale: th })
                            : '-'
                          }
                        </TableCell>
                        <TableCell>
                          <Badge variant={getRoleBadgeVariant(u.role)}>
                            {getRoleLabel(u.role)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {u.id === user.id ? (
                            <span className="text-sm text-muted-foreground">-</span>
                          ) : (
                            <Select
                              value={u.role}
                              onValueChange={(value) => handleRoleChange(u.id, value as AppRole)}
                              disabled={updatingUserId === u.id}
                            >
                              <SelectTrigger className="w-32">
                                {updatingUserId === u.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <SelectValue />
                                )}
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="user">ผู้ใช้ทั่วไป</SelectItem>
                                <SelectItem value="moderator">ผู้ดูแล</SelectItem>
                                <SelectItem value="admin">ผู้ดูแลระบบ</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">คำแนะนำการใช้งาน</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• <strong>ผู้ใช้ทั่วไป (user)</strong> - สั่งอาหาร, ดูเมนู, จองโต๊ะ</p>
            <p>• <strong>ผู้ดูแล (moderator)</strong> - จัดการออเดอร์, ดูรายงาน</p>
            <p>• <strong>ผู้ดูแลระบบ (admin)</strong> - สิทธิ์ทั้งหมด รวมถึงจัดการเมนูและผู้ใช้</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminUsers;
