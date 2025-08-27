
import { jobOpenings } from "@/app/careers/page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function JobDetailPage({ params }: { params: { id: string } }) {
    const job = jobOpenings.find((j) => j.id === params.id);

    if (!job) {
        notFound();
    }

    return (
        <div className="container mx-auto max-w-4xl py-12 md:py-20 px-4">
            <div className="mb-8">
                <Button variant="outline" asChild>
                    <Link href="/careers">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Openings
                    </Link>
                </Button>
            </div>
            
            <div className="space-y-6">
                <div>
                    <Badge>{job.department}</Badge>
                    <h1 className="text-4xl md:text-5xl font-headline font-bold mt-2">{job.title}</h1>
                    <p className="text-lg text-muted-foreground mt-2">{job.location}</p>
                </div>

                <div className="prose lg:prose-lg max-w-full">
                    <p>{job.description}</p>
                    
                    <h2 className="font-headline">Responsibilities</h2>
                    <ul>
                        {job.responsibilities.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>

                    <h2 className="font-headline">Qualifications</h2>
                    <ul>
                        {job.qualifications.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </div>

                <div className="pt-6">
                     <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">Apply Now</Button>
                </div>
            </div>
        </div>
    );
}
