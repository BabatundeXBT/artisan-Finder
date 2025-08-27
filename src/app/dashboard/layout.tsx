
'use client';

import type { ReactNode } from "react";
import Link from 'next/link';
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import Logo from "@/components/shared/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, ShoppingCart, LogOut, Settings, Briefcase, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthGuard, useAuth } from '@/hooks/use-auth';
import { auth, db } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const baseNavLinks = [
    { href: "/dashboard", label: "Overview", icon: User },
    { href: "/dashboard/profile", label: "My Profile", icon: Settings },
    { href: "/dashboard/my-reviews", label: "My Reviews", icon: MessageSquare },
];

function DashboardLayoutContent({ children }: { children: ReactNode }) {
    const { user } = useAuth();
    const router = useRouter();
    const [userData, setUserData] = useState<{fullName: string, email: string} | null>(null);
    const [isArtisan, setIsArtisan] = useState(false);

    useEffect(() => {
        if (user) {
            const fetchUserData = async () => {
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setUserData(userDoc.data() as {fullName: string, email: string});
                }
                
                // Check if the user is also an artisan
                const artisanDocRef = doc(db, "artisans", user.uid);
                const artisanDoc = await getDoc(artisanDocRef);
                setIsArtisan(artisanDoc.exists());
            };
            fetchUserData();
        }
    }, [user]);

    const handleLogout = async () => {
        await signOut(auth);
        router.push('/');
    };

    const artisanNavLink = isArtisan 
        ? { href: "/dashboard/my-orders", label: "My Orders", icon: ShoppingCart }
        : { href: "/dashboard/artisan", label: "Become an Artisan", icon: Briefcase };
        
    const dashboardNavLinks = [...baseNavLinks, artisanNavLink];

    return (
        <SidebarProvider>
            <div className="flex min-h-screen">
                <Sidebar>
                    <SidebarContent>
                        <SidebarHeader className="border-b">
                            <Logo />
                        </SidebarHeader>
                        <SidebarMenu className="p-4 flex-grow">
                            {dashboardNavLinks.map(link => (
                                <SidebarMenuItem key={link.href}>
                                    <Link href={link.href} className="w-full">
                                        <SidebarMenuButton>
                                            <link.icon className="h-4 w-4" />
                                            <span>{link.label}</span>
                                        </SidebarMenuButton>
                                    </Link>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                         <div className="p-4 border-t mt-auto">
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage src="https://placehold.co/100x100.png" alt="User" data-ai-hint="person avatar" />
                                    <AvatarFallback>{userData?.fullName?.[0] || 'U'}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <p className="font-semibold text-sm">{userData?.fullName || 'User Name'}</p>
                                    <p className="text-xs text-muted-foreground">{userData?.email || 'user@email.com'}</p>
                                </div>
                                <Button variant="ghost" size="icon" onClick={handleLogout}>
                                    <LogOut className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </SidebarContent>
                </Sidebar>
                <main className="flex-1 bg-muted/40 p-4 md:p-8">
                   <div className="md:hidden p-4 border-b bg-background mb-4 flex items-center justify-between">
                       <Logo />
                       <SidebarTrigger />
                   </div>
                   {children}
                </main>
            </div>
        </SidebarProvider>
    );
}


export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <AuthGuard>
            <DashboardLayoutContent>{children}</DashboardLayoutContent>
        </AuthGuard>
    )
}
