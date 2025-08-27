
'use client';

import Image from 'next/image';
import { artisanData } from '@/lib/placeholder-data';
import { notFound } from 'next/navigation';
import { Star, MapPin, Award, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ReviewCard from '@/components/artisans/ReviewCard';
import { AuthGuard, useAuth } from '@/hooks/use-auth';
import React from 'react';
import { collection, addDoc, serverTimestamp, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';
import { Review } from '@/lib/types';
import WriteReviewDialog from '@/components/artisans/WriteReviewDialog';

function ArtisanProfilePageContent({ params }: { params: { id: string } }) {
  const artisan = artisanData.find((a) => a.id === params.id);
  const { user } = useAuth();
  const { toast } = useToast();
  const [reviews, setReviews] = React.useState<Review[]>([]);
  const [userData, setUserData] = React.useState<{fullName: string} | null>(null);

   React.useEffect(() => {
    if (user) {
      const fetchUserData = async () => {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data() as {fullName: string});
        }
      };
      fetchUserData();
    }
  }, [user]);

  React.useEffect(() => {
    const fetchReviews = async () => {
      if (!artisan) return;
      const q = query(collection(db, "reviews"), where("artisanId", "==", artisan.id));
      const querySnapshot = await getDocs(q);
      const fetchedReviews: Review[] = [];
      for (const doc of querySnapshot.docs) {
          const reviewData = doc.data();
          const userDoc = await getDoc(doc(db, "users", reviewData.userId));
          const authorName = userDoc.exists() ? userDoc.data().fullName : 'Anonymous';
          fetchedReviews.push({ id: doc.id, ...reviewData, author: authorName } as Review);
      }
      setReviews(fetchedReviews.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    };
    fetchReviews();
  }, [artisan]);


  if (!artisan) {
    notFound();
  }

  const handleRequestService = async () => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Not Logged In',
        description: 'You must be logged in to request a service.',
      });
      return;
    }

    try {
      await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        artisanId: artisan.id,
        artisanName: artisan.name,
        service: artisan.category, // Using category as a default service
        date: new Date().toLocaleDateString(),
        status: 'Pending',
        createdAt: serverTimestamp(),
      });
      toast({
        title: 'Request Sent!',
        description: `Your request has been sent to ${artisan.name}.`,
      });
    } catch (error) {
      console.error('Error creating service request: ', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem sending your request.',
      });
    }
  };

  const handleReviewSubmitted = (newReview: Review) => {
    // Add user's full name to the review object before adding to state
    const reviewWithAuthor = {
      ...newReview,
      author: userData?.fullName || user?.displayName || 'Anonymous',
      avatarUrl: user?.photoURL || 'https://placehold.co/100x100.png'
    };
    setReviews([reviewWithAuthor, ...reviews]);
  };
  
  const totalReviews = artisan.reviewsCount + reviews.length;


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
            <span className="text-muted-foreground ml-2">({totalReviews} reviews)</span>
          </div>
          <p className="mt-4 text-foreground/80 max-w-prose">{artisan.bio}</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold" onClick={handleRequestService}>Request Service</Button>
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
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-headline font-semibold">Feedback from Clients</h2>
            <WriteReviewDialog artisan={artisan} onReviewSubmitted={handleReviewSubmitted} />
          </div>
          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">This artisan doesn't have any reviews yet.</p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function ArtisanProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const awaitedParams = React.use(params);
  return (
    <AuthGuard>
      <ArtisanProfilePageContent params={awaitedParams} />
    </AuthGuard>
  );
}
