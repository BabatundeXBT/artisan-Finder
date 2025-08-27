
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  subject: z.string().min(5, { message: 'Subject must be at least 5 characters.'}),
  message: z.string().min(20, { message: 'Message must be at least 20 characters.' }),
});

export default function ContactPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Handle form submission
  }

  return (
    <div className="container mx-auto max-w-6xl py-12 md:py-20 px-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">
          Get In Touch
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Have a question or a comment? We'd love to hear from you.
        </p>
      </div>

      <div className="mt-16 grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
            <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-full"><Mail className="h-6 w-6"/></div>
                <div>
                    <h3 className="text-xl font-semibold">General Inquiries</h3>
                    <p className="text-muted-foreground">For general questions, please email us at:</p>
                    <a href="mailto:info@artisandirect.com" className="text-primary hover:underline">info@artisandirect.com</a>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-full"><Phone className="h-6 w-6"/></div>
                <div>
                    <h3 className="text-xl font-semibold">Customer Support</h3>
                    <p className="text-muted-foreground">Our support team is available Mon-Fri, 9am-5pm.</p>
                    <a href="tel:+1234567890" className="text-primary hover:underline">+1 (234) 567-890</a>
                </div>
            </div>
             <div className="flex items-start gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-full"><MapPin className="h-6 w-6"/></div>
                <div>
                    <h3 className="text-xl font-semibold">Our Office</h3>
                    <p className="text-muted-foreground">123 Craftsmanship Ave,<br/>Suite 100, Makersville, 12345</p>
                </div>
            </div>
        </div>
        <Card className="p-6 md:p-8">
          <CardContent className="p-0">
             <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Your Email</FormLabel>
                        <FormControl><Input placeholder="you@example.com" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                    )} />
                     <FormField control={form.control} name="subject" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl><Input placeholder="Question about a service" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                    )} />
                    <FormField control={form.control} name="message" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl><Textarea placeholder="Your message..." {...field} rows={6} /></FormControl>
                        <FormMessage />
                    </FormItem>
                    )} />
                    <Button type="submit" className="w-full" size="lg">Send Message</Button>
                </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
