'use client';

import type { ReactNode } from "react";
import Link from 'next/link';
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import Logo from "@/components/shared/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, ShoppingCart, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const dashboardNavLinks = [
    { href: "/dashboard", label: "Overview", icon: User },
    { href: "/dashboard/profile", label: "My Profile", icon: Settings },
    { href: "/dashboard/artisan", label: "My Orders", icon: ShoppingCart },
];

function useAuth() {
  // In a real app, you'd have a more robust auth check,
  // possibly involving a context provider or a library like NextAuth.js
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for an authentication token
    const checkAuth = async () => {
      // For demonstration, we'll just use a timeout to simulate an async check.
      // Replace this with your actual auth logic (e.g., checking localStorage, a cookie, or making an API call).
      await new Promise(resolve => setTimeout(resolve, 500));
      // In this mock, we'll assume the user is not authenticated.
      // To test the authenticated state, you can change this to `true`.
      setIsAuthenticated(false); 
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  return { isAuthenticated, isLoading };
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isLoading, isAuthenticated, router]);
    
    if (isLoading || !isAuthenticated) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }
    
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
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <p className="font-semibold text-sm">User Name</p>
                                    <p className="text-xs text-muted-foreground">user@email.com</p>
                                </div>
                                <Button variant="ghost" size="icon" asChild>
                                  <Link href="/">
                                    <LogOut className="h-4 w-4" />
                                  </Link>
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