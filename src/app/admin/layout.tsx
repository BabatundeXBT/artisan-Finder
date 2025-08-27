
'use client';

import type { ReactNode } from "react";
import Link from 'next/link';
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import Logo from "@/components/shared/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Briefcase, CheckSquare, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const adminNavLinks = [
    { href: "/admin", label: "Users", icon: Users },
    { href: "/admin/artisans", label: "Artisans", icon: Briefcase },
    { href: "/admin/approvals", label: "Approvals", icon: CheckSquare },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
    const router = useRouter();

    const handleLogout = async () => {
        await signOut(auth);
        router.push('/auth/login');
    };
    
    // A real app would protect this route
    return (
        <SidebarProvider>
            <div className="flex min-h-screen">
                <Sidebar>
                    <SidebarContent>
                        <SidebarHeader className="border-b">
                            <Logo />
                        </SidebarHeader>
                        <SidebarMenu className="p-4 flex-grow">
                            {adminNavLinks.map(link => (
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
                                    <AvatarImage src="https://placehold.co/100x100.png" alt="Admin" data-ai-hint="person avatar"/>
                                    <AvatarFallback>A</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <p className="font-semibold text-sm">Admin User</p>
                                    <p className="text-xs text-muted-foreground">admin@artisandirect.com</p>
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
