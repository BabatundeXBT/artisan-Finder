'use client';

import { useEffect, useState, ReactNode, createContext, useContext } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType>({ 
    user: null, 
    isAuthenticated: false, 
    isLoading: true 
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const value = {
        user,
        isAuthenticated: !!user,
        isLoading
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    return useContext(AuthContext);
}

const publicRoutes = ['/login', '/signup', '/'];

export function AuthGuard({ children }: { children: ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isLoading && !isAuthenticated && !publicRoutes.includes(pathname)) {
            router.push('/login');
        }
    }, [isAuthenticated, isLoading, router, pathname]);
    
    if (isLoading || (!isAuthenticated && !publicRoutes.includes(pathname))) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }
    
    return <>{children}</>;
}
