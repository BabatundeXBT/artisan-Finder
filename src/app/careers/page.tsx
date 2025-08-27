
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const jobOpenings = [
    {
        title: "Senior Frontend Developer",
        location: "Remote",
        department: "Engineering",
    },
    {
        title: "Product Manager",
        location: "New York, NY",
        department: "Product",
    },
    {
        title: "Community Manager",
        location: "Austin, TX",
        department: "Marketing",
    },
];

export default function CareersPage() {
  return (
    <div className="container mx-auto max-w-5xl py-12 md:py-20 px-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">
          Join Our Team
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          We're looking for passionate people to help us empower artisans and build a community around craftsmanship.
        </p>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-headline font-semibold mb-8 text-center">Current Openings</h2>
        <div className="space-y-6">
            {jobOpenings.map((job) => (
                <Card key={job.title} className="hover:shadow-md transition-shadow">
                   <CardContent className="p-6 flex items-center justify-between">
                       <div>
                            <h3 className="font-bold text-xl">{job.title}</h3>
                            <p className="text-muted-foreground mt-1">{job.department} &middot; {job.location}</p>
                       </div>
                       <Button variant="outline" asChild>
                           <a href="#">
                               View Details <ArrowRight className="ml-2 h-4 w-4" />
                           </a>
                       </Button>
                   </CardContent>
                </Card>
            ))}
        </div>
         <div className="text-center mt-12">
            <p className="text-muted-foreground">Don't see a role that fits? <a href="mailto:careers@artisandirect.com" className="text-primary hover:underline">Send us your resume!</a></p>
        </div>
      </div>
    </div>
  );
}
