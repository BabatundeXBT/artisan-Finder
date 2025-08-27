
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const jobOpenings = [
    {
        id: "1",
        title: "Senior Frontend Developer",
        location: "Remote",
        department: "Engineering",
        description: "We are seeking an experienced Frontend Developer to build and maintain our user-facing applications. You will work closely with our product and design teams to create beautiful and intuitive interfaces.",
        responsibilities: [
            "Develop new user-facing features using React and Next.js.",
            "Build reusable components and front-end libraries for future use.",
            "Translate designs and wireframes into high-quality code.",
            "Optimize components for maximum performance across a vast array of web-capable devices and browsers."
        ],
        qualifications: [
            "5+ years of professional experience in frontend development.",
            "Strong proficiency in JavaScript, TypeScript, React, and Next.js.",
            "Experience with modern frontend build pipelines and tools.",
            "Familiarity with Tailwind CSS and ShadCN UI.",
            "A passion for building beautiful and accessible user interfaces."
        ]
    },
    {
        id: "2",
        title: "Product Manager",
        location: "New York, NY",
        department: "Product",
        description: "As a Product Manager, you will be responsible for the product planning and execution throughout the Product Lifecycle, including gathering and prioritizing product and customer requirements.",
         responsibilities: [
            "Define the product vision, strategy, and roadmap.",
            "Gather and analyze feedback from customers, stakeholders, and other teams.",
            "Work closely with engineering, design, and marketing teams.",
            "Ensure products and releases are launched correctly and on schedule."
        ],
        qualifications: [
            "3+ years of experience in a product management role.",
            "Proven track record of managing all aspects of a successful product throughout its lifecycle.",
            "Excellent written and verbal communication skills.",
            "Strong problem-solving skills and willingness to roll up one’s sleeves to get the job done."
        ]
    },
    {
        id: "3",
        title: "Community Manager",
        location: "Austin, TX",
        department: "Marketing",
        description: "We are looking for a Community Manager to join our marketing team. If you are a self-driven and ambitious tech-savvy professional we would love to meet you!",
         responsibilities: [
            "Set and implement social media and communication campaigns to align with marketing strategies.",
            "Provide engaging text, image and video content for social media accounts.",
            "Respond to comments and customer queries in a timely manner.",
            "Monitor and report on feedback and online reviews."
        ],
        qualifications: [
            "Proven work experience as a community manager.",
            "Experience launching community initiatives (e.g. building an online forum, launching an ambassador program).",
            "Ability to identify and track relevant community metrics.",
            "Excellent verbal communication and writing skills."
        ]
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
                <Card key={job.id} className="hover:shadow-md transition-shadow">
                   <CardContent className="p-6 flex items-center justify-between">
                       <div>
                            <h3 className="font-bold text-xl">{job.title}</h3>
                            <p className="text-muted-foreground mt-1">{job.department} &middot; {job.location}</p>
                       </div>
                       <Button variant="outline" asChild>
                           <Link href={`/careers/${job.id}`}>
                               View Details <ArrowRight className="ml-2 h-4 w-4" />
                           </Link>
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
