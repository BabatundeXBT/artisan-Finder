
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Star, Edit, Trash2 } from 'lucide-react';
import { useAuth, AuthGuard } from '@/hooks/use-auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useEffect, useState } from 'react';

interface Review {
  id: string;
  artisanName: string;
  artisanId: string;
  rating: number;
  comment: string;
  date: string;
}

const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${i < rating ? 'text-amber-500 fill-amber-500' : 'text-muted-foreground'}`}
        />
      ))}
    </div>
  );

function MyReviewsPageContent() {
    const { user } = useAuth();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            const fetchReviews = async () => {
                setLoading(true);
                // Assuming reviews collection has a field 'userId' that matches the user's UID
                const q = query(collection(db, "reviews"), where("userId", "==", user.uid));
                try {
                    const querySnapshot = await getDocs(q);
                    const fetchedReviews = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Review));
                    setReviews(fetchedReviews);
                } catch(error) {
                    console.error("Error fetching reviews: ", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchReviews();
        }
    }, [user]);

  return (
    <div>
      <h1 className="text-3xl font-headline font-bold mb-6">My Reviews</h1>
      <Card>
        <CardHeader>
          <CardTitle>Your Feedback</CardTitle>
          <CardDescription>A list of all reviews you have submitted.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : reviews.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
                {reviews.map((review) => (
                    <Card key={review.id}>
                        <CardHeader>
                            <CardTitle className='text-xl'>Review for {review.artisanName}</CardTitle>
                            <div className="flex items-center justify-between pt-2">
                                <StarRating rating={review.rating} />
                                <span className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className='text-muted-foreground'>{review.comment}</p>
                        </CardContent>
                        <CardFooter className='flex justify-end gap-2'>
                            <Button variant="outline" size="sm">
                                <Edit className="mr-2 h-4 w-4" /> Edit
                            </Button>
                            <Button variant="destructive" size="sm">
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
          ) : (
             <div className="text-center h-48 flex flex-col justify-center items-center">
                <p className="text-muted-foreground">You have not written any reviews yet.</p>
             </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function MyReviewsPage() {
    return (
        <AuthGuard>
            <MyReviewsPageContent />
        </AuthGuard>
    )
}
