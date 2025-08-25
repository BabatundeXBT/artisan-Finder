import Image from 'next/image';
import Link from 'next/link';
import type { Artisan } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin } from 'lucide-react';

interface ArtisanCardProps {
  artisan: Artisan;
}

export default function ArtisanCard({ artisan }: ArtisanCardProps) {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link href={`/artisans/${artisan.id}`} className="block">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full">
            <Image
              src={artisan.imageUrl}
              alt={`Photo of ${artisan.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              data-ai-hint={artisan['data-ai-hint']}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <Badge variant="secondary" className="mb-2">{artisan.category}</Badge>
          <h3 className="font-bold text-lg font-headline truncate">{artisan.name}</h3>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0" />
            <span>{artisan.location}</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
            <div className="flex items-center text-sm font-bold text-amber-600">
                <Star className="h-4 w-4 mr-1.5 fill-current" />
                <span>{artisan.rating.toFixed(1)}</span>
                <span className="text-muted-foreground font-normal ml-1.5">({artisan.reviewsCount} reviews)</span>
            </div>
        </CardFooter>
      </Link>
    </Card>
  );
}
