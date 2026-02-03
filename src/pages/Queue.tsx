import { useEffect, useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Users, Clock, Loader2 } from 'lucide-react';

const Queue = () => {
  const { user } = useAuth();
  const { getItemCount } = useCart();
  const [loading, setLoading] = useState(true);
  const [queue, setQueue] = useState<any[]>([]);
  const [myQueue, setMyQueue] = useState<any>(null);
  const [partySize, setPartySize] = useState('2');

  useEffect(() => {
    loadQueue();
    
    // Real-time updates
    const channel = supabase
      .channel('queue-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'queue'
        },
        () => {
          loadQueue();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const loadQueue = async () => {
    const { data, error } = await supabase
      .from('queue')
      .select('*')
      .in('status', ['waiting', 'ready'])
      .order('queue_number', { ascending: true });

    if (data) {
      setQueue(data);
      
      // Find user's queue
      if (user) {
        const userQueue = data.find(q => q.user_id === user.id && q.status === 'waiting');
        setMyQueue(userQueue);
      }
    }
    setLoading(false);
  };

  const joinQueue = async () => {
    if (!user) {
      toast({
        title: 'กรุณาเข้าสู่ระบบ',
        description: 'คุณต้องเข้าสู่ระบบก่อนรับคิว',
        variant: 'destructive',
      });
      return;
    }

    const queueNumber = queue.length > 0 ? Math.max(...queue.map(q => q.queue_number)) + 1 : 1;

    const { error } = await supabase
      .from('queue')
      .insert({
        user_id: user.id,
        queue_number: queueNumber,
        party_size: parseInt(partySize),
        status: 'waiting',
      });

    if (error) {
      toast({
        title: 'เกิดข้อผิดพลาด',
        description: 'ไม่สามารถรับคิวได้ กรุณาลองใหม่อีกครั้ง',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'รับคิวสำเร็จ',
        description: `หมายเลขคิวของคุณคือ ${queueNumber}`,
      });
    }
  };

  const cancelQueue = async () => {
    if (!myQueue) return;

    const { error } = await supabase
      .from('queue')
      .update({ status: 'cancelled' })
      .eq('id', myQueue.id);

    if (!error) {
      toast({
        title: 'ยกเลิกคิวสำเร็จ',
        description: 'คิวของคุณถูกยกเลิกแล้ว',
      });
      setMyQueue(null);
    }
  };

  const waitingQueue = queue.filter(q => q.status === 'waiting');
  const readyQueue = queue.filter(q => q.status === 'ready');

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar cartItemsCount={getItemCount()} />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">
              <Clock className="inline h-10 w-10 mr-2 text-primary" />
              ระบบคิว
            </h1>
            <p className="text-muted-foreground">
              รับคิวออนไลน์ ไม่ต้องรอนาน
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6 text-center">
              <Users className="h-12 w-12 mx-auto mb-3 text-primary" />
              <div className="text-3xl font-bold mb-1">{waitingQueue.length}</div>
              <div className="text-sm text-muted-foreground">คิวที่รออยู่</div>
            </Card>
            
            <Card className="p-6 text-center">
              <Clock className="h-12 w-12 mx-auto mb-3 text-green-500" />
              <div className="text-3xl font-bold mb-1">{readyQueue.length}</div>
              <div className="text-sm text-muted-foreground">คิวพร้อมเข้า</div>
            </Card>
          </div>

          {myQueue ? (
            <Card className="p-8 text-center mb-8">
              <div className="mb-4">
                <div className="text-sm text-muted-foreground mb-2">หมายเลขคิวของคุณ</div>
                <div className="text-6xl font-bold text-primary mb-4">
                  {myQueue.queue_number}
                </div>
                <div className="text-sm text-muted-foreground">
                  จำนวนคน: {myQueue.party_size} คน
                </div>
              </div>
              
              <div className="text-lg mb-6">
                {myQueue.status === 'waiting' ? (
                  <>
                    <span className="text-yellow-500">●</span> กำลังรอคิว
                    <div className="text-sm text-muted-foreground mt-2">
                      เหลืออีก {waitingQueue.findIndex(q => q.id === myQueue.id) + 1} คิว
                    </div>
                  </>
                ) : (
                  <>
                    <span className="text-green-500">●</span> พร้อมเข้าใช้บริการ!
                  </>
                )}
              </div>

              <Button variant="destructive" onClick={cancelQueue}>
                ยกเลิกคิว
              </Button>
            </Card>
          ) : (
            <Card className="p-8 mb-8">
              <h2 className="text-2xl font-bold mb-4">รับคิว</h2>
              <div className="mb-4">
                <Label htmlFor="partySize">จำนวนคน</Label>
                <Input
                  id="partySize"
                  type="number"
                  min="1"
                  max="20"
                  value={partySize}
                  onChange={(e) => setPartySize(e.target.value)}
                />
              </div>
              <Button onClick={joinQueue} className="w-full">
                รับคิว
              </Button>
            </Card>
          )}

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">คิวปัจจุบัน</h2>
            
            {readyQueue.length > 0 && (
              <div className="mb-4">
                <h3 className="font-semibold text-green-500 mb-2">พร้อมเข้าใช้บริการ</h3>
                <div className="flex flex-wrap gap-2">
                  {readyQueue.map((q) => (
                    <div
                      key={q.id}
                      className="px-4 py-2 bg-green-500/20 text-green-700 rounded-lg font-bold"
                    >
                      {q.queue_number}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {waitingQueue.length > 0 ? (
              <>
                <h3 className="font-semibold text-muted-foreground mb-2">กำลังรอคิว</h3>
                <div className="flex flex-wrap gap-2">
                  {waitingQueue.map((q) => (
                    <div
                      key={q.id}
                      className="px-4 py-2 bg-muted rounded-lg font-bold"
                    >
                      {q.queue_number}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-muted-foreground text-center">ไม่มีคิวที่รออยู่</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Queue;
