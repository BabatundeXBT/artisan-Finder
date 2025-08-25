import Link from 'next/link';
import { Wrench } from 'lucide-react';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2" aria-label="Artisan Direct Home">
      <Wrench className="h-6 w-6 text-primary" />
      <span className="font-bold font-headline text-xl text-foreground">
        Artisan Direct
      </span>
    </Link>
  );
}
