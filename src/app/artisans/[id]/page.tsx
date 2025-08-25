import Image from 'next/image';
import { artisanData } from '@/lib/placeholder-data';
import { notFound } from 'next/navigation';
import { Star, MapPin, Award, ShieldCheck, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ReviewCard from '@/components/artisans/ReviewCard';

export default function ArtisanProfilePage({ params }: { params: { id: string } }) {
  const artisan = artisanData.find((a) => a.id === params.id);

  if (!artisan) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-6xl py-8 md:py-12 px-4">
      {/* Header Section */}
      <div className="md:flex md:items-start md:gap-8">
        <div className="relative h-64 w-full md:h-80 md:w-80 flex-shrink-0 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={artisan.imageUrl}
            alt={`Photo of ${artisan.name}`}
            fill
            className="object-cover"
            data-ai-hint={artisan['data-ai-hint']}
          />
        </div>
        <div className="mt-6 md:mt-0">
          <Badge variant="secondary">{artisan.category}</Badge>
          <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">{artisan.name}</h1>
          <div className="flex items-center text-muted-foreground mt-3">
            <MapPin className="h-5 w-5 mr-2" />
            <span>{artisan.location}</span>
          </div>
          <div className="flex items-center mt-3">
            <div className="flex items-center text-amber-600 font-bold">
              <Star className="h-5 w-5 mr-1.5 fill-current" />
              <span>{artisan.rating.toFixed(1)}</span>
            </div>
            <span className="text-muted-foreground ml-2">({artisan.reviewsCount} reviews)</span>
          </div>
          <p className="mt-4 text-foreground/80 max-w-prose">{artisan.bio}</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">Request Service</Button>
            <Button size="lg" variant="outline">
              <MessageSquare className="mr-2 h-5 w-5" /> Contact Artisan
            </Button>
          </div>
        </div>
      </div>
      
      <Separator className="my-12" />

      {/* Main Content Section */}
      <Tabs defaultValue="services" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="services">Services & Skills</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="services" className="mt-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-headline font-semibold mb-4">Services Offered</h2>
              <ul className="list-disc list-inside space-y-2 text-foreground/80">
                {artisan.services.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="font-headline text-xl">Skills & Expertise</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                  {artisan.skills.map((skill) => (
                    <Badge key={skill} variant="default">{skill}</Badge>
                  ))}
                </CardContent>
              </Card>
              <Card className="mt-4">
                <CardHeader>
                  <CardTitle className="font-headline text-xl">Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Award className="h-6 w-6 mr-3 text-primary" />
                    <p className="font-semibold text-lg">{artisan.experience}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          <h2 className="text-2xl font-headline font-semibold mb-6">Feedback from Clients</h2>
          {artisan.reviews.length > 0 ? (
            <div className="space-y-6">
              {artisan.reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">This artisan doesn't have any reviews yet.</p>
          )}
          <div className="mt-8">
             <Button>Write a Review</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
