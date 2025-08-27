'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { categories } from '@/lib/placeholder-data';
import Logo from '@/components/shared/Logo';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const formSchema = z.object({
  fullName: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.'}),
  location: z.string().min(2, { message: 'Location is required.' }),
  category: z.string({ required_error: 'Please select a category.' }),
  experience: z.string().min(1, { message: 'Years of experience is required.' }),
  skills: z.string().min(3, { message: 'Please list at least one skill.' }),
  bio: z.string().min(20, { message: 'Bio must be at least 20 characters.' }),
});

export default function ArtisanRegisterPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      experience: '',
      skills: '',
      bio: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!user) {
        toast({
            variant: 'destructive',
            title: 'Not Authenticated',
            description: 'You must be logged in to register as an artisan.',
        });
        return;
    }

    try {
        const artisanRef = doc(db, 'artisans', user.uid);
        await setDoc(artisanRef, {
            ...values,
            userId: user.uid,
            status: 'Pending Approval',
            createdAt: serverTimestamp(),
            // Add placeholders for fields that are set later
            rating: 0,
            reviewsCount: 0,
            imageUrl: 'https://placehold.co/600x400.png',
        });
        
        toast({
            title: 'Registration Submitted!',
            description: 'Your application is under review. We will notify you once it is approved.',
        });

        router.push('/dashboard');

    } catch (error) {
        console.error("Error creating artisan profile: ", error);
        toast({
            variant: 'destructive',
            title: 'Uh oh! Something went wrong.',
            description: 'There was a problem submitting your registration.',
        });
    }
  }

  return (
    <div className="container mx-auto max-w-4xl py-12 px-4">
      <Card>
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4"><Logo /></div>
          <CardTitle className="font-headline text-3xl">Become an Artisan</CardTitle>
          <CardDescription>Join our network of skilled professionals. Fill out your profile to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormField control={form.control} name="fullName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl><Input placeholder="you@example.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                 <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl><Input placeholder="(123) 456-7890" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="location" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl><Input placeholder="City, State" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="category" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category of Work</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your main craft" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map(c => <SelectItem key={c.name} value={c.name}>{c.name}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="experience" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Years of Experience</FormLabel>
                    <FormControl><Input placeholder="e.g., 10+ years" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              
              <FormField control={form.control} name="skills" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skills</FormLabel>
                    <FormControl><Input placeholder="e.g., Custom Furniture, Cabinetry, Wood-turning" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
              )} />
              
              <FormField control={form.control} name="bio" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Short Bio</FormLabel>
                    <FormControl><Textarea placeholder="Tell clients a little about yourself and your craft..." {...field} rows={5} /></FormControl>
                    <FormMessage />
                  </FormItem>
              )} />
              
              <div className="flex justify-end">
                <Button type="submit" size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting ? 'Submitting...' : 'Submit for Approval'}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
