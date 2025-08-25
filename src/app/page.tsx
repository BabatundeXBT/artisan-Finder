import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Hammer, Brush, Scissors, Wrench, ArrowRight } from 'lucide-react';
import { artisanData, categories } from '@/lib/placeholder-data';
import ArtisanCard from '@/components/artisans/ArtisanCard';

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-card pt-12 pb-16 md:pt-24 md:pb-28 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 text-foreground">
            Find Your Perfect Artisan
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover skilled craftspeople for any job, from home repairs to custom creations. Quality and tradition, right at your fingertips.
          </p>
          <div className="max-w-xl mx-auto flex items-center gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by skill or artisan name..."
                className="w-full pl-10 h-12 text-base"
              />
            </div>
            <Button size="lg" className="h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
              Search
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Artisans Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-headline font-bold text-center mb-12">
            Featured Artisans
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {artisanData.slice(0, 4).map((artisan) => (
              <ArtisanCard key={artisan.id} artisan={artisan} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="w-full bg-card py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-headline font-bold text-center mb-12">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link href="/search" key={category.name}>
                <Card className="group text-center hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 flex flex-col items-center justify-center">
                    <category.icon className="h-10 w-10 mb-4 text-primary" />
                    <h3 className="font-bold text-lg">{category.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/search">
                View All Categories <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
