'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User, ShoppingCart, Edit } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { user } = useAuth();
  const [userData, setUserData] = useState<{fullName: string, email: string} | null>(null);

  useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data() as {fullName: string, email: string});
        }
      };
      fetchUserData();
    }
  }, [user]);


  return (
    <div>
      <h1 className="text-3xl font-headline font-bold mb-6">User Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
            <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">2 pending, 1 in progress</p>
             <Button variant="outline" size="sm" className="mt-4" asChild>
                <Link href="/dashboard/artisan">
                    View Orders
                </Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-xl">Become an Artisan</CardTitle>
            <CardDescription>
              Share your skills with our community. Create your artisan profile today.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild className="w-full">
              <Link href="/artisans/register">Get Started</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
