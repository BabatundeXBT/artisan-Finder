
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth(redirectTo = '/login') {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      // Simulate checking for an authentication token
      await new Promise(resolve => setTimeout(resolve, 500));
      // In this mock, we'll assume the user is not authenticated.
      // To test the authenticated state, you can change this to `true`.
      const authStatus = false; 
      setIsAuthenticated(authStatus);
      setIsLoading(false);
      
      if (!authStatus) {
        router.push(redirectTo);
      }
    };

    checkAuth();
  }, [router, redirectTo]);
  
  return { isAuthenticated, isLoading };
}

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, isLoading } = useAuth();
    
    if (isLoading || !isAuthenticated) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }
    
    return <>{children}</>;
}
