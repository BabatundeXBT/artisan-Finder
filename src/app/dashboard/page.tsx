
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User, ShoppingCart, Edit } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";

interface Order {
    id: string;
    status: string;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<{fullName: string, email: string} | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data() as {fullName: string, email: string});
        }
      };

      const fetchOrders = async () => {
        setLoadingOrders(true);
        // This should probably query based on client ID, not artisan ID
        const q = query(collection(db, "orders"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const userOrders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
        setOrders(userOrders);
        setLoadingOrders(false);
      };

      fetchUserData();
      fetchOrders();
    }
  }, [user]);

  const activeOrders = orders.filter(o => o.status === 'Pending' || o.status === 'In Progress');
  const pendingCount = orders.filter(o => o.status === 'Pending').length;
  const inProgressCount = orders.filter(o => o.status === 'In Progress').length;

  return (
    <div>
      <h1 className="text-3xl font-headline font-bold mb-6">User Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Profile</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData?.fullName || 'Loading...'}</div>
            <p className="text-xs text-muted-foreground">{userData?.email || '...'}</p>
             <Button variant="outline" size="sm" className="mt-4" asChild>
                <Link href="/dashboard/profile">
                    <Edit className="mr-2 h-4 w-4" /> Edit Profile
                </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Service Requests</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {loadingOrders ? (
                 <div className="text-2xl font-bold">Loading...</div>
            ) : (
                <>
                    <div className="text-2xl font-bold">{activeOrders.length}</div>
                    <p className="text-xs text-muted-foreground">{pendingCount} pending, {inProgressCount} in progress</p>
                </>
            )}
             <Button variant="outline" size="sm" className="mt-4" asChild>
                <Link href="#">
                    View My Requests
                </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
