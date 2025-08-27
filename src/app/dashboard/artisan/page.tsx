
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AuthGuard, useAuth } from "@/hooks/use-auth";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2, CheckCircle, Clock } from "lucide-react";

interface ArtisanStatus {
    status: 'Pending Approval' | 'Approved' | 'Not Applied';
    loading: boolean;
}

function ArtisanPortalPageContent() {
    const { user } = useAuth();
    const [artisanStatus, setArtisanStatus] = useState<ArtisanStatus>({ status: 'Not Applied', loading: true });

    useEffect(() => {
        if (user) {
            const checkArtisanStatus = async () => {
                const artisanDocRef = doc(db, 'artisans', user.uid);
                const docSnap = await getDoc(artisanDocRef);

                if (docSnap.exists()) {
                    const status = docSnap.data().status;
                    setArtisanStatus({ status, loading: false });
                } else {
                    setArtisanStatus({ status: 'Not Applied', loading: false });
                }
            };
            checkArtisanStatus();
        } else {
            setArtisanStatus({ status: 'Not Applied', loading: false });
        }
    }, [user]);

    if (artisanStatus.loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        );
    }
    
    if (artisanStatus.status === 'Pending Approval') {
        return (
             <Card className="max-w-lg mx-auto">
                <CardHeader className="text-center">
                    <Clock className="mx-auto h-12 w-12 text-primary" />
                    <CardTitle className="font-headline text-xl mt-4">Application Pending</CardTitle>
                    <CardDescription>
                        Your artisan application is currently under review. We appreciate your patience.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-center text-sm text-muted-foreground">
                        You will be notified once a decision has been made. You can check back here for updates on your status.
                    </p>
                </CardContent>
            </Card>
        );
    }
    
    if (artisanStatus.status === 'Approved') {
        return (
             <Card className="max-w-lg mx-auto">
                <CardHeader className="text-center">
                    <CheckCircle className="mx-auto h-12 w-12 text-green-500" />
                    <CardTitle className="font-headline text-xl mt-4">You're an Approved Artisan!</CardTitle>
                    <CardDescription>
                        Congratulations! Your profile is now live. Start managing your orders and connecting with clients.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                    <Button asChild>
                        <Link href="/dashboard/my-orders">Go to Your Orders</Link>
                    </Button>
                </CardContent>
            </Card>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-headline font-bold mb-6">Artisan Portal</h1>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl">Become an Artisan</CardTitle>
                    <CardDescription>
                    Share your skills with our community. Create your artisan profile to get started and connect with clients.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="mb-4 text-sm text-muted-foreground">
                        By registering as an artisan, you'll be able to showcase your portfolio, list your services, and receive job requests directly through our platform.
                    </p>
                    <Button asChild className="w-full md:w-auto">
                    <Link href="/artisans/register">Start Your Artisan Registration</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

export default function ArtisanPage() {
    return (
        <AuthGuard>
            <ArtisanPortalPageContent />
        </AuthGuard>
    )
}
