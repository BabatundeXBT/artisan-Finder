"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Wrench } from "lucide-react";
import Logo from "../shared/Logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

const navLinks = [
  { href: "/search", label: "Find Artisans" },
  { href: "/artisans/register", label: "Become an Artisan" },
];

export default function Header() {
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuth();
  
  const NavLink = ({ href, label }: { href: string, label: string }) => (
    <Link href={href}>
      <span
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          pathname === href ? "text-primary" : "text-muted-foreground"
        )}
      >
        {label}
      </span>
    </Link>
  );

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Logo />
        </div>
        <div className="flex items-center md:hidden">
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <NavLink key={link.href} {...link} />
                ))}
                 {isAuthenticated && <NavLink href="/dashboard" label="Dashboard" />}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            {/* Can add a command menu here later */}
          </div>
          <nav className="hidden items-center gap-6 text-sm md:flex">
             {navLinks.map((link) => (
               <NavLink key={link.href} {...link} />
             ))}
             {isAuthenticated && <NavLink href="/dashboard" label="Dashboard" />}
          </nav>
          <div className="flex items-center gap-2">
            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <Button variant="outline" onClick={handleLogout}>Logout</Button>
                ) : (
                  <>
                    <Button variant="outline" asChild>
                        <Link href="/login">Login</Link>
                    </Button>
                    <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                        <Link href="/signup">Sign Up</Link>
                    </Button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
