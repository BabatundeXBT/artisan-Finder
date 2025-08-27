
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, MessageSquarePlus } from 'lucide-react';
import { useAuth, AuthGuard } from '@/hooks/use-auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Request {
  id: string;
  artisanName: string; // Assuming the artisan's name is stored
  service: string;
  date: string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
}

function MyRequestsPageContent() {
    const { user } = useAuth();
    const [requests, setRequests] = useState<Request[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            const fetchRequests = async () => {
                setLoading(true);
                const q = query(collection(db, "orders"), where("userId", "==", user.uid));
                try {
                    const querySnapshot = await getDocs(q);
                    const fetchedRequests = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Request));
                    setRequests(fetchedRequests);
                } catch(error) {
                    console.error("Error fetching requests: ", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchRequests();
        }
    }, [user]);

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'Completed': return 'default';
            case 'In Progress': return 'secondary';
            case 'Pending': return 'destructive';
            default: return 'outline';
        }
    }

  return (
    <div>
      <h1 className="text-3xl font-headline font-bold mb-6">My Service Requests</h1>
      <Card>
        <CardHeader>
          <CardTitle>Request History</CardTitle>
          <CardDescription>A list of all the services you have requested.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Artisan</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.length > 0 ? (
                requests.map((request) => (
                    <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.artisanName || 'N/A'}</TableCell>
                    <TableCell>{request.service}</TableCell>
                    <TableCell>
                        <Badge variant={getStatusVariant(request.status) as any}>{request.status}</Badge>
                    </TableCell>
                    <TableCell>{request.date}</TableCell>
                    <TableCell className="text-right">
                       {request.status === 'Completed' && (
                         <Button variant="outline" size="sm" asChild>
                            {/* This would link to a review page or open a modal */}
                            <Link href={`/artisans/${request.id}/review`}> 
                                <MessageSquarePlus className="mr-2 h-4 w-4"/>
                                Write a Review
                            </Link>
                         </Button>
                       )}
                    </TableCell>
                    </TableRow>
                ))
              ) : (
                <TableRow>
                    <TableCell colSpan={5} className="text-center h-24">
                        You have not made any service requests yet.
                    </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function MyRequestsPage() {
    return (
        <AuthGuard>
            <MyRequestsPageContent />
        </AuthGuard>
    )
}
