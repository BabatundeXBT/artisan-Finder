
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Star } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { Artisan, Review } from '@/lib/types';
import { cn } from '@/lib/utils';

interface WriteReviewDialogProps {
  artisan: Artisan;
  onReviewSubmitted: (review: Review) => void;
}

export default function WriteReviewDialog({ artisan, onReviewSubmitted }: WriteReviewDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!user) {
      toast({ variant: 'destructive', title: 'You must be logged in to write a review.' });
      return;
    }
    if (rating === 0) {
      toast({ variant: 'destructive', title: 'Please select a star rating.' });
      return;
    }
    if (comment.trim().length < 10) {
        toast({ variant: 'destructive', title: 'Please write a comment of at least 10 characters.' });
        return;
    }

    setIsSubmitting(true);
    try {
      const reviewData = {
        userId: user.uid,
        userName: user.displayName || 'Anonymous',
        userAvatar: user.photoURL || '',
        artisanId: artisan.id,
        artisanName: artisan.name,
        rating,
        comment,
        date: new Date().toISOString(),
        createdAt: serverTimestamp(),
      };
      
      const docRef = await addDoc(collection(db, 'reviews'), reviewData);
      
      const newReview: Review = {
        id: docRef.id,
        author: reviewData.userName,
        avatarUrl: reviewData.userAvatar,
        ...reviewData,
      }

      onReviewSubmitted(newReview);
      toast({ title: 'Review Submitted!', description: 'Thank you for your feedback.' });
      setIsOpen(false);
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({ variant: 'destructive', title: 'Failed to submit review.', description: 'Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Write a Review</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Write a review for {artisan.name}</DialogTitle>
          <DialogDescription>Share your experience to help others in the community.</DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
            <div>
                <label className="font-medium text-sm">Your Rating</label>
                <div className="flex items-center space-x-1 mt-2" onMouseLeave={() => setHoverRating(0)}>
                    {[...Array(5)].map((_, index) => {
                        const starValue = index + 1;
                        return (
                            <Star
                                key={starValue}
                                className={cn(
                                    "h-8 w-8 cursor-pointer transition-colors",
                                    starValue <= (hoverRating || rating) ? "text-amber-500 fill-amber-500" : "text-muted-foreground"
                                )}
                                onClick={() => setRating(starValue)}
                                onMouseEnter={() => setHoverRating(starValue)}
                            />
                        );
                    })}
                </div>
            </div>
            <div>
                 <label htmlFor="comment" className="font-medium text-sm">Your Review</label>
                <Textarea
                    id="comment"
                    placeholder="Tell us about your experience..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="mt-2"
                    rows={5}
                />
            </div>
        </div>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)} variant="outline">Cancel</Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Review'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
