'use client';
import { useClones } from '@/hooks/use-clones';
import { CloneCard } from '@/components/dashboard/clone-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

export default function DashboardPage() {
  const { clones } = useClones();

  return (
    <div className="container mx-auto py-6">
      {clones.length === 0 ? (
        <div className="text-center py-20 bg-card border border-dashed rounded-lg">
          <h2 className="text-xl font-semibold mb-2">
            No Clones Found
          </h2>
          <p className="text-muted-foreground mb-4">
            Get started by creating your first social media page clone.
          </p>
          <Button asChild>
            <Link href="/dashboard/new">
              <PlusCircle className="mr-2 h-4 w-4" /> Create New Clone
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {clones.map((clone) => (
            <CloneCard key={clone.id} clone={clone} />
          ))}
        </div>
      )}
    </div>
  );
}
