
'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Mail, MessageSquare, Phone } from 'lucide-react';
import type { Artisan } from '@/lib/types';
import Link from 'next/link';

interface ArtisanContactDialogProps {
  artisan: Artisan;
}

export default function ArtisanContactDialog({ artisan }: ArtisanContactDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline">
            <MessageSquare className="mr-2 h-5 w-5" /> Contact Artisan
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Contact {artisan.name}</DialogTitle>
          <DialogDescription>
            Reach out to {artisan.name} directly for inquiries or to discuss your project.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
            <div className="flex items-center gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-full"><Mail className="h-5 w-5"/></div>
                <div>
                    <h3 className="font-semibold">Email</h3>
                    <a href={`mailto:${artisan.email}`} className="text-primary hover:underline">{artisan.email}</a>
                </div>
            </div>
             <div className="flex items-center gap-4">
                <div className="bg-primary/10 text-primary p-3 rounded-full"><Phone className="h-5 w-5"/></div>
                <div>
                    <h3 className="font-semibold">Phone</h3>
                    <a href={`tel:${artisan.phone}`} className="text-primary hover:underline">{artisan.phone}</a>
                </div>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
