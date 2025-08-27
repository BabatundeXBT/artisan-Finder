
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AuthGuard } from "@/hooks/use-auth";

function ArtisanPortalPage() {
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
            <ArtisanPortalPage />
        </AuthGuard>
    )
}
