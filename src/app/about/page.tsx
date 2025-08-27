
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-5xl py-12 md:py-20 px-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">
          About Artisan Finder
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Our mission is to bridge the gap between talented artisans and clients seeking high-quality, custom work, celebrating craftsmanship and tradition.
        </p>
      </div>

      <Card className="mt-12 shadow-lg">
        <CardContent className="p-0">
           <div className="relative h-64 md:h-96 w-full rounded-t-lg overflow-hidden">
                <Image
                    src="https://picsum.photos/1200/400"
                    alt="A team of artisans working together"
                    fill
                    className="object-cover"
                    data-ai-hint="artisans working"
                />
            </div>
        </CardContent>
      </Card>

      <div className="mt-16 grid md:grid-cols-2 gap-12 items-center">
        <div>
            <h2 className="text-3xl font-headline font-semibold mb-4">Our Story</h2>
            <div className="space-y-4 text-foreground/80">
                <p>
                Artisan Finder was born from a simple idea: to make it easy for anyone to find and hire skilled craftspeople. In a world of mass production, we saw a growing desire for unique, handcrafted goods and personalized services. We wanted to create a space where the rich traditions of craftsmanship could thrive and be easily accessible.
                </p>
                <p>
                We are a passionate team dedicated to supporting local artisans and small businesses. We believe in the power of handmade and the value of a personal touch. By connecting you with these professionals, we hope to foster a community that values quality, creativity, and expertise.
                </p>
            </div>
        </div>
        <div>
             <h2 className="text-3xl font-headline font-semibold mb-4">Our Values</h2>
             <ul className="space-y-4 text-foreground/80">
                <li className="flex items-start">
                    <span className="font-bold text-primary mr-3 mt-1">&#x2713;</span>
                    <span><strong className="font-semibold">Quality Craftsmanship:</strong> We are committed to showcasing only the most skilled and reputable artisans.</span>
                </li>
                 <li className="flex items-start">
                    <span className="font-bold text-primary mr-3 mt-1">&#x2713;</span>
                    <span><strong className="font-semibold">Community Support:</strong> We believe in empowering local artisans and helping their businesses grow.</span>
                </li>
                 <li className="flex items-start">
                    <span className="font-bold text-primary mr-3 mt-1">&#x2713;</span>
                    <span><strong className="font-semibold">Trust & Transparency:</strong> We strive to create a secure and transparent platform for both artisans and clients.</span>
                </li>
             </ul>
        </div>
      </div>
    </div>
  );
}
