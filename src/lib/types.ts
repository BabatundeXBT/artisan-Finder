
import type { LucideIcon } from 'lucide-react';

export interface Artisan {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  location: string;
  rating: number;
  reviewsCount: number;
  imageUrl: string;
  'data-ai-hint'?: string;
  skills: string[];
  experience: string;
  bio: string;
  services: string[];
  reviews: Review[];
}

export interface Review {
  id: string;
  author: string;
  avatarUrl: string;
  rating: number;
  comment: string;
  date: string;
  artisanId?: string;
  artisanName?: string;
}

export interface Category {
    name: string;
    icon: LucideIcon;
}
