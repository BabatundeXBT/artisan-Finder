
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import type { Review } from '@/lib/types';

interface ReviewCardProps {
  review: Review;
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

export default function ReviewCard({ review }: ReviewCardProps) {
  const authorName = review.author || 'Anonymous';
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarImage src={review.avatarUrl} alt={authorName} data-ai-hint="person avatar"/>
            <AvatarFallback>{authorName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{authorName}</p>
                <p className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <StarRating rating={review.rating} />
            </div>
            <p className="mt-4 text-foreground/80">{review.comment}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
